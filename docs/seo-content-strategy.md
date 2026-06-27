# policestationagent.com — SEO Content Strategy

> Part of the four-site SEO + Buffer programme (policestationrepuk.org, policestationagent.com, psrtrain.com, custodynote.com). See `docs/seo-cross-site-strategy.md` for the master cross-site map. This document is the site-scoped strategy: inventory, duplication triage, content plan, 90-day schedule, technical-SEO gaps, and Buffer plan.
>
> **Site intent angle:** Kent public, urgent / "I (or a family member) have been arrested or invited to interview — what now?" Conversion = phone call / instruct for police-station cover in Kent & Medway. This is the only one of the four sites that speaks to the **member of the public / accused person**.

## 1. Existing content inventory

Full machine-generated inventory of all 111 published posts is in **`docs/seo-inventory-table.md`** (regenerate with `node scripts/generate-seo-strategy-inventory.mjs`). Cross-site JSON: `docs/seo-inventory.json`.

Summary by content generation:

| Cohort | Count | Notes |
| --- | --- | --- |
| New Kent location/service posts (`data/blog-posts/*.json`, 2026-05 → 2026-06) | 46 | Strong, modern, location-specific, well-optimised. The growth engine. |
| Legacy imported posts (`data/blog-posts-full.json`) | ~65 | Mixed quality. Contains the near-duplicate clusters triaged in §2. |
| **Total published** | **111** | Index: `public/blog-posts.json`; reader: `lib/blog-reader.ts`. |

## 2. Duplication & cannibalisation triage (CRITICAL — blocks new content)

PSA's legacy import created multiple near-duplicate clusters competing for the same query. Each cluster gets a single **canonical owner** (keep + improve); the rest are **301 → canonical** (no deletions — Next.js `redirects()` in `next.config.js`, `permanent: true`). The modern Kent location posts are **CLEAR** (distinct local intent) and are kept.

### 2.1 "Duty solicitor" cluster (5 slugs)

| Slug | Verdict | Risk | Action |
| --- | --- | --- | --- |
| `what-is-a-duty-solicitor` | **CANONICAL (UPDATE)** | — | Keep as the single generic answer page; refresh + add FAQ. |
| `qualified-duty-solicitor-vs-police-station-rep-kent` | **CLEAR** | Low | Distinct "vs / Kent" intent. Keep. |
| `whats-a-duty-solicitor` | MERGE → 301 | High | 301 → `what-is-a-duty-solicitor`. |
| `what-is-a-duty-solicitor-4` | MERGE → 301 | High | 301 → `what-is-a-duty-solicitor`. |
| `understanding-the-role-of-a-duty-solicitor-everything-you-need-to-know` | MERGE → 301 | High | 301 → `what-is-a-duty-solicitor`. |

### 2.2 "Voluntary interview" cluster (17 slugs)

Kent location posts are CLEAR (distinct local intent): `dartford-…`, `maidstone-…`, `sevenoaks-…`, `voluntary-interview-at-swanley-police-station`, `voluntary-interview-letter-kent-what-to-do`. Generic legacy "what is / what happens / part 2/3/4" pages cannibalise each other:

| Slug | Verdict | Risk | Action |
| --- | --- | --- | --- |
| `what-s-a-voluntary-police-interview` | **CANONICAL (UPDATE)** | — | Single generic "what is a voluntary police interview" page. |
| `whats-a-voluntary-police-interview` | MERGE → 301 | High | 301 → `what-s-a-voluntary-police-interview` (typo/duplicate). |
| `what-happens-at-a-police-station-voluntary-interview-part-3` | MERGE → 301 | High | Series fragment → canonical. |
| `whats-happens-at-a-police-station-voluntary-interview-part-2` | MERGE → 301 | High | Series fragment → canonical. |
| `what-happens-at-a-police-station-voluntary-interview-page-4` | MERGE → 301 | High | Series fragment → canonical. |
| `inside-a-voluntary-police-interview-what-to-expect-part-2` | MERGE → 301 | High | Series fragment → canonical. |
| `police-voluntary-interview-questions-4` | MERGE → 301 | High | Fragment → canonical. |
| `what-happens-if-you-don-t-attend-a-voluntary-police-interview-in-england` | **CANONICAL (UPDATE)** | Med | Distinct "don't attend" intent — keep as canonical. |
| `what-happens-if-you-don-t-attend-a-voluntary-police-interview-inengland` | MERGE → 301 | High | Typo duplicate → `…-in-england`. |
| `the-hidden-risks-of-voluntary-police-interviews-in-the-uk-you-need-to-know` | UPDATE | Med | Distinct "risks" angle — keep, dedupe intro. |
| `how-digital-evidence-voluntary-police-interview` | **CLEAR** | Low | Distinct digital-evidence angle. Keep. |

### 2.3 "No further action" cluster (3 slugs)

| Slug | Verdict | Risk | Action |
| --- | --- | --- | --- |
| `no-further-action-after-police-interview-kent` | **CLEAR / CANONICAL** | Low | Kent-intent, modern. Primary owner. |
| `no-further-action-after-police-interview` | MERGE → 301 | Med | 301 → Kent canonical (or keep generic + cross-link; default 301). |
| `voluntary-interview-no-further-action` | UPDATE | Med | Distinct "VI → NFA" path; keep, point internal links to canonical. |

### 2.4 "Common assault" copy (2 slugs)

| Slug | Verdict | Risk | Action |
| --- | --- | --- | --- |
| `what-is-common-assault-in-english-law` | **CANONICAL** | — | Keep. |
| `copy-of-what-is-common-assault-in-english-law` | MERGE → 301 | High | Obvious copy → 301 to canonical. |

### 2.5 "Police bail / RUI" cluster (3 slugs)

| Slug | Verdict | Risk | Action |
| --- | --- | --- | --- |
| `police-bail-explained-kent` | **CLEAR / CANONICAL** | Low | Modern Kent page. Primary owner. |
| `understanding-police-bail-imposition-conditions-breaches-and-legal-implications-explained` | MERGE → 301 | High | Long legacy variant → canonical. |
| `demystifying-police-bail-understanding-imposition-conditions-breaches-and-legal-implications` | MERGE → 301 | High | Long legacy variant → canonical. |

**Remediation summary:** 13 legacy slugs to 301 (Phase 2), 0 deletions. Source of truth: `config/blog-slug-redirects.json` (wired into `next.config.js` `redirects()` and excluded from the index/sitemap/static params via `lib/blog-reader.ts`). Canonical owners already emit `<link rel="canonical">` via `app/blog/[slug]/page.tsx`. The published index dropped from 111 → 98 posts. Enforced by `__tests__/seo-cannibalisation.test.ts`.

## 3. Content plan (CLEAR ideas only)

PSA is mature (111 posts, deep Kent coverage). Priority is **consolidation + filling genuine gaps**, not volume. All ideas below are CLEAR against the existing inventory and against the cross-site map (PSA owns *public/urgent Kent* intent).

### 3.1 Priority articles (public, urgent, conversion-led)

| # | Working title | Slug | Primary keyword | Intent | Funnel | Priority | Words | Risk |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | What to do in the first hour after a Kent arrest | `first-hour-after-arrest-kent` | what to do after arrest kent | Informational→action | MOFU | 9 | 1300 | Low |
| 2 | Can I get a solicitor at 3am in Kent custody? | `out-of-hours-solicitor-kent-custody` | out of hours solicitor kent | Transactional | BOFU | 9 | 1100 | Low |
| 3 | Bringing a phone/items to a voluntary interview (Kent) | `what-to-bring-voluntary-interview-kent` | what to bring voluntary interview | Informational | MOFU | 8 | 1000 | Low |
| 4 | How much does a private police-station solicitor cost? | `private-police-station-solicitor-cost-kent` | police station solicitor cost | Commercial | BOFU | 8 | 1100 | Low |
| 5 | Arrested while on bail in Kent — what changes | `arrested-while-on-bail-kent` | arrested while on bail | Informational | MOFU | 7 | 1000 | Low |
| 6 | Police interview under caution vs voluntary — Kent | `caution-vs-voluntary-interview-kent` | interview under caution meaning | Informational | TOFU | 7 | 1100 | Low |
| 7 | What happens after charge at a Kent police station | `what-happens-after-charge-kent` | what happens after being charged | Informational | MOFU | 7 | 1100 | Low |
| 8 | Your rights if you're a witness asked to attend (Kent) | `witness-police-interview-kent` | witness police interview rights | Informational | TOFU | 6 | 900 | Low |

### 3.2 Quick wins (refresh/expand existing strong pages — boost, no new URL)

Refresh + add FAQ schema and internal links to: `no-comment-interview-kent`, `pace-code-c-kent-guide`, `appropriate-adult-kent`, `rui-kent-plain-english`, `custody-time-limits-kent`, `adverse-inference-kent`, `prepared-statements-kent`, `youth-custody-rights-kent`, `dna-fingerprints-police-station-kent`, `can-police-take-my-phone-kent`.

### 3.3 Location coverage (CLEAR — extends existing Kent set)

Existing strong: Dartford, Gravesend, Maidstone, Sevenoaks, Swanley, Tonbridge, Canterbury, Folkestone, Medway. Gaps (CLEAR): **Ashford, Chatham/Gillingham (own pages vs Medway hub), Margate/Thanet, Tunbridge Wells, Dover** — one "custody legal advice {town} kent" post each, mirroring the proven template.

### 3.4 Versus / FAQ / lead magnets / tools

- **Versus:** `duty-solicitor-vs-private-solicitor-kent` (CLEAR), `police-station-rep-vs-solicitor-kent` (CLEAR — see also REPUK canonical, cross-link not duplicate).
- **FAQ hub:** `kent-police-station-faq` aggregating answer-first Q&As with `FAQPage` schema.
- **Lead magnets (5):** "Voluntary interview prep checklist (PDF)", "What to say / not say card", "Family member arrested — action sheet", "Your PACE rights one-pager", "After NFA / RUI next-steps guide".
- **Tools (5):** custody-clock explainer (interactive), "Should I answer questions?" decision aid (informational, with disclaimer), nearest Kent custody suite finder (already partly covered by location pages), eligibility-for-free-advice checker, voluntary-interview date/letter helper.

## 4. 90-day publishing schedule (PSA slice)

Cadence: **2 new CLEAR posts/week** + 1 refresh/week. Phase 2 redirects ship before any new generic post.

| Weeks | Focus | Items |
| --- | --- | --- |
| 1–2 | Phase 2 remediation | Ship 13 legacy 301s (done); refresh `what-is-a-duty-solicitor`, `what-s-a-voluntary-police-interview` canonicals. |
| 3–4 | Priority 1–4 | first-hour-after-arrest, out-of-hours-solicitor, what-to-bring-VI, private-solicitor-cost. |
| 5–6 | Priority 5–8 + 2 refreshes | arrested-on-bail, caution-vs-voluntary, after-charge, witness-rights. |
| 7–9 | Location gaps | Ashford, Chatham, Margate/Thanet, Tunbridge Wells, Dover. |
| 10–13 | Versus + FAQ hub + lead magnets | versus pages, kent-police-station-faq, 2–3 lead magnets, decision-aid tool. |

## 5. Technical-SEO gap list & remediations

PSA is the strongest of the four technically. Gaps are minor:

| Area | Status | Action | Phase |
| --- | --- | --- | --- |
| Canonical tags | ✅ present (`app/blog/[slug]/page.tsx`) | none | — |
| BlogPosting + BreadcrumbList + FAQ schema | ✅ present | none | — |
| Twitter cards | ✅ `summary_large_image` | none | — |
| Legacy duplicate slugs | ✅ fixed | 13 × 301 via `config/blog-slug-redirects.json` + index exclusion | **2 (done)** |
| Author E-E-A-T | ✅ `AuthorBox` + Person schema | Add author `url` to a real `/about`/author page | 2 (low) |
| Internal linking from legacy → canonical | ⚠️ partial | Add contextual links in canonical owners | 2 |

Phase 2 redirect block (illustrative — appended to `redirects()`):

```js
// Legacy blog cannibalisation remediation (canonical + 301, no deletions)
{ source: "/blog/whats-a-duty-solicitor", destination: "/blog/what-is-a-duty-solicitor", permanent: true },
{ source: "/blog/what-is-a-duty-solicitor-4", destination: "/blog/what-is-a-duty-solicitor", permanent: true },
{ source: "/blog/understanding-the-role-of-a-duty-solicitor-everything-you-need-to-know", destination: "/blog/what-is-a-duty-solicitor", permanent: true },
{ source: "/blog/whats-a-voluntary-police-interview", destination: "/blog/what-s-a-voluntary-police-interview", permanent: true },
{ source: "/blog/what-happens-at-a-police-station-voluntary-interview-part-3", destination: "/blog/what-s-a-voluntary-police-interview", permanent: true },
{ source: "/blog/whats-happens-at-a-police-station-voluntary-interview-part-2", destination: "/blog/what-s-a-voluntary-police-interview", permanent: true },
{ source: "/blog/what-happens-at-a-police-station-voluntary-interview-page-4", destination: "/blog/what-s-a-voluntary-police-interview", permanent: true },
{ source: "/blog/inside-a-voluntary-police-interview-what-to-expect-part-2", destination: "/blog/what-s-a-voluntary-police-interview", permanent: true },
{ source: "/blog/police-voluntary-interview-questions-4", destination: "/blog/what-s-a-voluntary-police-interview", permanent: true },
{ source: "/blog/what-happens-if-you-don-t-attend-a-voluntary-police-interview-inengland", destination: "/blog/what-happens-if-you-don-t-attend-a-voluntary-police-interview-in-england", permanent: true },
{ source: "/blog/copy-of-what-is-common-assault-in-english-law", destination: "/blog/what-is-common-assault-in-english-law", permanent: true },
{ source: "/blog/understanding-police-bail-imposition-conditions-breaches-and-legal-implications-explained", destination: "/blog/police-bail-explained-kent", permanent: true },
{ source: "/blog/demystifying-police-bail-understanding-imposition-conditions-breaches-and-legal-implications", destination: "/blog/police-bail-explained-kent", permanent: true },
```

> **Guard:** when a slug is redirected it must be removed from `generateStaticParams()` output / the index, or excluded so Next.js serves the 301 (a redirect source that also exists as a static route still 301s in Next, but the index/sitemap should not list it). Autotest in §7 enforces "no redirected slug appears in `public/blog-posts.json`".

## 6. Buffer plan (PSA — already live)

PSA already auto-posts via `scripts/generate-buffer-calendar.mjs` → `scripts/schedule-buffer-posts.mjs` (GitHub Actions, 7 channels, `--resume` dedup by UTM `click_blog_{slug}_{channel}`). **No change needed** beyond ensuring new CLEAR posts flow into the calendar. Cross-site reconciliation (disabling the REPUK central feed for PSA) is handled in the REPUK doc + cross-site doc so PSA is not double-posted.

## 7. Autotests (this site)

Added `__tests__/seo-cannibalisation.test.ts`:
1. **No redirected slug is still published** — every redirect `source` under `/blog/...` in `next.config.js` must NOT appear as a slug in `public/blog-posts.json`.
2. **No duplicate slugs** in `public/blog-posts.json`.
3. **Inventory generator parity** — `docs/seo-inventory.json` PSA count equals `public/blog-posts.json` published count (catches drift).

Run: `npx vitest run __tests__/seo-cannibalisation.test.ts`.

## Sources

- PACE 1984 & Codes of Practice (Code C detention/questioning; Code D identification) — GOV.UK.
- Legal Aid Agency — police station / Legal Help guidance, GOV.UK.
- Next.js `redirects()` documentation (App Router) — nextjs.org.
- schema.org — `BlogPosting`, `BreadcrumbList`, `FAQPage`.

> _General information for England & Wales. Not legal advice on any specific case._
