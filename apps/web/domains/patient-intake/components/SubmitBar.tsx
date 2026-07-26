"use client";

import { Button } from "@patient/ui";

type SubmitBarProps = {
  submitted: boolean;
  isSubmitting: boolean;
  disabled?: boolean;
};

export function SubmitBar({ submitted, isSubmitting, disabled }: SubmitBarProps) {
  return (
    <div className="flex justify-end">
      <Button type="submit" disabled={disabled || submitted || isSubmitting}>
        {submitted ? "Submitted" : isSubmitting ? "Submitting…" : "Submit intake"}
      </Button>
    </div>
  );
}
