export enum FormSection {
  Personal = "personal",
  Contact = "contact",
  Preferences = "preferences",
  Emergency = "emergency",
}

export const FORM_SECTION_ORDER = [
  FormSection.Personal,
  FormSection.Contact,
  FormSection.Preferences,
  FormSection.Emergency,
] as const;

export const FORM_SECTION_TITLES: Record<FormSection, string> = {
  [FormSection.Personal]: "Personal information",
  [FormSection.Contact]: "Contact",
  [FormSection.Preferences]: "Preferences",
  [FormSection.Emergency]: "Emergency contacts",
};
