import { describe, expect, it, vi } from "vitest";
import { ApiRequestError } from "@/api/client";
import {
  applyFieldErrorsToForm,
  isApiValidationError,
  parseApiFieldErrors,
} from "@/api/lib/apply-field-errors-to-form";

describe("isApiValidationError", () => {
  it("returns true for VALIDATION_ERROR", () => {
    const error = new ApiRequestError(
      "Validation failed",
      422,
      "VALIDATION_ERROR",
    );
    expect(isApiValidationError(error)).toBe(true);
  });

  it("returns false for business errors", () => {
    const error = new ApiRequestError("Resource conflict", 409, "CONFLICT");
    expect(isApiValidationError(error)).toBe(false);
  });
});

describe("parseApiFieldErrors", () => {
  it("extracts field messages from flattened Zod errors", () => {
    expect(
      parseApiFieldErrors({
        formErrors: [],
        fieldErrors: { userLimit: ["Number must be greater than 0"] },
      }),
    ).toEqual({ userLimit: ["Number must be greater than 0"] });
  });

  it("returns undefined for missing or empty fieldErrors", () => {
    expect(parseApiFieldErrors(undefined)).toBeUndefined();
    expect(
      parseApiFieldErrors({ formErrors: [], fieldErrors: {} }),
    ).toBeUndefined();
  });
});

describe("applyFieldErrorsToForm", () => {
  it("calls setError for each field with server type", () => {
    const setError = vi.fn();

    const applied = applyFieldErrorsToForm(
      { fieldErrors: { userLimit: ["Number must be greater than 0"] } },
      setError,
    );

    expect(applied).toBe(true);
    expect(setError).toHaveBeenCalledWith("userLimit", {
      type: "server",
      message: "Number must be greater than 0",
    });
  });

  it("returns false when there are no field errors", () => {
    const setError = vi.fn();
    expect(applyFieldErrorsToForm(null, setError)).toBe(false);
    expect(setError).not.toHaveBeenCalled();
  });
});
