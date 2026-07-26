"use client";

import * as React from "react";
import { TableHead, TableHeader, TableRow } from "@patient/ui";

export function PatientTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Patient</TableHead>
        <TableHead>Stage</TableHead>
        <TableHead>Progress</TableHead>
        <TableHead>Last activity</TableHead>
      </TableRow>
    </TableHeader>
  );
}
