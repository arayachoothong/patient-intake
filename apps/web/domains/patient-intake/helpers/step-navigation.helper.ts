import { INTAKE_STEP_ORDER, IntakeStep } from "@patient/validation";

export function stepIndex(step: IntakeStep): number {
  return INTAKE_STEP_ORDER.indexOf(step);
}

export function nextStep(step: IntakeStep): IntakeStep | null {
  return INTAKE_STEP_ORDER[stepIndex(step) + 1] ?? null;
}

export function prevStep(step: IntakeStep): IntakeStep | null {
  const index = stepIndex(step);
  return index > 0 ? (INTAKE_STEP_ORDER[index - 1] ?? null) : null;
}

export function shouldSubmitOnFormEvent(step: IntakeStep): boolean {
  return step === IntakeStep.Review;
}

export function shouldShowResumeBanner(resumed: boolean): boolean {
  return resumed;
}

export function shouldRedirectSubmittedSession(
  bootstrapping: boolean,
  submitted: boolean,
): boolean {
  return !bootstrapping && submitted;
}
