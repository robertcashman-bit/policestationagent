# Your one-time checklist (manual — ~30 minutes)

Automated work is done in both repos. Complete these when convenient:

## Buffer (GitHub Actions)

Add repository secret **`BUFFER_API_KEY`** (Buffer → Settings → API → Personal Keys) so `.github/workflows/schedule-buffer.yml` schedules the 23-post calendar automatically.

For failed GBP posts, run workflow **Buffer GBP fix and retry** (see `GBP_NEXT_STEPS.md`).

## Google Business Profile
1. Claim profile using `GBP_OPTIMIZATION_CONTENT.md`
2. Set website to `https://www.policestationagent.com`
3. Set `GOOGLE_BUSINESS_PROFILE_URL` in Vercel env → adds GBP to schema `sameAs`
4. Weekly posts: `node scripts/gbp-weekly-post.mjs` (copy into GBP or Buffer GBP channel)

## Google Search Console
1. Verify `www.policestationagent.com` (set `GOOGLE_SITE_VERIFICATION` in Vercel)
2. Run `npm run seo:setup-indexing` for automated sitemap checks + IndexNow
3. Submit `https://www.policestationagent.com/sitemap.xml` and `/blog-sitemap.xml`
4. Monthly priority URLs: `npm run seo:gsc-priority`

## SRA / Tuckers
1. Set website field on your SRA listing to `https://www.policestationagent.com`

## Deploy
- Push `policestationagent` and `Policestationrepuk` (Vercel auto-deploys if connected)

## Optional outreach
- See `docs/outreach/` for email templates to universities or local media
- **Firm outreach pipeline** — automated Kent firm invitations build brand mentions and backlinks (`docs/firm-outreach-ops.md`)
- **RepUK profile** — ensure `REPUK_PROFILE_URL` in footer links to your canonical rep profile
- **Directory citations** — copy-paste anchors from `/link-to-us` (`DIRECTORY_CITATIONS` in `config/link-authority.ts`)
