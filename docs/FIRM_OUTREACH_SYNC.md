# Firm outreach — shared package

Firm-outreach logic now lives in **`@robertcashman/firm-outreach-core`** (`../shared-packages/packages/firm-outreach-core`).

## Workflow

1. Edit shared code in `shared-packages/packages/firm-outreach-core/src/`.
2. `cd ../shared-packages/packages/firm-outreach-core && npm run build`
3. Site-specific copy/templates stay in `lib/firm-outreach/site-config.ts`, `templates.ts`, `send.ts`, etc.
4. Run `npm test` in **both** policestationagent and Policestationrepuk.

The old one-way sync script (`scripts/sync-firm-outreach-to-repuk.mjs`) is deprecated.
