# Manual actions required (account holder)

These cannot be completed safely from repository code alone.

After the Layer 2 digit-hardening deploy, also follow [`reports/misdirect-monitor-checklist.md`](misdirect-monitor-checklist.md) (GSC re-index Tonbridge URLs + weekly SERP/Answer checks).

## 1. Google Search Console — URL Inspection

| Field | Value |
|---|---|
| Platform | Google Search Console |
| Property | `https://www.policestationagent.com` (or domain property covering it) |
| URLs | See `reports/google-search-console-actions.md` priority table |
| Reason | Snippets associated Robert Cashman’s numbers with Tonbridge / Kent Police contact intent |
| Required action | For each priority URL: Inspection → Confirm live HTML → Request indexing |
| Evidence | Live title/meta must show independent solicitor framing; no `01732` in Tonbridge title/meta |
| Expected result | Updated snippet within days–weeks (not guaranteed) |
| Follow-up | Re-check Performance queries for `tonbridge phone` / `tonbridge police station telephone` |

## 2. Google Search Console — Sitemap resubmit

| Field | Value |
|---|---|
| Platform | Google Search Console |
| Property | Same as above |
| URLs | `https://www.policestationagent.com/sitemap.xml`, `https://www.policestationagent.com/blog-sitemap.xml` |
| Reason | Redirected station/agent URLs removed from sitemap |
| Required action | Sitemaps → Add/Test/Resubmit |
| Evidence | Sitemap no longer lists `/tonbridge-police-station` or `/tonbridge-psa-station` |
| Expected result | “Success” last read |
| Follow-up | Monitor Coverage / Page indexing for redirected URLs |

## 3. Bing Webmaster — Sitemap + IndexNow

| Field | Value |
|---|---|
| Platform | Bing Webmaster Tools |
| Property | `www.policestationagent.com` |
| Reason | Refresh Bing (and Yahoo/DuckDuckGo via Bing) after metadata/redirect fixes |
| Required action | Submit sitemap; submit priority URLs via IndexNow if not automated |
| Evidence | Response codes from IndexNow / sitemap acceptance |
| Expected result | Queued for crawl |
| Follow-up | Check Bing URL inspection for Tonbridge cover |

## 4. Google Business Profile (if any listing exists)

| Field | Value |
|---|---|
| Platform | Google Business Profile |
| Account | Any profile for Robert Cashman / Police Station Agent / Tuckers Kent |
| Reason | Ensure category is legal services / solicitor, not police/government |
| Required action | Verify category, phone ownership label, description says independent solicitor not Kent Police |
| Evidence | Category + description screenshot |
| Expected result | No “police station” primary category |
| Follow-up | Review Q&A for misdirected “police phone” questions |

## 5. External directories

| Field | Value |
|---|---|
| Platform | Any local directories listing firm phone beside “Tonbridge Police Station” |
| Reason | Third-party scrapes may still show confusing NAP |
| Required action | Correct or request removal of police-directory framing |
| Evidence | Before/after listing text |
| Expected result | Firm phone labelled as solicitor only |

## 6. Analytics call classification (optional)

| Field | Value |
|---|---|
| Platform | Existing analytics / call tracking |
| Reason | Measure reduction in misdirected police calls |
| Required action | Aggregate outcomes only: solicitor enquiry / firm agency / misdirected police / other — **no case details** |
| Evidence | Weekly counts |
| Expected result | Decline in misdirected police category |

## Not claimed

- Instant reindexing
- Automated Google UI manipulation
- Access to accounts without configured credentials
