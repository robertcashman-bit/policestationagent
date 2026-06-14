"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function ConversionEventListener() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement | null)?.closest("[data-event]");
      if (!target) return;
      const name = target.getAttribute("data-event");
      if (!name) return;
      const placement =
        target.getAttribute("data-event-placement") ||
        window.location.pathname ||
        "unknown";
      trackEvent(name, { placement });
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
