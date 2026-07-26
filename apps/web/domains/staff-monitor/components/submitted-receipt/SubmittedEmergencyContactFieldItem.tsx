"use client";

import { ReceiptField } from "@patient/ui";
import {
  type EmergencyContact,
  type EmergencyContactFieldDefinition,
} from "@patient/validation";

type SubmittedEmergencyContactFieldItemProps = {
  def: EmergencyContactFieldDefinition;
  contact: Partial<EmergencyContact>;
};

export function SubmittedEmergencyContactFieldItem({
  def,
  contact,
}: SubmittedEmergencyContactFieldItemProps) {
  return (
    <ReceiptField
      className={def.fullWidth ? "sm:col-span-2" : undefined}
      label={def.label}
      value={contact[def.name]}
    />
  );
}
