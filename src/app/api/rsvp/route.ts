import { NextRequest, NextResponse } from "next/server";

import { readInviteAccessInvitationId } from "@/lib/invite-access";
import { isRateLimited } from "@/lib/rate-limit";
import { RsvpError, rsvpSchema, submitRsvp } from "@/lib/rsvp";

export async function POST(request: NextRequest) {
  const parsed = rsvpSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Não foi possível validar a resposta." },
      { status: 400 }
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ success: true });
  }

  const sessionInvitationId = await readInviteAccessInvitationId();
  const rateLimitKey =
    parsed.data.token ?? sessionInvitationId ?? "anonymous";

  if (!parsed.data.token && !sessionInvitationId) {
    return NextResponse.json(
      { error: "Não foi possível validar o acesso ao convite." },
      { status: 401 }
    );
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(rateLimitKey, ip)) {
    return NextResponse.json(
      { error: "Muitas tentativas. Aguarde alguns minutos." },
      { status: 429 }
    );
  }

  try {
    await submitRsvp(parsed.data, sessionInvitationId);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof RsvpError) {
      const responseByCode = {
        expired: {
          status: 403,
          message: "O prazo de confirmação foi encerrado.",
        },
        not_found: {
          status: 404,
          message: "Não foi possível localizar este convite.",
        },
        invalid_guests: {
          status: 400,
          message: "A lista de convidados não corresponde ao convite.",
        },
        invalid_payload: {
          status: 400,
          message: "Não foi possível validar a resposta.",
        },
      } as const;
      const response = responseByCode[error.code];
      return NextResponse.json(
        { error: response.message },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { error: "Não foi possível registrar a resposta agora." },
      { status: 500 }
    );
  }
}
