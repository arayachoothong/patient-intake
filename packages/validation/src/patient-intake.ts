import { z } from "zod";
import { Gender } from "./constants/gender.constant";
import {
  EMERGENCY_CONTACT_FIELD_DEFINITIONS,
  EmergencyContactField,
  MAX_EMERGENCY_CONTACTS,
  MIN_EMERGENCY_CONTACTS,
} from "./constants/emergency-contact-fields.constant";
import { FieldName } from "./constants/field-name.constant";
import { createEmailSchema, createPhoneSchema } from "./contact-rules";
import { fieldDefinition } from "./helpers/patient-fields.helper";
import { requiredMessage } from "./helpers/required-message.helper";

function emergencyLabel(field: EmergencyContactField): string {
  const definition = EMERGENCY_CONTACT_FIELD_DEFINITIONS.find((item) => item.name === field);
  if (!definition) throw new Error(`Unknown emergency field: ${field}`);
  return definition.label;
}

function requiredFieldMessage(name: FieldName): string {
  return requiredMessage(fieldDefinition(name).label);
}

export const emergencyContactsItemSchema = z.object({
  name: z.string().trim().min(1, requiredMessage(emergencyLabel(EmergencyContactField.Name))),
  relation: z
    .string()
    .trim()
    .min(1, requiredMessage(emergencyLabel(EmergencyContactField.Relation))),
  phone: createPhoneSchema(emergencyLabel(EmergencyContactField.Phone)),
});

export const emergencyContactsItemPartialSchema = z.object({
  name: z.string(),
  relation: z.string(),
  phone: z.string(),
});

export const patientIntakeSchema = z.object({
  firstName: z.string().trim().min(1, requiredFieldMessage(FieldName.FirstName)),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(1, requiredFieldMessage(FieldName.LastName)),
  dateOfBirth: z
    .string()
    .trim()
    .min(1, requiredFieldMessage(FieldName.DateOfBirth))
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD")
    .refine((d) => {
      const date = new Date(d);
      if (Number.isNaN(date.getTime())) return false;
      const year = date.getUTCFullYear();
      return year >= 1900 && year <= new Date().getUTCFullYear();
    }, "Invalid date of birth"),
  gender: z.nativeEnum(Gender, {
    errorMap: () => ({ message: requiredFieldMessage(FieldName.Gender) }),
  }),
  phoneNumber: createPhoneSchema(fieldDefinition(FieldName.PhoneNumber).label),
  email: createEmailSchema(fieldDefinition(FieldName.Email).label),
  address: z.string().trim().min(1, requiredFieldMessage(FieldName.Address)),
  preferredLanguage: z.string().trim().min(1, requiredFieldMessage(FieldName.PreferredLanguage)),
  nationality: z.string().trim().min(1, requiredFieldMessage(FieldName.Nationality)),
  religion: z.string().trim().optional(),
  emergencyContacts: z
    .array(emergencyContactsItemSchema)
    .min(MIN_EMERGENCY_CONTACTS)
    .max(MAX_EMERGENCY_CONTACTS),
});

export const patientIntakePartialSchema = patientIntakeSchema
  .omit({ emergencyContacts: true })
  .partial()
  .extend({
    emergencyContacts: z
      .array(emergencyContactsItemPartialSchema)
      .max(MAX_EMERGENCY_CONTACTS)
      .optional(),
  });

export type EmergencyContact = z.infer<typeof emergencyContactsItemSchema>;
export type PatientIntake = z.infer<typeof patientIntakeSchema>;
export type PatientIntakePartial = z.infer<typeof patientIntakePartialSchema>;
