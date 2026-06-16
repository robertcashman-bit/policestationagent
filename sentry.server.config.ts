// Sentry server-side initialization (Node.js runtime).
// This module is imported from `instrumentation.ts` at server startup.
//
// Initialization is fully gated on the `SENTRY_DSN` env var: when it is unset
// (local dev, preview without monitoring, CI), Sentry.init is never called and
// the SDK is a no-op. No DSN is hardcoded.
import * as Sentry from "@sentry/nextjs";

const dsn = process.env.SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV,
    tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? 0.1),
    // Reduce noise/cost; opt in via env if deeper tracing is wanted.
    enabled: true,
  });
}
