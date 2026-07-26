"use client";

import {
  EMERGENCY_CONTACT_FIELD_DEFINITIONS,
  type EmergencyContact,
} from "@patient/validation";
import { SubmittedEmergencyContactFieldItem } from "./SubmittedEmergencyContactFieldItem";

type SubmittedEmergencyContactFieldListProps = {
  contact: Partial<EmergencyContact>;
};

export function SubmittedEmergencyContactFieldList({
  contact,
}: SubmittedEmergencyContactFieldListProps) {
  return (
    <dl className="grid gap-4 rounded-2xl border border-slate-200 bg-white/70 p-5 sm:grid-cols-2">
      {EMERGENCY_CONTACT_FIELD_DEFINITIONS.map((def) => (
        <SubmittedEmergencyContactFieldItem key={def.name} def={def} contact={contact} />
      ))}
    </dl>
  );
}
