# AI Coding Rules

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

# AI Prompt Context

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
