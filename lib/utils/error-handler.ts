/**
 * Error handling utilities
 */

function normalizeSupabaseAuthMessage(raw: string): string {
  const lower = raw.toLowerCase();
  // Network-level: Supabase project paused, DNS failure, offline, blocked, etc.
  // The raw message from supabase-js in these cases is just "Failed to fetch",
  // which means nothing to a user. Give them an actionable message.
  if (
    lower === 'failed to fetch' ||
    lower.includes('networkerror') ||
    lower.includes('network request failed') ||
    lower.includes('load failed') ||
    lower.includes('typeerror: failed to fetch') ||
    lower.includes('authretryablefetcherror') ||
    lower.includes('enotfound') ||
    lower.includes('econnrefused')
  ) {
    return 'We can\u2019t reach the sign-in service right now. Please check your internet connection and try again in a moment. If this keeps happening, the platform may be undergoing maintenance.';
  }
  // Email-send limit (now ~30/hour via Resend SMTP). Suggest password as the
  // fast path, otherwise wait a few minutes.
  if (
    lower.includes('over_email_send_rate_limit') ||
    lower.includes('email rate limit')
  ) {
    return 'Too many code emails in a short window. Sign in with your password to skip the email step, or wait a few minutes and try again.';
  }
  // Request/OTP limits reset much faster — give a short, accurate hint.
  if (
    lower.includes('rate limit') ||
    lower.includes('over_request_rate_limit') ||
    lower.includes('too many requests')
  ) {
    return 'Too many attempts in a short window. Wait a minute and try again.';
  }
  if (
    lower.includes('invalid login credentials') ||
    lower.includes('invalid_credentials')
  ) {
    return "That email and password don't match. Check both, or use Forgot? to reset your password.";
  }
  if (
    lower.includes('user already registered') ||
    lower.includes('user_already_exists')
  ) {
    return 'An account with that email already exists. Switch to Sign in, or use Forgot? if you don\u2019t remember the password.';
  }
  if (
    lower.includes('email not confirmed') ||
    lower.includes('email_not_confirmed')
  ) {
    return 'Check your inbox for a confirmation email and click the link, then sign in.';
  }
  if (
    lower.includes('weak password') ||
    lower.includes('password should be at least') ||
    lower.includes('pwned')
  ) {
    return 'That password is too weak or has appeared in a known breach. Pick a longer, unique one.';
  }
  if (
    lower.includes('unsupported provider') ||
    lower.includes('provider is not enabled')
  ) {
    return 'That sign-in method is not enabled. Use email and password instead.';
  }
  return raw;
}

function messageFromUnknownObject(error: object): string | null {
  const o = error as Record<string, unknown>;
  if (typeof o.msg === 'string') return o.msg;
  if (typeof o.message === 'string') return o.message;
  return null;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return normalizeSupabaseAuthMessage(error.message);
  }
  if (typeof error === 'string') {
    return normalizeSupabaseAuthMessage(error);
  }
  if (error && typeof error === 'object') {
    const nested = messageFromUnknownObject(error);
    if (nested !== null) return normalizeSupabaseAuthMessage(nested);
    if ('message' in error) return normalizeSupabaseAuthMessage(String((error as { message: unknown }).message));
  }
  return 'An unknown error occurred';
}

export function isConnectionError(error: unknown): boolean {
  const message = getErrorMessage(error).toLowerCase();
  return (
    message.includes('network') ||
    message.includes('connection') ||
    message.includes('fetch') ||
    message.includes('timeout') ||
    message.includes('econnrefused') ||
    message.includes('enotfound')
  );
}

export function isSupabaseError(error: unknown): boolean {
  const message = getErrorMessage(error).toLowerCase();
  return (
    message.includes('supabase') ||
    message.includes('postgres') ||
    message.includes('database') ||
    message.includes('row-level security') ||
    message.includes('rls')
  );
}

export function formatErrorForUser(error: unknown): string {
  if (isConnectionError(error)) {
    return 'Unable to connect to the server. Please check your internet connection and try again.';
  }
  if (isSupabaseError(error)) {
    return 'A database error occurred. Please try again later.';
  }
  return getErrorMessage(error);
}








