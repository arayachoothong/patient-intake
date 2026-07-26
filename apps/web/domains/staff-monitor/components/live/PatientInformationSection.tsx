"use client";

import { Card, CardContent, CardHeader, CardTitle, Separator } from "@patient/ui";
import {
  fieldsForSection,
  FORM_SECTION_TITLES,
  type FormSection,
  type PatientIntake,
} from "@patient/validation";
import { ReadOnlyFieldList } from "./ReadOnlyFieldList";

type PatientInformationSectionProps = {
  section: FormSection;
  data: Partial<PatientIntake>;
  activeField: string | null;
  isTyping: boolean;
};

export function PatientInformationSection({
  section,
  data,
  activeField,
  isTyping,
}: PatientInformationSectionProps) {
  return (
    <Card aria-labelledby={`live-section-${section}`}>
      <CardHeader className="gap-3">
        <CardTitle
          id={`live-section-${section}`}
          className="font-display text-lg font-semibold text-slate-900"
        >
          {FORM_SECTION_TITLES[section]}
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
        <ReadOnlyFieldList
          fields={fieldsForSection(section)}
          data={data}
          activeField={activeField}
          isTyping={isTyping}
        />
      </CardContent>
    </Card>
  );
}
