export function isDeadlineOpen(deadline: string, now = new Date()) {
  return now <= new Date(deadline);
}

export function hasExactGuestSet(
  invitationGuestIds: string[],
  submittedGuestIds: string[]
) {
  if (
    submittedGuestIds.length === 0 ||
    invitationGuestIds.length !== submittedGuestIds.length
  ) {
    return false;
  }

  const submitted = new Set(submittedGuestIds);
  return (
    submitted.size === submittedGuestIds.length &&
    invitationGuestIds.every((id) => submitted.has(id))
  );
}
