import type { Session } from "@patient/validation";

export function sessionDisplayName(session: Session): string {
  const first = session.data.firstName?.trim() ?? "";
  const last = session.data.lastName?.trim() ?? "";
  const name = [first, last].filter(Boolean).join(" ");
  return name.length > 0 ? name : "Guest";
}
