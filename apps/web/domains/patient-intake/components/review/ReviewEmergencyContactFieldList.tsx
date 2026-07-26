"use client";

import { EMERGENCY_CONTACT_FIELD_DEFINITIONS } from "@patient/validation";
import type { EmergencyContactFormValue } from "../../interfaces/patient-form.interface";
import { ReviewValue } from "./ReviewValue";

type ReviewEmergencyContactFieldListProps = {
  contact: EmergencyContactFormValue;
};

export function ReviewEmergencyContactFieldList({ contact }: ReviewEmergencyContactFieldListProps) {
  return (
    <dl className="grid gap-4 sm:grid-cols-3">
      {EMERGENCY_CONTACT_FIELD_DEFINITIONS.map((def) => (
        <ReviewValue key={def.name} label={def.label} value={contact[def.name]} />
      ))}
    </dl>
  );
}
