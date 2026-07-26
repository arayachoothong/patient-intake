import { z } from "zod";
import { Gender } from "./constants/gender.constant";
import {
  MAX_EMERGENCY_CONTACTS,
  MIN_EMERGENCY_CONTACTS,
} from "./constants/emergency-contact-fields.constant";
import { emailSchema, phoneSchema } from "./contact-rules";

export const emergencyContactsItemSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  relation: z.string().trim().min(1, "Required"),
  phone: phoneSchema,
});

export const emergencyContactsItemPartialSchema = z.object({
  name: z.string(),
  relation: z.string(),
  phone: z.string(),
});

export const patientIntakeSchema = z.object({
  firstName: z.string().trim().min(1, "Required"),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(1, "Required"),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD")
    .refine((d) => {
      const date = new Date(d);
      if (Number.isNaN(date.getTime())) return false;
      const year = date.getUTCFullYear();
      return year >= 1900 && year <= new Date().getUTCFullYear();
    }, "Invalid date of birth"),
  gender: z.nativeEnum(Gender),
  phoneNumber: phoneSchema,
  email: emailSchema,
  address: z.string().trim().min(1, "Required"),
  preferredLanguage: z.string().trim().min(1, "Required"),
  nationality: z.string().trim().min(1, "Required"),
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
