"use client";

import { type FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FieldPath, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Form, QueryLoadingSkeleton } from "@patient/ui";
import {
  formSectionForStep,
  FormSection,
  intakeStepSchema,
  IntakeStep,
  patientIntakeSchema,
  resolveResumeStep,
  type PatientIntake,
} from "@patient/validation";
import { useSubmitSession } from "@/domains/session/client";
import { getFormDefaults, toPatchData } from "../helpers/form-defaults.helper";
import {
  shouldRedirectSubmittedSession,
  shouldShowResumeBanner,
  shouldSubmitOnFormEvent,
} from "../helpers/step-navigation.helper";
import {
  SESSION_NOT_FOUND_STATUS,
  submitErrorMessage,
  submitErrorStatus,
} from "../helpers/submit-error.helper";
import { useDebouncedSessionSync } from "../hooks/useDebouncedSessionSync";
import { useIntakeSteps } from "../hooks/useIntakeSteps";
import { usePatientSession } from "../hooks/usePatientSession";
import { type PatientFormValues } from "../interfaces/patient-form.interface";
import { EmergencyContactsSection } from "./emergency/EmergencyContactsSection";
import { IntakeFieldList } from "./form/IntakeFieldList";
import { ResumeBanner } from "./form/ResumeBanner";
import { ReviewStep } from "./review/ReviewStep";
import { StepActions } from "./step/StepActions";
import { StepProgress } from "./step/StepProgress";
import { SubmitErrorMessage } from "./form/SubmitErrorMessage";

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

  const steps = useIntakeSteps();
  const stepRef = useRef(steps.step);
  stepRef.current = steps.step;

  useDebouncedSessionSync({
    sessionId,
    data: toPatchData(values),
    currentStep: steps.step,
    activeField,
    enabled: Boolean(sessionId) && !submitted && !bootstrapping,
  });

  const onFocusField = useCallback((name: string) => {
    setActiveField(name);
  }, []);

  const onBlurField = useCallback(() => {
    setActiveField(null);
  }, []);

  const submitIntake = form.handleSubmit((raw) => {
    if (stepRef.current !== IntakeStep.Review) return;
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

  useEffect(() => {
    if (shouldRedirectSubmittedSession(bootstrapping, submitted)) {
      router.replace("/success");
    }
  }, [bootstrapping, router, submitted]);

  useEffect(() => {
    if (bootstrapping || submitted || resumeAppliedRef.current) return;
    if (!shouldShowResumeBanner(resumed)) {
      resumeAppliedRef.current = true;
      return;
    }

    resumeAppliedRef.current = true;
    steps.goTo(resolveResumeStep(form.getValues()));
    setShowResumeBanner(true);
  }, [bootstrapping, form, resumed, steps, submitted]);

  const handleContinue = useCallback(() => {
    if (steps.step === IntakeStep.Review) return;

    const result = intakeStepSchema(steps.step).safeParse(form.getValues());
    if (!result.success) {
      for (const issue of result.error.issues) {
        const path = issue.path.join(".") as FieldPath<PatientFormValues>;
        if (path) form.setError(path, { type: "manual", message: issue.message });
      }
      return;
    }

    form.clearErrors();
    steps.goNext();
  }, [form, steps]);

  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (shouldSubmitOnFormEvent(steps.step)) {
        void submitIntake();
        return;
      }

      handleContinue();
    },
    [handleContinue, steps.step, submitIntake],
  );

  if (bootstrapping || submitted) {
    return (
      <div role="status" aria-label="Preparing your intake form">
        <QueryLoadingSkeleton rows={5} />
      </div>
    );
  }

  const disabled = isSubmitting;
  const errorMessage = submitError ?? bootstrapError;
  const section = formSectionForStep(steps.step);
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

        {section === FormSection.Emergency ? <EmergencyContactsSection {...sectionProps} /> : null}
        {section && section !== FormSection.Emergency ? (
          <IntakeFieldList section={section} {...sectionProps} />
        ) : null}
        {steps.step === IntakeStep.Review ? <ReviewStep values={values} goTo={steps.goTo} /> : null}

        <SubmitErrorMessage message={errorMessage} />
        <StepActions
          isFirst={steps.isFirst}
          isReview={steps.step === IntakeStep.Review}
          disabled={!sessionId || disabled}
          isSubmitting={isSubmitting}
          onBack={steps.goBack}
          onContinue={handleContinue}
          onSubmit={submitIntake}
        />
      </form>
    </Form>
  );
}
