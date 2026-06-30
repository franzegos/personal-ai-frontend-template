# Personal AI Frontend Template

## Description

My personal production-ready Vite + React starter. Cursor rules, skills, and an app shell agents already understand — feature-first API modules, TanStack Query, shadcn/ui, and guardrails for security, async UX, and forms.

## Key Features

- **Vite 7 + React 19 + TypeScript** — fast dev, strict typecheck in CI
- **Feature-first API layer** — `src/api/features/<domain>/` (service, schema, types, hooks)
- **TanStack Query** — server state, cache, mutations; Zustand for client-only state
- **React Hook Form + Zod** — `useZodForm`, shadcn `Field`, server `fieldErrors` via `mapMutationErrorToForm`
- **shadcn/ui** — Radix primitives, semantic tokens, interaction-polish rules
- **React Router** — layout shell, `ProtectedRoute` ready for your auth layer
- **Vitest** — API, lib, and page tests with `renderWithProviders`
- **Cursor rules & skills** — commit, PR, merge-readiness, shadcn MCP
- **Golden-path demo** — `ExamplesSection` (`GET/POST /examples`, RHF form, async list states), `OfflineBanner`
- **`pnpm verify`** — format, lint, typecheck, test, build (same gates as CI)

## Pre-requisites

| Tool    | Version / notes                             |
| ------- | ------------------------------------------- |
| Node.js | 20+                                         |
| pnpm    | 10 (see `packageManager` in `package.json`) |

## Local Environment Setup

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Set `VITE_API_URL` to your backend (`http://localhost:3000` by default).

### 3. Run the dev server

```bash
pnpm dev
```

| URL                   | What               |
| --------------------- | ------------------ |
| http://localhost:5173 | App (Vite default) |

### 4. Verify before push

```bash
pnpm verify
```

Same pipeline as CI: Prettier, ESLint, `tsc`, Vitest, production build.

### 5. Add a feature

Create a module under `src/api/features/<domain>/`:

```
src/api/features/items/
├── items.service.ts
├── items.schema.ts
├── items.types.ts
└── use-items.ts
```

Add pages under `src/pages/<domain>/`, mappers under `src/lib/<domain>/`. Follow [api-layer](.cursor/rules/api/api-layer.mdc) and [frontend-feature-boundaries](.cursor/rules/api/frontend-feature-boundaries.mdc).

Mirror tests under `src/test/api/features/<domain>/` — see [vitest-testing](.cursor/rules/testing/vitest-testing.mdc).

### Useful scripts

| Script          | Purpose                              |
| --------------- | ------------------------------------ |
| `pnpm verify`   | Format, lint, typecheck, test, build |
| `pnpm dev`      | Vite dev server                      |
| `pnpm build`    | Typecheck + production build         |
| `pnpm test:run` | Vitest once                          |
| `pnpm lint`     | ESLint                               |
| `pnpm format`   | Prettier write                       |

## Documentation

| Doc                                                                     | Contents                                                                                                          |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [Rule index](.cursor/skills/SKILL.md)                                   | Map of all rules by category (`core/`, `api/`, `state/`, `pages/`, `ui/`, …)                                      |
| [API layer](.cursor/rules/api/api-layer.mdc)                            | Feature modules, services, Query hooks, OpenAPI-ready layout                                                      |
| [Feature boundaries](.cursor/rules/api/frontend-feature-boundaries.mdc) | Pages, API, lib ownership; no cross-feature imports                                                               |
| [Error handling](.cursor/rules/state/error-handling.mdc)                | Status unions; loading, empty, error, success — no silent blank UI                                                |
| [Forms & drafts](.cursor/rules/forms/forms-and-drafts.mdc)              | Unsaved changes, blockers, autosave, draft recovery                                                               |
| [Offline & reconnect](.cursor/rules/state/offline-reconnect.mdc)        | Sleep, tab resume, reconnect — cached data + retry                                                                |
| [Frontend security](.cursor/rules/security/frontend-security.mdc)       | Permissions are UX only; backend is source of truth                                                               |
| [Data ownership](.cursor/rules/state/data-ownership.mdc)                | Query vs RHF vs useState vs Zustand; minimal effects                                                              |
| [Interaction polish](.cursor/rules/ui/interaction-polish.mdc)           | Motion, feedback, keyboard, perceived performance                                                                 |
| [Page composition](.cursor/rules/pages/page-composition.mdc)            | Split large routes; colocate steps and dialogs                                                                    |
| [Page layout](.cursor/rules/pages/page-layout.mdc)                      | `AppPageShell`; responsive reflow; touch targets; zone hierarchy; mobile CTAs                                     |
| [Design tokens](.cursor/rules/ui/design-tokens.mdc)                     | Semantic tokens, shadcn primitives, ThemeProvider, dark mode — no arbitrary values                                |
| [Accessibility](.cursor/rules/forms/accessibility.mdc)                  | Labels, skip link, live regions, form error wiring, keyboard                                                      |
| [Incident log](docs/incident-log.md)                                    | Track AI mistakes; promote to rules after 3×                                                                      |
| [API response samples](docs/api-response-samples.md)                    | Success/error envelopes, interceptor unwrapping, form vs toast routing                                            |
| [Theming](#theming)                                                     | shadcn Create presets                                                                                             |
| [Cursor rules](.cursor/rules/)                                          | Categorized rules — start with [SKILL.md](.cursor/skills/SKILL.md) or `core/naming-conventions` + `api/api-layer` |

### Cursor skills

| Skill                                                | Example                           |
| ---------------------------------------------------- | --------------------------------- |
| [`.cursor/skills/SKILL.md`](.cursor/skills/SKILL.md) | rule index — which `.mdc` applies |
| `@commit-changes`                                    | commit my changes                 |
| `@create-pull-request`                               | open PR to `main`                 |
| `@merge-readiness-check`                             | ready to merge?                   |

PR body uses `.github/PULL_REQUEST_TEMPLATE.md` (not Cursor's global PR format).

### Cursor rules (by folder)

| Folder      | Rules                                                                                                 |
| ----------- | ----------------------------------------------------------------------------------------------------- |
| `core/`     | `ponytail-rules`, `naming-conventions`, `repo-agent-skills` (always apply)                            |
| `api/`      | `api-layer`, `api-error-routing`, `zod-validation`, `response-mapping`, `frontend-feature-boundaries` |
| `state/`    | `error-handling`, `data-ownership`, `async-ui`, `offline-reconnect`                                   |
| `pages/`    | `page-composition`, `page-layout`                                                                     |
| `ui/`       | `design-tokens`, `icons-and-assets`, `interaction-polish`, `delight-ux`, `performance`                |
| `forms/`    | `forms-and-drafts`, `accessibility`                                                                   |
| `copy/`     | `ui-microcopy`, `marketing-copy`                                                                      |
| `security/` | `route-protection`, `frontend-security`                                                               |
| `testing/`  | `vitest-testing`                                                                                      |

Full map: [`.cursor/skills/SKILL.md`](.cursor/skills/SKILL.md).

### shadcn/ui

```bash
pnpm dlx shadcn@latest add card dialog -y
```

Prefer installed shadcn components; community registries need your approval before install. Enable the shadcn MCP in `.cursor/mcp.json`.

## Theming

Use [shadcn Create](https://ui.shadcn.com/create) (Vite · Radix), then:

```bash
pnpm dlx shadcn@latest apply <preset-code> --only theme -y
```

`--only theme` updates mainly `src/index.css`. Re-add the pointer block in that file if a theme apply overwrites it. [Docs](https://ui.shadcn.com/docs/cli#apply).

## Stack

React 19, Vite 7, TypeScript, Tailwind v4, shadcn/ui (Radix), React Router, TanStack Query, Zustand, Axios, Zod, Sonner, Vitest.
