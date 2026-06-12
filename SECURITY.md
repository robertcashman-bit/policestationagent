# Security

## Production Checklist

Before deploying to production, ensure:

1. **Admin login** – Magic-code auth via `/admin`. Set `ADMIN_EMAILS` (or `OWNER_EMAIL`) and configure Upstash Redis (`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`).

2. **Cron jobs** – Set `CRON_SECRET` in Vercel. Cron routes reject requests without a valid secret in production.

3. **Resend webhooks** – Set `RESEND_WEBHOOK_SECRET` in production. Webhook signature verification is required.

4. **IndexNow** – If you use the IndexNow API, set `INDEXNOW_SECRET` and pass it as `?secret=...` when calling the endpoint. In production, this is required.

5. **Debug endpoints** – `/api/debug-env` is disabled in production automatically. `/api/contact/health` returns minimal status in production.

6. **Rate limiting** – Contact form (5/min), chatbot (20/min), admin magic-code send (10/IP), and verify-code (20/IP) are rate-limited.

## Security Measures in Place

- **Admin auth** – Magic-code session (`admin-token` cookie). Legacy username/password and Google OAuth routes return 410 Gone.
- **API protection** – All `/api/admin/*` routes require a valid admin session.
- **Fail closed** – Cron and Resend webhook endpoints reject unauthenticated requests in production when secrets are unset.
- **Security headers** – X-Frame-Options, HSTS, CSP, X-Content-Type-Options, Referrer-Policy (via `next.config.js`)
- **Input validation** – Contact form validates and limits field lengths; WordPress import capped at 10MB
- **HTML sanitization** – Blog content sanitized with DOMPurify before public render
- **No hardcoded admin credentials** – Admin access is email allowlist + magic code only

## Disabled Legacy Auth

The following endpoints are intentionally disabled:

- `POST /api/auth/login` (username/password JWT)
- `POST /api/admin/login` (legacy admin login)
- `/api/auth/[...nextauth]` (Google OAuth)

Use `/admin` and the email magic-code flow instead.
