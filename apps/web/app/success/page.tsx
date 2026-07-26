import { SuccessPage } from "@/domains/patient-intake/components/success/SuccessPage";

export default function SuccessRoute() {
  return (
    <div className="to-background min-h-screen bg-gradient-to-b from-amber-50 via-stone-50">
      <header className="border-b border-amber-100/80 bg-stone-50/80">
        <div className="mx-auto w-full max-w-3xl px-4 py-5 sm:px-6">
          <p className="font-display text-xl font-semibold tracking-tight text-stone-950">
            Meridian Clinic
          </p>
          <p className="text-sm text-stone-600">Patient check-in</p>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl px-4 pb-12 sm:px-6 sm:pb-16">
        <SuccessPage />
      </main>
    </div>
  );
}
