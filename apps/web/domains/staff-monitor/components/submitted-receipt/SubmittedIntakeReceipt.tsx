"use client";

import { checkInCode, formatSubmittedAt, type Session } from "@patient/validation";
import { SubmittedEmergencyContactList } from "./SubmittedEmergencyContactList";
import { SubmittedReceiptFieldList } from "./SubmittedReceiptFieldList";

type SubmittedIntakeReceiptProps = {
  session: Session;
};

export function SubmittedIntakeReceipt({ session }: SubmittedIntakeReceiptProps) {
  const contacts = session.data.emergencyContacts ?? [];

  return (
    <article
      aria-labelledby="submitted-receipt-title"
      className="overflow-hidden rounded-3xl border border-blue-100 bg-slate-50/95 shadow-[0_24px_70px_-45px_rgba(37,99,235,0.35)]"
    >
      <header className="flex flex-wrap items-end justify-between gap-4 bg-gradient-to-br from-blue-100 via-blue-50 to-slate-100 px-6 py-7 sm:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-800">
            Completed check-in
          </p>
          <h2
            id="submitted-receipt-title"
            className="font-display mt-2 text-2xl font-semibold tracking-tight text-slate-950"
          >
            Check-in receipt
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Submitted {formatSubmittedAt(session.updatedAt)}
          </p>
        </div>
        <div className="rounded-full border border-blue-300/70 bg-white/75 px-4 py-2 font-mono text-sm tracking-wide text-slate-700">
          Check-in code <span className="font-bold text-blue-900">{checkInCode(session.id)}</span>
        </div>
      </header>

      <div className="space-y-8 px-6 py-7 sm:px-8">
        <section aria-labelledby="submitted-demographics-title">
          <h3
            id="submitted-demographics-title"
            className="font-display mb-5 text-lg font-semibold text-slate-900"
          >
            Demographics
          </h3>
          <SubmittedReceiptFieldList data={session.data} />
        </section>

        <section
          aria-labelledby="submitted-emergency-title"
          className="border-t border-slate-200 pt-7"
        >
          <h3
            id="submitted-emergency-title"
            className="font-display text-lg font-semibold text-slate-900"
          >
            Emergency contacts ({contacts.length})
          </h3>
          <SubmittedEmergencyContactList contacts={contacts} />
        </section>
      </div>
    </article>
  );
}
