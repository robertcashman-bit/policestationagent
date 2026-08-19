"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const Chatbot = dynamic(() => import("./Chatbot"), {
  ssr: false,
  loading: () => null,
});

/**
 * Defers loading the chatbot bundle until the user actually engages with the
 * page (first scroll, pointer, touch or keyboard input) or explicitly opens the
 * chat. This avoids eagerly downloading the chatbot on page load, keeping it off
 * the critical path for LCP/TBT on every page.
 */
const ACTIVATION_EVENTS: Array<keyof WindowEventMap> = [
  "scroll",
  "pointerdown",
  "keydown",
  "touchstart",
];

export default function LazyChatbot() {
  const pathname = usePathname() || "/";
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");
  const isHome = pathname === "/" || pathname === "";
  const [loadChat, setLoadChat] = useState(false);
  const [homeReady, setHomeReady] = useState(!isHome);
  const [cookieBlocking, setCookieBlocking] = useState(() => {
    if (typeof document === "undefined") return false;
    return document.body.classList.contains("cookie-bar-visible");
  });

  const activate = useCallback(() => {
    setLoadChat(true);
  }, []);

  useEffect(() => {
    if (!isHome) {
      setHomeReady(true);
      return;
    }
    /* Keep the homepage first screen clear of the chat FAB until the visitor scrolls. */
    setHomeReady(false);
    const onScroll = () => {
      if (window.scrollY > 120) setHomeReady(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    /* Never let Chat sit on top of the cookie Accept control. */
    const syncCookieGate = () => {
      const accepted =
        typeof localStorage !== "undefined" && localStorage.getItem("cookies-accepted") === "true";
      setCookieBlocking(!accepted || document.body.classList.contains("cookie-bar-visible"));
    };
    syncCookieGate();
    const observer = new MutationObserver(syncCookieGate);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("storage", syncCookieGate);
    return () => {
      observer.disconnect();
      window.removeEventListener("storage", syncCookieGate);
    };
  }, []);

  useEffect(() => {
    if (isAdmin || loadChat || !homeReady || cookieBlocking) return;

    const onInteraction = () => setLoadChat(true);
    const options: AddEventListenerOptions = { passive: true, once: true };

    for (const eventName of ACTIVATION_EVENTS) {
      window.addEventListener(eventName, onInteraction, options);
    }

    return () => {
      for (const eventName of ACTIVATION_EVENTS) {
        window.removeEventListener(eventName, onInteraction);
      }
    };
  }, [loadChat, isAdmin, homeReady, cookieBlocking]);

  if (isAdmin) return null;
  if (!homeReady || cookieBlocking) return null;

  if (loadChat) {
    return <Chatbot />;
  }

  return (
    <button
      type="button"
      onClick={activate}
      className="fixed bottom-6 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-blue-700 text-white shadow-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:bottom-6 sm:right-6"
      aria-label="Open chat assistant"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      </svg>
    </button>
  );
}
