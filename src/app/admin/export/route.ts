import { db } from "@/db";
import { buildCsv } from "@/lib/csv";

export const dynamic = "force-dynamic";

export async function GET() {
  const allGuests = await db.query.guests.findMany({
    with: { invitation: true },
    orderBy: (table, { asc }) => [asc(table.name)],
  });

  const rows = [
    [
      "Nome",
      "Convite",
      "Status",
      "Telefone",
      "Acompanhantes extras",
      "Atualizado em",
    ],
    ...allGuests.map((guest) => [
      guest.name,
      guest.invitation.displayName,
      guest.attendance === "attending"
        ? "Confirmado"
        : guest.attendance === "declined"
          ? "Recusado"
          : "Pendente",
      guest.invitation.contactPhone,
      guest.invitation.extraCompanionCount ?? "",
      guest.updatedAt.toISOString(),
    ]),
  ];

  return new Response(buildCsv(rows), {
    headers: {
      "Cache-Control": "no-store",
      "Content-Disposition": 'attachment; filename="convidados-casamento.csv"',
      "Content-Type": "text/csv; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
