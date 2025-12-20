// Canonical domain (must match live hosting primary domain to avoid redirect loops)
export const SITE_DOMAIN = "www.policestationagent.com";
export const SITE_URL = `https://${SITE_DOMAIN}`;

// Legacy domains that should redirect to canonical
export const LEGACY_DOMAINS = [
  "policestationagent.com",
  "criminaldefencekent.co.uk",
  "www.criminaldefencekent.co.uk",
];
