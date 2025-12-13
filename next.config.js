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
    ];
  },
  // Headers for cache control and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
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
    ];
  },
};

module.exports = nextConfig;

