import { HomeContent } from "@/app/(site)/home-content";

interface Guest {
  id: string;
  name: string;
  attendance: "attending" | "declined" | null;
  receptionAttendance: "attending" | "declined" | null;
}

interface InvitationViewProps {
  displayName?: string;
  guests?: Guest[];
  token?: string;
  extraCompanionCount?: number | null;
}

export function InvitationView({
  displayName,
  guests,
  token,
  extraCompanionCount = null,
}: InvitationViewProps = {}) {
  return (
    <HomeContent
      displayName={displayName}
      extraCompanionCount={extraCompanionCount}
      guests={guests}
      token={token}
    />
  );
}
