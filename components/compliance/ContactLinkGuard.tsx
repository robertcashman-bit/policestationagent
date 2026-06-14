"use client";

import { useEffect } from "react";
import { PHONE_TEL, SMS_DISPLAY, SMS_TEL } from "@/config/contact";

/**
 * Legacy HTML pages embed wa.me links. Replace with SMS/call so CTAs stay readable
 * without editing every static HTML blob.
 */
export default function ContactLinkGuard() {
  useEffect(() => {
    const patch = () => {
      document.querySelectorAll<HTMLAnchorElement>('a[href*="wa.me"]').forEach((a) => {
        const label = a.textContent?.trim() || "";
        if (/call|telephone|01732/i.test(label)) {
          a.href = `tel:${PHONE_TEL}`;
          return;
        }
        a.href = `sms:${SMS_TEL}`;
        a.setAttribute("title", `Text ${SMS_DISPLAY} if unable to call`);
        a.setAttribute("aria-label", `Text ${SMS_DISPLAY} if unable to call`);
        if (/whatsapp/i.test(label)) {
          a.textContent = `Text ${SMS_DISPLAY}`;
        }
        a.classList.remove("bg-green-600", "bg-green-500", "hover:bg-green-700", "hover:bg-green-600");
        a.classList.add("bg-red-600", "hover:bg-red-700", "text-white");
      });
    };

    patch();
    const observer = new MutationObserver(patch);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
