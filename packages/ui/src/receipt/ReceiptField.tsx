import { cn } from "../lib/cn";

type ReceiptFieldProps = {
  label: string;
  value?: string;
  className?: string;
};

export function ReceiptField({ label, value, className }: ReceiptFieldProps) {
  return (
    <div className={cn("border-b border-stone-200/80 pb-4 last:border-0 last:pb-0", className)}>
      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">{label}</dt>
      <dd className="mt-1.5 text-base text-stone-900">{value || "—"}</dd>
    </div>
  );
}
