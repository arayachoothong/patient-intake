import { Button } from "@patient/ui";

type SuccessNextStepsProps = {
  onStartAnother: () => void;
};

export function SuccessNextSteps({ onStartAnother }: SuccessNextStepsProps) {
  return (
    <section aria-labelledby="next-steps-title" className="pt-7 sm:pt-8">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
        What happens next
      </p>
      <h2
        id="next-steps-title"
        className="mt-2 text-2xl font-semibold tracking-tight text-slate-900"
      >
        You can settle in
      </h2>

      <ol className="mt-6 grid gap-3 sm:grid-cols-2">
        <li className="rounded-2xl bg-blue-50 px-5 py-4 text-sm leading-6 text-slate-700">
          <span className="mr-2 font-semibold text-blue-800">1.</span>
          Stay nearby and listen for your name
        </li>
        <li className="rounded-2xl bg-slate-100 px-5 py-4 text-sm leading-6 text-slate-700">
          <span className="mr-2 font-semibold text-slate-700">2.</span>
          Keep your check-in code available
        </li>
      </ol>

      <div className="mt-7 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">Need help? Ask a clinic team member.</p>
        <Button type="button" variant="outline" onClick={onStartAnother}>
          Start another check-in
        </Button>
      </div>
    </section>
  );
}
