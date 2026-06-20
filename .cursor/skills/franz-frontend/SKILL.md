---
name: franz-frontend
description: >-
  Franz frontend template playbook — page layout, design tokens, API/error routing,
  feature state, accessibility, and UI audit gates. Use when building or reviewing
  pages, components, layouts, forms, async UI, or Cursor rules in this template;
  when the user mentions @franz-frontend, page shell, design tokens, feature status,
  or Impeccable-style UI review.
---

# Franz frontend

Production patterns for this **Vite + React + TanStack Query + shadcn** template. Rules in `.cursor/rules/*.mdc` load by file glob; this skill holds **depth, cross-links, and audit checklists** — read it when touching multiple UI concerns or onboarding to the template.

Golden paths:

- Layout: `src/components/layout/`, `src/pages/home/HomePage.tsx`
- Async demo: `src/pages/home/DemoPostSection.tsx`
- API errors: `src/api/lib/apply-field-errors-to-form.ts`

## Principles

1. **Server state in Query; client state in RHF/Zustand** — pages derive one `status` union, not boolean soup (`state.md`).
2. **Client Zod + RHF first; server `fieldErrors` second** — same schema at the boundary when possible (`api.md`).
3. **Semantic tokens only** — no arbitrary Tailwind or hex; rebrand via `src/index.css` (`tokens.md`).
4. **Layout primitives before ad-hoc padding** — `AppPageShell` for app routes; `width="full"` for landing (`layout.md`).
5. **Every data surface has loading, empty, error, success** — no `if (!data) return null` (`errors.md`).
6. **Accessibility is not optional** — skip link, labels, live regions, form error wiring (`a11y.md`).
7. **shadcn first** — use [`shadcn`](../shadcn/SKILL.md) for component CLI, variants, and composition; this skill covers **app architecture** around it.

## Critical rules (always check)

Each links to a file with Incorrect/Correct pairs and checklists.

| Topic                 | Skill depth                                      | Glob rule (auto-loads)                    |
| --------------------- | ------------------------------------------------ | ----------------------------------------- |
| Page shell & rhythm   | [layout.md](./rules/layout.md)                   | `page-layout.mdc`                         |
| Design tokens & theme | [tokens.md](./rules/tokens.md)                   | `design-tokens.mdc`, `theming.mdc`        |
| API layer & errors    | [api.md](./rules/api.md)                         | `api-layer.mdc`, `api-error-routing.mdc`  |
| Feature status unions | [state.md](./rules/state.md)                     | `feature-state.mdc`, `data-ownership.mdc` |
| Async UX & toasts     | [errors.md](./rules/errors.md)                   | `error-handling.mdc`, `async-ui.mdc`      |
| Accessibility         | [a11y.md](./rules/a11y.md)                       | `accessibility.mdc`                       |
| Pre-merge UI gate     | [audit-checklist.md](./rules/audit-checklist.md) | `merge-readiness-check` skill             |

## Full rule index

Glob-triggered rules not duplicated in skill depth files — still **read the `.mdc`** when editing matching paths:

| Rule                              | Scope                                      |
| --------------------------------- | ------------------------------------------ |
| `naming-conventions.mdc`          | Folders, hooks, assets (always apply)      |
| `page-composition.mdc`            | Split large routes; colocate steps/dialogs |
| `frontend-feature-boundaries.mdc` | No cross-feature imports                   |
| `forms-and-drafts.mdc`            | Dirty state, blockers, autosave            |
| `responsive-design.mdc`           | 320px, nav collapse, touch targets         |
| `interaction-polish.mdc`          | Motion, `prefers-reduced-motion`           |
| `performance.mdc`                 | Route-level `React.lazy`                   |
| `offline-reconnect.mdc`           | Cached reads, reconnect banner             |
| `shadcn-ui-usage.mdc`             | Primitives before custom UI                |
| `vitest-testing.mdc`              | Test file mapping                          |
| `zod-validation.mdc`              | `safeParse` at boundaries                  |
| `react-state-zustand.mdc`         | Minimal `useEffect` in pages               |
| `repo-agent-skills.mdc`           | Commit, PR, merge skills (always apply)    |

## Workflow: new page or feature

```
1. API module     → src/api/features/<domain>/ (service, schema, hooks)
2. Status helper  → src/lib/<domain>/ or hook — one union per surface
3. Page folder    → src/pages/<domain>/ thin *Page.tsx + colocated pieces
4. Layout         → AppPageShell + PageHeader (+ width preset)
5. UI states      → loading / empty / error / ready branches
6. Forms          → zodResolver + applyFieldErrorsToForm on server validation
7. Tests          → mirror under src/test/
8. Verify         → pnpm verify
```

## Workflow: UI review

When reviewing pages or components, run [audit-checklist.md](./rules/audit-checklist.md) and cite file paths for failures.

## Repo skills (git)

| Task         | Skill                                                        |
| ------------ | ------------------------------------------------------------ |
| Commit       | [`commit-changes`](../commit-changes/SKILL.md)               |
| PR           | [`create-pull-request`](../create-pull-request/SKILL.md)     |
| Merge ready? | [`merge-readiness-check`](../merge-readiness-check/SKILL.md) |
