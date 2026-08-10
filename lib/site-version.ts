/** Human-readable build stamp shown in the site footer (see next.config.mjs). */
export function getSiteVersionLabel(): string {
  const version = process.env.NEXT_PUBLIC_APP_VERSION?.trim() || 'dev';
  const rawDate = process.env.NEXT_PUBLIC_BUILD_DATE?.trim() ?? '';
  if (!rawDate) return `v${version}`;

  const parsed = new Date(`${rawDate}T12:00:00`);
  const dateLabel = Number.isNaN(parsed.getTime())
    ? rawDate
    : parsed.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  return `v${version} · updated ${dateLabel}`;
}
