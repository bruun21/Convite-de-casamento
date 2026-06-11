const DEFAULT_ADDRESSEE = "você";

export function resolveAddressee(displayName?: string | null): string {
  const trimmed = displayName?.trim();
  return trimmed || DEFAULT_ADDRESSEE;
}

export function isNamedAddressee(addressee: string): boolean {
  return addressee !== DEFAULT_ADDRESSEE;
}

export function personalizeInvitation(addressee: string): string {
  if (isNamedAddressee(addressee)) {
    return `${addressee}, convidamos você para testemunhar o momento em que nossas vidas se tornam uma só jornada.`;
  }
  return "Convidamos você para testemunhar o momento em que nossas vidas se tornam uma só jornada.";
}

export function personalizeGratitude(addressee: string): string {
  if (isNamedAddressee(addressee)) {
    return `Agradecemos, ${addressee}, por fazer parte da nossa rede de afeto e por estar conosco nesta data tão significativa.`;
  }
  return "Agradecemos por fazer parte da nossa rede de afeto e por estar conosco nesta data tão significativa.";
}

export function personalizeAttire(addressee: string): string {
  if (isNamedAddressee(addressee)) {
    return `Vista-se como preferir — o que celebramos é a presença de ${addressee}.`;
  }
  return "Vista-se como preferir — o que celebramos é a sua presença.";
}

export function personalizeReceptionDetails(addressee: string): string {
  if (isNamedAddressee(addressee)) {
    return `Após a cerimônia, celebraremos juntos no Talavera — o mesmo lugar do nosso pedido de casamento — e queremos ${addressee} conosco nessa noite.`;
  }
  return "Após a cerimônia, celebraremos juntos no Talavera — o mesmo lugar onde nosso pedido de casamento aconteceu.";
}

export function personalizeRsvpTitle(addressee: string, hasRsvpForm: boolean): string {
  if (hasRsvpForm && isNamedAddressee(addressee)) {
    return `${addressee}, você estará conosco?`;
  }
  if (hasRsvpForm) {
    return "Você estará conosco?";
  }
  return "Sua presença é o nosso maior presente";
}

export function personalizeRsvpIntro(addressee: string, deadlineLabel: string): string {
  if (isNamedAddressee(addressee)) {
    return `${addressee}, responda por cada pessoa deste convite até ${deadlineLabel}.`;
  }
  return `Responda por cada pessoa deste convite até ${deadlineLabel}.`;
}

export function personalizePhotosNote(addressee: string): string {
  if (isNamedAddressee(addressee)) {
    return `Se você registrar algo especial, ${addressee}, adoraríamos guardar. Envie suas fotos direto para nosso álbum compartilhado e elas ficarão com a gente para sempre.`;
  }
  return "Se você registrar algo especial, adoraríamos guardar. Envie suas fotos direto para nosso álbum compartilhado e elas ficarão com a gente para sempre.";
}

export function personalizeClosing(addressee: string): string {
  return `Esperamos por ${addressee}!`;
}
