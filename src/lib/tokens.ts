import { randomBytes, createHmac } from "node:crypto";
import { z } from "zod";

/**
 * Token validation schema.
 * Tokens are expected to be hexadecimal strings of 32 characters (128 bits).
 */
export const tokenSchema = z
  .string()
  .length(32)
  .regex(/^[a-f0-9]+$/);

/**
 * Generates a secure random token (128 bits / 16 bytes).
 * Returns the token as a hexadecimal string (32 characters).
 */
export function generateToken(): string {
  return randomBytes(16).toString("hex");
}

/**
 * Hashes a token using HMAC-SHA256 with a server-side pepper.
 * This prevents storing plaintext tokens in the database.
 */
export function hashToken(token: string): string {
  const pepper = process.env.RSVP_TOKEN_PEPPER;

  if (!pepper) {
    throw new Error("RSVP_TOKEN_PEPPER environment variable is not set");
  }

  return createHmac("sha256", pepper).update(token).digest("hex");
}
