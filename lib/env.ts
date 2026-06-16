import { z } from "zod";

/**
 * Centralised, validated access to environment variables.
 *
 * Design goals (this is a production app — must stay non-breaking):
 * - Validate the *format* of critical vars when they are present, so that a
 *   malformed value fails fast with a clear message instead of causing subtle
 *   runtime bugs.
 * - Treat vars as optional (the app already has sensible fallbacks throughout),
 *   so a missing optional never crashes the server.
 * - Respect the existing `SKIP_ENV_VALIDATION` build flag used by CI/Vercel so
 *   that `next build` continues to work without secrets present.
 */
const envSchema = z.object({
  // Site
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),

  // Email (Resend)
  RESEND_API_KEY: z.string().min(1).optional(),
  CONTACT_FORM_TO_EMAIL: z.string().email().optional(),
  RESEND_WEBHOOK_SECRET: z.string().min(1).optional(),

  // Upstash Redis / KV (legacy aliases supported elsewhere)
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),

  // Cron / token signing
  CRON_SECRET: z.string().min(16).optional(),

  // Observability (Sentry) — never required; no-op when unset
  SENTRY_DSN: z.string().url().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
});

export type Env = z.infer<typeof envSchema>;

function parseEnv(): Env {
  // CI/Vercel build runs with SKIP_ENV_VALIDATION=true and without secrets.
  if (process.env.SKIP_ENV_VALIDATION === "true") {
    return process.env as unknown as Env;
  }

  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(
      `Invalid environment variables:\n${issues}\n` +
        "Fix the values above or set SKIP_ENV_VALIDATION=true to bypass.",
    );
  }

  // In production, surface (but do not crash on) missing high-value vars so the
  // operator notices misconfiguration without taking the site down.
  if (process.env.NODE_ENV === "production") {
    const recommended: Array<keyof Env> = [
      "NEXT_PUBLIC_SITE_URL",
      "RESEND_API_KEY",
      "CRON_SECRET",
    ];
    const missing = recommended.filter((key) => !parsed.data[key]);
    if (missing.length > 0) {
      console.warn(
        `[env] Missing recommended production env vars: ${missing.join(", ")}`,
      );
    }
  }

  return parsed.data;
}

export const env: Env = parseEnv();
