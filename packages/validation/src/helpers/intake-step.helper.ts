import { patientIntakeSchema } from "../patient-intake";
import { FormSection } from "../constants/form-section.constant";
import {
  IntakeStep,
  INTAKE_STEP_ORDER,
} from "../constants/intake-step.constant";

const STEP_BY_SECTION: Record<FormSection, IntakeStep> = {
  [FormSection.Personal]: IntakeStep.Personal,
  [FormSection.Contact]: IntakeStep.Contact,
  [FormSection.Preferences]: IntakeStep.Preferences,
  [FormSection.Emergency]: IntakeStep.Emergency,
};

const SECTION_BY_STEP: Record<IntakeStep, FormSection | null> = {
  [IntakeStep.Personal]: FormSection.Personal,
  [IntakeStep.Contact]: FormSection.Contact,
  [IntakeStep.Preferences]: FormSection.Preferences,
  [IntakeStep.Emergency]: FormSection.Emergency,
  [IntakeStep.Review]: null,
};

export function intakeStepForSection(section: FormSection): IntakeStep {
  return STEP_BY_SECTION[section];
}

export function formSectionForStep(step: IntakeStep): FormSection | null {
  return SECTION_BY_STEP[step];
}

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
