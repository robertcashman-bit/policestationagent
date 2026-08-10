/**
 * Middleware auth redirects only run when Supabase env is set on the server
 * (or tests hit production). CI builds without Supabase secrets must skip
 * redirect assertions — see commit 7437db3.
 */
export function edgeAuthRedirectsApply(): boolean {
  const base = process.env.PLAYWRIGHT_BASE_URL ?? '';
  if (base.includes('psrtrain.com')) return true;
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim(),
  );
}
