// Sentry initialization for the Edge runtime (middleware, edge routes).
// Imported from `instrumentation.ts` when NEXT_RUNTIME === "edge".
//
// Gated on `SENTRY_DSN`; no-op when unset. No DSN is hardcoded.
import * as Sentry from "@sentry/nextjs";

const dsn = process.env.SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV,
    tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? 0.1),
  });
}
