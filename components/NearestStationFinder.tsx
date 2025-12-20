'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

type Station = {
  name: string;
  slug: string; // /police-stations/[slug]
  lat: number;
  lng: number;
};

function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const x =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  return R * c;
}

export default function NearestStationFinder() {
  const stations: Station[] = useMemo(
    () => [
      // Approximate town-centre coordinates (sufficient for “nearest” guidance).
      { name: 'Medway (Gillingham)', slug: 'medway', lat: 51.386, lng: 0.551 },
      { name: 'Maidstone', slug: 'maidstone', lat: 51.272, lng: 0.514 },
      { name: 'Canterbury', slug: 'canterbury', lat: 51.280, lng: 1.079 },
      { name: 'Gravesend (North Kent)', slug: 'north-kent', lat: 51.441, lng: 0.370 },
      { name: 'Tonbridge', slug: 'tonbridge', lat: 51.195, lng: 0.273 },
    ],
    []
  );

  const [status, setStatus] = useState<'idle' | 'locating' | 'ready' | 'error'>('idle');
  const [nearest, setNearest] = useState<{ station: Station; distanceKm: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onFindNearest = async () => {
    setStatus('locating');
    setError(null);
    setNearest(null);

    if (!('geolocation' in navigator)) {
      setStatus('error');
      setError('Geolocation is not available in this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const here = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        let best: { station: Station; distanceKm: number } | null = null;

        for (const s of stations) {
          const d = haversineKm(here, { lat: s.lat, lng: s.lng });
          if (!best || d < best.distanceKm) best = { station: s, distanceKm: d };
        }

        if (!best) {
          setStatus('error');
          setError('Unable to calculate nearest station.');
          return;
        }

        setNearest(best);
        setStatus('ready');
      },
      () => {
        setStatus('error');
        setError('Location access was blocked. You can still browse all stations.');
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60_000 }
    );
  };

  return (
    <div className="not-prose mb-8 rounded-xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900 mb-2">Find your nearest custody suite</h2>
      <p className="text-slate-700 mb-4">
        Use your current location to get a quick “nearest” suggestion, then view the full station page with contact and
        coverage details.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={onFindNearest}
          disabled={status === 'locating'}
          className="inline-flex items-center justify-center rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 disabled:opacity-60"
        >
          {status === 'locating' ? 'Finding…' : 'Find nearest station'}
        </button>
        <Link
          href="/police-stations"
          className="inline-flex items-center justify-center rounded-md border border-slate-300 hover:bg-white text-slate-900 font-semibold px-5 py-3"
        >
          Browse all police stations
        </Link>
      </div>

      {nearest && (
        <div className="mt-5 rounded-lg bg-white border border-slate-200 p-4">
          <div className="text-slate-900 font-bold">{nearest.station.name}</div>
          <div className="text-slate-600 text-sm">
            Approx. {nearest.distanceKm.toFixed(0)} km away (estimate)
          </div>
          <div className="mt-3">
            <Link href={`/police-stations/${nearest.station.slug}`} className="text-blue-700 hover:underline font-semibold">
              View station page →
            </Link>
          </div>
        </div>
      )}

      {status === 'error' && error && (
        <div className="mt-5 rounded-lg bg-amber-50 border border-amber-200 p-4 text-amber-900">
          <div className="font-semibold">Couldn’t use location</div>
          <div className="text-sm">{error}</div>
        </div>
      )}
    </div>
  );
}

