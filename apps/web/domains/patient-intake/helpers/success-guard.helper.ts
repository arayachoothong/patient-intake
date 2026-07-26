import { SessionStatus, type Session } from "@patient/validation";

export function shouldRedirectToIntake(
  session: Session | null | undefined,
  hasStoredId: boolean,
): boolean {
  if (!hasStoredId) return true;
  if (!session) return false;
  return session.status !== SessionStatus.Submitted;
}
