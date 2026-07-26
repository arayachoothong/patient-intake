# Patient Intake + Staff Realtime Monitor

## Submission

|                |                                                                                              |
| -------------- | -------------------------------------------------------------------------------------------- |
| **Live demo**  | [https://patient-intake-seven.vercel.app](https://patient-intake-seven.vercel.app)           |
| **Repository** | [github.com/arayachoothong/patient-intake](https://github.com/arayachoothong/patient-intake) |
| **Patient**    | `/`                                                                                          |
| **Receipt**    | `/success`                                                                                   |
| **Staff**      | `/staff`                                                                                     |

Open **patient and staff in two windows** and complete the flow in one sitting (see **Known limitation** for why).

Architecture notes: [`docs/development-plan.md`](docs/development-plan.md).

A Next.js monorepo demo for clinic check-in: patients complete a responsive five-step intake (**Personal → Contact → Preferences → Emergency → Review**), submit, and receive a check-in receipt. Staff watch each session move through the journey stages **New → Filling → Waiting for review → Ready** and can open a read-only detail or submitted receipt. Updates sync in near real time over **Ably** (~250ms debounced PATCHes). Shared UI and validation live in `@patient/ui` and `@patient/validation`. HTTP uses **axios** + **TanStack Query**; Ably events update the Query cache.

## Routes

| URL                  | Audience | Purpose                                                                                               |
| -------------------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `/`                  | Patient  | Complete the five-step intake, review answers, and submit                                             |
| `/success`           | Patient  | View the submitted receipt, check-in code, front-desk cue, and next steps                             |
| `/staff`             | Staff    | Watch sessions progress through **New**, **Filling**, **Waiting for review**, and **Ready**           |
| `/staff/[sessionId]` | Staff    | View live intake detail while filling, or the submitted receipt and matching check-in code when ready |

## Prerequisites

- **Node.js 20+**
- **pnpm 9** (see `packageManager` in root `package.json`)
- An [Ably](https://ably.com/) app with API keys (free tier is enough for local/dev)

## Setup

1. Clone the repo and install dependencies:

   ```bash
   pnpm install
   ```

   The web app lists **`next-runtime-env`** in `apps/web/package.json` as the pnpm alias **`npm:next-dynenv@4`** because official **`next-runtime-env@4`** is not published on npm (latest there is v3). Code still imports from **`next-runtime-env`** (`PublicEnvScript`, `env()`).

2. Copy environment template into the web app and add Ably keys:

   ```bash
   cp .env.example apps/web/.env.local
   ```

   **Important:** env must live in **`apps/web/.env.local`**. Native Next.js loads env from the app directory only; a repo-root **`.env.local` is ignored** by `apps/web` — do not edit only the root file. There is **no** custom `next.config` loader or root-file parser.

   | Variable               | Where used                                       | Notes                                                                  |
   | ---------------------- | ------------------------------------------------ | ---------------------------------------------------------------------- |
   | `NEXT_PUBLIC_ABLY_KEY` | Browser (Ably Realtime via `next-runtime-env`)   | Prefer a **subscribe-only** key (or any key with subscribe capability) |
   | `ABLY_API_KEY`         | Server (`process.env` in Route Handlers publish) | Must allow **publish** on channels `staff-queue` and `session-*`       |

   Public vars are injected at runtime with `<PublicEnvScript />` in the root layout and read in client code via `env('NEXT_PUBLIC_…')` from `next-runtime-env`, so values set on Vercel (or changed without rebuild) are available in the browser without relying only on build-time inlining.

3. Start the dev server:

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) (patient) and [http://localhost:3000/staff](http://localhost:3000/staff) (staff).

## Scripts

Run from the repo root (Turborepo):

| Command             | Description                                   |
| ------------------- | --------------------------------------------- |
| `pnpm dev`          | Start Next.js dev server (`web` on port 3000) |
| `pnpm build`        | Production build all packages/apps            |
| `pnpm lint`         | ESLint across the workspace                   |
| `pnpm format`       | Prettier write (TS, TSX, JSON, MD, CSS)       |
| `pnpm format:check` | Prettier check only                           |
| `pnpm test`         | Vitest (validation package + web helpers)     |

## Deploying on Vercel

1. Import [arayachoothong/patient-intake](https://github.com/arayachoothong/patient-intake) into Vercel (`main`).
2. Project settings:
   - **Root Directory:** `apps/web`
   - **Install Command:** `cd ../.. && pnpm install`
   - **Build Command:** `cd ../.. && pnpm --filter web build`
3. Environment variables (Production):
   - `NEXT_PUBLIC_ABLY_KEY` — browser Ably (subscribe)
   - `ABLY_API_KEY` — server publish on `staff-queue` and `session-*`
4. Deploy. Live app: **https://patient-intake-seven.vercel.app**

If the GitHub integration is connected, pushes to `main` redeploy automatically.

**Warm demo tip:** for the current local or feature-branch build, open patient and staff windows before starting, keep both on the same origin/deploy, and finish without long idle gaps. This keeps both windows on the same warm process as much as the host permits. The live URL above may remain on an older deployment until the feature branch is deployed.

## Core behavior (included)

- Progress percentage from required fields (denominator grows with emergency contact count)
- Five-step patient intake with per-step validation, Review edit links, and sticky navigation actions
- Emergency contacts as an **array** (`emergencyContacts`: 1–3 items; each `name`, `relation`, `phone` required on submit)
- Patient add/remove contacts (never below 1, max 3); staff detail lists the same array live
- Successful submit redirects to `/success` with a receipt, display-only check-in code, front-desk cue, and next steps
- Staff journey badges map an empty intake to **New**, an in-progress intake to **Filling**, a completed but unsubmitted Review step to **Waiting for review**, and a submitted intake to **Ready**
- Staff field highlight + typing indicator (including indexed emergency paths)
- Connection status banner (Ably connection state)
- Full Zod validation on submit; PATCH after submit returns **409**
- Accessible labels / responsive layout
- Demographics only (no clinical complaint/symptoms fields)

## Bonus features (optional extensions)

These are **not required** for core acceptance; they are documented targets for polish after the main flow works:

| ID    | Idea                                                                                                 |
| ----- | ---------------------------------------------------------------------------------------------------- |
| **A** | Enhanced live UX — smoother highlight animation, richer presence (e.g. last-active timestamp)        |
| **B** | Extra form quality — phone mask UX, stronger DOB constraints, i18n-ready copy structure              |
| **C** | Product extras — durable persistence/auth, session timeout → `abandoned`, staff export/print summary |

## Manual test checklist

Automated browser E2E is out of scope for v1; verify manually against the same warm local server or feature deployment:

- [ ] **Two windows / New** — open staff on `/staff`, then patient on `/`; the new session appears as **New**.
- [ ] **Live Filling** — start typing in the patient window; within ~1s the staff queue shows **Filling**, and session detail mirrors progress, active field, and emergency contact changes.
- [ ] **Patient steps** — complete Personal → Contact → Preferences → Emergency → Review; confirm invalid steps do not advance and Review edit links return to the selected step.
- [ ] **Submit / success** — submit from Review; patient redirects to `/success` and shows a receipt plus check-in code.
- [ ] **Staff Ready** — staff queue changes to **Ready**; detail shows the submitted receipt and the same check-in code.
- [ ] **Mobile viewport** — on a narrow screen, the patient stepper and sticky Back/Continue actions remain usable; staff mobile cards/detail remain readable.
- [ ] **Reconnect** — disable network briefly or reload staff tab; connection banner shows reconnecting; queue/detail resync after Ably reconnects (initial `GET /api/sessions` / session fetch).
- [ ] **Submit lock** — returning to `/` with the submitted session redirects to `/success`; further PATCH returns 409.

## Known limitation: in-memory sessions

Session state is an **in-memory `Map`** in the Node process (`apps/web/domains/session/infrastructure/memory-store.ts`). There is **no database**.

On **Vercel**, cold starts, redeploys, or multiple concurrent instances can clear that memory — the staff queue may look empty after idle time. This is **intentional** for a frontend-focused takehome (UI + Ably realtime), not a missing feature.

For a reliable review: open `/` and `/staff` together and run through create → type → submit in one continuous session.

## Packages

| Package                      | Role                                                        |
| ---------------------------- | ----------------------------------------------------------- |
| `apps/web`                   | Next.js App Router app (`web`)                              |
| `@patient/validation`        | Zod schemas, progress, `FIELD_DEFINITIONS` SSOT             |
| `@patient/ui`                | Shared shadcn UI primitives (Form, Table, Sidebar, Card, …) |
| `@patient/typescript-config` | Shared TS configs                                           |

Architecture and realtime contracts are described in [`docs/development-plan.md`](docs/development-plan.md).
