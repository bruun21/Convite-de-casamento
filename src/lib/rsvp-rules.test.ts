import { describe, expect, it } from "vitest";

import { hasExactGuestSet, isDeadlineOpen } from "./rsvp-rules";

describe("RSVP rules", () => {
  it("accepts only the exact unique guest set", () => {
    expect(hasExactGuestSet(["a", "b"], ["b", "a"])).toBe(true);
    expect(hasExactGuestSet(["a", "b"], ["a"])).toBe(false);
    expect(hasExactGuestSet(["a"], ["a", "b"])).toBe(false);
    expect(hasExactGuestSet(["a", "b"], ["a", "a"])).toBe(false);
  });

  it("accepts the deadline instant and rejects a later instant", () => {
    const deadline = "2026-06-25T23:59:59-04:00";

    expect(isDeadlineOpen(deadline, new Date(deadline))).toBe(true);
    expect(isDeadlineOpen(deadline, new Date("2026-06-26T04:00:00.000Z"))).toBe(
      false
    );
  });
});
