import type { PatientIntake } from "@patient/validation";
import { submitSessionInStore } from "../infrastructure/memory-store";

export function submitSession(id: string, data: PatientIntake) {
  return submitSessionInStore(id, data);
}
