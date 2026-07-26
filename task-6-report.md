# Task 6 Report

## Fix Report

- Gated form-level submission with `shouldSubmitOnFormEvent`: non-Review submits prevent default and continue through step validation; Review submits use the existing React Hook Form submit path.
- Added an explicit `resumed` signal from `usePatientSession`, set only after the stored session is successfully returned by the existing-session query. Failed stored IDs that fall back to create no longer show the resume banner.
- Added focused regression coverage for submit gating and resume-banner eligibility.

### Verification

`pnpm --filter web test -- domains/patient-intake/helpers/step-navigation.helper.spec.ts`

```text
Test Files  1 passed (1)
Tests       5 passed (5)
```

`pnpm --filter web test`

```text
Test Files  8 passed (8)
Tests       35 passed (35)
```

`pnpm exec prettier --check apps/web/domains/patient-intake/components/PatientIntakeForm.tsx apps/web/domains/patient-intake/hooks/usePatientSession.ts apps/web/domains/patient-intake/helpers/step-navigation.helper.ts apps/web/domains/patient-intake/helpers/step-navigation.helper.spec.ts`

```text
Checking formatting...
All matched files use Prettier code style!
```

`pnpm exec eslint apps/web/domains/patient-intake/components/PatientIntakeForm.tsx apps/web/domains/patient-intake/hooks/usePatientSession.ts apps/web/domains/patient-intake/helpers/step-navigation.helper.ts apps/web/domains/patient-intake/helpers/step-navigation.helper.spec.ts`

```text
Exit code 0.
Pages-directory configuration warning only; no lint errors.
```

`pnpm --filter web exec tsc --noEmit`

```text
Exit code 1.
domains/session/infrastructure/memory-store.spec.ts(43,7): TS2820: Type '"female"' is not assignable to type 'Gender'.
domains/session/infrastructure/memory-store.spec.ts(64,7): TS2820: Type '"female"' is not assignable to type 'Gender'.
```

The type-check failures are pre-existing and outside the Task 6 files.
