import { describe, expect, it } from "vitest";
import type { DemoPost } from "@/api/features/demo/demo.schema";
import {
  getDemoPostStatus,
  type DemoPostQuerySlice,
} from "@/lib/demo/demoPostStatus";

const samplePost: DemoPost = {
  userId: 1,
  id: 1,
  title: "Title",
  body: "Body",
};

function slice(partial: Partial<DemoPostQuerySlice>): DemoPostQuerySlice {
  return {
    isPending: false,
    isError: false,
    data: undefined,
    ...partial,
  };
}

describe("getDemoPostStatus", () => {
  it("returns loading when pending", () => {
    expect(getDemoPostStatus(slice({ isPending: true }))).toBe("loading");
  });

  it("returns error when failed with no cached data", () => {
    expect(getDemoPostStatus(slice({ isError: true }))).toBe("error");
  });

  it("returns ready when errored but cached data exists", () => {
    expect(getDemoPostStatus(slice({ isError: true, data: samplePost }))).toBe(
      "ready",
    );
  });

  it("returns empty when success without data", () => {
    expect(getDemoPostStatus(slice({}))).toBe("empty");
  });

  it("returns ready when data exists", () => {
    expect(getDemoPostStatus(slice({ data: samplePost }))).toBe("ready");
  });
});
