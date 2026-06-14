# Structured data summary

## Implemented

| Page type | Schema | Location |
|-----------|--------|----------|
| Local rep pages (9) | FAQPage, Service, BreadcrumbList | `components/local/LocalCoverPage.tsx` |
| `/coverage/areas/medway` | FAQPage | `app/coverage/areas/[area-name]/page.tsx` |
| `/dscc-and-custody-record-support` | FAQPage, Service | Page component |
| Service guides (no-comment, RUI, bail) | FAQPage | Existing page JSON-LD |
| `/services/police-station-representation` | FAQPage, LegalService | ComprehensiveLegalServiceSchema |
| `/for-solicitors` | LegalService, Person | Existing schema components |
| New blog posts (6) | Article | Blog template + AuthorBox |
| Homepage | FAQPage | StructuredData component |
| Root layout | Organization, WebSite | `app/layout.tsx` |

## Not used (by design)

- Review / AggregateRating
- Fake LocalBusiness office locations
- Misleading geo coordinates

## Blog Article schema

New posts inherit blog `[slug]` Article JSON-LD. `AuthorBox` added before disclaimer on all blog posts via `app/blog/[slug]/page.tsx`.
