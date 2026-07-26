"use client";

import { Skeleton } from "@patient/ui";

export function FormBootstrapState() {
  return (
    <div className="space-y-6" role="status" aria-label="Preparing your intake form">
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-2 w-full" />
      </div>
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
    </div>
  );
}
