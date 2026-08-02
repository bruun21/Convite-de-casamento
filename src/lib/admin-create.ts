import { z } from "zod";

const adminInvitationSchema = z.object({
  displayName: z.string().trim().min(2).max(120),
  contactPhone: z.string().trim().min(10).max(30),
  guestNames: z.string().trim().min(2).max(1500),
});

type AdminInvitationInput = {
  displayName: unknown;
  contactPhone: unknown;
  guestNames: unknown;
};

export type ParsedAdminInvitation = {
  displayName: string;
  contactPhone: string;
  guestNames: string[];
};

export function parseAdminInvitationInput(input: AdminInvitationInput) {
  const parsed = adminInvitationSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false as const,
      error: "Preencha o nome do convite, o telefone e os convidados.",
    };
  }

  const contactPhone = parsed.data.contactPhone.replace(/\D/g, "");
  if (contactPhone.length < 10 || contactPhone.length > 13) {
    return {
      success: false as const,
      error: "Informe um telefone válido com DDD.",
    };
  }

  const guestNames = parsed.data.guestNames
    .split(/\r?\n/)
    .map((name) => name.trim())
    .filter(Boolean);

  if (
    guestNames.length === 0 ||
    guestNames.length > 20 ||
    guestNames.some((name) => name.length < 2 || name.length > 120)
  ) {
    return {
      success: false as const,
      error: "Informe de 1 a 20 convidados, um por linha.",
    };
  }

  const uniqueNames = new Set(
    guestNames.map((name) => name.toLocaleLowerCase("pt-BR"))
  );
  if (uniqueNames.size !== guestNames.length) {
    return {
      success: false as const,
      error: "Não repita o mesmo convidado dentro de um convite.",
    };
  }

  return {
    success: true as const,
    data: {
      displayName: parsed.data.displayName,
      contactPhone,
      guestNames,
    } satisfies ParsedAdminInvitation,
  };
}
