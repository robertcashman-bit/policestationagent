/**
 * Chatbot Message Formatting Utilities
 */

/**
 * Simple markdown-like formatting parser
 */
export function formatMessage(content: string): string {
  if (!content) return "";

  let formatted = content;

  // Convert markdown-style links to HTML
  formatted = formatted.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-blue-600 hover:text-blue-700 underline" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Convert **bold** to <strong>
  formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold">$1</strong>');

  // Convert *italic* to <em>
  formatted = formatted.replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>');

  // Convert line breaks
  formatted = formatted.replace(/\n/g, "<br />");

  return formatted;
}

/**
 * Detect if message contains urgent keywords
 */
export function isUrgentQuery(query: string): boolean {
  const urgentKeywords = [
    "arrested",
    "arrest",
    "custody",
    "in custody",
    "police station",
    "urgent",
    "emergency",
    "immediately",
    "now",
    "help",
    "need solicitor",
  ];

  const lowerQuery = query.toLowerCase();
  return urgentKeywords.some((keyword) => lowerQuery.includes(keyword));
}

/**
 * Extract quick actions from message content
 * REMOVED: Red call box - no longer showing call buttons in chat responses
 */
export function extractQuickActions(
  content: string,
  sources?: Array<{ type: string; title: string; url?: string }>
): Array<{ label: string; action: string; type: "call" | "link" | "form" }> {
  const actions: Array<{ label: string; action: string; type: "call" | "link" | "form" }> = [];

  // Removed urgent call button - users can find contact info in footer/header
  // No actions returned to prevent red call box from appearing

  return actions;
}

/**
 * Generate contextual follow-up questions
 */
export function generateFollowUpQuestions(
  lastMessage: string,
  conversationHistory: Array<{ type: string; content: string }>
): string[] {
  const followUps: string[] = [];
  const lowerMessage = lastMessage.toLowerCase();

  if (lowerMessage.includes("voluntary") || lowerMessage.includes("interview")) {
    followUps.push("What happens during a voluntary interview?");
  }

  if (
    lowerMessage.includes("cost") ||
    lowerMessage.includes("fee") ||
    lowerMessage.includes("free")
  ) {
    followUps.push("Is legal advice really free?");
  }

  if (lowerMessage.includes("right") || lowerMessage.includes("entitle")) {
    followUps.push("What are my rights if arrested?");
  }

  return followUps.slice(0, 2);
}

/**
 * Clean HTML from content
 */
export function stripHTML(html: string): string {
  if (!html) return "";
  let text = html.replace(/<[^>]*>/g, "");
  text = text.replace(/&nbsp;/g, " ");
  text = text.replace(/&amp;/g, "&");
  text = text.replace(/&lt;/g, "<");
  text = text.replace(/&gt;/g, ">");
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  text = text.replace(/\s+/g, " ").trim();
  return text;
}
