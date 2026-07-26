"use client";

import { Button } from "@patient/ui";

type StepActionsProps = {
  isFirst: boolean;
  isReview: boolean;
  disabled?: boolean;
  isSubmitting?: boolean;
  onBack: () => void;
  onContinue: () => void | Promise<void>;
  onSubmit: () => void | Promise<void>;
};

export function StepActions({
  isFirst,
  isReview,
  disabled,
  isSubmitting,
  onBack,
  onContinue,
  onSubmit,
}: StepActionsProps) {
  return (
    <div className="sticky bottom-0 z-10 -mx-4 flex gap-3 border-t bg-white/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 backdrop-blur md:static md:mx-0 md:justify-end md:border-0 md:bg-transparent md:p-0">
      <Button
        type="button"
        variant="outline"
        disabled={isFirst || disabled}
        onClick={onBack}
        className="flex-1 md:flex-none"
      >
        Back
      </Button>
      <Button
        type="button"
        disabled={disabled || isSubmitting}
        onClick={() => {
          if (isReview) {
            void onSubmit();
            return;
          }
          void onContinue();
        }}
        className="flex-1 md:flex-none"
      >
        {isReview ? (isSubmitting ? "Submitting…" : "Submit intake") : "Continue"}
      </Button>
    </div>
  );
}
