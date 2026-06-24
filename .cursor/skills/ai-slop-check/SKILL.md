---
name: ai-slop-check
description: >-
  Audits UI and marketing pages for AI-generated design tells (gradients,
  side-tab cards, glassmorphism, hero eyebrows, nested cards, buzzword copy).
  Use when the user says "AI slop check", "check for AI slop", "review pages
  for AI slop elements", or wants a todo list to de-genericize frontend UI.
disable-model-invocation: true
---

# AI slop check

Find **AI slop** (recognizable generated-UI tells) and **general quality** issues (contrast, spacing, a11y). Produce a **findings report** and a **prioritized todo list**. Do not auto-fix unless the user asks.

**Canonical home:** this folder in `personal-ai-frontend-template`. Copy `.cursor/skills/ai-slop-check/` into other frontend repos; add project-specific `exceptions.md` (or a named override like `burn-radar.md`). Do **not** install under `~/.cursor/skills/`.

## Triggers

Apply when the user says any of:

- `AI slop check`
- `Check my current UI for AI slop`
- `Review pages for AI slop`
- `De-slop this page / component`
- `Does this look like AI generated UI?`

## Scope

| User intent                     | What to review                                  |
| ------------------------------- | ----------------------------------------------- |
| Current file / selection        | That file + imported children                   |
| Named page or route             | Page component + layout + copy in that flow     |
| `src/pages/`, `src/components/` | App pages, shells, marketing if in repo         |
| Marketing site                  | Landing/marketing components (separate repo OK) |
| Whole project                   | Renderer/UI first; skip unrelated backend       |

Ask once if scope is ambiguous. Default: **files the user has open** or **most recently edited page**.

## Workflow

1. **Read project context** (if present):
   - [exceptions.md](exceptions.md) in this skill folder (edit per project after copying)
   - `docs/design.md`, `DESIGN.md`, design tokens, `tailwind.config`, brand guidelines
2. **Read the rule catalog:** [catalog.md](catalog.md) — AI slop + quality rules
3. **Inspect UI** — TSX/CSS, class names, copy strings, motion, typography, layout
4. **Apply [exceptions.md](exceptions.md)** — do not flag intentional product choices
5. **Write the report** (template below)
6. **Emit todo list** — actionable, ordered P0 → P2, with file paths

Optional: after slop check, mention [merge-readiness-check](../merge-readiness-check/SKILL.md) for rules + Impeccable gate on touched UI.

## Severity

| Level  | Label               | Meaning                                           |
| ------ | ------------------- | ------------------------------------------------- |
| **P0** | Slop — ship blocker | Instant “AI generated” tell; undermines trust     |
| **P1** | Slop or quality     | Noticeable; fix before launch/marketing           |
| **P2** | Polish              | Quality rule or mild tell; fix when touching area |
| **OK** | Intentional         | Matches design system — document why              |

## Report template

Use this structure every time:

```markdown
# AI slop review — [scope]

**Summary:** [N] P0 · [N] P1 · [N] P2 · [N] OK intentional

## Top issues (fix first)

1. [One-line highest-impact finding]
2. …

## Findings

| Pri | Rule ID | Pattern | Location    | Problem | Recommended fix |
| --- | ------- | ------- | ----------- | ------- | --------------- |
| P0  | …       | …       | `path:line` | …       | …               |

## Todo list

- [ ] **P0** — [Specific fix] (`path`)
- [ ] **P1** — …

## Intentional (not slop)

- …

## Not reviewed

- …
```

## Quick specimen map

Eleven common “synthetic slop” page archetypes → catalog IDs:

| Specimen                    | Catalog focus                                                            |
| --------------------------- | ------------------------------------------------------------------------ |
| Purple Gradients Everywhere | `slop-ai-palette`, `slop-gradient-text`, `slop-dark-glow`                |
| Lazy "Cool"                 | `slop-glassmorphism`, `slop-dark-glow`, `slop-hairline-wide-shadow`      |
| Lazy "Impact"               | `slop-bounce-easing`, `slop-gradient-text`, `slop-image-hover-transform` |
| Side-Tab Cards              | `slop-side-tab-border`, `slop-border-accent-rounded`                     |
| Cardocalypse                | `slop-nested-cards`                                                      |
| Copy-Paste Layouts          | `slop-identical-card-grid`, `slop-hero-metrics`, `slop-section-kicker`   |
| Inter Everywhere            | `slop-overused-font`, `slop-single-font`, `slop-flat-type-hierarchy`     |
| Massive Icons               | `slop-icon-tile-above-heading`                                           |
| Bad Contrast Choices        | `quality-gray-on-color`, `quality-low-contrast`                          |
| Redundant UX Writing        | Flag in review — redundant label + helper + hint                         |
| Modal Abuse                 | Flag in review — complex multi-column settings in `Dialog`               |

Full rules: [catalog.md](catalog.md). Sample output: [examples.md](examples.md).

## Review heuristics (code)

When scanning TSX/Tailwind/CSS, grep and inspect for:

- `gradient`, `from-violet`, `from-purple`, `to-blue`, `bg-clip-text`, `text-transparent`
- `backdrop-blur`, `glass`, heavy `shadow-*` + `border` together
- `border-l-4`, `border-l-primary`, thick one-side borders on `rounded-*` cards
- `rounded-3xl` / `rounded-[2rem]` on small cards
- `animate-bounce`, `spring`, elastic easing, gratuitous `transition-all`
- Repeated `Card` > `Card` nesting
- `uppercase tracking-widest` eyebrows above every `h1`/`h2`
- `text-5xl`/`text-6xl` on long hero sentences
- Icon in `rounded-lg` box stacked above feature title (grid of 3–6 identical cards)
- `Inter`, `Geist`, `Space Grotesk`, `Instrument Serif` without design-system justification
- Marketing strings: _streamline_, _empower_, _supercharge_, _world-class_, _enterprise-grade_
- Em dashes — more than 2 per screen of body copy
- Settings / multi-step flows crammed into `Dialog` with scroll

## Copy checks

Flag **redundant UX writing** when the same idea appears in label + description + helper + placeholder.

Flag **marketing slop** per `slop-buzzword`, `slop-em-dash`, `slop-aphorism`, `slop-theater` in [catalog.md](catalog.md).

Prefer **specific, operational copy** over generic SaaS marketing.

## Output rules

- Cite **file paths** (and line numbers when useful)
- Todos must be **specific** (“Remove `border-l-4` from `StatCard`; use `border border-border`”) not vague (“improve cards”)
- Separate **AI slop** from **quality** (contrast, line length, heading skip)
- If clean: say so — list what you checked and **residual risks**

## Project overrides

After copying this folder into a product repo, edit [exceptions.md](exceptions.md) or add a named file (e.g. `burn-radar.md`) and reference it from that repo’s copy of this skill.

| Repo               | Also read                                                             |
| ------------------ | --------------------------------------------------------------------- |
| burn-radar-desktop | `burn-radar.md`, `docs/design.md`, `design-review` skill in that repo |
