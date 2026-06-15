# Admin authentication setup

Admin access uses **magic-code email login** at `/admin` — not username/password or Google OAuth.

## How it works

1. Visit `https://www.policestationagent.com/admin`
2. Enter an email address on the allowlist (`ADMIN_EMAILS` or `OWNER_EMAIL` in Vercel)
3. Receive a one-time code by email (via Resend)
4. Enter the code to create a session (stored in Upstash Redis)

## Required Vercel environment variables (Production)

| Variable | Purpose |
|----------|---------|
| `UPSTASH_REDIS_REST_URL` | Session and OTP storage |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash auth token |
| `ADMIN_EMAILS` | Comma-separated allowlist of admin emails |
| `RESEND_API_KEY` | Sends magic codes |
| `CRON_SECRET` | Protects cron routes |
| `RESEND_WEBHOOK_SECRET` | Validates inbound email webhooks |
| `INDEXNOW_SECRET` | Protects IndexNow submission endpoint |
| `INDEXNOW_KEY` | IndexNow verification key (optional; defaults to existing key file) |

## Legacy login

Username/password login and Google OAuth have been **removed**. Legacy routes return HTTP 410.

## Troubleshooting

- **"Admin login not configured"** — Upstash Redis env vars missing in production
- **Code not received** — Check Resend API key and that your email is in `ADMIN_EMAILS`
- **Not authorised** — Email must exactly match an entry in `ADMIN_EMAILS`

See [SECURITY.md](./SECURITY.md) for the full security model.
