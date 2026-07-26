"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@patient/ui";
import type { EmergencyContact } from "@patient/validation";
import { LiveEmergencyContactFieldList } from "./LiveEmergencyContactFieldList";

type EmergencyContactCardProps = {
  index: number;
  contact: Partial<EmergencyContact>;
  activeField: string | null;
  isTyping: boolean;
};

export function EmergencyContactCard({
  index,
  contact,
  activeField,
  isTyping,
}: EmergencyContactCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact {index + 1}</CardTitle>
      </CardHeader>
      <CardContent>
        <LiveEmergencyContactFieldList
          index={index}
          contact={contact}
          activeField={activeField}
          isTyping={isTyping}
        />
      </CardContent>
    </Card>
  );
}
