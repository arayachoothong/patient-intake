import type { Session } from "@patient/validation";

export type RealtimeEvent = "session.created" | "session.updated" | "session.submitted";

export type SessionEventPayload = {
  session: Session;
};
