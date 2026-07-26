"use client";

import { Alert, AlertDescription, AlertTitle } from "@patient/ui";

type PatientTableErrorStateProps = {
  message: string;
};

export function PatientTableErrorState({ message }: PatientTableErrorStateProps) {
  return (
    <Alert variant="destructive">
      <AlertTitle>Unable to load patients</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
