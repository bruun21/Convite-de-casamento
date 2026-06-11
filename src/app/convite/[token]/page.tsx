import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { readInviteAccessInvitationId } from "@/lib/invite-access";
import { getInvitationByToken, markInvitationViewed } from "@/lib/rsvp";

import { ConviteEnvelopeGate } from "../convite-envelope-gate";
import { InvitationView } from "../invitation-view";
import { PhoneEntryForm } from "../phone-entry-form";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ token: string }>;
}

export function generateMetadata(): Metadata {
  return {
    title: "Seu convite | Adriele & João Paulo",
    robots: { index: false, follow: false },
  };
}

export default async function InvitationPage({ params }: PageProps) {
  const { token } = await params;
  const invitation = await getInvitationByToken(token);

  if (!invitation) {
    notFound();
  }

  const verifiedInvitationId = await readInviteAccessInvitationId();
  const isVerified = verifiedInvitationId === invitation.id;

  if (!isVerified) {
    return (
      <main className="mx-auto flex min-h-screen max-w-2xl items-center bg-[var(--color-ivory)] px-5 py-14 sm:px-8">
        <PhoneEntryForm
          action="verificar"
          description="Para ver seu nome e confirmar presença, informe os 4 últimos dígitos do telefone cadastrado neste convite."
          title="Quase lá"
          token={token}
        />
      </main>
    );
  }

  if (invitation.status === "pending") {
    await markInvitationViewed(invitation.id);
  }

  return (
    <ConviteEnvelopeGate recipientName={invitation.displayName}>
      <InvitationView
        displayName={invitation.displayName}
        guests={invitation.guests}
        token={token}
      />
    </ConviteEnvelopeGate>
  );
}
