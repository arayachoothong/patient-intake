"use client";

import { FieldHighlight } from "../live/FieldHighlight";
import { ReadOnlyValueField } from "../live/ReadOnlyValueField";
import {
  type EmergencyContact,
  type EmergencyContactFieldDefinition,
} from "@patient/validation";

type LiveEmergencyContactFieldItemProps = {
  index: number;
  def: EmergencyContactFieldDefinition;
  contact: Partial<EmergencyContact>;
  activeField: string | null;
  isTyping: boolean;
};

export function LiveEmergencyContactFieldItem({
  index,
  def,
  contact,
  activeField,
  isTyping,
}: LiveEmergencyContactFieldItemProps) {
  const path = `emergencyContacts.${index}.${def.name}`;
  const isActive = activeField === path;

  return (
    <FieldHighlight
      active={isActive}
      isTyping={isActive && isTyping}
      className={def.fullWidth ? "sm:col-span-2" : undefined}
    >
      <ReadOnlyValueField label={def.label} value={contact[def.name]} active={isActive} />
    </FieldHighlight>
  );
}
