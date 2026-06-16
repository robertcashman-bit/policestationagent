"use client";

import dynamic from "next/dynamic";
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
  const [loadChat, setLoadChat] = useState(false);

  const activate = useCallback(() => {
    setLoadChat(true);
  }, []);

  useEffect(() => {
    if (loadChat) return;

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
  }, [loadChat]);

  if (loadChat) {
    return <Chatbot />;
  }

  return (
    <button
      type="button"
      onClick={activate}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-blue-700 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
      Chat
    </button>
  );
}
