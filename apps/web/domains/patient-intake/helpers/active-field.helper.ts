import type { FieldErrors } from "react-hook-form";
import {
  FORM_SECTION_ORDER,
  FORM_SECTION_TITLES,
  FieldName,
  formatGenderLabel,
} from "@patient/validation";
import type { PatientFormValues } from "../interfaces/patient-form.interface";

export { FORM_SECTION_ORDER, FORM_SECTION_TITLES };

export const genderOptionLabel = formatGenderLabel;

export function getFieldError(
  errors: FieldErrors<PatientFormValues>,
  name: FieldName,
): string | undefined {
  const error = errors[name as keyof PatientFormValues];
  if (error && typeof error === "object" && "message" in error) {
    return typeof error.message === "string" ? error.message : undefined;
  }
  return undefined;
}
