/**
 * Lightweight GA4 event helpers — no-op when measurement ID is unset.
 */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

export function isAnalyticsEnabled(): boolean {
  return Boolean(GA_ID);
}

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean | undefined>,
): void {
  if (typeof window === 'undefined' || !GA_ID || typeof window.gtag !== 'function') return;
  const cleaned: Record<string, string | number | boolean> = {};
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) cleaned[key] = value;
    }
  }
  window.gtag('event', name, cleaned);
}

export const AnalyticsEvents = {
  outboundPartnerClick: (partner: string, placement: string) =>
    trackEvent('outbound_partner_click', { partner, placement }),
} as const;
