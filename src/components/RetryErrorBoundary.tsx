"use client";

import { catchError, type ErrorInfo } from "next/error";

/**
 * Component-level error boundary: if its children throw while rendering, only
 * this part of the page falls back, to `message` and a retry button. `retry`
 * re-renders on the server, so server components inside fetch again.
 *
 * The error itself is never shown. In production it reaches the browser as a
 * digest only; the full error is in the server log.
 */
const RetryFallback = (
  {
    message,
    retryLabel,
    className,
  }: { message: string; retryLabel: string; className?: string },
  { retry }: ErrorInfo,
) => {
  return (
    <div role="alert" className={className}>
      <p className="text-sm text-orange-text">{message}</p>
      <button
        type="button"
        onClick={() => retry()}
        className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-off-white transition-opacity hover:opacity-90"
      >
        {retryLabel}
      </button>
    </div>
  );
};

export const RetryErrorBoundary = catchError(RetryFallback);
