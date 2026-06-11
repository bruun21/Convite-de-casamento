import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import {
  createInviteAccessValue,
  inviteAccessCookieOptions,
} from "@/lib/invite-access";
import { findInvitationsByPhoneSuffix } from "@/lib/invite-lookup";
import { pickPhoneSuffix } from "@/lib/phone-verify";
import { isIpRateLimited } from "@/lib/rate-limit";

const accessSchema = z.object({
  suffix: z.string().trim().min(1).max(8),
  website: z.string().max(200).optional().default(""),
});

export async function POST(request: NextRequest) {
  const parsed = accessSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Informe os 4 últimos dígitos do seu telefone." },
      { status: 400 }
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ success: true, redirectTo: "/convite/me" });
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

  const matches = await findInvitationsByPhoneSuffix(suffix);

  if (matches.length === 0) {
    return NextResponse.json(
      { error: "Não encontramos um convite com esses dígitos." },
      { status: 404 }
    );
  }

  if (matches.length > 1) {
    return NextResponse.json(
      {
        error:
          "Encontramos mais de um convite com esses dígitos. Use o link individual recebido no WhatsApp.",
      },
      { status: 409 }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(
    inviteAccessCookieOptions(createInviteAccessValue(matches[0].id))
  );

  return NextResponse.json({ success: true, redirectTo: "/convite/me" });
}
