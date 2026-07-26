"use client";

import type { EmergencyContactFormValue } from "../../interfaces/patient-form.interface";
import { ReviewEmergencyContactFieldList } from "./ReviewEmergencyContactFieldList";

type ReviewEmergencyContactItemProps = {
  contact: EmergencyContactFormValue;
  index: number;
};

export function ReviewEmergencyContactItem({ contact, index }: ReviewEmergencyContactItemProps) {
  return (
    <div className="space-y-2">
      <p className="text-foreground text-sm font-medium">Contact {index + 1}</p>
      <ReviewEmergencyContactFieldList contact={contact} />
    </div>
  );
}
