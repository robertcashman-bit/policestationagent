# Resend API Key Setup for Chatbot Email

## Environment Variable Configuration

The chatbot email functionality requires a Resend API key to send emails when users select options.

### Vercel Environment Variables

Add the following environment variable in your Vercel dashboard:

**Variable Name:** `RESEND_API_KEY`  
**Value:** Your key from https://resend.com/api-keys (starts with `re_`)  
**Environments:** Production, Preview, and Development

### Steps to Add in Vercel:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Click **Add New**
4. Enter:
   - **Key:** `RESEND_API_KEY`
   - **Value:** Your Resend API key (`re_...`)
   - **Environments:** Select all (Production, Preview, Development)
5. Click **Save**
6. **Redeploy** your project for the changes to take effect

### How It Works

When users click either:
- "I Need Police Station Representation"
- "I'm a Criminal Law Firm"

The chatbot will send an email to `robertdavidcashman@gmail.com` using the Resend API.

### Testing

After adding the environment variable and redeploying:
1. Visit your live site
2. Click the chatbot icon (bottom right)
3. Select one of the options
4. Check `robertdavidcashman@gmail.com` for the email

### Note

If the API key appears to be a placeholder, you'll need to:
1. Sign up at https://resend.com
2. Create an API key
3. Replace `98765445` with your actual Resend API key (starts with `re_`)
