"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ChatbotMessage from "./ChatbotMessage";
import {
  generateFollowUpQuestions,
  isUrgentQuery,
  buildUrgentCallCta,
} from "@/lib/chatbot-formatters";
import { PHONE_DISPLAY, PHONE_TEL } from "@/config/contact";

interface ChatMessage {
  id: string;
  type: "bot" | "user";
  content: string;
  timestamp: Date;
  sources?: Array<{ type: string; title: string; url?: string }>;
  feedback?: "positive" | "negative" | null;
  isStreaming?: boolean;
}

const LEGAL_DISCLAIMER =
  "This assistant provides general information only — not legal advice. We are NOT the police. We represent people in custody and at scheduled voluntary interviews only.";

const SUGGESTED_QUESTIONS = [
  "Someone I love is in custody now — can I instruct you?",
  "Is this for an interview happening today?",
  "Which Kent stations do you cover?",
  "What are PACE rights in custody?",
];

function parseSseBlock(block: string): { event: string; data: string } | null {
  const lines = block.trim().split("\n");
  let event = "message";
  let data = "";
  for (const line of lines) {
    if (line.startsWith("event: ")) event = line.slice(7).trim();
    if (line.startsWith("data: ")) data = line.slice(6);
  }
  return data ? { event, data } : null;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      content: "Hello! Ask about custody, voluntary interviews, or your rights in Kent.",
      timestamp: new Date(),
    },
  ]);
  const [showQuestions, setShowQuestions] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disclaimerSeen, setDisclaimerSeen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 100)}px`;
    }
  }, [inputValue]);

  const updateBotMessage = useCallback((id: string, patch: Partial<ChatMessage>) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  }, []);

  const streamWebsiteContent = useCallback(
    async (
      query: string,
      botId: string
    ): Promise<void> => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();

      const conversationHistory = messages
        .slice(-5)
        .filter((m) => m.type === "user" || (m.type === "bot" && m.content !== "..."))
        .map((m) => ({ type: m.type, content: m.content }));

      const response = await fetch("/api/chatbot/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, conversationHistory }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error("Stream request failed");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let content = "";
      let sources: ChatMessage["sources"] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const blocks = buffer.split("\n\n");
        buffer = blocks.pop() || "";

        for (const block of blocks) {
          const parsed = parseSseBlock(block);
          if (!parsed) continue;

          const payload = JSON.parse(parsed.data);

          if (parsed.event === "instant") {
            content = payload.answer || "";
            sources = payload.sources || [];
            updateBotMessage(botId, { content, sources, isStreaming: false });
          } else if (parsed.event === "token") {
            content += payload.content || "";
            updateBotMessage(botId, { content, isStreaming: true });
          } else if (parsed.event === "done") {
            sources = payload.sources || sources;
            updateBotMessage(botId, { content, sources, isStreaming: false });
          } else if (parsed.event === "error") {
            throw new Error(payload.message || "Stream error");
          }
        }
      }

      if (!content) {
        throw new Error("Empty response");
      }
    },
    [messages, updateBotMessage]
  );

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isSubmitting) return;

    const trimmedMessage = message.trim();
    setInputValue("");
    setShowQuestions(false);
    if (!disclaimerSeen) setDisclaimerSeen(true);

    const urgent = isUrgentQuery(trimmedMessage);

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: "user",
        content: trimmedMessage,
        timestamp: new Date(),
      },
    ]);

    setIsSubmitting(true);
    const botId = (Date.now() + 1).toString();

    setMessages((prev) => [
      ...prev,
      {
        id: botId,
        type: "bot",
        content: "...",
        timestamp: new Date(),
        isStreaming: true,
      },
    ]);

    try {
      await streamWebsiteContent(trimmedMessage, botId);

      if (urgent) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botId ? { ...m, content: m.content + buildUrgentCallCta() } : m
          )
        );
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "AbortError") {
        setMessages((prev) => prev.filter((m) => m.id !== botId));
        return;
      }

      try {
        const fallback = await fetch("/api/chatbot/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: trimmedMessage }),
        });
        if (fallback.ok) {
          const data = await fallback.json();
          updateBotMessage(botId, {
            content: data.answer || `Please call **${PHONE_DISPLAY}** for assistance.`,
            sources: data.sources,
            isStreaming: false,
          });
        } else {
          throw new Error("Fallback failed");
        }
      } catch {
        updateBotMessage(botId, {
          content: `Sorry, I encountered an error. Please call **[${PHONE_DISPLAY}](tel:${PHONE_TEL})** for assistance.`,
          isStreaming: false,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (inputValue.trim() && !isSubmitting) handleSendMessage(inputValue);
    }
  };

  const handleFeedback = (messageId: string, feedback: "positive" | "negative") => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, feedback } : msg)));
  };

  const closePanel = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const followUpQuestions =
    messages.length > 1 &&
    messages[messages.length - 1].type === "bot" &&
    messages[messages.length - 1].content !== "..." &&
    !messages[messages.length - 1].isStreaming
      ? generateFollowUpQuestions(messages[messages.length - 1].content, messages.slice(-5))
      : [];

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Open help assistant"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
          </svg>
        </button>
      )}

      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Help assistant"
          className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] w-[calc(100vw-1.5rem)] sm:w-[min(100vw-2rem,380px)] max-w-[380px] bg-white rounded-xl shadow-2xl border border-slate-200 flex flex-col transition-all duration-300 ${isMinimized ? "h-14" : "h-[min(70vh,520px)]"}`}
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-t-xl flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Help Assistant</h3>
                <p className="text-[11px] text-blue-100">Immediate custody &amp; booked interviews</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setIsMinimized(!isMinimized)} className="text-white hover:text-blue-200 p-1.5 rounded hover:bg-white/10" aria-label={isMinimized ? "Expand chat" : "Minimize chat"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  {isMinimized ? <path d="M5 12h14M12 5v14"></path> : <path d="M5 12h14"></path>}
                </svg>
              </button>
              <button onClick={closePanel} className="text-white hover:text-blue-200 p-1.5 rounded hover:bg-white/10" aria-label="Close chat">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="px-3 py-2 bg-amber-50 border-b border-amber-100 text-[11px] text-amber-900 leading-snug">
                {LEGAL_DISCLAIMER} For custody or a booked interview, call{" "}
                <a href={`tel:${PHONE_TEL}`} className="font-semibold underline">
                  {PHONE_DISPLAY}
                </a>
                .
              </div>

              <div
                className="flex-1 overflow-y-auto p-3 space-y-3 bg-gradient-to-b from-slate-50 to-white scroll-smooth"
                aria-live="polite"
                aria-relevant="additions text"
              >
                {messages.map((msg) => (
                  <ChatbotMessage
                    key={msg.id}
                    id={msg.id}
                    type={msg.type}
                    content={msg.content}
                    timestamp={msg.timestamp}
                    sources={msg.sources}
                    feedback={msg.feedback}
                    onFeedback={handleFeedback}
                    isStreaming={msg.isStreaming}
                  />
                ))}

                {followUpQuestions.length > 0 && !isSubmitting && (
                  <div className="space-y-1.5 pt-1">
                    <p className="text-xs text-slate-500 px-1">Follow-up:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {followUpQuestions.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(q)}
                          className="text-xs px-2 py-1 bg-white border border-slate-200 rounded-full hover:bg-blue-50 hover:border-blue-300 transition-all text-left"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {showQuestions && messages.length === 1 && (
                  <div className="space-y-1.5 pt-1">
                    <p className="text-xs text-slate-500 px-1">Suggested questions:</p>
                    <div className="flex flex-col gap-1.5">
                      {SUGGESTED_QUESTIONS.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(q)}
                          className="text-xs px-2.5 py-2 bg-white border border-slate-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all text-left"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="bg-white border-t border-slate-200 flex-shrink-0 p-3">
                <div className="flex gap-2 items-end">
                  <textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask about custody, interviews, or rights…"
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none max-h-[100px]"
                    rows={1}
                    disabled={isSubmitting}
                    aria-label="Your question"
                  />
                  <button
                    onClick={() => handleSendMessage(inputValue)}
                    disabled={!inputValue.trim() || isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white px-3 py-2 rounded-lg transition-all flex-shrink-0"
                    aria-label="Send message"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="m22 2-7 20-4-9-9-4Z"></path>
                      <path d="M22 2 11 13"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
