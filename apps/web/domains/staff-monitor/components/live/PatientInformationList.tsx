"use client";

import { FORM_SECTION_ORDER, FormSection, type PatientIntake } from "@patient/validation";
import { PatientInformationSection } from "./PatientInformationSection";

type PatientInformationListProps = {
  data: Partial<PatientIntake>;
  activeField: string | null;
  isTyping: boolean;
};

const DEMOGRAPHIC_SECTIONS = FORM_SECTION_ORDER.filter(
  (section) => section !== FormSection.Emergency,
);

export function PatientInformationList({
  data,
  activeField,
  isTyping,
}: PatientInformationListProps) {
  return (
    <>
      {DEMOGRAPHIC_SECTIONS.map((section) => (
        <PatientInformationSection
          key={section}
          section={section}
          data={data}
          activeField={activeField}
          isTyping={isTyping}
        />
      ))}
    </>
  );
}
