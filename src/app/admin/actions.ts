"use server";

import { sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { guests, invitations } from "@/db/schema";
import { parseAdminInvitationInput } from "@/lib/admin-create";
import { generateToken, hashToken } from "@/lib/tokens";

type AdminCreateState = {
  status: "idle" | "error" | "success";
  message: string;
};

export async function createInvitation(
  _previousState: AdminCreateState,
  formData: FormData
): Promise<AdminCreateState> {
  const parsed = parseAdminInvitationInput({
    displayName: formData.get("displayName"),
    contactPhone: formData.get("contactPhone"),
    guestNames: formData.get("guestNames"),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error };
  }

  const { contactPhone, displayName, guestNames } = parsed.data;
  const phoneSuffix = contactPhone.slice(-4);
  const [suffixConflict] = await db
    .select({ id: invitations.id })
    .from(invitations)
    .where(
      sql`${invitations.contactPhone} is not null and right(${invitations.contactPhone}, 4) = ${phoneSuffix}`
    )
    .limit(1);

  if (suffixConflict) {
    return {
      status: "error",
      message:
        "Já existe um convite com esses quatro últimos dígitos. Use outro telefone para evitar conflito no acesso.",
    };
  }

  try {
    const token = generateToken();

    await db.transaction(async (tx) => {
      const [invitation] = await tx
        .insert(invitations)
        .values({
          tokenHash: hashToken(token),
          displayName,
          contactPhone,
          maxGuests: guestNames.length,
        })
        .returning({ id: invitations.id });

      await tx.insert(guests).values(
        guestNames.map((name, index) => ({
          invitationId: invitation.id,
          name,
          isPrimary: index === 0,
        }))
      );
    });
  } catch {
    return {
      status: "error",
      message: "Não foi possível cadastrar o convite. Tente novamente.",
    };
  }

  revalidatePath("/admin");
  return {
    status: "success",
    message: `Convite cadastrado. O acesso usa os quatro últimos dígitos: ${phoneSuffix}.`,
  };
}
