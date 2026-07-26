"use client";

import { useCallback, useState } from "react";
import { INTAKE_STEP_ORDER, IntakeStep } from "@patient/validation";
import { nextStep, prevStep, stepIndex } from "../helpers/step-navigation.helper";

type UseIntakeStepsOptions = {
  initialStep?: IntakeStep;
  onSubmitReview: () => void | Promise<void>;
};

export function useIntakeSteps({
  initialStep = IntakeStep.Personal,
  onSubmitReview,
}: UseIntakeStepsOptions) {
  const [step, setStep] = useState<IntakeStep>(initialStep);

  const goNext = useCallback(async () => {
    const next = nextStep(step);
    if (next) {
      setStep(next);
      return;
    }
    await onSubmitReview();
  }, [onSubmitReview, step]);

  const goBack = useCallback(() => {
    const previous = prevStep(step);
    if (previous) setStep(previous);
  }, [step]);

  const goTo = useCallback((target: IntakeStep) => {
    setStep(target);
  }, []);

  const index = stepIndex(step);

  return {
    step,
    goNext,
    goBack,
    goTo,
    isFirst: index === 0,
    isLast: index === INTAKE_STEP_ORDER.length - 1,
    index,
    total: INTAKE_STEP_ORDER.length,
  };
}
