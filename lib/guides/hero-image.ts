export type GuideHeroImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const GUIDE_HERO_WIDTH = 1200;
export const GUIDE_HERO_HEIGHT = 630;

/** Self-hosted JPEG hero — required for Buffer RSS enclosures and GBP. */
export function guideHeroImage(slug: string, alt: string): GuideHeroImage {
  return {
    src: `/images/guides/${slug}.jpg`,
    alt,
    width: GUIDE_HERO_WIDTH,
    height: GUIDE_HERO_HEIGHT,
  };
}

export function isBufferCompatibleHeroSrc(src: string): boolean {
  return /\.(jpe?g|png)(\?|$)/i.test(src);
}
