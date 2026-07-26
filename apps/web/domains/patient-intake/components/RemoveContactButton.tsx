"use client";

import { Button } from "@patient/ui";

type RemoveContactButtonProps = {
  disabled?: boolean;
  onClick: () => void;
};

export function RemoveContactButton({ disabled, onClick }: RemoveContactButtonProps) {
  return (
    <Button type="button" variant="ghost" size="sm" disabled={disabled} onClick={onClick}>
      Remove
    </Button>
  );
}
