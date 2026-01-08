# Vercel Project Fix Instructions

## Objective

Ensure `policestationagent.com` deploys **ONLY** to one authorized Vercel project and prevent any future deployments to unauthorized projects.

---

## PART A: VERCEL PROJECT HYGIENE (Platform-Side)

### Step 1: Identify Current Domain Mapping

1. **Open Vercel Dashboard:** https://vercel.com/dashboard
2. **Check "web44ai" project:**
   - Click on project **"web44ai"**
   - Go to **Settings → Domains** (left sidebar)
   - **Verify:** Does it show `policestationagent.com` and `www.policestationagent.com`?
   - **Note:** If yes, this is the correct project. If no, check "pstrain-rebuild" project.

3. **Check "pstrain-rebuild" project:**
   - Click on project **"pstrain-rebuild"**
   - Go to **Settings → Domains**
   - **Verify:** Are `policestationagent.com` or `www.policestationagent.com` listed here?
   - **If yes:** This is a problem. We'll fix it in Step 3.

### Step 2: Rename "web44ai" Project to "policestationagent"

**Location:** Vercel Dashboard → web44ai project → Settings → General

1. **Open project settings:**
   - Navigate to **"web44ai"** project
   - Click **Settings** (left sidebar)
   - Click **General** (first item in Settings submenu)

2. **Rename project:**
   - Find **"Project Name"** field (near top of page)
   - Change value from `web44ai` to `policestationagent`
   - Click **Save** button (or wait for auto-save)

3. **Verify rename:**
   - Project name in dashboard should now show as "policestationagent"
   - All existing deployments remain intact

### Step 3: Verify and Fix Domain Mappings

**Location:** Vercel Dashboard → policestationagent project → Settings → Domains

1. **In "policestationagent" project (formerly "web44ai"):**
   - Go to **Settings → Domains**
   - **Required domains:**
     - `policestationagent.com` (should be present)
     - `www.policestationagent.com` (should be present)
   - **If missing:** Click **Add** button, enter domain, follow DNS verification steps

2. **In "pstrain-rebuild" project (if it exists):**
   - Go to **Settings → Domains**
   - **If `policestationagent.com` or `www.policestationagent.com` are listed:**
     - Click the **three dots (⋯)** next to each domain
     - Select **Remove**
     - Confirm removal
   - **This ensures domains are NOT duplicated across projects**

### Step 4: Disconnect "pstrain-rebuild" from Repository

**Location:** Vercel Dashboard → pstrain-rebuild project → Settings → Git

1. **Open "pstrain-rebuild" project:**
   - Navigate to **"pstrain-rebuild"** project
   - Click **Settings** (left sidebar)
   - Click **Git** (in Settings submenu)

2. **Disconnect repository:**
   - Find **"Connected Git Repository"** section
   - Find repository: `github/robertdavidcashman-droid/one`
   - Click **Disconnect** button (or "..." menu → Disconnect)
   - **Confirm disconnection** when prompted

3. **Alternative: If you need "pstrain-rebuild" to exist:**
   - **Option A (Recommended):** Change Git repository to a different repo
     - Click **Connect Git Repository**
     - Select a different repository (not `robertdavidcashman-droid/one`)
   - **Option B:** Use Ignored Build Step
     - Go to **Settings → Git → Ignored Build Step**
     - Set to: `echo "Build disabled" && exit 1`
     - This prevents all builds but keeps the project
   - **Option C:** Archive the project
     - Go to **Settings → General → Danger Zone**
     - Click **Archive Project**
     - Project is archived but not deleted

### Step 5: Verify Single Project Deployment

1. **Check "policestationagent" project:**
   - Go to **Settings → Git**
   - **Verify:** Repository shows `github/robertdavidcashman-droid/one`
   - **Verify:** Production Branch is `master` (or `main`)

2. **Check "pstrain-rebuild" project:**
   - Go to **Settings → Git**
   - **Verify:** Either:
     - No repository connected (shows "Connect Git Repository")
     - OR: Different repository (not `robertdavidcashman-droid/one`)

3. **Confirm in Deployments list:**
   - Go to **policestationagent** project → **Deployments** tab
   - Recent deployments should show commits from `robertdavidcashman-droid/one`
   - Go to **pstrain-rebuild** project → **Deployments** tab
   - Should show NO new deployments from `robertdavidcashman-droid/one` (only old ones if any)

---

## PART B: CODE-LEVEL DEPLOYMENT LOCK

### Step 6: Get Vercel Project ID

**Location:** Vercel Dashboard → policestationagent project → Settings → General

1. **Navigate to project settings:**
   - Open **"policestationagent"** project
   - Go to **Settings → General**

2. **Find Project ID:**
   - Scroll to **"Project ID"** section
   - Copy the Project ID (format: `prj_xxxxxxxxxxxxxxxxxx`)
   - **Save this value** - you'll need it in Step 7

### Step 7: Set Environment Variable in Vercel

**Location:** Vercel Dashboard → policestationagent project → Settings → Environment Variables

1. **Navigate to environment variables:**
   - In **"policestationagent"** project
   - Go to **Settings → Environment Variables**

2. **Add new variable:**
   - Click **Add New** button
   - **Key:** `ALLOWED_VERCEL_PROJECT_IDS`
   - **Value:** Paste the Project ID from Step 6 (e.g., `prj_abc123XYZ456`)
   - **Environment:** Select all three:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
   - Click **Save**

3. **Verify variable is set:**
   - Variable should appear in the list
   - Should be available for all environments

### Step 8: Verify Code Changes Are Committed

The code-level guard is already implemented in the repository:
- ✅ `scripts/vercel-project-lock.mjs` (deployment lock script)
- ✅ `package.json` (prebuild hook runs `vercel:lock`)
- ✅ Documentation files created

**Verify code is pushed:**
1. Check repository has latest commits with deployment lock changes
2. If not committed yet, commit and push:
   ```bash
   git add scripts/vercel-project-lock.mjs package.json README.md VERCEL_DEPLOYMENT_LOCK.md
   git commit -m "Add Vercel deployment lock to prevent unauthorized deployments"
   git push origin master
   ```

---

## PART C: VERIFICATION CHECKLIST

### ✅ Verification Step 1: Push Test Commit

1. **Make a small change:**
   ```bash
   echo "# Test deployment lock" >> test-deployment.md
   git add test-deployment.md
   git commit -m "Test: Verify deployment lock"
   git push origin master
   ```

2. **Monitor Vercel Dashboard:**
   - Go to **policestationagent** project → **Deployments**
   - **Expected:** New deployment appears and builds successfully
   - Go to **pstrain-rebuild** project → **Deployments**
   - **Expected:** NO new deployment appears (or if connected, build fails)

### ✅ Verification Step 2: Check Build Logs (policestationagent)

1. **Open successful deployment:**
   - Click on the latest deployment in **policestationagent** project
   - Click **Build Logs** tab

2. **Verify deployment lock passes:**
   - Look for: `✅ Vercel project lock: PASSED`
   - Should show: `Project ID: prj_xxxxx`
   - Should show: `Allowed IDs: prj_xxxxx`

### ✅ Verification Step 3: Test Unauthorized Project (Optional)

**Note:** This step requires "pstrain-rebuild" to still be connected. If you've disconnected it, skip this step.

1. **If "pstrain-rebuild" is still connected:**
   - Temporarily remove `ALLOWED_VERCEL_PROJECT_IDS` from "pstrain-rebuild" project
   - OR: Ensure it's not set (should fail with clear error)
   - Push a test commit
   - Check "pstrain-rebuild" deployment logs
   - **Expected:** Build fails with error: `❌ VERCEL PROJECT DEPLOYMENT LOCK FAILED`
   - **Expected:** Error message shows unauthorized project ID

2. **Reconnect "policestationagent" (if tested):**
   - Ensure `ALLOWED_VERCEL_PROJECT_IDS` is set correctly
   - Verify deployments work again

### ✅ Verification Step 4: Domain Verification

1. **Check production domain:**
   - Visit: https://policestationagent.com
   - Visit: https://www.policestationagent.com
   - **Expected:** Site loads correctly
   - **Expected:** Latest changes are visible

2. **Check domain mapping:**
   - In **policestationagent** project → **Settings → Domains**
   - **Verify:** Both domains show "Valid" status
   - **Verify:** No errors or warnings

### ✅ Final Checklist

- [ ] "policestationagent" project (formerly "web44ai") has domains mapped
- [ ] "pstrain-rebuild" is disconnected from `robertdavidcashman-droid/one` repository
- [ ] `ALLOWED_VERCEL_PROJECT_IDS` environment variable is set in "policestationagent" project
- [ ] Code changes (deployment lock script) are committed and pushed
- [ ] Test deployment succeeds in "policestationagent" project
- [ ] Build logs show: `✅ Vercel project lock: PASSED`
- [ ] No new deployments appear in "pstrain-rebuild" project
- [ ] Production domains (policestationagent.com, www.policestationagent.com) work correctly

---

## TROUBLESHOOTING

### Build fails with "ALLOWED_VERCEL_PROJECT_IDS environment variable is not set"

**Fix:**
1. Go to Vercel Dashboard → policestationagent project → Settings → Environment Variables
2. Add `ALLOWED_VERCEL_PROJECT_IDS` with the Project ID as the value
3. Redeploy

### Build fails with "UNAUTHORIZED Vercel project"

**Cause:** Repository is connected to a Vercel project not in the allowed list.

**Fix:**
1. Disconnect repository from the unauthorized project (Settings → Git → Disconnect)
2. OR: Add the project ID to `ALLOWED_VERCEL_PROJECT_IDS` (if it should be allowed)
3. Redeploy

### Domain not working after changes

**Fix:**
1. Check domain mapping in Vercel Dashboard → Settings → Domains
2. Verify DNS records point to Vercel (may take time to propagate)
3. Check domain status shows "Valid" in Vercel

---

## SUMMARY

After completing these steps:

1. ✅ Only ONE Vercel project ("policestationagent") deploys this repository
2. ✅ Domains are mapped correctly
3. ✅ Code-level guard prevents future unauthorized deployments
4. ✅ Build fails immediately if repo is connected to wrong project

**Status:** ✅ COMPLETE AND PROTECTED

---

**Last Updated:** December 2025



