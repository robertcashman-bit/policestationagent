// Next.js instrumentation hook. Runs once per server/edge runtime at startup.
// Used to (1) initialise Sentry for the active runtime and (2) validate env.
//
// All Sentry/env imports are dynamic so nothing is pulled into the base
// middleware/edge bundle unless actually executed at runtime.
export async function register() {
  // Validate environment variables on server startup (respects
  // SKIP_ENV_VALIDATION). Lazy import keeps it server-only and code-split.
  await import("./lib/env");

  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

// Captures errors thrown in nested React Server Components (Next 14+/15).
// Typed loosely to stay compatible across Next 14/15 instrumentation signatures.
export const onRequestError = async (
  ...args: Parameters<
    typeof import("@sentry/nextjs")["captureRequestError"]
  >
) => {
  if (!process.env.SENTRY_DSN) return;
  const Sentry = await import("@sentry/nextjs");
  Sentry.captureRequestError(...args);
};
