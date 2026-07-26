import type { Session } from "@patient/validation";

export function upsertSession(sessions: Session[], next: Session): Session[] {
  const index = sessions.findIndex((s) => s.id === next.id);
  if (index === -1) {
    return [next, ...sessions];
  }
  const copy = sessions.slice();
  copy[index] = next;
  return copy;
}

export function sortByUpdatedAt(sessions: Session[]): Session[] {
  return [...sessions].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}
