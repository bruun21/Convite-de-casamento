import { relations, sql } from "drizzle-orm";
import {
  boolean,
  check,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const invitationStatus = pgEnum("invitation_status", [
  "pending",
  "viewed",
  "responded",
]);

export const attendanceStatus = pgEnum("attendance_status", [
  "attending",
  "declined",
]);

export const invitations = pgTable(
  "invitations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    externalReference: text("external_reference"),
    tokenHash: text("token_hash").notNull(),
    displayName: text("display_name").notNull(),
    contactPhone: text("contact_phone"),
    maxGuests: integer("max_guests").notNull(),
    allowPlusOne: boolean("allow_plus_one").notNull().default(false),
    status: invitationStatus("status").notNull().default("pending"),
    firstRespondedAt: timestamp("first_responded_at", { withTimezone: true }),
    respondedAt: timestamp("responded_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("invitations_token_hash_idx").on(table.tokenHash),
    uniqueIndex("invitations_external_reference_idx").on(
      table.externalReference
    ),
    check("invitations_max_guests_positive", sql`${table.maxGuests} > 0`),
  ]
);

export const guests = pgTable(
  "guests",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    invitationId: uuid("invitation_id")
      .notNull()
      .references(() => invitations.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    isPrimary: boolean("is_primary").notNull().default(false),
    attendance: attendanceStatus("attendance"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("guests_invitation_id_idx").on(table.invitationId),
    uniqueIndex("guests_invitation_name_idx").on(
      table.invitationId,
      table.name
    ),
  ]
);

export const rsvpEvents = pgTable(
  "rsvp_events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    invitationId: uuid("invitation_id")
      .notNull()
      .references(() => invitations.id, { onDelete: "cascade" }),
    eventType: text("event_type").notNull(),
    payload: jsonb("payload").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("rsvp_events_invitation_id_idx").on(table.invitationId)]
);

export const invitationsRelations = relations(invitations, ({ many }) => ({
  guests: many(guests),
  events: many(rsvpEvents),
}));

export const guestsRelations = relations(guests, ({ one }) => ({
  invitation: one(invitations, {
    fields: [guests.invitationId],
    references: [invitations.id],
  }),
}));

export const rsvpEventsRelations = relations(rsvpEvents, ({ one }) => ({
  invitation: one(invitations, {
    fields: [rsvpEvents.invitationId],
    references: [invitations.id],
  }),
}));
