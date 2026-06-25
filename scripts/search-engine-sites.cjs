/**
 * Sites to notify on deploy (IndexNow + Bing Webmaster + Yandex sitemap ping).
 * PSA uses a curated URL list; REPUK uses sitemap.xml (fetched at runtime).
 */
const PSA_INDEXNOW_KEY = "655b1cdbce5c462b9fe51c4e19f92678";

/** @typedef {{ id: string; siteUrl: string; sitemapUrl: string; indexNow?: { key: string; keyLocation: string }; bingSiteUrl?: string; useSitemap?: boolean; maxSitemapUrls?: number }} SearchEngineSite */

/** @type {SearchEngineSite[]} */
const SEARCH_ENGINE_SITES = [
  {
    id: "psa",
    siteUrl: "https://www.policestationagent.com",
    sitemapUrl: "https://www.policestationagent.com/sitemap.xml",
    bingSiteUrl: "https://www.policestationagent.com",
    indexNow: {
      key: PSA_INDEXNOW_KEY,
      keyLocation: `https://www.policestationagent.com/${PSA_INDEXNOW_KEY}.txt`,
    },
    useSitemap: false,
  },
  {
    id: "repuk",
    siteUrl: "https://policestationrepuk.org",
    sitemapUrl: "https://policestationrepuk.org/sitemap.xml",
    bingSiteUrl: "https://policestationrepuk.org",
    useSitemap: true,
    maxSitemapUrls: 1000,
    /** Bing daily URL submission quota — cap per run to avoid 400 errors */
    maxBingUrls: 100,
  },
];

module.exports = { SEARCH_ENGINE_SITES, PSA_INDEXNOW_KEY };
