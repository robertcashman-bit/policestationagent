"use client";

import { useEffect } from "react";

/**
 * Legacy HTML pages may still embed wa.me links.
 * Rewrite them to Contact pathways — never inject firm tel/sms digits into the DOM.
 */
export default function ContactLinkGuard() {
  useEffect(() => {
    const patch = () => {
      document.querySelectorAll<HTMLAnchorElement>('a[href*="wa.me"]').forEach((a) => {
        a.href = "/contact";
        a.removeAttribute("target");
        a.removeAttribute("rel");
        a.setAttribute("title", "Contact pathways — telephone and SMS are not published as digits");
        a.setAttribute("aria-label", "Contact pathways");
        const label = a.textContent?.trim() || "";
        if (/whatsapp|call|telephone|text|sms|01732|07535/i.test(label) || !label) {
          a.textContent = "Contact pathways";
        }
        a.classList.remove(
          "bg-green-600",
          "bg-green-500",
          "hover:bg-green-700",
          "hover:bg-green-600",
        );
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
