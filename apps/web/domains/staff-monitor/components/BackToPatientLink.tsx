"use client";

import Link from "next/link";

export function BackToPatientLink() {
  return (
    <Link
      href="/staff"
      className="inline-block text-sm font-medium text-slate-700 underline hover:text-slate-900"
    >
      ← Back to Patient
    </Link>
  );
}
