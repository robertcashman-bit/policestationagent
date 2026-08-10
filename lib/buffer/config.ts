import { cleanEnvValue } from '@/lib/env';
import type { BufferChannelConfig } from './types';

export const SITE_URL = 'https://psrtrain.com';

/** Buffer Personal Access Token / API key (server-side only). */
export function getBufferApiKey(): string | null {
  return (
    cleanEnvValue(process.env.BUFFER_ACCESS_TOKEN) ||
    cleanEnvValue(process.env.BUFFER_API_KEY) ||
    null
  );
}

export function getBufferOrganizationId(): string | null {
  return cleanEnvValue(process.env.BUFFER_ORGANIZATION_ID) || null;
}

/**
 * Channels are configured purely via env so no IDs are committed. Each channel
 * is included only when its env var is set, so the site can enable platforms
 * incrementally (start with one channel for the test post).
 */
export function getBufferChannels(): BufferChannelConfig[] {
  const channels: BufferChannelConfig[] = [];
  const linkedin = cleanEnvValue(process.env.BUFFER_CHANNEL_LINKEDIN_ID);
  const facebook = cleanEnvValue(process.env.BUFFER_CHANNEL_FACEBOOK_ID);
  const twitter = cleanEnvValue(process.env.BUFFER_CHANNEL_TWITTER_ID);
  const google = cleanEnvValue(process.env.BUFFER_CHANNEL_GOOGLEBUSINESS_ID);
  if (linkedin) channels.push({ id: linkedin, service: 'linkedin', utmSlug: 'linkedin' });
  if (facebook) channels.push({ id: facebook, service: 'facebook', utmSlug: 'facebook' });
  if (twitter) channels.push({ id: twitter, service: 'twitter', utmSlug: 'twitter' });
  if (google) channels.push({ id: google, service: 'googlebusiness', utmSlug: 'googlebusiness' });
  return channels;
}

/** How far ahead to look when checking Buffer for already-scheduled posts. */
export function getDedupWindowDays(): number {
  const n = Number(cleanEnvValue(process.env.BUFFER_DEDUP_WINDOW_DAYS) || '30');
  return Number.isFinite(n) && n > 0 ? Math.min(Math.floor(n), 90) : 30;
}
