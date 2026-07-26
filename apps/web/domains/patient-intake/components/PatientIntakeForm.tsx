"use client";

import { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@patient/ui";
import { computeProgress, patientIntakeSchema, type PatientIntake } from "@patient/validation";
import { useSubmitSession } from "@/domains/session/client";
import { getFormDefaults, toPatchData, toProgressData } from "../helpers/form-defaults.helper";
import {
  SESSION_NOT_FOUND_STATUS,
  submitErrorMessage,
  submitErrorStatus,
} from "../helpers/submit-error.helper";
import { useDebouncedSessionSync } from "../hooks/useDebouncedSessionSync";
import { usePatientSession } from "../hooks/usePatientSession";
import type { PatientFormValues } from "../interfaces/patient-form.interface";
import { ContactInformationSection } from "./ContactInformationSection";
import { EmergencyContactsSection } from "./EmergencyContactsSection";
import { FormBootstrapState } from "./FormBootstrapState";
import { FormProgressHeader } from "./FormProgressHeader";
import { PersonalInformationSection } from "./PersonalInformationSection";
import { PreferencesSection } from "./PreferencesSection";
import { SubmitBar } from "./SubmitBar";
import { SubmitErrorMessage } from "./SubmitErrorMessage";
import { SubmittedNotice } from "./SubmittedNotice";

export function PatientIntakeForm() {
  const [activeField, setActiveField] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientIntakeSchema),
    defaultValues: getFormDefaults(),
    mode: "onSubmit",
  });

  const { sessionId, bootstrapping, submitted, setSubmitted, bootstrapError, recreateSession } =
    usePatientSession({
      reset: form.reset,
    });

  const values = form.watch();
  const progress = computeProgress(toProgressData(values));
  const submitMutation = useSubmitSession();
  const isSubmitting = form.formState.isSubmitting || submitMutation.isPending;

  useDebouncedSessionSync({
    sessionId,
    data: toPatchData(values),
    activeField,
    enabled: Boolean(sessionId) && !submitted && !bootstrapping,
  });

  const onFocusField = useCallback((name: string) => {
    setActiveField(name);
  }, []);

  const onBlurField = useCallback(() => {
    setActiveField(null);
  }, []);

  const onSubmit = form.handleSubmit((raw) => {
    if (!sessionId || submitted) return;
    setSubmitError(null);

    const data = raw as PatientIntake;
    const finish = () => {
      setSubmitted(true);
      setActiveField(null);
    };

    submitMutation.mutate(
      { id: sessionId, data },
      {
        onSuccess: finish,
        onError: (error) => {
          if (submitErrorStatus(error) !== SESSION_NOT_FOUND_STATUS) {
            setSubmitError(submitErrorMessage(error));
            return;
          }

          // Session vanished server-side (in-memory store restart) — new id, then resubmit.
          void recreateSession().then(
            (freshId) => {
              submitMutation.mutate(
                { id: freshId, data },
                {
                  onSuccess: finish,
                  onError: (retryError) => setSubmitError(submitErrorMessage(retryError)),
                },
              );
            },
            (createError) => setSubmitError(submitErrorMessage(createError)),
          );
        },
      },
    );
  });

  if (bootstrapping) {
    return <FormBootstrapState />;
  }

  const disabled = submitted || isSubmitting;
  const errorMessage = submitError ?? bootstrapError;

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={onSubmit} noValidate>
        <FormProgressHeader progress={progress} />
        <SubmittedNotice visible={submitted} />
        <PersonalInformationSection
          disabled={disabled}
          onFocusField={onFocusField}
          onBlurField={onBlurField}
        />
        <ContactInformationSection
          disabled={disabled}
          onFocusField={onFocusField}
          onBlurField={onBlurField}
        />
        <PreferencesSection
          disabled={disabled}
          onFocusField={onFocusField}
          onBlurField={onBlurField}
        />
        <EmergencyContactsSection
          disabled={disabled}
          onFocusField={onFocusField}
          onBlurField={onBlurField}
        />
        <SubmitErrorMessage message={errorMessage} />
        <SubmitBar
          submitted={submitted}
          isSubmitting={isSubmitting}
          disabled={!sessionId || submitted}
        />
      </form>
    </Form>
  );
}
