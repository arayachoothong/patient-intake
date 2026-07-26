"use client";

import * as React from "react";
import { cn, TableCell, TableRow } from "@patient/ui";
import {
  JourneyStage,
  journeyStage,
  type Session,
} from "@patient/validation";
import { formatUpdatedAt } from "../../helpers/format-updated-at.helper";
import { sessionDisplayName } from "../../helpers/session-display-name.helper";
import { StageBadge } from "./StageBadge";
import { usePatientRowNavigation } from "./usePatientRowNavigation";

type PatientListItemProps = {
  session: Session;
};

export function PatientListItem({ session }: PatientListItemProps) {
  const { href, navigate, onKeyDown } = usePatientRowNavigation(session.id);
  const isReady =
    journeyStage({
      status: session.status,
      progress: session.progress,
      currentStep: session.currentStep,
    }) === JourneyStage.Ready;

  return (
    <TableRow
      aria-label={`Open ${sessionDisplayName(session)}`}
      className={cn(
        "focus-visible:ring-ring hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 md:table-row",
        isReady && "border-primary/30 bg-primary/5 border-l-4",
      )}
      tabIndex={0}
      role="link"
      data-href={href}
      onClick={navigate}
      onKeyDown={onKeyDown}
    >
      <TableCell className="font-medium">{sessionDisplayName(session)}</TableCell>
      <TableCell>
        <StageBadge session={session} />
      </TableCell>
      <TableCell className="tabular-nums">{session.progress}%</TableCell>
      <TableCell className="text-muted-foreground">{formatUpdatedAt(session.updatedAt)}</TableCell>
    </TableRow>
  );
}
