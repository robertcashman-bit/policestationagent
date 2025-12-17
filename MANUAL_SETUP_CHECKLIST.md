# Manual Setup Checklist

**Complete step-by-step guide for setting up the blog generator system**

---

## ✅ REQUIRED SETUP (Must Do)

### 1. Google OAuth Credentials

**Why:** Required for admin authentication to access `/admin/blog-generator`

**Steps:**

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with: `robertcashman@defencelegalservices.co.uk`

2. **Create or Select Project**
   - Click project dropdown → "New Project"
   - Name: `PoliceStationAgent Blog Generator`
   - Click "Create"

3. **Configure OAuth Consent Screen**
   - Go to: **APIs & Services** → **OAuth consent screen**
   - Choose: **External**
   - Fill in:
     - **App name:** `PoliceStationAgent Blog Generator`
     - **User support email:** `robertcashman@defencelegalservices.co.uk`
     - **Application home page:** `https://policestationagent.com`
     - **Authorized domains:** `policestationagent.com`
   - **Scopes:** Add `.../auth/userinfo.email` and `.../auth/userinfo.profile`
   - **Test users:** Add `robertcashman@defencelegalservices.co.uk`
   - Click "Save and Continue" through all steps

4. **Create OAuth 2.0 Credentials**
   - Go to: **APIs & Services** → **Credentials**
   - Click: **"+ CREATE CREDENTIALS"** → **"OAuth client ID"**
   - **Application type:** Web application
   - **Name:** `PoliceStationAgent Blog Generator`
   - **Authorized JavaScript origins:**
     - `https://policestationagent.com`
     - `http://localhost:3000` (for local dev)
   - **Authorized redirect URIs:**
     - `https://policestationagent.com/api/auth/callback/google`
     - `http://localhost:3000/api/auth/callback/google` (for local dev)
   - Click **"CREATE"**

5. **Copy Credentials**
   - **Client ID:** (looks like: `123456789-abc...apps.googleusercontent.com`)
   - **Client Secret:** (looks like: `GOCSPX-abc...`) 
   - ⚠️ **Copy these immediately - you can't see the secret again!**

**Full detailed guide:** See `GOOGLE_OAUTH_SETUP_GUIDE.md`

---

### 2. Environment Variables in Vercel

**Why:** Your production site needs these to authenticate and function

**Steps:**

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your `web44ai` project

2. **Add Environment Variables**
   - Go to: **Settings** → **Environment Variables**
   - Add each variable (select **Production**, **Preview**, and **Development**):

   ```
   GOOGLE_CLIENT_ID=your-client-id-from-step-1
   GOOGLE_CLIENT_SECRET=your-client-secret-from-step-1
   AUTHORIZED_GOOGLE_EMAIL=robertcashman@defencelegalservices.co.uk
   JWT_SECRET=your-secure-random-string-here
   NEXT_PUBLIC_SITE_URL=https://policestationagent.com
   ```

3. **Generate JWT_SECRET** (if you don't have one)
   - Use a secure random string generator
   - Or run: `openssl rand -base64 32` (in terminal)
   - Minimum 32 characters recommended

4. **Save and Redeploy**
   - Click **"Save"** for each variable
   - Go to **Deployments** tab
   - Click **"Rereploy"** on latest deployment
   - Or push a new commit to trigger auto-deploy

---

### 3. Local Development Environment Variables

**Why:** For testing the blog generator locally

**Steps:**

1. **Create `.env.local` file** in project root:
   ```bash
   # In your project root: c:\Users\rober\OneDrive\Desktop\web44ai\.env.local
   ```

2. **Add the same variables:**
   ```env
   GOOGLE_CLIENT_ID=your-client-id-here
   GOOGLE_CLIENT_SECRET=your-client-secret-here
   AUTHORIZED_GOOGLE_EMAIL=robertcashman@defencelegalservices.co.uk
   JWT_SECRET=your-jwt-secret-here
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. **Verify `.env.local` is in `.gitignore`**
   - Check that `.gitignore` contains `.env.local`
   - This prevents committing secrets to git

4. **Restart dev server:**
   ```bash
   npm run dev
   ```

---

## 🔧 OPTIONAL SETUP (Recommended)

### 4. AI Service Integration

**Why:** Currently uses placeholder content. Integrate AI for real blog generation.

**Options:**
- **OpenAI** (GPT-4) - Most popular
- **Anthropic** (Claude) - Good for long-form content
- **Google Gemini** - Cost-effective

**Steps for OpenAI:**

1. **Get API Key**
   - Visit: https://platform.openai.com/api-keys
   - Sign in and create new API key
   - Copy the key

2. **Add to Environment Variables**
   - In Vercel: Add `OPENAI_API_KEY=sk-...`
   - In `.env.local`: Add `OPENAI_API_KEY=sk-...`

3. **Update Code** (in `app/api/admin/generate-blog/route.ts`)
   - Replace the `generateBlogContent()` function
   - See `BLOG_GENERATOR_SYSTEM_COMPLETE.md` for example code

---

### 5. Email Service Integration (Optional)

**Why:** Currently uses `mailto:` links. Integrate for server-side email sending.

**Options:**
- **SendGrid** - Popular, good free tier
- **AWS SES** - Cost-effective at scale
- **Resend** - Modern, developer-friendly

**Steps for SendGrid:**

1. **Sign up at sendgrid.com**
2. **Create API Key**
3. **Add to environment:** `SENDGRID_API_KEY=SG....`
4. **Update** `app/api/admin/send-post/route.ts` to use SendGrid API

---

### 6. SMS Service Integration (Optional)

**Why:** Currently uses `sms:` links. Integrate for server-side SMS sending.

**Options:**
- **Twilio** - Most popular
- **AWS SNS** - Cost-effective
- **Vonage** - Good international support

**Steps for Twilio:**

1. **Sign up at twilio.com**
2. **Get Account SID and Auth Token**
3. **Add to environment:**
   ```
   TWILIO_ACCOUNT_SID=AC...
   TWILIO_AUTH_TOKEN=...
   TWILIO_PHONE_NUMBER=+44...
   ```
4. **Update** `app/api/admin/send-post/route.ts` to use Twilio API

---

## ✅ VERIFICATION STEPS

### Test Google OAuth:

1. Visit: `https://policestationagent.com/admin/blog-generator`
2. Should redirect to Google sign-in
3. Sign in with `robertcashman@defencelegalservices.co.uk`
4. Should see blog generator interface ✅

### Test Local Development:

1. Run: `npm run dev`
2. Visit: `http://localhost:3000/admin/blog-generator`
3. Should redirect to Google sign-in
4. After sign-in, should see blog generator ✅

### Test Blog Generation:

1. Fill in blog form:
   - Topic: "Test Blog Post"
   - Primary Keyword: "duty solicitor Kent"
   - Location: "Kent"
2. Click "Generate Blog Post"
3. Should see preview with content ✅
4. Click "Publish"
5. Visit the published URL ✅

---

## 🚨 TROUBLESHOOTING

### "Error 400: redirect_uri_mismatch"
- **Fix:** Check redirect URI in Google Console exactly matches:
  - `https://policestationagent.com/api/auth/callback/google`
- No trailing slashes, correct http/https

### "Access blocked: This app's request is invalid"
- **Fix:** Add your email as test user in OAuth consent screen
- Or publish the OAuth consent screen (if ready for production)

### "Unauthorized" after sign-in
- **Fix:** Check `AUTHORIZED_GOOGLE_EMAIL` matches exactly:
  - `robertcashman@defencelegalservices.co.uk`
- Case-sensitive, no extra spaces

### Environment variables not working
- **Fix:** 
  - Redeploy after adding variables in Vercel
  - Restart dev server after adding to `.env.local`
  - Check variable names match exactly (case-sensitive)

### Database errors
- **Fix:** SQLite database auto-creates on first run
- If issues, delete `data/database.db` and restart
- Check `lib/db.ts` has proper table creation

---

## 📋 QUICK CHECKLIST

- [ ] Google OAuth credentials created
- [ ] Client ID and Secret copied
- [ ] OAuth consent screen configured
- [ ] Redirect URIs added correctly
- [ ] Environment variables added to Vercel
- [ ] Environment variables added to `.env.local`
- [ ] JWT_SECRET generated and added
- [ ] Vercel deployment redeployed
- [ ] Tested Google sign-in on production
- [ ] Tested Google sign-in locally
- [ ] Tested blog generation
- [ ] (Optional) AI service integrated
- [ ] (Optional) Email service integrated
- [ ] (Optional) SMS service integrated

---

## 📚 REFERENCE DOCUMENTS

- **Google OAuth Setup:** `GOOGLE_OAUTH_SETUP_GUIDE.md`
- **System Overview:** `BLOG_GENERATOR_SYSTEM_COMPLETE.md`
- **Bug Fixes:** See commit `df9111f`

---

## 🆘 NEED HELP?

If you encounter issues:

1. Check browser console for errors
2. Check Vercel deployment logs
3. Verify all environment variables are set
4. Ensure OAuth consent screen is configured
5. Test with local development first

---

**Status:** Once Google OAuth is set up, the system is ready to use! 🚀

