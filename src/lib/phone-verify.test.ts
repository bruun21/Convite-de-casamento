import { describe, expect, it } from "vitest";

import { phoneEndsWith, pickPhoneSuffix } from "./phone-verify";

describe("phone verify", () => {
  it("accepts only four digits as suffix", () => {
    expect(pickPhoneSuffix("6095")).toBe("6095");
    expect(pickPhoneSuffix("(60) 9")).toBeNull();
    expect(pickPhoneSuffix("12345")).toBeNull();
  });

  it("matches the last four digits of stored phone numbers", () => {
    expect(phoneEndsWith("9391206095", "6095")).toBe(true);
    expect(phoneEndsWith("(93) 9120-6095", "6095")).toBe(true);
    expect(phoneEndsWith("9391206095", "1234")).toBe(false);
    expect(phoneEndsWith(null, "6095")).toBe(false);
  });
});
