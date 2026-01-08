# Deployment Target Configuration

## ✅ CORRECT DEPLOYMENT TARGET

This repository MUST ONLY deploy to:

**Vercel Project:** `web44ai-git-master-robert-cashmans-projects`  
**Vercel URL:** `web44ai-git-master-robert-cashmans-projects.vercel.app`  
**Production Domain:** `policestationagent.com`  
**Git Repository:** `robertdavidcashman-droid/one`

## ❌ WRONG DEPLOYMENT TARGETS (NEVER DEPLOY HERE)

- ❌ `pstrain rebuild` workspace/project
- ❌ Any project containing "pstrain" in the name
- ❌ Any workspace path containing "pstrain rebuild"

## Deployment Guard

A deployment verification script runs before builds to ensure the correct target:

```bash
npm run verify:deployment
```

This script checks:
1. Vercel project configuration
2. Environment variables
3. Workspace path
4. Package.json name

If the wrong target is detected, the build will **FAIL** with an error.

## Manual Verification

Before deploying, verify:

1. **Current directory:**
   ```bash
   pwd
   # Should NOT contain "pstrain rebuild"
   ```

2. **Git remote:**
   ```bash
   git remote -v
   # Should point to: robertdavidcashman-droid/one
   ```

3. **Vercel project (if linked locally):**
   ```bash
   cat .vercel/project.json
   # Should NOT contain "pstrain"
   ```

## Vercel Dashboard Configuration

In Vercel dashboard, ensure:
- Project is linked to: `robertdavidcashman-droid/one` GitHub repo
- Production domain: `policestationagent.com`
- Auto-deploy is enabled for `master` branch only

## Preventing Accidental Deployments

1. **Always work from the correct directory:** `C:\Users\rober\OneDrive\Desktop\policestationagent`
2. **Never clone/deploy from:** `pstrain rebuild` directory
3. **Verify deployment target** before pushing to master
4. **Check Vercel dashboard** after deployment to confirm correct project

---

**Last Updated:** December 2025  
**Status:** ✅ Active



