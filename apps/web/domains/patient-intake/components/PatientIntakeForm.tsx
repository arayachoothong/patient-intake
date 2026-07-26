"use client";

import { type FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FieldPath, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Form } from "@patient/ui";
import {
  intakeStepSchema,
  IntakeStep,
  patientIntakeSchema,
  resolveResumeStep,
  type PatientIntake,
} from "@patient/validation";
import { useSubmitSession } from "@/domains/session/client";
import { getFormDefaults, toPatchData } from "../helpers/form-defaults.helper";
import { shouldShowResumeBanner, shouldSubmitOnFormEvent } from "../helpers/step-navigation.helper";
import {
  SESSION_NOT_FOUND_STATUS,
  submitErrorMessage,
  submitErrorStatus,
} from "../helpers/submit-error.helper";
import { useDebouncedSessionSync } from "../hooks/useDebouncedSessionSync";
import { useIntakeSteps } from "../hooks/useIntakeSteps";
import { usePatientSession } from "../hooks/usePatientSession";
import { type PatientFormValues } from "../interfaces/patient-form.interface";
import { ContactInformationSection } from "./ContactInformationSection";
import { EmergencyContactsSection } from "./EmergencyContactsSection";
import { FormBootstrapState } from "./FormBootstrapState";
import { PersonalInformationSection } from "./PersonalInformationSection";
import { PreferencesSection } from "./PreferencesSection";
import { ResumeBanner } from "./ResumeBanner";
import { ReviewStep } from "./ReviewStep";
import { StepActions } from "./StepActions";
import { StepProgress } from "./StepProgress";
import { SubmitErrorMessage } from "./SubmitErrorMessage";

export function PatientIntakeForm() {
  const router = useRouter();
  const [activeField, setActiveField] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showResumeBanner, setShowResumeBanner] = useState(false);
  const resumeAppliedRef = useRef(false);

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientIntakeSchema),
    defaultValues: getFormDefaults(),
    mode: "onSubmit",
  });

  const {
    sessionId,
    bootstrapping,
    resumed,
    submitted,
    setSubmitted,
    bootstrapError,
    recreateSession,
  } = usePatientSession({
    reset: form.reset,
  });

  const values = form.watch();
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
      router.replace("/success");
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

  const steps = useIntakeSteps({
    onSubmitReview: () => onSubmit(),
  });

  useEffect(() => {
    if (bootstrapping || resumeAppliedRef.current) return;
    resumeAppliedRef.current = true;
    if (!shouldShowResumeBanner(resumed)) return;

    steps.goTo(resolveResumeStep(form.getValues()));
    setShowResumeBanner(true);
  }, [bootstrapping, form, resumed, steps]);

  const handleContinue = useCallback(async () => {
    if (steps.isLast) {
      await steps.goNext();
      return;
    }

    const result = intakeStepSchema(steps.step).safeParse(form.getValues());
    if (!result.success) {
      for (const issue of result.error.issues) {
        const path = issue.path.join(".") as FieldPath<PatientFormValues>;
        if (path) form.setError(path, { type: "manual", message: issue.message });
      }
      return;
    }

    form.clearErrors();
    await steps.goNext();
  }, [form, steps]);

  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      if (shouldSubmitOnFormEvent(steps.step)) {
        void onSubmit(event);
        return;
      }

      event.preventDefault();
      void handleContinue();
    },
    [handleContinue, onSubmit, steps.step],
  );

  if (bootstrapping) {
    return <FormBootstrapState />;
  }

  const disabled = submitted || isSubmitting;
  const errorMessage = submitError ?? bootstrapError;
  const sectionProps = {
    disabled,
    onFocusField,
    onBlurField,
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={handleFormSubmit} noValidate>
        <StepProgress step={steps.step} index={steps.index} total={steps.total} />
        {showResumeBanner ? <ResumeBanner /> : null}

        {steps.step === IntakeStep.Personal ? (
          <PersonalInformationSection {...sectionProps} />
        ) : null}
        {steps.step === IntakeStep.Contact ? <ContactInformationSection {...sectionProps} /> : null}
        {steps.step === IntakeStep.Preferences ? <PreferencesSection {...sectionProps} /> : null}
        {steps.step === IntakeStep.Emergency ? (
          <EmergencyContactsSection {...sectionProps} />
        ) : null}
        {steps.step === IntakeStep.Review ? <ReviewStep values={values} goTo={steps.goTo} /> : null}

        <SubmitErrorMessage message={errorMessage} />
        <StepActions
          isFirst={steps.isFirst}
          isReview={steps.isLast}
          disabled={!sessionId || disabled}
          isSubmitting={isSubmitting}
          onBack={steps.goBack}
          onContinue={handleContinue}
        />
      </form>
    </Form>
  );
}
