# Security operations checklist

Cross-project checklist for policestationagent.com, policestationrepuk.org, psrtrain.com, and custodynote.com.

## Vercel — all projects

- [ ] **Deployment Protection** enabled on Preview deployments (Settings → Deployment Protection)
- [ ] **Production env vars** set (see per-project lists below)
- [ ] **No secrets in git** — rotate anything ever committed to source

## policestationagent.com

| Variable | Required |
|----------|----------|
| `ADMIN_EMAILS` | Yes — comma-separated admin emails |
| `UPSTASH_REDIS_REST_URL` / `TOKEN` | Yes — sessions + rate limits |
| `CRON_SECRET` | Yes |
| `RESEND_WEBHOOK_SECRET` | Yes if using Resend webhooks |
| `INDEXNOW_SECRET` | Yes |
| `INDEXNOW_KEY` | Optional (defaults to existing key file) |

**Smoke tests**

```bash
curl -s -o /dev/null -w "%{http_code}\n" -X POST "https://www.policestationagent.com/api/index-now"
# Expect 401

curl -s -o /dev/null -w "%{http_code}\n" -H "Authorization: Bearer wrong" \
  "https://www.policestationagent.com/api/cron/firm-outreach-status"
# Expect 401
```

## policestationrepuk.org

| Variable | Required |
|----------|----------|
| `ADMIN_EMAILS` | Yes |
| `ADMIN_PASSWORD` | Yes — no hardcoded fallback |
| `UPSTASH_REDIS_*` | Yes |
| `CRON_SECRET` | Yes |
| `RESEND_WEBHOOK_SECRET` | Yes in production |

## psrtrain.com (pstrain-rebuild)

| Variable | Required |
|----------|----------|
| `CRON_SECRET` | Yes in production |
| `NEXT_PUBLIC_SUPABASE_*` | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only |
| `ADMIN_EMAILS` | Yes |
| `OPENAI_API_KEY` | Server only — AI routes require paid access |

## custodynote.com

| Variable | Required |
|----------|----------|
| `JWT_SECRET` | Yes |
| `ADMIN_PASSWORD_HASH` or `ADMIN_SECRET` | Yes |
| `ADMIN_API_TOKEN` | Recommended — separate from login password |
| `KV_REST_API_*` | Yes |
| `CRON_SECRET` | Yes |
| `LEMONSQUEEZY_WEBHOOK_SECRET` | Yes |
| `AWS_*` | If cloud backup enabled |

Generate admin secrets:

```bash
cd custody-note-website && node scripts/generate-admin-secrets.mjs
```

Purge legacy plaintext sync (once after encrypted sync deploy):

See [docs/LICENCE_KEY_INCIDENT.md](../custody-note-website/docs/LICENCE_KEY_INCIDENT.md).

## CustodyNote desktop app

- [ ] Cut GitHub release after merging encrypted sync (`npm run release:patch` in custody-note-app)
- [ ] Mac: sign/notarize before wide distribution (`npm run build:mac:signed`)
- [ ] Run `npm run security:audit` before each release

## Remaining manual items

- External pentest for CustodyNote (app + API) before large-scale rollout
- CSP tightening (`unsafe-eval` removal) — test carefully per site
- Next.js major upgrade on PSA — schedule separately
