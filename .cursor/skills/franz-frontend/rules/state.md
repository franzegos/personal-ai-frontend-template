# Feature state & data ownership

Glob rules: `feature-state.mdc`, `data-ownership.mdc`, `react-state-zustand.mdc`.

## Core rule

Each feature surface exposes **one derived `status` union** — not `isLoading && !isSubmitting && …` in JSX.

| Layer                            | Owns                                             |
| -------------------------------- | ------------------------------------------------ |
| TanStack Query / mutations       | Raw fetch/mutation flags                         |
| Feature hook or `getXxxStatus()` | Single `status` union                            |
| Page                             | `switch (status)` or status-driven subcomponents |

## Read surfaces

```typescript
export type ItemListStatus = "loading" | "error" | "empty" | "ready";

export function getItemListStatus(
  query: UseQueryResult<Item[]>,
): ItemListStatus {
  if (query.isPending) return "loading";
  if (query.isError) return "error";
  if (!query.data?.length) return "empty";
  return "ready";
}
```

```tsx
const status = getItemListStatus(query);
switch (status) {
  case "loading":
    return <ItemListSkeleton />;
  case "error":
    return <ItemListError onRetry={() => query.refetch()} />;
  case "empty":
    return <ItemListEmpty />;
  case "ready":
    return <ItemList items={query.data} />;
}
```

## Write surfaces

Combine mutation + optional draft state into one union, e.g. `"idle" | "submitting" | "success" | "error"`.

## Data ownership

| Data                       | Owner                   |
| -------------------------- | ----------------------- |
| Server entities            | TanStack Query          |
| Form draft                 | React Hook Form         |
| Ephemeral UI (open dialog) | `useState` in component |
| Cross-route client state   | Zustand (sparingly)     |

**Do not** mirror Query data into `useState` via `useEffect`. Derive at render.

## Pages

- Minimal `useEffect` — prefer event handlers and Query callbacks
- No `useQueryClient` in pages for domain invalidation
- Wizard/step state → colocated hook under `src/pages/<domain>/`

## Checklist

- [ ] One `status` union per surface
- [ ] Status derived in hook or `src/lib/<domain>/` — not inline in JSX
- [ ] Server data stays in Query
- [ ] No effect-synced copies of query data
