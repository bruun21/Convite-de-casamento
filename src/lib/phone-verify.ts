export function normalizePhoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function pickPhoneSuffix(value: string): string | null {
  const digits = normalizePhoneDigits(value);
  if (digits.length !== 4) {
    return null;
  }
  return digits;
}

export function phoneEndsWith(
  contactPhone: string | null | undefined,
  suffix: string
): boolean {
  if (!contactPhone) {
    return false;
  }

  const normalizedSuffix = pickPhoneSuffix(suffix);
  if (!normalizedSuffix) {
    return false;
  }

  return normalizePhoneDigits(contactPhone).endsWith(normalizedSuffix);
}
