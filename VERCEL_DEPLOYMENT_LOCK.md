# Vercel Deployment Lock

## Overview

This repository is locked to deploy **ONLY** to authorized Vercel projects. This prevents accidental deployments to wrong projects and ensures `policestationagent.com` only deploys from the correct Vercel project.

## How It Works

The deployment lock (`scripts/vercel-project-lock.mjs`) runs automatically before every build via the `prebuild` hook. It:

1. Checks if the build is running on Vercel
2. Validates the `VERCEL_PROJECT_ID` against the allowed list in `ALLOWED_VERCEL_PROJECT_IDS`
3. **Fails the build immediately** if the project ID is not authorized
4. Allows local development and non-Vercel CI to proceed without blocking

## Configuration

### Required Environment Variable

**In Vercel Project Settings → Environment Variables:**

- **Variable Name:** `ALLOWED_VERCEL_PROJECT_IDS`
- **Value:** The Vercel Project ID (found in Project Settings → General → Project ID)
- **Environment:** Production, Preview, Development (all)
- **Example:** `prj_abc123XYZ456`

**To find your Project ID:**
1. Go to Vercel Dashboard
2. Select the correct project
3. Go to **Settings → General**
4. Copy the **Project ID** value
5. Set it as `ALLOWED_VERCEL_PROJECT_IDS` in Environment Variables

### Multiple Allowed Projects (Optional)

If you need to allow multiple projects (e.g., staging + production), use comma-separated values:

```
prj_production123,prj_staging456
```

## Error Messages

### "ALLOWED_VERCEL_PROJECT_IDS environment variable is not set"

**Fix:** Set the `ALLOWED_VERCEL_PROJECT_IDS` environment variable in Vercel project settings.

### "This repository is being built by an UNAUTHORIZED Vercel project"

**Cause:** The repository is connected to a Vercel project that is not in the allowed list.

**Fix:**
1. Disconnect the repository from the unauthorized Vercel project
2. Verify the repository is only connected to the correct project
3. Ensure `ALLOWED_VERCEL_PROJECT_IDS` contains the correct project ID

## Rotating/Updating Project IDs

To change which projects are allowed:

1. **Add new project ID:**
   - Update `ALLOWED_VERCEL_PROJECT_IDS` in Vercel Environment Variables
   - Add new ID: `prj_old123,prj_new456`
   - Redeploy

2. **Remove old project ID:**
   - Update `ALLOWED_VERCEL_PROJECT_IDS` to remove the old ID
   - Ensure the old project is disconnected from the repository
   - Redeploy

3. **Best Practice:** Update environment variables during low-traffic periods and test in preview first.

## Local Development

The lock **does not block** local development. It only enforces on Vercel builds (`VERCEL=1`).

## Troubleshooting

### Build fails with deployment lock error

1. Check Vercel project settings → Environment Variables
2. Verify `ALLOWED_VERCEL_PROJECT_IDS` is set
3. Verify the value matches the current project's Project ID
4. Check which Vercel project is running the build (check build logs)

### Need to temporarily disable the lock

**Not recommended**, but if absolutely necessary:

1. Temporarily remove `npm run vercel:lock` from `package.json` prebuild hook
2. Commit and push
3. **Re-enable immediately after resolving the issue**

## Security Notes

- This lock prevents **accidental** deployments to wrong projects
- It does not prevent **malicious** actors who have Vercel account access
- Always verify repository connections in Vercel Dashboard
- Regularly audit which projects have access to this repository

---

**Last Updated:** December 2025  
**Status:** ✅ Active



