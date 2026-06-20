# Design tokens & theming

Glob rules: `design-tokens.mdc`, `theming.mdc`. shadcn styling: [`shadcn/rules/styling.md`](../../shadcn/rules/styling.md).

All visual styling flows through **semantic Tailwind** backed by CSS variables in `src/index.css`.

## Core rule

**No arbitrary values** (`text-[13px]`, `bg-[#1a1a1a]`, `rounded-[10px]`) and **no hard-coded colors** (hex, `rgb()`, `text-gray-600`, `bg-blue-500`).

| Concern   | Use                                                       | Not                         |
| --------- | --------------------------------------------------------- | --------------------------- |
| Text size | `text-xs` … `text-xl`                                     | `text-[13px]`               |
| Spacing   | `gap-2`, `p-4`, scale `0`–`96`                            | `p-[18px]`                  |
| Radius    | `rounded-sm` … `rounded-xl`                               | `rounded-[10px]`            |
| Colors    | `bg-background`, `text-muted-foreground`, `border-border` | `#fff`, `bg-zinc-900`       |
| Dark mode | Semantic tokens (`.dark` in `index.css`)                  | `bg-white dark:bg-gray-950` |

## Semantic colors

```tsx
// Bad
<p className="text-[#6b7280]">Secondary</p>
<div className="bg-white dark:bg-zinc-900">...</div>

// Good
<p className="text-sm text-muted-foreground">Secondary</p>
<div className="bg-card text-card-foreground border-border">...</div>
```

| Need         | Token                                                        |
| ------------ | ------------------------------------------------------------ |
| Page surface | `bg-background text-foreground`                              |
| Card         | `bg-card text-card-foreground`                               |
| Danger       | `text-destructive`, `variant="destructive"`                  |
| Success      | `text-success`, `bg-success/10` (`--success` in `index.css`) |
| Warning      | `text-warning`, `bg-warning/10`                              |

New brand colors → CSS variable in `:root` / `.dark` + `@theme inline` — not scattered hex.

## Contrast on tinted surfaces

Do not use `text-muted-foreground` on strong tints (`bg-primary/10`) without checking contrast.

```tsx
// Bad — washed out
<div className="bg-primary/10">
  <p className="text-muted-foreground">Summary</p>
</div>

// Good
<div className="bg-primary/10">
  <p className="text-sm text-foreground">Summary</p>
</div>
```

## Theming workflow

1. `ThemeProvider` in app root (`theming.mdc`)
2. User-facing theme toggle on changed UI
3. Smoke-test light + dark before merge
4. shadcn theme apply: `pnpm dlx shadcn@latest apply <preset> --only theme -y` — re-add pointer block in `index.css` if overwritten

## `className` on shadcn primitives

Layout only (`max-w-md`, `flex-1`, `mt-4`) — do not override primitive colors or font sizes.

## Rare exceptions (document in PR)

- Layout math: `max-h-[calc(100vh-4rem)]`
- Third-party embeds
- Animation durations aligned with `interaction-polish.mdc`

Never use exceptions for **colors** or **type scale**.

## Checklist

- [ ] No arbitrary `text-[…]`, `bg-[…]`, `p-[…]`, `rounded-[…]` for design-system concerns
- [ ] No raw palette (`gray-*`, `blue-*`) for UI surfaces
- [ ] No manual `dark:` color pairs
- [ ] Tinted panels use `text-foreground` or emphasis tokens
- [ ] Light + dark smoke-tested
