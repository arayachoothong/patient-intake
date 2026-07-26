import { FieldInputType } from "./field-input-type.constant";

export enum EmergencyContactField {
  Name = "name",
  Relation = "relation",
  Phone = "phone",
}

export type EmergencyContactFieldDefinition = {
  name: EmergencyContactField;
  label: string;
  required: boolean;
  input: FieldInputType;
  fullWidth: boolean;
};

export const MIN_EMERGENCY_CONTACTS = 1;
export const MAX_EMERGENCY_CONTACTS = 3;

export const EMERGENCY_CONTACT_FIELD_DEFINITIONS: readonly EmergencyContactFieldDefinition[] = [
  {
    name: EmergencyContactField.Name,
    label: "Contact name",
    required: true,
    input: FieldInputType.Text,
    fullWidth: true,
  },
  {
    name: EmergencyContactField.Relation,
    label: "Relation",
    required: true,
    input: FieldInputType.Text,
    fullWidth: false,
  },
  {
    name: EmergencyContactField.Phone,
    label: "Mobile phone",
    required: true,
    input: FieldInputType.Tel,
    fullWidth: false,
  },
] as const;
