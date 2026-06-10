import { describe, expect, it } from "vitest";

import { isRateLimited } from "./rate-limit";

describe("RSVP rate limit", () => {
  it("allows eight attempts and blocks the ninth in the same window", () => {
    const token = "a".repeat(32);
    const ip = "test-ip";

    for (let attempt = 0; attempt < 8; attempt += 1) {
      expect(isRateLimited(token, ip, 1_000)).toBe(false);
    }
    expect(isRateLimited(token, ip, 1_000)).toBe(true);
  });

  it("resets after ten minutes", () => {
    const token = "b".repeat(32);
    const ip = "test-ip-reset";

    for (let attempt = 0; attempt < 9; attempt += 1) {
      isRateLimited(token, ip, 1_000);
    }
    expect(isRateLimited(token, ip, 601_000)).toBe(false);
  });
});
