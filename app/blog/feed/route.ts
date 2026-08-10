import { blogRssFeedGet, blogRssFeedHead } from '@/lib/blog/rss-feed';

/** RSS 2.0 for blog posts — connect Buffer to this URL for social syndication. */
export function GET() {
  return blogRssFeedGet();
}

export function HEAD() {
  return blogRssFeedHead();
}
