"use client";

import { useEffect } from "react";
import { WHATSAPP_TEXT_ONLY_NOTE } from "@/config/contact";

/**
 * Legacy HTML pages embed wa.me / vague WhatsApp labels. This patches links at runtime
 * so users see text-only guidance without editing every static HTML blob.
 */
export default function ContactLinkGuard() {
  useEffect(() => {
    const patch = () => {
      document.querySelectorAll<HTMLAnchorElement>('a[href*="wa.me"]').forEach((a) => {
        a.setAttribute("title", WHATSAPP_TEXT_ONLY_NOTE);
        a.setAttribute("aria-label", `${a.textContent?.trim() || "WhatsApp"} — ${WHATSAPP_TEXT_ONLY_NOTE}`);
        if (!/text message/i.test(a.textContent || "")) {
          const label = a.textContent?.trim();
          if (label && /whatsapp/i.test(label) && !/text/i.test(label)) {
            a.textContent = label.replace(/WhatsApp/i, "WhatsApp text message");
          }
        }
      });
    };

    patch();
    const observer = new MutationObserver(patch);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
