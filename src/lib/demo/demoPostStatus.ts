import type { DemoPost } from "@/api/features/demo/demo.schema";

export type DemoPostStatus = "loading" | "error" | "empty" | "ready";

export type DemoPostQuerySlice = {
  isPending: boolean;
  isError: boolean;
  data: DemoPost | undefined;
};

export function getDemoPostStatus({
  isPending,
  isError,
  data,
}: DemoPostQuerySlice): DemoPostStatus {
  if (isPending) return "loading";
  if (isError && !data) return "error";
  if (!data) return "empty";
  return "ready";
}
