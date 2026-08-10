import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

export async function register() {
  // No-op unless a DSN is explicitly configured.
  if (!SENTRY_DSN) return;

  if (process.env.NEXT_RUNTIME === 'nodejs' || process.env.NEXT_RUNTIME === 'edge') {
    Sentry.init({
      dsn: SENTRY_DSN,
      tracesSampleRate: 0.05,
    });
  }
}

export const onRequestError = Sentry.captureRequestError;
