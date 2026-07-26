import {
  FieldName,
  GENDER_OPTIONS,
  LANGUAGE_OPTIONS,
  formatGenderLabel,
  type FieldDefinition,
} from "@patient/validation";

export function selectOptionsFor(def: FieldDefinition): { value: string; label: string }[] {
  if (def.name === FieldName.Gender) {
    return GENDER_OPTIONS.map((value) => ({
      value,
      label: formatGenderLabel(value),
    }));
  }
  if (def.name === FieldName.PreferredLanguage) {
    return LANGUAGE_OPTIONS.map((opt) => ({
      value: opt.value,
      label: opt.label,
    }));
  }
  return [];
}
