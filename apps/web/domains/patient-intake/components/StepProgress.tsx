import { INTAKE_STEP_ORDER, INTAKE_STEP_TITLES, type IntakeStep } from "@patient/validation";

type StepProgressProps = {
  step: IntakeStep;
  index: number;
  total: number;
};

export function StepProgress({ step, index, total }: StepProgressProps) {
  const percentage = ((index + 1) / total) * 100;

  return (
    <nav aria-label="Form progress">
      <div className="md:hidden">
        <p className="mb-2 text-sm font-medium text-slate-700">
          Step {index + 1} of {total} · {INTAKE_STEP_TITLES[step]}
        </p>
        <div
          className="h-1.5 overflow-hidden rounded-full bg-slate-200"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={index + 1}
        >
          <div
            className="h-full rounded-full bg-teal-600 transition-[width]"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <ol className="hidden grid-cols-5 gap-2 md:grid">
        {INTAKE_STEP_ORDER.map((candidate, candidateIndex) => {
          const reached = candidateIndex <= index;
          return (
            <li
              key={candidate}
              className={reached ? "text-teal-700" : "text-slate-400"}
              aria-current={candidate === step ? "step" : undefined}
            >
              <div
                className={`mb-2 h-1.5 rounded-full ${reached ? "bg-teal-600" : "bg-slate-200"}`}
              />
              <span className="text-xs font-medium">{INTAKE_STEP_TITLES[candidate]}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
