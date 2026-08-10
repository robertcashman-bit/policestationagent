# Authentication manual test checklist

Use after deployments or auth-related changes. Replace URLs with your environment.

## Prerequisites

- Supabase project running (not paused).
- Site URL and redirect URLs configured in **Supabase Dashboard → Authentication → URL configuration** (see report section “Production auth settings”).
- Env vars set per `.env.example` (especially `NEXT_PUBLIC_SUPABASE_*`).

## Local (`npm run dev`)

1. **Protected route / guest** — Open `/dashboard` while signed out. Expected: redirect to `/auth?next=/dashboard` (or `/gate` first if `APP_ACCESS_CODE` is set).
2. **Login success** — Sign in with email/password on `/auth`. Expected: full navigation to `/dashboard` or `?next=` destination.
3. **Logged-in user on login page** — While signed in, open `/auth`. Expected: redirect to `/dashboard` (or safe `?next=` path only).
4. **Wrong password** — Submit invalid credentials. Expected: error message, stay on `/auth`.
5. **Validation** — Empty fields / invalid email. Expected: inline validation; no crash.
6. **Logout** — From sidebar or header, sign out. Expected: lands on home `/`; next visit to `/dashboard` prompts login.
7. **Session persistence** — After login, refresh `/dashboard`. Expected: stay on dashboard.
8. **Callback route public** — Open `/auth/callback` with no query. Expected: redirect to `/auth` with error (not blocked by middleware).
9. **Open redirect** — Open `/auth?next=//evil.com`. Expected: after login, land on `/dashboard` (not external URL).

## Production (`https://psrtrain.com`)

1. Repeat items 1–8 on the live domain (use a test account).
2. **Apex vs www** — Open `https://www.psrtrain.com/auth`. Expected: 308 redirect to `https://psrtrain.com/...` so cookies stay on one host.
3. **Magic link / OTP** — Request code email; complete via link and via 6-digit code. Expected: lands on intended internal path.

## Supabase dashboard (external)

- **Site URL**: `https://psrtrain.com`
- **Redirect URLs** must include at least:
  - `https://psrtrain.com/auth/callback`
  - `https://psrtrain.com/auth/confirm`
  - `http://localhost:3000/auth/callback` (local dev)
  - `http://localhost:3000/auth/confirm`
- If Google OAuth is enabled, enable the provider and set **NEXT_PUBLIC_SUPABASE_GOOGLE_AUTH_ENABLED=true** in hosting env.
