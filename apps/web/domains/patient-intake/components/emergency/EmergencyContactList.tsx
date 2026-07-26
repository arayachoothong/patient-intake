"use client";

import { EmergencyContactItem } from "./EmergencyContactItem";

type EmergencyContactListProps = {
  fieldIds: string[];
  disabled?: boolean;
  onFocusField: (name: string) => void;
  onBlurField: () => void;
  onRemove: (index: number) => void;
};

export function EmergencyContactList({
  fieldIds,
  disabled,
  onFocusField,
  onBlurField,
  onRemove,
}: EmergencyContactListProps) {
  return (
    <>
      {fieldIds.map((fieldId, index) => (
        <EmergencyContactItem
          key={fieldId}
          index={index}
          disabled={disabled}
          canRemove={fieldIds.length > 1}
          onRemove={() => onRemove(index)}
          onFocusField={onFocusField}
          onBlurField={onBlurField}
        />
      ))}
    </>
  );
}
