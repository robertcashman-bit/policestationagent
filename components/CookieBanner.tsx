"use client";

/**
 * COOKIE BANNER COMPONENT
 *
 * Minimal, GDPR-compliant cookie consent banner.
 */

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 p-2 md:p-3 shadow-2xl z-50 border-t-2 md:border-t-4 border-blue-600">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 md:gap-3">
        <div className="flex-1">
          <p
            className="text-[10px] md:text-xs leading-tight text-white"
            style={{ color: "#ffffff" }}
          >
            We use cookies to improve your experience. By continuing, you accept our use of cookies.{" "}
            <Link href="/privacy" className="underline hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 rounded">
              Privacy policy
            </Link>
          </p>
        </div>
        <div className="flex gap-1.5 md:gap-2 flex-shrink-0">
          <button
            onClick={handleAccept}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs h-7 px-3 md:h-9 md:px-4"
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow rounded-md bg-slate-700 hover:bg-slate-600 text-white font-medium text-xs h-7 px-3 md:h-9 md:px-4"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
