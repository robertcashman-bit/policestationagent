# 🌐 Wix DNS Setup for Vercel

## ⚠️ Important: Wix Domain Configuration

If your domain `policestationagent.com` is registered/managed through Wix, you need to configure DNS records in Wix to point to Vercel.

---

## Step 1: Access Wix DNS Settings

1. **Log in to Wix:**
   - Go to: https://www.wix.com/my-account/site-selector
   - Or: https://www.wix.com/dashboard

2. **Navigate to Domain Settings:**
   - Click on your site (or go to Domains section)
   - Click **"Domains"** in the left sidebar
   - Find `policestationagent.com`
   - Click on the domain

3. **Access DNS Records:**
   - Look for **"DNS Settings"** or **"Advanced DNS"** or **"DNS Records"**
   - Click to view/edit DNS records

---

## Step 2: Add DNS Records in Wix

Based on your Vercel screenshot, you need these records:

### For Root Domain (policestationagent.com):

**Option A: A Record (Recommended for Wix)**
```
Type: A
Name: @ (or blank, or policestationagent.com)
Value: 76.76.21.21
TTL: 3600 (or Auto)
```

**Option B: CNAME (If A record doesn't work)**
```
Type: CNAME
Name: @ (or blank)
Value: cname.vercel-dns.com
TTL: 3600 (or Auto)
```

### For WWW Subdomain:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (or Auto)
```

---

## Step 3: Remove/Disable Wix Hosting (If Applicable)

**IMPORTANT:** If your domain is currently connected to Wix hosting, you may need to:

1. **Disconnect from Wix Site:**
   - In Wix dashboard → Domains
   - Find `policestationagent.com`
   - Look for option to "Disconnect" or "Point to External Site"
   - This allows you to use external DNS

2. **Or Use External DNS:**
   - Some Wix plans allow "External DNS" configuration
   - Enable this option if available

---

## Step 4: Wix-Specific Considerations

### ⚠️ Wix Limitations:

1. **DNS Management:**
   - Wix may limit DNS record editing on certain plans
   - Premium plans usually have full DNS access
   - Free/basic plans may have restrictions

2. **Domain Lock:**
   - Wix may lock DNS if domain is connected to Wix hosting
   - You may need to disconnect from Wix site first

3. **Name Server Requirements:**
   - Some Wix configurations require using Wix name servers
   - You may need to keep Wix name servers but configure DNS records within Wix

---

## Step 5: Detailed Wix DNS Configuration

### If Wix Allows Direct DNS Editing:

1. **In Wix DNS Settings:**
   - Click **"Add Record"** or **"Edit Records"**

2. **Add A Record for Root:**
   - **Record Type:** `A`
   - **Host Name:** `@` (or leave blank)
   - **Points to:** `76.76.21.21`
   - **TTL:** `3600` (or Auto)
   - Click **"Save"**

3. **Add CNAME for WWW:**
   - **Record Type:** `CNAME`
   - **Host Name:** `www`
   - **Points to:** `cname.vercel-dns.com`
   - **TTL:** `3600` (or Auto)
   - Click **"Save"**

4. **Remove Conflicting Records:**
   - Delete any existing A/CNAME records pointing to Wix
   - Remove any records that conflict with Vercel

---

## Step 6: Alternative - Transfer DNS to External Provider

If Wix doesn't allow DNS editing or you're having issues:

### Option A: Use Wix External DNS (If Available)

1. **In Wix Domain Settings:**
   - Look for **"Use External DNS"** or **"Custom DNS"**
   - Enable this option
   - You'll need to update name servers (see below)

### Option B: Transfer DNS Management

1. **Get Name Servers from DNS Provider:**
   - Use Cloudflare (free, recommended)
   - Or use your domain registrar's DNS
   - Get the name server addresses

2. **Update Name Servers in Wix:**
   - Wix Domain Settings → Name Servers
   - Change from Wix name servers to your DNS provider's name servers
   - Then configure DNS at your DNS provider (not Wix)

---

## Step 7: Verify DNS Configuration

After adding records in Wix:

1. **Wait 15-30 minutes** for DNS propagation

2. **Check DNS Resolution:**
   - Visit: https://www.whatsmydns.net/#A/policestationagent.com
   - Should show: `76.76.21.21` or similar Vercel IPs

3. **Check Vercel Dashboard:**
   - Go to: Vercel → Settings → Domains
   - Click on `policestationagent.com`
   - Should show: **"Valid Configuration"** ✅

---

## Step 8: Common Wix Issues & Solutions

### Issue 1: "DNS Records Not Editable"
**Solution:**
- Upgrade Wix plan (if on free/basic)
- Or transfer DNS to external provider (Cloudflare, etc.)

### Issue 2: "Domain Connected to Wix Site"
**Solution:**
- Disconnect domain from Wix site
- Or use "Point to External Site" option

### Issue 3: "Name Servers Locked"
**Solution:**
- Contact Wix support to unlock name servers
- Or keep Wix name servers and configure DNS within Wix

### Issue 4: "CNAME Not Allowed for Root"
**Solution:**
- Use A record (`76.76.21.21`) for root domain instead
- Use CNAME for www subdomain only

---

## Step 9: Recommended: Use Cloudflare (Free Alternative)

If Wix DNS is too restrictive, transfer DNS to Cloudflare:

1. **Sign up for Cloudflare (free):**
   - Go to: https://dash.cloudflare.com/sign-up
   - Add your domain `policestationagent.com`

2. **Get Cloudflare Name Servers:**
   - Cloudflare will give you 2 name servers
   - Example: `ns1.cloudflare.com`, `ns2.cloudflare.com`

3. **Update Name Servers in Wix:**
   - Wix Domain Settings → Name Servers
   - Replace Wix name servers with Cloudflare name servers
   - Wait for propagation (15-30 minutes)

4. **Configure DNS in Cloudflare:**
   - Add A record: `@` → `76.76.21.21` (proxy OFF)
   - Add CNAME: `www` → `cname.vercel-dns.com` (proxy OFF)
   - See `CLOUDFLARE_DOMAIN_SETUP.md` for details

---

## ✅ Success Checklist

- [ ] Accessed Wix DNS settings
- [ ] Added A record for `@` pointing to `76.76.21.21`
- [ ] Added CNAME record for `www` pointing to `cname.vercel-dns.com`
- [ ] Removed conflicting Wix DNS records
- [ ] Disconnected from Wix hosting (if needed)
- [ ] Waited 15-30 minutes for DNS propagation
- [ ] Verified DNS resolution (whatsmydns.net)
- [ ] Vercel shows "Valid Configuration"
- [ ] SSL certificate issued (1-24 hours)

---

## 🚨 If Wix Won't Let You Edit DNS

**Option 1: Contact Wix Support**
- Ask them to help configure DNS for external hosting
- Request DNS record editing access

**Option 2: Transfer DNS to Cloudflare (Recommended)**
- Free and gives you full control
- Better for SSL certificate issuance
- See Step 9 above

**Option 3: Transfer Domain to Different Registrar**
- Move domain to Namecheap, GoDaddy, etc.
- Full DNS control
- More flexibility

---

## 📞 Need Help?

1. **Wix Support:**
   - Contact Wix support for DNS configuration help
   - Ask about "external DNS" or "pointing domain to external hosting"

2. **Vercel Support:**
   - If DNS is correct but SSL still failing
   - Provide: Domain name, DNS records, error message

3. **Check Vercel Dashboard:**
   - Settings → Domains → Click domain
   - Read the exact error message
   - It will tell you what's wrong

---

## 📝 Quick Reference

**DNS Records Needed:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Where to Add:**
- Wix Dashboard → Domains → DNS Settings
- NOT in Vercel dashboard

**Wait Time:**
- DNS propagation: 15-30 minutes
- SSL certificate: 1-24 hours

---

**Remember:** DNS records must be added in Wix, not in Vercel!
