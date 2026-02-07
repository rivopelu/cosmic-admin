---
trigger: always_on
---

# Project Rules & Guidelines

## 1. Tech Stack

- **Framework**: Vite + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + Radix UI (Headless) + Lucide Icons + shadcn/ui
- **State Management**:
  - Server State: `@tanstack/react-query`
  - Client State: `@tanstack/react-store` & React Context
- **Routing**: `@tanstack/react-router`
- **Forms**: Formik + Zod (Preferred over Yup)

## 2. Architecture: Layered Pattern

1.  **Presentation Layer** (`src/pages`, `src/components`, `src/routes`):
    - UI components and routing logic.
    - Pages should delegate logic to custom hooks or repositories.
2.  **Domain/Logic Layer** (`src/hooks`, `src/store`):
    - Reusable logic in hooks.
    - Global state in store.
3.  **Data Access Layer** (`src/repositories`, `src/services`):
    - **Repositories**: encapsulation of API calls. ONE repository per entity.
    - **Services**: Low-level operational logic (HTTP, Error handling).

## 3. Coding Standards

- **TypeScript**:
  - Avoid `any`. Use specific types or Generics.
  - Define response types in `src/types/response`.
- **Components**:
  - Colocate distinct features in `src/components/{feature}`.
  - Use `src/components/ui` for generic, reusable UI elements.
  - Functional components with named exports.
- **Naming Conventions**:
  - Files: `PascalCase.tsx` for components, `camelCase.ts` for logic/hooks.
  - Hooks: `useHookName`.
  - Repositories: `EntityRepository`.
- **State Management**:
  - Use `useQuery` for ALL data fetching.
  - Use `authStore` for authentication state.

## 4. Workflow

- **New Features**:
  1.  Define Types (`src/types`).
  2.  Create/Update Repository (`src/repositories`).
  3.  Create/Update Hook (if complex).
  4.  Build UI Component (`src/components`).
  5.  Integrate in Page/Route (`src/routes`).
