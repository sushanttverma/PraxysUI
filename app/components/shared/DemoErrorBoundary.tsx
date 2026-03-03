"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary that catches rendering errors in component demos.
 * Prevents a single broken demo from crashing the entire page.
 */
export default class DemoErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[DemoErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-4 text-center">
          <p className="text-xs font-medium text-ignite/80">Preview unavailable</p>
          <p className="text-[10px] text-text-faint">
            {this.state.error?.message ?? "An error occurred"}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
