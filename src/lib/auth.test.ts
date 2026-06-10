import { afterEach, describe, expect, it, vi } from "vitest";

import { checkAdminAuth } from "./auth";

function basic(username: string, password: string) {
  return `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
}

describe("admin authentication", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("accepts the configured credentials including colons in the password", () => {
    vi.stubEnv("ADMIN_AUTH_SECRET", "segredo:local");
    expect(checkAdminAuth(basic("admin", "segredo:local"))).toBe(true);
  });

  it("rejects missing, malformed and incorrect credentials", () => {
    vi.stubEnv("ADMIN_AUTH_SECRET", "segredo");
    expect(checkAdminAuth(null)).toBe(false);
    expect(checkAdminAuth("Bearer token")).toBe(false);
    expect(checkAdminAuth(basic("admin", "errado"))).toBe(false);
    expect(checkAdminAuth(basic("outro", "segredo"))).toBe(false);
  });

  it("fails closed when the server secret is missing", () => {
    vi.stubEnv("ADMIN_AUTH_SECRET", "");
    expect(checkAdminAuth(basic("admin", "qualquer"))).toBe(false);
  });
});
