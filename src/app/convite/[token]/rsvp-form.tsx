"use client";

import { FormEvent, useState } from "react";

interface Guest {
  id: string;
  name: string;
  attendance: "attending" | "declined" | null;
  receptionAttendance: "attending" | "declined" | null;
}

interface RsvpFormProps {
  token: string;
  guests: Guest[];
  receptionNote: string;
}

type Attendance = "attending" | "declined";

type GuestResponses = Record<string, { ceremony: Attendance | null; reception: Attendance | null }>;

export function RsvpForm({ token, guests, receptionNote }: RsvpFormProps) {
  const [responses, setResponses] = useState<GuestResponses>(
    Object.fromEntries(
      guests.map((g) => [
        g.id,
        {
          ceremony: g.attendance ?? null,
          reception: g.receptionAttendance ?? null,
        },
      ])
    )
  );
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function setCeremony(guestId: string, value: Attendance) {
    setResponses((curr) => ({ ...curr, [guestId]: { ...curr[guestId], ceremony: value } }));
  }
  function setReception(guestId: string, value: Attendance) {
    setResponses((curr) => ({ ...curr, [guestId]: { ...curr[guestId], reception: value } }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const allCeremonyAnswered = guests.every((g) => responses[g.id]?.ceremony != null);
    if (!allCeremonyAnswered) {
      setStatus("error");
      setErrorMessage("Confirme a presença na cerimônia para cada convidado.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          website: formData.get("website")?.toString() ?? "",
          guests: guests.map((g) => ({
            id: g.id,
            attendance: responses[g.id].ceremony,
            receptionAttendance: responses[g.id].reception ?? undefined,
          })),
        }),
      });
      const data = (await response.json()) as { success?: boolean; error?: string };

      if (!response.ok) throw new Error(data.error ?? "Não foi possível enviar a resposta.");
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Não foi possível enviar a resposta."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="border border-[var(--color-gold)] bg-white p-7 text-center" role="status">
        <h3 className="font-[family-name:var(--font-playfair)] text-2xl">Resposta registrada</h3>
        <p className="mt-3 text-[var(--color-muted)]">
          Obrigado por confirmar. Você ainda pode atualizar a resposta.
        </p>
        <button className="button-outline mt-6" onClick={() => setStatus("idle")} type="button">
          Atualizar resposta
        </button>
      </div>
    );
  }

  return (
    <form
      className="space-y-10 border border-[color:color-mix(in_srgb,var(--color-gold)_25%,transparent)] bg-white p-5 sm:p-8"
      onSubmit={handleSubmit}
    >
      {/* honeypot */}
      <div aria-hidden="true" className="absolute -left-[10000px]">
        <label htmlFor="website">Site</label>
        <input autoComplete="off" id="website" name="website" tabIndex={-1} type="text" />
      </div>

      {/* ── Cerimônia ── */}
      <div>
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-[color:color-mix(in_srgb,var(--color-gold)_30%,transparent)]" />
          <p className="eyebrow">Cerimônia</p>
          <span className="h-px flex-1 bg-[color:color-mix(in_srgb,var(--color-gold)_30%,transparent)]" />
        </div>
        <div className="space-y-8">
          {guests.map((guest) => (
            <fieldset key={`ceremony-${guest.id}`}>
              <legend className="mb-3 font-bold">{guest.name}</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {(["attending", "declined"] as const).map((value) => (
                  <label
                    className="flex min-h-12 cursor-pointer items-center gap-3 border border-stone-300 px-4 has-checked:border-[var(--color-gold)] has-checked:bg-[color:color-mix(in_srgb,var(--color-gold)_10%,white)]"
                    key={value}
                  >
                    <input
                      checked={responses[guest.id]?.ceremony === value}
                      name={`ceremony-${guest.id}`}
                      onChange={() => setCeremony(guest.id, value)}
                      required
                      type="radio"
                      value={value}
                    />
                    <span>{value === "attending" ? "Vou comparecer" : "Não poderei comparecer"}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </div>
      </div>

      {/* ── Recepção ── */}
      <div>
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-[color:color-mix(in_srgb,var(--color-gold)_30%,transparent)]" />
          <p className="eyebrow">Recepção</p>
          <span className="h-px flex-1 bg-[color:color-mix(in_srgb,var(--color-gold)_30%,transparent)]" />
        </div>

        <p className="mb-6 rounded border border-[color:color-mix(in_srgb,var(--color-gold)_20%,transparent)] bg-[color:color-mix(in_srgb,var(--color-gold)_6%,white)] px-5 py-4 text-sm leading-relaxed text-[var(--color-muted)]">
          {receptionNote}
        </p>

        <div className="space-y-8">
          {guests.map((guest) => (
            <fieldset key={`reception-${guest.id}`}>
              <legend className="mb-3 font-bold">{guest.name}</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {(["attending", "declined"] as const).map((value) => (
                  <label
                    className="flex min-h-12 cursor-pointer items-center gap-3 border border-stone-300 px-4 has-checked:border-[var(--color-gold)] has-checked:bg-[color:color-mix(in_srgb,var(--color-gold)_10%,white)]"
                    key={value}
                  >
                    <input
                      checked={responses[guest.id]?.reception === value}
                      name={`reception-${guest.id}`}
                      onChange={() => setReception(guest.id, value)}
                      type="radio"
                      value={value}
                    />
                    <span>{value === "attending" ? "Vou participar" : "Não participarei"}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </div>
      </div>

      {status === "error" && (
        <p className="border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        className="min-h-12 w-full bg-[var(--color-ink)] px-6 text-sm tracking-[0.16em] text-white uppercase disabled:cursor-wait disabled:opacity-60"
        disabled={status === "submitting"}
        type="submit"
      >
        {status === "submitting" ? "Enviando..." : "Confirmar presença"}
      </button>
    </form>
  );
}
