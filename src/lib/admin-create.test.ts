import { describe, expect, it } from "vitest";

import { parseAdminInvitationInput } from "./admin-create";

describe("admin invitation input", () => {
  it("normalizes a phone and a list of guests", () => {
    expect(
      parseAdminInvitationInput({
        displayName: "Família Lavareda",
        contactPhone: "(91) 99999-1234",
        guestNames: "Suzyellen\nMaria",
      })
    ).toEqual({
      success: true,
      data: {
        displayName: "Família Lavareda",
        contactPhone: "91999991234",
        guestNames: ["Suzyellen", "Maria"],
      },
    });
  });

  it("rejects repeated guest names", () => {
    expect(
      parseAdminInvitationInput({
        displayName: "Família Lavareda",
        contactPhone: "91999991234",
        guestNames: "Suzyellen\nsuzyellen",
      })
    ).toMatchObject({ success: false });
  });

  it("rejects a phone without DDD", () => {
    expect(
      parseAdminInvitationInput({
        displayName: "Família Lavareda",
        contactPhone: "9999-1234",
        guestNames: "Suzyellen",
      })
    ).toMatchObject({ success: false });
  });
});
