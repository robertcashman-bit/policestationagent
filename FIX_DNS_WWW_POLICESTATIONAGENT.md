# 🔧 Fix DNS Error: www.policestationagent.com

## Problem
`DNS_PROBE_FINISHED_NXDOMAIN` means the domain isn't configured in DNS or Vercel.

---

## ✅ Step-by-Step Fix

### Step 1: Add Domain to Vercel (Required First)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your project (likely named "one" or "web44ai")

2. **Add Root Domain**
   - Click **"Settings"** tab
   - Click **"Domains"** in left sidebar
   - Click **"Add"** button
   - Enter: `policestationagent.com`
   - Click **"Add"**

3. **Add WWW Subdomain**
   - Click **"Add"** again
   - Enter: `www.policestationagent.com`
   - Click **"Add"**

4. **Copy DNS Configuration**
   - Vercel will show DNS records you need
   - You'll see something like:
     ```
     Type: CNAME
     Name: @ (or www)
     Value: cname.vercel-dns.com
     ```
   - **Copy these values** - you'll need them in Step 2

---

### Step 2: Configure DNS in Your Domain Provider

**If using Cloudflare (most common):**

1. **Go to Cloudflare Dashboard**
   - Visit: https://dash.cloudflare.com
   - Select your domain: `policestationagent.com`

2. **Go to DNS Settings**
   - Click **"DNS"** in left sidebar
   - Click **"Records"** tab

3. **Add Root Domain Record**
   - Click **"Add record"**
   - **Type**: `CNAME` (or `A` if CNAME not allowed for root)
   - **Name**: `@` (or leave blank for root domain)
   - **Target**: `cname.vercel-dns.com` (or the value Vercel gave you)
   - **Proxy status**: ✅ **Proxied** (orange cloud icon - ON)
   - Click **"Save"**

4. **Add WWW Subdomain Record**
   - Click **"Add record"** again
   - **Type**: `CNAME`
   - **Name**: `www`
   - **Target**: `cname.vercel-dns.com` (same as root)
   - **Proxy status**: ✅ **Proxied** (orange cloud icon - ON)
   - Click **"Save"**

**If using another DNS provider (GoDaddy, Namecheap, etc.):**

1. Log into your domain registrar
2. Go to DNS Management
3. Add the CNAME records Vercel provided
4. For root domain, some providers require A records instead of CNAME

---

### Step 3: Configure SSL/TLS (Cloudflare)

If using Cloudflare:

1. **Go to SSL/TLS Settings**
   - In Cloudflare dashboard → **SSL/TLS** → **Overview**
   - Set encryption mode to **"Full"** or **"Full (strict)"**

2. **Enable Always Use HTTPS**
   - Go to **SSL/TLS** → **Edge Certificates**
   - Toggle **"Always Use HTTPS"** to **ON**

---

### Step 4: Update Environment Variables in Vercel

1. **Go to Vercel Project Settings**
   - Settings → **Environment Variables**

2. **Add/Update NEXT_PUBLIC_SITE_URL**
   - **Name**: `NEXT_PUBLIC_SITE_URL`
   - **Value**: `https://policestationagent.com`
   - **Environment**: Production (and Preview if desired)
   - Click **"Save"**

3. **Redeploy**
   - Go to **"Deployments"** tab
   - Click **3 dots** (⋯) on latest deployment
   - Click **"Redeploy"**

---

### Step 5: Wait for DNS Propagation

- **Usually takes**: 5-30 minutes with Cloudflare
- **Can take up to**: 48 hours (rare)
- **Check status**: Vercel dashboard → Settings → Domains
  - Should show **"Valid Configuration"** ✅ when ready

---

## 🔍 Verify It's Working

1. **Check Vercel Domain Status**
   - Vercel → Settings → Domains
   - Both domains should show: **"Valid Configuration"** ✅

2. **Test Root Domain**
   - Visit: `https://policestationagent.com`
   - Should load your website

3. **Test WWW Subdomain**
   - Visit: `https://www.policestationagent.com`
   - Should load your website (or redirect to non-www)

---

## 🐛 Troubleshooting

### Still Getting DNS Error After 30 Minutes?

1. **Check DNS Records**
   - Use: https://dnschecker.org
   - Search for: `policestationagent.com` and `www.policestationagent.com`
   - Should show your DNS records globally

2. **Verify in Vercel**
   - Settings → Domains
   - Check if domains show errors
   - Click on domain to see detailed status

3. **Check Cloudflare Proxy**
   - Make sure proxy is **ON** (orange cloud)
   - If gray cloud, DNS won't work properly

4. **Clear DNS Cache**
   - Windows: `ipconfig /flushdns`
   - Mac: `sudo dscacheutil -flushcache`
   - Or wait 15-30 minutes for cache to expire

### Domain Shows "Invalid Configuration" in Vercel?

- DNS records might not be correct
- Check that CNAME/A records match exactly what Vercel shows
- Make sure proxy is enabled in Cloudflare
- Wait a few more minutes for propagation

---

## 📝 Quick Checklist

- [ ] Added `policestationagent.com` to Vercel
- [ ] Added `www.policestationagent.com` to Vercel
- [ ] Added CNAME/A records in DNS provider
- [ ] Enabled Cloudflare proxy (if using Cloudflare)
- [ ] Set SSL/TLS to "Full" mode
- [ ] Updated `NEXT_PUBLIC_SITE_URL` environment variable
- [ ] Redeployed in Vercel
- [ ] Waited 15-30 minutes for DNS propagation
- [ ] Verified domains show "Valid Configuration" in Vercel
- [ ] Tested both `policestationagent.com` and `www.policestationagent.com`

---

**After completing these steps, your domain should work within 15-30 minutes!** 🚀
