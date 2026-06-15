import { MetadataRoute } from "next";
import { SITE_DOMAIN } from "@/config/site";
import { getAllPosts } from "@/lib/blog-reader";
import { REP_TOWN_PATHS } from "@/lib/seo/rep-town-paths";

// Lazy import to avoid build-time database initialization issues on Vercel
function getDb() {
  try {
    // Only import db at runtime, not at module load time
    if (process.env.NEXT_PHASE === "phase-production-build") {
      return null;
    }
    return require("@/lib/db").default;
  } catch (error) {
    return null;
  }
}

function locationSitemapEntries(
  baseUrl: string,
  paths: string[],
  priority = 0.85
): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority,
  }));
}

const SOLICITOR_LOCATION_PATHS = [
  "/ashford-solicitor",
  "/bluewater-solicitor",
  "/bromley-solicitor",
  "/canterbury-solicitor",
  "/chatham-solicitor",
  "/dartford-solicitor",
  "/deal-solicitor",
  "/dover-solicitor",
  "/faversham-solicitor",
  "/folkestone-solicitor",
  "/gillingham-solicitor",
  "/herne-bay-solicitor",
  "/maidstone-solicitor",
  "/margate-solicitor",
  "/medway-solicitor",
  "/police-station-solicitor",
  "/ramsgate-solicitor",
  "/rochester-solicitor",
  "/sandwich-solicitor",
  "/sevenoaks-solicitor",
  "/sittingbourne-solicitor",
  "/swanley-solicitor",
  "/tonbridge-solicitor",
  "/tunbridge-wells-solicitor",
  "/whitstable-solicitor",
];

const POLICE_STATION_AGENT_PATHS = [
  "/police-station-agent-kent",
  "/police-station-agent-ashford",
  "/police-station-agent-canterbury",
  "/police-station-agent-dartford",
  "/police-station-agent-folkestone",
  "/police-station-agent-maidstone",
  "/police-station-agent-medway",
  "/police-station-agent-sevenoaks",
  "/police-station-agent-sittingbourne",
  "/police-station-agent-tonbridge",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${SITE_DOMAIN}`;

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/coverage`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/for-solicitors`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/for-clients`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/voluntary-interviews`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/why-use-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/what-we-do`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/what-is-a-police-station-rep`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/what-is-a-criminal-solicitor`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/after-a-police-interview`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/complaints`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/accessibility`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/gdpr`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/police-stations`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/bail-applications`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/pre-charge-advice`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/police-station-representation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/importance-of-early-legal-advice`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kent-police-station-reps`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kent-police-stations`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/police-station-interviews-kent-rights`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/article-interview-under-caution`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/freelegaladvice`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/emergency-police-station-representation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/police-custody-rights`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/police-interview-rights`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/preparing-for-police-interview`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/vulnerable-adults-in-custody`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/what-to-expect-at-a-police-interview-in-kent`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fees`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/join`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/courtrepresentation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/canwehelp`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kent-police-custody-resources`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resources/pace-rights-guide`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/link-to-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/press`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/outofarea`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privatecrime`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privateclientfaq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/your-rights-in-custody`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/voluntary-police-interview-risks`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/voluntary-police-interview`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/offences-we-deal-with`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/offences/assault-abh-gbh`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/offences/domestic-abuse-allegations`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/offences/drug-offences`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/offences/fraud-theft`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/offences/harassment-stalking`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/offences/sexual-offences`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/start/in-custody`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/start/voluntary-interview`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/start/solicitors-agent-cover`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/areas`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/coverage/police-stations`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/coverage/areas`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/christmashours`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/hours`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/arrested-what-to-do`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // NEW Authority Pages (SEO Gap Coverage)
    {
      url: `${baseUrl}/custody-time-limits`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/no-comment-interview`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/prepared-statements`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/released-under-investigation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/adverse-inference`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/police-bail-explained`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pace-code-c`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/youth-custody-rights`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/appropriate-adult`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/can-police-take-my-phone`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dna-fingerprints-police-station`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // Police Station Pages
    {
      url: `${baseUrl}/medway-police-station`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/canterbury-police-station`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/folkestone-police-station`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/maidstone-police-station`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tonbridge-police-station`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ashford-police-station`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dover-police-station`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/margate-police-station`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sevenoaks-police-station`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tunbridge-wells-police-station`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/swanley-police-station`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/bluewater-police-station`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sittingbourne-police-station`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gravesend-police-station`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/coldharbour-police-station`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    // Town-level police station rep pages (from shared REP_TOWN_PATHS)
    ...REP_TOWN_PATHS.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];

  // Police stations (with error handling for build time)
  let stationPages: MetadataRoute.Sitemap = [];
  try {
    const db = getDb();
    if (db) {
      const stations = db.prepare("SELECT slug, updated_at FROM police_stations").all() as Array<{
        slug: string;
        updated_at: string | null;
      }>;

      stationPages = stations.map((station) => ({
        url: `${baseUrl}/police-stations/${station.slug}`,
        lastModified: station.updated_at ? new Date(station.updated_at) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }));
    }
  } catch (error) {
    // Database not available during build - skip dynamic pages
    console.warn("Skipping dynamic police stations in sitemap (build time)");
  }

  // Coverage police station pages (static)
  const coverageStationSlugs = [
    "medway",
    "north-kent-gravesend",
    "canterbury",
    "folkestone",
    "maidstone",
    "tonbridge",
    "ashford",
    "dover",
    "margate",
    "sevenoaks",
    "sittingbourne",
    "swanley",
    "tunbridge-wells",
    "coldharbour",
  ];

  const coverageStationPages: MetadataRoute.Sitemap = coverageStationSlugs.map((slug) => ({
    url: `${baseUrl}/coverage/police-stations/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Coverage area pages (static)
  const coverageAreaSlugs = [
    "medway",
    "north-kent",
    "east-kent",
    "mid-kent",
    "west-kent",
    "north-west-kent",
    "maidstone",
  ];

  const coverageAreaPages: MetadataRoute.Sitemap = coverageAreaSlugs.map((slug) => ({
    url: `${baseUrl}/coverage/areas/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Services (with error handling for build time)
  let servicePages: MetadataRoute.Sitemap = [];
  try {
    const db = getDb();
    if (db) {
      const services = db.prepare("SELECT slug, updated_at FROM services").all() as Array<{
        slug: string;
        updated_at: string | null;
      }>;

      servicePages = services.map((service) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: service.updated_at ? new Date(service.updated_at) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }));
    }
  } catch (error) {
    // Database not available during build - skip dynamic pages
    console.warn("Skipping dynamic services in sitemap (build time)");
  }

  // Blog posts from the same build-safe reader used by /blog and /blog/[slug].
  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [
    ...staticPages,
    ...locationSitemapEntries(baseUrl, SOLICITOR_LOCATION_PATHS, 0.85),
    ...locationSitemapEntries(baseUrl, POLICE_STATION_AGENT_PATHS, 0.88),
    ...stationPages,
    ...servicePages,
    ...blogPages,
    ...coverageStationPages,
    ...coverageAreaPages,
  ];
}
