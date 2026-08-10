/** @type {import('next').NextConfig} */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { withSentryConfig } from '@sentry/nextjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, 'package.json'), 'utf8'));

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    NEXT_PUBLIC_APP_VERSION: pkg.version,
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString().slice(0, 10),
  },
  async rewrites() {
    const trainingSeoSlugs = [
      'police-station-representative-training',
      'criminal-defence-training',
      'voluntary-interview-training',
      'vulnerable-suspect-interview-training',
      'pace-interview-training',
      'no-comment-interview-training',
      'police-station-accreditation-support',
      'sqe-criminal-practice-police-station-basics',
      'youth-suspect-interview-training',
    ];
    return trainingSeoSlugs.map((slug) => ({
      source: `/${slug}`,
      destination: `/training-seo/${slug}`,
    }));
  },
  async redirects() {
    return [
      { source: '/about', destination: '/legal/about', permanent: true },
      { source: '/contact', destination: '/legal/contact', permanent: true },
      { source: '/privacy', destination: '/legal/privacy', permanent: true },
      { source: '/terms', destination: '/legal/terms', permanent: true },
      { source: '/disclaimer', destination: '/legal/disclaimer', permanent: true },
      { source: '/cookies', destination: '/legal/cookies', permanent: true },
      { source: '/refund', destination: '/legal/refund', permanent: true },
      { source: '/complaints', destination: '/legal/complaints', permanent: true },
      { source: '/faq', destination: '/legal/faq', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://vitals.vercel-insights.com https://*.ingest.sentry.io https://api.openai.com https://*.supabase.co https://accounts.google.com",
              "object-src 'none'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self' https://accounts.google.com",
            ].join("; "),
          },
        ],
      },
      // Keep API responses and admin dashboards out of search indexes.
      {
        source: "/api/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

// Sentry wraps the config so server/edge/client errors can be captured. Source-map
// upload only runs when SENTRY_AUTH_TOKEN (+ org/project) are set in CI/Vercel; the
// integration is otherwise a no-op (see instrumentation*.ts which require a DSN).
export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  disableLogger: true,
});
