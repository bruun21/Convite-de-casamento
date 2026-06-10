import "dotenv/config";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { inArray } from "drizzle-orm";
import { parse } from "csv-parse/sync";
import { z } from "zod";

import { buildCsv } from "../lib/csv";
import { generateToken, hashToken } from "../lib/tokens";
import { db, queryClient } from "./client";
import { guests, invitations } from "./schema";

const rowSchema = z.object({
  reference: z.string().trim().min(1).max(80),
  display_name: z.string().trim().min(1).max(160),
  contact_phone: z.string().trim().max(30).optional().default(""),
  guests: z.string().trim().min(1),
});

type ImportRow = z.infer<typeof rowSchema>;

function parseGuestNames(value: string) {
  const names = value
    .split("|")
    .map((name) => name.trim())
    .filter(Boolean);

  if (names.length === 0 || new Set(names).size !== names.length) {
    throw new Error("Cada convite precisa de nomes únicos separados por |.");
  }

  return names;
}

async function importGuests(inputPath: string) {
  const csv = await readFile(inputPath, "utf8");
  const rows = z
    .array(rowSchema)
    .min(1)
    .parse(
      parse(csv, {
        bom: true,
        columns: true,
        skip_empty_lines: true,
        trim: true,
      })
    );

  const references = rows.map((row) => row.reference);
  if (new Set(references).size !== references.length) {
    throw new Error("A coluna reference deve ser única no arquivo.");
  }

  const existing = await db
    .select({ reference: invitations.externalReference })
    .from(invitations)
    .where(inArray(invitations.externalReference, references));

  if (existing.length > 0) {
    throw new Error(
      `Referências já importadas: ${existing
        .map(({ reference }) => reference)
        .join(", ")}`
    );
  }

  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ).replace(/\/$/, "");
  const output: unknown[][] = [
    ["reference", "display_name", "contact_phone", "invite_url"],
  ];

  await db.transaction(async (tx) => {
    for (const row of rows as ImportRow[]) {
      const names = parseGuestNames(row.guests);
      const token = generateToken();
      const [invitation] = await tx
        .insert(invitations)
        .values({
          externalReference: row.reference,
          tokenHash: hashToken(token),
          displayName: row.display_name,
          contactPhone: row.contact_phone || null,
          maxGuests: names.length,
        })
        .returning({ id: invitations.id });

      await tx.insert(guests).values(
        names.map((name, index) => ({
          invitationId: invitation.id,
          name,
          isPrimary: index === 0,
        }))
      );

      output.push([
        row.reference,
        row.display_name,
        row.contact_phone,
        `${siteUrl}/convite/${token}`,
      ]);
    }
  });

  await mkdir("exports", { recursive: true });
  const outputPath = path.join(
    "exports",
    `convites-${new Date().toISOString().replaceAll(/[:.]/g, "-")}.csv`
  );
  await writeFile(outputPath, buildCsv(output), "utf8");
  console.log(`${rows.length} convites importados. Links: ${outputPath}`);
}

const inputPath = process.argv[2];

if (!inputPath) {
  console.error("Uso: npm run db:import -- caminho/para/convidados.csv");
  process.exitCode = 1;
} else {
  importGuests(inputPath)
    .catch((error) => {
      console.error(
        "Falha ao importar convidados:",
        error instanceof Error ? error.message : error
      );
      process.exitCode = 1;
    })
    .finally(async () => {
      await queryClient.end();
    });
}
