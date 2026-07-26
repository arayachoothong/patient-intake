"use client";

import * as React from "react";
import type { ReactNode } from "react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@patient/ui";
import type { IntakeStep } from "@patient/validation";

type ReviewGroupProps = {
  title: string;
  step: IntakeStep;
  goTo: (step: IntakeStep) => void;
  children: ReactNode;
};

export function ReviewGroup({ title, step, goTo, children }: ReviewGroupProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          aria-label={`Edit ${title}`}
          onClick={() => goTo(step)}
        >
          Edit
        </Button>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
