"use client";

import React, { type ReactNode } from "react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@patient/ui";
import { formatGenderLabel, formatLanguageLabel, IntakeStep } from "@patient/validation";
import type { PatientFormValues } from "../interfaces/patient-form.interface";

type ReviewStepProps = {
  values: PatientFormValues;
  goTo: (step: IntakeStep) => void;
};

type ReviewGroupProps = {
  title: string;
  step: IntakeStep;
  goTo: (step: IntakeStep) => void;
  children: ReactNode;
};

function ReviewGroup({ title, step, goTo, children }: ReviewGroupProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          aria-label={`Edit ${title}`}
          onClick={() => goTo(step)}
        >
          Edit
        </Button>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function ReviewValue({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted-foreground text-xs font-medium uppercase tracking-wide">{label}</dt>
      <dd className="text-foreground mt-1 text-sm">{value || "—"}</dd>
    </div>
  );
}

export function ReviewStep({ values, goTo }: ReviewStepProps) {
  const fullName = [values.firstName, values.middleName, values.lastName].filter(Boolean).join(" ");

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-foreground text-xl font-semibold">Review your information</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Confirm these details before submitting your intake.
        </p>
      </div>

      <ReviewGroup title="Personal information" step={IntakeStep.Personal} goTo={goTo}>
        <dl className="grid gap-4 sm:grid-cols-2">
          <ReviewValue label="Name" value={fullName} />
          <ReviewValue label="Date of birth" value={values.dateOfBirth} />
          <ReviewValue label="Gender" value={formatGenderLabel(values.gender)} />
        </dl>
      </ReviewGroup>

      <ReviewGroup title="Contact" step={IntakeStep.Contact} goTo={goTo}>
        <dl className="grid gap-4 sm:grid-cols-2">
          <ReviewValue label="Phone number" value={values.phoneNumber} />
          <ReviewValue label="Email" value={values.email} />
          <div className="sm:col-span-2">
            <ReviewValue label="Address" value={values.address} />
          </div>
        </dl>
      </ReviewGroup>

      <ReviewGroup title="Preferences" step={IntakeStep.Preferences} goTo={goTo}>
        <dl className="grid gap-4 sm:grid-cols-3">
          <ReviewValue
            label="Preferred language"
            value={formatLanguageLabel(values.preferredLanguage)}
          />
          <ReviewValue label="Nationality" value={values.nationality} />
          <ReviewValue label="Religion" value={values.religion} />
        </dl>
      </ReviewGroup>

      <ReviewGroup title="Emergency contacts" step={IntakeStep.Emergency} goTo={goTo}>
        <div className="space-y-4">
          {values.emergencyContacts.map((contact, index) => (
            <dl key={index} className="grid gap-4 sm:grid-cols-3">
              <ReviewValue label={`Contact ${index + 1}`} value={contact.name} />
              <ReviewValue label="Relation" value={contact.relation} />
              <ReviewValue label="Phone number" value={contact.phone} />
            </dl>
          ))}
        </div>
      </ReviewGroup>
    </div>
  );
}
