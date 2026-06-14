# SEO Growth Programme — changes log

Running log of implementation (2026-06-12).

## Phase 1 — Audit

- Added `scripts/seo-growth-audit.mjs` — scans routes, metadata, canonicals, H1s
- Generated `seo-growth-police-station-agent/audit-report.md` (217 routes)
- Added `npm run seo-growth-audit`

## Phase 2 — Technical SEO

- 20 permanent redirects in `next.config.js` (local cover + service aliases)
- Fixed `kent-police-station-reps` canonical to `policestationagent.com`
- Migrated 9 local canonicals to `LocalCoverPage` template

## Phase 3 — Conversion

- `MobileStickyContactBar`, `ConversionCTAGroup`, `SolicitorInstructionChecklist`
- `ConversionEventListener` + extended `lib/analytics.ts`
- `HomeHeroCover` on homepage (Kent & Medway headline + 3 CTAs)
- Checklist on `/contact`

## Phase 4 — Local SEO

- Shared template: `components/local/LocalCoverPage.tsx`, `lib/seo/local-cover-data.ts`
- Enhanced `/coverage/areas/medway` for Chatham/Gillingham/Rochester redirects

## Phase 5 — Service pages

- New `/dscc-and-custody-record-support`
- AnswerFirstBlock + CTAs on voluntary, no-comment, RUI, bail, solicitors-agent-cover
- `/for-solicitors` H1 updated; `/services/police-station-representation` CTAs

## Phase 6 — Blog

- 6 new posts in `data/blog-posts/2026-06-12-*.json`
- `blog-publication-summary.md` documents 14 skipped duplicates

## Phase 7–8 — LLM & schema

- Extended `app/llms.txt/route.ts`
- FAQ/Service/Breadcrumb on local template; AuthorBox on blog posts
- Summary docs in `schema/`, `llms/`

## Phase 9 — Buffer

- `scripts/generate-buffer-calendar.mjs`
- `buffer/buffer-posts.csv`, `.json`, manual instructions
- MCP scheduling: manual fallback (see `buffer-scheduled-results.json` if MCP used)

## Phase 10–12 — Docs

- `content-calendar-90-days.md` + `.csv`
- `analytics/ANALYTICS_SETUP.md`
- `indexing/INDEXING_CHECKLIST.md`

## Phase 13–15 — Final

- `final-growth-report.md`
- Build verification + production deploy to https://web44ai.vercel.app (deployment `dpl_3kimRcyVVPfStu5Ns76tvBFv8Dxu`, 2026-06-14)
- Buffer: 15 posts scheduled to LinkedIn via MCP — see `buffer/buffer-scheduled-results.json`
