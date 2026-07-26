"use client";

import type { IntakeStep } from "@patient/validation";
import { toDisplayData } from "../../helpers/form-defaults.helper";
import type { PatientFormValues } from "../../interfaces/patient-form.interface";
import { ReviewGroupList } from "./ReviewGroupList";

type ReviewStepProps = {
  values: PatientFormValues;
  goTo: (step: IntakeStep) => void;
};

export function ReviewStep({ values, goTo }: ReviewStepProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-foreground text-xl font-semibold">Review your information</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Confirm these details before submitting your intake.
        </p>
      </div>

      <ReviewGroupList
        data={toDisplayData(values)}
        emergencyContacts={values.emergencyContacts}
        goTo={goTo}
      />
    </div>
  );
}
