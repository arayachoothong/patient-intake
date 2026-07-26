import { SessionStatus } from "../constants/session-status.constant";
import { JourneyStage } from "../constants/journey-stage.constant";

export function journeyStage(input: {
  status: SessionStatus;
  progress: number;
}): JourneyStage | null {
  if (input.status === SessionStatus.Submitted) return JourneyStage.Ready;
  if (input.status === SessionStatus.Filling) {
    if (input.progress <= 0) return JourneyStage.New;
    if (input.progress >= 100) return JourneyStage.WaitingReview;
    return JourneyStage.Filling;
  }
  return null;
}

export function journeyStageLabel(stage: JourneyStage): string {
  switch (stage) {
    case JourneyStage.New:
      return "New";
    case JourneyStage.Filling:
      return "Filling";
    case JourneyStage.WaitingReview:
      return "Waiting for review";
    case JourneyStage.Ready:
      return "Ready";
  }
}

export type JourneyStageBadgeVariant = "ready" | "new" | "filling" | "waitingReview";

export function journeyStageVariant(stage: JourneyStage): JourneyStageBadgeVariant {
  switch (stage) {
    case JourneyStage.Ready:
      return "ready";
    case JourneyStage.Filling:
      return "filling";
    case JourneyStage.New:
      return "new";
    case JourneyStage.WaitingReview:
      return "waitingReview";
  }
}
