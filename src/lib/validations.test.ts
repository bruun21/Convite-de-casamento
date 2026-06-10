import { describe, it, expect } from "vitest";
import { rsvpPayloadSchema } from "./validations";

describe("Validation Schemas", () => {
  describe("rsvpPayloadSchema", () => {
    it("should validate correct payloads", () => {
      const payload = {
        guests: [
          {
            id: "123e4567-e89b-12d3-a456-426614174000",
            attendance: "attending",
          },
        ],
      };
      expect(rsvpPayloadSchema.safeParse(payload).success).toBe(true);
    });

    it("should reject empty guests list", () => {
      const payload = { guests: [] };
      expect(rsvpPayloadSchema.safeParse(payload).success).toBe(false);
    });

    it("should reject invalid attendance", () => {
      const payload = {
        guests: [
          { id: "123e4567-e89b-12d3-a456-426614174000", attendance: "maybe" },
        ],
      };
      expect(rsvpPayloadSchema.safeParse(payload).success).toBe(false);
    });

    it("should reject invalid uuid", () => {
      const payload = {
        guests: [{ id: "not-a-uuid", attendance: "attending" }],
      };
      expect(rsvpPayloadSchema.safeParse(payload).success).toBe(false);
    });
  });
});
