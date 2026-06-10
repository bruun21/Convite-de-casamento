import { z } from "zod";

export const attendanceSchema = z.enum(["attending", "declined"]);

export const guestRsvpSchema = z.object({
  id: z.string().uuid(),
  attendance: attendanceSchema,
});

export const rsvpPayloadSchema = z.object({
  guests: z.array(guestRsvpSchema).min(1),
});

export type RsvpPayload = z.infer<typeof rsvpPayloadSchema>;
