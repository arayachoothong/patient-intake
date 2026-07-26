import {
  Gender,
  patientIntakePartialSchema,
  type PatientIntake,
  type PatientIntakePartial,
} from "@patient/validation";
import type {
  EmergencyContactFormValue,
  PatientFormValues,
} from "../interfaces/patient-form.interface";

const EMPTY_EMERGENCY_CONTACT: EmergencyContactFormValue = {
  name: "",
  relation: "",
  phone: "",
};

export function getFormDefaults(): PatientFormValues {
  return {
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    email: "",
    address: "",
    preferredLanguage: "",
    nationality: "",
    religion: "",
    emergencyContacts: [{ ...EMPTY_EMERGENCY_CONTACT }],
  };
}

function toEmergencyContactFormValues(
  contacts: PatientIntake["emergencyContacts"] | undefined,
): EmergencyContactFormValue[] {
  if (!contacts || contacts.length === 0) {
    return [{ ...EMPTY_EMERGENCY_CONTACT }];
  }
  return contacts.map((contact) => ({
    name: contact.name ?? "",
    relation: contact.relation ?? "",
    phone: contact.phone ?? "",
  }));
}

export function sessionDataToFormValues(data: Partial<PatientIntake>): PatientFormValues {
  const defaults = getFormDefaults();
  return {
    ...defaults,
    firstName: data.firstName ?? "",
    middleName: data.middleName ?? "",
    lastName: data.lastName ?? "",
    dateOfBirth: data.dateOfBirth ?? "",
    gender: data.gender ?? "",
    phoneNumber: data.phoneNumber ?? "",
    email: data.email ?? "",
    address: data.address ?? "",
    preferredLanguage: data.preferredLanguage ?? "",
    nationality: data.nationality ?? "",
    religion: data.religion ?? "",
    emergencyContacts: toEmergencyContactFormValues(data.emergencyContacts),
  };
}

/** Form values as session-shaped data for read-only display (drops the empty gender placeholder). */
export function toDisplayData(values: PatientFormValues): Partial<PatientIntake> {
  const { gender, ...rest } = values;
  return gender === "" ? rest : { ...rest, gender };
}

export function toPatchData(values: PatientFormValues): PatientIntakePartial {
  const candidate: Record<string, unknown> = {
    firstName: values.firstName,
    middleName: values.middleName,
    lastName: values.lastName,
    dateOfBirth: values.dateOfBirth,
    phoneNumber: values.phoneNumber,
    email: values.email,
    address: values.address,
    preferredLanguage: values.preferredLanguage,
    nationality: values.nationality,
    religion: values.religion,
  };

  if (values.gender !== "" && Object.values(Gender).includes(values.gender)) {
    candidate.gender = values.gender;
  }

  const data: PatientIntakePartial = {};

  for (const [key, value] of Object.entries(candidate)) {
    const parsed = patientIntakePartialSchema.safeParse({ [key]: value });
    if (parsed.success) {
      Object.assign(data, parsed.data);
    }
  }

  data.emergencyContacts = values.emergencyContacts.map((contact) => ({
    name: contact.name,
    relation: contact.relation,
    phone: contact.phone,
  }));

  return data;
}
