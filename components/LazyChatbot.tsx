"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

const Chatbot = dynamic(() => import("./Chatbot"), {
  ssr: false,
  loading: () => null,
});

/**
 * Defers loading the chatbot bundle until the user interacts or the browser is idle.
 */
export default function LazyChatbot() {
  const [loadChat, setLoadChat] = useState(false);

  const activate = useCallback(() => {
    setLoadChat(true);
  }, []);

  useEffect(() => {
    if (loadChat) return;
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => setLoadChat(true), { timeout: 8000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = window.setTimeout(() => setLoadChat(true), 8000);
    return () => window.clearTimeout(t);
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
