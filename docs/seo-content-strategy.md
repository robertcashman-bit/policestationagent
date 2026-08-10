# psrtrain.com — SEO Content Strategy

> Part of the four-site SEO + Buffer programme. See `docs/seo-cross-site-strategy.md` for the master cross-site map.
>
> **Site intent angle:** **Training / exam prep** for people *becoming* police station representatives (PSRAS, PACE, CIT, career). Conversion = course / question-bank sign-up (Supabase + LemonSqueezy). Speaks to candidates, not firms (REPUK) or the public (PSA).

## 1. Existing content inventory

Full inventory of all 20 posts in **`docs/seo-inventory-table.md`** (`lib/blog/content.ts` + `content-batch-2.ts`). Categories: **PSRAS Prep, PACE, CIT, Career.**

No duplicate slugs. All CLEAR internally.

## 2. Duplication & cannibalisation triage

- **Internal:** All 20 CLEAR. PACE Code C / appropriate adult / voluntary interview / adverse inference appear here but framed as **exam-prep / "what the assessment tests"**, distinct from PSA's public framing and custodynote's note-taking framing. Keep, cross-link to canonicals.
- **Cross-site:** psrtrain owns *training* intent. e.g. `appropriate-adult-at-custody` (psrtrain, exam) vs PSA `appropriate-adult-kent` (public) vs REPUK best-practice posts — all CLEAR with distinct intent; cross-site map assigns canonical ownership of the generic concept and requires cross-links.

## 3. Content plan (CLEAR ideas only)

### 3.1 Priority articles

| # | Working title | Slug | Primary keyword | Funnel | Priority | Words | Risk |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | PSRAS exam format & pass mark explained (2026) | `psras-exam-format-pass-mark-2026` | psras exam format | TOFU | 9 | 1400 | Low |
| 2 | How to pass the Critical Incidents Test (CIT) | `how-to-pass-critical-incidents-test` | critical incidents test | MOFU | 9 | 1500 | Low |
| 3 | PSRAS portfolio: evidence requirements checklist | `psras-portfolio-evidence-checklist` | psras portfolio | MOFU | 8 | 1200 | Low |
| 4 | Free PSRAS practice questions (sample set) | `free-psras-practice-questions` | psras practice questions | BOFU | 8 | 900 | Low |
| 5 | PACE Code C exam topics most candidates miss | `pace-code-c-exam-topics` | pace code c exam | MOFU | 7 | 1200 | Low |
| 6 | How long does PSRAS accreditation take? | `how-long-psras-accreditation-takes` | psras how long | TOFU | 7 | 900 | Low |
| 7 | Police station rep salary & career path 2026 | `police-station-rep-salary-career-2026` | police station rep salary | TOFU | 7 | 1100 | Low |
| 8 | CIT role-play: structuring your answer | `cit-role-play-structure` | cit role play | MOFU | 6 | 1000 | Low |

### 3.2 Quick wins

Add FAQ + cross-links to: `first-week-psras-revision-plan`, `mock-exam-strategy-for-psras`, `six-week-psras-study-plan`, `timed-mcq-techniques-psras`, `finding-trainee-police-station-rep-jobs`.

### 3.3 Authority / pillar

- `complete-psras-guide` pillar linking all PSRAS Prep posts.
- `pace-for-police-station-reps` pillar linking all PACE posts.

### 3.4 Lead magnets / tools

- **Lead magnets (new — site has NO email capture, this is the biggest gap):** free 20-question PSRAS sample (email-gated), 6-week study planner PDF, CIT scenario pack, Code C cheat sheet, portfolio template.
- **Tools:** question bank (exists), timed mock mode (exists), study-plan generator, readiness self-assessment quiz.

## 4. 90-day publishing schedule

Cadence: **2 posts/week.**

| Weeks | Items |
| --- | --- |
| 1–2 | Phase 2 tech-SEO (BreadcrumbList, Person author, Twitter cards, email capture component); priority 1–2. |
| 3–5 | priority 3–5 + free-practice-questions lead magnet. |
| 6–8 | priority 6–8 + 2 quick-win refreshes. |
| 9–13 | 2 pillar pages + study-planner + readiness quiz. |

## 5. Technical-SEO gap list & remediations (Phase 2 — this site has the most)

| Area | Status | Action | Phase |
| --- | --- | --- | --- |
| BreadcrumbList schema | ❌ missing | Add `BreadcrumbList` JSON-LD to blog/guide pages | **2** |
| Author | ⚠️ `Organization` only | Add a `Person` author (E-E-A-T) to `BlogPosting` | **2** |
| Per-page Twitter cards | ❌ missing | Add `twitter` block to `pageMetadata()` | **2** |
| Blog→course CTA | ⚠️ weak | Add CTA + email capture to `BlogArticleView` footer | 2 |
| Email capture | ❌ none site-wide | Add newsletter/lead-magnet capture component | 2 |
| Canonical | ✅ via `pageMetadata()` | none | — |
| BlogPosting schema | ✅ in `BlogArticleView` | enrich (author Person, breadcrumb) | 2 |

**Phase 2 changes implemented:**
- `lib/page-metadata.ts`: add `twitter` (summary_large_image) to returned `Metadata`.
- `components/blog/BlogArticleView.tsx`: add `BreadcrumbList` JSON-LD + `Person` author in `BlogPosting`.
- New `components/blog/BlogCtaCapture.tsx`: email capture + course CTA (server-safe, posts to a new route; no secrets client-side).

## 6. Buffer plan (Phase 3 — NEW, ported from PSA/REPUK pattern)

psrtrain has **no Buffer** today. Phase 3 ports the proven pattern:
- Server-side route `app/api/buffer/schedule/route.ts` (Bearer `CRON_SECRET`), never client-exposed.
- `lib/buffer/` module: client (Buffer GraphQL), config (env-driven channels), feed = local blog posts, per-platform copy (LinkedIn/Facebook/X/GBP), staggered schedule, KV/URL dedup by `campaign={slug}`.
- Env: `BUFFER_ACCESS_TOKEN`/`BUFFER_API_KEY`, `BUFFER_ORGANIZATION_ID`, `BUFFER_CHANNEL_*_ID` — documented in `.env.example`.
- **REPUK reconciliation:** REPUK must drop the `psrtrain` RSS feed from its central scheduler when this goes live (see REPUK doc §6 / cross-site doc).
- One test post before site-wide enable (Phase 3 buffer-test).

## 7. Autotests (this site)

- Existing: `npm run test:unit`, `npm run copy:audit`, `npm run test:blog`, `npm run typecheck`.
- Added (Phase 2/3): `tests/unit/blog-schema.test.ts` (asserts BlogPosting has Person author + BreadcrumbList emitted), `tests/unit/buffer-port.test.ts` (dedup + per-platform copy + stagger logic).

## Sources

- SRA — Police Station Representatives Accreditation Scheme (PSRAS) materials.
- PACE 1984 Codes of Practice C and D — GOV.UK.
- schema.org — `BlogPosting`, `BreadcrumbList`, `Person`.
- Next.js App Router metadata API (`twitter`) — nextjs.org.

> _Training information for prospective police station representatives in England & Wales. Not legal advice._
