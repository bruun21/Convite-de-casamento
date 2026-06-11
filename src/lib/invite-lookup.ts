import { sql } from "drizzle-orm";

import { db } from "@/db";
import { invitations } from "@/db/schema";
import { pickPhoneSuffix } from "@/lib/phone-verify";

export async function findInvitationsByPhoneSuffix(suffixInput: string) {
  const suffix = pickPhoneSuffix(suffixInput);
  if (!suffix) {
    return [];
  }

  return db
    .select({
      id: invitations.id,
      displayName: invitations.displayName,
      contactPhone: invitations.contactPhone,
    })
    .from(invitations)
    .where(
      sql`${invitations.contactPhone} is not null and right(${invitations.contactPhone}, 4) = ${suffix}`
    );
}
