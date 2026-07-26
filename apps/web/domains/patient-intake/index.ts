"use client";

export { PatientIntakeForm } from "./components/PatientIntakeForm";
export { FormSection } from "./components/FormSection";
export { FormBootstrapState } from "./components/FormBootstrapState";
export { FormProgressHeader } from "./components/FormProgressHeader";
export { SubmittedNotice } from "./components/SubmittedNotice";
export { SubmitErrorMessage } from "./components/SubmitErrorMessage";
export { SubmitBar } from "./components/SubmitBar";
export { PersonalInformationSection } from "./components/PersonalInformationSection";
export { ContactInformationSection } from "./components/ContactInformationSection";
export { PreferencesSection } from "./components/PreferencesSection";
export { EmergencyContactsSection } from "./components/EmergencyContactsSection";
export { EmergencyContactFields } from "./components/EmergencyContactFields";
export { AddContactButton } from "./components/AddContactButton";
export { RemoveContactButton } from "./components/RemoveContactButton";
export { IntakeField } from "./components/IntakeField";
export { TextInputField } from "./components/TextInputField";
export { TextareaField } from "./components/TextareaField";
export { SelectField } from "./components/SelectField";
export { useDebouncedSessionSync } from "./hooks/useDebouncedSessionSync";
export { usePatientSession } from "./hooks/usePatientSession";
export {
  getFormDefaults,
  sessionDataToFormValues,
  toPatchData,
  toProgressData,
} from "./helpers/form-defaults.helper";
export {
  FORM_SECTION_ORDER,
  FORM_SECTION_TITLES,
  genderOptionLabel,
  getFieldError,
} from "./helpers/active-field.helper";
export type {
  EmergencyContactFormValue,
  PatientFormValues,
  SessionPatchBody,
} from "./interfaces/patient-form.interface";
export { PATIENT_SESSION_STORAGE_KEY } from "./interfaces/patient-form.interface";
