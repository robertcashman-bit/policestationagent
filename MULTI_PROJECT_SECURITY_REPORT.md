# Multi-Project Security Hardening — Consolidated Report

Date: 2026-06-16
Scope: All five projects/apps in the estate.

## Status overview

| Project | Repo | Stack | Result | Commit |
|---|---|---|---|---|
| policestationagent.com | `policestationagent` | Next 14, SQLite, Upstash, Resend, OpenAI | Hardened + deployed (CI green) | (master push) |
| policestationrepuk.com | `Policestationrepuk` | Next 15, Supabase, Upstash, Resend, OpenAI | Hardened + deployed | `b4c9e9a` |
| custodynote.com | `custody-note-website` | Next 15, AWS S3/SES/STS, jose JWT, Resend | Hardened + deployed | `d332182` |
| psrtrain.com | `pstrain-rebuild` | Next 16, Supabase SSR, OpenAI, Resend | Hardened + deployed | `bf93609` |
| Custody Note app | `custody-note-app` | Electron, sql.js, electron-updater, AWS S3 | Hardened + deployed | `a41a588` |

All builds/lint passed before commit. No git history rewritten, no force-push, no `.env` files touched, no auth logic relaxed.

## Key conclusion

The estate is in **good security shape**. The only project that had a genuine sensitive-data leak was **policestationagent** (committed SQLite DB with client PII + admin password hashes — purged). The other four had **no committed secrets/PII/databases** and were already substantially hardened. Fixes applied elsewhere were defense-in-depth (fail-closed secrets, header gaps, input caps, generic errors, honeypots).

## Fixes applied per project

### policestationagent.com
- Purged client PII + admin password hashes from committed `data/web44ai.db` (VACUUMed).
- `debug-github` endpoint 404s in prod; removed token length/prefix leak.
- Outreach approval-token secret fails closed in prod.
- Magic codes: `crypto.randomInt` + `crypto.timingSafeEqual`.
- Chatbot search/stream: input + history caps, generic errors.
- IndexNow: domain allowlist + 1000-URL cap.
- Contact: honeypot + no internal error leakage.
- Headers: CSP `object-src 'none'`/`frame-src`/`upgrade-insecure-requests`, `X-Robots-Tag` on `/api` and `/admin`, `Cache-Control: no-store` on admin.

### policestationrepuk.com
- **High:** outreach `getSecret()` no longer falls back to a hardcoded default — fails closed in prod.
- **High:** 5 cron routes were fail-open if `CRON_SECRET` unset — now use shared fail-closed `isCronAuthorized()`.
- **Med:** magic codes → `crypto.randomInt` + `timingSafeEqual`.
- **Med/Low:** CSP `form-action`/`frame-ancestors`; `X-Robots-Tag` on `/api` + `/admin`.

### custodynote.com
- Already strongly hardened (JWT verified, STS-scoped 15-min S3 creds, anti-enumeration auth, rate limits).
- Added CSP `object-src 'none'` + `X-Robots-Tag` on `/api` and `/admin`.
- **Low (reported, not auto-fixed):** `/api/recovery` binds storage to the request-body licence key rather than the bearer token's user — bind token→key for full safety.

### psrtrain.com
- Service-role key isolation, RLS-bound clients, webhook signatures, cron all verified correct.
- **Med:** AI scenario endpoint input cap (2000 chars) + generic 500.
- **Med:** CSP `object-src 'none'` + `X-Robots-Tag` on `/api` + `/admin`.
- **Low:** contact-form honeypot; genericized internal error leakage across ~9 routes.

### Custody Note app (Electron)
- Already heavily hardened (contextIsolation+sandbox+nodeIntegration:false on every window, strict navigation/window.open/webview blocking, path-traversal allowlists, encrypted-at-rest, redacting logger, signed HTTPS auto-update).
- Hardened `.gitignore` against accidental future commits of code-signing keys (`*.p8`, provisioning profiles, keystores) and stray databases.

## Manual steps only you can do

### policestationagent.com (most important)
1. **Scrub git history** of `data/web44ai.db` (BFG or `git filter-repo`) — purged data still exists in past commits.
2. **Rotate admin passwords** that were in the `users` table (`Cashman100`, `admin`).
3. **Rotate any GitHub PAT** ever surfaced by the old `debug-github` response.
4. **Set Vercel prod secrets:** `ADMIN_DECISION_TOKEN_SECRET` (or confirm `CRON_SECRET`), `RESEND_WEBHOOK_SECRET`, `INDEXNOW_SECRET`, `ADMIN_EMAILS`.
5. Consider not committing a runtime DB at all; plan Next 14 → 15/16 upgrade.

### policestationrepuk.com
- Confirm `ADMIN_DECISION_TOKEN_SECRET` (≥16 chars) and `CRON_SECRET` are set in Vercel prod/preview (token + cron now fail closed without them).
- Rotate `ADMIN_DECISION_TOKEN_SECRET` if it ever equalled the old default; confirm `RESEND_WEBHOOK_SECRET` / `INTERNAL_API_TOKEN`.
- Verify Supabase RLS is enabled on all public tables.

### custodynote.com
- S3: confirm Block Public Access ON + default SSE encryption; IAM least-privilege on the assumed role; consider requiring `AWS_STS_EXTERNAL_ID`.
- Set `ADMIN_API_TOKEN` + `ADMIN_PASSWORD_HASH`, retire legacy `ADMIN_SECRET`; ensure strong `JWT_SECRET`, `CRON_SECRET`, `LEMONSQUEEZY_WEBHOOK_SECRET`.
- Review `/api/recovery` token→key binding.

### psrtrain.com
- **Verify Supabase RLS is enabled** on `flashcards`, `user_progress`, `user_sessions`, `profiles`, `customer_access`, `pace_code_sections` (anon-client routes rely on it).
- Consider durable (Upstash) rate limiting for `/api/contact` + `/api/auth/request-code`.
- Rotate any secret ever pasted into logs/chats.

### Custody Note app
- Bump `electron-updater`/`electron-builder` to pull `js-yaml ≥ 4.1.2` (transitive moderate DoS); smoke-test update feed. Do not `npm audit fix --force`.
- Enable macOS code-signing + notarisation and Windows Authenticode (`hardenedRuntime:false`, `identity:null` today).
- Consider a privileged custom scheme so the strict header CSP applies to the renderer (currently `file://` falls back to the meta CSP).
- Confirm managed S3 bucket enforces Public Access Block + TLS-only + SSE.

## Cross-cutting recommendations
- Periodic `npm audit` per repo; no urgent CVEs found, no breaking upgrades applied.
- Standardize on durable (Upstash) rate limiting where in-memory limiters are used.
- Confirm Supabase RLS across both Supabase-backed projects — this is the single most important non-code item.
