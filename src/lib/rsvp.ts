import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { weddingConfig } from "@/config/wedding";
import { db } from "@/db";
import { guests, invitations, rsvpEvents } from "@/db/schema";
import { hasExactGuestSet, isDeadlineOpen } from "@/lib/rsvp-rules";
import { hashToken, tokenSchema } from "@/lib/tokens";

const attendanceSchema = z.enum(["attending", "declined"]);

export const rsvpSchema = z.object({
  token: tokenSchema,
  guests: z
    .array(
      z.object({
        id: z.uuid(),
        attendance: attendanceSchema,
      })
    )
    .min(1)
    .max(20),
  website: z.string().max(200).optional().default(""),
});

export type RsvpInput = z.infer<typeof rsvpSchema>;

export class RsvpError extends Error {
  constructor(
    public readonly code:
      | "not_found"
      | "expired"
      | "invalid_guests"
      | "invalid_payload"
  ) {
    super(code);
  }
}

export async function getInvitationByToken(token: string) {
  if (!tokenSchema.safeParse(token).success) {
    return null;
  }

  return db.query.invitations.findFirst({
    where: eq(invitations.tokenHash, hashToken(token)),
    with: { guests: true },
  });
}

export async function markInvitationViewed(invitationId: string) {
  await db
    .update(invitations)
    .set({ status: "viewed", updatedAt: new Date() })
    .where(
      and(eq(invitations.id, invitationId), eq(invitations.status, "pending"))
    );
}

export async function submitRsvp(input: RsvpInput) {
  if (!isDeadlineOpen(weddingConfig.rsvp.deadline)) {
    throw new RsvpError("expired");
  }

  const invitation = await getInvitationByToken(input.token);
  if (!invitation) {
    throw new RsvpError("not_found");
  }

  const submittedIds = input.guests.map((guest) => guest.id);
  const invitationIds = invitation.guests.map((guest) => guest.id);

  if (
    invitation.guests.length !== invitation.maxGuests ||
    !hasExactGuestSet(invitationIds, submittedIds)
  ) {
    throw new RsvpError("invalid_guests");
  }

  const now = new Date();

  await db.transaction(async (tx) => {
    for (const response of input.guests) {
      await tx
        .update(guests)
        .set({ attendance: response.attendance, updatedAt: now })
        .where(
          and(
            eq(guests.id, response.id),
            eq(guests.invitationId, invitation.id)
          )
        );
    }

    await tx
      .update(invitations)
      .set({
        status: "responded",
        firstRespondedAt: invitation.firstRespondedAt ?? now,
        respondedAt: now,
        updatedAt: now,
      })
      .where(eq(invitations.id, invitation.id));

    await tx.insert(rsvpEvents).values({
      invitationId: invitation.id,
      eventType: "rsvp_submitted",
      payload: {
        guests: input.guests.map(({ id, attendance }) => ({
          id,
          attendance,
        })),
      },
    });
  });

  return { success: true as const };
}
