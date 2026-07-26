"use client";

import { fieldsForSection, type FormSection } from "@patient/validation";
import { IntakeFieldItem } from "./IntakeFieldItem";
import { IntakeFormSection } from "./IntakeFormSection";

type IntakeFieldListProps = {
  section: FormSection;
  disabled?: boolean;
  onFocusField: (name: string) => void;
  onBlurField: () => void;
};

export function IntakeFieldList({
  section,
  disabled,
  onFocusField,
  onBlurField,
}: IntakeFieldListProps) {
  return (
    <IntakeFormSection section={section}>
      {fieldsForSection(section).map((def) => (
        <IntakeFieldItem
          key={def.name}
          def={def}
          disabled={disabled}
          onFocusField={onFocusField}
          onBlurField={onBlurField}
        />
      ))}
    </IntakeFormSection>
  );
}
