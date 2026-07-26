"use client";

import { FieldGrid } from "@patient/ui";
import {
  EMERGENCY_CONTACT_FIELD_DEFINITIONS,
  type EmergencyContact,
} from "@patient/validation";
import { LiveEmergencyContactFieldItem } from "./LiveEmergencyContactFieldItem";

type LiveEmergencyContactFieldListProps = {
  index: number;
  contact: Partial<EmergencyContact>;
  activeField: string | null;
  isTyping: boolean;
};

export function LiveEmergencyContactFieldList({
  index,
  contact,
  activeField,
  isTyping,
}: LiveEmergencyContactFieldListProps) {
  return (
    <FieldGrid>
      {EMERGENCY_CONTACT_FIELD_DEFINITIONS.map((def) => (
        <LiveEmergencyContactFieldItem
          key={def.name}
          index={index}
          def={def}
          contact={contact}
          activeField={activeField}
          isTyping={isTyping}
        />
      ))}
    </FieldGrid>
  );
}
