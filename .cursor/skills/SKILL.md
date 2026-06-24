---
name: frontend-template
description: >-
  Index and onboarding map for this template's .cursor/rules — points to the
  canonical rule files under categorized subfolders; does not duplicate them.
  Use when building or reviewing pages, components, layouts, forms, or async UI;
  when the user mentions "which rule", page shell, design tokens, or
  Impeccable-style UI review.
---

# Frontend template

**Source of truth:** [`.cursor/rules/`](../rules/) — glob-triggered `.mdc` files in category subfolders. This file is only a **map**: which rules apply, how they relate, and golden-path code. **Do not maintain parallel copies of rule content here.**

Rules layout (all under `.cursor/rules/` — no flat `.mdc` at the rules root):

```
core/     api/     state/     pages/     ui/     forms/     security/     testing/
```

Golden paths in `src/`:

- Layout: `src/components/layout/`, `src/pages/home/HomePage.tsx`
- Async demo: `src/pages/home/DemoPostSection.tsx`
- API field errors: `src/api/lib/apply-field-errors-to-form.ts`

## When to use this index vs a rule

| Situation                               | Read                                                                                         |
| --------------------------------------- | -------------------------------------------------------------------------------------------- |
| Editing a file that matches a rule glob | That `.mdc` loads automatically — follow it                                                  |
| New feature spanning API + page + forms | This index → open the linked rules below                                                     |
| "Which rule covers X?"                  | This index                                                                                   |
| UI / merge review                       | [`merge-readiness-check`](./merge-readiness-check/SKILL.md) § Cursor rules + Impeccable gate |
| AI slop / generic UI tells              | [`ai-slop-check`](./ai-slop-check/SKILL.md)                                                  |
| shadcn components / CLI                 | [`shadcn`](./shadcn/SKILL.md)                                                                |

## Rule map (canonical links)

### `core/` — always apply

| Rule                            | Link                                                             |
| ------------------------------- | ---------------------------------------------------------------- |
| Naming                          | [`naming-conventions.mdc`](../rules/core/naming-conventions.mdc) |
| Repo skills (commit, PR, merge) | [`repo-agent-skills.mdc`](../rules/core/repo-agent-skills.mdc)   |

### `api/`

| Rule                         | Link                                                                              |
| ---------------------------- | --------------------------------------------------------------------------------- |
| Feature modules, Query hooks | [`api-layer.mdc`](../rules/api/api-layer.mdc)                                     |
| Zod at boundaries            | [`zod-validation.mdc`](../rules/api/zod-validation.mdc)                           |
| Response mapping             | [`response-mapping.mdc`](../rules/api/response-mapping.mdc)                       |
| Form vs toast errors         | [`api-error-routing.mdc`](../rules/api/api-error-routing.mdc)                     |
| Feature boundaries           | [`frontend-feature-boundaries.mdc`](../rules/api/frontend-feature-boundaries.mdc) |

### `state/`

| Rule                              | Link                                                                |
| --------------------------------- | ------------------------------------------------------------------- |
| One `status` union per surface    | [`feature-state.mdc`](../rules/state/feature-state.mdc)             |
| Query vs RHF vs Zustand           | [`data-ownership.mdc`](../rules/state/data-ownership.mdc)           |
| Minimal `useEffect` in pages      | [`react-state-zustand.mdc`](../rules/state/react-state-zustand.mdc) |
| Loading / empty / error / success | [`error-handling.mdc`](../rules/state/error-handling.mdc)           |
| Pending vs fetching               | [`async-ui.mdc`](../rules/state/async-ui.mdc)                       |
| Offline & reconnect               | [`offline-reconnect.mdc`](../rules/state/offline-reconnect.mdc)     |

### `pages/`

| Rule                            | Link                                                            |
| ------------------------------- | --------------------------------------------------------------- |
| Split large routes              | [`page-composition.mdc`](../rules/pages/page-composition.mdc)   |
| AppPageShell, rhythm, hierarchy | [`page-layout.mdc`](../rules/pages/page-layout.mdc)             |
| Mobile, touch targets           | [`responsive-design.mdc`](../rules/pages/responsive-design.mdc) |

### `ui/`

| Rule                     | Link                                                           |
| ------------------------ | -------------------------------------------------------------- |
| Semantic tokens only     | [`design-tokens.mdc`](../rules/ui/design-tokens.mdc)           |
| ThemeProvider, dark mode | [`theming.mdc`](../rules/ui/theming.mdc)                       |
| shadcn primitives first  | [`shadcn-ui-usage.mdc`](../rules/ui/shadcn-ui-usage.mdc)       |
| Icons & assets           | [`icons-and-assets.mdc`](../rules/ui/icons-and-assets.mdc)     |
| Motion, feedback         | [`interaction-polish.mdc`](../rules/ui/interaction-polish.mdc) |
| Delight (optional)       | [`delight-ux.mdc`](../rules/ui/delight-ux.mdc)                 |
| Route lazy loading       | [`performance.mdc`](../rules/ui/performance.mdc)               |

### `forms/`

| Rule                            | Link                                                          |
| ------------------------------- | ------------------------------------------------------------- |
| Drafts, blockers, autosave      | [`forms-and-drafts.mdc`](../rules/forms/forms-and-drafts.mdc) |
| Labels, skip link, live regions | [`accessibility.mdc`](../rules/forms/accessibility.mdc)       |

### `security/`

| Rule            | Link                                                               |
| --------------- | ------------------------------------------------------------------ |
| Auth gates (UX) | [`route-protection.mdc`](../rules/security/route-protection.mdc)   |
| Permissions UX  | [`frontend-security.mdc`](../rules/security/frontend-security.mdc) |

### `testing/`

| Rule                | Link                                                        |
| ------------------- | ----------------------------------------------------------- |
| Vitest file mapping | [`vitest-testing.mdc`](../rules/testing/vitest-testing.mdc) |

## Workflows (pointers only)

**New page or feature** — read in order:

1. [`api/api-layer.mdc`](../rules/api/api-layer.mdc) + [`api/zod-validation.mdc`](../rules/api/zod-validation.mdc)
2. [`state/feature-state.mdc`](../rules/state/feature-state.mdc) + [`state/error-handling.mdc`](../rules/state/error-handling.mdc)
3. [`pages/page-composition.mdc`](../rules/pages/page-composition.mdc) + [`pages/page-layout.mdc`](../rules/pages/page-layout.mdc)
4. Forms → [`forms/forms-and-drafts.mdc`](../rules/forms/forms-and-drafts.mdc) + [`api/api-error-routing.mdc`](../rules/api/api-error-routing.mdc)
5. [`testing/vitest-testing.mdc`](../rules/testing/vitest-testing.mdc) → `pnpm verify`

**UI / merge review** → [`merge-readiness-check`](./merge-readiness-check/SKILL.md) (§8 rules table + Impeccable gate).

## Related skills

| Task          | Skill                                                       |
| ------------- | ----------------------------------------------------------- |
| Commit        | [`commit-changes`](./commit-changes/SKILL.md)               |
| PR            | [`create-pull-request`](./create-pull-request/SKILL.md)     |
| Merge ready?  | [`merge-readiness-check`](./merge-readiness-check/SKILL.md) |
| AI slop check | [`ai-slop-check`](./ai-slop-check/SKILL.md)                 |
| shadcn UI     | [`shadcn`](./shadcn/SKILL.md)                               |
