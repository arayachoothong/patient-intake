"use client";

export { PatientIntakeForm } from "./components/PatientIntakeForm";
export { CheckInCodeBadge } from "./components/shell/CheckInCodeBadge";
export { PatientShellHeader } from "./components/shell/PatientShellHeader";
export { IntakeFormSection } from "./components/form/IntakeFormSection";
export { SubmitErrorMessage } from "./components/form/SubmitErrorMessage";
export { IntakeFieldList } from "./components/form/IntakeFieldList";
export { IntakeFieldItem } from "./components/form/IntakeFieldItem";
export { IntakeField } from "./components/form/IntakeField";
export { ResumeBanner } from "./components/form/ResumeBanner";
export { EmergencyContactsSection } from "./components/emergency/EmergencyContactsSection";
export { EmergencyContactFieldList } from "./components/emergency/EmergencyContactFieldList";
export { EmergencyContactList } from "./components/emergency/EmergencyContactList";
export { EmergencyContactItem } from "./components/emergency/EmergencyContactItem";
export { EmergencyContactFieldItem } from "./components/emergency/EmergencyContactFieldItem";
export { AddContactButton } from "./components/emergency/AddContactButton";
export { RemoveContactButton } from "./components/emergency/RemoveContactButton";
export { ReviewStep } from "./components/review/ReviewStep";
export { StepProgress } from "./components/step/StepProgress";
export { StepActions } from "./components/step/StepActions";
export { useDebouncedSessionSync } from "./hooks/useDebouncedSessionSync";
export { usePatientSession } from "./hooks/usePatientSession";
export {
  getFormDefaults,
  sessionDataToFormValues,
  toDisplayData,
  toPatchData,
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
} from "./interfaces/patient-form.interface";
export { PATIENT_SESSION_STORAGE_KEY } from "./interfaces/patient-form.interface";
