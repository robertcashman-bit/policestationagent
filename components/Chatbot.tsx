'use client';

/**
 * IMPROVED CHATBOT ASSISTANT COMPONENT
 * 
 * Features:
 * - Toggle between quick options and text input
 * - Legal disclaimer in collapsible footer
 * - Enhanced UX with avatars, animations, and suggested questions
 * - Mobile-responsive design
 * - Accessibility improvements
 * - Better visual hierarchy
 */

import { useState, useEffect, useRef } from 'react';

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  sources?: Array<{ type: string; title: string; url?: string }>;
}

// Legal disclaimer text
const LEGAL_DISCLAIMER = 'This chatbot provides general information only and does not constitute legal advice. For specific legal advice regarding your situation, please contact us directly on 01732 247427. Information provided is based on our website content and may not apply to your specific circumstances.';

// Suggested questions
const SUGGESTED_QUESTIONS = [
  'What is a voluntary police interview?',
  'How much does police station representation cost?',
  'Which police stations do you cover?',
  'What are my rights if I\'m arrested?'
];

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
  const [viewMode, setViewMode] = useState<'options' | 'input'>('options');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disclaimerExpanded, setDisclaimerExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus textarea when switching to input mode
  useEffect(() => {
    if (isOpen && !isMinimized && viewMode === 'input' && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized, viewMode]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

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
    
    return 'I apologize, but I encountered an error. Please call us on 01732 247427 for immediate assistance or visit our FAQ page at /faq.';
  };

  const handleQuickOption = async (option: string) => {
    setViewMode('input');
    
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

    const trimmedMessage = message.trim();
    setInputValue('');
    setViewMode('input');

    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: trimmedMessage,
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
    const response = await searchWebsiteContent(trimmedMessage);
    
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

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputValue.trim() && !isSubmitting) {
        handleSendMessage(inputValue);
      }
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      // Could add a toast notification here
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  const resetChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
    setViewMode('options');
    setMessages([{
      id: '1',
      type: 'bot',
      content: 'Hello! I can help answer questions about police station representation, your rights, and our services. How can I assist you today?',
      timestamp: new Date(),
    }]);
    setInputValue('');
    setDisclaimerExpanded(false);
  };

  return (
    <>
      {/* Chat Button - Fixed bottom right, mobile responsive */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 animate-pulse"
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
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <h3 className="font-semibold text-sm sm:text-base truncate">How Can We Help You?</h3>
                </div>
                <p className="text-xs text-blue-100 mt-0.5">Available during extended hours</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <a
                href="tel:01732247427"
                className="text-white hover:text-blue-200 transition-colors p-1.5 rounded hover:bg-white/10"
                aria-label="Call 01732 247427"
                title="Call us"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </a>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:text-blue-200 transition-colors p-1.5 rounded hover:bg-white/10"
                aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {isMinimized ? (
                    <path d="M5 12h14M12 5v14"></path>
                  ) : (
                    <path d="M5 12h14"></path>
                  )}
                </svg>
              </button>
              <button
                onClick={resetChat}
                className="text-white hover:text-blue-200 transition-colors p-1.5 rounded hover:bg-white/10"
                aria-label="Close chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 bg-slate-50 scroll-smooth">
                {messages.map((msg, index) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2 sm:gap-3 transition-opacity duration-300 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.type === 'bot' && (
                      <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                    )}
                    <div className={`flex flex-col gap-1 max-w-[85%] sm:max-w-[75%] ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                      <div
                        className={`rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base shadow-sm transition-all hover:shadow-md ${
                          msg.type === 'user'
                            ? 'bg-blue-600 text-white rounded-br-sm'
                            : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm'
                        }`}
                      >
                        {msg.content === '...' ? (
                          <div className="flex gap-1.5">
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        ) : (
                          <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                        )}
                      </div>
                      {msg.type === 'bot' && msg.content !== '...' && (
                        <div className="flex items-center gap-2 text-xs text-slate-500 px-1">
                          <span>{formatTime(msg.timestamp)}</span>
                          <button
                            onClick={() => copyMessage(msg.content)}
                            className="hover:text-blue-600 transition-colors"
                            aria-label="Copy message"
                            title="Copy message"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                              <path d="M4 16c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2"></path>
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                    {msg.type === 'user' && (
                      <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-slate-400 to-slate-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Suggested Questions - Show after first bot message and when in input mode */}
                {messages.length > 1 && viewMode === 'input' && !isSubmitting && messages[messages.length - 1].type === 'bot' && messages[messages.length - 1].content !== '...' && (
                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-medium text-slate-500 px-1">Suggested questions:</p>
                    <div className="flex flex-wrap gap-2">
                      {SUGGESTED_QUESTIONS.slice(0, 2).map((question, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestedQuestion(question)}
                          className="text-xs sm:text-sm px-3 py-1.5 bg-white border border-slate-200 rounded-full hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all text-left"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="bg-white border-t border-slate-200 flex-shrink-0">
                {/* Toggle between Options and Input */}
                <div className="flex border-b border-slate-200">
                  <button
                    onClick={() => setViewMode('options')}
                    className={`flex-1 px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${
                      viewMode === 'options'
                        ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    Quick Options
                  </button>
                  <button
                    onClick={() => {
                      setViewMode('input');
                      setTimeout(() => textareaRef.current?.focus(), 100);
                    }}
                    className={`flex-1 px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${
                      viewMode === 'input'
                        ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    Type Question
                  </button>
                </div>

                {/* Quick Options View */}
                {viewMode === 'options' && !isSubmitting && (
                  <div className="p-3 sm:p-4">
                    <p className="text-xs font-semibold text-slate-600 mb-3 uppercase tracking-wide">Please select the option that best describes what you need:</p>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleQuickOption('police-station')}
                        className="w-full text-left bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-3 sm:px-5 sm:py-4 rounded-lg transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
                      >
                        <div className="font-semibold flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                          </svg>
                          I Need Police Station Representation
                        </div>
                        <div className="text-xs sm:text-sm opacity-90 mt-1.5">I'm in custody, arrested, or have an upcoming police interview</div>
                      </button>
                      <button
                        onClick={() => handleQuickOption('law-firm')}
                        className="w-full text-left bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 sm:px-5 sm:py-4 rounded-lg transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
                      >
                        <div className="font-semibold flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                          I'm a Criminal Law Firm
                        </div>
                        <div className="text-xs sm:text-sm opacity-90 mt-1.5">I need police station agent cover for my clients</div>
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 text-center mt-3">
                      For all other enquiries, use <a href="/faq" className="text-blue-600 hover:underline font-medium">FAQ</a> or call 01732 247427
                    </p>
                  </div>
                )}

                {/* Input View */}
                {viewMode === 'input' && (
                  <div className="p-3 sm:p-4">
                    <div className="flex gap-2 items-end">
                      <div className="flex-1 relative">
                        <textarea
                          ref={textareaRef}
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={handleKeyPress}
                          placeholder="Type your question here... (Press Enter to send, Shift+Enter for new line)"
                          className="w-full px-4 py-2.5 sm:py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none max-h-[120px]"
                          rows={1}
                          disabled={isSubmitting}
                          style={{ minHeight: '44px' }}
                        />
                        {inputValue.length > 0 && (
                          <button
                            onClick={() => setInputValue('')}
                            className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 transition-colors"
                            aria-label="Clear input"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"></circle>
                              <path d="m15 9-6 6m0-6 6 6"></path>
                            </svg>
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => handleSendMessage(inputValue)}
                        disabled={!inputValue.trim() || isSubmitting}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg transition-all shadow-md hover:shadow-lg disabled:shadow-none flex-shrink-0"
                        aria-label="Send message"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m22 2-7 20-4-9-9-4Z"></path>
                          <path d="M22 2 11 13"></path>
                        </svg>
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 text-center">
                      Press <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-xs">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-xs">Shift+Enter</kbd> for new line
                    </p>
                  </div>
                )}
              </div>

              {/* Legal Disclaimer Footer - Collapsible */}
              <div className="bg-slate-50 border-t border-slate-200 flex-shrink-0">
                <button
                  onClick={() => setDisclaimerExpanded(!disclaimerExpanded)}
                  className="w-full px-3 sm:px-4 py-2 flex items-center justify-between text-xs text-slate-600 hover:bg-slate-100 transition-colors"
                  aria-expanded={disclaimerExpanded}
                >
                  <span className="font-medium flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                      <path d="M12 9v4"></path>
                      <path d="M12 17h.01"></path>
                    </svg>
                    Legal Disclaimer
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform ${disclaimerExpanded ? 'rotate-180' : ''}`}
                  >
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </button>
                {disclaimerExpanded && (
                  <div className="px-3 sm:px-4 pb-3 text-xs text-slate-700 leading-relaxed transition-all duration-200">
                    <p className="font-semibold mb-1.5 text-amber-700">Legal Disclaimer:</p>
                    <p>{LEGAL_DISCLAIMER}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
