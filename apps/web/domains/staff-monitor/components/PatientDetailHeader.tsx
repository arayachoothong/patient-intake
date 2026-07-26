"use client";

import {
  Alert,
  AlertDescription,
  Badge,
  ConnectionStatus,
  type ConnectionState,
} from "@patient/ui";
import {
  SessionStatus,
  sessionStatusLabel,
  sessionStatusVariant,
  type Session,
} from "@patient/validation";
import { sessionDisplayName } from "../helpers/session-display-name.helper";

type PatientDetailHeaderProps = {
  session: Session;
  connectionState: ConnectionState;
};

export function PatientDetailHeader({ session, connectionState }: PatientDetailHeaderProps) {
  const submitted = session.status === SessionStatus.Submitted;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-display text-xl font-semibold text-slate-900">
              {sessionDisplayName(session)}
            </h2>
            <Badge variant={sessionStatusVariant(session.status)}>
              {sessionStatusLabel(session.status)}
            </Badge>
          </div>
          <p className="font-mono text-xs text-slate-500">{session.id}</p>
        </div>
        <ConnectionStatus state={connectionState} />
      </div>
      {submitted ? (
        <Alert>
          <AlertDescription>Intake submitted. Fields are locked for this session.</AlertDescription>
        </Alert>
      ) : null}
    </div>
  );
}
