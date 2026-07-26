import { FieldName } from "../constants/field-name.constant";
import { LANGUAGE_OPTIONS } from "../constants/language.constant";
import { formatPhoneDisplay } from "../contact-rules";
import type { PatientIntake } from "../patient-intake";

export function formatGenderLabel(value: string): string {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatLanguageLabel(value: string): string {
  const match = LANGUAGE_OPTIONS.find((opt) => opt.value === value);
  return match?.label ?? value;
}

function rawScalarValue(data: Partial<PatientIntake>, fieldName: FieldName): string {
  const value = data[fieldName as keyof PatientIntake];
  if (typeof value === "string") {
    return value.trim();
  }
  return "";
}

export function formatFieldDisplayValue(
  data: Partial<PatientIntake>,
  fieldName: FieldName,
): string {
  const raw = rawScalarValue(data, fieldName);
  if (!raw) return "";

  if (fieldName === FieldName.Gender) {
    return formatGenderLabel(raw);
  }
  if (fieldName === FieldName.PreferredLanguage) {
    return formatLanguageLabel(raw);
  }
  if (fieldName === FieldName.PhoneNumber) {
    return formatPhoneDisplay(raw);
  }
  return raw;
}
