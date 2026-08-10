/** Human-readable section label for admin live view. */
export function pathToSection(path: string): string {
  if (!path || path === '/') return 'Homepage';
  if (path.startsWith('/dashboard')) return 'Dashboard';
  if (path.startsWith('/practice')) return 'Practice';
  if (path.startsWith('/modules')) return 'Modules';
  if (path.startsWith('/critical-incidents')) return 'Critical Incidents';
  if (path.startsWith('/syllabus')) return 'Syllabus';
  if (path.startsWith('/progress')) return 'Progress';
  if (path.startsWith('/certificates')) return 'Certificates';
  if (path.startsWith('/settings')) return 'Settings';
  if (path.startsWith('/billing')) return 'Billing';
  if (path.startsWith('/admin')) return 'Admin';
  if (path.startsWith('/guides')) return 'Guides';
  if (path.startsWith('/legal-advice')) return 'Legal advice hub';
  if (path.startsWith('/legal')) return 'Legal pages';
  if (path.startsWith('/pricing')) return 'Pricing';
  if (path.startsWith('/training')) return 'Training';
  if (path.startsWith('/features')) return 'Features';
  if (path.startsWith('/auth') || path.startsWith('/login') || path.startsWith('/signup')) {
    return 'Auth';
  }
  return path;
}

export function formatDurationMs(ms: number): string {
  if (ms < 0 || !Number.isFinite(ms)) return '—';
  const totalMins = Math.floor(ms / 60_000);
  const hours = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  if (hours > 0) return `${hours}h ${mins}m`;
  if (totalMins > 0) return `${totalMins}m`;
  return '<1m';
}

/** Consider a session "live" if seen within this window. */
export const PRESENCE_STALE_MS = 3 * 60 * 1000;
