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
    ],
    // Allow all external images (for blog posts from various sources)
    unoptimized: false,
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
        source: '/termsandconditions',
        destination: '/terms-and-conditions',
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
    ];
  },
};

module.exports = nextConfig;

