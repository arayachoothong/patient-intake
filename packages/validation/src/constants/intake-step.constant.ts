export enum IntakeStep {
  Personal = "personal",
  Contact = "contact",
  Preferences = "preferences",
  Emergency = "emergency",
  Review = "review",
}

export const INTAKE_STEP_ORDER = [
  IntakeStep.Personal,
  IntakeStep.Contact,
  IntakeStep.Preferences,
  IntakeStep.Emergency,
  IntakeStep.Review,
] as const;

export const INTAKE_STEP_TITLES: Record<IntakeStep, string> = {
  [IntakeStep.Personal]: "Personal",
  [IntakeStep.Contact]: "Contact",
  [IntakeStep.Preferences]: "Preferences",
  [IntakeStep.Emergency]: "Emergency contacts",
  [IntakeStep.Review]: "Review",
};
