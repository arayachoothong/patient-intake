"use client";

import { Progress } from "@patient/ui";
import type { Session } from "@patient/validation";
import { sessionDisplayName } from "../../helpers/session-display-name.helper";

type PatientProgressBarProps = {
  session: Session;
};

export function PatientProgressBar({ session }: PatientProgressBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-700">Form progress</p>
        <p className="text-sm tabular-nums text-slate-600">{session.progress}%</p>
      </div>
      <Progress value={session.progress} aria-label={`${sessionDisplayName(session)} progress`} />
    </div>
  );
}
