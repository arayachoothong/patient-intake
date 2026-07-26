import { SessionStatus } from "../constants/session-status.constant";

export function sessionStatusLabel(status: SessionStatus): string {
  switch (status) {
    case SessionStatus.Filling:
      return "Filling";
    case SessionStatus.Submitted:
      return "Submitted";
    case SessionStatus.Abandoned:
      return "Abandoned";
  }
}

export function sessionStatusVariant(status: SessionStatus): "default" | "secondary" | "outline" {
  switch (status) {
    case SessionStatus.Submitted:
      return "default";
    case SessionStatus.Filling:
      return "secondary";
    case SessionStatus.Abandoned:
      return "outline";
  }
}
