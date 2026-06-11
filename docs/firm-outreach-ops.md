# Firm outreach — operations (Kent)

Automated agent-cover invitation emails to qualified criminal defence firms in Kent.

**Admin URL:** https://www.policestationagent.com/admin  
**Sign in:** Enter `robertdavidcashman@gmail.com` → receive 6-digit code by email → verify.

Requires **Upstash Redis** (sessions + prospect data) and **RESEND_API_KEY** (login codes + outreach emails) on Vercel.

## Cron schedule (UTC)

| Time | Route | What runs |
|------|-------|-----------|
| `03:00` | `/api/cron/firm-outreach-pipeline/maintain` | LAA + DSCC + discovery + requalify + enrich (25 firms, max ~240s) |
| `06:00` | `/api/cron/firm-outreach-enrich` | Enrich only (25 firms) |
| `08:00` | `/api/cron/firm-outreach-enrich` | Enrich only (25 firms) |
| `09:30` | `/api/cron/firm-outreach-pipeline/full` | Send from ready queue + daily digest |
| `17:00` | `/api/cron/firm-outreach-digest` | Digest backup if morning run did not send one |

All cron routes require `Authorization: Bearer $CRON_SECRET` (Vercel adds this automatically).

## Environment variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `RESEND_API_KEY` | — | **Required** for sends and digest |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | — | **Required** for prospect storage |
| `CRON_SECRET` | — | Cron auth + unsubscribe token signing |
| `FIRM_OUTREACH_COUNTY_ALLOWLIST` | `kent` | County filter for discovery |
| `FIRM_OUTREACH_DAILY_CAP` | `50` | Max outreach sends per UTC day |
| `FIRM_OUTREACH_DIGEST_EMAIL` | `CONTACT_FORM_TO_EMAIL` | Daily digest recipient |
| `FIRM_OUTREACH_CRON_ENRICH_BATCH` | `25` | Firms per cron enrich tick |
| `FIRM_OUTREACH_SEND_ENABLED` | enabled | Set `false` to disable automated sends |
| `FIRM_OUTREACH_PAUSED` | off | Set `true` to pause all sends |
| `FIRM_OUTREACH_DRY_RUN` | off | Set `true` to log sends without delivering |

## Brochure PDF

Generate before deploy (attached on first outreach email):

```bash
npm run firm-outreach:brochure
```

Output: `public/outreach/police-station-agent-kent-brochure.pdf`

## Manual commands

```bash
npm run firm-outreach:admin-smoke
npm run firm-outreach:discovery
npm run firm-outreach:enrich
npm run firm-outreach:send
npm run firm-outreach:pipeline
npm run firm-outreach:requalify
npm run test:firm-outreach
```

## Resend webhook

- **URL:** `https://www.policestationagent.com/api/webhooks/resend`
- **Events:** `email.delivered`, `email.opened`, `email.clicked`, `email.bounced`, `email.complained`

## Rollout

1. Add Upstash Redis + `RESEND_API_KEY` on Vercel (also enables admin magic-code login).
2. Deploy — outreach sends run automatically via cron (no manual toggles unless you set `FIRM_OUTREACH_SEND_ENABLED=false`).
3. Sign in at `/admin` to review queue and stats on the Overview and Firm outreach tabs.
4. Optional: set `FIRM_OUTREACH_DRY_RUN=true` only while testing sends without delivery.
