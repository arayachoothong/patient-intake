"use client";

import { fieldsForSection, type FormSection, type PatientIntake } from "@patient/validation";
import { ReviewValueItem } from "./ReviewValueItem";

type ReviewValueListProps = {
  section: FormSection;
  data: Partial<PatientIntake>;
};

export function ReviewValueList({ section, data }: ReviewValueListProps) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2">
      {fieldsForSection(section).map((def) => (
        <ReviewValueItem key={def.name} def={def} data={data} />
      ))}
    </dl>
  );
}
