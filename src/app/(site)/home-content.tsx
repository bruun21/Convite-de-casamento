import Link from "next/link";

import { weddingConfig } from "@/config/wedding";
import { RsvpForm } from "@/app/convite/[token]/rsvp-form";
import { FormattedText } from "@/lib/formatted-text";

import { MapLinks } from "../map-links";
import { RiceFall } from "../rice-fall";

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
}

export function HomeContent({
  displayName,
  guests,
  token,
}: HomeContentProps = {}) {
  const { couple, event, content, rsvp, photos, gifts } = weddingConfig;
  const isPersonalized = Boolean(displayName && guests);

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
                src="/logo.png"
                alt="Logo da formatura"
                width={180}
                height={180}
                className="hero-logo mb-6"
              />
              <p className="text-sm tracking-[0.2em] text-[var(--color-gold)] uppercase">Olá,</p>
              <h1 className="hero-title mt-2 font-[family-name:var(--font-playfair)] text-5xl leading-tight italic sm:text-6xl">
                {displayName}
              </h1>
              <p className="mt-6 font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl">
                Formatura de {couple.firstName}
              </p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--color-muted)]">
                É uma alegria compartilhar este convite com você.
              </p>
            </>
          ) : (
            <>
              <p className="hero-eyebrow mb-8 text-sm tracking-[0.35em] text-[var(--color-gold)] uppercase">
                Festa de Formatura
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Logo da formatura"
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
            <img src={photos.hero[0].src} alt={photos.hero[0].alt} className="h-full w-full object-cover object-top" />
          </div>
          <div className="overflow-hidden rounded shadow-md" style={{ aspectRatio: "3/4" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photos.hero[1].src} alt={photos.hero[1].alt} className="h-full w-full object-cover object-top" />
          </div>
          <div className="overflow-hidden rounded shadow-md" style={{ aspectRatio: "3/4", transform: "rotate(2deg)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photos.hero[2].src} alt={photos.hero[2].alt} className="h-full w-full object-cover object-center" />
          </div>
        </div>
      </section>

      <section className="section" data-reveal>
        <p className="eyebrow">Boas-vindas</p>
        <h2 className="section-title">{content.welcomeTitle}</h2>
        <p className="section-copy whitespace-pre-line">
          <FormattedText text={content.welcome} />
        </p>
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
        <p className="eyebrow">Minha trajetória</p>
        <h2 className="section-title">Até aqui</h2>
        <p className="section-copy">{content.story}</p>
        <p className="section-copy mt-5">{content.gratitude}</p>
      </section>

      <section className="section border-y border-[color:color-mix(in_srgb,var(--color-gold)_25%,transparent)]" data-reveal>
        <p className="eyebrow">O evento</p>
        <h2 className="section-title">{event.venue.location}</h2>
        <p className="section-copy">{event.venue.address}</p>
        <MapLinks
          lat={event.venue.lat}
          lng={event.venue.lng}
          name={`${event.venue.location} - Campina, Belém - PA`}
          placeUrl={event.venue.placeUrl}
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
        </div>
        <div>
          <p className="eyebrow">Traje</p>
          <p>{event.attire}</p>
        </div>
      </section>

      <section className="section bg-[color:color-mix(in_srgb,var(--color-gold)_7%,transparent)]" data-reveal>
        <p className="eyebrow">Atenção</p>
        <h2 className="section-title">Observações</h2>
        <ul className="mx-auto mt-10 max-w-md space-y-4 text-left">
          {event.notes.map((note) => (
            <li className="flex gap-4" key={note}>
              <span className="mt-1 shrink-0 text-[var(--color-gold)]">•</span>
              <span className="leading-relaxed">{note}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section" data-reveal>
        <p className="eyebrow">Cronograma</p>
        <h2 className="section-title">Como vai ser a noite</h2>
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

        <ul className="mx-auto mt-10 grid max-w-md grid-cols-2 gap-3">
          {gifts.options.map((option) => (
            <li
              className="rounded border border-[color:color-mix(in_srgb,var(--color-gold)_25%,transparent)] bg-white px-4 py-5 text-center"
              key={option.amount}
            >
              <p className="text-xs tracking-[0.16em] text-[var(--color-muted)] uppercase">
                {option.label}
              </p>
              <p className="mt-2 font-[family-name:var(--font-playfair)] text-2xl">
                {option.amount}
              </p>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-10 max-w-xs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={gifts.qrAlt}
            className="mx-auto h-auto w-full"
            src={gifts.qrImage}
          />
        </div>
        <p className="section-note mx-auto mt-6 max-w-sm text-sm leading-relaxed text-[var(--color-muted)]">
          Chave Pix: <strong>{gifts.pixKey}</strong>
          <br />
          {gifts.pixName}
        </p>
      </section>

      <section className="section border-y border-[color:color-mix(in_srgb,var(--color-gold)_25%,transparent)]" data-reveal>
        <p className="eyebrow">Confirmação de presença</p>
        <h2 className="section-title">Você vai comigo?</h2>
        {isPersonalized ? (
          <>
            <p className="section-copy">
              Responda por cada pessoa deste convite até {rsvp.deadlineLabel}.
            </p>
            <div className="mt-10">
              <RsvpForm guests={guests!} token={token} />
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

      <footer className="px-7 py-24 text-center" data-reveal>
        <div
          className="mx-auto mb-12 max-w-sm overflow-hidden rounded shadow-lg"
          style={{ aspectRatio: "3/4" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos.closing.src}
            alt={photos.closing.alt}
            className="h-full w-full object-cover object-center"
            loading="lazy"
          />
        </div>
        <p className="font-[family-name:var(--font-playfair)] text-4xl text-[var(--color-gold)] italic">
          {content.closing}
        </p>
        <p className="mt-8 text-xs tracking-[0.25em] uppercase">{couple.names}</p>
      </footer>
    </main>
  );
}
