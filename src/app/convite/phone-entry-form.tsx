"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface PhoneEntryFormProps {
  action: "acesso" | "verificar";
  token?: string;
  title?: string;
  description?: string;
}

export function PhoneEntryForm({
  action,
  token,
  title = "Acesse seu convite",
  description = "Digite os 4 últimos dígitos do telefone cadastrado para personalizar seu convite.",
}: PhoneEntryFormProps) {
  const router = useRouter();
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  function updateDigit(index: number, value: string) {
    const next = value.replace(/\D/g, "").slice(-1);
    const updated = [...digits];
    updated[index] = next;
    setDigits(updated);

    if (next && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, key: string) {
    if (key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(-4);
    if (!pasted) return;

    const updated = ["", "", "", ""];
    for (let index = 0; index < pasted.length; index += 1) {
      updated[index] = pasted[index] ?? "";
    }
    setDigits(updated);
    inputsRef.current[Math.min(pasted.length, 3)]?.focus();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const suffix = digits.join("");
    if (suffix.length !== 4) {
      setStatus("error");
      setErrorMessage("Informe os 4 últimos dígitos do seu telefone.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    const endpoint =
      action === "verificar" ? "/api/convite/verificar" : "/api/convite/acesso";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          suffix,
          ...(token ? { token } : {}),
          website: "",
        }),
      });

      const data = (await response.json()) as {
        success?: boolean;
        error?: string;
        redirectTo?: string;
      };

      if (!response.ok) {
        throw new Error(data.error ?? "Não foi possível validar o telefone.");
      }

      if (action === "acesso" && data.redirectTo) {
        router.push(data.redirectTo);
        router.refresh();
        return;
      }

      if (action === "verificar") {
        router.refresh();
        return;
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Não foi possível validar o telefone."
      );
    }
  }

  return (
    <form
      className="mx-auto max-w-md border border-[color:color-mix(in_srgb,var(--color-gold)_30%,transparent)] bg-white px-6 py-8 text-center shadow-[0_12px_40px_rgba(100,80,50,0.08)] sm:px-10"
      onSubmit={handleSubmit}
    >
      <div aria-hidden="true" className="absolute -left-[10000px]">
        <label htmlFor="website">Site</label>
        <input autoComplete="off" id="website" name="website" tabIndex={-1} type="text" />
      </div>

      <p className="eyebrow">Convite personalizado</p>
      <h1 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl italic">
        {title}
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">{description}</p>

      <div className="mt-8 flex justify-center gap-3">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(element) => {
              inputsRef.current[index] = element;
            }}
            aria-label={`Dígito ${index + 1}`}
            autoComplete="off"
            className="h-14 w-12 border border-[color:color-mix(in_srgb,var(--color-gold)_35%,transparent)] bg-[color:color-mix(in_srgb,var(--color-gold)_4%,white)] text-center text-2xl tracking-[0.2em] text-[var(--color-ink)] outline-none focus:border-[var(--color-gold)]"
            inputMode="numeric"
            maxLength={1}
            onChange={(event) => updateDigit(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event.key)}
            onPaste={handlePaste}
            type="text"
            value={digit}
          />
        ))}
      </div>

      {status === "error" && (
        <p className="mt-5 border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        className="button-outline mt-8 w-full disabled:cursor-wait disabled:opacity-60"
        disabled={status === "submitting"}
        type="submit"
      >
        {status === "submitting" ? "Verificando..." : "Abrir meu convite"}
      </button>
    </form>
  );
}
