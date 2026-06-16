# Firm outreach — keeping PSA and RepUK in sync

`lib/firm-outreach/` is duplicated between **policestationagent** (canonical) and **Policestationrepuk**. Fixes should land in PSA first, then sync to RepUK:

```bash
# Preview
node scripts/sync-firm-outreach-to-repuk.mjs

# Apply (then commit in Policestationrepuk)
node scripts/sync-firm-outreach-to-repuk.mjs --apply
cd ../Policestationrepuk && git diff lib/firm-outreach
```

Long term, extract a private npm package or git submodule so both apps depend on one source tree.
