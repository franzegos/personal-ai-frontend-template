# API layer & error routing

Glob rules: `api-layer.mdc`, `api-error-routing.mdc`, `zod-validation.mdc`, `response-mapping.mdc`.

## Feature module layout

```
src/api/features/<domain>/
├── <domain>.service.ts   # axios calls only
├── <domain>.schema.ts    # Zod — shared with forms
├── <domain>.types.ts     # inferred types, mappers
└── use-<domain>.ts       # TanStack Query hooks
```

- Pages and components **do not** call `useQueryClient` for domain cache — hooks own invalidation
- Shared primitives → `src/api/schema/`; shared wrappers → `src/api/types/`
- Untrusted JSON → `safeParse` / `parse` at the boundary

## Two layers of validation

| Layer  | When                 | How                                                   |
| ------ | -------------------- | ----------------------------------------------------- |
| Client | On submit            | RHF + `zodResolver(itemFormSchema)` — blocks `mutate` |
| Server | After 4xx validation | `applyFieldErrorsToForm` on `VALIDATION_ERROR`        |

```tsx
const form = useForm<ItemFormValues>({
  resolver: zodResolver(itemFormSchema),
  defaultValues,
});

form.handleSubmit((values) =>
  mutate(values, {
    onError: (error) => {
      if (isApiError(error) && error.code === "VALIDATION_ERROR") {
        applyFieldErrorsToForm(form.setError, error.fieldErrors);
        return;
      }
      toast.error(error.message ?? "Something went wrong");
    },
  }),
);
```

Use the **same Zod schema** (or equivalent rules) client and server when possible.

## Error routing matrix

| Error kind | Examples                      | Channel                                    |
| ---------- | ----------------------------- | ------------------------------------------ |
| Validation | Bad field shape, out of range | RHF `setError` per field                   |
| Business   | "Item already exists", quota  | Toast or inline `Alert` — not field errors |
| System     | 500, network, timeout         | Toast; retry affordance on reads           |

**Do not** put business logic messages on unrelated fields. **Do not** toast per-field validation errors when the form can show them inline.

## `applyFieldErrorsToForm`

Helper: `src/api/lib/apply-field-errors-to-form.ts`

- Maps server `fieldErrors` record to RHF `setError`
- Wire `aria-describedby` on affected fields (`a11y.md`)

## Mutations

- Disable submit while `isPending`
- `aria-busy` on async buttons
- Invalidate the right query keys in `onSuccess` — list + detail as needed

## Checklist

- [ ] Feature code lives under `src/api/features/<domain>/`
- [ ] Forms use `zodResolver` before network
- [ ] `VALIDATION_ERROR` → `applyFieldErrorsToForm`; other errors → toast/alert
- [ ] Hooks own cache invalidation
- [ ] API responses parsed with Zod at the boundary
