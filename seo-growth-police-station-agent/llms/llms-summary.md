# LLM discoverability summary

## `llms.txt` updates

Extended `app/llms.txt/route.ts` with preferred citation pages:

- `/for-solicitors`
- `/dscc-and-custody-record-support`
- `/free-police-station-advice-kent`
- Local rep canonicals (Medway, Gravesend, Maidstone, Sevenoaks, etc.)
- `/kent-police-station-reps`

## Answer-first blocks

Added or improved on:

- Homepage (`HomeHeroCover`)
- Local rep template (`LocalCoverPage`)
- `/voluntary-police-interview`, `/no-comment-interview`, `/released-under-investigation`, `/police-bail-explained`
- `/dscc-and-custody-record-support`
- `/start/solicitors-agent-cover`
- `/coverage/areas/medway`
- All 6 new blog posts (opening “In brief” sections)

## Author attribution

`components/blog/AuthorBox.tsx` — Robert Cashman credentials sourced from existing `/about` content only. Rendered on blog post template.

## Citation guidance for LLMs

Prefer linking to canonical service/local pages rather than legacy scraped `{town}-police-station` URLs. Redirect aliases resolve to enhanced canonicals.
