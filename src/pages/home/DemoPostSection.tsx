import { useDemoPost } from "@/api/features/demo/use-demo";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getDemoPostStatus } from "@/lib/demo/demoPostStatus";
import { getUserFacingApiErrorMessage } from "@/api/lib/api-error-message";
import { mapDemoPostToCard } from "@/lib/demo/mapDemoPostToCard";
import { useOnlineStatus } from "@/lib/hooks/use-online-status";

function DemoPostSkeleton() {
  return (
    <div
      className="flex flex-col gap-4"
      aria-busy="true"
      aria-label="Loading post"
    >
      <div className="flex items-center justify-between gap-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-8 w-20" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    </div>
  );
}

type DemoPostErrorProps = {
  message: string;
  offline: boolean;
  onRetry: () => void;
  isRetrying: boolean;
};

function DemoPostError({
  message,
  offline,
  onRetry,
  isRetrying,
}: DemoPostErrorProps) {
  return (
    <Alert variant="destructive">
      <AlertTitle>
        {offline ? "You're offline" : "Couldn't load sample post"}
      </AlertTitle>
      <AlertDescription className="flex flex-col gap-3">
        <p className="text-pretty">
          {offline
            ? "Connect to the internet and try again."
            : message || "Check your connection and try again."}
        </p>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="w-full sm:w-auto"
          disabled={isRetrying}
          aria-busy={isRetrying}
          onClick={onRetry}
        >
          {isRetrying ? "Retrying…" : "Retry"}
        </Button>
      </AlertDescription>
    </Alert>
  );
}

type DemoPostEmptyProps = {
  onRetry: () => void;
  isRetrying: boolean;
};

function DemoPostEmpty({ onRetry, isRetrying }: DemoPostEmptyProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-dashed border-border bg-muted/30 p-4">
      <p className="text-sm text-pretty text-muted-foreground">
        No post data yet. Set{" "}
        <code className="text-xs text-foreground">VITE_API_URL</code> to a JSON
        API (e.g. JSONPlaceholder) and fetch a sample.
      </p>
      <Button
        type="button"
        size="sm"
        className="w-full sm:w-auto"
        disabled={isRetrying}
        aria-busy={isRetrying}
        onClick={onRetry}
      >
        {isRetrying ? "Retrying…" : "Retry"}
      </Button>
    </div>
  );
}

type DemoPostReadyProps = {
  headline: string;
  excerpt: string;
  isRefreshing: boolean;
  showStaleWarning: boolean;
  refreshErrorMessage?: string;
};

function DemoPostReady({
  headline,
  excerpt,
  isRefreshing,
  showStaleWarning,
  refreshErrorMessage,
}: DemoPostReadyProps) {
  return (
    <div className="flex flex-col gap-3">
      {showStaleWarning && (
        <Alert variant="destructive">
          <AlertTitle>Couldn't refresh</AlertTitle>
          <AlertDescription className="text-pretty">
            {refreshErrorMessage ??
              "Showing saved data. Check your connection and try again."}
          </AlertDescription>
        </Alert>
      )}
      {isRefreshing && (
        <p
          className="text-sm text-muted-foreground"
          role="status"
          aria-live="polite"
        >
          Refreshing…
        </p>
      )}
      <div className="flex flex-col gap-2">
        <p className="text-sm leading-snug font-medium text-pretty">
          {headline}
        </p>
        <p className="text-sm text-pretty leading-relaxed text-muted-foreground">
          {excerpt}
        </p>
      </div>
    </div>
  );
}

export function DemoPostSection() {
  const {
    data: post,
    isPending,
    isError,
    isFetching,
    refetch,
    error,
  } = useDemoPost();
  const status = getDemoPostStatus({ isPending, isError, data: post });
  const isOnline = useOnlineStatus();

  const handleRetry = () => {
    void refetch();
  };

  return (
    <Card size="sm" className="shadow-sm">
      <CardHeader>
        <CardTitle>Sample request</CardTitle>
        <CardAction>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-muted-foreground h-8"
            disabled={status === "loading" || isFetching}
            aria-busy={isFetching}
            onClick={handleRetry}
          >
            {isFetching ? "Refreshing…" : "Refresh"}
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        {status === "loading" && <DemoPostSkeleton />}
        {status === "error" && (
          <DemoPostError
            message={getUserFacingApiErrorMessage(error)}
            offline={!isOnline}
            onRetry={handleRetry}
            isRetrying={isFetching}
          />
        )}
        {status === "empty" && (
          <DemoPostEmpty onRetry={handleRetry} isRetrying={isFetching} />
        )}
        {status === "ready" && post && (
          <DemoPostReady
            {...mapDemoPostToCard(post)}
            isRefreshing={isFetching && isOnline}
            showStaleWarning={isError}
            refreshErrorMessage={error?.message}
          />
        )}
      </CardContent>
    </Card>
  );
}
