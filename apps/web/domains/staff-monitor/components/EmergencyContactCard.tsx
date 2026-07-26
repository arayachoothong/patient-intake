"use client";

import { Card, CardContent, CardHeader, CardTitle, FieldGrid } from "@patient/ui";
import { EMERGENCY_CONTACT_FIELD_LABELS } from "@patient/validation";
import { FieldHighlight } from "./FieldHighlight";
import { ReadOnlyValueField } from "./ReadOnlyValueField";

type EmergencyContactValues = {
  name?: string;
  relation?: string;
  phone?: string;
};

type EmergencyContactCardProps = {
  index: number;
  contact: EmergencyContactValues;
  activeField: string | null;
  isTyping: boolean;
};

type ContactSubfield = keyof typeof EMERGENCY_CONTACT_FIELD_LABELS;

function subfieldPath(index: number, key: ContactSubfield): string {
  return `emergencyContacts.${index}.${key}`;
}

export function EmergencyContactCard({
  index,
  contact,
  activeField,
  isTyping,
}: EmergencyContactCardProps) {
  const subfields: ContactSubfield[] = ["name", "relation", "phone"];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact {index + 1}</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldGrid>
          {subfields.map((key) => {
            const path = subfieldPath(index, key);
            const isActive = activeField === path;
            return (
              <FieldHighlight
                key={path}
                active={isActive}
                isTyping={isActive && isTyping}
                className={key === "name" ? "sm:col-span-2" : undefined}
              >
                <ReadOnlyValueField
                  label={EMERGENCY_CONTACT_FIELD_LABELS[key]}
                  value={contact[key]}
                  active={isActive}
                />
              </FieldHighlight>
            );
          })}
        </FieldGrid>
      </CardContent>
    </Card>
  );
}
