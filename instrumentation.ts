import * as Sentry from "@sentry/nextjs";

/**
 * Registers Sentry instrumentation for the current Next.js runtime.
 *
 * Dynamically loads the runtime-specific Sentry configuration: when `NEXT_RUNTIME` is `"nodejs"` it imports `./sentry.server.config`, and when `NEXT_RUNTIME` is `"edge"` it imports `./sentry.edge.config`.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

export const onRequestError = Sentry.captureRequestError;