import { Controller } from "react-hook-form";
import { createExampleFormSchema } from "@/api/features/examples/examples.schema";
import {
  useCreateExample,
  useExamplesList,
} from "@/api/features/examples/use-examples";
import { getUserFacingApiErrorMessage } from "@/api/lib/api-error-message";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { getExampleListStatus } from "@/lib/examples/exampleListStatus";
import { mapMutationErrorToForm } from "@/lib/forms/mapMutationErrorToForm";
import { useZodForm } from "@/lib/forms/useZodForm";
import { useOnlineStatus } from "@/lib/hooks/use-online-status";

function ExamplesListSkeleton() {
  return (
    <div
      className="flex flex-col gap-2"
      aria-busy="true"
      aria-label="Loading examples"
    >
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

export function ExamplesSection() {
  const form = useZodForm(createExampleFormSchema, {
    defaultValues: { label: "" },
  });
  const { createExample, isCreatingExample } = useCreateExample();
  const {
    data,
    isPending: isListPending,
    isError: isListError,
    isFetching: isListFetching,
    refetch: refetchExamples,
    error: listError,
  } = useExamplesList();
  const listStatus = getExampleListStatus({
    isPending: isListPending,
    isError: isListError,
    items: data?.items,
  });
  const isOnline = useOnlineStatus();

  return (
    <Card size="sm" className="shadow-sm">
      <CardHeader>
        <CardTitle>Examples</CardTitle>
        <CardDescription>
          Golden path — <code className="text-xs">GET/POST /examples</code> on
          personal-ai-backend-template.
        </CardDescription>
        <CardAction>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-muted-foreground h-8"
            disabled={listStatus === "loading" || isListFetching}
            aria-busy={isListFetching}
            onClick={() => void refetchExamples()}
          >
            {isListFetching ? "Refreshing…" : "Refresh"}
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <form
          onSubmit={form.handleSubmit((values) => {
            createExample(values, {
              onSuccess: () => form.reset({ label: "" }),
              onError: mapMutationErrorToForm(form.setError),
            });
          })}
          aria-busy={isCreatingExample}
        >
          <FieldGroup>
            <Controller
              name="label"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={!!fieldState.error}>
                  <FieldLabel htmlFor="example-label">New label</FieldLabel>
                  <Input
                    {...field}
                    id="example-label"
                    placeholder="My first example"
                    aria-invalid={!!fieldState.error}
                    aria-describedby={
                      fieldState.error ? "example-label-error" : undefined
                    }
                  />
                  <FieldDescription>
                    Client Zod blocks empty submits; server validation maps to
                    this field.
                  </FieldDescription>
                  <FieldError
                    id="example-label-error"
                    errors={[fieldState.error]}
                  />
                </Field>
              )}
            />
            <Button
              type="submit"
              size="sm"
              disabled={isCreatingExample}
              aria-busy={isCreatingExample}
              className="w-full sm:w-auto"
            >
              {isCreatingExample ? "Creating…" : "Create example"}
            </Button>
          </FieldGroup>
        </form>

        <div className="border-border border-t pt-6">
          {listStatus === "loading" ? <ExamplesListSkeleton /> : null}
          {listStatus === "error" ? (
            <Alert variant="destructive">
              <AlertTitle>
                {!isOnline ? "You're offline" : "Couldn't load examples"}
              </AlertTitle>
              <AlertDescription className="flex flex-col gap-3">
                <p className="text-pretty">
                  {!isOnline
                    ? "Connect to the internet and try again."
                    : getUserFacingApiErrorMessage(listError)}
                </p>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="w-full sm:w-auto"
                  disabled={isListFetching}
                  aria-busy={isListFetching}
                  onClick={() => void refetchExamples()}
                >
                  {isListFetching ? "Retrying…" : "Retry"}
                </Button>
              </AlertDescription>
            </Alert>
          ) : null}
          {listStatus === "empty" ? (
            <div className="border-border bg-muted/30 flex flex-col gap-3 rounded-lg border border-dashed p-4">
              <p className="text-muted-foreground text-sm text-pretty">
                No examples yet — create one above. Is the API running on port
                3000?
              </p>
            </div>
          ) : null}
          {listStatus === "ready" ? (
            <ul className="flex flex-col gap-2">
              {data!.items.map((example) => (
                <li
                  key={example.id}
                  className="border-border flex items-center justify-between gap-3 rounded-lg border px-3 py-2"
                >
                  <span className="font-medium">
                    {example.label ?? "Untitled"}
                  </span>
                  <span className="text-muted-foreground text-xs tabular-nums">
                    {example.id.slice(0, 8)}…
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
