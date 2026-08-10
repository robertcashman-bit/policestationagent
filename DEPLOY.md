# Custody Note Website – Deploy Guide

## Current status

Your site is live at **https://custody-note-website.vercel.app** but is serving an older deployment. New commits are failing to deploy due to a Vercel infrastructure error during "Deploying outputs" — this is on Vercel's side, not your code.

## Quick retry (when Vercel recovers)

```powershell
cd "c:\Users\rober\custody note - website production"
npx vercel --prod --yes
```

## Recommended: Deploy via GitHub (most reliable)

Vercel's Git deployment pipeline often works when the CLI fails.

### 1. Create a GitHub repository

1. Go to https://github.com/new
2. Name it `custody-note-website` (or similar)
3. Create the repo (leave it empty, no README)

### 2. Push your code

```powershell
cd "c:\Users\rober\custody note - website production"
git remote add origin https://github.com/YOUR_USERNAME/custody-note-website.git
git push -u origin master
```

### 3. Connect to Vercel

1. Go to https://vercel.com/dashboard
2. Open your `custody-note-website` project
3. Go to **Settings** → **Git**
4. If not connected: **Connect Git Repository** and select your GitHub repo
5. Vercel will auto-deploy on every push

### 4. Deploy

After connecting, either:

- Push a new commit: `git commit --allow-empty -m "Trigger deploy"; git push`
- Or go to **Deployments** in Vercel and click **Redeploy** on the latest deployment

## Alternative: Vercel Dashboard redeploy

1. Go to https://vercel.com/robert-cashmans-projects/custody-note-website/deployments
2. Find a deployment that built successfully
3. Click the **⋯** menu → **Redeploy**
4. This sometimes bypasses the CLI failure
