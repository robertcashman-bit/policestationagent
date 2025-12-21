'use client';

import { formatMessage, extractQuickActions } from '@/lib/chatbot-formatters';

interface ChatbotMessageProps {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  sources?: Array<{ type: string; title: string; url?: string }>;
  feedback?: 'positive' | 'negative' | null;
  onFeedback?: (id: string, feedback: 'positive' | 'negative') => void;
  onCopy?: (content: string) => void;
}

export default function ChatbotMessage({
  id,
  type,
  content,
  timestamp,
  sources,
  feedback,
  onFeedback,
  onCopy
}: ChatbotMessageProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  const isTyping = content === '...';
  const quickActions = type === 'bot' && !isTyping ? extractQuickActions(content, sources) : [];

  return (
    <div
      className={`flex items-start gap-2 sm:gap-3 transition-all duration-300 ${type === 'user' ? 'justify-end' : 'justify-start'}`}
      style={{ minWidth: 0, maxWidth: '100%' }}
    >
      {type === 'bot' && (
        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-blue-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      )}
      
      <div className={`flex flex-col gap-1.5 max-w-[80%] sm:max-w-[70%] ${type === 'user' ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-2xl px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm shadow-lg transition-all hover:shadow-xl break-words overflow-wrap-anywhere ${
            type === 'user'
              ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-sm'
              : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm'
          }`}
          style={{ wordBreak: 'break-word', maxWidth: '100%' }}
        >
          {isTyping ? (
            <div className="flex gap-1.5">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
            </div>
          ) : (
            <div 
              className="whitespace-pre-wrap leading-relaxed break-words"
              dangerouslySetInnerHTML={{ __html: formatMessage(content) }}
              style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
            />
          )}
        </div>

        {/* Quick Action Buttons */}
        {type === 'bot' && !isTyping && quickActions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 px-1">
            {quickActions.map((action, idx) => (
              <a
                key={idx}
                href={action.action}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-full transition-all shadow-md hover:shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                {action.label}
              </a>
            ))}
          </div>
        )}
        
        {/* Source Links */}
        {type === 'bot' && !isTyping && sources && sources.length > 0 && (
          <div className="flex flex-wrap gap-1.5 px-1">
            {sources.slice(0, 3).map((source, idx) => (
              <a
                key={idx}
                href={source.url || '#'}
                className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors border border-blue-200"
                target={source.url?.startsWith('http') ? '_blank' : undefined}
                rel={source.url?.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {source.type === 'faq' ? '📋' : '📝'} {source.title.length > 25 ? source.title.substring(0, 25) + '...' : source.title}
              </a>
            ))}
          </div>
        )}
        
        {/* Message Actions */}
        {type === 'bot' && !isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-500 px-1">
            <span>{formatTime(timestamp)}</span>
            {onFeedback && (
              <div className="flex items-center gap-1 ml-1">
                <button
                  onClick={() => onFeedback(id, 'positive')}
                  className={`hover:text-green-600 transition-colors ${feedback === 'positive' ? 'text-green-600' : ''}`}
                  aria-label="Helpful"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill={feedback === 'positive' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                  </svg>
                </button>
                <button
                  onClick={() => onFeedback(id, 'negative')}
                  className={`hover:text-red-600 transition-colors ${feedback === 'negative' ? 'text-red-600' : ''}`}
                  aria-label="Not helpful"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill={feedback === 'negative' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {type === 'user' && (
        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-slate-400 to-slate-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-slate-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      )}
    </div>
  );
}

