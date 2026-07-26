"use client";

import { ReceiptField } from "@patient/ui";
import { RECEIPT_SUMMARY_FIELDS, type PatientIntake } from "@patient/validation";
import { ReceiptFieldItem } from "./ReceiptFieldItem";

type ReceiptFieldListProps = {
  data: Partial<PatientIntake>;
  emergencyContactSummary: string;
  emergencyContactCount: number;
};

export function ReceiptFieldList({
  data,
  emergencyContactSummary,
  emergencyContactCount,
}: ReceiptFieldListProps) {
  return (
    <dl className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
      {RECEIPT_SUMMARY_FIELDS.map((name) => (
        <ReceiptFieldItem key={name} name={name} data={data} />
      ))}
      <ReceiptField
        className="sm:col-span-2"
        label={`Emergency contacts (${emergencyContactCount})`}
        value={emergencyContactSummary}
      />
    </dl>
  );
}
