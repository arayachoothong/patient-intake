"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkInCode, SessionStatus } from "@patient/validation";
import { Skeleton } from "@patient/ui";
import { useSession } from "@/domains/session/client";
import { shouldRedirectToIntake } from "../../helpers/success-guard.helper";
import { PATIENT_SESSION_STORAGE_KEY } from "../../interfaces/patient-form.interface";
import { FrontDeskCue } from "./FrontDeskCue";
import { SuccessNextSteps } from "./SuccessNextSteps";
import { SuccessReceipt } from "./SuccessReceipt";

function SuccessLoadingState() {
  return (
    <div className="space-y-7 py-10" role="status" aria-label="Loading your check-in receipt">
      <div className="space-y-3">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-12 w-4/5" />
        <Skeleton className="h-5 w-3/5" />
      </div>
      <Skeleton className="h-72 w-full rounded-3xl" />
    </div>
  );
}

export function SuccessPage() {
  const router = useRouter();
  const [storedId, setStoredId] = useState<string | null | undefined>(undefined);
  const sessionQuery = useSession(storedId);

  useEffect(() => {
    setStoredId(window.sessionStorage.getItem(PATIENT_SESSION_STORAGE_KEY));
  }, []);

  const shouldRedirect =
    storedId !== undefined &&
    (sessionQuery.isError || shouldRedirectToIntake(sessionQuery.data, Boolean(storedId)));

  useEffect(() => {
    if (shouldRedirect) router.replace("/");
  }, [router, shouldRedirect]);

  const startAnotherCheckIn = useCallback(() => {
    window.sessionStorage.removeItem(PATIENT_SESSION_STORAGE_KEY);
    router.push("/");
  }, [router]);

  if (
    storedId === undefined ||
    sessionQuery.isPending ||
    shouldRedirect ||
    !sessionQuery.data ||
    sessionQuery.data.status !== SessionStatus.Submitted
  ) {
    return <SuccessLoadingState />;
  }

  const session = sessionQuery.data;

  return (
    <div className="py-8 sm:py-12">
      <article className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 overflow-hidden rounded-[2rem] border border-amber-100 bg-stone-50/95 shadow-[0_24px_70px_-35px_rgba(120,83,45,0.35)] motion-safe:duration-700">
        <header className="bg-gradient-to-br from-amber-100 via-amber-50 to-stone-100 px-6 py-9 sm:px-10 sm:py-11">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">
            Check-in complete
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
            You’re checked in
          </h1>
          <p className="mt-3 max-w-lg text-base leading-7 text-stone-600">
            Keep this page handy while you wait.
          </p>
          <FrontDeskCue status={session.status} />
          <div className="mt-7 inline-flex items-center rounded-full border border-amber-300/70 bg-white/75 px-4 py-2 font-mono text-sm tracking-wide text-stone-700">
            Check-in code
            <span className="ml-2 font-bold text-amber-900">{checkInCode(session.id)}</span>
          </div>
        </header>

        <div className="px-6 py-1 sm:px-10">
          <SuccessReceipt data={session.data} submittedAt={session.updatedAt} />
          <SuccessNextSteps onStartAnother={startAnotherCheckIn} />
        </div>
        <div className="h-8 sm:h-10" />
      </article>
    </div>
  );
}
