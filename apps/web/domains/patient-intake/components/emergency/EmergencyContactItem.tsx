"use client";

import { EmergencyContactFieldList } from "./EmergencyContactFieldList";
import { RemoveContactButton } from "./RemoveContactButton";

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
    <div className="space-y-2">
      <EmergencyContactFieldList
        index={index}
        disabled={disabled}
        onFocusField={onFocusField}
        onBlurField={onBlurField}
      />
      <RemoveContactButton disabled={disabled || !canRemove} onClick={onRemove} />
    </div>
  );
}
