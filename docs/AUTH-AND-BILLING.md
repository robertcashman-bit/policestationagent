# Auth & billing — operator guide

This document describes the unified auth + Lemon Squeezy paywall stack
shipped in PSR Train. It is the single source of truth for what env
vars are required, what to run in Supabase, and what to test in
production.

---

## 1. One-page summary

```
[ user ] -- email --> /auth (page)
                           |
                           v
            POST /api/auth/request-code        (server-side cooldown +
                           |                   Supabase signInWithOtp)
                           v
                  user gets email with:
                       6-digit OTP
                       one-click link
                           |
            +--------------+--------------+
            |                             |
            v                             v
     enters code on /auth         clicks email link
     (verifyOtp client-side)        (lands on /auth/callback)
                           \       /
                            v     v
                       Supabase session set
                            |
                            v
            proxy.ts inspects session + customer_access
                            |
              +-------------+-------------+
              |                           |
              v                           v
       not paid -> /pricing        is_paid -> /dashboard
```

Lemon Squeezy webhook updates `customer_access`, signing-in users are
linked to existing paid records by email automatically.

---

## 2. Files of interest

| File                                              | Purpose                                                                  |
|---------------------------------------------------|--------------------------------------------------------------------------|
| `app/auth/page.tsx`                               | Unified sign-in/sign-up UI (OTP + magic link, cooldown, recovery).       |
| `app/auth/callback/route.ts`                      | Server route that exchanges PKCE code / verifies email token hash.       |
| `app/auth/confirm/page.tsx`                       | Legacy `#access_token=` magic-link landing — forwards to `/auth/callback`.|
| `app/api/auth/request-code/route.ts`              | Backend rate-limit guard around `signInWithOtp`.                         |
| `app/api/lemonsqueezy/webhook/route.ts`           | HMAC-verified, idempotent webhook → upserts `customer_access`.           |
| `app/api/lemonsqueezy/create-checkout/route.ts`   | Creates a checkout URL bound to the user's email + id.                   |
| `lib/auth/cooldown.ts`                            | Per-email localStorage cooldown helper.                                  |
| `lib/auth/access.ts`                              | `getAccessSnapshot()` — single source of truth for "is this user paid?". |
| `lib/billing/lemon-events.ts`                     | Maps Lemon Squeezy event names → internal access state.                  |
| `lib/supabase/admin.ts`                           | Service-role Supabase client. NEVER imported from a client component.    |
| `proxy.ts`                                        | Next.js middleware: gate by access code, then auth, then paid access.    |
| `supabase/migrations/0001_auth_billing.sql`       | Schema for `profiles`, `customer_access`, `billing_webhook_events`.      |

`/login` and `/signup` are now thin redirects to `/auth` so any old
links keep working.

---

## 3. Required environment variables

Set these in **Vercel → Project → Settings → Environment Variables**
(both Production and Preview).

### Public — exposed to the browser

| Name                                       | Notes                                              |
|--------------------------------------------|----------------------------------------------------|
| `NEXT_PUBLIC_SUPABASE_URL`                 | `https://<project-ref>.supabase.co`                |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`            | Anon (publishable) key.                            |
| `NEXT_PUBLIC_SUPABASE_GOOGLE_AUTH_ENABLED` | `true` only after Google provider is configured.   |

### Server-only — secret

| Name                                | Notes                                                                    |
|-------------------------------------|--------------------------------------------------------------------------|
| `SUPABASE_SERVICE_ROLE_KEY`         | **Required** for the webhook to write to `customer_access`.              |
| `LEMON_SQUEEZY_API_KEY`             | API token with read/write on the store.                                  |
| `LEMON_SQUEEZY_STORE_ID`            | Numeric store id.                                                        |
| `LEMON_SQUEEZY_VARIANT_ID_MONTHLY`  | Variant id for the monthly plan.                                         |
| `LEMON_SQUEEZY_VARIANT_ID_ANNUAL`   | Variant id for the annual plan.                                          |
| `LEMON_SQUEEZY_WEBHOOK_SECRET`      | The signing secret you set when creating the webhook in Lemon Squeezy.   |
| `APP_ACCESS_CODE`                   | Optional — leave unset to disable the legacy access-code gate.           |

After updating vars: `vercel --prod --yes` (or push to `master`).

---

## 4. One-time Supabase setup

1. Open **Supabase dashboard → SQL editor → New query**.
2. Paste the contents of `supabase/migrations/0001_auth_billing.sql`
   and click **Run**. The script is idempotent and safe to re-run.
3. **Authentication → Email Templates → Magic Link**: make sure the
   template includes both `{{ .Token }}` (the 6-digit code) and the
   `{{ .ConfirmationURL }}` button. Supabase ships a sensible default;
   only edit if you've customised it.
4. **Authentication → URL Configuration**:
   - Site URL: `https://psrtrain.com`
   - Redirect URLs: add `https://psrtrain.com/auth/callback` and
     `http://localhost:3000/auth/callback`.
5. **Authentication → Rate Limits** (Pro plan only): if you regularly
   hit the 1-hour-per-email cap during development, raise the
   per-email and per-hour limits there. The app's own 60s cooldown
   protects you from triggering the cap during normal use.

---

## 5. Lemon Squeezy webhook setup

1. Lemon Squeezy → **Settings → Webhooks → New webhook**.
2. URL: `https://psrtrain.com/api/lemonsqueezy/webhook`.
3. Signing secret: any random string — copy it into Vercel as
   `LEMON_SQUEEZY_WEBHOOK_SECRET`.
4. Subscribe to **all** of these events:
   - `order_created`
   - `order_refunded`
   - `subscription_created`
   - `subscription_updated`
   - `subscription_cancelled`
   - `subscription_resumed`
   - `subscription_expired`
   - `subscription_paused`
   - `subscription_unpaused`
   - `subscription_payment_success`
   - `subscription_payment_failed`
   - `subscription_payment_refunded`

Idempotency: every delivery is recorded in
`billing_webhook_events.event_id` (sha256 of the signature). Replays
are returned `{ ok: true, deduped: true }` without touching
`customer_access`.

---

## 6. Test plan (manual smoke)

### Auth

- [ ] Brand-new email → `/auth` → enter email → 6-digit code arrives → enter code → land on `/dashboard` (or `/pricing` if unpaid).
- [ ] Same email, click "Resend code" within 60s → button is disabled and shows countdown.
- [ ] Refresh `/auth` mid-cooldown → countdown is restored from localStorage.
- [ ] Click magic-link button in the email on a different browser → land on `/auth/callback` → session created → redirected.
- [ ] Click expired magic link → redirected to `/auth?error=auth_callback_error&detail=...` with a clear error and a Resend button.
- [ ] Hammer Continue with the same email 10x in 5 seconds → only one Supabase request fires; subsequent clicks return 429 from `/api/auth/request-code`.

### Billing

- [ ] Logged-in unpaid user visiting `/practice` → redirected to `/pricing?upgrade=1&from=/practice`.
- [ ] Click Subscribe → Lemon Squeezy checkout opens with email pre-filled.
- [ ] Complete a test-mode payment → webhook fires → row appears in `customer_access` with `is_paid = true`, `access_status = 'active'`.
- [ ] Refresh `/dashboard` → access granted.
- [ ] Trigger `subscription_cancelled` from Lemon Squeezy → row updates to `access_status = 'grace'`, user keeps access.
- [ ] Trigger `subscription_expired` → `is_paid = false`, user sent to `/pricing` next request.
- [ ] Replay any webhook → second delivery returns `deduped: true`, no row changes.

### Auto-linking

- [ ] Pay first (no account), then sign up with the same email → after the magic link, `customer_access.user_id` is populated and access is granted on first dashboard hit.

---

## 7. What changed vs. the previous build

- Added a **server-side rate-limit guard** at `/api/auth/request-code`
  so spam-clicks never reach Supabase's strict per-email cap.
- Added a **localStorage cooldown** that survives refreshes.
- Replaced the split `/login` + `/signup` flows with a single
  `/auth` page that combines OTP entry and magic-link copy.
- Hardened `/auth/callback` to handle PKCE codes **and** email token
  hashes, with explicit error redirects to `/auth?error=...` (no more
  blank "Loading…" screens).
- Implemented the Lemon Squeezy webhook properly: HMAC verification,
  idempotency log, full event coverage, persistence to
  `customer_access` via the service role key.
- Added a Postgres trigger that auto-links Supabase users to any
  pre-existing paid `customer_access` record by email on signup.
- Updated `proxy.ts` to enforce three layers in order:
  legacy access code → must be signed in → must be paid (with
  `/pricing` and `/billing` always reachable so users can self-serve).

---

## 8. Operational tips

- **Hit the rate limit during testing?** Use a different email or wait
  one hour. Supabase rate limits are per-email and reset on a rolling
  window.
- **Lemon Squeezy webhook stuck retrying?** Check Vercel function logs
  for `[lemonsqueezy/webhook]`. The most common cause is a missing
  `SUPABASE_SERVICE_ROLE_KEY`, which now returns 503 instead of
  silently dropping events.
- **Need to bypass the paywall in dev?** Set
  `APP_ACCESS_CODE=`(empty) **and** insert a row into
  `customer_access` with your email and `is_paid = true`,
  `access_status = 'active'`.
