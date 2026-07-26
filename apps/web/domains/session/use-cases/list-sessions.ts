import { listSessionsFromStore } from "../infrastructure/memory-store";

export function listSessions() {
  return listSessionsFromStore();
}
