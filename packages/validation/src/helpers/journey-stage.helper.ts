import { SessionStatus } from "../constants/session-status.constant";

export type JourneyStage = "new" | "filling" | "ready";

export function journeyStage(input: {
  status: SessionStatus;
  progress: number;
}): JourneyStage {
  if (input.status === SessionStatus.Submitted) return "ready";
  if (input.progress <= 0) return "new";
  return "filling";
}

export function journeyStageLabel(stage: JourneyStage): string {
  switch (stage) {
    case "new":
      return "New";
    case "filling":
      return "Filling";
    case "ready":
      return "Ready";
  }
}

export function journeyStageVariant(
  stage: JourneyStage,
): "default" | "secondary" | "outline" {
  switch (stage) {
    case "ready":
      return "default";
    case "filling":
      return "secondary";
    case "new":
      return "outline";
  }
}
