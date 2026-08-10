/**
 * OAuth buttons must match Supabase Dashboard → Authentication → Providers.
 * Set NEXT_PUBLIC_SUPABASE_GOOGLE_AUTH_ENABLED=true in Vercel after enabling Google
 * there and adding your Google OAuth client ID/secret.
 */
export function isGoogleOAuthEnabled(): boolean {
  return process.env.NEXT_PUBLIC_SUPABASE_GOOGLE_AUTH_ENABLED === 'true';
}
