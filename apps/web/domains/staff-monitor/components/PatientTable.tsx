"use client";

import { Table, TableBody } from "@patient/ui";
import { useQueueSubscription } from "../hooks/useQueueSubscription";
import { PatientTableEmptyState } from "./PatientTableEmptyState";
import { PatientTableErrorState } from "./PatientTableErrorState";
import { PatientTableHeader } from "./PatientTableHeader";
import { PatientTableLoadingState } from "./PatientTableLoadingState";
import { PatientMobileRow, PatientTableRow } from "./PatientTableRow";
import { StaffPageHeader } from "./StaffPageHeader";

export function PatientTable() {
  const { sessions, connectionState, isLoading, error } = useQueueSubscription();

  return (
    <div className="flex min-h-svh flex-col">
      <StaffPageHeader title="Patient" connectionState={connectionState} />
      <div className="flex-1 space-y-4 p-4">
        {error ? <PatientTableErrorState message={error} /> : null}
        {isLoading ? (
          <PatientTableLoadingState />
        ) : error && sessions.length === 0 ? null : sessions.length === 0 ? (
          <PatientTableEmptyState />
        ) : (
          <div>
            <div className="space-y-3 md:hidden">
              {sessions.map((session) => (
                <PatientMobileRow key={session.id} session={session} />
              ))}
            </div>
            <div className="bg-background hidden overflow-hidden rounded-lg border md:block">
              <Table>
                <PatientTableHeader />
                <TableBody>
                  {sessions.map((session) => (
                    <PatientTableRow key={session.id} session={session} />
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
