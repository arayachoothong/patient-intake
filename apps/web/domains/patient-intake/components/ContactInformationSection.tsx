"use client";

import {
  FIELD_DEFINITIONS,
  FormSection as FormSectionId,
  fieldSpanClass,
} from "@patient/validation";
import { FormSection } from "./FormSection";
import { IntakeField } from "./IntakeField";

type ContactInformationSectionProps = {
  disabled?: boolean;
  onFocusField: (name: string) => void;
  onBlurField: () => void;
};

export function ContactInformationSection({
  disabled,
  onFocusField,
  onBlurField,
}: ContactInformationSectionProps) {
  const fields = FIELD_DEFINITIONS.filter((f) => f.section === FormSectionId.Contact);

  return (
    <FormSection section={FormSectionId.Contact}>
      {fields.map((def) => (
        <div key={def.name} className={fieldSpanClass(def.input, def.name)}>
          <IntakeField
            def={def}
            disabled={disabled}
            onFocus={() => onFocusField(def.name)}
            onBlur={onBlurField}
          />
        </div>
      ))}
    </FormSection>
  );
}
