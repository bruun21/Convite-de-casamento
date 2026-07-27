"use client";

import { FormEvent, useState } from "react";

interface Guest {
  id: string;
  name: string;
  attendance: "attending" | "declined" | null;
  receptionAttendance: "attending" | "declined" | null;
}

interface RsvpFormProps {
  token?: string;
  guests: Guest[];
  extraCompanionCount?: number | null;
  maxExtraCompanions?: number;
}

type Attendance = "attending" | "declined";

type GuestResponses = Record<string, { attendance: Attendance | null }>;

export function RsvpForm({
  token,
  guests,
  extraCompanionCount = null,
  maxExtraCompanions = 5,
}: RsvpFormProps) {
  const [responses, setResponses] = useState<GuestResponses>(
    Object.fromEntries(
      guests.map((g) => [g.id, { attendance: g.attendance ?? null }])
    )
  );
  const [bringingCompanion, setBringingCompanion] = useState<boolean | null>(
    extraCompanionCount === null ? null : extraCompanionCount > 0
  );
  const [companionCount, setCompanionCount] = useState(
    extraCompanionCount && extraCompanionCount > 0 ? extraCompanionCount : 1
  );
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function setAttendance(guestId: string, value: Attendance) {
    setResponses((curr) => ({ ...curr, [guestId]: { attendance: value } }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const allAnswered = guests.every((g) => responses[g.id]?.attendance != null);
    if (!allAnswered) {
      setStatus("error");
      setErrorMessage("Confirme a presença para cada convidado.");
      return;
    }

    if (bringingCompanion === null) {
      setStatus("error");
      setErrorMessage("Informe se você vai levar acompanhante(s).");
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
          ...(token ? { token } : {}),
          website: formData.get("website")?.toString() ?? "",
          guests: guests.map((g) => ({
            id: g.id,
            attendance: responses[g.id].attendance,
          })),
          extraCompanionCount: bringingCompanion ? companionCount : 0,
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

      {/* ── Presença ── */}
      <div>
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-[color:color-mix(in_srgb,var(--color-gold)_30%,transparent)]" />
          <p className="eyebrow">Presença</p>
          <span className="h-px flex-1 bg-[color:color-mix(in_srgb,var(--color-gold)_30%,transparent)]" />
        </div>
        <div className="space-y-8">
          {guests.map((guest) => (
            <fieldset key={`attendance-${guest.id}`}>
              <legend className="mb-3 font-bold">{guest.name}</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {(["attending", "declined"] as const).map((value) => (
                  <label
                    className="flex min-h-12 cursor-pointer items-center gap-3 border border-stone-300 px-4 has-checked:border-[var(--color-gold)] has-checked:bg-[color:color-mix(in_srgb,var(--color-gold)_10%,white)]"
                    key={value}
                  >
                    <input
                      checked={responses[guest.id]?.attendance === value}
                      name={`attendance-${guest.id}`}
                      onChange={() => setAttendance(guest.id, value)}
                      required
                      type="radio"
                      value={value}
                    />
                    <span>{value === "attending" ? "Sim, vou ao evento!" : "Não vou poder ir"}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </div>
      </div>

      {/* ── Acompanhantes ── */}
      <div>
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-[color:color-mix(in_srgb,var(--color-gold)_30%,transparent)]" />
          <p className="eyebrow">Acompanhantes</p>
          <span className="h-px flex-1 bg-[color:color-mix(in_srgb,var(--color-gold)_30%,transparent)]" />
        </div>

        <p className="mb-6 text-sm leading-relaxed text-[var(--color-muted)]">
          Além das pessoas listadas acima, alguém mais virá com você?
        </p>

        <fieldset>
          <legend className="sr-only">Vai levar acompanhante?</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {(
              [
                { value: false, label: "Não, vou sozinho(a)" },
                { value: true, label: "Sim, vou levar acompanhante(s)" },
              ] as const
            ).map(({ value, label }) => (
              <label
                className="flex min-h-12 cursor-pointer items-center gap-3 border border-stone-300 px-4 has-checked:border-[var(--color-gold)] has-checked:bg-[color:color-mix(in_srgb,var(--color-gold)_10%,white)]"
                key={String(value)}
              >
                <input
                  checked={bringingCompanion === value}
                  name="bringing-companion"
                  onChange={() => setBringingCompanion(value)}
                  required
                  type="radio"
                  value={value ? "yes" : "no"}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {bringingCompanion && (
          <div className="mt-6">
            <label className="mb-2 block text-sm font-bold" htmlFor="companion-count">
              Quantos acompanhantes?
            </label>
            <select
              className="min-h-12 w-full border border-stone-300 bg-white px-4 text-sm"
              id="companion-count"
              onChange={(event) => setCompanionCount(Number(event.target.value))}
              value={companionCount}
            >
              {Array.from({ length: maxExtraCompanions }, (_, index) => index + 1).map(
                (count) => (
                  <option key={count} value={count}>
                    {count} {count === 1 ? "acompanhante" : "acompanhantes"}
                  </option>
                )
              )}
            </select>
          </div>
        )}
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
