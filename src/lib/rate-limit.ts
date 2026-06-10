import { createHash } from "node:crypto";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const attempts = new Map<string, RateLimitEntry>();
const windowMs = 10 * 60 * 1000;
const maxAttempts = 8;

export function isRateLimited(
  token: string,
  ip: string,
  now = Date.now()
): boolean {
  const key = createHash("sha256").update(`${token}\0${ip}`).digest("hex");
  const entry = attempts.get(key);

  if (!entry || now >= entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  entry.count += 1;
  return entry.count > maxAttempts;
}
