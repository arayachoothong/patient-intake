"use client";

import { EmergencyContactFieldList } from "./EmergencyContactFieldList";

type EmergencyContactItemProps = {
  index: number;
  disabled?: boolean;
  canRemove: boolean;
  onRemove: () => void;
  onFocusField: (name: string) => void;
  onBlurField: () => void;
};

export function EmergencyContactItem({
  index,
  disabled,
  canRemove,
  onRemove,
  onFocusField,
  onBlurField,
}: EmergencyContactItemProps) {
  return (
    <EmergencyContactFieldList
      index={index}
      disabled={disabled}
      canRemove={canRemove}
      onRemove={onRemove}
      onFocusField={onFocusField}
      onBlurField={onBlurField}
    />
  );
}
