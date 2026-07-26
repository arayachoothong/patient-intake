"use client";

import {
  FIELD_DEFINITIONS,
  FormSection as FormSectionId,
  fieldSpanClass,
} from "@patient/validation";
import { FormSection } from "./FormSection";
import { IntakeField } from "./IntakeField";

type PersonalInformationSectionProps = {
  disabled?: boolean;
  onFocusField: (name: string) => void;
  onBlurField: () => void;
};

export function PersonalInformationSection({
  disabled,
  onFocusField,
  onBlurField,
}: PersonalInformationSectionProps) {
  const fields = FIELD_DEFINITIONS.filter((f) => f.section === FormSectionId.Personal);

  return (
    <FormSection section={FormSectionId.Personal}>
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
