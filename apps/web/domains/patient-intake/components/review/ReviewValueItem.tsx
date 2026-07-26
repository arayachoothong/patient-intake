"use client";

import {
  fieldSpanClass,
  formatFieldDisplayValue,
  type FieldDefinition,
  type PatientIntake,
} from "@patient/validation";
import { ReviewValue } from "./ReviewValue";

type ReviewValueItemProps = {
  def: FieldDefinition;
  data: Partial<PatientIntake>;
};

export function ReviewValueItem({ def, data }: ReviewValueItemProps) {
  return (
    <div className={fieldSpanClass(def.input, def.name)}>
      <ReviewValue label={def.label} value={formatFieldDisplayValue(data, def.name)} />
    </div>
  );
}
