import type { Metadata } from "next";
import Link from "next/link";

import { getAdminStats, searchInvitations } from "@/lib/admin";

import { AdminCreateForm } from "./admin-create-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Administração | Formatura da Suzyellen",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

const statusLabels = {
  pending: "Pendente",
  viewed: "Visualizado",
  responded: "Respondido",
} as const;

export default async function AdminPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const [stats, invitationList] = await Promise.all([
    getAdminStats(),
    searchInvitations(q),
  ]);

  return (
    <main className="min-h-screen bg-stone-100 p-4 text-stone-950 sm:p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm tracking-[0.2em] text-amber-700 uppercase">
              Administração
            </p>
            <h1 className="mt-2 text-3xl font-bold">
              Confirmações de presença
            </h1>
          </div>
          <Link
            className="min-h-11 rounded border border-stone-300 bg-white px-4 py-2"
            href="/admin/export"
          >
            Exportar CSV
          </Link>
        </header>

        <section
          aria-label="Resumo"
          className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            ["Convites respondidos", stats.invitations.responded],
            ["Pessoas confirmadas", stats.people.attending],
            ["Pessoas recusadas", stats.people.declined],
            ["Pessoas pendentes", stats.people.pending],
          ].map(([label, value]) => (
            <div className="rounded-lg bg-white p-5 shadow-sm" key={label}>
              <p className="text-sm text-stone-600">{label}</p>
              <p className="mt-2 text-3xl font-bold">{value}</p>
            </div>
          ))}
        </section>

        <section className="mb-8 rounded-lg bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="text-xl font-bold">Cadastrar convite</h2>
            <p className="mt-1 text-sm text-stone-600">
              Depois do cadastro, o convidado acessa o site usando os quatro
              últimos dígitos do telefone.
            </p>
          </div>
          <AdminCreateForm />
        </section>

        <section className="overflow-hidden rounded-lg bg-white shadow-sm">
          <form className="border-b border-stone-200 p-4" role="search">
            <label className="sr-only" htmlFor="q">
              Pesquisar convite
            </label>
            <input
              className="min-h-11 w-full rounded border border-stone-300 px-4"
              defaultValue={q}
              id="q"
              maxLength={80}
              name="q"
              placeholder="Pesquisar por nome do convite"
              type="search"
            />
          </form>

          <div className="overflow-x-auto">
            <table className="w-full min-w-3xl text-left">
              <thead className="bg-stone-50 text-sm text-stone-600">
                <tr>
                  <th className="px-5 py-3">Convite</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Telefone</th>
                  <th className="px-5 py-3">Convidados</th>
                  <th className="px-5 py-3">Atualizado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {invitationList.map((invitation) => (
                  <tr key={invitation.id}>
                    <td className="px-5 py-4 font-medium">
                      {invitation.displayName}
                    </td>
                    <td className="px-5 py-4">
                      {statusLabels[invitation.status]}
                    </td>
                    <td className="px-5 py-4 font-mono text-sm">
                      •••• {invitation.contactPhone?.slice(-4) ?? "—"}
                    </td>
                    <td className="px-5 py-4">
                      <ul className="space-y-1">
                        {invitation.guests.map((guest) => (
                          <li key={guest.id}>
                            {guest.name}:{" "}
                            {guest.attendance === "attending"
                              ? "confirmado"
                              : guest.attendance === "declined"
                                ? "recusado"
                                : "pendente"}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-5 py-4 text-sm text-stone-600">
                      {new Intl.DateTimeFormat("pt-BR", {
                        dateStyle: "short",
                        timeStyle: "short",
                        timeZone: "America/Cuiaba",
                      }).format(invitation.updatedAt)}
                    </td>
                  </tr>
                ))}
                {invitationList.length === 0 && (
                  <tr>
                    <td className="px-5 py-10 text-center" colSpan={5}>
                      Nenhum convite encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
