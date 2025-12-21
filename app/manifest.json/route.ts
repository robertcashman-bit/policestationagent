import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    name: 'Police Station Agent - Police Station Agent',
    short_name: 'Police Station Agent',
    description: 'Expert police station representation and legal services across Kent. Available during extended hours for urgent legal assistance.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e40af',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };

  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/manifest+json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}













































