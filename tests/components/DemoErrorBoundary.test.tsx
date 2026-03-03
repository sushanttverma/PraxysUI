import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import DemoErrorBoundary from "@/app/components/shared/DemoErrorBoundary";

// A component that throws on purpose
function Bomb({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) throw new Error("demo crash");
  return <div>Working</div>;
}

describe("DemoErrorBoundary", () => {
  it("renders children when there is no error", () => {
    render(
      <DemoErrorBoundary>
        <Bomb shouldThrow={false} />
      </DemoErrorBoundary>
    );
    expect(screen.getByText("Working")).toBeDefined();
  });

  it("renders the fallback UI when a child throws", () => {
    // Suppress console.error from React's error boundary reporting
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <DemoErrorBoundary>
        <Bomb shouldThrow={true} />
      </DemoErrorBoundary>
    );

    expect(screen.getByText("Preview unavailable")).toBeDefined();
    expect(screen.getByText("demo crash")).toBeDefined();

    spy.mockRestore();
  });

  it("renders custom fallback when provided", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <DemoErrorBoundary fallback={<div>Custom fallback</div>}>
        <Bomb shouldThrow={true} />
      </DemoErrorBoundary>
    );

    expect(screen.getByText("Custom fallback")).toBeDefined();
    spy.mockRestore();
  });
});
