"use client";

import { INTAKE_STEP_TITLES, type IntakeStep } from "@patient/validation";

type StepProgressItemProps = {
  step: IntakeStep;
  currentStep: IntakeStep;
  reached: boolean;
};

export function StepProgressItem({ step, currentStep, reached }: StepProgressItemProps) {
  return (
    <li
      className={reached ? "text-foreground" : "text-muted-foreground"}
      aria-current={step === currentStep ? "step" : undefined}
    >
      <div className={`mb-2 h-1.5 rounded-full ${reached ? "bg-primary" : "bg-stone-200"}`} />
      <span className="text-xs font-medium">{INTAKE_STEP_TITLES[step]}</span>
    </li>
  );
}
