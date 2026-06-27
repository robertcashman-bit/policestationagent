/** @type {import('next').NextConfig} */
const { LEGACY_LOCAL_REDIRECTS } = require("./config/legacy-local-redirects.js");
const { BLOG_REDIRECT_NEXT_RULES } = require("./config/blog-slug-redirects.js");

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@robertcashman/firm-outreach-core'],
  turbopack: {
    resolveAlias: {
      '@robertcashman/firm-outreach-core': './packages/firm-outreach-core',
    },
  },
  // Enable clean URLs
  trailingSlash: false,
  // SEO optimization
  poweredByHeader: false,
  compress: true,
  // Production optimizations
  productionBrowserSourceMaps: false,
  // Compiler optimizations for better performance
  compiler: {
    // Remove console logs in production
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },
  // Experimental optimizations
  experimental: {
    // Optimize package imports
    optimizePackageImports: ["lucide-react"],
  },
  // Performance: Optimize package imports for smaller bundles
  modularizeImports: {
    "lucide-react": {
      transform: "lucide-react/dist/esm/icons/{{kebabCase member}}",
    },
  },
  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "wixstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "base44.app",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.wixstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    // Allow all external images (for blog posts from various sources)
    unoptimized: false,
    // Performance optimizations
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // Redirects for old routes to new kebab-case routes
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/home/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/afterapoliceinterview",
        destination: "/after-a-police-interview",
        permanent: true,
      },
      {
        source: "/forsolicitors",
        destination: "/for-solicitors",
        permanent: true,
      },
      {
        source: "/psastations",
        destination: "/police-stations",
        permanent: true,
      },
      {
        source: "/termsandconditions",
        destination: "/terms-and-conditions",
        permanent: true,
      },
      {
        source: "/whatisapolicestationrep",
        destination: "/what-is-a-police-station-rep",
        permanent: true,
      },
      {
        source: "/f-a-q",
        destination: "/faq",
        permanent: true,
      },
      {
        source: "/g-d-p-r",
        destination: "/gdpr",
        permanent: true,
      },
      {
        source: "/out-of-area",
        destination: "/outofarea",
        permanent: true,
      },
      {
        source: "/can-we-help",
        destination: "/canwehelp",
        permanent: true,
      },
      {
        source: "/court-representation",
        destination: "/courtrepresentation",
        permanent: true,
      },
      {
        source: "/private-crime",
        destination: "/privatecrime",
        permanent: true,
      },
      {
        source: "/voluntaryinterviews",
        destination: "/voluntary-interviews",
        permanent: true,
      },
      {
        source: "/Privacy",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/FAQ",
        destination: "/faq",
        permanent: true,
      },
      // Redirect legacy criminaldefencekent blog routes to correct /blog routes
      {
        source: "/criminaldefencekent/blog/:slug*",
        destination: "/blog/:slug*",
        permanent: true,
      },
      // Redirect legacy /post routes to /blog
      {
        source: "/post",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/post/:slug*",
        destination: "/blog/:slug*",
        permanent: true,
      },
      // Redirect legacy blog archive/tags routes
      {
        source: "/blog/archive/:path*",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/tags/:path*",
        destination: "/blog",
        permanent: true,
      },
      // SEO growth programme — alias slugs to canonical pages
      {
        source: "/police-station-representative-kent",
        destination: "/kent-police-station-reps",
        permanent: true,
      },
      {
        source: "/police-station-cover-medway",
        destination: "/police-station-rep-medway",
        permanent: true,
      },
      {
        source: "/police-station-cover-sevenoaks",
        destination: "/police-station-rep-sevenoaks",
        permanent: true,
      },
      {
        source: "/police-station-cover-swanley",
        destination: "/police-station-rep-swanley",
        permanent: true,
      },
      {
        source: "/police-station-cover-dartford",
        destination: "/police-station-rep-dartford",
        permanent: true,
      },
      {
        source: "/police-station-cover-gravesend",
        destination: "/police-station-rep-gravesend",
        permanent: true,
      },
      {
        source: "/north-kent-gravesend-police-station",
        destination: "/police-station-rep-gravesend",
        permanent: true,
      },
      {
        source: "/gravesend-solicitor",
        destination: "/police-station-rep-gravesend",
        permanent: true,
      },
      {
        source: "/police-station-agent-gravesend",
        destination: "/police-station-rep-gravesend",
        permanent: true,
      },
      {
        source: "/police-station-cover-maidstone",
        destination: "/police-station-rep-maidstone",
        permanent: true,
      },
      {
        source: "/police-station-cover-tonbridge",
        destination: "/police-station-rep-tonbridge",
        permanent: true,
      },
      {
        source: "/tonbridge-police-station",
        destination: "/police-station-rep-tonbridge",
        permanent: true,
      },
      {
        source: "/tonbridge-solicitor",
        destination: "/police-station-rep-tonbridge",
        permanent: true,
      },
      {
        source: "/police-station-cover-tunbridge-wells",
        destination: "/police-station-rep-tunbridge-wells",
        permanent: true,
      },
      {
        source: "/police-station-cover-chatham",
        destination: "/coverage/areas/medway",
        permanent: true,
      },
      {
        source: "/police-station-cover-gillingham",
        destination: "/coverage/areas/medway",
        permanent: true,
      },
      {
        source: "/police-station-cover-rochester",
        destination: "/coverage/areas/medway",
        permanent: true,
      },
      {
        source: "/police-station-cover-for-solicitors",
        destination: "/for-solicitors",
        permanent: true,
      },
      {
        source: "/police-station-representation",
        destination: "/services/police-station-representation",
        permanent: true,
      },
      {
        source: "/police-station-legal-advice",
        destination: "/free-police-station-advice-kent",
        permanent: true,
      },
      {
        source: "/voluntary-police-interview-solicitor",
        destination: "/voluntary-police-interview",
        permanent: true,
      },
      {
        source: "/no-comment-police-interview-advice",
        destination: "/no-comment-interview",
        permanent: true,
      },
      {
        source: "/police-bail-and-rui-advice",
        destination: "/released-under-investigation",
        permanent: true,
      },
      {
        source: "/criminal-defence-firm-support",
        destination: "/start/solicitors-agent-cover",
        permanent: true,
      },
      // Public-facing blog review — firm posts → public canonicals
      {
        source: "/blog/instructing-cover-north-kent-gravesend-custody",
        destination: "/blog/north-kent-gravesend-custody-legal-advice",
        permanent: true,
      },
      {
        source: "/blog/police-station-cover-west-kent-tonbridge-firms",
        destination: "/blog/tonbridge-police-station-custody-and-interviews",
        permanent: true,
      },
      {
        source: "/blog/when-to-instruct-police-station-agent",
        destination: "/blog/when-to-ask-for-solicitor-kent-police-station",
        permanent: true,
      },
      {
        source: "/blog/freelance-police-station-agents-for-solicitors",
        destination: "/blog/who-attends-police-station-legal-advice",
        permanent: true,
      },
      {
        source: "/blog/instructing-a-police-station-representative",
        destination: "/blog/arrange-solicitor-someone-in-custody",
        permanent: true,
      },
      {
        source: "/blog/police-station-cover-criminal-defence-firms-kent-medway",
        destination: "/blog/legal-advice-medway-custody-kent",
        permanent: true,
      },
      // RepUK-style orphan blog slugs → blog index
      {
        source: "/blog/how-to-become-a-police-station-representative",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/police-station-representative-directory-i-want-to-become-a-police-station-rep",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/get-paid-as-a-police-station-representative",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/find-a-police-station-rep-now",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/register-as-a-police-station-representative",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/police-station-rep-our-top-10-tips",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/police-station-rep-registration",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/getting-paid-as-a-police-station-rep",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/what-does-a-police-station-representative-do",
        destination: "/services/police-station-representation",
        permanent: true,
      },
      {
        source: "/blog/understanding-the-role-of-police-station-representatives",
        destination: "/services/police-station-representation",
        permanent: true,
      },
      // Legacy/stale sitemap URLs (WordPress/Yoast/Wix era) that search engines
      // still hold. They 404'd after the migration, which is why Bing Webmaster
      // reported sitemaps "with errors". 301 them to the two canonical sitemaps
      // so the errors clear on the next crawl. Canonical sitemaps:
      //   /sitemap.xml        (app/sitemap.ts)
      //   /blog-sitemap.xml   (app/blog-sitemap.xml/route.ts)
      {
        source: "/blog-posts-sitemap.xml",
        destination: "/blog-sitemap.xml",
        permanent: true,
      },
      {
        source: "/post-sitemap.xml",
        destination: "/blog-sitemap.xml",
        permanent: true,
      },
      {
        source: "/sitemap_index.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/sitemap-index.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/wp-sitemap.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/page-sitemap.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/category-sitemap.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/post_tag-sitemap.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/author-sitemap.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/news-sitemap.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/image-sitemap.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/local-sitemap.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/sitemap1.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      ...LEGACY_LOCAL_REDIRECTS,
      // Phase 2 SEO — legacy blog-slug cannibalisation remediation (canonical + 301, no deletions).
      // Source of truth: config/blog-slug-redirects.json. See docs/seo-content-strategy.md §2.
      ...BLOG_REDIRECT_NEXT_RULES,
    ];
  },
  // Headers for cache control, security, and performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            // NOTE: 'unsafe-inline'/'unsafe-eval' in script-src are required by
            // Next.js's runtime/hydration and inline JSON-LD. object-src 'none'
            // and the explicit base-uri/form-action/frame-ancestors keep the
            // policy restrictive for the highest-impact injection vectors.
            value:
              "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' https:; frame-ancestors 'self'; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "unsafe-none",
          },
        ],
      },
      {
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=0, stale-while-revalidate=60",
          },
          {
            // Never allow API responses to be indexed by search engines.
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
      {
        // Private admin area must never be indexed.
        source: "/admin/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/blog-images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*\\.(jpg|jpeg|png|gif|webp|svg|ico|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

const { withSentryConfig } = require("@sentry/nextjs");

// Only apply the Sentry build plugin (which injects the client SDK and wraps
// middleware) when a browser DSN is configured at build time. This keeps the
// default client bundle and middleware free of Sentry weight when monitoring
// is not enabled. Server/edge error capture still activates at runtime via
// instrumentation.ts whenever SENTRY_DSN is set. No DSN/secret is hardcoded.
const sentryEnabled = Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN);

module.exports = sentryEnabled
  ? withSentryConfig(nextConfig, {
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      silent: true,
      widenClientFileUpload: true,
      webpack: {
        treeshake: {
          removeDebugLogging: true,
        },
      },
      // Source map upload only runs when an auth token is present (CI/prod);
      // otherwise the build still succeeds without uploading.
      sourcemaps: {
        disable: !process.env.SENTRY_AUTH_TOKEN,
      },
    })
  : nextConfig;
