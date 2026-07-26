export const QUEUE_CHANNEL = "staff-queue";

export function sessionChannel(sessionId: string): string {
  return `session-${sessionId}`;
}
