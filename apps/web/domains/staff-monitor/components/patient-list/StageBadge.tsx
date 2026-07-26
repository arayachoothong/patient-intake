"use client";

import * as React from "react";
import { Badge } from "@patient/ui";
import {
  JourneyStage,
  journeyStage,
  journeyStageLabel,
  journeyStageVariant,
  sessionStatusLabel,
  sessionStatusVariant,
  type Session,
} from "@patient/validation";

type StageBadgeProps = {
  session: Session;
};

export function StageBadge({ session }: StageBadgeProps) {
  const stage = journeyStage({
    status: session.status,
    progress: session.progress,
  });

  return (
    <Badge
      className="inline-flex items-center gap-1.5"
      variant={stage ? journeyStageVariant(stage) : sessionStatusVariant(session.status)}
    >
      {stage === JourneyStage.Filling && session.isTyping ? (
        <span
          aria-hidden="true"
          className="size-1.5 rounded-full bg-current motion-safe:animate-pulse"
        />
      ) : null}
      {stage ? journeyStageLabel(stage) : sessionStatusLabel(session.status)}
    </Badge>
  );
}
