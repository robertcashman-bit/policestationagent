# Sibling patches (workspace error fixes)

The cloud agent could push only `robertcashman-bit/policestationagent`.
These patches are committed locally under `/tmp/siblings/*` on branch
`cursor/workspace-error-fixes-571e` and exported here for owner apply/push.

## Apply

### Policestationrepuk
```bash
cd Policestationrepuk
git am /opt/cursor/artifacts/sibling-patches/repuk/*.patch
# or: git apply ../repuk-workspace-error-fixes.patch
git push -u origin cursor/workspace-error-fixes-571e
```

### psrtrain
```bash
cd pstrain-rebuild
git am /opt/cursor/artifacts/sibling-patches/psrtrain/*.patch
git push -u origin cursor/workspace-error-fixes-571e
```

### custody-note-website
```bash
cd custody-note-website
git am /opt/cursor/artifacts/sibling-patches/custody-note/*.patch
git push -u origin cursor/workspace-error-fixes-571e
# Then ensure Vercel env: BUFFER_API_KEY, BUFFER_ORGANIZATION_ID,
# BUFFER_CHANNEL_LINKEDIN_ID, BUFFER_CHANNEL_FACEBOOK_ID,
# BUFFER_CHANNEL_GOOGLEBUSINESS_ID, CRON_SECRET, KV_*
```

## Post-deploy ops
1. Force schedule/verify:
   - `GET /api/buffer/schedule?force=1` + `/api/buffer/verify` on PSA, PSR Train, Custody Note
2. Retry Buffer `error` posts (Buffer UI/API)
3. PSA cleanup:
   ```
   /api/cron/firm-outreach-bootstrap?excludeEmails=1&dryRun=0&emails=dita_ag@abv.bg,...
   /api/cron/firm-outreach-bootstrap?cleanupBadEmails=1&allStatuses=1&dryRun=0
   ```
4. Resend `psrtrain.com`: add pending DNS (DKIM/SPF/MX) then re-verify
5. PSR Train Vercel env: `GOOGLE_SERVICE_ACCOUNT_JSON`, `GSC_SITE_URL=sc-domain:psrtrain.com`, `GA4_PROPERTY_ID`
6. Rotate GitHub PATs: `CustodyNote droid GH_PAT`, `psrtrain-push`
