import type { Gender, PatientIntakePartial } from "@patient/validation";

export type EmergencyContactFormValue = {
  name: string;
  relation: string;
  phone: string;
};

export type PatientFormValues = {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender | "";
  phoneNumber: string;
  email: string;
  address: string;
  preferredLanguage: string;
  nationality: string;
  religion: string;
  emergencyContacts: EmergencyContactFormValue[];
};

export type SessionPatchBody = {
  data?: PatientIntakePartial;
  activeField?: string | null;
  isTyping?: boolean;
};

export const PATIENT_SESSION_STORAGE_KEY = "patient-intake:sessionId";
