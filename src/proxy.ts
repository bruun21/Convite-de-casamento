import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { checkAdminAuth, unauthorizedResponse } from "@/lib/auth";

export function proxy(request: NextRequest) {
  if (!checkAdminAuth(request.headers.get("authorization"))) {
    return unauthorizedResponse();
  }

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
