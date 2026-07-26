"use client";

import { QueryErrorAlert, QueryLoadingSkeleton } from "@patient/ui";
import { SessionStatus } from "@patient/validation";
import { useSessionSubscription } from "../hooks/useSessionSubscription";
import { BackToPatientLink } from "./live/BackToPatientLink";
import { EmergencyContactsList } from "./emergency/EmergencyContactsList";
import { PatientDetailHeader } from "./live/PatientDetailHeader";
import { PatientInformationList } from "./live/PatientInformationList";
import { PatientProgressBar } from "./live/PatientProgressBar";
import { SubmittedIntakeReceipt } from "./submitted-receipt/SubmittedIntakeReceipt";
import { TypingIndicator } from "./live/TypingIndicator";

type PatientLiveViewProps = {
  sessionId: string;
};

export function PatientLiveView({ sessionId }: PatientLiveViewProps) {
  const { session, connectionState, isLoading, error } = useSessionSubscription(sessionId);

  if (isLoading) {
    return (
      <div className="flex min-h-svh flex-col">
        <div className="flex-1 space-y-6 p-4">
          <BackToPatientLink />
          <div role="status" aria-label="Loading session">
            <QueryLoadingSkeleton rows={6} />
          </div>
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="flex min-h-svh flex-col">
        <div className="flex-1 space-y-4 p-4">
          <QueryErrorAlert
            title="Unable to load session"
            description={error ?? "Session not found"}
          />
          <BackToPatientLink />
        </div>
      </div>
    );
  }

  if (session.status === SessionStatus.Submitted) {
    return (
      <div className="flex min-h-svh flex-col">
        <div className="flex-1 space-y-6 p-4">
          <BackToPatientLink />
          <PatientDetailHeader session={session} connectionState={connectionState} />
          <SubmittedIntakeReceipt session={session} />
        </div>
      </div>
    );
  }

  const activeField = session.activeField;
  const showTyping = Boolean(session.isTyping && activeField);

  return (
    <div className="flex min-h-svh flex-col">
      <div className="flex-1 space-y-6 p-4">
        <BackToPatientLink />
        <PatientDetailHeader session={session} connectionState={connectionState} />
        <PatientProgressBar session={session} />
        <TypingIndicator visible={showTyping} />
        <PatientInformationList
          data={session.data}
          activeField={activeField}
          isTyping={Boolean(session.isTyping)}
        />
        <EmergencyContactsList
          data={session.data}
          activeField={activeField}
          isTyping={Boolean(session.isTyping)}
        />
      </div>
    </div>
  );
}
