import React from "react";
import { formatGenderLabel, formatLanguageLabel, type PatientIntake } from "@patient/validation";

type SuccessReceiptProps = {
  data: Partial<PatientIntake>;
  submittedAt: string;
};

function ReceiptField({
  label,
  value,
  className = "",
}: {
  label: string;
  value?: string;
  className?: string;
}) {
  return (
    <div className={`border-b border-stone-200/80 pb-4 last:border-0 last:pb-0 ${className}`}>
      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">{label}</dt>
      <dd className="mt-1.5 text-base text-stone-900">{value || "—"}</dd>
    </div>
  );
}

function formatSubmittedAt(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function SuccessReceipt({ data, submittedAt }: SuccessReceiptProps) {
  const fullName = [data.firstName, data.middleName, data.lastName].filter(Boolean).join(" ");
  const contacts = data.emergencyContacts ?? [];
  const contactNames = contacts
    .map((contact) => contact.name)
    .filter(Boolean)
    .join(", ");

  return (
    <section aria-labelledby="receipt-title" className="border-y border-stone-200 py-7 sm:py-8">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="receipt-title" className="text-xl font-semibold tracking-tight text-stone-900">
          Check-in receipt
        </h2>
        <p className="text-sm text-stone-500">Submitted {formatSubmittedAt(submittedAt)}</p>
      </div>

      <dl className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
        <ReceiptField label="Full name" value={fullName} />
        <ReceiptField label="Date of birth" value={data.dateOfBirth} />
        <ReceiptField label="Gender" value={data.gender && formatGenderLabel(data.gender)} />
        <ReceiptField label="Phone" value={data.phoneNumber} />
        <ReceiptField
          label="Preferred language"
          value={data.preferredLanguage && formatLanguageLabel(data.preferredLanguage)}
        />
        <ReceiptField
          className="sm:col-span-2"
          label={`Emergency contacts (${contacts.length})`}
          value={contactNames}
        />
      </dl>
    </section>
  );
}
