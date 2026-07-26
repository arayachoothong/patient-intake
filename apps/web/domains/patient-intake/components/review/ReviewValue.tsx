"use client";

import * as React from "react";

type ReviewValueProps = {
  label: string;
  value: string;
};

export function ReviewValue({ label, value }: ReviewValueProps) {
  return (
    <div>
      <dt className="text-muted-foreground text-xs font-medium uppercase tracking-wide">{label}</dt>
      <dd className="text-foreground mt-1 text-sm">{value || "—"}</dd>
    </div>
  );
}
