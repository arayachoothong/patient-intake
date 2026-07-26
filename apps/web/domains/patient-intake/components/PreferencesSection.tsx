"use client";

import {
  FIELD_DEFINITIONS,
  FormSection as FormSectionId,
  fieldSpanClass,
} from "@patient/validation";
import { FormSection } from "./FormSection";
import { IntakeField } from "./IntakeField";

type PreferencesSectionProps = {
  disabled?: boolean;
  onFocusField: (name: string) => void;
  onBlurField: () => void;
};

export function PreferencesSection({
  disabled,
  onFocusField,
  onBlurField,
}: PreferencesSectionProps) {
  const fields = FIELD_DEFINITIONS.filter((f) => f.section === FormSectionId.Preferences);

  return (
    <FormSection section={FormSectionId.Preferences}>
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
