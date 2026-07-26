import type { SessionPatchInput } from "@patient/validation";
import { patchSessionInStore, type PatchSessionResult } from "../infrastructure/memory-store";

export function patchSession(id: string, input: SessionPatchInput): PatchSessionResult {
  return patchSessionInStore(id, input);
}
