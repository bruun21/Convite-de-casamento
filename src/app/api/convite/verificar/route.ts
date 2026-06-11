import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import {
  createInviteAccessValue,
  inviteAccessCookieOptions,
} from "@/lib/invite-access";
import { phoneEndsWith, pickPhoneSuffix } from "@/lib/phone-verify";
import { isIpRateLimited } from "@/lib/rate-limit";
import { getInvitationByToken } from "@/lib/rsvp";
import { tokenSchema } from "@/lib/tokens";

const verifySchema = z.object({
  token: tokenSchema,
  suffix: z.string().trim().min(1).max(8),
  website: z.string().max(200).optional().default(""),
});

export async function POST(request: NextRequest) {
  const parsed = verifySchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Informe os 4 últimos dígitos do seu telefone." },
      { status: 400 }
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ success: true });
  }

  const suffix = pickPhoneSuffix(parsed.data.suffix);
  if (!suffix) {
    return NextResponse.json(
      { error: "Use exatamente 4 dígitos do seu telefone." },
      { status: 400 }
    );
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() ?? "unknown";

  if (isIpRateLimited(ip)) {
    return NextResponse.json(
      { error: "Muitas tentativas. Aguarde alguns minutos." },
      { status: 429 }
    );
  }

  const invitation = await getInvitationByToken(parsed.data.token);
  if (!invitation) {
    return NextResponse.json(
      { error: "Não foi possível localizar este convite." },
      { status: 404 }
    );
  }

  if (!phoneEndsWith(invitation.contactPhone, suffix)) {
    return NextResponse.json(
      { error: "Os dígitos não conferem com o telefone deste convite." },
      { status: 403 }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(
    inviteAccessCookieOptions(createInviteAccessValue(invitation.id))
  );

  return NextResponse.json({ success: true });
}
