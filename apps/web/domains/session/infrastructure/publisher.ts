import "server-only";
import { type RealtimeEvent, type Session } from "@patient/validation";
import type { SessionEventPayload } from "../interfaces/realtime-event.interface";
import { getAblyServer } from "./ably-server";
import { QUEUE_CHANNEL, sessionChannel } from "./channels";

function sessionPayload(session: Session): SessionEventPayload {
  return { session };
}

export async function publishToQueue(event: RealtimeEvent, session: Session): Promise<void> {
  const channel = getAblyServer().channels.get(QUEUE_CHANNEL);
  await channel.publish(event, sessionPayload(session));
}

export async function publishToSession(
  sessionId: string,
  event: RealtimeEvent,
  session: Session,
): Promise<void> {
  const channel = getAblyServer().channels.get(sessionChannel(sessionId));
  await channel.publish(event, sessionPayload(session));
}
