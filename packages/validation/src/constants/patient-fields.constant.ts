import { FieldInputType } from "./field-input-type.constant";
import { FieldName } from "./field-name.constant";
import { FormSection } from "./form-section.constant";

export type FieldDefinition = {
  name: FieldName;
  label: string;
  required: boolean;
  section: FormSection;
  input: FieldInputType;
};

export const FIELD_DEFINITIONS: readonly FieldDefinition[] = [
  {
    name: FieldName.FirstName,
    label: "First name",
    required: true,
    section: FormSection.Personal,
    input: FieldInputType.Text,
  },
  {
    name: FieldName.MiddleName,
    label: "Middle name",
    required: false,
    section: FormSection.Personal,
    input: FieldInputType.Text,
  },
  {
    name: FieldName.LastName,
    label: "Last name",
    required: true,
    section: FormSection.Personal,
    input: FieldInputType.Text,
  },
  {
    name: FieldName.DateOfBirth,
    label: "Date of birth",
    required: true,
    section: FormSection.Personal,
    input: FieldInputType.Date,
  },
  {
    name: FieldName.Gender,
    label: "Gender",
    required: true,
    section: FormSection.Personal,
    input: FieldInputType.Select,
  },
  {
    name: FieldName.PhoneNumber,
    label: "Phone number",
    required: true,
    section: FormSection.Contact,
    input: FieldInputType.Tel,
  },
  {
    name: FieldName.Email,
    label: "Email",
    required: true,
    section: FormSection.Contact,
    input: FieldInputType.Email,
  },
  {
    name: FieldName.Address,
    label: "Address",
    required: true,
    section: FormSection.Contact,
    input: FieldInputType.Textarea,
  },
  {
    name: FieldName.PreferredLanguage,
    label: "Preferred language",
    required: true,
    section: FormSection.Preferences,
    input: FieldInputType.Select,
  },
  {
    name: FieldName.Nationality,
    label: "Nationality",
    required: true,
    section: FormSection.Preferences,
    input: FieldInputType.Text,
  },
  {
    name: FieldName.Religion,
    label: "Religion",
    required: false,
    section: FormSection.Preferences,
    input: FieldInputType.Text,
  },
] as const;

/** Fields shown on the patient-facing check-in receipt, in display order. */
export const RECEIPT_SUMMARY_FIELDS = [
  FieldName.FirstName,
  FieldName.LastName,
  FieldName.DateOfBirth,
  FieldName.Gender,
  FieldName.PhoneNumber,
  FieldName.PreferredLanguage,
] as const;

export const REQUIRED_PROGRESS_FIELDS = [
  FieldName.FirstName,
  FieldName.LastName,
  FieldName.DateOfBirth,
  FieldName.Gender,
  FieldName.PhoneNumber,
  FieldName.Email,
  FieldName.Address,
  FieldName.PreferredLanguage,
  FieldName.Nationality,
] as const;
