"use client";

import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@patient/ui";

export function PatientTableEmptyState() {
  return (
    <Empty className="bg-background border">
      <EmptyHeader>
        <EmptyTitle>No patients yet</EmptyTitle>
        <EmptyDescription>
          New check-ins will appear here as patients start intake.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
