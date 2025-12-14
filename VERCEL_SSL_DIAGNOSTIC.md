# 🔍 Vercel SSL Certificate Diagnostic Guide

## ⚠️ Certificate Still Failing? Follow This Checklist

Since code-side fixes are complete, the issue is **100% DNS or Vercel dashboard configuration**.

---

## 🔴 CRITICAL: Check These First

### 1. Domain Added to Vercel? (MOST COMMON ISSUE)

**Go to:** https://vercel.com/dashboard → Your Project → Settings → Domains

**Check:**
- [ ] `policestationagent.com` is listed
- [ ] `www.policestationagent.com` is listed (if you want www)
- [ ] Status shows **"Valid Configuration"** (not "Invalid" or "Pending")

**If domain is NOT added:**
1. Click **"Add"** button
2. Type: `policestationagent.com`
3. Click **"Add"**
4. Repeat for `www.policestationagent.com` if needed

---

### 2. DNS Records Correct?

**Check your DNS provider (Cloudflare, GoDaddy, Namecheap, etc.):**

#### For Apex Domain (policestationagent.com):

**Option A: CNAME (Recommended)**
```
Type: CNAME
Name: @ (or blank)
Target: cname.vercel-dns.com
Proxy: OFF (grey cloud) ← CRITICAL for SSL
```

**Option B: A Record**
```
Type: A
Name: @ (or blank)
IPv4: 76.76.21.21 (get current IP from Vercel dashboard)
Proxy: OFF (grey cloud) ← CRITICAL for SSL
```

#### For WWW Subdomain:
```
Type: CNAME
Name: www
Target: cname.vercel-dns.com
Proxy: OFF (grey cloud) ← CRITICAL for SSL
```

**⚠️ CRITICAL:** If using Cloudflare, **Proxy MUST be OFF** (grey cloud, not orange) during SSL certificate issuance. You can enable proxy AFTER certificate is issued.

---

### 3. DNS Propagation Check

**Test DNS resolution:**

```bash
# Check apex domain
nslookup policestationagent.com

# Check www subdomain
nslookup www.policestationagent.com

# Should resolve to Vercel IPs (76.76.21.21 or similar)
```

**Or use online tools:**
- https://www.whatsmydns.net/#A/policestationagent.com
- https://dnschecker.org/#A/policestationagent.com

**Wait time:** 5 minutes to 48 hours (usually 15-30 minutes)

---

### 4. Cloudflare Proxy Status (IF USING CLOUDFLARE)

**Go to:** Cloudflare Dashboard → DNS → Records

**Check:**
- [ ] All records show **"DNS only"** (grey cloud icon)
- [ ] NOT **"Proxied"** (orange cloud icon)

**Why:** Cloudflare proxy blocks Vercel's SSL verification. Must be OFF during certificate issuance.

**After certificate is issued:** You can enable proxy (orange cloud) if desired.

---

### 5. Vercel Domain Status

**Go to:** Vercel Dashboard → Settings → Domains → Click on `policestationagent.com`

**Check the status message:**

| Status | Meaning | Action |
|--------|---------|--------|
| ✅ **Valid Configuration** | DNS is correct | Wait for certificate (1-24 hours) |
| ❌ **Invalid Configuration** | DNS is wrong | Fix DNS records |
| ⏳ **Pending** | DNS propagating | Wait 15-30 minutes |
| ❌ **Not Found** | Domain not added | Add domain in Vercel |

**If "Invalid Configuration":**
- Check DNS records match Vercel's instructions
- Verify proxy is OFF (if using Cloudflare)
- Wait for DNS propagation

---

### 6. Force Certificate Re-issue

**If certificate is stuck:**

1. **Remove and re-add domain:**
   - Vercel Dashboard → Settings → Domains
   - Click **"..."** on domain → **"Remove"**
   - Wait 2 minutes
   - Click **"Add"** → Re-add domain
   - Wait for DNS verification

2. **Trigger redeploy:**
   - Deployments → Latest → **"..."** → **"Redeploy"**

---

## 🔧 Common Issues & Fixes

### Issue 1: "Domain not found" in Vercel
**Fix:** Add domain in Vercel Dashboard → Settings → Domains

### Issue 2: DNS points to wrong IP
**Fix:** Update DNS records to point to Vercel (CNAME or A record)

### Issue 3: Cloudflare proxy enabled
**Fix:** Disable proxy (grey cloud) during SSL issuance

### Issue 4: www subdomain missing
**Fix:** Add `www.policestationagent.com` to Vercel AND create DNS CNAME record

### Issue 5: Certificate stuck "Pending"
**Fix:** Remove domain, wait 2 minutes, re-add domain

---

## 📋 Complete Verification Checklist

- [ ] Domain added in Vercel dashboard
- [ ] DNS records point to Vercel (CNAME or A record)
- [ ] DNS records show correct target/IP
- [ ] Cloudflare proxy is OFF (if using Cloudflare)
- [ ] Both apex and www added (if using www)
- [ ] DNS propagated (checked via whatsmydns.net)
- [ ] Vercel shows "Valid Configuration"
- [ ] Waited at least 15 minutes after DNS changes
- [ ] Tried force re-issue (remove/re-add domain)

---

## 🚨 Still Failing? Next Steps

1. **Check Vercel Dashboard Error Message:**
   - Go to Settings → Domains → Click domain
   - Read the exact error message
   - It will tell you what's wrong

2. **Verify DNS with Command:**
   ```bash
   dig policestationagent.com
   dig www.policestationagent.com
   ```
   Should show Vercel IPs or CNAME to `cname.vercel-dns.com`

3. **Contact Vercel Support:**
   - If all above is correct, contact Vercel support
   - Provide: Domain name, DNS records, error message

---

## ✅ Success Indicators

When SSL certificate is issued:
- ✅ Vercel dashboard shows "Valid Configuration"
- ✅ Domain loads at `https://policestationagent.com`
- ✅ Browser shows lock icon (SSL certificate)
- ✅ No "Not Secure" warnings

---

## 📝 Notes

- **Code is fixed:** Repository no longer blocks SSL verification
- **Issue is DNS/Vercel:** If still failing, it's DNS or Vercel dashboard
- **Wait time:** Certificates can take 1-24 hours (usually <1 hour)
- **Cloudflare:** Must disable proxy during issuance, can enable after

---

**Last Updated:** After code-side SSL fix (middleware.ts)
