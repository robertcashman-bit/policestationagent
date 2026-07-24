# Bing / IndexNow actions

## Configuration present in repo

- IndexNow key file: `public/655b1cdbce5c462b9fe51c4e19f92678.txt`
- Notify script: `scripts/notify-search-engines.js` (`npm run indexnow`)
- Workflow: `.github/workflows/notify-search-engines.yml`
- Env: `INDEXNOW_SECRET` / `INDEXNOW_KEY`, `BING_WEBMASTER_API_KEY` (see `.env.example`)

## Priority URLs to submit after production deploy

```
https://www.policestationagent.com/police-station-rep-tonbridge
https://www.policestationagent.com/blog/tonbridge-police-station-custody-and-interviews
https://www.policestationagent.com/contact
https://www.policestationagent.com/police-station-rep-medway
https://www.policestationagent.com/police-station-rep-gravesend
https://www.policestationagent.com/sitemap.xml
https://www.policestationagent.com/blog-sitemap.xml
```

## Commands (secrets required — do not commit)

```bash
# After production deploy with INDEXNOW_SECRET set:
npm run indexnow
# or priority list:
node scripts/gsc-priority-urls.mjs --ping
```

Log HTTP status codes only; never log API keys.

## Bing Webmaster Tools (manual if API key unavailable)

1. Open Bing Webmaster Tools for `www.policestationagent.com`.
2. Sitemaps → submit `https://www.policestationagent.com/sitemap.xml`.
3. URL submission / IndexNow for the priority list above.
4. Content removal only for obsolete URLs that should leave the index (prefer 308 consolidations already in place).

## Status this session

IndexNow was **not** executed against production from this remediation branch unless `INDEXNOW_SECRET` is present in the local environment. After merge + Vercel production deploy, run the notify workflow or `npm run indexnow` with secrets.
