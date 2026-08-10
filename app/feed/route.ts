import { rssFeedGet, rssFeedHead } from '@/lib/rss-feed';

/** RSS 2.0 — primary URL for aggregators and Buffer scheduler. */
export function GET() {
  return rssFeedGet();
}

export function HEAD() {
  return rssFeedHead();
}
