# EntrenaGo Studio

Exercise tracker and helper app. Live at [entrenago-studio.vercel.app](https://entrenago-studio.vercel.app).

> **Internal project.** Not intended for external contribution.

## Stack

| Area | Tools |
| --- | --- |
| Framework | React 19, TypeScript, Vite |
| Routing | React Router DOM |
| Backend | Supabase (Auth, PostgreSQL, RLS) |
| Server state | TanStack Query |
| Forms | React Hook Form + Zod |
| Styling | Tailwind CSS 4, Radix UI primitives, shadcn-style components |
| Animation | Motion |
| Testing / UI docs | Vitest, Playwright, Storybook |
| Package manager | pnpm |
| Hosting | Vercel |

## Requirements

- Node.js `>= 22.13.0` (see `.nvmrc`)
- pnpm (version pinned in `package.json` via `packageManager`)
- A Supabase project

## Getting started

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Fill in `.env` with your Supabase project values:

```bash
VITE_SUPABASE_URL=https://<your-project>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

Only the anon key belongs in the frontend. Data access relies on Row Level Security, so never ship the service role key.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the dev server |
| `pnpm dev:network` | Dev server exposed on the local network (test on a phone) |
| `pnpm build` | Typecheck, build, and optimize with Classpresso |
| `pnpm build:analyze` | Build and analyze the output |
| `pnpm preview` | Preview the production build |
| `pnpm typecheck` | Run `tsc -b` |
| `pnpm lint` / `pnpm lint:fix` | ESLint (zero warnings allowed) |
| `pnpm format` / `pnpm format:check` | Prettier |
| `pnpm storybook` | Storybook on port 6006 |
| `pnpm storybook:build` | Build Storybook |

## Project structure

<!-- Fill in from src/. The project uses a feature-based layout. -->

```
src/
├── main.tsx                  # App entry
├── App.tsx
├── router/
│   └── routes.tsx            # Centralized route definitions
├── layouts/
│   ├── AppLayout.tsx         # Authenticated app shell
│   ├── AuthLayout.tsx        # Login / register / reset flows
│   └── MyAccountLayout.tsx
├── pages/                    # Route-level compositions
│   ├── Dashboard.tsx
│   ├── MyRoutines.tsx
│   ├── ProgressTracking.tsx
│   ├── Profile.tsx
│   ├── Settings.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── ForgotPassword.tsx
│   └── ResetPassword.tsx
├── features/                 # Feature modules (components / hooks / types)
│   ├── auth/                 # Auth forms, OAuth providers, profile update
│   ├── onboarding/
│   ├── carouselWeekly/       # Weekly routine carousel
│   ├── navigation/           # Desktop, mobile side, and bottom nav
│   ├── darkMode/             # Theme toggle + hook
│   └── adbox/
├── components/
│   ├── ui/                   # Base UI primitives (shadcn/Radix style)
│   ├── custom/               # App-specific shared components
│   ├── loader/
│   └── ProtectedRoute.tsx    # Route guard
├── context/
│   └── AuthContext.tsx
├── shared/
│   ├── hooks/
│   ├── lib/
│   │   ├── queryClient.ts    # TanStack Query client
│   │   └── supabase/         # Supabase client
│   ├── types/
│   └── utils/
├── styles/
│   └── global.css
├── stories/                  # Storybook stories and config
└── assets/
```

## Architecture notes

Full details live in [`AI_RULES.md`](./AI_RULES.md). The short version:

- **Feature-based structure.** Code is organized by feature, not by technical layer.
- **Pages compose, features implement.** Pages only compose features and layouts. Business logic stays out of UI components.
- **Server state via TanStack Query.** Supabase is never called directly from UI components. Go through services or hooks.
- **Centralized routing.** Public and protected routes are defined in one routing layer, with guards for auth and onboarding.
- **Auth.** Supabase Auth with email and OAuth providers.
- **RLS is never bypassed.**

## Deployment

Deployed on Vercel. `vercel.json` handles SPA rewrites. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the Vercel project's environment variables.

## Conventions

- Components: `PascalCase`. Functions and variables: `camelCase`.
- Run `pnpm lint` and `pnpm typecheck` before pushing.
- Reuse existing patterns and components before adding new ones, and avoid new dependencies unless needed.
- AI-assisted changes must follow [`AI_RULES.md`](./AI_RULES.md).
