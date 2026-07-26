"use client";

import { Alert, AlertDescription, AlertTitle } from "@patient/ui";

type SubmittedNoticeProps = {
  visible: boolean;
};

export function SubmittedNotice({ visible }: SubmittedNoticeProps) {
  if (!visible) return null;

  return (
    <Alert>
      <AlertTitle>Submitted</AlertTitle>
      <AlertDescription>Your intake was submitted. The form is locked.</AlertDescription>
    </Alert>
  );
}
