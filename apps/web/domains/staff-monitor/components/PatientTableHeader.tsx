"use client";

import { TableHead, TableHeader, TableRow } from "@patient/ui";

export function PatientTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Progress</TableHead>
        <TableHead>Updated</TableHead>
      </TableRow>
    </TableHeader>
  );
}
