import type { ConnectionState } from "@patient/ui";

export function mapAblyConnectionState(state: string): ConnectionState {
  switch (state) {
    case "connected":
      return "connected";
    case "connecting":
    case "initialized":
      return "connecting";
    default:
      return "disconnected";
  }
}
