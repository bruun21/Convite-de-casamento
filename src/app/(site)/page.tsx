import { redirect } from "next/navigation";

import { readInviteAccessInvitationId } from "@/lib/invite-access";
import { PhoneEntryForm } from "../convite/phone-entry-form";

export default async function Home() {
  const invitationId = await readInviteAccessInvitationId();
  if (invitationId) {
    redirect("/convite/me");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl items-center bg-[var(--color-ivory)] px-5 py-14 sm:px-8">
      <PhoneEntryForm
        action="acesso"
        description="Digite os 4 últimos dígitos do telefone cadastrado no convite para ver seu nome e confirmar presença."
        title="Acesse seu convite"
      />
    </main>
  );
}
