import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const INVITE_ACCESS_COOKIE = "invite_access";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function getPepper() {
  const pepper = process.env.RSVP_TOKEN_PEPPER;
  if (!pepper) {
    throw new Error("RSVP_TOKEN_PEPPER environment variable is not set");
  }
  return pepper;
}

function signPayload(invitationId: string, expiresAt: number) {
  return createHmac("sha256", getPepper())
    .update(`${invitationId}.${expiresAt}`)
    .digest("hex");
}

export function createInviteAccessValue(invitationId: string, now = Date.now()) {
  const expiresAt = now + COOKIE_MAX_AGE_SECONDS * 1000;
  const signature = signPayload(invitationId, expiresAt);
  return `${invitationId}.${expiresAt}.${signature}`;
}

export function parseInviteAccessValue(value: string | undefined | null) {
  if (!value) {
    return null;
  }

  const [invitationId, expiresAtRaw, signature] = value.split(".");
  const expiresAt = Number(expiresAtRaw);

  if (!invitationId || !signature || !Number.isFinite(expiresAt)) {
    return null;
  }

  if (expiresAt < Date.now()) {
    return null;
  }

  const expected = signPayload(invitationId, expiresAt);
  const left = Buffer.from(signature, "utf8");
  const right = Buffer.from(expected, "utf8");

  if (left.length !== right.length || !timingSafeEqual(left, right)) {
    return null;
  }

  return { invitationId, expiresAt };
}

export async function readInviteAccessInvitationId() {
  const cookieStore = await cookies();
  const value = cookieStore.get(INVITE_ACCESS_COOKIE)?.value;
  return parseInviteAccessValue(value)?.invitationId ?? null;
}

export function inviteAccessCookieOptions(value: string) {
  return {
    name: INVITE_ACCESS_COOKIE,
    value,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE_SECONDS,
  };
}
