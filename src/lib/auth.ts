import { createHash, timingSafeEqual } from "node:crypto";

function secureEqual(left: string, right: string) {
  const leftDigest = createHash("sha256").update(left).digest();
  const rightDigest = createHash("sha256").update(right).digest();
  return timingSafeEqual(leftDigest, rightDigest);
}

export function checkAdminAuth(authHeader: string | null): boolean {
  const expectedPassword = process.env.ADMIN_AUTH_SECRET;
  if (!authHeader || !expectedPassword) {
    return false;
  }

  const [scheme, encoded, ...extra] = authHeader.trim().split(/\s+/);
  if (scheme !== "Basic" || !encoded || extra.length > 0) {
    return false;
  }

  try {
    const decoded = Buffer.from(encoded, "base64").toString("utf8");
    const separator = decoded.indexOf(":");
    if (separator < 0) {
      return false;
    }

    const username = decoded.slice(0, separator);
    const password = decoded.slice(separator + 1);
    return (
      secureEqual(username, "admin") && secureEqual(password, expectedPassword)
    );
  } catch {
    return false;
  }
}

export function unauthorizedResponse() {
  return new Response("Autenticação necessária.", {
    status: 401,
    headers: {
      "Cache-Control": "no-store",
      "WWW-Authenticate": 'Basic realm="Administração do casamento"',
    },
  });
}
