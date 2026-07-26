# Patient Intake + Staff Realtime Monitor

A Next.js monorepo demo for clinic check-in: patients complete a responsive demographics form (including **1–3 emergency contacts**) while staff watch a live **Patient** table and read-only detail view. Updates sync in near real time over **Ably** (~250ms debounced PATCHes). Shared UI and validation live in `@patient/ui` and `@patient/validation`. HTTP uses **axios** + **TanStack Query**; Ably events update the Query cache.

## Routes

| URL                  | Audience | Purpose                                                                                     |
| -------------------- | -------- | ------------------------------------------------------------------------------------------- |
| `/`                  | Patient  | Start check-in, fill demographics + emergency contacts array, submit                        |
| `/staff`             | Staff    | Admin shell with sidebar menu **Patient**; table columns Name · Status · Progress · Updated |
| `/staff/[sessionId]` | Staff    | Live mirror of one session (progress, typing, field highlight, emergency contact list)      |

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

1. Import the repo; set **Root Directory** to the monorepo root (or configure Turborepo build for `apps/web`).
2. Add the same env vars as local: `NEXT_PUBLIC_ABLY_KEY` and `ABLY_API_KEY` for Production (and Preview if you test PRs).
3. Build command: `pnpm build` (ensure install uses `pnpm` via Corepack or Vercel’s pnpm detection).

See **Known limitation** below before relying on a deployed demo for long-lived sessions.

## Core behavior (included)

- Progress percentage from required fields (denominator grows with emergency contact count)
- Emergency contacts as an **array** (`emergencyContacts`: 1–3 items; each `name`, `relation`, `phone` required on submit)
- Patient add/remove contacts (never below 1, max 3); staff detail lists the same array live
- Staff field highlight + typing indicator (including indexed emergency paths)
- Connection status banner (Ably connection state)
- Full Zod validation on submit; PATCH after submit returns **409**
- Accessible labels / responsive layout
- Demographics only (no clinical complaint/symptoms fields)

## Bonus features (optional extensions)

These are **not required** for core acceptance; they are documented targets for polish after the main flow works:

| ID    | Idea                                                                                                |
| ----- | --------------------------------------------------------------------------------------------------- |
| **A** | Enhanced live UX — smoother highlight animation, richer presence (e.g. last-active timestamp)       |
| **B** | Extra form quality — phone mask UX, stronger DOB constraints, i18n-ready copy structure             |
| **C** | Product extras — multi-step form variant, session timeout → `abandoned`, staff export/print summary |

## Manual test checklist

Automated E2E is out of scope for v1; verify manually:

- [ ] **Two browsers** — patient on `/`, staff on `/staff` (Patient table) and session detail; typing on patient updates queue progress and detail fields within ~1s.
- [ ] **Emergency contacts** — add a 2nd contact on patient; staff detail list updates live; submit requires all contact fields.
- [ ] **Mobile viewport** — patient form usable on a narrow screen; staff sidebar/table/detail readable.
- [ ] **Reconnect** — disable network briefly or reload staff tab; connection banner shows reconnecting; queue/detail resync after Ably reconnects (initial `GET /api/sessions` / session fetch).
- [ ] **Submit lock** — after successful submit, patient form locks / shows confirmation; staff sees `submitted` status; further PATCH returns 409.

## Known limitation: in-memory sessions

Session data is stored in an **in-memory `Map`** in the Node process (`domains/session/infrastructure/memory-store.ts`). There is no database.

On **Vercel serverless cold starts**, redeploys, or new instances, that memory is empty — active sessions disappear and the queue resets. This is an intentional tradeoff for a frontend-focused demo. For production you would add durable storage and treat Ably as a notification layer only.

## Packages

| Package                      | Role                                                        |
| ---------------------------- | ----------------------------------------------------------- |
| `apps/web`                   | Next.js App Router app (`web`)                              |
| `@patient/validation`        | Zod schemas, progress, `FIELD_DEFINITIONS` SSOT             |
| `@patient/ui`                | Shared shadcn UI primitives (Form, Table, Sidebar, Card, …) |
| `@patient/typescript-config` | Shared TS configs                                           |

Architecture and realtime contracts are described in [`docs/development-plan.md`](docs/development-plan.md).
