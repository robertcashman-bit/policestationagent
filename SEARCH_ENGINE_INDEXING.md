# Search engine indexing (Google, Bing, DuckDuckGo)

How the site gets **fast indexing** and how to improve **ranking** on Google, Bing, and DuckDuckGo.

---

## How “instant” / top visibility works

- **Google**: Crawls the web and uses your sitemap. No “instant” API for most sites. Fast discovery comes from sitemap pings + Search Console.
- **Bing**: Same idea; also supports **IndexNow** so you can push URL lists for near-instant consideration.
- **DuckDuckGo**: Does **not** have its own URL submission. It uses **Bing** (and other sources). So:
  - **Bing sitemap ping + IndexNow** → better Bing index → **better DuckDuckGo visibility**.

---

## What this repo already does

1. **Sitemap**  
   - `/sitemap.xml` – all important pages with `lastmod`, `priority`, `changefreq`.

2. **Notifications after deploy**  
   - **IndexNow**: submits priority pages and all blog post URLs to IndexNow (Bing and other participating engines).
   - **Yandex**: `https://webmaster.yandex.com/ping?sitemap=<encoded sitemap URL>`
   - **Google**: submit `/sitemap.xml` and `/blog-sitemap.xml` in Google Search Console. Google no longer provides a public sitemap ping endpoint.

3. **IndexNow**  
   - After deploy, a list of priority URLs plus all blog posts is sent to IndexNow (used by Bing, Yandex, etc.).
   - Key file must be live: `https://<your-domain>/655b1cdbce5c462b9fe51c4e19f92678.txt` (see `public/`).

4. **GitHub Action**  
   - `.github/workflows/notify-search-engines.yml` runs on push to `main`/`master` (after a short delay for Vercel). It:
     - Submits the priority URL list and blog URLs to IndexNow.
     - Pings Yandex with the sitemap URL.
     - Optionally calls your site’s protected `POST /api/index-now` if `INDEXNOW_SECRET` is configured in GitHub Secrets and Vercel.

5. **Metadata & bots**  
   - Root layout: keyword-focused title/description, Open Graph, Twitter, `robots` (including `googleBot` and `bingBot`).
   - JSON-LD: WebSite, LegalService, LocalBusiness, Attorney.

---

## How to improve “show at top” (ranking + visibility)

### 1. One-time setup (recommended)

- **Google Search Console**  
  - Add property: `https://www.policestationagent.com` (or your canonical domain).  
  - Submit sitemap: `https://www.policestationagent.com/sitemap.xml`.  
  - Submit blog sitemap: `https://www.policestationagent.com/blog-sitemap.xml`.  
  - Use “URL Inspection” for critical pages if you want to request indexing.

- **Bing Webmaster Tools**  
  - Add site and verify.  
  - Submit same sitemap URL.  
  - Improves Bing index and therefore **DuckDuckGo** as well.

- **Optional: Vercel deploy hook**  
  - After each deploy, call your own API so indexing runs even without a git push:
    - `POST https://www.policestationagent.com/api/index-now`  
  - Or keep using the GitHub Action (runs on push to main/master).

### 2. Content and on-page SEO

- **Titles**: Unique per page, ~50–60 characters, include main keyword (e.g. “Police Station Solicitor Kent”, “Duty Solicitor Maidstone”).
- **Descriptions**: Unique per page, ~150–160 characters, clear benefit + location/keywords.
- **Headings**: One H1 per page; H2/H3 for structure. Use target keywords naturally.
- **Internal links**: Link from homepage and key hubs (e.g. /services, /police-stations) to important pages (locations, offences, “start” pages).

### 3. Technical

- **Canonical URL**: Already set in metadata; keep a single canonical domain (www vs non-www) and redirect the other.
- **Core Web Vitals**: LCP, FID, CLS. Current LCP tweaks (e.g. hero, preload) help; keep images and fonts optimized.
- **Mobile**: Responsive layout and viewport; helps Google and Bing.
- **Structured data**: Keep and extend JSON-LD (e.g. FAQPage on /faq, Article on blog posts) for richer snippets.

### 4. Run notifications manually

- From repo root:
  - `npm run notify:search-engines`
- Or call the API (optional secret in env):
  - `POST https://www.policestationagent.com/api/index-now`
  - Optional body: `{ "urls": ["https://...", ...] }` to submit specific URLs.

---

## Summary

| Goal                         | Action |
|-----------------------------|--------|
| **Show up fast on Google**  | Sitemap ping + add site + sitemap in Google Search Console. |
| **Show up fast on Bing**    | Sitemap ping + IndexNow (already in workflow) + Bing Webmaster + sitemap. |
| **Show up fast on DuckDuckGo** | No direct submit; **improve Bing indexing** (sitemap + IndexNow + Bing Webmaster). |
| **Rank better (all three)**  | Strong titles/descriptions, internal links, Core Web Vitals, structured data. |

The workflow and `/api/index-now` are already set up so that each deploy notifies Google, Bing, and Yandex and pushes priority URLs to IndexNow, which supports Bing (and thus DuckDuckGo) visibility.
