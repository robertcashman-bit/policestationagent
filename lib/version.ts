/**
 * PRODUCTION VERSION UTILITY
 * 
 * Generates a deterministic version identifier for each production build.
 * Uses git commit hash (short) if available, otherwise falls back to build timestamp.
 * 
 * This version updates automatically on every production push.
 */

/**
 * Get the production version identifier.
 * 
 * Priority:
 * 1. NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA (Vercel provides this)
 * 2. GIT_COMMIT_SHA (custom env var)
 * 3. Build timestamp (fallback)
 * 
 * @returns Version string (e.g., "a1b2c3d" or "build 2025.12.14")
 */
export function getAppVersion(): string {
  // Vercel provides this automatically during builds
  const vercelCommit = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
  if (vercelCommit) {
    return vercelCommit.substring(0, 7); // Short hash (7 chars)
  }

  // Custom environment variable (can be set in CI/CD)
  const customCommit = process.env.GIT_COMMIT_SHA;
  if (customCommit) {
    return customCommit.substring(0, 7);
  }

  // Fallback: build timestamp (formatted as YYYY.MM.DD)
  const buildDate = new Date();
  const year = buildDate.getFullYear();
  const month = String(buildDate.getMonth() + 1).padStart(2, '0');
  const day = String(buildDate.getDate()).padStart(2, '0');
  return `build ${year}.${month}.${day}`;
}

/**
 * Format version for display in footer.
 * 
 * @returns Formatted version string (e.g., "v a1b2c3d" or "build 2025.12.14")
 */
export function getFormattedVersion(): string {
  const version = getAppVersion();
  if (version.startsWith('build ')) {
    return version; // Already formatted
  }
  return `v ${version}`;
}


