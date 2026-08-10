export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://custodynote.com').replace(
  /\/$/,
  '',
);

export const SITE_ID = 'custodynote';

/** Public JPEG fallback — never use private/auth-gated screenshot URLs for Buffer. */
export const MEDIA_FALLBACK_IMAGE = `${SITE_URL}/images/buffer/gbp/custodynote-default.jpg`;
