# Security Hardening Report — policestationagent.com

**Date:** 2026-06-16
**Scope:** `policestationagent` (Next.js 14 App Router, Vercel). Sibling projects (psrtrain.com, policestationrepuk.com, custodynote.com, Custody Note app) live in separate repos and were **not** modified here — see "Cross-project notes".
**Type:** Defensive hardening only.

---

## 1. Summary

The application was already in reasonable shape: server-side admin auth (email magic-code + KV sessions), per-route authorisation helpers, KV/in-memory rate limiting, `sanitize-html` for blog HTML, parameterised SQLite queries, a baseline security-header set, and `robots.ts` disallowing `/admin` and `/api`.

The most serious issue was **a committed SQLite database (`data/web44ai.db`) containing real client contact submissions and admin password hashes**. That data has been purged. Several smaller hardening fixes were also applied. All changes build cleanly (`next build` ✓) and lint clean.

---

## 2. Vulnerabilities found & fixed (in this commit)

| # | Severity | Issue | Fix |
|---|----------|-------|-----|
| 1 | **Critical** | `data/web44ai.db` (force-tracked via `.gitignore !data/web44ai.db`) contained **2 real client contact_messages** (name, phone, police station, offence summary, IP, user-agent) and **2 admin users with bcrypt password hashes**. Confidential legal-enquiry data committed to git. | Purged all rows from `contact_messages` and `users`, nulled `blog_posts.author_id`, `VACUUM`. Public content (90 blog posts, 3 services, 16 stations) retained. Tables auto-recreate empty at runtime. |
| 2 | **High** | Outreach approval-token secret fell back to a hardcoded `'firm-outreach-dev-secret-change-me'` if `ADMIN_DECISION_TOKEN_SECRET`/`CRON_SECRET` unset — forgeable "send" links in prod. | `lib/firm-outreach/outreach/send-approval-token.ts`: **fail closed** — throws in production if no secret configured. |
| 3 | **High** | `/api/admin/debug-github` leaked GitHub token length + first 10 chars, validated username, repo permissions (admin-gated but high-value recon). | `app/api/admin/debug-github/route.ts`: returns **404 in production**; removed token length/prefix from the response. |
| 4 | **Medium** | Chatbot `/api/chatbot/search` & `/stream` accepted unbounded `query` and `conversationHistory` → OpenAI cost/DoS abuse. | Added `MAX_QUERY_LENGTH=1000`, history capped to 12 turns × 2000 chars (`sanitizeHistory`). |
| 5 | **Medium** | `/api/chatbot/stream` leaked internal `error.message` to clients via SSE. | Generic client message; real error logged server-side only. |
| 6 | **Medium** | `/api/index-now` POST accepted an unbounded, arbitrary URL list (key/reputation abuse). | URLs filtered to the site host (or root-relative) and capped at 1000. |
| 7 | **Medium** | Admin magic codes generated with `Math.random()` (predictable). | `crypto.randomInt()`; magic-code comparison now uses `crypto.timingSafeEqual`. |
| 8 | **Low/Med** | `/api/contact` echoed email-subsystem error details back to the client. | Returns only `{ success, emailNotified }`. |
| 9 | **Low/Med** | Public contact form had rate-limiting but no bot trap. | Added invisible **honeypot** field (`company`) — server silently drops bot submissions. |
| 10 | **Low** | CSP missing `object-src`; private areas not explicitly `noindex` at header level. | CSP adds `object-src 'none'`, `frame-src 'self'`, `upgrade-insecure-requests`. Added `X-Robots-Tag: noindex` for `/api/*` and `noindex, noarchive` + `no-store` for `/admin/*`. |

---

## 3. Files changed

- `data/web44ai.db` — purged client PII + admin password hashes
- `lib/firm-outreach/outreach/send-approval-token.ts` — fail-closed secret
- `app/api/admin/debug-github/route.ts` — prod 404 + no token metadata
- `app/api/chatbot/search/route.ts` — input caps
- `app/api/chatbot/stream/route.ts` — input caps + generic errors
- `app/api/index-now/route.ts` — URL allow-list + cap
- `app/api/auth/send-code/route.ts` — CSPRNG magic code
- `lib/admin-session.ts` — timing-safe code comparison
- `app/api/contact/route.ts` — no error leakage + honeypot
- `components/ContactForm.tsx` — honeypot field
- `next.config.js` — CSP + noindex headers

---

## 4. Reviewed and found acceptable (no change needed)

- **Admin APIs** — all `/api/admin/*` enforce `requireAdminApi`/`getAdminSession`; legacy `/api/auth/login`, `/api/admin/login`, `/api/auth/[...nextauth]` return **410** (no bypass).
- **Cron APIs** — all `/api/cron/*` require `CRON_SECRET` in production (open only when `NODE_ENV!=='production'`, i.e. local dev; Vercel preview/prod run as production).
- **Resend webhook** — verifies Svix signature in production.
- **SQLite** — all queries parameterised; no string interpolation.
- **Blog HTML** — rendered through `sanitize-html` (`lib/html-sanitizer.ts`).
- **Cookies** — `admin-token` is `httpOnly`, `secure` (prod), `sameSite=lax`, 7-day TTL, KV-backed; logout clears it.
- **Headers** — HSTS (preload), `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` already present.

---

## 5. Remaining risks / manual steps required

### Must do (outside the codebase)
1. **Purge git history of the leaked DB.** Removing rows fixes the current tree, but old `data/web44ai.db` blobs (with client PII + password hashes) remain in history and on GitHub. Use `git filter-repo` (or BFG) to strip historical `data/web44ai.db`, force-push, and have collaborators re-clone. Treat the leaked client enquiries as a potential **personal-data breach** (assess UK GDPR notification duties given the legal/criminal context).
2. **Rotate the admin password(s)** that were in the `users` table (`Cashman100`, `admin`) — even though current production auth is email magic-code, assume the bcrypt hashes are compromised. The legacy password login is already disabled (410).
3. **Rotate any GitHub PAT** ever exposed via the old `debug-github` response.
4. **Set required secrets in Vercel (Production):** `ADMIN_DECISION_TOKEN_SECRET` (or confirm `CRON_SECRET`) — otherwise outreach approval links now **fail closed** (by design). Also confirm `CRON_SECRET`, `RESEND_WEBHOOK_SECRET`, `INDEXNOW_SECRET`, `ADMIN_EMAILS` are set.

### Should do
5. **Next.js upgrade (breaking, do separately).** `next@14.2.35` is the latest 14.x; outstanding advisories (Image Optimizer remotePatterns DoS, RSC DoS, rewrite request-smuggling) are only fixed in 15.x/16.x. Plan a tested major upgrade. Image `remotePatterns` are reasonably scoped, which partially mitigates the optimizer DoS.
6. **`npm audit`** — 9 advisories (postcss/uuid/exceljs/glob), all transitive/dev or fixed only via the Next major bump. None are runtime-exploitable in the current usage; revisit during the Next upgrade.
7. **Reconsider committing a runtime DB at all.** Shipping `data/web44ai.db` in git is fragile and re-introduces leak risk. Consider a managed store (the project already uses Upstash) or a build-time content source, and stop force-tracking the `.db`.

### Platform settings to check
- **Vercel:** Deployment Protection on preview URLs; confirm `NODE_ENV`/`VERCEL_ENV` so cron auth is enforced on previews; ensure source maps stay disabled (`productionBrowserSourceMaps: false` ✓).
- **Resend:** webhook signing secret configured; SPF/DKIM/DMARC on sending domain.
- **DNS/CDN:** if fronted by Cloudflare, enable WAF/bot-fight on `/api/*` and `/admin`.

---

## 6. Cross-project notes

This pass covered **policestationagent** only. The same checklist should be run against the sibling repos (notably **Policestationrepuk**, which shares the firm-outreach + magic-code patterns and the same Upstash instance). The approval-token fail-closed fix (#2) should be ported there if that code is duplicated.

---

## 7. Verification

- `next build` — ✓ compiled, all routes generated
- `next lint` (changed files) — ✓ no warnings/errors
- `tsc --noEmit` — no new errors introduced (pre-existing errors are confined to `__tests__/firm-outreach-*`, excluded from the build)
- Purged DB re-opened read-only: `users=0, contact=0, blog=90, services=3, stations=16`
