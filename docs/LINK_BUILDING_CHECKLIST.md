# Your one-time checklist (manual — ~30 minutes)

Automated work is done in both repos. Complete these when convenient:

## Buffer (GitHub Actions)

Add repository secret **`BUFFER_API_KEY`** (Buffer → Settings → API → Personal Keys) so `.github/workflows/schedule-buffer.yml` schedules the 23-post calendar automatically.

For failed GBP posts, run workflow **Buffer GBP fix and retry** (see `GBP_NEXT_STEPS.md`).

## Google Business Profile
1. Claim profile using `GBP_OPTIMIZATION_CONTENT.md`
2. Set website to `https://www.policestationagent.com`
3. Send your public GBP URL to update `sameAs` in `config/link-authority.ts` (optional)

## Google Search Console
1. Verify `www.policestationagent.com`
2. Submit `https://www.policestationagent.com/sitemap.xml`
3. Submit `https://www.policestationagent.com/blog-sitemap.xml`

## SRA / Tuckers
1. Set website field on your SRA listing to `https://www.policestationagent.com`

## Deploy
- Push `policestationagent` and `Policestationrepuk` (Vercel auto-deploys if connected)

## Optional outreach
- See `docs/outreach/` for email templates to universities or local media
