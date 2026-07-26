import { SessionStatus } from "../constants/session-status.constant";
import { JourneyStage } from "../constants/journey-stage.constant";

export function journeyStage(input: {
  status: SessionStatus;
  progress: number;
}): JourneyStage | null {
  if (input.status === SessionStatus.Submitted) return JourneyStage.Ready;
  if (input.status === SessionStatus.Filling) {
    if (input.progress <= 0) return JourneyStage.New;
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
    case JourneyStage.Ready:
      return "Ready";
  }
}

export function journeyStageVariant(stage: JourneyStage): "default" | "secondary" | "outline" {
  switch (stage) {
    case JourneyStage.Ready:
      return "default";
    case JourneyStage.Filling:
      return "secondary";
    case JourneyStage.New:
      return "outline";
  }
}
