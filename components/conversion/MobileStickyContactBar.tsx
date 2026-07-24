"use client";

import RouteAwarePhoneLink from "@/components/compliance/RouteAwarePhoneLink";
import RouteAwareSmsLink from "@/components/compliance/RouteAwareSmsLink";

export function MobileStickyContactBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-sm lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label="Quick contact"
    >
      <div className="grid grid-cols-2 divide-x divide-slate-200">
        <RouteAwarePhoneLink variant="sticky" />
        <RouteAwareSmsLink variant="sticky" />
      </div>
    </div>
  );
}
