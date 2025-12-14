# ✅ Verify DNS Setup: Wix → Vercel

## ✅ What's Done
- ✅ Domain `policestationagent.com` is in Vercel
- ✅ Wix DNS has been pointed to Vercel
- ✅ DNS records configured

---

## 🤖 Automated Verification (Recommended)

**Run the automated verification script:**

```bash
# Set your Vercel token (get it from https://vercel.com/account/tokens)
export VERCEL_TOKEN=your_token_here

# Run verification
npm run verify:dns
```

**Or run directly:**
```bash
VERCEL_TOKEN=your_token_here node scripts/verify-dns-setup.js
```

The script will automatically:
- ✅ Check Vercel domain status
- ✅ Verify DNS resolution
- ✅ Check CNAME records
- ✅ Verify environment variables
- ✅ Generate a summary report

---

## 🔍 Manual Verification Steps

### Step 1: Check Vercel Domain Status

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your project
   - Go to **Settings** → **Domains**

2. **Check Domain Status**
   - Look for `policestationagent.com`
   - Should show: **"Valid Configuration"** ✅
   - Status should be: **Valid**

3. **Check WWW Subdomain** (if added)
   - Look for `www.policestationagent.com`
   - Should also show: **"Valid Configuration"** ✅

**If it shows "Invalid Configuration" or "Pending":**
- Wait 15-30 more minutes (Wix DNS can be slow)
- Check that DNS records match exactly what Vercel shows

---

### Step 2: Test Your Domain

1. **Test Root Domain**
   - Visit: `https://policestationagent.com`
   - Should load your Vercel-deployed website
   - Check for SSL certificate (lock icon in browser)

2. **Test WWW Subdomain**
   - Visit: `https://www.policestationagent.com`
   - Should load your website (or redirect to non-www)

**If you get DNS errors:**
- Wait 30-60 minutes (Wix DNS propagation can take time)
- Clear browser cache
- Try incognito/private browsing mode

---

### Step 3: Verify Environment Variables

1. **Check Vercel Environment Variables**
   - Vercel → Settings → **Environment Variables**
   - Make sure `NEXT_PUBLIC_SITE_URL` is set to: `https://policestationagent.com`
   - If not set, add it now

2. **Redeploy if Needed**
   - If you just added/updated environment variables:
     - Go to **Deployments** tab
     - Click **3 dots** (⋯) on latest deployment
     - Click **"Redeploy"**

---

### Step 4: Check DNS Globally (Optional)

1. **Use DNS Checker**
   - Visit: https://dnschecker.org
   - Search for: `policestationagent.com`
   - Search for: `www.policestationagent.com`
   - Should show DNS records pointing to Vercel globally

---

## ✅ Success Indicators

Your setup is complete when:

- ✅ Vercel shows "Valid Configuration" for both domains
- ✅ `https://policestationagent.com` loads your site
- ✅ `https://www.policestationagent.com` loads your site
- ✅ SSL certificate is valid (lock icon in browser)
- ✅ No DNS errors in browser

---

## 🐛 If Something's Not Working

### Domain Still Shows "Invalid Configuration" in Vercel

1. **Double-check DNS records in Wix**
   - Make sure they match exactly what Vercel shows
   - Root domain: `@` → `cname.vercel-dns.com` (or IP)
   - WWW: `www` → `cname.vercel-dns.com`

2. **Verify domain is disconnected from Wix site**
   - Wix → Domains → Your domain
   - Should be set to "External DNS" or disconnected

3. **Wait longer**
   - Wix DNS can take 30-60 minutes
   - Sometimes up to 2 hours

### Domain Resolves But Shows Wrong Content

1. **Check deployment**
   - Vercel → Deployments
   - Make sure latest deployment is "Ready" ✅

2. **Check environment variables**
   - Make sure `NEXT_PUBLIC_SITE_URL` is correct

3. **Clear browser cache**
   - Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)

---

## 📝 Final Checklist

- [ ] Vercel shows "Valid Configuration" for domains
- [ ] `policestationagent.com` loads correctly
- [ ] `www.policestationagent.com` loads correctly
- [ ] SSL certificate is valid
- [ ] `NEXT_PUBLIC_SITE_URL` environment variable is set
- [ ] Latest deployment is "Ready" in Vercel

---

**If all checkboxes are ✅, your DNS setup is complete!** 🎉
