# Firm outreach — operations

Automated agent-cover invitation emails to qualified criminal defence firms across England & Wales.

> **2026-08-21:** Police Station Agent prospect sends and the Kent agent-cover owner digest are **permanently disabled** in this repo (`PSA_OUTREACH_EMAILS_DISABLED`). Firm outreach and digests continue from **Policestationrepuk**. Discovery/enrich/maintain crons may still run for admin visibility only.

**Admin URL:** https://www.policestationagent.com/admin  
**Sign in:** Enter `robertdavidcashman@gmail.com` → receive 6-digit code by email → verify.

Requires **Upstash Redis** (sessions + prospect data) and **RESEND_API_KEY** (login codes + outreach emails) on Vercel.

## Cron schedule (UTC)

| Time | Route | What runs |
|------|-------|-----------|
| `03:00` | `/api/cron/firm-outreach-pipeline/maintain` | LAA + DSCC + discovery + requalify (240s budget; website checks Sunday only); Sunday requeues `no_email` |
| `05:00` | `/api/cron/firm-outreach-enrich` | Enrich only (~60 firms, ~270s max) |
| `06:00` | `/api/cron/firm-outreach-enrich` | Enrich only (~60 firms, ~270s max) |
| `07:00` | `/api/cron/firm-outreach-enrich` | Enrich only (~60 firms, ~270s max) |
| `08:00` | `/api/cron/firm-outreach-enrich` | Enrich only (~60 firms, ~270s max) |
| `10:00` | `/api/cron/firm-outreach-enrich` | Enrich only (~60 firms, ~270s max) |
| `12:00` | `/api/cron/firm-outreach-enrich` | Enrich only (~60 firms, ~270s max) |
| `14:00` | `/api/cron/firm-outreach-enrich` | Enrich only (~60 firms, ~270s max) |
| `18:00` | `/api/cron/firm-outreach-enrich` | Enrich only (~60 firms, ~270s max) |
| `09:30` | `/api/cron/firm-outreach-pipeline/full` | No-op while PSA kill-switch is on (was auto-send / approval) |
| ~~`14:30` / `18:30`~~ | ~~`/api/cron/firm-outreach-send`~~ | **Removed from schedule** — PSA prospect sends permanently off |
| ~~`*/15`~~ | ~~`/api/cron/firm-outreach-kent-corrections`~~ | **Removed from schedule** — Kent corrections permanently off |
| ~~`17:00`~~ | ~~`/api/cron/firm-outreach-digest`~~ | **Removed from schedule** — Kent agent-cover owner digest permanently off (RepUK owns digests) |

All cron routes require `Authorization: Bearer $CRON_SECRET` (Vercel adds this automatically).

## Environment variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `RESEND_API_KEY` | — | **Required** for sends and digest |
| `RESEND_WEBHOOK_SECRET` | — | **Required in production** — Resend webhook signing secret (`whsec_…` from `npm run firm-outreach:configure-resend`) |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | — | **Required** for prospect storage |
| `CRON_SECRET` | — | Cron auth + unsubscribe token signing |
| `FIRM_OUTREACH_COUNTY_ALLOWLIST` | _(empty — all counties)_ | Optional comma-separated county filter for discovery |
| `FIRM_OUTREACH_DAILY_CAP` | `5000` | Max outreach sends per UTC day. Use `0` for uncapped. Legacy values ≤100 are treated as uncapped (old free-tier throttle). |
| `FIRM_OUTREACH_REQUIRE_APPROVAL` | *(unset = approval required)* | Set **`false`** on Vercel for automatic sends; set `true` for click-to-send |
| `FIRM_OUTREACH_DIGEST_EMAIL` | `robertdavidcashman@gmail.com` | Digest + post-send confirmation recipient |
| `FIRM_OUTREACH_CRON_ENRICH_BATCH` | `60` | Firms per cron enrich tick |
| `FIRM_OUTREACH_ENRICH_MAX_MS` | `270000` | Wall-clock cap per enrich cron run |
| `SERPER_API_KEY` | — | Google search when SRA has no website |
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
npm run verify:firm-outreach
FIRM_OUTREACH_VERIFY_URL=https://www.policestationagent.com npm run verify:firm-outreach
npm run firm-outreach:admin-smoke
npm run firm-outreach:discovery
npm run firm-outreach:enrich
npm run firm-outreach:send
npm run firm-outreach:pipeline
npm run firm-outreach:requalify
npm run test:firm-outreach
npx tsx scripts/firm-outreach-audit-today.ts
FIRM_OUTREACH_BOOTSTRAP_SECRET=... npx tsx scripts/firm-outreach-audit-today.ts
```

## Resend webhook

- **URL:** `https://www.policestationagent.com/api/webhooks/resend`
- **Events:** `email.sent`, `email.delivered`, `email.opened`, `email.clicked`, `email.bounced`, `email.complained`
- **Setup:** `npm run firm-outreach:configure-resend` — prints `RESEND_WEBHOOK_SECRET=whsec_…` to add on Vercel

## Rollout

1. Add Upstash Redis + `RESEND_API_KEY` on Vercel (also enables admin magic-code login).
2. Deploy — outreach sends run automatically via cron (no manual toggles unless you set `FIRM_OUTREACH_SEND_ENABLED=false`).
3. Sign in at `/admin` to review queue and stats on the Overview and Firm outreach tabs.
4. Optional: set `FIRM_OUTREACH_DRY_RUN=true` only while testing sends without delivery.

## Reliability notes

- Enrichment uses active-campaign record status and a sliding scan window — LAA firms without email are prioritised each tick.
- Cron enrich uses batches of **60** (default) with a 270s wall-clock guard.
- Enrich crons remain scheduled; PSA send/digest/kent-correction crons are **not** scheduled while the kill-switch is on.
- Nightly maintain requalify downgrades `ready_to_send` rows with implausible emails or failed MX checks (batch-limited).
- Post-deploy kick and send approval flows remain gated by `PSA_OUTREACH_EMAILS_DISABLED`.
- **Do not** set `FIRM_OUTREACH_FORCE_SEND=true` unless deliberately resuming PSA outreach.
