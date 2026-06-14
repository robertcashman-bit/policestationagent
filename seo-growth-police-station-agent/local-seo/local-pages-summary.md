# Local SEO pages summary

## Strategy

Requested `/police-station-cover-*` slugs **301 redirect** to canonical pages (no fourth URL scheme). Canonical pages enhanced with shared `LocalCoverPage` template.

## Redirect map (implemented in `next.config.js`)

| Source | Target |
|--------|--------|
| `/police-station-representative-kent` | `/kent-police-station-reps` |
| `/police-station-cover-medway` | `/police-station-rep-medway` |
| `/police-station-cover-sevenoaks` | `/police-station-rep-sevenoaks` |
| `/police-station-cover-swanley` | `/police-station-rep-swanley` |
| `/police-station-cover-dartford` | `/police-station-rep-dartford` |
| `/police-station-cover-gravesend` | `/police-station-rep-gravesend` |
| `/police-station-cover-maidstone` | `/police-station-rep-maidstone` |
| `/police-station-cover-tonbridge` | `/police-station-rep-tonbridge` |
| `/police-station-cover-tunbridge-wells` | `/police-station-rep-tunbridge-wells` |
| `/police-station-cover-chatham` | `/coverage/areas/medway` |
| `/police-station-cover-gillingham` | `/coverage/areas/medway` |
| `/police-station-cover-rochester` | `/coverage/areas/medway` |

## Enhanced canonical pages (LocalCoverPage template)

| Page | Status |
|------|--------|
| `/kent-police-station-reps` | Migrated to LocalCoverPage (Kent hub) |
| `/police-station-rep-medway` | LocalCoverPage |
| `/police-station-rep-sevenoaks` | LocalCoverPage |
| `/police-station-rep-swanley` | LocalCoverPage |
| `/police-station-rep-dartford` | LocalCoverPage |
| `/police-station-rep-gravesend` | LocalCoverPage |
| `/police-station-rep-maidstone` | LocalCoverPage |
| `/police-station-rep-tonbridge` | LocalCoverPage |
| `/police-station-rep-tunbridge-wells` | LocalCoverPage |
| `/coverage/areas/medway` | Enhanced hero, answer-first, CTAs, FAQ schema, link to rep page |

## Template features

- Unique title (50–60 chars), meta (140–160), single H1
- Answer-first block, areas covered, station facts (no false office claims)
- FAQ (3–5) + FAQPage + Service + BreadcrumbList JSON-LD
- ConversionCTAGroup with `data-event` analytics
- Internal links: home, for-solicitors, contact, nearby towns
- GeneralLegalDisclaimer

## Phase 2 (logged, not bulk-implemented)

Legacy `{town}-police-station` scraped pages remain in audit report for phased 301 consolidation to rep canonicals where overlap is clear.
