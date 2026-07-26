"use client";

import type { EmergencyContactFormValue } from "../../interfaces/patient-form.interface";
import { ReviewEmergencyContactItem } from "./ReviewEmergencyContactItem";

type ReviewEmergencyContactListProps = {
  contacts: EmergencyContactFormValue[];
};

export function ReviewEmergencyContactList({ contacts }: ReviewEmergencyContactListProps) {
  return (
    <div className="space-y-4">
      {contacts.map((contact, index) => (
        <ReviewEmergencyContactItem key={index} contact={contact} index={index} />
      ))}
    </div>
  );
}
