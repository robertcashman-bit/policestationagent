import type { BufferChannelService, SchedulablePost } from './types';

/**
 * Per-platform staggered scheduling offsets (hours from the base time).
 * Mirrors the four-site Buffer plan: LinkedIn +2h, Facebook +4h, X +6h, GBP +24h.
 */
export const CHANNEL_STAGGER_HOURS: Record<BufferChannelService, number> = {
  linkedin: 2,
  facebook: 4,
  twitter: 6,
  googlebusiness: 24,
};

const TWITTER_MAX_CHARS = 270;

/** Append UTM params for attribution + dedup. campaign is the post slug. */
export function buildTrackingUrl(url: string, utmSlug: string, slug: string): string {
  const u = new URL(url);
  u.searchParams.set('utm_source', utmSlug);
  u.searchParams.set('utm_medium', 'social');
  u.searchParams.set('utm_campaign', slug);
  return u.toString();
}

/**
 * Stable dedup marker present in the tracking URL of every scheduled post for a
 * slug. Dedup is applied per channel (see dedup.ts), so the campaign slug alone
 * uniquely identifies a post within a channel's queue.
 */
export function dedupMarker(slug: string): string {
  return `utm_campaign=${slug}`;
}

/**
 * The marker actually present in a scheduled post's text for a given channel.
 * Google Business posts carry their link in metadata (not the body), so the
 * UTM campaign marker never appears in the text — dedup there falls back to the
 * post title, which is always the leading line of the GBP body.
 */
export function dedupMarkerForChannel(
  service: BufferChannelService,
  post: { slug: string; title: string },
): string {
  if (service === 'googlebusiness') return post.title.trim();
  return dedupMarker(post.slug);
}

function truncateForTwitter(text: string, url: string): string {
  const full = `${text} ${url}`;
  if (full.length <= TWITTER_MAX_CHARS) return full;
  const budget = TWITTER_MAX_CHARS - url.length - 2;
  const trimmed = text.slice(0, Math.max(0, budget)).trim().replace(/[\s,;:.]+$/, '');
  return `${trimmed}…\n${url}`;
}

/**
 * Build the social copy for a given platform. Pure function — no I/O.
 * Includes a soft training disclaimer footer where space allows.
 */
export function buildChannelText(
  post: SchedulablePost,
  service: BufferChannelService,
  trackingUrl: string,
): string {
  const title = post.title.trim();
  const desc = post.description.trim();

  switch (service) {
    case 'linkedin':
      return [
        title,
        '',
        desc,
        '',
        'Practical PSRAS, PACE and CIT preparation for police station representative candidates (England & Wales). Training information — not legal advice.',
        '',
        trackingUrl,
      ].join('\n');
    case 'facebook':
      return [title, '', desc, '', `Read more: ${trackingUrl}`].join('\n');
    case 'googlebusiness':
      return [title, desc].join(' — ').slice(0, 1490);
    case 'twitter':
    default:
      return truncateForTwitter(`${title} — ${desc}`, trackingUrl);
  }
}
