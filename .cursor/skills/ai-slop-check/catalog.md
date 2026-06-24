# AI slop & UI quality catalog

Reference for [SKILL.md](SKILL.md).  
**Type:** `slop` = AI-generated tell · `quality` = hurts usability regardless of author

---

## Visual details

| ID                                | Type | Pattern                          | Detection                                                   | Fix                                                                     |
| --------------------------------- | ---- | -------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------- |
| `slop-side-tab-border`            | slop | Side-tab accent border           | Thick `border-l-*` / one-sided accent on `rounded-*` card   | Remove or use full `border-border`; subtler accent (badge, header tint) |
| `slop-border-accent-rounded`      | slop | Border accent on rounded element | Heavy border color fighting `border-radius`                 | Single treatment: border OR radius emphasis, not clash                  |
| `slop-glassmorphism`              | slop | Glassmorphism everywhere         | `backdrop-blur`, frosted panels, glow borders as decoration | Solid surfaces; blur only for real overlays                             |
| `slop-hairline-wide-shadow`       | slop | Hairline + wide shadow           | 1px border + large diffuse `shadow-*` together              | Pick elevation **or** edge, not both                                    |
| `slop-repeating-gradient-stripes` | slop | Repeating-gradient stripes       | Stripe patterns as surface fill                             | Plain surface or deliberate texture                                     |
| `slop-extreme-radius`             | slop | Extreme border-radius on cards   | `rounded-3xl`+ on small cards/inputs                        | Cards ~`rounded-lg` (12–16px); pills for tags/buttons only              |
| `slop-amateur-svg`                | slop | Amateur hand-drawn SVG           | Crude inline SVG mascots/scenes                             | Real asset or no illustration                                           |

---

## Typography

| ID                             | Type    | Pattern                    | Detection                                                           | Fix                                                                  |
| ------------------------------ | ------- | -------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `slop-flat-type-hierarchy`     | slop    | Flat type hierarchy        | Heading/body sizes too close (<1.25× steps)                         | Fewer sizes, stronger contrast                                       |
| `slop-icon-tile-above-heading` | slop    | Icon tile above heading    | Rounded icon box stacked over feature title in card grid            | Side-by-side icon+title, or inline icon without container            |
| `slop-italic-serif-hero`       | slop    | Italic serif display hero  | Oversized italic serif as primary hero                              | Roman or non-serif display; editorial only if deliberate             |
| `slop-hero-eyebrow`            | slop    | Hero eyebrow / pill chip   | Tiny uppercase tracked label above huge headline                    | Drop, merge into headline, or breadcrumb                             |
| `slop-section-kicker`          | slop    | Repeated section kickers   | Same uppercase eyebrow above every section                          | Stronger structure; artifacts; brand system                          |
| `slop-oversized-hero-headline` | slop    | Oversized hero headline    | Long sentence at `text-5xl`+                                        | Short punchy headline large; long copy smaller                       |
| `slop-crushed-tracking`        | slop    | Crushed letter spacing     | `tracking-tighter` breaking legibility on display                   | Optical tighten only                                                 |
| `slop-overused-font`           | slop    | Overused font              | Inter, Geist, Space Grotesk, Instrument Serif without system reason | Distinctive pairing **or** document exception (Burn Radar: Geist OK) |
| `slop-single-font`             | slop    | Single font for everything | One family for all roles                                            | Display + body pairing **or** documented exception                   |
| `quality-all-caps-body`        | quality | All-caps body              | Long paragraphs in `uppercase`                                      | Uppercase for short labels only                                      |

---

## Color & contrast

| ID                      | Type    | Pattern                | Detection                                           | Fix                              |
| ----------------------- | ------- | ---------------------- | --------------------------------------------------- | -------------------------------- |
| `slop-ai-palette`       | slop    | AI color palette       | Purple/violet→blue gradients, cyan-on-dark defaults | Intentional brand palette        |
| `slop-dark-glow`        | slop    | Dark + glowing accents | Dark bg + colored `shadow` glow on boxes            | Subtle lighting or light theme   |
| `slop-gradient-text`    | slop    | Gradient text          | `bg-clip-text text-transparent` on headings/metrics | Solid semantic colors            |
| `quality-gray-on-color` | quality | Gray text on color     | `text-muted` on tinted/colored panels               | Darker shade of bg or near-white |
| `slop-cream-palette`    | slop    | Cream/beige palette    | Default warm off-white AI marketing surface         | Deliberate background choice     |

---

## Layout & space

| ID                         | Type    | Pattern                   | Detection                                     | Fix                                      |
| -------------------------- | ------- | ------------------------- | --------------------------------------------- | ---------------------------------------- |
| `slop-hero-metrics`        | slop    | Hero metric layout        | Big number + small label + 3 stats + gradient | Use only if data is real and on-brand    |
| `slop-identical-card-grid` | slop    | Identical card grids      | 3–6 same cards: icon, title, blurb            | Vary layout; tables; asymmetric sections |
| `slop-monotonous-spacing`  | slop    | Monotonous spacing        | Same `gap-*` / `p-*` everywhere               | Tight groups, loose sections             |
| `slop-nested-cards`        | slop    | Nested cards              | `Card` wrapping `Card` wrapping `Card`        | Spacing, typography, dividers            |
| `slop-numbered-sections`   | slop    | Numbered markers 01/02/03 | Decorative section numbers                    | Numbers only for real sequences          |
| `quality-line-length`      | quality | Line too long             | Body > ~75–80ch                               | `max-w-prose` / 65–75ch                  |
| `quality-overflow`         | quality | Content overflow          | Horizontal scroll, clipped text               | Wrap, constrain, scroll affordance       |
| `quality-clipped-popover`  | quality | Clipped popover           | `overflow-hidden` parent clips menu/tooltip   | `overflow-visible` or portal             |

---

## Motion

| ID                           | Type    | Pattern                   | Detection                         | Fix                               |
| ---------------------------- | ------- | ------------------------- | --------------------------------- | --------------------------------- |
| `slop-bounce-easing`         | slop    | Bounce/elastic easing     | Spring overshoot on dialogs/cards | `ease-out` quart/quint/expo       |
| `quality-layout-animation`   | quality | Layout property animation | Animating width/height/margin     | `transform`, `opacity`            |
| `slop-image-hover-transform` | slop    | Image hover scale         | `hover:scale-105` on images       | Static or subtle purposeful hover |

---

## Copy

| ID                          | Type    | Pattern              | Detection                                                       | Fix                     |
| --------------------------- | ------- | -------------------- | --------------------------------------------------------------- | ----------------------- |
| `slop-em-dash`              | slop    | Em-dash overuse      | >2 em dashes per screen body                                    | Commas, periods, colons |
| `slop-buzzword`             | slop    | Marketing buzzword   | streamline, empower, supercharge, world-class, enterprise-grade | Specific verbs          |
| `slop-aphorism`             | slop    | Aphoristic cadence   | “Not X. Y.” repeated section endings                            | Plain explanation       |
| `slop-theater`              | slop    | Theater framing      | “growth theater”, “performative” dismissals                     | Say what it does        |
| `quality-redundant-ux-copy` | quality | Redundant UX writing | Label + description + helper say same thing                     | Say once                |

---

## Imagery

| ID                     | Type    | Pattern                  | Detection                   | Fix                  |
| ---------------------- | ------- | ------------------------ | --------------------------- | -------------------- |
| `quality-broken-image` | quality | Broken/placeholder image | Empty `src`, broken `<img>` | Real asset or remove |

---

## General quality

| ID                           | Type    | Pattern               | Detection                            | Fix                                  |
| ---------------------------- | ------- | --------------------- | ------------------------------------ | ------------------------------------ |
| `quality-cramped-padding`    | quality | Cramped padding       | <8px padding in bordered containers  | 12–16px+                             |
| `quality-edge-touching`      | quality | Text touches viewport | Body flush to screen edge            | Container `px-4`+ / `max-w` centered |
| `quality-justified-text`     | quality | Justified text        | `text-justify` on screen body        | `text-left` or `hyphens:auto`        |
| `quality-low-contrast`       | quality | Low contrast text     | Fails WCAG AA 4.5:1 body / 3:1 large | Increase contrast                    |
| `quality-skipped-heading`    | quality | Skipped heading level | h1 → h3 with no h2                   | Sequential headings                  |
| `quality-tight-leading`      | quality | Tight line height     | `leading-tight` on multi-line body   | 1.5–1.7 body                         |
| `quality-tiny-body`          | quality | Tiny body             | <12px body                           | 14px min, 16px ideal                 |
| `quality-wide-tracking-body` | quality | Wide tracking on body | `tracking-wide` on paragraphs        | Tracking on short labels only        |

---

## UX patterns (narrative — no single ID)

| Pattern               | Detection                                                        | Fix                                                   |
| --------------------- | ---------------------------------------------------------------- | ----------------------------------------------------- |
| **Modal abuse**       | Settings/onboarding with scroll + many columns in `Dialog`       | Full page or stepped flow                             |
| **Copy-paste layout** | Hero → metrics → 3-col features → pricing repeated across pages  | Vary section rhythm; operational layouts for apps     |
| **Lazy "impact"**     | Bouncing buttons, wiggling icons, gradient text, floating badges | Motion with purpose; respect `prefers-reduced-motion` |

---

## Specimen → rule quick map

1. **Purple Gradients** → `slop-ai-palette`, `slop-gradient-text`
2. **Lazy Cool** → `slop-glassmorphism`, `slop-dark-glow`, `slop-hairline-wide-shadow`
3. **Lazy Impact** → `slop-bounce-easing`, `slop-gradient-text`, `slop-image-hover-transform`
4. **Side-Tab Cards** → `slop-side-tab-border`
5. **Cardocalypse** → `slop-nested-cards`
6. **Copy-Paste Layouts** → `slop-identical-card-grid`, `slop-hero-metrics`, `slop-section-kicker`, `slop-hero-eyebrow`
7. **Inter Everywhere** → `slop-overused-font`, `slop-single-font`, `slop-flat-type-hierarchy`
8. **Massive Icons** → `slop-icon-tile-above-heading`
9. **Bad Contrast** → `quality-gray-on-color`, `quality-low-contrast`
10. **Redundant UX Writing** → `quality-redundant-ux-copy`
11. **Modal Abuse** → UX patterns table
