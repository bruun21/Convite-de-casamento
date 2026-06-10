import "dotenv/config";

import { eq } from "drizzle-orm";

import { hashToken } from "../lib/tokens";
import { db, queryClient } from "./client";
import { guests, invitations, rsvpEvents } from "./schema";

const localInvitations = [
  {
    token: "11111111111111111111111111111111",
    displayName: "Familia Exemplo",
    status: "pending" as const,
    guests: [
      { name: "Convidado Exemplo Um", isPrimary: true },
      { name: "Convidada Exemplo Dois", isPrimary: false },
    ],
  },
  {
    token: "22222222222222222222222222222222",
    displayName: "Pessoa Exemplo",
    status: "responded" as const,
    guests: [
      {
        name: "Pessoa Exemplo",
        isPrimary: true,
        attendance: "declined" as const,
      },
    ],
  },
] as const;

async function seed() {
  for (const item of localInvitations) {
    const tokenHash = hashToken(item.token);
    const [invitation] = await db
      .insert(invitations)
      .values({
        tokenHash,
        displayName: item.displayName,
        maxGuests: item.guests.length,
        status: item.status,
        firstRespondedAt:
          item.status === "responded" ? new Date("2026-06-01T12:00:00Z") : null,
        respondedAt:
          item.status === "responded" ? new Date("2026-06-01T12:00:00Z") : null,
      })
      .onConflictDoUpdate({
        target: invitations.tokenHash,
        set: {
          displayName: item.displayName,
          maxGuests: item.guests.length,
          status: item.status,
          updatedAt: new Date(),
        },
      })
      .returning({ id: invitations.id });

    await db
      .delete(rsvpEvents)
      .where(eq(rsvpEvents.invitationId, invitation.id));
    await db.delete(guests).where(eq(guests.invitationId, invitation.id));
    await db.insert(guests).values(
      item.guests.map((guest) => ({
        invitationId: invitation.id,
        ...guest,
      }))
    );
  }

  console.log("Seed local concluido. Tokens ficticios:");
  for (const item of localInvitations) {
    console.log(`http://localhost:3000/convite/${item.token}`);
  }
}

seed()
  .catch((error) => {
    console.error("Falha no seed local:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await queryClient.end();
  });
