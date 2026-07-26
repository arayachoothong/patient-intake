"use client";

import { Progress } from "@patient/ui";

type FormProgressHeaderProps = {
  progress: number;
};

export function FormProgressHeader({ progress }: FormProgressHeaderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-700">Form progress</p>
        <p className="text-sm tabular-nums text-slate-600">{progress}%</p>
      </div>
      <Progress value={progress} aria-label="Intake form progress" />
    </div>
  );
}
