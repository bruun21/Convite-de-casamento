import Link from "next/link";

import { weddingConfig } from "@/config/wedding";
import { RsvpForm } from "@/app/convite/[token]/rsvp-form";
import {
  personalizeAttire,
  personalizeClosing,
  personalizeGratitude,
  personalizeInvitation,
  personalizePhotosNote,
  personalizeReceptionDetails,
  personalizeRsvpIntro,
  personalizeRsvpTitle,
  resolveAddressee,
} from "@/lib/personalize";

import { MapLinks } from "../map-links";
import { RiceFall } from "../rice-fall";
import { CameraIcon } from "../camera-icon";

interface Guest {
  id: string;
  name: string;
  attendance: "attending" | "declined" | null;
  receptionAttendance: "attending" | "declined" | null;
}

interface HomeContentProps {
  displayName?: string;
  guests?: Guest[];
  token?: string;
  extraCompanionCount?: number | null;
}

export function HomeContent({
  displayName,
  guests,
  token,
  extraCompanionCount = null,
}: HomeContentProps = {}) {
  const { couple, event, content, rsvp, photos, gifts } = weddingConfig;
  const isPersonalized = Boolean(displayName && guests);
  const addressee = resolveAddressee(displayName);

  return (
    <main className="mx-auto min-h-screen max-w-3xl overflow-hidden bg-[var(--color-ivory)] text-[var(--color-ink)]">
      <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
        <RiceFall />
        <div className="hero-content relative z-10 flex flex-col items-center">
          {isPersonalized ? (
            <>
              <p className="hero-eyebrow mb-6 text-sm tracking-[0.35em] text-[var(--color-gold)] uppercase">
                Convite especial
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.svg"
                alt="Logo do casamento"
                width={180}
                height={180}
                className="hero-logo mb-6"
              />
              <p className="text-sm tracking-[0.2em] text-[var(--color-gold)] uppercase">Olá,</p>
              <h1 className="hero-title mt-2 font-[family-name:var(--font-playfair)] text-5xl leading-tight italic sm:text-6xl">
                {displayName}
              </h1>
              <p className="mt-6 font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl">
                {couple.names}
              </p>
            </>
          ) : (
            <>
              <p className="hero-eyebrow mb-8 text-sm tracking-[0.35em] text-[var(--color-gold)] uppercase">
                A & J
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.svg"
                alt="Logo do casamento"
                width={220}
                height={220}
                className="hero-logo mb-8"
              />
              <h1 className="hero-title font-[family-name:var(--font-playfair)] text-5xl leading-tight sm:text-7xl">
                {couple.names}
              </h1>
            </>
          )}
          <time
            className="hero-date mt-8 text-sm tracking-[0.3em] text-[var(--color-gold)] uppercase"
            dateTime={event.isoDateTime}
          >
            {event.fullDate}
          </time>
        </div>
      </section>

      <section className="px-4 pb-14 pt-8 sm:px-7">
        <div className="photos-grid grid grid-cols-3 gap-2 sm:gap-3" data-reveal>
          <div className="overflow-hidden rounded shadow-md" style={{ aspectRatio: "3/4", transform: "rotate(-2deg)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/fotos/foto-1.jpg" alt="Adriele e João Paulo" className="h-full w-full object-cover object-top" />
          </div>
          <div className="overflow-hidden rounded shadow-md" style={{ aspectRatio: "3/4" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/fotos/foto-3.jpg" alt="Adriele e João Paulo" className="h-full w-full object-cover object-top" />
          </div>
          <div className="overflow-hidden rounded shadow-md" style={{ aspectRatio: "3/4", transform: "rotate(2deg)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/fotos/foto-2.jpg" alt="Adriele e João Paulo" className="h-full w-full object-cover object-center" />
          </div>
        </div>
      </section>

      <section className="section" data-reveal>
        <p className="eyebrow">Nossa união</p>
        <h2 className="section-title">Um encontro de almas</h2>
        <p className="section-copy">{personalizeInvitation(addressee)}</p>
      </section>

      <figure
        className="bg-[color:color-mix(in_srgb,var(--color-gold)_7%,transparent)] px-7 py-20 text-center"
        data-reveal
      >
        <blockquote className="mx-auto max-w-xl font-[family-name:var(--font-playfair)] text-2xl leading-relaxed italic">
          &ldquo;{content.verse}&rdquo;
        </blockquote>
        <figcaption className="mt-6 font-[family-name:var(--font-playfair)] text-sm font-medium tracking-wide text-[var(--color-gold)] sm:text-base">
          {content.verseReference}
        </figcaption>
      </figure>

      <section className="section" data-reveal>
        <p className="eyebrow">Os noivos</p>
        <h2 className="section-title">Nossa história</h2>
        <p className="section-copy">{content.story}</p>
        <p className="section-copy mt-5">{personalizeGratitude(addressee)}</p>
      </section>

      <section className="section border-y border-[color:color-mix(in_srgb,var(--color-gold)_25%,transparent)]" data-reveal>
        <p className="eyebrow">A cerimônia</p>
        <h2 className="section-title">{event.ceremony.location}</h2>
        <p className="section-copy">{event.ceremony.address}</p>
        <MapLinks
          lat={event.ceremony.lat}
          lng={event.ceremony.lng}
          name={event.ceremony.location}
        />
      </section>

      <section className="grid gap-10 px-7 py-20 text-center sm:grid-cols-3" data-reveal>
        <div>
          <p className="eyebrow">Data</p>
          <p>{event.weekday}</p>
          <p>{event.fullDate}</p>
        </div>
        <div>
          <p className="eyebrow">Horário</p>
          <p>{event.time}</p>
          <p className="text-sm text-[var(--color-muted)]">Após a missa das 19h</p>
        </div>
        <div>
          <p className="eyebrow">Traje</p>
          <p>{personalizeAttire(addressee)}</p>
        </div>
      </section>

      <section className="section bg-[color:color-mix(in_srgb,var(--color-gold)_7%,transparent)]" data-reveal>
        <p className="eyebrow">A celebração</p>
        <h2 className="section-title">{event.reception.location}</h2>
        <p className="section-copy">{personalizeReceptionDetails(addressee)}</p>

        <figure
          className="mx-auto mt-12 max-w-xl border-y border-[color:color-mix(in_srgb,var(--color-gold)_22%,transparent)] py-8 text-center"
          data-reveal
        >
          <p className="eyebrow">Onde tudo começou</p>
          <blockquote className="mt-5 font-[family-name:var(--font-playfair)] text-xl leading-relaxed italic sm:text-2xl">
            &ldquo;{event.reception.proposalStory}&rdquo;
          </blockquote>
        </figure>

        <div className="photos-grid mt-8 space-y-3" data-reveal>
          <div
            className="overflow-hidden rounded-lg shadow-lg"
            style={{ aspectRatio: "16/10", transform: "rotate(-0.5deg)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={event.reception.photos[0].src}
              alt={event.reception.photos[0].alt}
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {event.reception.photos.slice(1).map((photo, index) => (
              <div
                key={photo.src}
                className="overflow-hidden rounded-lg shadow-md"
                style={{
                  aspectRatio: "4/5",
                  transform: index === 0 ? "rotate(-1deg)" : "rotate(1deg)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        <MapLinks
          lat={event.reception.lat}
          lng={event.reception.lng}
          name={event.reception.location}
          placeUrl={event.reception.placeUrl}
        />
        <p className="section-note mx-auto mt-10 max-w-md whitespace-pre-line rounded border border-[color:color-mix(in_srgb,var(--color-gold)_25%,transparent)] bg-[color:color-mix(in_srgb,var(--color-gold)_6%,var(--color-ivory))] px-6 py-5 text-sm leading-relaxed text-[var(--color-muted)]">
          {event.reception.receptionNote}
        </p>
      </section>

      <section className="section border-y border-[color:color-mix(in_srgb,var(--color-gold)_25%,transparent)]" data-reveal>
        <p className="eyebrow">Cardápio</p>
        <h2 className="section-title">O que teremos por lá</h2>
        <p className="section-copy">
          O Talavera preparou um cardápio especial para a noite. Confira as opções antes de
          chegar e já vá de olho no que vai pedir.
        </p>
        <div className="mt-10 flex justify-center">
          <a
            href={event.reception.menuUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="button-outline"
          >
            Ver cardápio completo
          </a>
        </div>
      </section>

      <section className="section" data-reveal>
        <p className="eyebrow">Cronograma</p>
        <h2 className="section-title">O dia do casamento</h2>
        <ol className="mx-auto mt-10 max-w-sm space-y-6 text-left">
          {event.timeline.map((item) => (
            <li className="flex gap-6" key={`${item.time}-${item.label}`}>
              <time className="w-14 shrink-0 font-bold text-[var(--color-gold)]">
                {item.time}
              </time>
              <span>{item.label}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="section border-y border-[color:color-mix(in_srgb,var(--color-gold)_25%,transparent)]" data-reveal>
        <p className="eyebrow">Presentes</p>
        <h2 className="section-title">{gifts.title}</h2>
        <p className="section-copy">{gifts.description}</p>
        <div className="mx-auto mt-10 max-w-xs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={gifts.qrAlt}
            className="mx-auto h-auto w-full"
            src={gifts.qrImage}
          />
        </div>
      </section>

      <section className="section border-y border-[color:color-mix(in_srgb,var(--color-gold)_25%,transparent)]" data-reveal>
        <p className="eyebrow">Confirmação de presença</p>
        <h2 className="section-title">
          {personalizeRsvpTitle(addressee, isPersonalized)}
        </h2>
        {isPersonalized ? (
          <>
            <p className="section-copy">
              {personalizeRsvpIntro(addressee, rsvp.deadlineLabel)}
            </p>
            <div className="mt-10">
              <RsvpForm
                extraCompanionCount={extraCompanionCount}
                guests={guests!}
                maxExtraCompanions={rsvp.maxExtraCompanions}
                receptionNote={event.reception.receptionNote}
                token={token}
              />
            </div>
          </>
        ) : (
          <>
            <p className="section-copy">
              Use o link individual recebido pelo WhatsApp ou acesse com os 4 últimos dígitos do
              seu telefone até {rsvp.deadlineLabel}.
            </p>
            <Link className="button-outline mt-10 inline-flex" href="/">
              Acessar meu convite
            </Link>
          </>
        )}
      </section>

      <section className="section" data-reveal>
        <div className="flex justify-center">
          <CameraIcon />
        </div>
        <h2 className="section-title mt-4">O olhar de vocês</h2>
        <p className="section-copy">
          Esta noite não terá fotógrafo profissional — queremos estar de verdade em cada
          momento, sem câmeras no meio.
        </p>
        <p className="section-copy mt-4">{personalizePhotosNote(addressee)}</p>
        <a
          href={photos.albumUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="button-outline mt-10 inline-flex"
        >
          Enviar fotos para o álbum
        </a>
      </section>

      <footer className="px-7 py-24 text-center" data-reveal>
        <p className="font-[family-name:var(--font-playfair)] text-4xl text-[var(--color-gold)] italic">
          {personalizeClosing(addressee)}
        </p>
        <p className="mt-8 text-xs tracking-[0.25em] uppercase">{couple.names}</p>
      </footer>
    </main>
  );
}
