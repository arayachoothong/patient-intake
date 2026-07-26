import type { Session } from "@patient/validation";

export { RealtimeEvent } from "@patient/validation";

export type SessionEventPayload = {
  session: Session;
};
