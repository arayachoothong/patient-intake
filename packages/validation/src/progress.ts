import type { PatientIntake } from "./patient-intake";
import { REQUIRED_PROGRESS_FIELDS } from "./constants/patient-fields.constant";

function contactFilled(
  contact: { name?: string; relation?: string; phone?: string } | undefined,
): number {
  if (!contact) return 0;
  let n = 0;
  if (contact.name?.trim()) n += 1;
  if (contact.relation?.trim()) n += 1;
  if (contact.phone?.trim()) n += 1;
  return n;
}

export function computeProgress(data: Partial<PatientIntake>): number {
  const baseFilled = REQUIRED_PROGRESS_FIELDS.filter((key) => {
    const value = data[key];
    return typeof value === "string" && value.trim().length > 0;
  }).length;
  const contacts =
    data.emergencyContacts && data.emergencyContacts.length > 0
      ? data.emergencyContacts
      : [{ name: "", relation: "", phone: "" }];
  const contactSlots = Math.max(contacts.length, 0) * 3;
  const contactFilledCount = contacts.reduce((sum, c) => sum + contactFilled(c), 0);
  const total = REQUIRED_PROGRESS_FIELDS.length + contactSlots;
  if (total === 0) return 0;
  return Math.round(((baseFilled + contactFilledCount) / total) * 100);
}
