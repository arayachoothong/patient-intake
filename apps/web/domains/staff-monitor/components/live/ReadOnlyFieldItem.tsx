"use client";

import { FieldHighlight } from "./FieldHighlight";
import { ReadOnlyValueField } from "./ReadOnlyValueField";
import {
  fieldSpanClass,
  formatFieldDisplayValue,
  type FieldDefinition,
  type PatientIntake,
} from "@patient/validation";

type ReadOnlyFieldItemProps = {
  def: FieldDefinition;
  data: Partial<PatientIntake>;
  activeField: string | null;
  isTyping: boolean;
};

export function ReadOnlyFieldItem({
  def,
  data,
  activeField,
  isTyping,
}: ReadOnlyFieldItemProps) {
  const isActive = activeField === def.name;

  return (
    <FieldHighlight
      active={isActive}
      isTyping={isActive && isTyping}
      className={fieldSpanClass(def.input, def.name)}
    >
      <ReadOnlyValueField
        label={def.label}
        value={formatFieldDisplayValue(data, def.name)}
        active={isActive}
      />
    </FieldHighlight>
  );
}
