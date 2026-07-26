"use client";

import { formatSubmittedAt, type PatientIntake } from "@patient/validation";
import { ReceiptFieldList } from "./ReceiptFieldList";

type SuccessReceiptProps = {
  data: Partial<PatientIntake>;
  submittedAt: string;
};

export function SuccessReceipt({ data, submittedAt }: SuccessReceiptProps) {
  const contacts = data.emergencyContacts ?? [];
  const contactNames = contacts
    .map((contact) => contact.name)
    .filter(Boolean)
    .join(", ");

  return (
    <section aria-labelledby="receipt-title" className="border-y border-slate-200 py-7 sm:py-8">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="receipt-title" className="text-xl font-semibold tracking-tight text-slate-900">
          Check-in receipt
        </h2>
        <p className="text-sm text-slate-500">Submitted {formatSubmittedAt(submittedAt)}</p>
      </div>

      <ReceiptFieldList
        data={data}
        emergencyContactCount={contacts.length}
        emergencyContactSummary={contactNames}
      />
    </section>
  );
}
