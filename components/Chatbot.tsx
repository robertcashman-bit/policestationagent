'use client';

/**
 * COMPACT CHATBOT ASSISTANT COMPONENT
 * Size-optimized version with improved answer quality
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import ChatbotMessage from './ChatbotMessage';
import { generateFollowUpQuestions, isUrgentQuery, stripHTML } from '@/lib/chatbot-formatters';

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  sources?: Array<{ type: string; title: string; url?: string }>;
  feedback?: 'positive' | 'negative' | null;
}

const LEGAL_DISCLAIMER = 'This chatbot provides general information only and does not constitute legal advice. For specific legal advice, please contact us directly on 01732 247427.';

const SUGGESTED_QUESTIONS = [
  'What is a voluntary police interview?',
  'Is legal advice free at police stations?',
  'Which police stations do you cover?',
  'What are my rights if arrested?',
  'How quickly can you attend?',
  'What happens during a police interview?'
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [showQuestions, setShowQuestions] = useState(true);
  const [viewMode, setViewMode] = useState<'options' | 'input'>('input');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disclaimerExpanded, setDisclaimerExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && viewMode === 'input' && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized, viewMode]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 80)}px`;
    }
  }, [inputValue]);

  const searchWebsiteContent = useCallback(async (query: string): Promise<{ answer: string; sources?: Array<{ type: string; title: string; url?: string }> }> => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    
    try {
      const conversationHistory = messages
        .slice(-5)
        .filter(m => m.type === 'user' || (m.type === 'bot' && m.content !== '...'))
        .map(m => ({ type: m.type, content: m.content }));

      const response = await fetch('/api/chatbot/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, conversationHistory }),
        signal: abortControllerRef.current.signal,
      });

      if (response.ok) {
        const data = await response.json();
        return {
          answer: data.answer || 'Please call us on 01732 247427 for assistance.',
          sources: data.sources || []
        };
      } else {
        throw new Error('API request failed');
      }
    } catch (error: any) {
      if (error.name === 'AbortError') throw error;
      throw error;
    }
  }, [messages]);

  const handleQuickOption = async (option: string) => {
    setViewMode('input');
    
    let userMessage = '';
    let botResponse = '';

    if (option === 'police-station') {
      userMessage = 'I need police station representation';
      botResponse = '**Please call 01732 247427 immediately** for police station representation. We provide FREE legal advice under Legal Aid at all Kent police stations. If you are at a police station, tell the custody officer you want Robert Cashman from Tuckers Solicitors.';
    } else if (option === 'law-firm') {
      userMessage = 'I\'m a law firm needing agent cover';
      botResponse = 'We provide reliable police station agent cover for law firms. Please call 01732 247427 or visit our [contact page](/contact) to discuss requirements and rates.';
    }

    setMessages(prev => [...prev, 
      { id: Date.now().toString(), type: 'user', content: userMessage, timestamp: new Date() },
      { id: (Date.now() + 1).toString(), type: 'bot', content: botResponse, timestamp: new Date() }
    ]);
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isSubmitting) return;

    const trimmedMessage = message.trim();
    setInputValue('');
    setViewMode('input');
    setShowQuestions(false); // Hide questions after first message

    if (isUrgentQuery(trimmedMessage)) {
      // Just track it, don't show escalation box
    }

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: trimmedMessage,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);

    setIsSubmitting(true);
    const typingMsg: ChatMessage = {
      id: (Date.now() + 0.5).toString(),
      type: 'bot',
      content: '...',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, typingMsg]);

    try {
      const result = await searchWebsiteContent(trimmedMessage);
      
      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== typingMsg.id);
        return [...filtered, {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: result.answer,
          timestamp: new Date(),
          sources: result.sources,
        }];
      });
    } catch (error: any) {
      if (error.name === 'AbortError') {
        setMessages(prev => prev.filter(m => m.id !== typingMsg.id));
        return;
      }
      
      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== typingMsg.id);
        return [...filtered, {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: 'Sorry, I encountered an error. Please call **01732 247427** for assistance.',
          timestamp: new Date(),
        }];
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputValue.trim() && !isSubmitting) {
        handleSendMessage(inputValue);
      }
    }
  };

  const handleFeedback = (messageId: string, feedback: 'positive' | 'negative') => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, feedback } : msg
    ));
  };

  const resetChat = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsOpen(false);
    setIsMinimized(false);
    setViewMode('input');
    setMessages([{
      id: '1',
      type: 'bot',
      content: 'Hello! How can I help you today?',
      timestamp: new Date(),
    }]);
    setInputValue('');
    setDisclaimerExpanded(false);
    setShowQuestions(true);
  };

  const followUpQuestions = messages.length > 1 && messages[messages.length - 1].type === 'bot' && messages[messages.length - 1].content !== '...'
    ? generateFollowUpQuestions(messages[messages.length - 1].content, messages.slice(-5))
    : [];

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Open chat assistant"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
          </svg>
        </button>
      )}

      {/* Chat Window - WIDER */}
      {isOpen && (
        <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] w-[calc(100vw-2rem)] sm:w-[280px] max-w-[280px] bg-white rounded-xl shadow-2xl border border-slate-200 flex flex-col transition-all duration-300 ${isMinimized ? 'h-14' : 'h-[333px] sm:h-[367px]'}`}>
          {/* Header - ULTRA COMPACT */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-2 rounded-t-xl flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  <h3 className="font-semibold text-xs truncate">Help</h3>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-0.5">
              <button onClick={() => setIsMinimized(!isMinimized)} className="text-white hover:text-blue-200 p-1 rounded hover:bg-white/10" aria-label={isMinimized ? 'Expand' : 'Minimize'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {isMinimized ? <path d="M5 12h14M12 5v14"></path> : <path d="M5 12h14"></path>}
                </svg>
              </button>
              <button onClick={resetChat} className="text-white hover:text-blue-200 p-1 rounded hover:bg-white/10" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages - ULTRA COMPACT */}
              <div className="flex-1 overflow-y-auto p-2 space-y-2 bg-gradient-to-b from-slate-50 to-white scroll-smooth">
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
                  />
                ))}
                
                {showHumanEscalation && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-2">
                    <p className="text-[10px] font-medium text-amber-900 mb-1">Need help?</p>
                    <a href="tel:01732247427" className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-semibold rounded transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      Call
                    </a>
                  </div>
                )}
                
                {followUpQuestions.length > 0 && viewMode === 'input' && !isSubmitting && (
                  <div className="space-y-1 pt-1">
                    <p className="text-[10px] text-slate-500 px-1">Ask:</p>
                    <div className="flex flex-wrap gap-1">
                      {followUpQuestions.map((q, idx) => (
                        <button key={idx} onClick={() => handleSendMessage(q)} className="text-[9px] px-1.5 py-0.5 bg-white border border-slate-200 rounded-full hover:bg-blue-50 hover:border-blue-300 transition-all">
                          {q.length > 25 ? q.substring(0, 25) + '...' : q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Quick Question Buttons */}
                {showQuestions && messages.length === 1 && (
                  <div className="space-y-1 pt-1">
                    <p className="text-[10px] text-slate-500 px-1 mb-1">Quick questions:</p>
                    <div className="flex flex-wrap gap-1">
                      {SUGGESTED_QUESTIONS.map((q, idx) => (
                        <button 
                          key={idx} 
                          onClick={() => handleSendMessage(q)} 
                          className="text-[9px] px-1.5 py-1 bg-white border border-slate-200 rounded-full hover:bg-blue-50 hover:border-blue-300 transition-all text-left"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="bg-white border-t border-slate-200 flex-shrink-0 p-2">
                <div className="flex gap-1 items-end">
                  <textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask a question..."
                    className="flex-1 px-2 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-[10px] resize-none max-h-[60px]"
                    rows={1}
                    disabled={isSubmitting}
                  />
                  <button onClick={() => handleSendMessage(inputValue)} disabled={!inputValue.trim() || isSubmitting} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white px-2 py-1.5 rounded-lg transition-all flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m22 2-7 20-4-9-9-4Z"></path>
                      <path d="M22 2 11 13"></path>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Disclaimer - ULTRA COMPACT */}
              <div className="bg-slate-50 border-t border-slate-200 flex-shrink-0">
                <button onClick={() => setDisclaimerExpanded(!disclaimerExpanded)} className="w-full px-2 py-1 flex items-center justify-between text-[9px] text-slate-600 hover:bg-slate-100 transition-colors">
                  <span className="font-medium">⚠️ Disclaimer</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${disclaimerExpanded ? 'rotate-180' : ''}`}>
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </button>
                {disclaimerExpanded && (
                  <div className="px-2 pb-2 text-[9px] text-slate-600 leading-relaxed">
                    {LEGAL_DISCLAIMER}
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

