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
}

export function InvitationView({ displayName, guests, token }: InvitationViewProps = {}) {
  return <HomeContent displayName={displayName} guests={guests} token={token} />;
}
