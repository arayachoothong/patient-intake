"use client";

import { FORM_SECTION_ORDER, FormSection } from "@patient/validation";
import { useSessionSubscription } from "../hooks/useSessionSubscription";
import { BackToPatientLink } from "./BackToPatientLink";
import { EmergencyContactsList } from "./EmergencyContactsList";
import { PatientDetailHeader } from "./PatientDetailHeader";
import { PatientInformationSection } from "./PatientInformationSection";
import { PatientProgressBar } from "./PatientProgressBar";
import { SessionErrorState } from "./SessionErrorState";
import { SessionLoadingState } from "./SessionLoadingState";
import { TypingIndicator } from "./TypingIndicator";

type PatientLiveViewProps = {
  sessionId: string;
};

const DEMOGRAPHIC_SECTIONS = FORM_SECTION_ORDER.filter(
  (section) => section !== FormSection.Emergency,
);

export function PatientLiveView({ sessionId }: PatientLiveViewProps) {
  const { session, connectionState, isLoading, error } = useSessionSubscription(sessionId);

  if (isLoading) {
    return (
      <div className="flex min-h-svh flex-col">
        <div className="flex-1 space-y-6 p-4">
          <BackToPatientLink />
          <SessionLoadingState />
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="flex min-h-svh flex-col">
        <div className="flex-1 p-4">
          <SessionErrorState message={error ?? "Session not found"} />
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
        {DEMOGRAPHIC_SECTIONS.map((section) => (
          <PatientInformationSection
            key={section}
            section={section}
            data={session.data}
            activeField={activeField}
            isTyping={Boolean(session.isTyping)}
          />
        ))}
        <EmergencyContactsList
          data={session.data}
          activeField={activeField}
          isTyping={Boolean(session.isTyping)}
        />
      </div>
    </div>
  );
}
