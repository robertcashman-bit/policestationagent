# SEO police-number remediation — final report

**Branch:** `fix/seo-police-number-confusion`  
**Date:** 2026-07-24  
**Site:** https://www.policestationagent.com

## Executive summary

Search snippets were associating Robert Cashman’s private solicitor numbers (`01732 247427`, `07535 494446`) with Tonbridge / Kent Police contact intent. Root causes: station-adjacent CTAs and SMS digits on high-risk routes, blog/meta titles pairing station names with “Call 01732…”, duplicate thin station scrapes (`*-psa-station`), and sitemap listings of redirected URLs.

Remediation keeps legitimate solicitor SEO while preventing police-contact confusion: solicitor-intent metadata, server-rendered not-police notices, digits only on Contact (and clear solicitor-intent pages), 308 consolidation to `/police-station-rep-*`, schema clarifying independent LegalService, automated CI audit.

## Root causes

1. **Snippet collision:** Station/town entity + telephone modifier + firm number in titles/metas/blogs.
2. **SMS digit leak:** Voice digits hidden on station routes, but SMS digits still published (ConversionCTAGroup, Footer, sticky bar).
3. **Duplicate indexable scrapes:** `*-psa-station` (and related) still live alongside canonical rep covers.
4. **Sitemap conflict:** Redirected `*-police-station` / agent / solicitor URLs still listed.
5. **Weak Tonbridge framing:** “Police Station Rep” titles without strong independent-solicitor / 101–999 disambiguation.

## Immediate Tonbridge corrections

| Item | Status |
|---|---|
| Cover title / H1 / meta | Done — Independent Solicitor framing; not Kent Police; 101/999; no firm digits |
| NotPoliceNotice before CTAs | Done |
| `/tonbridge-psa-station` → 308 `/police-station-rep-tonbridge` | Done |
| Blog meta stripped of Call/text digits | Done |
| Local crawl verified | Title/H1/notice/nosnippet/redirects/sitemap OK |

## Site-wide risky pages corrected

- Blog metas (14) cleaned of firm phones in `metaDescription`
- Local cover metas strengthened with not-police / 101–999
- Home + free-advice titles stripped of `01732`
- Shared components: `NotPoliceNotice`, `SolicitorContactBlock`, `RouteAwareSmsLink`
- SMS/voice digits hidden on police-contact-intent paths

## Duplicate / legacy consolidation

- All `*-psa-station` → matching `/police-station-rep-*` (308 via `config/legacy-local-redirects.js`)
- Expanded agent/solicitor redirects including Tonbridge/Medway/etc.
- Sitemap: agent paths emptied; redirected solicitor/station hard-codes removed

## Structured data

- LegalService description: not affiliated with Kent Police
- `contactPoint` → `/contact`
- LocalBusiness description + `/contact` URL
- Cover Service schema: no telephone; solicitor provider framing
- No `PoliceStation` schema owned by this site (crawl verified)

## Automated tests & CI

- Extended `__tests__/police-confusion-score.test.ts` (titles, snippets, Tonbridge, redirects)
- Updated `__tests__/contactScope.test.ts`
- `scripts/seo-police-number-inventory.ts` → `reports/seo-police-number-audit.{json,md}`
- `.github/workflows/seo-confusion-audit.yml` (PR, push, daily, dispatch + deduped issue marker)
- `ci.yml` runs `npm run seo:police-confusion`
- Publish guard: `scripts/lib/police-confusion-publish-guard.mjs`
- `verify-rep-page-seo.mjs` accepts solicitor-intent titles; blocks firm phones in cover meta

## Search-engine submissions

| Channel | Status |
|---|---|
| IndexNow | **Not run** — secrets absent locally; see `reports/bing-indexnow-actions.md` |
| GSC API | Not configured — manual checklist in `reports/google-search-console-actions.md` |
| Manual actions | `reports/manual-actions-required.md` |

## Pre-existing failures (unchanged)

See `reports/baseline-failures.md`: lint 9 warnings (0 errors); no baseline test/build failures.

## Commands / results

| Command | Result |
|---|---|
| `npm run lint` | 0 errors, 9 pre-existing warnings |
| `npm test` | Pass |
| `npm run seo:police-confusion` | 38 pages, avg 15, **high-risk 0** |
| `npm run seo:police-number-inventory` | 211 occurrences inventoried |
| `npm run build` | Pass |
| Local crawl (`reports/local-crawl-verification.json`) | Tonbridge OK; 308s OK; Contact routing OK; sitemap clean of redirected Tonbridge URLs |

## Key files changed

- `config/contact.ts`, `config/legacy-local-redirects.js`
- `lib/seo/local-cover-data.ts`, `lib/seo/police-confusion-score.ts`
- `components/compliance/NotPoliceNotice.tsx`, `SolicitorContactBlock.tsx`, `RouteAwareSmsLink.tsx`
- `components/conversion/ConversionCTAGroup.tsx`, `MobileStickyContactBar.tsx`, `Footer.tsx`, `RouteAwarePhoneLink.tsx`
- `components/local/LocalCoverPage.tsx`
- `app/contact/page.tsx`, `app/layout.tsx`, `app/sitemap.ts`, `app/home/page.tsx`, `app/free-police-station-advice-kent/page.tsx`
- `data/blog-posts/*.json` (metas), `data/blog-image-registry.json`
- `__tests__/police-confusion-score.test.ts`, `__tests__/contactScope.test.ts`
- `.github/workflows/seo-confusion-audit.yml`, `.github/workflows/ci.yml`
- `scripts/seo-police-number-inventory.ts`, `scripts/verify-rep-page-seo.mjs`, `scripts/gsc-priority-urls.mjs`, `scripts/lib/police-confusion-publish-guard.mjs`
- `reports/*`

## Routes changed (principal)

- `/police-station-rep-tonbridge` (metadata + notice)
- All `/police-station-rep-*` covers (meta not-police/101)
- `/contact` (routing panel)
- 308: all `*-psa-station`, expanded solicitor/agent/station aliases
- Blog: Tonbridge + 13 other station/custody metas

## Rollback

```bash
git checkout master
# or revert the PR / redeploy previous Vercel production deployment
```

## Remaining limitations / risks

1. **Layout JSON-LD** still includes firm `telephone` sitewide on the LegalService entity (correct ownership, but present in HTML source of every page).
2. **Blog body CTAs** may still mention firm numbers with solicitor framing — metas cleaned; body numbers on solicitor-intent blogs remain for conversion (labelled; NOT Kent Police already in posts).
3. **Google/Bing snippet refresh is not instant** — manual GSC URL Inspection required.
4. **External directories / GBP** may still mislabel NAP — see manual actions.
5. **SERP/GSC API monitors** skipped without secrets.

## Deployment verification steps

1. Merge PR → CI green including `seo-confusion-audit`.
2. Vercel production deploy.
3. `npm run indexnow` with secrets (or notify-search-engines workflow).
4. Complete GSC/Bing manual checklist.
5. Spot-check live `/police-station-rep-tonbridge` HTML: notice before CTAs, no SMS/voice digits, meta clean.
