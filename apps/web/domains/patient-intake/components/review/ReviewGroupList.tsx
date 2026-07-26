"use client";

import {
  FORM_SECTION_ORDER,
  FORM_SECTION_TITLES,
  FormSection,
  intakeStepForSection,
  type IntakeStep,
  type PatientIntake,
} from "@patient/validation";
import type { EmergencyContactFormValue } from "../../interfaces/patient-form.interface";
import { ReviewEmergencyContactList } from "./ReviewEmergencyContactList";
import { ReviewGroup } from "./ReviewGroup";
import { ReviewValueList } from "./ReviewValueList";

type ReviewGroupListProps = {
  data: Partial<PatientIntake>;
  emergencyContacts: EmergencyContactFormValue[];
  goTo: (step: IntakeStep) => void;
};

export function ReviewGroupList({ data, emergencyContacts, goTo }: ReviewGroupListProps) {
  return (
    <>
      {FORM_SECTION_ORDER.map((section) => (
        <ReviewGroup
          key={section}
          title={FORM_SECTION_TITLES[section]}
          step={intakeStepForSection(section)}
          goTo={goTo}
        >
          {section === FormSection.Emergency ? (
            <ReviewEmergencyContactList contacts={emergencyContacts} />
          ) : (
            <ReviewValueList section={section} data={data} />
          )}
        </ReviewGroup>
      ))}
    </>
  );
}
