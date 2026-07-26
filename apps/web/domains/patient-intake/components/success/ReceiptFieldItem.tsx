"use client";

import { ReceiptField } from "@patient/ui";
import {
  fieldDefinition,
  formatFieldDisplayValue,
  type FieldName,
  type PatientIntake,
} from "@patient/validation";

type ReceiptFieldItemProps = {
  name: FieldName;
  data: Partial<PatientIntake>;
  className?: string;
};

export function ReceiptFieldItem({ name, data, className }: ReceiptFieldItemProps) {
  return (
    <ReceiptField
      className={className}
      label={fieldDefinition(name).label}
      value={formatFieldDisplayValue(data, name)}
    />
  );
}
