"use client";

import { Alert, AlertDescription, AlertTitle } from "@patient/ui";

type SubmitErrorMessageProps = {
  message: string | null;
};

export function SubmitErrorMessage({ message }: SubmitErrorMessageProps) {
  if (!message) return null;

  return (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
