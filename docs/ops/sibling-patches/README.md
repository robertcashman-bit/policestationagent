# Sibling patches (workspace error fixes)

Cloud agent GitHub App can write only to `robertcashman-bit/policestationagent`.
Sibling remotes (`Policestationrepuk`, `psrtrain`, `custody-note-website`) return 403.

To unblock delivery, full sibling trees were pushed as **orphan mirror branches** on this repo:

| Site | Mirror branch on policestationagent |
|------|-------------------------------------|
| REPUK | `sibling/repuk/cursor/workspace-error-fixes-571e` |
| PSR Train | `sibling/psrtrain/cursor/workspace-error-fixes-571e` |
| Custody Note | `sibling/custody-note/cursor/workspace-error-fixes-571e` |

Patch files in this directory remain as a lightweight alternative.

## Apply mirror branches into real remotes (recommended)

### Policestationrepuk
```bash
cd Policestationrepuk
git fetch https://github.com/robertcashman-bit/policestationagent \
  sibling/repuk/cursor/workspace-error-fixes-571e
git checkout -B cursor/workspace-error-fixes-571e FETCH_HEAD
git push -u origin cursor/workspace-error-fixes-571e
# open PR into master
```

### psrtrain
```bash
cd pstrain-rebuild   # or psrtrain checkout
git fetch https://github.com/robertcashman-bit/policestationagent \
  sibling/psrtrain/cursor/workspace-error-fixes-571e
git checkout -B cursor/workspace-error-fixes-571e FETCH_HEAD
git push -u origin cursor/workspace-error-fixes-571e
```

### custody-note-website
```bash
cd custody-note-website
git fetch https://github.com/robertcashman-bit/policestationagent \
  sibling/custody-note/cursor/workspace-error-fixes-571e
git checkout -B cursor/workspace-error-fixes-571e FETCH_HEAD
git push -u origin cursor/workspace-error-fixes-571e
# Ensure Vercel env: BUFFER_API_KEY, BUFFER_ORGANIZATION_ID,
# BUFFER_CHANNEL_LINKEDIN_ID, BUFFER_CHANNEL_FACEBOOK_ID,
# BUFFER_CHANNEL_GOOGLEBUSINESS_ID, CRON_SECRET, KV_*
```

## Apply patch files (alternative)

```bash
cd Policestationrepuk && git am path/to/docs/ops/sibling-patches/repuk/*.patch
cd pstrain-rebuild && git am path/to/docs/ops/sibling-patches/psrtrain/*.patch
cd custody-note-website && git am path/to/docs/ops/sibling-patches/custody-note/*.patch
```

## Post-deploy ops
1. Force schedule/verify:
   - `GET /api/buffer/schedule?force=1` + `/api/buffer/verify` on PSA, PSR Train, Custody Note
2. Retry Buffer `error` posts (Buffer UI/API)
3. PSA cleanup:
   ```
   /api/cron/firm-outreach-bootstrap?excludeEmails=1&dryRun=0&emails=dita_ag@abv.bg,info@abrahamsolicitors.co.uk
   /api/cron/firm-outreach-bootstrap?cleanupBadEmails=1&allStatuses=1&dryRun=0
   ```
4. Resend `psrtrain.com`: SPF for `send` is verified, but **DKIM is stale**. Live DNS `resend._domainkey.psrtrain.com` has an old key; Resend currently expects:

   ```
   Name: resend._domainkey
   Type: TXT
   Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCsb/DaA5AObH+0zKxaXqKEzD4p5vzp0DOorQCAPtZEuC2zeVO4x0rwXYnNWGnyMbwYE4Tu8MPSmLGjRk4bMbDFWNI/P4Rouww+MlrAVlulrRHuwv4vqzEcfyUiS6PTvbRYmDnpb5DoLHzXccwVJcHGHkvT+YYLRgv02hYb0sZ8dQIDAQAB
   ```

   Also align `send` MX to `feedback-smtp.us-east-1.amazonses.com` (DNS currently points at eu-west-1). Then re-run Resend verify.

5. PSR Train Vercel env: `GOOGLE_SERVICE_ACCOUNT_JSON`, `GSC_SITE_URL=sc-domain:psrtrain.com`, `GA4_PROPERTY_ID`
6. Rotate GitHub PATs: `CustodyNote droid GH_PAT`, `psrtrain-push`
7. REPUK `Ops — production source guard` is cancelling on schedule (~20m); confirm concurrency/timeout, re-run if still red on master

## PSA agent branch
Primary work: `cursor/cloud-agent-1786365590430-jswq2`  
Compare: https://github.com/robertcashman-bit/policestationagent/compare/master...cursor/cloud-agent-1786365590430-jswq2
