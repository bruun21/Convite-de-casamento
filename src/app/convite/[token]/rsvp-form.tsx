"use client";

import { FormEvent, useState } from "react";

interface Guest {
  id: string;
  name: string;
  attendance: "attending" | "declined" | null;
}

interface RsvpFormProps {
  token: string;
  guests: Guest[];
}

type Attendance = "attending" | "declined";

export function RsvpForm({ token, guests }: RsvpFormProps) {
  const [responses, setResponses] = useState<Record<string, Attendance>>(
    Object.fromEntries(
      guests.flatMap((guest) =>
        guest.attendance ? [[guest.id, guest.attendance]] : []
      )
    )
  );
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (Object.keys(responses).length !== guests.length) {
      setStatus("error");
      setErrorMessage("Selecione uma opção para cada convidado.");
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
          guests: guests.map((guest) => ({
            id: guest.id,
            attendance: responses[guest.id],
          })),
        }),
      });
      const data = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error ?? "Não foi possível enviar a resposta.");
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar a resposta."
      );
    }
  }

  if (status === "success") {
    return (
      <div
        className="border border-[var(--color-gold)] bg-white p-7 text-center"
        role="status"
      >
        <h3 className="font-[family-name:var(--font-playfair)] text-2xl">
          Resposta registrada
        </h3>
        <p className="mt-3 text-[var(--color-muted)]">
          Obrigado por confirmar. Você ainda pode atualizar a resposta.
        </p>
        <button
          className="button-outline mt-6"
          onClick={() => setStatus("idle")}
          type="button"
        >
          Atualizar resposta
        </button>
      </div>
    );
  }

  return (
    <form
      className="space-y-8 border border-[color:color-mix(in_srgb,var(--color-gold)_25%,transparent)] bg-white p-5 sm:p-8"
      onSubmit={handleSubmit}
    >
      <div aria-hidden="true" className="absolute -left-[10000px]">
        <label htmlFor="website">Site</label>
        <input
          autoComplete="off"
          id="website"
          name="website"
          tabIndex={-1}
          type="text"
        />
      </div>

      {guests.map((guest) => (
        <fieldset key={guest.id}>
          <legend className="mb-3 font-bold">{guest.name}</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["attending", "Vou comparecer"],
              ["declined", "Não poderei comparecer"],
            ].map(([value, label]) => (
              <label
                className="flex min-h-12 cursor-pointer items-center gap-3 border border-stone-300 px-4 has-checked:border-[var(--color-gold)] has-checked:bg-[color:color-mix(in_srgb,var(--color-gold)_10%,white)]"
                key={value}
              >
                <input
                  checked={responses[guest.id] === value}
                  name={`attendance-${guest.id}`}
                  onChange={() =>
                    setResponses((current) => ({
                      ...current,
                      [guest.id]: value as Attendance,
                    }))
                  }
                  required
                  type="radio"
                  value={value}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}

      {status === "error" && (
        <p
          className="border border-red-200 bg-red-50 p-3 text-sm text-red-800"
          role="alert"
        >
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
