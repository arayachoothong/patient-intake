"use client";

import { fieldSpanClass, type FieldDefinition } from "@patient/validation";
import { IntakeField } from "./IntakeField";

type IntakeFieldItemProps = {
  def: FieldDefinition;
  disabled?: boolean;
  onFocusField: (name: string) => void;
  onBlurField: () => void;
};

export function IntakeFieldItem({
  def,
  disabled,
  onFocusField,
  onBlurField,
}: IntakeFieldItemProps) {
  return (
    <div className={fieldSpanClass(def.input, def.name)}>
      <IntakeField
        def={def}
        disabled={disabled}
        onFocus={() => onFocusField(def.name)}
        onBlur={onBlurField}
      />
    </div>
  );
}
