PROJECT_CONTEXT.md

# 1. Project Overview

## Project Name

**EntrenaGo**

## Description

EntrenaGo is a modern fitness web application designed to simplify workout planning, routine management, and training guidance. The project focuses on providing an intuitive and responsive experience for users of all fitness levels while establishing a scalable foundation for future growth.

## Mission

To provide the easiest and most intuitive way to guide users through their fitness journey by making workout planning and routine management simple, accessible, and motivating.

## Target Audience

- General users looking to organize their workouts.
- Fitness enthusiasts seeking structured training plans.
- Trainers and coaches managing routines for their clients.

## Current MVP Scope

The current MVP focuses on delivering the core functionality required to support a complete authentication and workout management experience.

Included features:

- User authentication.
- User onboarding.
- Profile management.
- Workout routine management.
- Responsive user interface.
- Secure backend integration with Supabase.

## Project Goals

- Build a production-ready fitness platform.
- Prioritize maintainability and scalability.
- Deliver a modern and intuitive user experience.
- Establish a reusable architecture for future features.
- Support multiple user roles as the platform evolves.

## Core Principles

- Modern
- Intuitive
- Motivating
- Maintainable
- Scalable
- Mobile-first

## Long-Term Objective

EntrenaGo is intended to evolve into a comprehensive fitness platform that supports workout planning, guided training, coach and athlete management, progress tracking, intelligent routine generation, and additional tools that help users build consistent training habits. 


# 2. Vision

## Vision Statement

EntrenaGo aims to become the easiest and most intuitive platform for planning, managing, and following workout routines, empowering people to build healthier habits through a modern, accessible, and motivating experience.

## Vision Objectives

- Simplify workout planning for users of all experience levels.
- Provide an intuitive experience that minimizes learning time.
- Support multiple user roles, including general users, athletes, trainers, and coaches.
- Deliver a scalable platform capable of growing without compromising usability or maintainability.
- Continuously improve the training experience through thoughtful features and intelligent automation.

## Long-Term Direction

As the platform evolves, EntrenaGo will expand beyond routine management to include:

- Guided workout execution.
- Manual and intelligent routine generation.
- Progress tracking and performance insights.
- Trainer and coach management.
- Personalized training experiences.
- Mobile-first enhancements.
- Push notifications and user engagement features.

## Product Vision

Every feature should contribute to a single objective:

> Make fitness planning and training guidance simple, intuitive, and motivating for every user.

# 3. MVP Scope

## Objective

The MVP establishes the core foundation of EntrenaGo by delivering the essential features required for user authentication, onboarding, profile management, and workout routine management while maintaining a scalable and maintainable architecture.

## Included Features

### Authentication

- User registration
- User login
- Password recovery
- Password reset
- Email verification
- Google authentication
- Facebook authentication
- Session management

### User Management

- User onboarding
- Profile creation
- Profile editing
- User role assignment
- Account settings

### Workout Management

- Create workout routines
- Edit workout routines
- Delete workout routines
- Organize workout content

### User Experience

- Responsive interface
- Light and Dark theme support
- Mobile-first design
- Accessible navigation
- Loading, success, and error states

### Infrastructure

- Supabase authentication
- Supabase PostgreSQL database
- Row Level Security (RLS)
- Database triggers
- Vercel deployment

## Excluded From MVP

The following features are planned but are not part of the initial MVP:

- Intelligent routine generation
- Advanced workout planning
- Guided workout execution
- Progress tracking
- Performance insights
- Coach and trainer management
- Push notifications
- Mobile application
- Offline support
- Real-time features
- Supabase Storage integration
- Edge Functions

## Success Criteria

The MVP is considered complete when users can:

- Create and verify an account.
- Authenticate securely.
- Recover and reset their password.
- Complete the onboarding process.
- Manage their profile.
- Create and manage workout routines.
- Use the application on desktop and mobile devices.


# 4. Tech Stack

## Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.x | Frontend library |
| TypeScript | 5.8.3 | Static type checking |
| Vite | 7.3.6 | Build tool and development server |

## Styling & UI

| Technology | Version | Purpose |
|------------|---------|---------|
| Tailwind CSS | 4.3.0 | Utility-first CSS framework |
| Motion | 12.40.0 | Animations and transitions |
| Radix UI | Latest | Accessible UI primitives (via shadcn/ui components) |
| shadcn/ui | Latest | Reusable UI component collection |
| Lucide React | Latest | Icon library |
| clsx | 2.1.1 | Conditional class name utility |

## Routing

| Technology | Version | Purpose |
|------------|---------|---------|
| React Router DOM | 7.17.0 | Client-side routing |

## State Management

| Technology | Version | Purpose |
|------------|---------|---------|
| TanStack Query | 5.101.x | Server state management |
| React Context | Built-in | Global application state |
| Zustand | Latest | Client state management (planned) |

## Forms & Validation

| Technology | Version | Purpose |
|------------|---------|---------|
| React Hook Form | 7.78.0 | Form management (planned standard) |
| Zod | 4.4.3 | Schema validation (planned standard) |

## Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Supabase | 2.108.1 | Authentication and PostgreSQL database |

## Development Tools

| Technology | Version | Purpose |
|------------|---------|---------|
| Storybook | 9.1.1 | Component development |
| Vitest | 3.2.4 | Unit and component testing |
| ESLint | 9.21.0 | Code linting |
| esbuild | 0.25.1 | JavaScript/TypeScript bundler |
| globals | 15.15.0 | Global variable definitions |

## Deployment & Monitoring

| Technology | Version | Purpose |
|------------|---------|---------|
| Vercel | Latest | Frontend hosting and deployment |
| Vercel Speed Insights | 2.0.0 | Performance monitoring |

## Package Manager

| Technology | Status |
|------------|--------|
| pnpm | Primary package manager |
| npm | Deprecated for this project |




# 5. Architecture

## Architecture Overview

EntrenaGo follows a modular, feature-based architecture designed to promote maintainability, scalability, and code reusability. The application separates concerns by organizing business logic, UI components, routing, and state management into well-defined layers.

## Architectural Principles

- Feature-first organization.
- Separation of concerns.
- Reusable and composable components.
- Business logic separated from UI.
- Server state managed independently from client state.
- Mobile-first development.
- Production-ready code over temporary solutions.

## Frontend Architecture

- React-based Single Page Application (SPA).
- Component-driven development.
- Nested layouts using React Router DOM.
- Shared UI components for consistency.
- Feature-based organization for domain logic.

## Backend Architecture

- Backend-as-a-Service (BaaS) powered by Supabase.
- PostgreSQL database.
- Authentication managed by Supabase Auth.
- Database logic handled through SQL and triggers.
- Row Level Security (RLS) for data access control.

## State Architecture

### Server State

- Managed with TanStack Query.

### Global Client State

- Managed with React Context.
- Zustand available for future use when appropriate.

### Local State

- Managed with React hooks inside components when state is UI-specific.

## Data Flow

1. User interaction.
2. Route or component event.
3. Business logic execution.
4. Supabase request through the appropriate layer.
5. TanStack Query updates server state.
6. UI re-renders with updated data.

## Component Strategy

- Prefer reusable components.
- Compose small components instead of creating large monolithic ones.
- Reuse existing components before creating new ones.
- Avoid duplicated UI and business logic.

## Design Goals

- Maintainable.
- Readable.
- Scalable.
- Performant.
- Accessible.
- Easy to extend.

# 6. Folder Structure

## Overview

EntrenaGo uses a feature-based folder structure to organize code by domain and functionality. This approach improves scalability, maintainability, and separation of concerns.

## Root Structure

```txt
entrenago/
├── public/
├── src/
├── index.html
├── package.json
└── vite.config.ts
```

## Source Structure

```txt
src/
├── assets/
├── components/
├── contexts/
├── features/
├── hooks/
├── layouts/
├── lib/
├── pages/
├── providers/
├── routes/
├── services/
├── styles/
├── types/
├── utils/
└── main.tsx
```

## Feature-Based Structure

Each feature contains its own isolated logic, UI, and hooks.

```txt
features/
├── auth/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   └── types/
├── profile/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── types/
├── routines/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── types/
```

## Shared Components

```txt
components/
├── ui/
├── common/
├── layout/
└── custom/
```

## Pages

Pages represent route-level components and compose features and layouts.

```txt
pages/
├── auth/
├── dashboard/
├── profile/
└── routines/
```

## Routing

```txt
routes/
├── AppRouter.tsx
├── ProtectedRoutes.tsx
└── PublicRoutes.tsx
```

## Services Layer

All external integrations and API logic (Supabase, etc.) are isolated here.

```txt
services/
├── supabase/
├── auth/
├── profiles/
└── routines/
```

## Utilities

Reusable helper functions and pure logic utilities.

```txt
utils/
├── formatters/
├── validators/
└── constants/
```

## Types

Global TypeScript types shared across the application.

```txt
types/
├── auth.ts
├── profile.ts
├── routine.ts
└── common.ts
```

## Styling

Global and shared styling configuration.

```txt
styles/
├── globals.css
└── theme.css
```

## Key Principles

- Feature code must live inside `features/`.
- Shared UI components must live in `components/`.
- Pages should not contain business logic.
- Services handle all external communication.
- Hooks encapsulate reusable logic.


# 7. Coding Philosophy

## Overview

EntrenaGo follows a maintainability-first engineering philosophy focused on long-term scalability, readability, and consistent architecture. All code should be easy to understand, extend, and refactor without introducing unnecessary complexity.

---

## Core Priority Order

When making technical decisions, the following priority order must always be respected:

1. **Maintainability**
2. **Readability**
3. **Performance**
4. **Developer Experience**

---

## General Principles

- Write code that is easy to understand without additional context.
- Prefer explicit logic over clever or overly abstract solutions.
- Avoid premature optimization.
- Keep functions small and focused on a single responsibility.
- Favor composition over duplication.
- Avoid tightly coupled logic between UI and business rules.
- Keep the codebase consistent over time.

---

## Component Philosophy

- Prefer functional components only.
- Use composition instead of large monolithic components.
- Reuse existing components before creating new ones.
- Avoid duplicating UI logic or structure.
- Separate presentation from business logic whenever possible.

---

## State Management Philosophy

- Server state must be managed with TanStack Query.
- UI state should remain local unless shared globally.
- Global state should only be introduced when necessary.
- Avoid overusing global stores like Zustand or Context.

---

## Data Fetching Rules

- All API interactions should be abstracted away from UI components.
- Use dedicated services or hooks for data fetching.
- Never call Supabase directly inside UI components.
- Keep data logic isolated and reusable.

---

## File Organization Rules

- Feature-based structure must be respected at all times.
- Shared logic must live in dedicated shared folders (`utils`, `hooks`, `services`).
- Avoid cross-feature dependencies when possible.
- Pages should only compose features, not implement logic.

---

## Naming Conventions

- Use clear, descriptive names.
- Prefer `camelCase` for variables and functions.
- Prefer `PascalCase` for components.
- Avoid abbreviations unless widely understood.

---

## Error Handling Philosophy

- Fail gracefully and predictably.
- Always provide user-friendly error feedback.
- Avoid silent failures.
- Handle errors as close to the source as possible.

---

## Code Consistency

- Follow existing patterns before introducing new ones.
- Refactor inconsistencies instead of duplicating patterns.
- Ensure similar features behave and are structured similarly.

---

## AI Contribution Rules

When AI tools generate code for EntrenaGo, they must:

- Respect the established architecture.
- Reuse existing components and hooks.
- Avoid introducing new dependencies without justification.
- Maintain consistency with existing patterns.
- Prioritize maintainability above all else.

# 8. Design Philosophy

## Overview

EntrenaGo follows a modern, minimal, and motivational design approach focused on clarity, usability, and consistency. The interface is designed to reduce cognitive load and help users focus on their training rather than the application itself.

---

## Core Design Principles

- **Modern** — Uses current UI/UX patterns found in modern SaaS applications.
- **Intuitive** — Interfaces should be self-explanatory and require minimal learning.
- **Motivating** — Visual feedback and structure should encourage consistency and progress.
- **Clean** — Avoid unnecessary visual noise or clutter.
- **Consistent** — UI patterns should remain uniform across the entire application.
- **Accessible** — Design must support all users regardless of ability or device.

---

## Visual Style

- Minimalist interface with clear hierarchy.
- Soft shadows and subtle elevation.
- Rounded corners for a friendly and modern feel.
- Balanced spacing using a consistent scale.
- High contrast for readability in both light and dark modes.
- Focus on functional aesthetics rather than decorative elements.

---

## Layout Philosophy

- Mobile-first design approach.
- Responsive layouts for tablet and desktop.
- Centered content for key flows (auth, onboarding).
- Grid-based structure for dashboards and data views.
- Avoid overly complex nested layouts.

---

## Color Philosophy

- Colors are used semantically, not decoratively.
- Primary color is used for key actions and highlights.
- Success, warning, and error states are clearly differentiated.
- Dark mode is fully supported and visually equivalent in quality to light mode.
- Muted tones are used for secondary information.

---

## Typography

- Clear and highly readable font hierarchy.
- Strong distinction between headings and body text.
- Reduced use of overly bold or decorative typography.
- Consistent line height for readability.
- Focus on legibility across all screen sizes.

---

## Interaction Design

- Smooth and subtle animations.
- Immediate feedback on user actions.
- Hover and focus states are always visible.
- Loading states provide clear progress indication.
- Avoid excessive or distracting motion.

---

## Motion Philosophy

- Animations should feel natural and fast.
- Use motion to enhance feedback, not decoration.
- Keep transitions subtle and purposeful.
- Respect reduced-motion preferences.
- Avoid animation overload in data-heavy views.

---

## Component Design Rules

- Components should be reusable and consistent.
- Visual consistency is more important than variation.
- Buttons, inputs, and cards must follow standardized styles.
- Avoid one-off visual styles unless strictly necessary.
- Maintain alignment with the existing design system.

---

## Accessibility in Design

- Ensure sufficient color contrast.
- Maintain visible focus states for all interactive elements.
- Design with keyboard navigation in mind.
- Avoid relying solely on color to convey meaning.
- Keep UI elements large enough for touch interaction.

---

## Overall Experience Goal

EntrenaGo’s design should feel:

> Simple, clear, and motivating — allowing users to focus entirely on their training without friction or confusion.


# 9. AI Coding Rules

## Overview

This section defines mandatory rules that all AI coding assistants must follow when generating, modifying, or refactoring code for EntrenaGo. These rules ensure consistency, maintainability, and alignment with the project architecture and design system.

---

## Core Rules (Non-Negotiable)

- Always follow the existing project architecture.
- Never introduce new patterns without checking existing ones first.
- Never add new dependencies unless explicitly required.
- Never bypass established abstractions (hooks, services, components).
- Always prioritize maintainability over shortcuts or clever solutions.
- Do not rewrite existing systems unless explicitly requested.

---

## Code Generation Rules

- Generate production-ready code only.
- Avoid placeholder or pseudo-code implementations.
- Ensure TypeScript types are properly defined.
- Ensure all code follows existing folder structure and naming conventions.
- Reuse existing components before creating new ones.
- Prefer composition over duplication.
- Keep components small, focused, and reusable.

---

## UI & Design Rules

- Follow the established Design System exactly.
- Match spacing, typography, and layout conventions.
- Do not introduce new visual styles without justification.
- Ensure consistency with existing UI components.
- Maintain responsiveness across mobile, tablet, and desktop.
- Respect dark and light mode compatibility.

---

## State Management Rules

- Use TanStack Query for all server state.
- Do not call Supabase directly inside UI components.
- Keep UI state local unless it must be shared globally.
- Avoid unnecessary global state usage (Context or Zustand).
- Encapsulate logic in hooks when reusable.

---

## Architecture Rules

- Respect feature-based folder structure.
- Keep business logic outside of UI components.
- Services must handle all external API communication.
- Pages should only compose features and layouts.
- Avoid cross-feature dependencies unless absolutely necessary.

---

## Performance Rules

- Avoid premature optimization.
- Use memoization only when needed.
- Prefer lazy loading for routes and large components.
- Keep bundle size in mind when adding dependencies.
- Avoid unnecessary re-renders caused by poor state design.

---

## Accessibility Rules

- Always use semantic HTML elements.
- Include proper ARIA labels where necessary.
- Ensure keyboard navigation support.
- Maintain focus states for interactive elements.
- Respect `prefers-reduced-motion` when implementing animations.

---

## Error Handling Rules

- Always handle errors explicitly.
- Provide user-friendly error messages.
- Avoid silent failures.
- Handle API errors at the service or hook level.
- Ensure UI reflects loading, success, and error states clearly.

---

## Naming & Structure Rules

- Use PascalCase for components.
- Use camelCase for functions and variables.
- Use descriptive names (avoid abbreviations).
- Keep file and folder names consistent with project conventions.

---

## AI Behavior Rules

When generating code, AI must:

- Read and respect this document before making decisions.
- Match existing patterns instead of creating new ones.
- Prefer clarity over abstraction.
- Avoid over-engineering solutions.
- Maintain consistency across all generated code.
- Ensure all output is immediately usable in production.

---

## Forbidden Actions

AI must NOT:

- Introduce new architectural paradigms without approval.
- Modify unrelated parts of the codebase.
- Add unnecessary libraries or frameworks.
- Ignore existing patterns in favor of personal preference.
- Break feature-based structure boundaries.

---

## Final Principle

> If there is an existing pattern in the codebase, it must be reused or extended — not replaced.


# 10. Component Guidelines

## Overview

EntrenaGo components must be designed for reusability, consistency, and maintainability. Every component should follow a clear structure, predictable behavior, and align with the overall design system.

---

## Core Principles

- Components must be reusable by default.
- Keep components small and focused on a single responsibility.
- Prefer composition over duplication.
- Avoid tightly coupling UI and business logic.
- Follow existing design system patterns strictly.
- Ensure consistent behavior across similar components.

---

## Component Structure Rules

- Each component should live in a clearly defined folder.
- Related logic (hooks, utils, types) should be colocated when specific to a feature.
- Shared components must live in `components/` under appropriate subfolders (`ui`, `common`, `layout`, `custom`).
- Pages should not contain reusable UI logic.

---

## Types of Components

### UI Components

- Basic building blocks (buttons, inputs, modals, cards).
- Must be fully reusable and style-consistent.
- Should not contain business logic.

### Feature Components

- Specific to a domain (auth, profile, routines).
- Can contain business logic but should remain reusable within the feature.
- Must not be used outside their feature unless explicitly shared.

### Layout Components

- Define application structure (headers, sidebars, wrappers).
- Should be generic and configurable.
- Must not contain feature-specific logic.

---

## Composition Rules

- Build complex UIs by composing smaller components.
- Avoid creating large monolithic components.
- Prefer layering components instead of deep nesting logic.
- Keep props interfaces simple and predictable.

---

## Props Design

- Use clear and descriptive prop names.
- Avoid unnecessary prop drilling.
- Prefer objects for grouped data when appropriate.
- Keep prop interfaces minimal and focused.

---

## State Handling

- Local state should be used for UI-only concerns.
- Server state must be handled via TanStack Query hooks.
- Shared state should be minimized and centralized only when necessary.
- Avoid mixing UI state with business logic.

---

## Styling Rules

- Use Tailwind CSS as the primary styling method.
- Follow the established design system tokens and spacing scale.
- Avoid inline styles unless absolutely necessary.
- Do not create ad-hoc styles that deviate from the system.

---

## Reusability Rules

- Before creating a new component, check if an existing one can be reused or extended.
- Prefer extending props over duplicating components.
- Shared logic should be extracted into hooks or utilities.
- Avoid copy-paste component patterns.

---

## Naming Conventions

- Components must use PascalCase.
- Folders should use kebab-case or feature-based naming.
- UI components should have descriptive, functional names (e.g., `PrimaryButton`, `UserAvatar`).
- Avoid generic names like `Component1`, `Box`, or `Wrapper` unless strictly necessary.

---

## Accessibility Requirements

- Components must support keyboard navigation by default.
- Use semantic HTML elements whenever possible.
- Include proper ARIA attributes when required.
- Ensure focus states are visible and consistent.
- Maintain compatibility with screen readers.

---

## Performance Guidelines

- Avoid unnecessary re-renders.
- Keep components lightweight.
- Use memoization only when needed.
- Avoid deeply nested prop chains.
- Split large components into smaller units when appropriate.

---

## Anti-Patterns (Do NOT)

- Do not create duplicate components with minor differences.
- Do not embed business logic inside generic UI components.
- Do not overuse global state.
- Do not bypass design system conventions.
- Do not create components without a clear reuse purpose.

---

## Final Principle

> A good component in EntrenaGo is simple, reusable, predictable, and consistent with the design system.


# 11. State Management

## Overview

EntrenaGo uses a hybrid state management approach designed to clearly separate server state, global client state, and local UI state. The goal is to keep state predictable, scalable, and easy to reason about.

---

## State Categories

### 1. Server State

Server state refers to data coming from external sources such as Supabase (e.g. user profiles, routines, authentication data).

**Tooling:**
- TanStack Query

**Rules:**
- All server state must be managed through TanStack Query.
- Data fetching, caching, synchronization, and mutations must be handled via query hooks.
- Direct Supabase calls inside UI components are not allowed.
- Server state must be abstracted into reusable hooks or services.

---

### 2. Global Client State

Global state refers to application-wide UI or session state that must be shared across multiple parts of the app.

**Tooling:**
- React Context (primary)
- Zustand (available but not actively used yet)

**Rules:**
- Use React Context for simple global state.
- Use Zustand only when Context becomes too complex or causes performance issues.
- Avoid overusing global state.
- Only store state globally when it is truly shared across multiple unrelated components.

---

### 3. Local UI State

Local state refers to component-specific state that does not need to be shared.

**Tooling:**
- React useState
- React useReducer (when needed)

**Rules:**
- Default to local state whenever possible.
- Keep UI state close to where it is used.
- Do not elevate state unless necessary.
- Avoid unnecessary globalization of state.

---

## Data Flow Model

1. User interacts with UI.
2. Component triggers event.
3. Local state updates (if UI-only).
4. If server interaction is needed:
   - Call custom hook (TanStack Query).
   - Hook interacts with service layer.
   - Service layer communicates with Supabase.
5. TanStack Query updates cache.
6. UI re-renders based on updated state.

---

## Server State Guidelines (TanStack Query)

- All queries must be defined inside reusable hooks.
- Mutations must follow consistent naming conventions (`useCreateX`, `useUpdateX`, `useDeleteX`).
- Query keys must be structured and predictable.
- Cache invalidation must be handled explicitly after mutations.
- Avoid duplicate query definitions across features.

---

## Global State Guidelines

- Keep global state minimal.
- Prefer composition over shared global stores.
- Do not store server data in global state.
- Use Context for:
  - Authentication session
  - Theme (light/dark/system)
  - UI toggles (modals, drawers, etc.)

---

## Local State Guidelines

- Use local state for:
  - Form inputs
  - UI toggles
  - Temporary UI interactions
- Do not over-engineer local state into global state.
- Prefer simplicity over abstraction.

---

## Zustand Usage (Optional)

Zustand is available but should only be used when:

- React Context becomes too complex.
- Performance issues arise due to excessive re-renders.
- Shared state requires fine-grained control.

Zustand should NOT replace TanStack Query or be used for server state.

---

## Anti-Patterns (Do NOT)

- Do not fetch Supabase data directly inside components.
- Do not duplicate server state in global stores.
- Do not overuse Context for everything.
- Do not create multiple sources of truth for the same data.
- Do not mix UI state and server state in the same layer.

---

## Final Principle

> Server state, global state, and local state must always remain clearly separated and handled with the appropriate tool.


# 12. Routing

## Overview

EntrenaGo uses React Router DOM to manage client-side routing. The routing system is designed to be clear, scalable, and aligned with the feature-based architecture of the application.

---

## Routing Strategy

- React Router DOM is the single routing solution for the application.
- Routes are organized by domain and feature.
- Routing logic must remain separate from UI and business logic.
- Pages act as route-level compositions of features and layouts.

---

## Route Types

### Public Routes

Routes accessible without authentication.

Examples:
- Login
- Register
- Forgot Password
- Reset Password
- Public landing pages (if applicable)

---

### Protected Routes

Routes that require user authentication.

Examples:
- Dashboard
- Profile
- Routines
- Onboarding (if not completed)

Access control is handled through route guards.

---

### Nested Routes

EntrenaGo uses nested routing to support layout composition.

Examples:
- Dashboard layout with nested feature pages
- Auth layout for authentication flows

---

## Route Structure

Routes are organized in a dedicated routing layer:

```txt
routes/
├── AppRouter.tsx
├── PublicRoutes.tsx
├── ProtectedRoutes.tsx
```

---

## Routing Principles

- Routes must be declarative and centralized.
- Avoid defining routes inside feature components.
- Keep route definitions simple and readable.
- Use nested routes for shared layouts.
- Do not mix routing logic with business logic.

---

## Pages vs Components

- **Pages**: Route-level components that compose features and layouts.
- **Components**: Reusable UI or feature-specific building blocks.

Pages must not contain reusable logic that should belong in features or hooks.

---

## Navigation Rules

- Use React Router navigation utilities (`useNavigate`, `Link`) consistently.
- Avoid direct URL manipulation.
- Maintain consistent navigation patterns across the app.
- Ensure navigation respects authentication state.

---

## Route Guards

Protected routes must enforce authentication checks.

Rules:

- Unauthenticated users must be redirected to login.
- Authenticated users must not access auth routes unnecessarily.
- Onboarding flow must be enforced when required.

---

## Lazy Loading

- Routes should support lazy loading where appropriate.
- Large feature pages should be code-split to improve performance.
- Avoid loading all routes eagerly unless necessary.

---

## URL Design

- URLs must be clean, predictable, and semantic.
- Use lowercase and hyphenated paths.
- Avoid deeply nested or overly complex URLs.
- Keep route structure aligned with feature domains.

---

## Example Structure

- `/login`
- `/register`
- `/forgot-password`
- `/reset-password`
- `/dashboard`
- `/profile`
- `/routines`
- `/onboarding`

---

## Anti-Patterns (Do NOT)

- Do not define routes inside feature logic.
- Do not mix routing with business logic.
- Do not create duplicate route definitions.
- Do not bypass route guards for convenience.
- Do not create inconsistent navigation patterns.

---

## Final Principle

> Routing in EntrenaGo must remain simple, predictable, and strictly separated from business logic and UI implementation.

# 13. Authentication

## Overview

EntrenaGo uses Supabase Authentication as the central system for user identity, session management, and access control. Authentication is tightly integrated with routing, onboarding, and user profile management.

---

## Authentication Provider

- Supabase Auth is the single source of truth for authentication.
- Session state is managed client-side and synchronized with Supabase.
- Authentication state must be accessible across the application via a dedicated context/provider.

---

## Supported Auth Methods

- Email and password authentication
- Google OAuth
- Facebook OAuth

---

## Authentication Flow

### Sign Up Flow

1. User registers using email/password or OAuth.
2. Supabase creates the user account.
3. Email verification is sent (if applicable).
4. User is redirected to onboarding or login state depending on verification status.
5. Profile creation is triggered after successful authentication.

---

### Login Flow

1. User submits credentials or uses OAuth provider.
2. Supabase validates credentials.
3. Session is created and stored.
4. User is redirected to protected area (dashboard or onboarding).

---

### Password Recovery Flow

1. User requests password reset via email.
2. Supabase sends reset email with confirmation link.
3. User accesses reset link.
4. Password is updated through Supabase reset mechanism.
5. User is redirected to login after success.

---

## Session Management

- Sessions are managed by Supabase client.
- Session persistence is handled automatically via Supabase.
- Application must reactively respond to session changes.
- On session expiration, user must be redirected to login.

---

## Route Protection

Authentication is enforced at routing level:

- Unauthenticated users cannot access protected routes.
- Authenticated users are redirected away from auth pages.
- Onboarding flow is enforced after first login if required.

---

## User Context

- Auth state must be exposed globally via context or equivalent provider.
- User session data must be accessible across the application.
- Avoid redundant session fetching across multiple components.

---

## Profile Integration

- User profile creation is tied to authentication lifecycle.
- Profile data is stored in Supabase PostgreSQL.
- Profile is created after successful signup/login if not existing.
- Authentication and profile data must remain synchronized.

---

## Security Rules

- Never expose sensitive auth tokens directly in UI.
- Always rely on Supabase client for secure session handling.
- Enforce Row Level Security (RLS) at database level.
- Do not trust client-side validation alone.

---

## Error Handling

Authentication errors must be handled gracefully:

- Invalid credentials → user-friendly error message
- Network issues → retryable feedback
- OAuth failure → fallback to login screen
- Email not confirmed → clear instructions to user

---

## UI States

Authentication flows must include:

- Loading states during requests
- Success states after actions
- Inline validation errors
- Global error feedback where appropriate

---

## Anti-Patterns (Do NOT)

- Do not manually manage JWTs.
- Do not store auth state outside Supabase.
- Do not bypass Supabase security rules.
- Do not mix authentication logic directly inside UI components.
- Do not duplicate session logic across the app.

---

## Final Principle

> Authentication in EntrenaGo must always be centralized, secure, and fully managed by Supabase, with the UI acting only as a reflection of authentication state.

# 14. Database

## Overview

EntrenaGo uses Supabase PostgreSQL as its primary database. The database is responsible for storing user data, profiles, workout routines, and all persistent application information.

All database interactions must be secure, structured, and aligned with Supabase best practices, including Row Level Security (RLS).

---

## Database Technology

- PostgreSQL (via Supabase)
- Supabase Auth integration
- Row Level Security (RLS)
- Database triggers (where needed)

---

## Core Principles

- The database is the single source of truth for persistent data.
- All access must be secured using Row Level Security (RLS).
- Client-side trust is not allowed; security must be enforced at database level.
- Data consistency is more important than convenience.
- Database structure should support scalability and future features.

---

## Data Access Rules

- All database access must go through Supabase client.
- Direct SQL access is not allowed from the frontend.
- All queries must respect RLS policies.
- Business logic should not live in the database unless explicitly required (e.g., triggers).

---

## Row Level Security (RLS)

RLS is enabled for all user-related tables.

### Current Policies

- Users can create their own profile (INSERT - public).
- Users can read their own profile (SELECT - public).
- Users can update their own profile (UPDATE - public).

### Rules

- Every new table must include appropriate RLS policies.
- No table containing user data should be exposed without protection.
- Policies must always restrict access to authenticated users where applicable.

---

## Database Structure (High-Level)

### Users / Profiles

- Stores user identity and profile information.
- Linked to Supabase Auth users.

### Routines

- Stores workout routines created by users.
- Linked to user profiles via user ID.

### Future Tables (Planned)

- Workout sessions
- Progress tracking
- Coach/client relationships
- Notifications
- Analytics and insights

---

## Data Modeling Principles

- Use clear and descriptive table names.
- Prefer normalized data structures.
- Avoid unnecessary duplication of data.
- Use foreign keys for relationships.
- Ensure all relationships are explicit and well-defined.

---

## Triggers and Functions

- Database triggers may be used for:
  - Automatic profile creation
  - Data synchronization tasks
- Use sparingly and only when necessary.
- Business logic should remain primarily in the application layer.

---

## Query Rules

- All queries must be executed through Supabase client.
- Queries should be abstracted into services or hooks.
- Avoid inline queries inside UI components.
- Prefer reusable query functions for consistency.

---

## Security Rules

- RLS must always be enabled for user-related data.
- No unrestricted public access to sensitive tables.
- Authentication must always be validated before data access.
- Never rely on frontend validation for security enforcement.

---

## Performance Guidelines

- Optimize queries for minimal data transfer.
- Avoid fetching unnecessary columns.
- Use indexes where appropriate.
- Prefer pagination for large datasets.
- Avoid over-fetching relational data unless required.

---

## Anti-Patterns (Do NOT)

- Do not disable RLS on user-related tables.
- Do not expose sensitive data publicly.
- Do not write business logic inside the database unless necessary.
- Do not query Supabase directly inside UI components.
- Do not duplicate data without justification.

---

## Final Principle

> The database in EntrenaGo must always remain secure, structured, and treated as the single source of truth for all persistent application data.

# 15. Forms

## Overview

EntrenaGo uses structured, validated, and accessible forms to handle all user input. Forms are a critical part of the application and must be consistent across authentication, onboarding, profile management, and workout creation.

---

## Form Philosophy

- Forms must be simple, predictable, and user-friendly.
- Validation must be clear and immediate.
- Errors should be easy to understand and fix.
- Forms should guide users through input rather than overwhelm them.
- Avoid unnecessary fields or complexity.

---

## Current Implementation Standard

- React Hook Form (planned standard)
- Zod for schema validation (planned standard)
- Native validation currently used in some areas (legacy state)

---

## Form Structure Rules

- Each form must be isolated in its own component or feature module.
- Form logic must not be mixed with UI layout logic.
- Validation schema must be separated from UI when possible.
- Reusable form components should be preferred over duplicated logic.

---

## Validation Rules

- Validation must be defined using schema-based validation (Zod preferred).
- All required fields must be clearly indicated.
- Error messages must be user-friendly and non-technical.
- Validation should occur on submit and optionally on blur or change where appropriate.

---

## Error Handling

- Errors must be displayed inline near the related field.
- Global form errors should be shown clearly at the top of the form.
- Do not rely on console logs for error feedback.
- All API errors must be mapped to user-readable messages.

---

## Input Components

Forms must use consistent input components from the design system:

- Text inputs
- Password inputs
- Email inputs
- Select dropdowns
- Checkboxes
- Radio buttons
- Text areas

All inputs must support:

- Labels
- Placeholder text
- Error states
- Disabled states
- Focus states
- Accessibility attributes

---

## UX Behavior

- Forms must provide immediate feedback when possible.
- Submit buttons must indicate loading state during submission.
- Prevent multiple submissions while processing.
- Auto-focus first input when appropriate.
- Preserve user input on validation errors.

---

## Layout Guidelines

- Forms should be vertically structured and easy to scan.
- Avoid dense layouts with too many fields at once.
- Group related fields visually.
- Use spacing consistently between inputs.
- Keep mobile-first layout as default.

---

## Accessibility Requirements

- Every input must have an associated label.
- Forms must be fully navigable via keyboard.
- Error messages must be announced to screen readers.
- Focus states must be clearly visible.
- Use semantic HTML form elements.

---

## State Management in Forms

- Use local state for form inputs (React Hook Form preferred).
- Avoid global state for form handling.
- Server state updates should be handled via TanStack Query mutations.
- Form state should reset or persist intentionally based on UX needs.

---

## Anti-Patterns (Do NOT)

- Do not mix form logic with UI layout logic.
- Do not create uncontrolled duplicated input components.
- Do not ignore validation errors or suppress them silently.
- Do not submit forms without loading state feedback.
- Do not bypass schema validation.

---

## Final Principle

> Forms in EntrenaGo must feel simple, guided, and reliable — reducing friction and helping users complete tasks without confusion.


# 16. Animations

## Overview

EntrenaGo uses subtle, purposeful animations to enhance user experience without distracting from core functionality. Animations are used to improve feedback, guide attention, and make interactions feel more fluid and responsive.

---

## Animation Philosophy

- Animations must be subtle and purposeful.
- Motion should enhance usability, not decoration.
- Avoid excessive or unnecessary animations.
- Transitions should feel fast and natural.
- The interface should remain functional even without animations.

---

## Animation Library

- Motion (Framer Motion) is used for all animations.
- Native CSS transitions may be used for simple interactions.
- Avoid mixing multiple animation systems unnecessarily.

---

## Core Principles

- Keep animations short and responsive.
- Use easing functions that feel natural.
- Avoid heavy or slow transitions.
- Ensure animations do not interfere with usability.
- Maintain consistency across similar interactions.

---

## Common Animation Patterns

### Page Transitions

- Subtle fade or slide transitions between routes.
- Avoid complex or long transitions.
- Keep navigation instant-feeling.

---

### Modal Animations

- Smooth fade-in overlay.
- Slight scale-up or slide-up for modal content.
- Background dimming must be subtle.

---

### Component Entry

- Fade-in with slight upward motion for new elements.
- Used for cards, lists, and dynamic content.

---

### Loading States

- Simple spinners or skeleton loaders.
- Avoid distracting motion.
- Keep loading feedback minimal but clear.

---

### Hover & Interaction States

- Subtle scale or color changes on hover.
- Smooth transitions for buttons and interactive elements.
- Immediate feedback on click or tap.

---

## Timing Guidelines

- Fast interactions: ~150–200ms
- Standard transitions: ~200–300ms
- Avoid animations longer than 400ms unless necessary

---

## Easing Guidelines

- Use smooth easing curves (ease-out preferred for UI feedback).
- Avoid linear motion for UI transitions.
- Motion should feel natural and responsive.

---

## Reduced Motion Support

- Must respect `prefers-reduced-motion` setting.
- Disable or minimize animations for users who prefer reduced motion.
- Ensure all animations degrade gracefully into static transitions.

---

## Performance Considerations

- Avoid animating layout-heavy properties (e.g. width, height).
- Prefer transform and opacity for performance.
- Keep animations lightweight to avoid jank.
- Do not block interactions during animations.

---

## Accessibility Considerations

- Animations must not cause disorientation or discomfort.
- Motion should never be required to understand UI state.
- Ensure state changes are clear even without animation.

---

## Anti-Patterns (Do NOT)

- Do not overuse animations for every interaction.
- Do not use long or slow transitions.
- Do not animate large layout shifts unnecessarily.
- Do not introduce inconsistent animation styles across components.
- Do not ignore reduced motion preferences.

---

## Final Principle

> Animations in EntrenaGo should feel invisible when done well — enhancing the experience without drawing attention to themselves.

# 17. Accessibility

## Overview

EntrenaGo is designed to be usable by as many people as possible, regardless of ability, device, or interaction method. Accessibility is treated as a core requirement, not an optional enhancement.

---

## Accessibility Philosophy

- Accessibility must be considered in every component and feature.
- The interface must remain usable without visual cues alone.
- Interaction must support keyboard, mouse, and touch equally.
- Accessibility should not be retrofitted; it must be built in from the start.

---

## Current Standard

- No formal WCAG certification is currently enforced.
- Accessibility practices are applied inconsistently and must be standardized going forward.
- AI-generated code must always include accessibility best practices by default.

---

## Semantic HTML

- Use semantic HTML elements whenever possible.
- Prefer native elements over custom implementations.
- Ensure correct hierarchy for headings (`h1 → h2 → h3`).
- Use proper form elements (`label`, `input`, `button`, `form`).

---

## Keyboard Navigation

- All interactive elements must be reachable via keyboard.
- Logical tab order must be maintained.
- Focus states must be visible and consistent.
- No component should trap the user unless intentionally designed (e.g. modals).

---

## Focus Management

- Focus must be clearly visible at all times.
- Modal opening must move focus into the modal.
- Modal closing must return focus to the triggering element.
- Avoid removing focus indicators.

---

## ARIA Usage

- Use ARIA attributes only when necessary.
- Do not replace semantic HTML with ARIA.
- Ensure ARIA labels are descriptive and meaningful.
- Use `aria-live` regions for dynamic updates when appropriate.

---

## Forms Accessibility

- Every input must have an associated label.
- Error messages must be connected to inputs.
- Required fields must be clearly indicated.
- Validation feedback must be accessible to screen readers.

---

## Color & Contrast

- Maintain sufficient contrast between text and background.
- Do not rely on color alone to convey meaning.
- Use icons or text labels alongside color indicators (e.g. error states).

---

## Motion Accessibility

- Respect `prefers-reduced-motion` setting.
- Disable or reduce animations when requested.
- Ensure UI remains fully functional without motion effects.

---

## Screen Reader Support

- All interactive elements must be properly labeled.
- Buttons must describe their action clearly.
- Images must include meaningful alt text when relevant.
- Dynamic content updates must be announced when necessary.

---

## Interactive Components

### Buttons

- Must have clear labels.
- Must indicate disabled and loading states.

### Modals

- Must be announced properly.
- Must trap focus while open.
- Must be dismissible via keyboard (Escape key).

### Navigation

- Must be accessible via keyboard.
- Active states must be identifiable.

---

## Error Accessibility

- Errors must be announced and visible.
- Inline errors must be associated with their inputs.
- Global errors must be clearly communicated.

---

## Testing Expectations

- Keyboard navigation should be manually tested.
- Forms should be tested with screen readers when possible.
- Accessibility issues should be treated as functional bugs.

---

## Anti-Patterns (Do NOT)

- Do not rely on color alone for meaning.
- Do not remove focus indicators.
- Do not ignore keyboard navigation requirements.
- Do not misuse ARIA instead of semantic HTML.
- Do not create inaccessible custom components.

---

## Final Principle

> EntrenaGo must remain fully usable without a mouse, without sound, and without visual enhancements — accessibility is a core part of the product, not an add-on.

# 18. Performance

## Overview

EntrenaGo is designed to deliver a fast, responsive, and smooth user experience across all devices. Performance is treated as a core product requirement, not a post-optimization step.

---

## Performance Philosophy

- Prioritize perceived performance over micro-optimizations.
- Keep the application fast by default.
- Avoid unnecessary complexity that impacts load time or runtime performance.
- Optimize only when there is a measurable need.

---

## Core Principles

- Avoid premature optimization.
- Keep bundle size under control.
- Prefer simple and efficient solutions over complex abstractions.
- Ensure UI remains responsive under all common use cases.
- Optimize for mobile devices first.

---

## Rendering Performance

- Minimize unnecessary re-renders.
- Use React memoization (`useMemo`, `useCallback`) only when needed.
- Keep component trees shallow when possible.
- Avoid deeply nested component structures.
- Split large components into smaller, focused units.

---

## Code Splitting

- Use lazy loading for route-level components.
- Load features only when needed.
- Avoid loading the entire application bundle upfront.
- Prefer dynamic imports for heavy or rarely used modules.

---

## Data Fetching Performance

- Use TanStack Query for caching and request deduplication.
- Avoid redundant API calls.
- Cache server state whenever appropriate.
- Invalidate queries explicitly after mutations.
- Prefer pagination for large datasets.

---

## Asset Optimization

- Optimize images before use.
- Avoid loading large assets unnecessarily.
- Use modern formats when possible (e.g. WebP).
- Lazy load non-critical assets.

---

## Network Efficiency

- Minimize API payload size.
- Avoid over-fetching data from Supabase.
- Use selective queries (fetch only required fields).
- Reduce unnecessary network requests.

---

## Animation Performance

- Use transform and opacity for animations.
- Avoid animating layout-affecting properties (width, height, margin).
- Keep animations lightweight and non-blocking.
- Respect reduced motion preferences.

---

## Bundle Size Management

- Avoid unnecessary dependencies.
- Prefer lightweight libraries.
- Regularly evaluate package usage.
- Remove unused code and imports.

---

## Mobile Performance

- Optimize for low-end devices.
- Reduce heavy computations on initial load.
- Ensure fast interaction responsiveness.
- Avoid blocking the main thread.

---

## Monitoring & Awareness

- Be mindful of performance during development.
- Avoid introducing regressions in core flows.
- Treat performance degradation as a functional issue.

---

## Anti-Patterns (Do NOT)

- Do not optimize prematurely without evidence.
- Do not introduce heavy libraries without justification.
- Do not ignore bundle size impact.
- Do not overuse memoization everywhere.
- Do not block rendering with unnecessary computations.

---

## Final Principle

> EntrenaGo must feel fast and responsive at all times — performance is part of the user experience, not an optional enhancement.

# 19. Responsive Design

## Overview

EntrenaGo is built with a mobile-first responsive design approach. The application must provide a seamless and consistent experience across mobile, tablet, and desktop devices.

---

## Responsive Philosophy

- Mobile-first is the default design approach.
- Every feature must work on small screens before scaling up.
- Layouts should adapt naturally to different screen sizes.
- Content should remain readable and usable on all devices.

---

## Breakpoints Strategy

- Design starts from mobile and scales upward.
- Layouts should adapt progressively rather than radically change.
- Avoid device-specific designs unless absolutely necessary.

---

## Layout Behavior

### Mobile

- Single-column layout.
- Simplified navigation.
- Prioritized content visibility.
- Reduced spacing where appropriate.

---

### Tablet

- Flexible multi-column layouts where needed.
- Balanced spacing and hierarchy.
- Expanded navigation options.

---

### Desktop

- Multi-column layouts for dashboards and complex views.
- Full feature visibility.
- Enhanced navigation and layout density.

---

## UI Adaptation Rules

- Components must adapt fluidly to screen size.
- Avoid fixed widths unless necessary.
- Use flexible layouts (flexbox, grid).
- Ensure touch targets remain usable on mobile.
- Maintain readability across all screen sizes.

---

## Navigation Responsiveness

- Mobile navigation should be simplified (e.g., bottom nav or drawer).
- Desktop navigation can be expanded and persistent.
- Ensure consistent access to core features across all devices.

---

## Typography Scaling

- Font sizes must scale appropriately across devices.
- Headings should remain clear and hierarchical.
- Avoid overly large or small text on any screen size.

---

## Spacing System

- Use consistent spacing scale across all breakpoints.
- Reduce excessive whitespace on mobile.
- Increase spacing on larger screens for better readability.

---

## Images and Media

- Images must scale responsively.
- Avoid fixed-size media elements.
- Use aspect-ratio aware containers.
- Optimize images for performance on mobile networks.

---

## Forms Responsiveness

- Forms must be single-column on mobile.
- Inputs must remain easily tappable.
- Avoid horizontal scrolling in any form.
- Maintain usability without zooming.

---

## Tables and Data Views

- Tables must adapt to smaller screens (stacked or scrollable).
- Avoid horizontal overflow issues.
- Consider alternative layouts for complex data on mobile.

---

## Touch Interaction

- Ensure touch targets are large enough for mobile interaction.
- Avoid small clickable elements.
- Provide sufficient spacing between interactive elements.

---

## Performance Considerations

- Avoid loading desktop-heavy layouts on mobile unnecessarily.
- Optimize rendering for low-power devices.
- Reduce layout complexity on smaller screens.

---

## Testing Requirements

- All features must be tested on mobile, tablet, and desktop.
- Responsive issues must be treated as critical bugs.
- Layout consistency must be verified across breakpoints.

---

## Anti-Patterns (Do NOT)

- Do not design desktop-first experiences.
- Do not create fixed-width layouts that break on mobile.
- Do not hide critical functionality on smaller screens.
- Do not rely on hover-only interactions.
- Do not ignore touch usability constraints.

---

## Final Principle

> EntrenaGo must feel natural and fully functional on any device — mobile is the foundation, not an afterthought.

# 20. Testing Strategy

## Overview

EntrenaGo uses a lightweight but scalable testing strategy focused on ensuring reliability in critical flows while maintaining fast development cycles. Testing is treated as a safeguard for core functionality rather than full coverage enforcement at all costs.

---

## Testing Philosophy

- Prioritize critical user flows over full coverage.
- Test behavior, not implementation details.
- Keep tests simple, readable, and maintainable.
- Avoid over-testing trivial logic.
- Ensure confidence in production deployments.

---

## Current Testing Stack

- Vitest (unit and component testing)
- Storybook (UI component verification and visual testing)
- React Testing Library (preferred for component behavior testing)

---

## Testing Levels

### 1. Unit Tests

Focus on pure functions and isolated logic.

Includes:
- Utility functions
- Validation logic (Zod schemas)
- Business logic in services

---

### 2. Component Tests

Focus on UI behavior and user interaction.

Includes:
- Form interactions
- Button behavior
- Conditional rendering
- State changes

---

### 3. Integration Tests

Focus on interaction between modules.

Includes:
- Feature flows (auth, onboarding, routines)
- API + UI integration using mocked services
- Routing behavior

---

## What Should Be Tested

- Authentication flows
- Critical forms (login, signup, password reset)
- Workout creation and editing flows
- Profile management
- Error handling behavior
- Core UI components

---

## What Should NOT Be Over-Tested

- Simple presentational components
- Static UI layouts
- Trivial utility functions with no logic
- Over-mocking of implementation details

---

## Testing Principles

- Test user behavior, not internal code structure.
- Prefer meaningful assertions over snapshot-heavy testing.
- Keep tests resilient to refactors.
- Avoid brittle tests tied to implementation details.
- Ensure tests reflect real user flows.

---

## Mocking Strategy

- Mock external services (Supabase, APIs).
- Do not mock internal logic unnecessarily.
- Use consistent mock data across tests when possible.
- Avoid over-complicating test setup.

---

## Storybook Usage

- Used for isolated UI component development.
- Helps validate visual consistency.
- Acts as a reference for reusable components.
- Not a replacement for functional tests.

---

## Test Organization

- Tests should live close to the code they test when possible.
- Feature-based tests should mirror feature structure.
- Shared utilities should have centralized test coverage.

---

## CI Strategy

- Tests must run before deployment.
- Vercel build fails if tests fail.
- Linting and tests are part of the deployment pipeline.

---

## Performance of Tests

- Tests should run fast.
- Avoid unnecessary setup overhead.
- Keep test suites modular and isolated.

---

## Anti-Patterns (Do NOT)

- Do not test implementation details.
- Do not overuse snapshots.
- Do not mock everything blindly.
- Do not ignore failing tests in CI.
- Do not write tests that do not reflect real user behavior.

---

## Final Principle

> Testing in EntrenaGo should provide confidence in critical flows without slowing down development or overcomplicating the codebase.

# 21. Git Workflow

## Overview

EntrenaGo follows a structured Git workflow designed to ensure code quality, collaboration readiness, and safe production deployments. The workflow is based on feature branching and pull request reviews.

---

## Core Philosophy

- Keep the main branch stable at all times.
- All changes must be introduced through feature branches.
- Code must be reviewed before merging.
- CI checks must pass before any deployment.
- Maintain a clean and understandable commit history.

---

## Branch Strategy

### Main Branch

- `main`
- Always production-ready.
- Protected branch (no direct commits).

---

### Feature Branches

- Used for all new features and fixes.
- Created from `main`.
- Naming convention:

```txt
feature/<feature-name>
fix/<issue-name>
refactor/<area>
```

---

### Examples

- `feature/auth-login-flow`
- `feature/routine-creation`
- `fix/password-reset-bug`
- `refactor/routine-service`

---

## Development Flow

1. Create a feature branch from `main`.
2. Implement changes in small, focused commits.
3. Run local checks (lint, typecheck, build).
4. Push branch to remote repository.
5. Open a Pull Request.
6. CI runs automated checks.
7. Code review is performed.
8. Merge into `main` after approval.

---

## Commit Guidelines

- Use clear and descriptive commit messages.
- Prefer conventional structure when possible:

```txt
feat: add routine creation form
fix: resolve password reset redirect issue
refactor: simplify auth service logic
```

---

## Pull Request Rules

- Every PR must describe the purpose of the change.
- PRs should be small and focused.
- Avoid mixing unrelated changes in one PR.
- All CI checks must pass before merging.
- Code must follow project architecture and standards.

---

## CI/CD Strategy

- Vercel handles deployment automatically.
- Build fails if:
  - TypeScript errors exist.
  - Linting fails.
  - Tests fail.
- Only successful builds are deployed.

---

## Code Review Principles

- Focus on correctness, readability, and maintainability.
- Ensure consistency with existing patterns.
- Avoid introducing unnecessary complexity.
- Verify alignment with architecture and design rules.

---

## Hotfix Strategy

- Hotfix branches are allowed for critical production issues.
- Must follow expedited review process.
- Should be merged back into `main` immediately after fix.

---

## Anti-Patterns (Do NOT)

- Do not commit directly to `main`.
- Do not merge without review or CI passing.
- Do not mix multiple features in one branch.
- Do not ignore failing checks.
- Do not bypass the workflow for convenience.

---

## Final Principle

> Every change in EntrenaGo must be traceable, reviewable, and safe to deploy at all times.

# 22. Future Roadmap

## Overview

EntrenaGo is designed to evolve incrementally from a solid MVP into a full fitness ecosystem. The roadmap focuses on expanding functionality while maintaining a stable and maintainable core architecture.

---

## Phase 1 — MVP Foundation (Current)

- User authentication system.
- User onboarding flow.
- Profile management.
- Workout routine creation and management.
- Responsive web application.
- Supabase integration (Auth + PostgreSQL).
- Basic UI system and design consistency.

---

## Phase 2 — Core Experience Expansion

- Improved workout routine builder.
- Enhanced UI/UX refinements.
- Workout execution flow (guided training sessions).
- Progress tracking basics.
- User experience improvements across onboarding and routines.
- Initial performance optimizations.

---

## Phase 3 — Personalization & Intelligence

- Intelligent routine suggestions.
- Adaptive training plans based on user behavior.
- Personalized dashboards.
- Basic analytics and insights.
- Improved motivation and engagement features.

---

## Phase 4 — Coaching & Social Layer

- Trainer and coach user roles.
- Client management system for coaches.
- Shared routines between trainers and users.
- Communication tools between users and coaches.
- Team or group-based training support.

---

## Phase 5 — Advanced Features & Mobile Expansion

- Full mobile experience optimization.
- Push notifications.
- Offline support (progress tracking and workouts).
- Real-time updates where necessary.
- Enhanced performance tracking and analytics.

---

## Phase 6 — Ecosystem Expansion

- AI-assisted workout generation.
- Advanced analytics and insights dashboard.
- Integration with external fitness devices or APIs.
- Marketplace or shared routine ecosystem (optional future direction).
- Community-driven features.

---

## Long-Term Vision

EntrenaGo aims to become a complete fitness operating system that supports users from beginner level training all the way to professional coaching and data-driven performance optimization.

---

## Roadmap Philosophy

- Build incrementally on a stable foundation.
- Avoid premature complexity in early phases.
- Validate each phase before expanding.
- Prioritize maintainability over feature speed.
- Ensure every new feature enhances the core training experience.

---

## Final Principle

> The roadmap is a guide, not a commitment — EntrenaGo evolves based on user needs, not feature accumulation.

# 23. Known TODOs

## Overview

This section documents known missing pieces, technical debt, and pending improvements in EntrenaGo. These items are intentionally left incomplete in the current implementation and should be addressed progressively without disrupting the MVP stability.

---

## High Priority TODOs

### TypeScript Strict Mode

- `strict: true` is not yet configured in `tsconfig.json`.
- Recommended to enable for improved type safety and reduced runtime errors.

---

### Forms Standardization

- React Hook Form is not fully standardized across the application.
- Zod schema validation is not consistently applied.
- Some areas still rely on native validation.

---

### API Layer Consistency

- Supabase calls are not fully centralized in a consistent service layer.
- Some data fetching may still occur outside hooks or services.

---

### Zustand Usage

- Zustand is installed but not actively used.
- Decision pending on whether to adopt or remove.

---

## Medium Priority TODOs

### Accessibility Standardization

- WCAG practices are not fully enforced.
- `prefers-reduced-motion` support is not consistently implemented.
- Some components may lack full keyboard navigation support.

---

### Testing Coverage

- Unit and integration tests are not fully implemented.
- Testing strategy exists but is not fully applied across features.
- Critical flows still lack automated coverage.

---

### Error Handling Consistency

- Error handling patterns are not fully standardized across all features.
- Some areas rely on basic or inconsistent error feedback.

---

## Low Priority TODOs

### Prettier Integration

- Prettier is not yet configured in the project.

---

### Notifications System

- No centralized notification/toast system is currently implemented.

---

### Edge Functions

- Supabase Edge Functions are not currently used.
- Future consideration for backend logic expansion.

---

### Storage Layer

- Supabase Storage is not used.
- No media/file upload system currently exists.

---

## Architectural TODOs

- Full standardization of feature-based service layer.
- Complete separation of UI and business logic in all features.
- Ensure all Supabase interactions go through hooks/services only.
- Verify consistent use of React Query across all server state.

---

## UX/UI TODOs

- Onboarding UX refinement.
- Loading states standardization.
- Consistent empty states across features.
- Improved feedback for async actions.

---

## Performance TODOs

- Bundle size optimization review.
- Lazy loading expansion across all routes.
- Re-render optimization audit for key components.

---

## Final Principle

> Known TODOs are not failures — they are intentional improvement points that should be addressed incrementally without compromising the stability of the MVP.

# 24. Decision Log

## Overview

This section records key architectural, technical, and product decisions made in EntrenaGo. It serves as a historical reference to understand why certain choices were made and to ensure consistency in future development.

---

## Decision Records

### 1. Frontend Framework

- **Decision:** Use React with TypeScript
- **Status:** Approved
- **Reason:** Strong ecosystem, component-based architecture, and long-term maintainability.

---

### 2. Build Tool

- **Decision:** Use Vite
- **Status:** Approved
- **Reason:** Fast development server, optimized builds, and modern frontend tooling support.

---

### 3. Styling Approach

- **Decision:** Use Tailwind CSS with utility-first approach
- **Status:** Approved
- **Reason:** Enables consistent design system, rapid UI development, and scalable styling.

---

### 4. Routing Strategy

- **Decision:** Use React Router DOM
- **Status:** Approved
- **Reason:** Mature routing solution with support for nested layouts and protected routes.

---

### 5. Backend Architecture

- **Decision:** Use Supabase as Backend-as-a-Service
- **Status:** Approved
- **Reason:** Provides authentication, PostgreSQL database, and security (RLS) out of the box.

---

### 6. State Management Strategy

- **Decision:** Use hybrid approach (TanStack Query + React Context + optional Zustand)
- **Status:** Approved
- **Reason:** Separates server state, global state, and local UI state clearly.

---

### 7. Server State Management

- **Decision:** Use TanStack Query for all server state
- **Status:** Approved
- **Reason:** Provides caching, synchronization, and request management in a scalable way.

---

### 8. Form Management Strategy

- **Decision:** Use React Hook Form + Zod (planned standard)
- **Status:** In Progress
- **Reason:** Provides scalable validation and improved form handling consistency.

---

### 9. Feature-Based Architecture

- **Decision:** Organize code by features rather than technical layers
- **Status:** Approved
- **Reason:** Improves scalability, separation of concerns, and maintainability.

---

### 10. Authentication System

- **Decision:** Use Supabase Auth (email + OAuth providers)
- **Status:** Approved
- **Reason:** Simplifies authentication while maintaining security and scalability.

---

### 11. Folder Structure Strategy

- **Decision:** Feature-based folder structure inside `src/`
- **Status:** Approved
- **Reason:** Encourages modularity and prevents tight coupling between domains.

---

### 12. Animation Library

- **Decision:** Use Motion (Framer Motion)
- **Status:** Approved
- **Reason:** Provides flexible, performant animations aligned with modern UI standards.

---

### 13. Package Manager

- **Decision:** Use pnpm
- **Status:** Approved
- **Reason:** Faster installs, efficient dependency management, and disk space optimization.

---

### 14. Deployment Platform

- **Decision:** Use Vercel
- **Status:** Approved
- **Reason:** Seamless integration with frontend frameworks and CI/CD support.

---

### 15. Accessibility Approach

- **Decision:** Progressive accessibility (not fully WCAG enforced yet)
- **Status:** In Progress
- **Reason:** Baseline accessibility is applied, with gradual enforcement planned.

---

### 16. Testing Strategy

- **Decision:** Use Vitest + React Testing Library + Storybook
- **Status:** In Progress
- **Reason:** Lightweight testing strategy focused on critical flows and UI consistency.

---

### 17. AI Development Rules

- **Decision:** Introduce formal AI coding rules for all AI-assisted contributions
- **Status:** Approved
- **Reason:** Ensures consistency, maintainability, and predictable AI-generated code.

---

## Final Principle

> Decisions in EntrenaGo are made to optimize long-term maintainability, scalability, and developer clarity over short-term convenience.

# 25. AI Prompt Context

## Overview

This section defines the mandatory context and rules that AI coding assistants must follow when working on EntrenaGo. It acts as a baseline instruction set to ensure all AI-generated output aligns with the project architecture, design system, and engineering philosophy.

---

## Core Instruction for AI

Before generating any code, modifying existing logic, or suggesting architectural changes, AI must:

- Fully respect the existing project structure.
- Reuse existing patterns before introducing new ones.
- Prioritize maintainability above all other concerns.
- Avoid unnecessary complexity or abstraction.
- Follow the established design and architecture conventions.

---

## Engineering Priorities

AI must always optimize in the following order:

1. Maintainability  
2. Readability  
3. Performance  
4. Developer Experience  

---

## Architecture Rules

- Follow feature-based folder structure strictly.
- Keep business logic outside of UI components.
- Use services/hooks for all external data access.
- Do not introduce new architectural patterns without explicit instruction.
- Avoid cross-feature coupling unless absolutely necessary.

---

## State Management Rules

- Use TanStack Query for all server state.
- Never fetch Supabase data directly inside UI components.
- Use React Context only for lightweight global UI state.
- Use Zustand only if explicitly required for performance or complexity reasons.
- Keep local state local unless sharing is strictly necessary.

---

## UI & Design Rules

- Follow the established Design System exactly.
- Do not introduce new visual patterns or styles.
- Maintain consistency across all components.
- Ensure mobile-first responsiveness.
- Respect dark and light mode support.

---

## Component Rules

- Reuse existing components whenever possible.
- Prefer composition over duplication.
- Keep components small, focused, and reusable.
- Avoid embedding business logic inside UI components.
- Ensure all components follow naming conventions and structure rules.

---

## Forms Rules

- Use React Hook Form + Zod as standard approach.
- Keep validation schema separate from UI logic.
- Ensure all forms are accessible and user-friendly.
- Provide clear loading, success, and error states.

---

## Routing Rules

- Use React Router DOM only.
- Keep route definitions centralized.
- Separate public and protected routes clearly.
- Use nested routes for layout consistency.

---

## Database Rules

- All database interactions must go through Supabase.
- Never bypass Row Level Security (RLS).
- Do not expose sensitive logic in the frontend.
- Use services or hooks for all queries and mutations.

---

## Performance Rules

- Avoid premature optimization.
- Use lazy loading for routes and heavy components.
- Keep bundle size minimal.
- Avoid unnecessary re-renders.
- Use memoization only when justified.

---

## Accessibility Rules

- Use semantic HTML by default.
- Ensure full keyboard navigation support.
- Maintain visible focus states.
- Respect `prefers-reduced-motion`.
- Ensure forms and interactions are screen-reader friendly.

---

## Testing Rules

- Focus on critical user flows.
- Test behavior, not implementation details.
- Keep tests simple and maintainable.
- Avoid over-mocking internal logic.

---

## Forbidden Actions

AI must NOT:

- Introduce new dependencies without explicit need.
- Break existing architecture or patterns.
- Mix UI, business logic, and data access layers.
- Create duplicated or inconsistent components.
- Ignore existing conventions for personal preference.
- Over-engineer simple solutions.

---

## AI Behavior Guidelines

- Prefer clarity over abstraction.
- Prefer consistency over novelty.
- Prefer simplicity over cleverness.
- Prefer reuse over reinvention.
- Prefer maintainability over speed of implementation.

---

## Context Awareness

AI must assume:

- The project is production-oriented.
- The architecture is already established and must be respected.
- Changes may impact long-term scalability and maintainability.
- Code will be reviewed and maintained by humans.

---

## Final Principle

> AI contributions to EntrenaGo must behave like an experienced senior engineer joining an existing production codebase: cautious, consistent, and aligned with long-term maintainability.
