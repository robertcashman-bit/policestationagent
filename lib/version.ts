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
  const month = String(buildDate.getMonth() + 1).padStart(2, "0");
  const day = String(buildDate.getDate()).padStart(2, "0");
  return `build ${year}.${month}.${day}`;
}

/**
 * Format version for display in footer.
 *
 * @returns Formatted version string (e.g., "v a1b2c3d" or "build 2025.12.14")
 */
export function getFormattedVersion(): string {
  const version = getAppVersion();
  if (version.startsWith("build ")) {
    return version; // Already formatted
  }
  return `v ${version}`;
}

/**
 * Get the last update date and time.
 * Uses Vercel deployment timestamp if available, otherwise uses build time.
 *
 * @returns Formatted date/time string (e.g., "14 Dec 2025, 15:30 GMT")
 */
export function getLastUpdateDateTime(): string {
  // Vercel provides deployment timestamp (ISO format)
  const vercelDeploymentTime = process.env.VERCEL_DEPLOYMENT_TIME;
  if (vercelDeploymentTime) {
    try {
      const date = new Date(vercelDeploymentTime);
      return formatDateTime(date);
    } catch {
      // Fall through to build time
    }
  }

  // Use build time as fallback
  const buildTime = new Date();
  return formatDateTime(buildTime);
}

/**
 * Format date and time for display.
 *
 * @param date - Date object to format
 * @returns Formatted string (e.g., "14 Dec 2025, 15:30 GMT")
 */
function formatDateTime(date: Date): string {
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Get timezone abbreviation (simplified - shows GMT/UTC)
  const timezone = date.getTimezoneOffset() === 0 ? "GMT" : "GMT";

  return `${day} ${month} ${year}, ${hours}:${minutes} ${timezone}`;
}
