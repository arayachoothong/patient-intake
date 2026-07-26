"use client";

import { Skeleton } from "@patient/ui";

export function SessionLoadingState() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading session">
      <div className="space-y-2">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-3 w-64" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-2 w-full" />
      </div>
      <Skeleton className="h-40 w-full rounded-xl" />
      <Skeleton className="h-40 w-full rounded-xl" />
    </div>
  );
}
