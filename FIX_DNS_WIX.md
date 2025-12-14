# 🔧 Fix DNS: Configure Wix Domain to Point to Vercel

## ✅ What You Have
- ✅ Domain `policestationagent.com` is added to Vercel
- ✅ DNS is managed by Wix
- ✅ Need to point Wix DNS to Vercel

---

## 🎯 Step-by-Step: Configure Wix DNS for Vercel

### Step 1: Get DNS Values from Vercel

1. **In Vercel Dashboard**:
   - Go to: https://vercel.com/dashboard
   - Select your project
   - Go to **Settings** → **Domains**
   - Click on `policestationagent.com`
   - Look for **"DNS Records"** section
   - Vercel will show you what to add:
     ```
     Type: CNAME
     Name: @ (or www)
     Value: cname.vercel-dns.com
     ```
   - **Copy these values** - you'll need them!

2. **Add WWW Subdomain in Vercel** (if not already):
   - In Vercel → Settings → Domains
   - Click **"Add"** button
   - Enter: `www.policestationagent.com`
   - Click **"Add"**
   - Copy the DNS values it shows

---

### Step 2: Configure DNS in Wix

1. **Go to Wix Dashboard**
   - Visit: https://www.wix.com/my-account/site-selector
   - Select your site/domain

2. **Go to Domain Settings**
   - Click **"Domains"** in the left sidebar
   - Or go to: **Settings** → **Domains**
   - Find `policestationagent.com`
   - Click on it to manage

3. **Access DNS Settings**
   - Look for **"DNS Settings"** or **"Advanced DNS"**
   - Click to view/edit DNS records

4. **Delete Old Records** (if any exist)
   - Look for any A or CNAME records for:
     - `@` (root domain)
     - `www`
   - Delete them if they don't point to Vercel

5. **Add Root Domain Record**
   - Click **"Add Record"** or **"Add DNS Record"**
   - **Type**: `CNAME` (or `A` if CNAME not allowed for root)
   - **Name/Host**: `@` (or leave blank, or enter `policestationagent.com`)
   - **Value/Target**: `cname.vercel-dns.com` (or the value Vercel gave you)
   - **TTL**: Leave default (usually 3600)
   - Click **"Save"** or **"Add"**

   **Note**: Some Wix setups don't allow CNAME for root domain. If that's the case:
   - Use **Type**: `A`
   - **Value**: Get the IP address from Vercel (usually shown as an alternative)
   - Common Vercel IP: `76.76.21.21` (check Vercel dashboard for current IP)

6. **Add WWW Subdomain Record**
   - Click **"Add Record"** again
   - **Type**: `CNAME`
   - **Name/Host**: `www`
   - **Value/Target**: `cname.vercel-dns.com` (same as root)
   - **TTL**: Leave default
   - Click **"Save"** or **"Add"**

---

### Step 3: Disconnect Domain from Wix Site (Important!)

**This is critical**: If your domain is currently connected to a Wix site, you need to disconnect it:

1. **In Wix Dashboard**:
   - Go to **Domains** → Your domain
   - Look for **"Connect to Site"** or **"Point Domain"**
   - If it says "Connected to [Site Name]", click to disconnect
   - Or look for **"DNS Settings"** → **"Use External DNS"**

2. **Alternative Method**:
   - Go to **Settings** → **Domains**
   - Find your domain
   - Look for option to **"Use External DNS"** or **"Point to External Service"**
   - Enable this option

**Why**: Wix may be overriding your DNS records if the domain is connected to a Wix site. You need to use external DNS management.

---

### Step 4: Wait for DNS Propagation

- **Usually takes**: 15-60 minutes with Wix
- **Can take up to**: 48 hours (rare)
- **Check status**: 
  - Vercel dashboard → Settings → Domains
  - Should show **"Valid Configuration"** ✅ when ready

---

## 🔍 Verify It's Working

1. **Check Vercel Domain Status**
   - Vercel → Settings → Domains
   - Both `policestationagent.com` and `www.policestationagent.com` should show:
     - **"Valid Configuration"** ✅
     - Status: **Valid**

2. **Test Your Domain**
   - Visit: `https://policestationagent.com`
   - Visit: `https://www.policestationagent.com`
   - Both should load your Vercel-deployed website

3. **Check DNS Globally** (optional)
   - Use: https://dnschecker.org
   - Search for: `policestationagent.com` and `www.policestationagent.com`
   - Should show your DNS records pointing to Vercel

---

## 🐛 Troubleshooting

### Still Getting DNS Error After 1 Hour?

1. **Verify Domain is Disconnected from Wix Site**
   - This is the #1 issue!
   - Make sure domain is set to "External DNS" or disconnected from Wix site
   - Wix may be overriding your DNS if domain is connected to a site

2. **Check DNS Records Match Exactly**
   - The target must match **exactly** what Vercel shows
   - Common values: `cname.vercel-dns.com` or IP like `76.76.21.21`
   - No extra spaces, no trailing dots

3. **Try A Record Instead of CNAME for Root**
   - Wix sometimes doesn't allow CNAME for root domain
   - Use A record with IP address from Vercel
   - Check Vercel dashboard for the IP address

4. **Check Wix DNS Propagation**
   - Wix DNS can be slower than Cloudflare
   - Wait at least 1 hour before troubleshooting
   - Check https://dnschecker.org to see global DNS status

5. **Clear DNS Cache**
   - Windows: `ipconfig /flushdns`
   - Mac: `sudo dscacheutil -flushcache`
   - Or wait 30-60 minutes for cache to expire

---

## 📝 Quick Checklist

- [ ] Got DNS values from Vercel dashboard
- [ ] Added `www.policestationagent.com` to Vercel (if not already)
- [ ] Disconnected domain from Wix site (IMPORTANT!)
- [ ] Enabled "External DNS" in Wix (if available)
- [ ] Added CNAME/A records in Wix DNS settings
- [ ] Waited 30-60 minutes for DNS propagation
- [ ] Verified domains show "Valid Configuration" in Vercel
- [ ] Tested both `policestationagent.com` and `www.policestationagent.com`

---

## ⚠️ Important Notes for Wix

1. **Domain Connection**: If your domain is connected to a Wix site, Wix will override DNS. You MUST disconnect it or use external DNS.

2. **CNAME for Root**: Wix may not allow CNAME for root domain (`@`). Use A record with IP address instead.

3. **Propagation Time**: Wix DNS can take longer (30-60 minutes) compared to Cloudflare (5-15 minutes).

4. **DNS Management Location**: In Wix, DNS settings might be under:
   - **Domains** → Your domain → **DNS Settings**
   - **Settings** → **Domains** → **Advanced DNS**
   - Or in the domain registrar section

---

**After completing these steps, your domain should work within 30-60 minutes!** 🚀
