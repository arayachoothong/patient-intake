"use client";

import { INTAKE_STEP_ORDER, type IntakeStep } from "@patient/validation";
import { StepProgressItem } from "./StepProgressItem";

type StepProgressListProps = {
  step: IntakeStep;
  index: number;
};

export function StepProgressList({ step, index }: StepProgressListProps) {
  return (
    <ol className="hidden grid-cols-5 gap-2 md:grid">
      {INTAKE_STEP_ORDER.map((candidate, candidateIndex) => (
        <StepProgressItem
          key={candidate}
          step={candidate}
          currentStep={step}
          reached={candidateIndex <= index}
        />
      ))}
    </ol>
  );
}
