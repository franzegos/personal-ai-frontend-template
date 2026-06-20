# UI audit checklist (Impeccable-style gate)

Use when reviewing `src/pages`, `src/components`, or `src/layouts` — standalone or as part of [`merge-readiness-check`](../../merge-readiness-check/SKILL.md).

Score each dimension: **pass**, **fail** (cite file), or **N/A**. Any **fail** on accessibility or design tokens is typically **blocking** before merge.

## Accessibility

| Check             | Block if                                                  |
| ----------------- | --------------------------------------------------------- |
| Skip link         | Missing skip to `#main` in root layout                    |
| Labels            | Inputs without `Label` / `aria-label` / `aria-labelledby` |
| Headings ≠ labels | Wizard step title only — no control name                  |
| Form errors       | Missing `aria-invalid` + `aria-describedby`               |
| Live regions      | Generating/streaming UI without `aria-live`               |
| Icon buttons      | Missing `aria-label`                                      |
| Focus             | `outline: none` without visible replacement               |

## Design tokens

| Check            | Block if                                                            |
| ---------------- | ------------------------------------------------------------------- |
| Arbitrary values | `text-[…]`, `bg-[…]`, `p-[…]`, `rounded-[…]` for type/color/spacing |
| Raw palette      | `gray-*`, `blue-*`, hex in components                               |
| Manual dark      | `bg-white dark:bg-zinc-900` instead of semantic tokens              |
| Tinted contrast  | `text-muted-foreground` on strong color washes                      |
| Theme            | Changed UI not smoke-tested light + dark                            |

## Layout & responsive

| Check           | Block if                                                              |
| --------------- | --------------------------------------------------------------------- |
| Shell drift     | Ad-hoc `py-8` + `max-w-*` on every app page instead of `AppPageShell` |
| Width           | Landing forced into `max-w-3xl` when full-bleed intended              |
| Alignment       | Nav wider than page body when both should match                       |
| Mobile overflow | Horizontal scroll at 320px                                            |
| Touch targets   | Custom icon controls &lt; 44×44                                       |
| CTAs            | Primary actions not `w-full sm:w-auto` on mobile                      |

## Async UX

| Check         | Block if                                                |
| ------------- | ------------------------------------------------------- |
| Blank UI      | `if (!data) return null`                                |
| Skeleton      | Single gray block instead of structure-matched skeleton |
| Empty         | Bare text — no teaching empty state                     |
| Double submit | Mutation not disabled / guarded while pending           |
| Error routing | Validation errors toasted instead of form fields        |

## Polish

| Check      | Block if                                                |
| ---------- | ------------------------------------------------------- |
| Motion     | Animations ignore `prefers-reduced-motion`              |
| Hierarchy  | Flat `gap-6` everywhere — no zone separation            |
| Lists      | `CardContent` wrapper for single metadata line          |
| Typography | `text-pretty` missing on long descriptions where needed |

## Report format

```markdown
### UI audit

| Dimension     | Result        | Notes |
| ------------- | ------------- | ----- |
| Accessibility | pass/fail/N/A | …     |
| Design tokens | pass/fail/N/A | …     |
| Layout        | pass/fail/N/A | …     |
| Async UX      | pass/fail/N/A | …     |
| Polish        | pass/fail/N/A | …     |

**Blocking:** (list file:line failures)
**Follow-up:** (non-blocking improvements)
```
