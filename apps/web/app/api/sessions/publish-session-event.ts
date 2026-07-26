import { publishToQueue, publishToSession } from "@/domains/session/infrastructure/publisher";
import type { RealtimeEvent, Session } from "@patient/validation";

type PublishTargets = {
  queue?: boolean;
  session?: boolean;
};

export async function publishSessionEvent(
  event: RealtimeEvent,
  session: Session,
  targets: PublishTargets = { queue: true, session: true },
): Promise<void> {
  try {
    if (targets.queue) {
      await publishToQueue(event, session);
    }
    if (targets.session) {
      await publishToSession(session.id, event, session);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Ably publish error";
    console.warn(`[sessions] Ably publish skipped (${event}): ${message}`);
  }
}
