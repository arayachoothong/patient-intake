import { FieldName } from "../constants/field-name.constant";
import { FormSection } from "../constants/form-section.constant";
import { FIELD_DEFINITIONS, type FieldDefinition } from "../constants/patient-fields.constant";

export function fieldsForSection(section: FormSection): readonly FieldDefinition[] {
  return FIELD_DEFINITIONS.filter((field) => field.section === section);
}

export function fieldDefinition(name: FieldName): FieldDefinition {
  const definition = FIELD_DEFINITIONS.find((field) => field.name === name);
  if (!definition) throw new Error(`Unknown field: ${name}`);
  return definition;
}
