import { describe, it, expect, beforeEach, vi } from "vitest";
import { generateToken, hashToken, tokenSchema } from "./tokens";

describe("Token Utilities", () => {
  const MOCK_PEPPER = "test-pepper-123";

  beforeEach(() => {
    vi.stubEnv("RSVP_TOKEN_PEPPER", MOCK_PEPPER);
  });

  describe("generateToken", () => {
    it("should generate a 32-character hex string", () => {
      const token = generateToken();
      expect(token).toHaveLength(32);
      expect(token).toMatch(/^[a-f0-9]+$/);
    });

    it("should generate unique tokens", () => {
      const token1 = generateToken();
      const token2 = generateToken();
      expect(token1).not.toBe(token2);
    });
  });

  describe("hashToken", () => {
    it("should produce a stable hash for the same token and pepper", () => {
      const token = "abcdef1234567890abcdef1234567890";
      const hash1 = hashToken(token);
      const hash2 = hashToken(token);
      expect(hash1).toBe(hash2);
      expect(hash1).toHaveLength(64); // SHA-256 hex length
    });

    it("should produce different hashes for different tokens", () => {
      const token1 = generateToken();
      const token2 = generateToken();
      expect(hashToken(token1)).not.toBe(hashToken(token2));
    });

    it("should produce different hashes if the pepper changes", () => {
      const token = generateToken();
      const hash1 = hashToken(token);

      vi.stubEnv("RSVP_TOKEN_PEPPER", "different-pepper");
      const hash2 = hashToken(token);

      expect(hash1).not.toBe(hash2);
    });

    it("should throw if RSVP_TOKEN_PEPPER is missing", () => {
      vi.stubEnv("RSVP_TOKEN_PEPPER", "");
      expect(() => hashToken("some-token")).toThrow(
        "RSVP_TOKEN_PEPPER environment variable is not set"
      );
    });
  });

  describe("tokenSchema", () => {
    it("should validate correct tokens", () => {
      const validToken = "a".repeat(32);
      expect(tokenSchema.safeParse(validToken).success).toBe(true);
    });

    it("should reject tokens with wrong length", () => {
      expect(tokenSchema.safeParse("abc").success).toBe(false);
      expect(tokenSchema.safeParse("a".repeat(33)).success).toBe(false);
    });

    it("should reject non-hex tokens", () => {
      expect(tokenSchema.safeParse("g".repeat(32)).success).toBe(false);
    });
  });
});
