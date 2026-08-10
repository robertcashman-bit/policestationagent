import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

// No-op unless a public DSN is explicitly configured.
if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    tracesSampleRate: 0.05,
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
