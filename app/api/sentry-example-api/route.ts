import * as Sentry from "@sentry/nextjs";
export const dynamic = "force-dynamic";

class SentryExampleAPIError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = "SentryExampleAPIError";
  }
}

/**
 * API route handler used to trigger a backend error for Sentry testing.
 *
 * Logs the invocation via Sentry and throws a SentryExampleAPIError to simulate a server-side failure.
 *
 * @throws SentryExampleAPIError when the route is called; the error message indicates it was raised on the backend called by the example page.
 */
export function GET() {
  Sentry.logger.info("Sentry example API called");
  throw new SentryExampleAPIError(
    "This error is raised on the backend called by the example page.",
  );
}