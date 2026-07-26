import { patientIntakeSchema } from "../patient-intake";
import {
  IntakeStep,
  INTAKE_STEP_ORDER,
} from "../constants/intake-step.constant";

export function intakeStepSchema(step: IntakeStep) {
  switch (step) {
    case IntakeStep.Personal:
      return patientIntakeSchema.pick({
        firstName: true,
        middleName: true,
        lastName: true,
        dateOfBirth: true,
        gender: true,
      });
    case IntakeStep.Contact:
      return patientIntakeSchema.pick({
        phoneNumber: true,
        email: true,
        address: true,
      });
    case IntakeStep.Preferences:
      return patientIntakeSchema.pick({
        preferredLanguage: true,
        nationality: true,
        religion: true,
      });
    case IntakeStep.Emergency:
      return patientIntakeSchema.pick({ emergencyContacts: true });
    case IntakeStep.Review:
      return patientIntakeSchema;
  }
}

export function resolveResumeStep(values: unknown): IntakeStep {
  for (const step of INTAKE_STEP_ORDER) {
    if (step === IntakeStep.Review) continue;
    if (!intakeStepSchema(step).safeParse(values).success) return step;
  }
  return IntakeStep.Review;
}
