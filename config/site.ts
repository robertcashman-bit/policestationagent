// Canonical domain (must match live hosting primary domain to avoid redirect loops)
export const SITE_DOMAIN = "www.policestationagent.com";
export const SITE_URL = `https://${SITE_DOMAIN}`;

/** Robert Cashman headshot (Wix-extracted portrait). Use only where a face belongs. */
export const ROBERT_CASHMAN_PHOTO_PATH = "/images/robert-cashman.jpg";
export const ROBERT_CASHMAN_PHOTO_URL = `${SITE_URL}${ROBERT_CASHMAN_PHOTO_PATH}`;


// Legacy domains that should redirect to canonical
export const LEGACY_DOMAINS = [
  "policestationagent.com",
  "criminaldefencekent.co.uk",
  "www.criminaldefencekent.co.uk",
];
