"use client";

import { FIELD_DEFINITIONS, type PatientIntake } from "@patient/validation";
import { SubmittedReceiptFieldItem } from "./SubmittedReceiptFieldItem";

type SubmittedReceiptFieldListProps = {
  data: Partial<PatientIntake>;
};

export function SubmittedReceiptFieldList({ data }: SubmittedReceiptFieldListProps) {
  return (
    <dl className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
      {FIELD_DEFINITIONS.map((field) => (
        <SubmittedReceiptFieldItem key={field.name} field={field} data={data} />
      ))}
    </dl>
  );
}
