/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable clean URLs
  trailingSlash: false,
  // SEO optimization
  poweredByHeader: false,
  compress: true,
  // Production optimizations
  productionBrowserSourceMaps: false,
  // Performance: Enable SWC minification (faster and better compression)
  swcMinify: true,
  // Compiler optimizations for better performance
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Experimental optimizations
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['lucide-react'],
  },
  // Performance: Optimize package imports for smaller bundles
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
    },
  },
  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'wixstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'base44.app',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.wixstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    // Allow all external images (for blog posts from various sources)
    unoptimized: false,
    // Performance optimizations
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // Redirects for old routes to new kebab-case routes
  async redirects() {
    return [
      {
        source: '/afterapoliceinterview',
        destination: '/after-a-police-interview',
        permanent: true,
      },
      {
        source: '/forsolicitors',
        destination: '/for-solicitors',
        permanent: true,
      },
      {
        source: '/psastations',
        destination: '/police-stations',
        permanent: true,
      },
      {
        source: '/termsandconditions',
        destination: '/terms-and-conditions',
        permanent: true,
      },
      {
        source: '/whatisapolicestationrep',
        destination: '/what-is-a-police-station-rep',
        permanent: true,
      },
      {
        source: '/f-a-q',
        destination: '/faq',
        permanent: true,
      },
      {
        source: '/g-d-p-r',
        destination: '/gdpr',
        permanent: true,
      },
      {
        source: '/out-of-area',
        destination: '/outofarea',
        permanent: true,
      },
      {
        source: '/can-we-help',
        destination: '/canwehelp',
        permanent: true,
      },
      {
        source: '/court-representation',
        destination: '/courtrepresentation',
        permanent: true,
      },
      {
        source: '/private-crime',
        destination: '/privatecrime',
        permanent: true,
      },
      {
        source: '/voluntaryinterviews',
        destination: '/voluntary-interviews',
        permanent: true,
      },
      {
        source: '/Privacy',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/FAQ',
        destination: '/faq',
        permanent: true,
      },
      // Redirect legacy criminaldefencekent blog routes to correct /blog routes
      {
        source: '/criminaldefencekent/blog/:slug*',
        destination: '/blog/:slug*',
        permanent: true,
      },
      // Redirect legacy /post routes to /blog
      {
        source: '/post',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/post/:slug*',
        destination: '/blog/:slug*',
        permanent: true,
      },
      // Redirect legacy blog archive/tags routes
      {
        source: '/blog/archive/:path*',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/tags/:path*',
        destination: '/blog',
        permanent: true,
      },
    ];
  },
  // Headers for cache control, security, and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' https:; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; require-trusted-types-for 'script';",
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none',
          },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=0, stale-while-revalidate=60',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/blog-images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*\\.(jpg|jpeg|png|gif|webp|svg|ico|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

