# Task 9 Report: Submitted session redirect and resume banner polish

## Status

Complete.

## Changes

- Added a submitted-session redirect guard that activates only after session bootstrap completes.
- Redirects restored submitted sessions with `router.replace("/success")`.
- Keeps the bootstrap state visible during the redirect so the locked intake form is never rendered.
- Preserved the Task 6 resumed-session behavior and exact banner copy: **Welcome back — resuming your check-in.**
- Added regression coverage for the redirect guard's bootstrapping and submitted states.

## Verification

- TDD red: targeted test failed because `shouldRedirectSubmittedSession` did not exist.
- TDD green: targeted test passed (6/6).
- `pnpm --filter web test`: 10 files passed, 40 tests passed.
- `pnpm --filter web lint`: passed with no ESLint warnings or errors.
- `pnpm --filter web build`: compiled, type-checked, and generated all routes successfully.
- `git diff --check`: passed.

## Manual coverage

The browser-based submit/reload/storage scenarios were not run in this non-interactive task session. The submitted bootstrap branch is covered by the new unit regression test; existing resume helper coverage remains green.

## Concerns

- Next.js emits the pre-existing multiple-lockfile workspace-root warning during lint/build.
- Vitest emits the pre-existing Vite CJS API deprecation warning.
