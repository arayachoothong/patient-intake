import {
  patchSessionInStore,
  type PatchSessionInput,
  type PatchSessionResult,
} from "../infrastructure/memory-store";

export function patchSession(id: string, input: PatchSessionInput): PatchSessionResult {
  return patchSessionInStore(id, input);
}
