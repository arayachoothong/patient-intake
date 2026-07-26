"use client";

import { Button } from "@patient/ui";

type AddContactButtonProps = {
  disabled?: boolean;
  onClick: () => void;
};

export function AddContactButton({ disabled, onClick }: AddContactButtonProps) {
  return (
    <Button type="button" variant="outline" disabled={disabled} onClick={onClick}>
      Add emergency contact
    </Button>
  );
}
