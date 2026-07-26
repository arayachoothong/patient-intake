"use client";

import { FieldGrid } from "@patient/ui";
import type { FieldDefinition, PatientIntake } from "@patient/validation";
import { ReadOnlyFieldItem } from "./ReadOnlyFieldItem";

type ReadOnlyFieldListProps = {
  fields: readonly FieldDefinition[];
  data: Partial<PatientIntake>;
  activeField: string | null;
  isTyping: boolean;
};

export function ReadOnlyFieldList({
  fields,
  data,
  activeField,
  isTyping,
}: ReadOnlyFieldListProps) {
  return (
    <FieldGrid>
      {fields.map((def) => (
        <ReadOnlyFieldItem
          key={def.name}
          def={def}
          data={data}
          activeField={activeField}
          isTyping={isTyping}
        />
      ))}
    </FieldGrid>
  );
}
