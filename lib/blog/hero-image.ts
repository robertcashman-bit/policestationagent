export type BlogHeroImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const BLOG_HERO_WIDTH = 1200;
export const BLOG_HERO_HEIGHT = 630;

/** Self-hosted JPEG or PNG hero — required for Buffer RSS enclosures. */
export function blogHeroImage(
  slug: string,
  alt: string,
  format: 'jpg' | 'png' = 'jpg',
): BlogHeroImage {
  return {
    src: `/images/blog/${slug}.${format}`,
    alt,
    width: BLOG_HERO_WIDTH,
    height: BLOG_HERO_HEIGHT,
  };
}

export function isBufferCompatibleHeroSrc(src: string): boolean {
  return /\.(jpe?g|png)(\?|$)/i.test(src);
}
