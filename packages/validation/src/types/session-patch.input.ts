import type { IntakeStep } from "../constants/intake-step.constant";
import type { PatientIntakePartial } from "../patient-intake";

export type SessionPatchInput = {
  data?: PatientIntakePartial;
  currentStep?: IntakeStep;
  activeField?: string | null;
  isTyping?: boolean;
};
