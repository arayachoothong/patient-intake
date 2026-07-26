import type { ConnectionState } from "@patient/ui";
import type { Session } from "@patient/validation";

export type QueueSubscriptionState = {
  sessions: Session[];
  connectionState: ConnectionState;
  isLoading: boolean;
  error: string | null;
};

export type SessionSubscriptionState = {
  session: Session | null;
  connectionState: ConnectionState;
  isLoading: boolean;
  error: string | null;
};
