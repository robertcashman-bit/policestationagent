# Auth user-style test report — PSR Train (psrtrain.com)

Generated from codebase inspection, automated Playwright coverage, and live browser checks against production where noted.

## Auth provider found

- **Supabase Auth** via `@supabase/ssr` (cookie-based session).
- **Framework:** Next.js App Router; edge **`proxy.ts`** implements middleware (Next.js 16 “Proxy”).

## Login routes found

| Route | Purpose |
|-------|---------|
| `/auth` | Primary sign-in / sign-up / forgot password / OTP UI |
| `/login`, `/signup` | Redirect into `/auth` with query preserved |
| `/auth/callback` | OAuth / magic-link / email confirmation code exchange (`GET`) |
| `/auth/confirm` | Legacy hash-fragment recovery → forwards to callback |
| `/auth/reset` | Password update after recovery session |
| `/reset-password`, `/update-password` | Related password flows |

## Protected routes found

Enforced in **`proxy.ts`** (prefix match) and **`app/(main)/layout.tsx`** (`getAuthStatus`), plus paywall via `customer_access` for paid areas.

Includes: `/dashboard`, `/practice`, `/modules`, `/critical-incidents`, `/progress`, `/certificates`, `/settings`, `/billing`, `/admin`, etc.

## Test credentials source

- **No credentials are stored in the repository.** Use environment variables only:
  - **`E2E_TEST_EMAIL`** / **`E2E_TEST_PASSWORD`** — Playwright `tests/e2e/auth-flow.spec.ts`
  - **`QA_EMAIL`** / **`QA_PASSWORD`** — optional production-only `tests/e2e/login-real.spec.ts`

## User-style tests performed

### Live site (cursor-ide-browser MCP, https://psrtrain.com)

1. **Homepage** — Loads; title and content render.
2. **Navigate to `/auth`** — “Welcome back” sign-in UI loads; no auth-related console errors observed for this path.
3. **Wrong password attempt** — Submit shows loading state (“Signing in…”, disabled button); request completes.
4. **Guest `/dashboard`** — Redirects to `https://psrtrain.com/auth?next=%2Fdashboard`.
5. **`https://www.psrtrain.com/auth`** — Redirects to apex `https://psrtrain.com/auth` (308 canonical host).
6. **`/auth/callback` without token** — Redirects to `/auth?error=missing_token`.

### Automated (Playwright in repo)

See **`tests/e2e/auth-flow.spec.ts`** and **`tests/e2e/auth-smoke.spec.ts`**: load `/auth`, guest redirects, bad credentials alert, callback error URL, www→apex, and (when env set) full login, `/auth` bounce, logout.

## Console / network errors found (live spot-check)

- No JavaScript errors tied to `/auth` during the spot-check.
- Supabase calls use `https://*.supabase.co` (allowed in CSP).

## Root causes identified (historical + verification)

Prior fixes in this project already addressed: open redirects on `?next=`, missing logout tracking API, weak logout navigation, signed-in users stuck on `/auth`, callback origin behind proxies, static prerender vs cookies on the main layout, hardcoded QA passwords in tests.

Live verification did **not** reproduce redirect loops, blank `/auth`, or blocked `/auth/callback` on production.

## Files changed (this task)

- **`tests/e2e/auth-flow.spec.ts`** — Added full auth E2E suite with `E2E_TEST_*` credentials.
- **`.env.example`** — Documented `E2E_TEST_EMAIL` / `E2E_TEST_PASSWORD`.
- **`AUTH_USER_TEST_REPORT.md`** — This report.

## Fixes applied (this task)

- Expanded automated coverage so regressions are caught in CI/local without relying on manual browsing alone.
- **Playwright** loads `.env.local` in `playwright.config.ts` and in `auth-flow.spec.ts` so workers can detect `NEXT_PUBLIC_SUPABASE_*` for skip logic. Guest-redirect tests still **skip** when those variables are missing in the test process (run against production with `PLAYWRIGHT_BASE_URL=https://psrtrain.com npx playwright test tests/e2e/auth-flow.spec.ts` to exercise redirects without local Supabase env).

## Environment variables required

Minimum for real sign-in:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Recommended:

- `NEXT_PUBLIC_SITE_URL` (e.g. `https://psrtrain.com` in production)

E2E:

- `E2E_TEST_EMAIL`, `E2E_TEST_PASSWORD` (optional; enables credential-dependent Playwright tests)

See **`.env.example`** for the full list.

## Production dashboard settings to check (Supabase)

**Authentication → URL configuration**

- **Site URL:** `https://psrtrain.com`
- **Redirect URLs** must include at least:
  - `https://psrtrain.com/auth/callback`
  - `https://psrtrain.com/auth/confirm`
  - `http://localhost:3000/auth/callback`
  - `http://localhost:3000/auth/confirm`

Email templates should use links under **`https://psrtrain.com/auth/...`** (not localhost in production mail).

## Manual post-deployment login checklist

1. Open **`https://psrtrain.com/auth`** — sign-in form visible.
2. Sign in with a real user — lands on **`/dashboard`** or **`/pricing`** (if unpaid).
3. Refresh — session persists (or pricing gate persists appropriately).
4. Open **`/practice`** directly — loads when entitled; otherwise pricing/upgrade as designed.
5. **Log out** — lands on **`/`**; **`/dashboard`** sends you back to **`/auth`**.
6. Visit **`https://www.psrtrain.com`** — expect redirect to apex so cookies stay consistent.
