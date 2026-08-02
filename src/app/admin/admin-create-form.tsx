"use client";

import { useActionState, useEffect, useRef } from "react";

import { createInvitation } from "./actions";

const initialState = {
  status: "idle" as const,
  message: "",
};

export function AdminCreateForm() {
  const [state, formAction, isPending] = useActionState(
    createInvitation,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form
      action={formAction}
      className="grid gap-4 md:grid-cols-2"
      ref={formRef}
    >
      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="displayName">
          Nome do convite
        </label>
        <input
          className="min-h-11 w-full rounded border border-stone-300 px-4"
          id="displayName"
          maxLength={120}
          name="displayName"
          placeholder="Ex.: Família Silva"
          required
        />
      </div>

      <div>
        <label
          className="mb-1 block text-sm font-medium"
          htmlFor="contactPhone"
        >
          Telefone com DDD
        </label>
        <input
          autoComplete="tel"
          className="min-h-11 w-full rounded border border-stone-300 px-4"
          id="contactPhone"
          inputMode="tel"
          maxLength={30}
          name="contactPhone"
          placeholder="(91) 99999-1234"
          required
          type="tel"
        />
      </div>

      <div className="md:col-span-2">
        <label className="mb-1 block text-sm font-medium" htmlFor="guestNames">
          Convidados
        </label>
        <textarea
          className="min-h-32 w-full rounded border border-stone-300 px-4 py-3"
          id="guestNames"
          maxLength={1500}
          name="guestNames"
          placeholder={"Digite um nome por linha\nEx.: Maria Silva\nJoão Silva"}
          required
        />
        <p className="mt-1 text-sm text-stone-600">
          Cada pessoa poderá confirmar ou recusar individualmente.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 md:col-span-2">
        <button
          className="min-h-11 rounded bg-stone-950 px-5 py-2 font-medium text-white disabled:opacity-60"
          disabled={isPending}
          type="submit"
        >
          {isPending ? "Cadastrando..." : "Cadastrar convite"}
        </button>
        <p
          aria-live="polite"
          className={
            state.status === "error"
              ? "text-sm text-red-700"
              : "text-sm text-emerald-700"
          }
        >
          {state.message}
        </p>
      </div>
    </form>
  );
}
