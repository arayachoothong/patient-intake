"use client";

import { INTAKE_STEP_TITLES, type IntakeStep } from "@patient/validation";
import { StepProgressList } from "./StepProgressList";

type StepProgressProps = {
  step: IntakeStep;
  index: number;
  total: number;
};

export function StepProgress({ step, index, total }: StepProgressProps) {
  const percentage = ((index + 1) / total) * 100;

  return (
    <nav aria-label="Form progress">
      <div className="md:hidden">
        <p className="text-foreground mb-2 text-sm font-medium">
          Step {index + 1} of {total} · {INTAKE_STEP_TITLES[step]}
        </p>
        <div
          className="h-1.5 overflow-hidden rounded-full bg-slate-200"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={index + 1}
        >
          <div
            className="bg-primary h-full rounded-full transition-[width]"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <StepProgressList step={step} index={index} />
    </nav>
  );
}
