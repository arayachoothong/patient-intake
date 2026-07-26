"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Badge, cn, TableCell, TableRow } from "@patient/ui";
import {
  journeyStage,
  journeyStageLabel,
  journeyStageVariant,
  sessionStatusLabel,
  sessionStatusVariant,
  type Session,
} from "@patient/validation";
import { formatUpdatedAt } from "../helpers/format-updated-at.helper";
import { sessionDisplayName } from "../helpers/session-display-name.helper";

type PatientTableRowProps = {
  session: Session;
};

function StageBadge({ session }: PatientTableRowProps) {
  const stage = journeyStage({
    status: session.status,
    progress: session.progress,
  });

  return (
    <Badge
      className="inline-flex items-center gap-1.5"
      variant={stage ? journeyStageVariant(stage) : sessionStatusVariant(session.status)}
    >
      {stage === "filling" && session.isTyping ? (
        <span
          aria-hidden="true"
          className="size-1.5 rounded-full bg-current motion-safe:animate-pulse"
        />
      ) : null}
      {stage ? journeyStageLabel(stage) : sessionStatusLabel(session.status)}
    </Badge>
  );
}

function usePatientNavigation(sessionId: string) {
  const router = useRouter();
  const href = `/staff/${sessionId}`;

  const navigate = () => {
    router.push(href);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      navigate();
    }
  };

  return { href, navigate, onKeyDown };
}

export function PatientTableRow({ session }: PatientTableRowProps) {
  const { href, navigate, onKeyDown } = usePatientNavigation(session.id);
  const isReady = journeyStage({ status: session.status, progress: session.progress }) === "ready";

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

export function PatientMobileRow({ session }: PatientTableRowProps) {
  const { href, navigate, onKeyDown } = usePatientNavigation(session.id);
  const isReady = journeyStage({ status: session.status, progress: session.progress }) === "ready";

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
