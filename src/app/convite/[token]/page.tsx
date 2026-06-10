import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { weddingConfig } from "@/config/wedding";
import { getInvitationByToken, markInvitationViewed } from "@/lib/rsvp";
import { MapLinks } from "@/app/map-links";

import { RsvpForm } from "./rsvp-form";

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

  if (invitation.status === "pending") {
    await markInvitationViewed(invitation.id);
  }

  const { couple, event, content, rsvp } = weddingConfig;

  return (
    <main className="mx-auto min-h-screen max-w-2xl bg-[var(--color-ivory)] px-5 py-14 text-[var(--color-ink)] sm:px-8">
      <header className="text-center">
        <p className="eyebrow">Convite especial</p>
        <p className="mt-8 text-sm text-[var(--color-gold)]">Olá,</p>
        <h1 className="mt-2 font-[family-name:var(--font-playfair)] text-4xl italic sm:text-5xl">
          {invitation.displayName}
        </h1>
        <p className="section-copy">{content.invitation}</p>
      </header>

      <section className="mt-14">
        <div className="mb-8 text-center">
          <p className="eyebrow">Confirmação de presença</p>
          <h2 className="section-title">Você estará conosco?</h2>
          <p className="section-copy">
            Responda por cada pessoa deste convite até {rsvp.deadlineLabel}.
          </p>
        </div>
        <RsvpForm guests={invitation.guests} token={token} />
      </section>

      <section className="mt-16 grid gap-8 border-y border-[color:color-mix(in_srgb,var(--color-gold)_25%,transparent)] py-10 text-center sm:grid-cols-2">
        <div>
          <p className="eyebrow">Quando</p>
          <p className="mt-3">{event.fullDate}</p>
          <p>{event.time}</p>
        </div>
        <div>
          <p className="eyebrow">Onde</p>
          <p className="mt-3">{event.ceremony.location}</p>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            {event.ceremony.address}
          </p>
          <MapLinks
            lat={event.ceremony.lat}
            lng={event.ceremony.lng}
            name={event.ceremony.location}
          />
        </div>
      </section>

      <footer className="py-16 text-center">
        <p className="font-[family-name:var(--font-playfair)] text-3xl text-[var(--color-gold)] italic">
          {content.closing}
        </p>
        <p className="mt-6 text-xs tracking-[0.24em] uppercase">
          {couple.names}
        </p>
      </footer>
    </main>
  );
}
