# Google Search Console actions

Property: `https://www.policestationagent.com` (or URL-prefix / Domain property covering this host).

Indexing is **not** instantaneous. These actions refresh Google’s understanding of corrected pages; results may take days or weeks.

## Priority corrected URLs

| Corrected URL | Reason | Old risk | New metadata / framing | Canonical | Sitemap | Recommended GSC action | Verification |
|---|---|---|---|---|---|---|---|
| https://www.policestationagent.com/police-station-rep-tonbridge | Primary Tonbridge SERP confusion | Critical — digits next to station language | Live: independent solicitor title/meta; Contact-only CTAs; no firm digits in visible HTML (Layer 2 harden Jul 2026) | Self | Yes | URL Inspection → Request indexing | Confirm snippet has no Call 01732 / SMS |
| https://www.policestationagent.com/blog/tonbridge-police-station-custody-and-interviews | Body/advert published Call/SMS next to Tonbridge custody | Critical | Runtime strip of firm phones; BlogAdvertBlock Contact-only; Header/Footer hide | Self | Blog sitemap | URL Inspection → Request indexing | View-source: no 01732/07535 outside scripts |
| https://www.policestationagent.com/tonbridge-psa-station | Thin duplicate scrape | Critical | **308** → `/police-station-rep-tonbridge` | Target | Removed from sitemap | Inspect redirect; Removals only if stale snippet persists after redirect | Expect 308 in live response |
| https://www.policestationagent.com/tonbridge-police-station | Legacy scrape | High | Already 308 → rep cover | Target | Removed | Confirm redirect still 308 | — |
| https://www.policestationagent.com/contact | Authoritative NAP | Medium | Routing panel 999/101 vs solicitor; labelled independent solicitor telephone | Self | Yes | Request indexing after deploy | Confirm disclaimer before number |
| https://www.policestationagent.com/sitemap.xml | Sitemap purged redirected station/agent URLs | High conflicting signals | Canonical rep URLs only for station clusters | — | — | Sitemaps → resubmit `/sitemap.xml` and `/blog-sitemap.xml` | Last read succeeds |

Also request indexing for other high-traffic covers after deploy: `/police-station-rep-medway`, `/police-station-rep-gravesend`, `/police-station-rep-canterbury`, `/police-station-rep-maidstone`.

## Outdated snippets

If Google continues to show “Call 01732…” beside Tonbridge Police Station after the live HTML no longer contains that text:

1. Search Console → Removals → **Temporarily remove** is generally **not** appropriate for keeping the page indexed.
2. Prefer **URL Inspection → Request indexing** on the corrected URL.
3. If a deprecated URL still appears with a misleading snippet, use Removals only for that obsolete URL after it 404/410s — our duplicates use **308**, so equity passes to the canonical.

## Manual checklist (account holder)

1. Open [Google Search Console](https://search.google.com/search-console) for `www.policestationagent.com`.
2. Sitemaps → submit/resubmit `https://www.policestationagent.com/sitemap.xml` and `https://www.policestationagent.com/blog-sitemap.xml`.
3. For each priority URL above: URL Inspection → confirm “URL is on Google” / crawl → **Request indexing**.
4. Performance → filter queries containing `tonbridge` + (`phone` OR `telephone` OR `number` OR `contact`) and note impressions/clicks as **police-contact confusion traffic** (do not optimise to increase these).
5. Separately track solicitor-intent queries (`solicitor`, `duty solicitor`, `legal advice`, `voluntary interview`).

## API status

No authorised Google Search Console API client is configured in this repository. Sitemap/IndexNow automation uses IndexNow/Bing paths where secrets exist. GSC URL Inspection remains manual.
