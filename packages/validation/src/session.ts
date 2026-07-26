import type { PatientIntake } from "./patient-intake";
import type { SessionStatus } from "./constants/session-status.constant";

export type Session = {
  id: string;
  status: SessionStatus;
  createdAt: string;
  updatedAt: string;
  progress: number;
  activeField: string | null;
  isTyping: boolean;
  data: Partial<PatientIntake>;
};
