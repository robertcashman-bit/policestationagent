/**
 * Resolves the Lemon Squeezy `test_mode` flag from the environment.
 *
 * Behaviour:
 *   - LEMON_SQUEEZY_TEST_MODE="true"   → test mode  (no real money)
 *   - LEMON_SQUEEZY_TEST_MODE="false"  → live mode  (real money)
 *   - unset                            → live in production, test in dev
 *   - any other value                  → throws (fail loud, never silently
 *     fall back to test mode in production — that would mean real users
 *     "pay" but never get charged or granted access).
 *
 * The previous version defaulted to test mode whenever the env var was
 * missing, which silently turned production into a non-billing demo if
 * the variable was ever removed or mistyped.
 */
export function resolveLemonTestMode(env: NodeJS.ProcessEnv = process.env): boolean {
  const raw = env.LEMON_SQUEEZY_TEST_MODE;

  if (raw === undefined || raw === '') {
    // No explicit setting → safe default per environment.
    return env.NODE_ENV !== 'production';
  }

  const v = raw.trim().toLowerCase();
  if (v === 'true' || v === '1' || v === 'yes') return true;
  if (v === 'false' || v === '0' || v === 'no') return false;

  throw new Error(
    `LEMON_SQUEEZY_TEST_MODE must be "true" or "false" (got: ${JSON.stringify(raw)})`,
  );
}
