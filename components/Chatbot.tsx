'use client';

/**
 * OPTIMIZED CHATBOT ASSISTANT COMPONENT
 * 
 * Performance optimizations:
 * - Lazy loaded (only renders when opened)
 * - Uses website content (FAQ, blogs, pages) via API
 * - Legal disclaimer included
 * - Mobile-responsive design
 * - Non-blocking, doesn't slow down site
 */

import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  sources?: Array<{ type: string; title: string; url?: string }>;
}

// Legal disclaimer text
const LEGAL_DISCLAIMER = 'This chatbot provides general information only and does not constitute legal advice. For specific legal advice regarding your situation, please contact us directly on 01732 247427. Information provided is based on our website content and may not apply to your specific circumstances.';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I can help answer questions about police station representation, your rights, and our services. How can I assist you today?',
      timestamp: new Date(),
    },
  ]);
  const [showOptions, setShowOptions] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  // Search website content via API
  const searchWebsiteContent = async (query: string): Promise<string> => {
    try {
      const response = await fetch('/api/chatbot/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.answer || 'I couldn\'t find specific information about that. Please call us on 01732 247427 for immediate assistance.';
      }
    } catch (error) {
      console.error('Error searching content:', error);
    }
    
    // Fallback response
    return 'I apologize, but I encountered an error. Please call us on 01732 247427 for immediate assistance or visit our FAQ page at /faq.';
  };

  const handleQuickOption = async (option: string) => {
    setShowOptions(false);
    setShowDisclaimer(false);
    
    let userMessage = '';
    let botResponse = '';
    let emailSubject = '';
    let emailBody = '';

    if (option === 'police-station') {
      userMessage = 'I Need Police Station Representation - I\'m in custody, arrested, or have an upcoming police interview';
      botResponse = 'Thank you for contacting us. We understand this is urgent. Please complete our contact form at /contact to provide essential details, or call 01732 247427 immediately for immediate assistance. We are available during extended hours to provide expert legal representation at any Kent police station. Legal advice is free under Legal Aid.';
      emailSubject = 'New Enquiry: Police Station Representation Request';
      emailBody = `A visitor has requested police station representation.\n\nDetails:\n- Service: Police Station Representation\n- Status: In custody, arrested, or has upcoming police interview\n- Urgency: High\n\nPlease contact them as soon as possible.\n\nContact: 01732 247427\n\nThis is an automated notification from the website chatbot.\n\nUser should complete contact form at /contact for full details.`;
      
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: (Date.now() + 3).toString(),
          type: 'bot',
          content: 'To request representation, please visit /contact to complete our contact form. This helps us gather essential details like which police station, date/time, and your contact information. Or call 01732 247427 now for immediate help.',
          timestamp: new Date(),
        }]);
      }, 1500);
    } else if (option === 'law-firm') {
      userMessage = 'I\'m a Criminal Law Firm - I need police station agent cover for my clients';
      botResponse = 'Thank you for your interest in our agent cover services. We provide reliable police station representation for law firms across the country. Please complete our contact form at /contact or call 01732 247427 to discuss your requirements and competitive rates.';
      emailSubject = 'New Enquiry: Law Firm Agent Cover Request';
      emailBody = `A criminal law firm has requested agent cover services.\n\nDetails:\n- Service: Agent Cover for Law Firms\n- Type: Criminal Law Firm\n- Need: Police station agent cover for clients\n\nPlease contact them to discuss requirements and rates.\n\nContact: 01732 247427\n\nThis is an automated notification from the website chatbot.\n\nUser should complete contact form at /contact for full details.`;
    }

    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'user',
      content: userMessage,
      timestamp: new Date(),
    }]);

    // Add bot response
    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: botResponse,
      timestamp: new Date(),
    }]);

    // Send email
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/chatbot/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: emailSubject,
          body: emailBody,
          option: option,
        }),
      });

      if (response.ok) {
        setMessages(prev => [...prev, {
          id: (Date.now() + 2).toString(),
          type: 'bot',
          content: 'Your enquiry has been sent successfully. We will contact you shortly.',
          timestamp: new Date(),
        }]);
      } else {
        setMessages(prev => [...prev, {
          id: (Date.now() + 2).toString(),
          type: 'bot',
          content: 'Thank you for your enquiry. Please also call us on 01732 247427 for immediate assistance.',
          timestamp: new Date(),
        }]);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 2).toString(),
        type: 'bot',
        content: 'Thank you for your enquiry. Please call us on 01732 247427 for immediate assistance.',
        timestamp: new Date(),
      }]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isSubmitting) return;

    setShowDisclaimer(false);

    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);

    // Show typing indicator
    setIsSubmitting(true);
    const typingMsg: ChatMessage = {
      id: (Date.now() + 0.5).toString(),
      type: 'bot',
      content: '...',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, typingMsg]);

    // Search website content
    const response = await searchWebsiteContent(message);
    
    // Remove typing indicator and add response
    setMessages(prev => {
      const filtered = prev.filter(m => m.id !== typingMsg.id);
      return [...filtered, {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response,
        timestamp: new Date(),
      }];
    });

    setIsSubmitting(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      handleSendMessage(e.currentTarget.value);
      e.currentTarget.value = '';
    }
  };

  return (
    <>
      {/* Chat Button - Fixed bottom right, mobile responsive */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Open chat assistant"
          title="Chat with our assistant"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle h-6 w-6 sm:h-8 sm:w-8" aria-hidden="true">
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
          </svg>
        </button>
      )}

      {/* Chat Window - Mobile responsive */}
      {isOpen && (
        <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] w-[calc(100vw-2rem)] sm:w-96 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-2xl border border-slate-200 flex flex-col transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[calc(100vh-8rem)] sm:h-[600px] max-h-[calc(100vh-8rem)] sm:max-h-[600px]'}`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 sm:p-4 rounded-t-lg flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <h3 className="font-semibold text-sm sm:text-base">How Can We Help You?</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:text-blue-200 transition-colors p-1"
                aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {isMinimized ? (
                    <path d="M5 12h14M12 5v14"></path>
                  ) : (
                    <path d="M5 12h14"></path>
                  )}
                </svg>
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsMinimized(false);
                  setShowOptions(true);
                  setShowDisclaimer(true);
                  setMessages([{
                    id: '1',
                    type: 'bot',
                    content: 'Hello! I can help answer questions about police station representation, your rights, and our services. How can I assist you today?',
                    timestamp: new Date(),
                  }]);
                }}
                className="text-white hover:text-blue-200 transition-colors p-1"
                aria-label="Close chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Legal Disclaimer */}
              {showDisclaimer && (
                <div className="bg-amber-50 border-l-4 border-amber-400 p-3 text-xs text-amber-800 flex-shrink-0">
                  <p className="font-semibold mb-1">Legal Disclaimer:</p>
                  <p>{LEGAL_DISCLAIMER}</p>
                  <button
                    onClick={() => setShowDisclaimer(false)}
                    className="mt-2 text-amber-700 hover:text-amber-900 underline text-xs"
                  >
                    I understand
                  </button>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-slate-50">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[80%] rounded-lg px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm ${
                        msg.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-slate-800 border border-slate-200'
                      }`}
                    >
                      {msg.content === '...' ? (
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Options */}
              {showOptions && !isSubmitting && (
                <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex-shrink-0">
                  <p className="text-xs font-semibold text-slate-600 mb-3 uppercase tracking-wide">Please select the option that best describes what you need:</p>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleQuickOption('police-station')}
                      className="w-full text-left bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
                    >
                      <div className="font-semibold">I Need Police Station Representation</div>
                      <div className="text-xs sm:text-sm opacity-90 mt-1">I'm in custody, arrested, or have an upcoming police interview</div>
                    </button>
                    <button
                      onClick={() => handleQuickOption('law-firm')}
                      className="w-full text-left bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
                    >
                      <div className="font-semibold">I'm a Criminal Law Firm</div>
                      <div className="text-xs sm:text-sm opacity-90 mt-1">I need police station agent cover for my clients</div>
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 text-center mt-3">
                    For all other enquiries, please use our <a href="/faq" className="text-blue-600 hover:underline">FAQ page</a> or call 01732 247427
                  </p>
                </div>
              )}

              {/* Input */}
              {!showOptions && (
                <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex-shrink-0">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Type your question..."
                      className="flex-1 px-3 py-2 sm:px-4 sm:py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      onKeyPress={handleKeyPress}
                      disabled={isSubmitting}
                    />
                    <button
                      onClick={() => {
                        if (inputRef.current?.value.trim()) {
                          handleSendMessage(inputRef.current.value);
                          inputRef.current.value = '';
                        }
                      }}
                      disabled={isSubmitting}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                      aria-label="Send message"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m22 2-7 20-4-9-9-4Z"></path>
                        <path d="M22 2 11 13"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
