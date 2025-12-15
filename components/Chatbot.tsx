'use client';

/**
 * CHATBOT ASSISTANT COMPONENT
 * 
 * Lightweight, non-blocking chatbot positioned on the right side of the page.
 * Answers common queries and sends emails when users select specific options.
 * 
 * Performance optimizations:
 * - Lazy loaded (only renders when opened)
 * - Minimal JavaScript bundle
 * - No external dependencies
 * - Fixed positioning doesn't affect layout
 * - Uses dynamic import for code splitting
 */

import { useState, useEffect, useRef } from 'react';

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m here to help. How can I assist you today?',
      timestamp: new Date(),
    },
  ]);
  const [showOptions, setShowOptions] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  // Common queries and responses
  const commonQueries: Record<string, string> = {
    'free': 'Yes! Legal advice at the police station is completely FREE under Legal Aid. This is a statutory right under PACE 1984 and is not means-tested. Everyone arrested or invited for a voluntary interview is entitled to free legal representation.',
    'cost': 'Legal advice at the police station is FREE under Legal Aid. There is no charge and it is not means-tested. This applies to both custody interviews and voluntary interviews.',
    'available': 'We are available 24 hours a day, 7 days a week, including weekends and bank holidays. Simply call 01732 247427 and we will arrange for a representative to attend the police station.',
    'kent': 'We cover all police stations and custody suites across Kent, including: Medway, Maidstone, Gravesend, Canterbury, Tonbridge, Folkestone, Ashford, Sittingbourne, Margate, Dover, Sevenoaks, and all other Kent custody facilities.',
    'time': 'We aim to attend any Kent police station within 45 minutes. Our representatives are on call 24/7 to provide rapid response.',
    'voluntary': 'Yes, we provide free representation for voluntary police interviews across Kent. If you have been asked to attend a voluntary interview, it is crucial to have legal representation. Never attend without a solicitor.',
    'arrested': 'If you have been arrested, you will be taken to a custody suite. It is vital you ask for a solicitor immediately. Call us on 01732 247427 and we will arrange urgent attendance to protect your rights.',
    'help': 'I can help you with information about our services. For urgent police station representation, please call 01732 247427 immediately. For general enquiries, you can also email robertcashman@defencelegalservices.co.uk',
  };

  const handleQuickOption = async (option: string) => {
    setShowOptions(false);
    
    let userMessage = '';
    let botResponse = '';
    let emailSubject = '';
    let emailBody = '';

    if (option === 'police-station') {
      userMessage = 'I Need Police Station Representation - I\'m in custody, arrested, or have an upcoming police interview';
      botResponse = 'Thank you for contacting us. We understand this is urgent. Our team will contact you shortly. In the meantime, please call 01732 247427 for immediate assistance. We are available 24/7 to provide expert legal representation at any Kent police station.';
      emailSubject = 'New Enquiry: Police Station Representation Request';
      emailBody = `A visitor has requested police station representation.\n\nDetails:\n- Service: Police Station Representation\n- Status: In custody, arrested, or has upcoming police interview\n- Urgency: High\n\nPlease contact them as soon as possible.\n\nContact: 01732 247427\n\nThis is an automated notification from the website chatbot.`;
    } else if (option === 'law-firm') {
      userMessage = 'I\'m a Criminal Law Firm - I need police station agent cover for my clients';
      botResponse = 'Thank you for your interest in our agent cover services. We provide reliable police station representation for law firms across the country. Our team will contact you shortly to discuss your requirements and provide competitive rates.';
      emailSubject = 'New Enquiry: Law Firm Agent Cover Request';
      emailBody = `A criminal law firm has requested agent cover services.\n\nDetails:\n- Service: Agent Cover for Law Firms\n- Type: Criminal Law Firm\n- Need: Police station agent cover for clients\n\nPlease contact them to discuss requirements and rates.\n\nContact: 01732 247427\n\nThis is an automated notification from the website chatbot.`;
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

    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);

    // Check for common queries
    const lowerMessage = message.toLowerCase();
    let response = '';

    for (const [key, value] of Object.entries(commonQueries)) {
      if (lowerMessage.includes(key)) {
        response = value;
        break;
      }
    }

    // Default response if no match
    if (!response) {
      response = 'Thank you for your question. For specific assistance, please call us on 01732 247427 or email robertcashman@defencelegalservices.co.uk. We are available 24/7 for urgent police station representation.';
    }

    // Add bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response,
        timestamp: new Date(),
      }]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      handleSendMessage(e.currentTarget.value);
      e.currentTarget.value = '';
    }
  };

  return (
    <>
      {/* Chat Button - Fixed bottom right */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Open chat assistant"
          title="Chat with our assistant"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle h-8 w-8" aria-hidden="true">
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-2xl border border-slate-200 flex flex-col transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[600px] max-h-[calc(100vh-8rem)]'}`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <h3 className="font-semibold">How Can We Help You?</h3>
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
                  setMessages([{
                    id: '1',
                    type: 'bot',
                    content: 'Hello! I\'m here to help. How can I assist you today?',
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
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        msg.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-slate-800 border border-slate-200'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {isSubmitting && (
                  <div className="flex justify-start">
                    <div className="bg-white text-slate-800 border border-slate-200 rounded-lg px-4 py-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Options */}
              {showOptions && !isSubmitting && (
                <div className="p-4 bg-white border-t border-slate-200">
                  <p className="text-xs font-semibold text-slate-600 mb-3 uppercase tracking-wide">Please select the option that best describes what you need:</p>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleQuickOption('police-station')}
                      className="w-full text-left bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-3 rounded-lg transition-colors"
                    >
                      <div className="font-semibold text-base">I Need Police Station Representation</div>
                      <div className="text-sm opacity-90 mt-1">I'm in custody, arrested, or have an upcoming police interview</div>
                    </button>
                    <button
                      onClick={() => handleQuickOption('law-firm')}
                      className="w-full text-left bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded-lg transition-colors"
                    >
                      <div className="font-semibold text-base">I'm a Criminal Law Firm</div>
                      <div className="text-sm opacity-90 mt-1">I need police station agent cover for my clients</div>
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 text-center mt-3">
                    For all other enquiries, please use our <a href="/faq" className="text-blue-600 hover:underline">FAQ page</a> or call 01732 247427
                  </p>
                </div>
              )}

              {/* Input */}
              {!showOptions && (
                <div className="p-4 bg-white border-t border-slate-200">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Type your question..."
                      className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Send message"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
