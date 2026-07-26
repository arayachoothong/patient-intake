"use client";

import * as React from "react";
import { cn } from "@patient/ui";
import {
  JourneyStage,
  journeyStage,
  type Session,
} from "@patient/validation";
import { formatUpdatedAt } from "../../helpers/format-updated-at.helper";
import { sessionDisplayName } from "../../helpers/session-display-name.helper";
import { StageBadge } from "./StageBadge";
import { usePatientRowNavigation } from "./usePatientRowNavigation";

type PatientListMobileItemProps = {
  session: Session;
};

export function PatientListMobileItem({ session }: PatientListMobileItemProps) {
  const { href, navigate, onKeyDown } = usePatientRowNavigation(session.id);
  const isReady =
    journeyStage({
      status: session.status,
      progress: session.progress,
      currentStep: session.currentStep,
    }) === JourneyStage.Ready;

  return (
    <article
      aria-label={`Open ${sessionDisplayName(session)}`}
      className={cn(
        "bg-background hover:bg-muted/40 focus-visible:ring-ring cursor-pointer rounded-xl border p-4 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 md:hidden",
        isReady && "border-primary/30 bg-primary/5 ring-primary/20 ring-1",
      )}
      tabIndex={0}
      role="link"
      data-href={href}
      onClick={navigate}
      onKeyDown={onKeyDown}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="min-w-0 truncate font-medium">{sessionDisplayName(session)}</p>
        <StageBadge session={session} />
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 text-sm">
        <span className="text-foreground font-medium tabular-nums">
          {session.progress}% complete
        </span>
        <span className="text-muted-foreground text-right">
          <span className="sr-only">Last activity: </span>
          {formatUpdatedAt(session.updatedAt)}
        </span>
      </div>
    </article>
  );
}
