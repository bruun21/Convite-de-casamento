import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { readInviteAccessInvitationId } from "@/lib/invite-access";
import { getInvitationById, markInvitationViewed } from "@/lib/rsvp";

import { ConviteEnvelopeGate } from "../convite-envelope-gate";
import { InvitationView } from "../invitation-view";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Seu convite | Suzyellen",
  robots: { index: false, follow: false },
};

export default async function PersonalInvitePage() {
  const invitationId = await readInviteAccessInvitationId();
  if (!invitationId) {
    redirect("/");
  }

  const invitation = await getInvitationById(invitationId);
  if (!invitation) {
    notFound();
  }

  if (invitation.status === "pending") {
    await markInvitationViewed(invitation.id);
  }

  return (
    <ConviteEnvelopeGate recipientName={invitation.displayName}>
      <InvitationView
        displayName={invitation.displayName}
        guests={invitation.guests}
      />
    </ConviteEnvelopeGate>
  );
}
