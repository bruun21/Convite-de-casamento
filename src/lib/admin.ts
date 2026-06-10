import { count, eq, ilike } from "drizzle-orm";

import { db } from "@/db";
import { guests, invitations } from "@/db/schema";

export async function getAdminStats() {
  const [
    [{ value: totalInvitations }],
    [{ value: respondedInvitations }],
    [{ value: totalPeople }],
    [{ value: attendingPeople }],
    [{ value: declinedPeople }],
  ] = await Promise.all([
    db.select({ value: count() }).from(invitations),
    db
      .select({ value: count() })
      .from(invitations)
      .where(eq(invitations.status, "responded")),
    db.select({ value: count() }).from(guests),
    db
      .select({ value: count() })
      .from(guests)
      .where(eq(guests.attendance, "attending")),
    db
      .select({ value: count() })
      .from(guests)
      .where(eq(guests.attendance, "declined")),
  ]);

  return {
    invitations: {
      total: totalInvitations,
      responded: respondedInvitations,
      pending: totalInvitations - respondedInvitations,
    },
    people: {
      total: totalPeople,
      attending: attendingPeople,
      declined: declinedPeople,
      pending: totalPeople - attendingPeople - declinedPeople,
    },
  };
}

export function searchInvitations(query?: string) {
  const normalized = query?.trim().slice(0, 80);

  return db.query.invitations.findMany({
    where: normalized
      ? ilike(invitations.displayName, `%${normalized}%`)
      : undefined,
    with: { guests: true },
    orderBy: (table, { desc }) => [desc(table.updatedAt)],
  });
}
