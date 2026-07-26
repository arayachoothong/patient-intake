"use client";

import { Card, CardContent, CardHeader, CardTitle, FieldGrid } from "@patient/ui";
import { EMERGENCY_CONTACT_FIELD_DEFINITIONS } from "@patient/validation";
import { EmergencyContactFieldItem } from "./EmergencyContactFieldItem";
import { RemoveContactButton } from "./RemoveContactButton";

type EmergencyContactFieldListProps = {
  index: number;
  disabled?: boolean;
  canRemove: boolean;
  onRemove: () => void;
  onFocusField: (name: string) => void;
  onBlurField: () => void;
};

export function EmergencyContactFieldList({
  index,
  disabled,
  canRemove,
  onRemove,
  onFocusField,
  onBlurField,
}: EmergencyContactFieldListProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <CardTitle>Contact {index + 1}</CardTitle>
        <RemoveContactButton disabled={disabled || !canRemove} onClick={onRemove} />
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
