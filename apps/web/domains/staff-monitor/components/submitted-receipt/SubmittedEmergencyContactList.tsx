"use client";

import type { EmergencyContact } from "@patient/validation";
import { SubmittedEmergencyContactFieldList } from "./SubmittedEmergencyContactFieldList";

type SubmittedEmergencyContactListProps = {
  contacts: Partial<EmergencyContact>[];
};

export function SubmittedEmergencyContactList({ contacts }: SubmittedEmergencyContactListProps) {
  if (contacts.length === 0) {
    return <p className="mt-4 text-sm text-stone-500">No emergency contacts provided.</p>;
  }

  return (
    <div className="mt-5 grid gap-4 lg:grid-cols-2">
      {contacts.map((contact, index) => (
        <SubmittedEmergencyContactFieldList key={index} contact={contact} />
      ))}
    </div>
  );
}
