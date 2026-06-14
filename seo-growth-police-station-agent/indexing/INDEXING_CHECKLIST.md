# Indexing checklist

## After deploy

1. **Verify production URLs** — spot-check redirects and new pages on `https://policestationagent.com`
2. **Google Search Console** — URL inspection for:
   - `/kent-police-station-reps`
   - `/dscc-and-custody-record-support`
   - `/police-station-rep-medway` (and other rep pages)
   - 6 new blog posts under `/blog/…`
3. **Bing Webmaster Tools** — submit sitemap `https://policestationagent.com/sitemap.xml`
4. **IndexNow** — run `npm run indexnow` (or `node scripts/notify-search-engines.js`) after deploy

## Priority URLs for IndexNow

```
/
/for-solicitors
/kent-police-station-reps
/dscc-and-custody-record-support
/police-station-rep-medway
/police-station-rep-gravesend
/blog/instructing-a-police-station-representative
/blog/custody-record-number-dscc-reference
/blog/when-to-instruct-police-station-agent
/blog/police-station-attendance-notes
/blog/freelance-police-station-agents-for-solicitors
/blog/police-station-cover-criminal-defence-firms-kent-medway
```

## Sitemap

Dynamic sitemap at `app/sitemap.ts` — redirect-only alias slugs are **not** listed; canonical targets remain indexed.

## Robots

`app/robots.ts` — AI crawlers allowed; `/admin` blocked.
