"use client";

import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle, FieldGrid } from "@patient/ui";
import { FormSection as FormSectionId, FORM_SECTION_TITLES } from "@patient/validation";

type FormSectionProps = {
  section: FormSectionId;
  children: ReactNode;
};

export function FormSection({ section, children }: FormSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle id={`section-${section}`}>{FORM_SECTION_TITLES[section]}</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldGrid>{children}</FieldGrid>
      </CardContent>
    </Card>
  );
}
