import type { PatientIntakePartial } from "../patient-intake";

export type SessionPatchInput = {
  data?: PatientIntakePartial;
  activeField?: string | null;
  isTyping?: boolean;
};
