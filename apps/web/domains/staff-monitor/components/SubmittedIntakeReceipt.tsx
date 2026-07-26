import {
  checkInCode,
  EMERGENCY_CONTACT_FIELD_LABELS,
  FIELD_DEFINITIONS,
  formatFieldDisplayValue,
  type Session,
} from "@patient/validation";

type SubmittedIntakeReceiptProps = {
  session: Session;
};

function formatSubmittedAt(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function ReceiptField({ label, value }: { label: string; value?: string }) {
  return (
    <div className="border-b border-stone-200/80 pb-4 last:border-0 last:pb-0">
      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">{label}</dt>
      <dd className="mt-1.5 text-base text-stone-900">{value || "—"}</dd>
    </div>
  );
}

export function SubmittedIntakeReceipt({ session }: SubmittedIntakeReceiptProps) {
  const contacts = session.data.emergencyContacts ?? [];

  return (
    <article
      aria-labelledby="submitted-receipt-title"
      className="overflow-hidden rounded-3xl border border-amber-100 bg-stone-50/95 shadow-[0_24px_70px_-45px_rgba(120,83,45,0.35)]"
    >
      <header className="flex flex-wrap items-end justify-between gap-4 bg-gradient-to-br from-amber-100 via-amber-50 to-stone-100 px-6 py-7 sm:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">
            Completed check-in
          </p>
          <h2
            id="submitted-receipt-title"
            className="font-display mt-2 text-2xl font-semibold tracking-tight text-stone-950"
          >
            Check-in receipt
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            Submitted {formatSubmittedAt(session.updatedAt)}
          </p>
        </div>
        <div className="rounded-full border border-amber-300/70 bg-white/75 px-4 py-2 font-mono text-sm tracking-wide text-stone-700">
          Check-in code <span className="font-bold text-amber-900">{checkInCode(session.id)}</span>
        </div>
      </header>

      <div className="space-y-8 px-6 py-7 sm:px-8">
        <section aria-labelledby="submitted-demographics-title">
          <h3
            id="submitted-demographics-title"
            className="font-display mb-5 text-lg font-semibold text-stone-900"
          >
            Demographics
          </h3>
          <dl className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {FIELD_DEFINITIONS.map((field) => (
              <ReceiptField
                key={field.name}
                label={field.label}
                value={formatFieldDisplayValue(session.data, field.name)}
              />
            ))}
          </dl>
        </section>

        <section
          aria-labelledby="submitted-emergency-title"
          className="border-t border-stone-200 pt-7"
        >
          <h3
            id="submitted-emergency-title"
            className="font-display text-lg font-semibold text-stone-900"
          >
            Emergency contacts ({contacts.length})
          </h3>
          {contacts.length === 0 ? (
            <p className="mt-4 text-sm text-stone-500">No emergency contacts provided.</p>
          ) : (
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {contacts.map((contact, index) => (
                <dl
                  key={index}
                  className="grid gap-4 rounded-2xl border border-stone-200 bg-white/70 p-5 sm:grid-cols-2"
                >
                  <div className="sm:col-span-2">
                    <ReceiptField
                      label={EMERGENCY_CONTACT_FIELD_LABELS.name}
                      value={contact.name}
                    />
                  </div>
                  <ReceiptField
                    label={EMERGENCY_CONTACT_FIELD_LABELS.relation}
                    value={contact.relation}
                  />
                  <ReceiptField
                    label={EMERGENCY_CONTACT_FIELD_LABELS.phone}
                    value={contact.phone}
                  />
                </dl>
              ))}
            </div>
          )}
        </section>
      </div>
    </article>
  );
}
