type ReadOnlyValueFieldProps = {
  label: string;
  value: string | undefined;
  active?: boolean;
};

function displayValue(value: string | undefined): string {
  const trimmed = value?.trim() ?? "";
  return trimmed ? trimmed : "—";
}

export function ReadOnlyValueField({ label, value, active = false }: ReadOnlyValueFieldProps) {
  return (
    <div
      className={
        active
          ? "rounded-md border border-sky-400 bg-sky-50 px-3 py-2"
          : "rounded-md border border-transparent px-3 py-2"
      }
    >
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm text-slate-900">{displayValue(value)}</p>
    </div>
  );
}
