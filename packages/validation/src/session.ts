import type { IntakeStep } from "./constants/intake-step.constant";
import type { PatientIntake } from "./patient-intake";
import type { SessionStatus } from "./constants/session-status.constant";

export type Session = {
  id: string;
  status: SessionStatus;
  createdAt: string;
  updatedAt: string;
  progress: number;
  currentStep: IntakeStep;
  activeField: string | null;
  isTyping: boolean;
  data: Partial<PatientIntake>;
};
