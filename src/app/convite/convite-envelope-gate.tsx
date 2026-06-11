"use client";

import { useEffect } from "react";

import { EnvelopeIntro } from "@/app/envelope-intro";
import { requestScrollReveal } from "@/lib/scroll-reveal-events";

const CONVITE_ENVELOPE_KEY = "convite-envelope-opened";

interface ConviteEnvelopeGateProps {
  children: React.ReactNode;
  recipientName?: string;
}

export function ConviteEnvelopeGate({ children, recipientName }: ConviteEnvelopeGateProps) {
  useEffect(() => {
    const hasOpened = localStorage.getItem(CONVITE_ENVELOPE_KEY) === "true";
    if (hasOpened) {
      requestScrollReveal();
    }
  }, []);

  return (
    <>
      <EnvelopeIntro recipientName={recipientName} storageKey={CONVITE_ENVELOPE_KEY} />
      {children}
    </>
  );
}
