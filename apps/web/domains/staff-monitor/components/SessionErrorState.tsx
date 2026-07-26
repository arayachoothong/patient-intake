"use client";

import { Alert, AlertDescription, AlertTitle } from "@patient/ui";
import { BackToPatientLink } from "./BackToPatientLink";

type SessionErrorStateProps = {
  message: string;
};

export function SessionErrorState({ message }: SessionErrorStateProps) {
  return (
    <section className="space-y-4">
      <Alert variant="destructive">
        <AlertTitle>Unable to load session</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
      <BackToPatientLink />
    </section>
  );
}
