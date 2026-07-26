import { describe, expect, it } from "vitest";
import { IntakeStep } from "@patient/validation";
import { nextStep, prevStep, stepIndex } from "./step-navigation.helper";

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
});
