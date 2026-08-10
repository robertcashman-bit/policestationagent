# Full site test report — PSR Train (psrtrain.com)

**Date:** 2026-05-02  
**Scope:** End-to-end verification against production (`https://psrtrain.com`) plus local build/typecheck/unit tests.

---

## 1. Stack detected

| Layer | Technology |
| --- | --- |
| Framework | Next.js **16.1.1** (App Router) |
| UI | React **19**, Tailwind CSS |
| Auth | **Supabase Auth** (`@supabase/ssr`, `@supabase/supabase-js`) |
| Edge | `proxy.ts` (Next 16 “Proxy” middleware — session refresh, canonical host, auth/paywall gates) |
| Billing | Lemon Squeezy (API + webhook) |
| Email | Resend (contact form) |
| Email marketing / metadata | `NEXT_PUBLIC_SITE_URL`, `app/sitemap.ts`, `app/robots.ts` |

---

## 2. Auth provider

- **Supabase** (email/password, magic code, OAuth flag via `NEXT_PUBLIC_SUPABASE_GOOGLE_AUTH_ENABLED`).
- Unified entry: `/auth` (with `/login` and `/signup` as entry points).
- Callback: `GET /auth/callback` (PKCE / OTP exchange).

---

## 3. Site map (main routes)

**Marketing / public:** `/`, `/training`, `/pricing`, `/features`, `/legal/*`, `/legal-advice/*`, `/gate` (if `APP_ACCESS_CODE` set).

**Auth:** `/auth`, `/auth/callback`, `/auth/reset`, `/auth/confirm`, `/reset-password`, `/update-password`.

**App (signed-in, paywalled where applicable):** `/dashboard`, `/practice`, `/modules`, `/critical-incidents`, `/progress`, `/certificates`, `/settings`, `/billing`.

**Admin:** `/admin/*` (Supabase session + `ADMIN_EMAILS` allowlist in layout).

**API (sample):** `/api/contact`, `/api/lemonsqueezy/*`, `/api/cron/*`, `/api/auth/*`, etc.

**Note:** `components/layout/Header.tsx` (top nav to `/questions`, `/scenarios`, etc.) is **not imported** anywhere; the live app shell uses `AppSidebar` with valid routes only.

---

## 4. Routes / pages tested (Playwright + HTTP)

- All paths in `tests/e2e/site-inventory.spec.ts` (sitemap-aligned marketing + auth entry pages + `sitemap.xml`, `robots.txt`, `icon.svg`).
- Homepage CTAs and nav: `tests/e2e/home-landing.spec.ts`.
- Auth: `tests/e2e/auth-flow.spec.ts`, `tests/e2e/auth-smoke.spec.ts`.
- Production login (optional creds): `tests/e2e/login-real.spec.ts`.

---

## 5. Forms tested

- **Contact** (`/legal/contact`): empty submit blocked (native validation after code change, or API error on legacy deployed HTML with `noValidate`); test accepts both.
- **Sign-in** (`/auth`): empty submit blocked by browser validation; bad password shows alert.
- Filled contact + successful Resend send: **not** automated (requires `RESEND_API_KEY` + `CONTACT_EMAIL_TO` in target environment).

---

## 6. User journeys tested

- Visitor: home → “Start training” / footer CTA → `/auth` (or `/signup` redirect).
- Visitor: “View modules” → `/training`.
- Unauthenticated: `/dashboard`, `/practice` → redirect to `/auth` with `next=`.
- Unauthenticated: `/admin/analytics` → redirect to `/auth` (not public).
- `www.psrtrain.com` → **308** to `https://psrtrain.com/...` (cookie scope).
- `/auth/callback` with no token → `/auth?error=missing_token`.

---

## 7. Console / network (automated)

- `site-inventory.spec.ts` asserts **no `pageerror`** on `/`, `/pricing`, `/training`, `/auth`, `/legal/contact` (Chromium; each project in matrix re-runs the suite).
- No automated capture of all `console.error` lines (only uncaught page errors).

---

## 8. Broken links / buttons (findings)

- **None found** on production for the crawled internal route list and main CTAs.
- **Low / housekeeping:** unused `Header.tsx` still contains links to routes that do not exist in App Router; not user-facing.

---

## 9. Auth / login issues

- **None** on production for anonymous flows.
- **Credential tests** skipped unless `E2E_TEST_EMAIL` / `E2E_TEST_PASSWORD` or `QA_EMAIL` / `QA_PASSWORD` are set (`login-real.spec.ts` now accepts either pair).

---

## 10. Responsive / mobile

- Playwright projects: `chromium-desktop`, `chromium-mobile` (Pixel 5), `chromium-tablet` (iPad viewport, Chromium).
- Home “mobile menu” test runs only on `chromium-mobile` (by design).
- No separate WebKit/Firefox projects in config.

---

## 11. Accessibility (sampled)

- Home: single `h1`, `main#main-content`, skip link in root layout, marketing header has `aria-label` on mobile menu.
- Deeper WCAG audit not run in this pass (no axe-core in CI in this report).

---

## 12. SEO / metadata (sampled)

- Root and key pages set `title` / `description` or page-level `metadata`.
- `app/layout.tsx` uses `metadataBase` from `NEXT_PUBLIC_SITE_URL` (fallback `http://localhost:3000` in dev).
- `robots.ts` / `sitemap.ts` use `NEXT_PUBLIC_SITE_URL` with default `https://psrtrain.com` when unset.
- **Production:** set `NEXT_PUBLIC_SITE_URL=https://psrtrain.com` in the host (Vercel) so Open Graph and absolute URLs are always correct.

---

## 13. Environment variables (audit)

| Variable | Role |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Required for sign-in and middleware |
| `SUPABASE_SERVICE_ROLE_KEY` | Server admin / scripts |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, robots, metadata |
| `ADMIN_EMAILS` | `/admin` allowlist |
| `APP_ACCESS_CODE` | Optional legacy gate to `/gate` |
| `CRON_SECRET` | `/api/cron/supabase-keepalive` |
| Lemon Squeezy vars | Checkout + webhook |
| `LEMON_SQUEEZY_TEST_MODE` | Explicit test vs live billing |
| `RESEND_API_KEY`, `CONTACT_EMAIL_TO` | Contact form (503 if missing) |
| `OPENAI_API_KEY` | Optional AI features |
| `PLAYWRIGHT_BASE_URL` | Point E2E at production |
| `E2E_TEST_EMAIL`, `E2E_TEST_PASSWORD` | Auth E2E |
| `QA_EMAIL`, `QA_PASSWORD` | Alias for production login tests |

See `.env.example` for placeholders.

---

## 14. Files changed (this session)

| File | Change |
| --- | --- |
| `tests/e2e/site-inventory.spec.ts` | **New** — route crawl, protected-route checks, form smoke, pageerror smoke |
| `tests/e2e/login-real.spec.ts` | Accept `E2E_TEST_*` as fallback for `QA_*` |
| `app/legal/contact/page.tsx` | Removed `noValidate` so native HTML validation runs before submit |
| `.env.example` | `PLAYWRIGHT_BASE_URL`, `LEMON_SQUEEZY_TEST_MODE`, clarified QA alias |

---

## 15. Autofixes implemented

1. **Contact form:** dropped `noValidate` so empty submits are blocked by the browser where supported (fewer pointless API calls; aligns with accessibility expectations).
2. **E2E:** added production-safe inventory tests and credential alias for QA/login-real tests.

---

## 16. Proposed / not implemented (needs your action)

| Item | Severity | Action |
| --- | --- | --- |
| Contact form returns **503** if Resend/inbox not configured | High for “email received” | In Resend + Vercel: set `RESEND_API_KEY`, `CONTACT_EMAIL_TO`; verify domain `noreply@psrtrain.com` |
| Paid training routes | N/A for anonymous tests | Ensure Lemon Squeezy + `customer_access` rows; use test account with paid access for full journey |
| Full logged-in E2E | Optional | Set `E2E_TEST_EMAIL` / `E2E_TEST_PASSWORD` in CI secrets |

---

## 17. External dashboard / settings

1. **Vercel (or host):** `NEXT_PUBLIC_SITE_URL=https://psrtrain.com`, Supabase keys, billing secrets.
2. **Supabase:** Auth redirect URLs include `https://psrtrain.com/auth/callback` (and local if needed).
3. **Resend:** API key + verified sending domain for contact form.

---

## 18. Verification command results

Commands run during this audit:

| Command | Result |
| --- | --- |
| `npm run lint` (`tsc --noEmit`) | Pass |
| `npm run build` | Pass (before final contact tweak; re-run recommended after pull) |
| `npm run test:unit` | Pass (38 tests) |
| `PLAYWRIGHT_BASE_URL=https://psrtrain.com npx playwright test` | Pass (**174** passed, **24** skipped — credential + viewport-specific skips) |

---

## 19. Remaining risks

- Paid-only flows (practice/modules after checkout) not exercised without a paid test user.
- Third-party console warnings not fully asserted.
- `components/layout/Header.tsx` dead code could confuse future edits.

---

## 20. Deployment recommendation

**Safe to deploy** after CI passes, provided production env vars match Section 13 (especially `NEXT_PUBLIC_SITE_URL`, Supabase, billing, contact email).

---

## 21. Post-deployment smoke checklist

- [ ] `/` loads; hero CTAs work  
- [ ] `/auth` sign-in; invalid password shows error  
- [ ] `/dashboard` redirects to `/auth` when logged out  
- [ ] Logged-in: `/dashboard` and `/practice` (paid) behave as expected  
- [ ] Logout returns to public site  
- [ ] `/legal/contact` — submit a test message (verify email delivery if Resend configured)  
- [ ] Mobile: open menu, reach “Start training”  

---

## Overall status

**Working** — Public marketing site, auth entry, redirects, canonical host, and crawled routes behave correctly on production. Automated suite passes with optional credential tests skipped until secrets are provided.
