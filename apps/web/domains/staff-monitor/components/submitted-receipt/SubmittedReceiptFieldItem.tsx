"use client";

import { ReceiptField } from "@patient/ui";
import {
  formatFieldDisplayValue,
  type FieldDefinition,
  type PatientIntake,
} from "@patient/validation";

type SubmittedReceiptFieldItemProps = {
  field: FieldDefinition;
  data: Partial<PatientIntake>;
};

export function SubmittedReceiptFieldItem({ field, data }: SubmittedReceiptFieldItemProps) {
  return (
    <ReceiptField label={field.label} value={formatFieldDisplayValue(data, field.name)} />
  );
}
