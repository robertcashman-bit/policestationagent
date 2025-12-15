'use client';

/**
 * MINIMAL COOKIE CONSENT BANNER
 * 
 * UK/EU compliant, non-intrusive cookie consent banner.
 * - Stores consent in localStorage
 * - Only shows once (until consent expires)
 * - Minimal, accessible design
 * - No third-party dependencies
 * - Fixed hydration mismatch by using mounted state
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  timestamp: number;
}

const CONSENT_EXPIRY_DAYS = 365;
const STORAGE_KEY = 'cookieConsent';

export default function CookieBanner() {
  // Use mounted state to prevent hydration mismatch
  // Server and client both render null initially, then client checks localStorage
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);

  useEffect(() => {
    // Mark as mounted after hydration
    setMounted(true);
    
    // Check if consent already exists and is valid
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed: CookiePreferences = JSON.parse(stored);
        const expiryDate = parsed.timestamp + (CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
        if (Date.now() < expiryDate) {
          // Consent is still valid
          setPreferences(parsed);
          setIsVisible(false);
          return;
        }
      } catch {
        // Invalid stored data, show banner
      }
    }
    
    // Show banner if no valid consent
    setIsVisible(true);
  }, []);

  const saveConsent = (analytics: boolean) => {
    const consent: CookiePreferences = {
      necessary: true, // Always true
      analytics,
      timestamp: Date.now(),
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    setPreferences(consent);
    setIsVisible(false);

    // If analytics consent given, initialize analytics (if needed)
    // Note: Google Analytics initialization would go here if implemented
    if (analytics && typeof window !== 'undefined') {
      // Analytics initialization code would be added here when needed
      // Example: if (typeof (window as any).gtag === 'function') { (window as any).gtag(...) }
    }
  };

  const acceptAll = () => saveConsent(true);
  const rejectAnalytics = () => saveConsent(false);

  // Prevent hydration mismatch: don't render until after mount
  // This ensures server and client both render null initially
  if (!mounted || !isVisible) {
    return null;
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-lg"
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 id="cookie-banner-title" className="text-sm font-semibold text-slate-900 mb-1">
              Cookie Preferences
            </h3>
            <p id="cookie-banner-description" className="text-sm text-slate-600">
              We use essential cookies to ensure the site works properly. 
              Analytics cookies help us understand how visitors use the site (optional).{' '}
              <Link href="/cookies" className="text-blue-600 hover:text-blue-700 underline">
                Learn more
              </Link>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={rejectAnalytics}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Essential Only
            </button>
            <button
              onClick={acceptAll}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
