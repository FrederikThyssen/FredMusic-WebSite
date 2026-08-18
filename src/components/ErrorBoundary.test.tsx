import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ErrorBoundary } from "./ErrorBoundary";
import { reportError } from "../lib/monitoring";

vi.mock("../lib/monitoring", () => ({
  reportError: vi.fn(),
}));

function BrokenComponent() {
  throw new Error("Broken component");
  return null;
}

describe("ErrorBoundary", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the fallback and reports uncaught errors", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);

    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByRole("heading", { name: /une erreur est survenue/i })).toBeInTheDocument();
    expect(reportError).toHaveBeenCalledWith(expect.any(Error), {
      componentStack: expect.stringContaining("BrokenComponent"),
    });

    consoleError.mockRestore();
  });
});
