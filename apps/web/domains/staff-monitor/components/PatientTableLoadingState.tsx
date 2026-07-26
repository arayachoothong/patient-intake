"use client";

import { Skeleton, Table, TableBody, TableCell, TableRow } from "@patient/ui";
import { PatientTableHeader } from "./PatientTableHeader";

const SKELETON_ROWS = 5;

export function PatientTableLoadingState() {
  return (
    <Table>
      <PatientTableHeader />
      <TableBody>
        {Array.from({ length: SKELETON_ROWS }, (_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-4 w-32" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-16" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-10" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-20" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
