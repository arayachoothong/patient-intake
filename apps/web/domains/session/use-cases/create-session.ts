import { createSessionInStore } from "../infrastructure/memory-store";

export function createSession() {
  return createSessionInStore();
}
