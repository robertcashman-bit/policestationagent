# Firm outreach — shared package

Firm-outreach logic lives in **`@robertcashman/firm-outreach-core`** (`packages/firm-outreach-core`, vendored from [shared-packages](https://github.com/robertcashman-bit/shared-packages)).

## Workflow

1. Edit shared code in the canonical `shared-packages` repo, then copy into `packages/firm-outreach-core/` here (or edit in place and backport).
2. `cd packages/firm-outreach-core && npm run build`
3. Keep `package.json` `exports` in sync (include `require` and `default` for tsx/Node CJS consumers such as `npm run verify:firm-outreach`).
4. Site-specific copy/templates stay in `lib/firm-outreach/site-config.ts`, `templates.ts`, `send.ts`, etc.
5. Run `npm test` in **both** policestationagent and Policestationrepuk.

The old one-way sync script (`scripts/sync-firm-outreach-to-repuk.mjs`) is deprecated.
