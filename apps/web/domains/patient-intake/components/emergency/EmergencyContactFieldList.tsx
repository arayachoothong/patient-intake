"use client";

import { Card, CardContent, CardHeader, CardTitle, FieldGrid } from "@patient/ui";
import { EMERGENCY_CONTACT_FIELD_DEFINITIONS } from "@patient/validation";
import { EmergencyContactFieldItem } from "./EmergencyContactFieldItem";

type EmergencyContactFieldListProps = {
  index: number;
  disabled?: boolean;
  onFocusField: (name: string) => void;
  onBlurField: () => void;
};

export function EmergencyContactFieldList({
  index,
  disabled,
  onFocusField,
  onBlurField,
}: EmergencyContactFieldListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact {index + 1}</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldGrid>
          {EMERGENCY_CONTACT_FIELD_DEFINITIONS.map((def) => (
            <EmergencyContactFieldItem
              key={def.name}
              index={index}
              def={def}
              disabled={disabled}
              onFocusField={onFocusField}
              onBlurField={onBlurField}
            />
          ))}
        </FieldGrid>
      </CardContent>
    </Card>
  );
}
