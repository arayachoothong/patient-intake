"use client";

import {
  QueryEmptyState,
  QueryErrorAlert,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@patient/ui";
import { useQueueSubscription } from "../../hooks/useQueueSubscription";
import { StaffPageHeader } from "../../layout/StaffPageHeader";
import { PatientListHeader } from "./PatientListHeader";
import { PatientListItem } from "./PatientListItem";
import { PatientListMobileItem } from "./PatientListMobileItem";

const SKELETON_ROWS = 5;

function PatientListLoading() {
  return (
    <div className="bg-background overflow-hidden rounded-lg border">
      <Table>
        <PatientListHeader />
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
    </div>
  );
}

export function PatientList() {
  const { sessions, connectionState, isLoading, error } = useQueueSubscription();

  return (
    <div className="flex min-h-svh flex-col">
      <StaffPageHeader title="Patient" connectionState={connectionState} />
      <div className="flex-1 space-y-4 p-4">
        {error ? (
          <QueryErrorAlert title="Unable to load patients" description={error} />
        ) : null}
        {isLoading ? (
          <PatientListLoading />
        ) : error && sessions.length === 0 ? null : sessions.length === 0 ? (
          <QueryEmptyState
            title="No patients yet"
            description="New check-ins will appear here as patients start intake."
          />
        ) : (
          <div>
            <div className="space-y-3 md:hidden">
              {sessions.map((session) => (
                <PatientListMobileItem key={session.id} session={session} />
              ))}
            </div>
            <div className="bg-background hidden overflow-hidden rounded-lg border md:block">
              <Table>
                <PatientListHeader />
                <TableBody>
                  {sessions.map((session) => (
                    <PatientListItem key={session.id} session={session} />
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
