import type { BufferEngineAdapter, BufferKV, SchedulablePost } from '@robertcashman/buffer-engine';
import { kv } from '@vercel/kv';
import { MEDIA_FALLBACK_IMAGE, SITE_ID, SITE_URL } from './config';
import { getSchedulablePosts as getLocalPosts } from './feed';

function kvAdapter(): BufferKV | null {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return null;
  return {
    get: (key) => kv.get(key),
    set: (key, value, options) =>
      options?.ex != null ? kv.set(key, value, { ex: options.ex }) : kv.set(key, value),
    del: (key) => kv.del(key),
  };
}

export function createCustodyNoteBufferAdapter(): BufferEngineAdapter {
  return {
    siteId: SITE_ID,
    siteUrl: SITE_URL,
    kv: kvAdapter(),
    mediaFallbackImageUrl: MEDIA_FALLBACK_IMAGE,
    getSchedulablePosts(): SchedulablePost[] {
      return getLocalPosts();
    },
  };
}
