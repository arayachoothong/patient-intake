import { describe, expect, it } from "vitest";
import { IntakeStep } from "@patient/validation";
import {
  nextStep,
  prevStep,
  shouldRedirectSubmittedSession,
  shouldShowResumeBanner,
  shouldSubmitOnFormEvent,
  stepIndex,
} from "@/domains/patient-intake/helpers/step-navigation.helper";

describe("step navigation", () => {
  it("returns the zero-based index for a step", () => {
    expect(stepIndex(IntakeStep.Personal)).toBe(0);
    expect(stepIndex(IntakeStep.Review)).toBe(4);
  });

  it("returns the next step and stops after Review", () => {
    expect(nextStep(IntakeStep.Personal)).toBe(IntakeStep.Contact);
    expect(nextStep(IntakeStep.Review)).toBeNull();
  });

  it("returns the previous step and stops before Personal", () => {
    expect(prevStep(IntakeStep.Review)).toBe(IntakeStep.Emergency);
    expect(prevStep(IntakeStep.Personal)).toBeNull();
  });

  it("allows form submission only from Review", () => {
    expect(shouldSubmitOnFormEvent(IntakeStep.Personal)).toBe(false);
    expect(shouldSubmitOnFormEvent(IntakeStep.Contact)).toBe(false);
    expect(shouldSubmitOnFormEvent(IntakeStep.Preferences)).toBe(false);
    expect(shouldSubmitOnFormEvent(IntakeStep.Emergency)).toBe(false);
    expect(shouldSubmitOnFormEvent(IntakeStep.Review)).toBe(true);
  });

  it("shows the resume banner only after an existing session was restored", () => {
    expect(shouldShowResumeBanner(true)).toBe(true);
    expect(shouldShowResumeBanner(false)).toBe(false);
  });

  it("redirects a submitted session only after bootstrap completes", () => {
    expect(shouldRedirectSubmittedSession(true, true)).toBe(false);
    expect(shouldRedirectSubmittedSession(false, false)).toBe(false);
    expect(shouldRedirectSubmittedSession(false, true)).toBe(true);
  });
});
