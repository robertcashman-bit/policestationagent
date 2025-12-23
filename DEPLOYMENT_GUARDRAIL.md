# Production Deployment Guardrail

## Status: Partially Enforced

### Current Configuration

**Production Branch:** `master`

**Vercel Configuration:**
- Project: `web44ai`
- Production URL: `https://web44ai.vercel.app`
- Framework: Next.js
- Build Command: `npm run build`

### Deployment Process

1. **Local Changes:**
   - Make changes in Cursor
   - Commit to `master` branch
   - Run: `vercel --token <TOKEN> --prod --yes --force`

2. **Vercel Dashboard Settings (REQUIRED):**
   - Navigate to: https://vercel.com/robert-cashmans-projects/web44ai/settings/git
   - **Production Branch:** Must be set to `master`
   - **Preview Deployments:** Can be enabled for other branches
   - **Auto-deploy from Git:** Should be enabled

### Guardrail Enforcement

**Code-Level:**
- ✅ `vercel.json` includes production build configuration
- ✅ Git branch checked before deployment (manual step)
- ⚠️ No automatic branch validation in deployment scripts

**Required Vercel Dashboard Settings:**
1. Production Branch = `master`
2. Auto-deploy enabled for production branch
3. Preview deployments enabled for other branches

### Verification

After deployment, verify changes are visible:
```bash
node scripts/final-production-verification.js
```

Or manually check:
- URL: https://web44ai.vercel.app
- Check Information dropdown (header) - should only show legal links
- Check Footer "Help & Advice" section - should show informational links

### Cache Invalidation

If changes are not immediately visible:
1. Vercel automatically invalidates cache on new deployments
2. Next.js static pages are rebuilt on each deployment
3. Edge cache is cleared when new deployment goes live

### Deployment Command

```bash
# Production deployment (with force to skip cache)
vercel --token <TOKEN> --prod --yes --force
```





























