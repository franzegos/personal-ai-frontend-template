# Page layout

Glob rule: `page-layout.mdc`. Related: `page-composition.mdc`, `responsive-design.mdc`, `design-tokens.mdc`.

Golden reference: `src/components/layout/`, `src/pages/home/HomePage.tsx`.

## When to use `AppPageShell`

| Page type                  | Layout approach                                                 |
| -------------------------- | --------------------------------------------------------------- |
| App / dashboard / settings | `AppPageShell` + `PageHeader`                                   |
| Marketing / landing        | `width="full"` or custom full-bleed — no global `max-w-3xl` cap |
| Auth card                  | `width="narrow"` or centered card outside shell                 |

Pick width **per route** — adjust presets in `layout.constants.ts`.

## Primitives

| Component           | Purpose                                                    |
| ------------------- | ---------------------------------------------------------- |
| `AppPageShell`      | Page padding, vertical zones (`gap-8`), optional max-width |
| `PageHeader`        | Title + description + optional action                      |
| `PageSection`       | Major zones; `bordered` for phase changes                  |
| `PageFooterActions` | Stacked mobile CTAs, `border-t` separation                 |

```tsx
// Good — app page
<AppPageShell width="default">
  <PageHeader title="Items" description="Manage your workspace." action={<Actions />} />
  <PageSection className="gap-3">{alerts}</PageSection>
  <PageSection bordered className="gap-6">{workspace}</PageSection>
</AppPageShell>

// Good — landing
<AppPageShell width="full">
  <section>{/* hero */}</section>
  <section className="mx-auto max-w-5xl">{/* inner cap per section */}</section>
</AppPageShell>
```

## Width presets

| `width`   | Default      | Typical use             |
| --------- | ------------ | ----------------------- |
| `default` | `max-w-3xl`  | Standard app column     |
| `profile` | `max-w-2xl`  | Focused forms, settings |
| `narrow`  | `max-w-lg`   | Auth, compact panels    |
| `full`    | `max-w-none` | Landing, wide layouts   |

When nav and body share a column, use the same `appContentWidthClass` + `appContentPaddingClass` from `@/components/layout`.

## Spacing rhythm

| Level            | Gap             | Use                                              |
| ---------------- | --------------- | ------------------------------------------------ |
| Page zones       | `gap-8`         | `AppPageShell` between header, alerts, workspace |
| Section interior | `gap-4`–`gap-6` | Tabs → toolbar → card                            |
| Alerts stack     | `gap-3`         | Multiple `Alert` components                      |
| Title block      | `gap-1`         | `PageHeader`                                     |
| Dense lists      | `gap-2`         | Rows, metadata                                   |

```tsx
// Bad — flat gap-6; everything competes equally
<div className="flex flex-col gap-6">...</div>

// Good — phased zones
<PageSection className="gap-3">{alerts}</PageSection>
<PageSection bordered className="gap-6">{workspace}</PageSection>
```

## Visual hierarchy

- Page title → `PageHeader` `h1`
- Status / alerts → above workspace, `gap-3`
- Primary workspace → `border-t pt-8`
- List metadata → flat rows, not nested `CardContent` for one line
- Long copy → `text-pretty` on descriptions

## Mobile

- Primary CTAs → `w-full sm:w-auto`
- Footer actions → `PageFooterActions` or `border-t pt-6` + stacked buttons
- Icon controls → `min-h-11 min-w-11`

## Loading & empty

- Skeleton mirrors final structure — not one gray block
- Empty states teach — dashed border + hint

## Checklist

- [ ] App routes use `AppPageShell` or documented full-bleed layout
- [ ] Width preset matches route (`narrow` / `default` / `full`)
- [ ] Chrome and body columns align when both constrained
- [ ] Major phases separated (`gap-8`, `border-t pt-8`)
- [ ] Primary mobile CTAs full-width
- [ ] Skeletons and empty states match structure
