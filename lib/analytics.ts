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
  callClick: (placement: string) => trackEvent('call_click', { placement }),
  whatsAppClick: (placement: string) => trackEvent('whatsapp_click', { placement }),
  smsClick: (placement: string) => trackEvent('sms_click', { placement }),
  formSubmit: (form: string) => trackEvent('form_submit', { form }),
  solicitorInstruction: (placement: string) =>
    trackEvent('solicitor_instruction', { placement }),
  policeStationCoverRequest: (placement: string) =>
    trackEvent('police_station_cover_request', { placement }),
  blogCtaClick: (placement: string) => trackEvent('blog_cta_click', { placement }),
  contactPageSubmit: () => trackEvent('contact_page_submit', { form: 'contact' }),
  outboundPartnerClick: (partner: string, placement: string) =>
    trackEvent('outbound_partner_click', { partner, placement }),
} as const;
