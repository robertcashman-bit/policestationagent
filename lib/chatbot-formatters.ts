/**
 * Chatbot Message Formatting Utilities
 */

import { isOutOfScopeEnquiry } from "@/config/scope-faqs";
import { PHONE_DISPLAY, PHONE_TEL } from "@/config/contact";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isSafeLinkUrl(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith('/')) return true;
  if (trimmed.startsWith('#')) return true;
  if (trimmed.startsWith('tel:')) return /^tel:[+\d\s()-]+$/i.test(trimmed);
  if (trimmed.startsWith('mailto:')) return /^mailto:[^\s<>]+$/i.test(trimmed);
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

/**
 * Simple markdown-like formatting parser
 */
export function formatMessage(content: string): string {
  if (!content) return '';

  let formatted = escapeHtml(content);

  formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, url) => {
    const safeUrl = String(url).trim();
    if (!isSafeLinkUrl(safeUrl)) {
      return escapeHtml(String(label));
    }
    const external = isExternalUrl(safeUrl);
    const target = external ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<a href="${escapeHtml(safeUrl)}" class="text-blue-600 hover:text-blue-700 underline"${target}>${escapeHtml(String(label))}</a>`;
  });

  formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold">$1</strong>');
  formatted = formatted.replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>');
  formatted = formatted.replace(/\n/g, '<br />');

  return formatted;
}

export function isUrgentQuery(query: string): boolean {
  if (isOutOfScopeEnquiry(query)) return false;

  const urgentKeywords = [
    'arrested',
    'arrest',
    'custody',
    'in custody',
    'police station',
    'urgent',
    'emergency',
    'immediately',
    'now',
    'need solicitor',
  ];

  const lowerQuery = query.toLowerCase();
  return urgentKeywords.some((keyword) => lowerQuery.includes(keyword));
}

export function extractQuickActions(
  content: string,
  sources?: Array<{ type: string; title: string; url?: string }>
): Array<{ label: string; action: string; type: 'call' | 'link' | 'form' }> {
  void content;
  void sources;
  return [];
}

export function buildUrgentCallCta(options?: { hideDigits?: boolean }): string {
  if (options?.hideDigits) {
    return `\n\n**In custody or a booked interview today?** [Contact for solicitor telephone](/contact) — we are NOT the police.`;
  }
  return `\n\n**In custody or a booked interview today?** Call **[${PHONE_DISPLAY}](tel:${PHONE_TEL})** now.`;
}

export function generateFollowUpQuestions(
  lastMessage: string,
  conversationHistory: Array<{ type: string; content: string }>
): string[] {
  void conversationHistory;
  const followUps: string[] = [];
  const lowerMessage = lastMessage.toLowerCase();

  if (lowerMessage.includes('voluntary') || lowerMessage.includes('interview')) {
    followUps.push('What happens during a voluntary interview?');
  }

  if (lowerMessage.includes('cost') || lowerMessage.includes('fee') || lowerMessage.includes('free')) {
    followUps.push('Is legal advice really free?');
  }

  if (lowerMessage.includes('right') || lowerMessage.includes('entitle')) {
    followUps.push('What are my rights if arrested?');
  }

  if (
    lowerMessage.includes('family') ||
    lowerMessage.includes('custody') ||
    lowerMessage.includes('yesterday') ||
    lowerMessage.includes('friend')
  ) {
    followUps.push('Can immediate family instruct a solicitor?');
  }

  return followUps.slice(0, 2);
}

export function stripHTML(html: string): string {
  if (!html) return '';
  let text = html.replace(/<[^>]*>/g, '');
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  text = text.replace(/\s+/g, ' ').trim();
  return text;
}
