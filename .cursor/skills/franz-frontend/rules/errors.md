# Error handling & async UI

Glob rules: `error-handling.mdc`, `async-ui.mdc`. API routing: [api.md](./api.md).

## Core rule

Every data surface implements **loading, empty, error, and success** — no silent blank UI.

```tsx
// Bad
if (!data) return null;

// Good — use feature status union (state.md)
switch (status) {
  case "loading":
    return <Skeleton />;
  case "error":
    return <ErrorPanel onRetry={refetch} />;
  case "empty":
    return <EmptyState />;
  case "ready":
    return <Content data={data} />;
}
```

## Reads (Query)

| State   | Pattern                                          |
| ------- | ------------------------------------------------ |
| Loading | `Skeleton` matching final layout — not one blob  |
| Error   | Message + retry; `role="alert"` when appropriate |
| Empty   | Teach next step — dashed border, CTA             |
| Ready   | Content                                          |

## Writes (mutations)

| State   | Pattern                                          |
| ------- | ------------------------------------------------ |
| Pending | Disabled button, `aria-busy`, label `Saving…`    |
| Success | Toast or inline confirmation; invalidate queries |
| Error   | Field errors OR toast per [api.md](./api.md)     |

## Toasts

- Use `sonner` — `toast.success`, `toast.error`
- Business/system failures humans must notice
- Not for per-field validation (form handles that)

## Generating / streaming

When UI updates without a full reload (AI output, progress):

```tsx
<section aria-live="polite" aria-busy={isGenerating}>
  {content}
</section>
```

## Offline

See `offline-reconnect.mdc` — cached reads, reconnect refetch, `OfflineBanner`, no `location.reload` on `online`.

## Checklist

- [ ] No `return null` for loading/error/empty
- [ ] Skeletons mirror structure
- [ ] Empty states actionable
- [ ] Mutations guard double-submit
- [ ] Toasts only for non-field failures
- [ ] Generating UI uses `aria-live`
