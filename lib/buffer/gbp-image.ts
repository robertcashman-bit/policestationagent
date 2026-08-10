import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { SITE_URL } from './config';
import type { BufferChannelService } from './types';

export const GBP_BRAND_FALLBACK_PATH = '/images/blog/psras-exam-format-pass-mark-2026.jpg';

/** Google Business accepts JPEG/PNG only. */
export function isGbpSafeImageUrl(url: string | undefined | null): boolean {
  if (!url?.trim()) return false;
  const trimmed = url.trim();
  if (/\.webp(\?|$)/i.test(trimmed)) return false;
  if (/\.svg(\?|$)/i.test(trimmed)) return false;
  if (/opengraph-image/i.test(trimmed)) return false;
  return /\.(jpe?g|png)(\?|$)/i.test(trimmed);
}

function absUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const base = SITE_URL.replace(/\/$/, '');
  return pathOrUrl.startsWith('/') ? `${base}${pathOrUrl}` : `${base}/${pathOrUrl}`;
}

function pathnameFromUrl(url: string): string | null {
  try {
    if (url.startsWith('/')) return url;
    return new URL(url).pathname;
  } catch {
    return null;
  }
}

function jpgSiblingPathname(imageUrl: string): string | null {
  const pathname = pathnameFromUrl(imageUrl);
  if (!pathname || !/\.webp(\?|$)/i.test(pathname)) return null;
  return pathname.replace(/\.webp(\?.*)?$/i, '.jpg$1');
}

export function gbpSafeImageUrl(imageUrl: string | undefined | null): string | undefined {
  if (!imageUrl?.trim()) return undefined;
  const trimmed = imageUrl.trim();

  if (isGbpSafeImageUrl(trimmed)) return absUrl(trimmed);

  const jpgPath = jpgSiblingPathname(trimmed);
  if (jpgPath && existsSync(join(process.cwd(), 'public', jpgPath))) {
    return absUrl(jpgPath);
  }

  if (existsSync(join(process.cwd(), 'public', GBP_BRAND_FALLBACK_PATH))) {
    return absUrl(GBP_BRAND_FALLBACK_PATH);
  }

  return undefined;
}

export function imageUrlForChannel(
  imageUrl: string | undefined,
  service: BufferChannelService,
): string | undefined {
  if (service === 'googlebusiness') return gbpSafeImageUrl(imageUrl);
  return imageUrl;
}
