"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { touchEnquiryAttribution } from "@/lib/enquiry/attribution-client";

/** Records first-party landing/referrer/UTM touches in sessionStorage (no PII). */
export function EnquiryAttributionTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    touchEnquiryAttribution();
  }, [pathname, searchParams]);

  return null;
}
