import { weddingConfig } from "@/config/wedding";
import { MapLinks } from "./map-links";

export default function Home() {
  const { couple, event, content, rsvp } = weddingConfig;

  return (
    <main className="mx-auto min-h-screen max-w-3xl overflow-hidden bg-[var(--color-ivory)] text-[var(--color-ink)]">
      <section className="relative flex min-h-dvh flex-col items-center justify-center px-6 py-20 text-center">
        <div className="hero-content flex flex-col items-center">
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
          <time
            className="hero-date mt-8 text-sm tracking-[0.3em] text-[var(--color-gold)] uppercase"
            dateTime={event.isoDateTime}
          >
            {event.fullDate}
          </time>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">Nossa união</p>
        <h2 className="section-title">Um encontro de almas</h2>
        <p className="section-copy">{content.invitation}</p>
      </section>

      <figure className="bg-[color:color-mix(in_srgb,var(--color-gold)_7%,transparent)] px-7 py-20 text-center">
        <blockquote className="mx-auto max-w-xl font-[family-name:var(--font-playfair)] text-2xl leading-relaxed italic">
          “{content.verse}”
        </blockquote>
        <figcaption className="mt-6 text-xs tracking-[0.24em] text-[var(--color-gold)] uppercase">
          {content.verseReference}
        </figcaption>
      </figure>

      <section className="section">
        <p className="eyebrow">Os noivos</p>
        <h2 className="section-title">Nossa história</h2>
        <p className="section-copy">{content.story}</p>
        <p className="section-copy mt-5">{content.gratitude}</p>
      </section>

      <section className="section border-y border-[color:color-mix(in_srgb,var(--color-gold)_25%,transparent)]">
        <p className="eyebrow">A cerimônia</p>
        <h2 className="section-title">{event.ceremony.location}</h2>
        <p className="section-copy">{event.ceremony.address}</p>
        <MapLinks
          lat={event.ceremony.lat}
          lng={event.ceremony.lng}
          name={event.ceremony.location}
        />
      </section>

      <section className="grid gap-10 px-7 py-20 text-center sm:grid-cols-3">
        <div>
          <p className="eyebrow">Data</p>
          <p>{event.weekday}</p>
          <p>{event.fullDate}</p>
        </div>
        <div>
          <p className="eyebrow">Horário</p>
          <p>{event.time}</p>
          <p className="text-sm text-[var(--color-muted)]">
            Após a missa das 19h
          </p>
        </div>
        <div>
          <p className="eyebrow">Traje</p>
          <p>{event.attire}</p>
        </div>
      </section>

      <section className="section bg-[color:color-mix(in_srgb,var(--color-gold)_7%,transparent)]">
        <p className="eyebrow">A celebração</p>
        <h2 className="section-title">{event.reception.location}</h2>
        <p className="section-copy">{event.reception.details}</p>
      </section>

      <section className="section">
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

      <section className="section border-y border-[color:color-mix(in_srgb,var(--color-gold)_25%,transparent)]">
        <p className="eyebrow">Confirmação de presença</p>
        <h2 className="section-title">Sua presença é o nosso maior presente</h2>
        <p className="section-copy">
          Use o link individual recebido pelo WhatsApp para responder até{" "}
          {rsvp.deadlineLabel}.
        </p>
      </section>

      <footer className="px-7 py-24 text-center">
        <p className="font-[family-name:var(--font-playfair)] text-4xl text-[var(--color-gold)] italic">
          {content.closing}
        </p>
        <p className="mt-8 text-xs tracking-[0.25em] uppercase">
          {couple.names}
        </p>
      </footer>
    </main>
  );
}
