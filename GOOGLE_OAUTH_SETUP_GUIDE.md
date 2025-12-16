# Google OAuth Setup Guide

## How to Get Google Client ID and Client Secret

Follow these steps to set up Google OAuth for the blog generator system:

---

## Step 1: Go to Google Cloud Console

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account (use Robert Cashman's account: robertcashman@defencelegalservices.co.uk)

---

## Step 2: Create or Select a Project

1. Click the project dropdown at the top of the page
2. Either:
   - **Select an existing project** (if you have one)
   - **Click "New Project"** to create a new one
     - Project name: `PoliceStationAgent Blog Generator`
     - Click "Create"

---

## Step 3: Enable Google+ API

1. In the left sidebar, go to **"APIs & Services"** → **"Library"**
2. Search for **"Google+ API"** or **"People API"**
3. Click on it and click **"Enable"**

**Note:** Google+ API is being deprecated. You can also use:
- **Google Identity Services** (recommended for new projects)
- Or just enable **OAuth consent screen** (which we'll do next)

---

## Step 4: Configure OAuth Consent Screen

1. Go to **"APIs & Services"** → **"OAuth consent screen"**
2. Choose **"External"** (unless you have a Google Workspace account, then choose "Internal")
3. Click **"Create"**

### Fill in the OAuth Consent Screen:

**App information:**
- **App name:** `PoliceStationAgent Blog Generator`
- **User support email:** `robertcashman@defencelegalservices.co.uk`
- **App logo:** (optional - upload your logo)
- **Application home page:** `https://policestationagent.com`
- **Application privacy policy link:** `https://policestationagent.com/privacy`
- **Application terms of service link:** `https://policestationagent.com/terms-and-conditions`
- **Authorized domains:** Add `policestationagent.com`

**Developer contact information:**
- **Email addresses:** `robertcashman@defencelegalservices.co.uk`

4. Click **"Save and Continue"**

**Scopes:**
- Click **"Add or Remove Scopes"**
- Select:
  - `.../auth/userinfo.email`
  - `.../auth/userinfo.profile`
- Click **"Update"** then **"Save and Continue"**

**Test users:**
- Add `robertcashman@defencelegalservices.co.uk` as a test user
- Click **"Save and Continue"**

**Summary:**
- Review and click **"Back to Dashboard"**

---

## Step 5: Create OAuth 2.0 Credentials

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"+ CREATE CREDENTIALS"** at the top
3. Select **"OAuth client ID"**

### Configure OAuth Client:

**Application type:** Select **"Web application"**

**Name:** `PoliceStationAgent Blog Generator`

**Authorized JavaScript origins:**
- Click **"+ ADD URI"**
- Add: `https://policestationagent.com`
- Add: `http://localhost:3000` (for local development)

**Authorized redirect URIs:**
- Click **"+ ADD URI"**
- Add: `https://policestationagent.com/api/auth/callback/google`
- Add: `http://localhost:3000/api/auth/callback/google` (for local development)

4. Click **"CREATE"**

---

## Step 6: Copy Your Credentials

After clicking "CREATE", a popup will appear with:
- **Your Client ID** (looks like: `123456789-abcdefghijklmnop.apps.googleusercontent.com`)
- **Your Client secret** (looks like: `GOCSPX-abcdefghijklmnopqrstuvwxyz`)

**⚠️ IMPORTANT:** Copy these immediately - you won't be able to see the client secret again!

---

## Step 7: Add to Environment Variables

### For Local Development (.env.local):

Create or edit `.env.local` in your project root:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
AUTHORIZED_GOOGLE_EMAIL=robertcashman@defencelegalservices.co.uk

# Existing variables
JWT_SECRET=your-jwt-secret-here
NEXT_PUBLIC_SITE_URL=https://policestationagent.com
```

### For Vercel Production:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - **GOOGLE_CLIENT_ID** = `your-client-id`
   - **GOOGLE_CLIENT_SECRET** = `your-client-secret`
   - **AUTHORIZED_GOOGLE_EMAIL** = `robertcashman@defencelegalservices.co.uk`
4. Make sure to select **Production**, **Preview**, and **Development** environments
5. Click **"Save"**

---

## Step 8: Redeploy Your Application

After adding environment variables:

### Vercel:
- Go to **Deployments** tab
- Click **"Redeploy"** on the latest deployment
- Or push a new commit to trigger automatic deployment

### Local:
- Restart your development server:
  ```bash
  npm run dev
  ```

---

## Step 9: Test the Setup

1. Visit `https://policestationagent.com/admin/blog-generator`
2. You should be redirected to Google sign-in
3. Sign in with `robertcashman@defencelegalservices.co.uk`
4. You should be redirected back to the blog generator page
5. If you see the blog generator interface, it's working! ✅

---

## Troubleshooting

### "Error 400: redirect_uri_mismatch"
- Make sure the redirect URI in Google Console exactly matches: `https://policestationagent.com/api/auth/callback/google`
- Check for trailing slashes or http vs https

### "Access blocked: This app's request is invalid"
- Make sure you've added your email as a test user in OAuth consent screen
- Check that the OAuth consent screen is published (if not in testing mode)

### "Unauthorized" after sign-in
- Verify `AUTHORIZED_GOOGLE_EMAIL` matches exactly: `robertcashman@defencelegalservices.co.uk`
- Check environment variables are set correctly in Vercel

### Can't see Client Secret
- If you lost the client secret, you'll need to create a new OAuth client
- Go to Credentials → Delete the old one → Create new one

---

## Security Best Practices

1. **Never commit credentials to git** - They're in `.env.local` which should be in `.gitignore`
2. **Use different credentials for development and production** (optional but recommended)
3. **Rotate credentials periodically** - Google recommends every 90 days
4. **Monitor usage** - Check Google Cloud Console for unusual activity

---

## Quick Reference

**Google Cloud Console:** https://console.cloud.google.com/

**OAuth Consent Screen:** APIs & Services → OAuth consent screen

**Credentials:** APIs & Services → Credentials → Create Credentials → OAuth client ID

**Redirect URI:** `https://policestationagent.com/api/auth/callback/google`

**Authorized Email:** `robertcashman@defencelegalservices.co.uk`

---

## Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Check Vercel deployment logs
3. Verify all environment variables are set correctly
4. Ensure the OAuth consent screen is properly configured
