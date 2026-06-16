// Sentry browser/client initialization.
// Auto-loaded by the Sentry webpack plugin (via withSentryConfig) on Next 14.
//
// Gated on the public `NEXT_PUBLIC_SENTRY_DSN` env var: when unset, Sentry.init
// is never called and no client SDK runs. No DSN is hardcoded.
import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    environment:
      process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV,
    tracesSampleRate: Number(
      process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE ?? 0.1,
    ),
    // Session Replay is opt-in only to avoid extra client weight by default.
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0,
  });
}
