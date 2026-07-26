"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  QueryEmptyState,
  Separator,
} from "@patient/ui";
import { FORM_SECTION_TITLES, FormSection, type PatientIntake } from "@patient/validation";
import { EmergencyContactCard } from "./EmergencyContactCard";

type EmergencyContactsListProps = {
  data: Partial<PatientIntake>;
  activeField: string | null;
  isTyping: boolean;
};

export function EmergencyContactsList({ data, activeField, isTyping }: EmergencyContactsListProps) {
  const contacts = data.emergencyContacts ?? [];

  return (
    <Card aria-labelledby="live-section-emergency">
      <CardHeader className="gap-3">
        <CardTitle
          id="live-section-emergency"
          className="font-display text-lg font-semibold text-slate-900"
        >
          {FORM_SECTION_TITLES[FormSection.Emergency]}
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="space-y-4">
        {contacts.length === 0 ? (
          <QueryEmptyState
            className="py-8 md:py-10"
            title="No contacts yet"
            description="Emergency contacts will appear here as the patient fills them in."
          />
        ) : (
          contacts.map((contact, index) => (
            <EmergencyContactCard
              key={index}
              index={index}
              contact={contact}
              activeField={activeField}
              isTyping={isTyping}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}
