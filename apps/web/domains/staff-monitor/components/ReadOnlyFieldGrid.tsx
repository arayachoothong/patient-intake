"use client";

import { FieldGrid } from "@patient/ui";
import {
  fieldSpanClass,
  formatFieldDisplayValue,
  type FieldDefinition,
  type PatientIntake,
} from "@patient/validation";
import { FieldHighlight } from "./FieldHighlight";
import { ReadOnlyValueField } from "./ReadOnlyValueField";

type ReadOnlyFieldGridProps = {
  fields: readonly FieldDefinition[];
  data: Partial<PatientIntake>;
  activeField: string | null;
  isTyping: boolean;
};

export function ReadOnlyFieldGrid({ fields, data, activeField, isTyping }: ReadOnlyFieldGridProps) {
  return (
    <FieldGrid>
      {fields.map((def) => {
        const isActive = activeField === def.name;
        return (
          <FieldHighlight
            key={def.name}
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
      })}
    </FieldGrid>
  );
}
