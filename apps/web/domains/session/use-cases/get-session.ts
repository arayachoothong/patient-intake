import { getSessionFromStore } from "../infrastructure/memory-store";

export function getSession(id: string) {
  return getSessionFromStore(id);
}
