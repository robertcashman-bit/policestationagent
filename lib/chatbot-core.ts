import fs from "fs";
import path from "path";
import { processQuery, calculateSearchScore } from "@/lib/chatbot-utils";
import { isOutOfScopeEnquiry, SCOPE_FAQ_ITEMS } from "@/config/scope-faqs";
import { getAllPosts } from "@/lib/blog-reader";

export interface ChatbotSource {
  type: string;
  title: string;
  url?: string;
}

export interface ChatbotSearchResult {
  type: "instant" | "stream" | "fallback";
  answer: string;
  sources: ChatbotSource[];
  streamContext?: {
    systemPrompt: string;
    userPrompt: string;
  };
}

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

function loadFAQContent() {
  try {
    const faqPath = path.join(process.cwd(), "app", "faq", "FAQContent.tsx");
    const faqContent = fs.readFileSync(faqPath, "utf8");
    const faqItems: Array<{ question: string; answer: string }> = [];
    const faqPattern = /question:\s*['"`]([^'"`]+)['"`]\s*,\s*answer:\s*['"`]([\s\S]*?)['"`]/g;
    let match;

    while ((match = faqPattern.exec(faqContent)) !== null) {
      const question = match[1].trim();
      let answer = match[2].trim();
      answer = answer.replace(/\\n/g, " ").replace(/\\'/g, "'").replace(/\\"/g, '"');
      if (question && answer) faqItems.push({ question, answer });
    }
    return faqItems;
  } catch {
    return [];
  }
}

function loadBlogPosts() {
  try {
    return getAllPosts().map((post) => ({
      title: post.title,
      content: stripHTML(post.contentHtml || post.metaDescription || ""),
      slug: post.slug,
    }));
  } catch {
    return [];
  }
}

function crawlAllPages() {
  const pages: Array<{ title: string; content: string; url: string }> = [];
  const curatedPaths = [
    "start/in-custody",
    "start/voluntary-interview",
    "kent-police-custody-resources",
    "resources",
    "resources/pace-rights-guide",
    "canwehelp",
    "contact",
  ];

  for (const routePath of curatedPaths) {
    const pagePath = path.join(process.cwd(), "app", routePath, "page.tsx");
    if (!fs.existsSync(pagePath)) continue;
    try {
      const pageContent = fs.readFileSync(pagePath, "utf8");
      const htmlMatch = pageContent.match(/dangerouslySetInnerHTML=\{\s*\{\s*__html:\s*`([^`]+)`/);
      if (htmlMatch) {
        const htmlContent = stripHTML(htmlMatch[1]);
        const titleMatch = htmlContent.match(/<h1[^>]*>([^<]+)<\/h1>/i);
        pages.push({
          title: titleMatch ? titleMatch[1] : routePath.split("/").pop()!.replace(/-/g, " "),
          content: htmlContent.substring(0, 5000),
          url: `/${routePath}`,
        });
      }
    } catch {
      /* skip */
    }
  }

  try {
    const appDir = path.join(process.cwd(), "app");
    const directories = fs.readdirSync(appDir, { withFileTypes: true });
    for (const dir of directories) {
      if (!dir.isDirectory()) continue;
      const pagePath = path.join(appDir, dir.name, "page.tsx");
      if (!fs.existsSync(pagePath)) continue;
      try {
        const pageContent = fs.readFileSync(pagePath, "utf8");
        const htmlMatch = pageContent.match(/dangerouslySetInnerHTML=\{\s*\{\s*__html:\s*`([^`]+)`/);
        if (htmlMatch) {
          const htmlContent = stripHTML(htmlMatch[1]);
          const url = dir.name === "home" ? "/" : `/${dir.name}`;
          const titleMatch = htmlContent.match(/<h1[^>]*>([^<]+)<\/h1>/i);
          const title = titleMatch ? titleMatch[1] : dir.name.replace(/-/g, " ");
          if (htmlContent.length > 100) {
            pages.push({ title, content: htmlContent.substring(0, 5000), url });
          }
        }
      } catch {
        /* skip */
      }
    }
  } catch {
    /* skip */
  }

  return pages;
}

function scopeFaqResponse(queryText: string) {
  const q = queryText.toLowerCase();
  const pick = (match: (question: string) => boolean) => {
    const item = SCOPE_FAQ_ITEMS.find((faq) => match(faq.question.toLowerCase()));
    return item ? { answer: item.answer, title: item.question } : null;
  };

  if (
    /\b(yesterday|last week|few days|2 days|two days|days ago|already released|was arrested|got arrested)\b/.test(
      q
    ) &&
    !/\b(right now|currently|today|in custody now)\b/.test(q)
  ) {
    return pick((question) => question.includes("yesterday"));
  }

  if (/\b(disappeared|missing|where are they|what happened to them|find them|trace them)\b/.test(q)) {
    return pick((question) => question.includes("disappeared"));
  }

  if (
    /\b(friend|mate|colleague|neighbour|neighbor|acquaintance)\b/.test(q) &&
    /\b(instruct|represent|arrested|custody|help)\b/.test(q)
  ) {
    return pick((question) => question.includes("instruct you on someone"));
  }

  if (isOutOfScopeEnquiry(queryText)) {
    return (
      pick((question) => question.includes("welfare")) ||
      pick((question) => question.includes("disappeared")) ||
      pick((question) => question.includes("yesterday"))
    );
  }

  return null;
}

export const CHATBOT_SYSTEM_PROMPT = `You are a helpful legal assistant for Police Station Agent (policestationagent.com), a Kent police station duty solicitor service.

CRITICAL RULES:
1. Answer questions based STRICTLY on the provided context from our website ONLY
2. Do NOT use general legal knowledge - only use information from the provided context
3. If the context doesn't contain relevant information, say "I don't have specific information about that on our website. Please check our [FAQ page](/faq) or [contact us](/contact) for more details."
4. Be specific and directly relevant to the question asked
5. Reference specific details from the website content (locations, services, procedures mentioned)
6. Maximum 100 words
7. Use simple, clear language
8. Use markdown: **bold** for key points

Focus on providing accurate, site-specific information that directly answers the user's question.`;

export function runChatbotSearch(
  query: string,
  conversationHistory?: Array<{ type: string; content: string }>,
  options?: { openAiKey?: string | null }
): ChatbotSearchResult {
  const { normalized: searchQuery } = processQuery(query);
  const openAiKey = options?.openAiKey ?? process.env.OPENAI_API_KEY;

  const scopeAnswer = scopeFaqResponse(query);
  if (scopeAnswer) {
    return {
      type: "instant",
      answer: scopeAnswer.answer,
      sources: [{ type: "faq", title: scopeAnswer.title, url: "/faq#immediate-custody-only" }],
    };
  }

  const results: Array<{
    type: "faq" | "blog" | "page";
    title: string;
    content: string;
    url: string;
    score: number;
  }> = [];

  loadFAQContent().forEach((item) => {
    const questionScore = calculateSearchScore(searchQuery, item.question, true, true);
    const answerScore = calculateSearchScore(searchQuery, item.answer, false, false);
    let boost = 0;
    const queryLower = searchQuery.toLowerCase();
    const questionLower = item.question.toLowerCase();

    if (
      queryLower === questionLower ||
      questionLower.includes(queryLower) ||
      queryLower.includes(questionLower.substring(0, 20))
    ) {
      boost += 20;
    }

    const totalScore = questionScore * 2.5 + answerScore + boost;
    if (totalScore > 10) {
      results.push({
        type: "faq",
        title: item.question,
        content: item.answer,
        url: "/faq",
        score: totalScore,
      });
    }
  });

  loadBlogPosts().forEach((post) => {
    const titleScore = calculateSearchScore(searchQuery, post.title, true, false);
    const contentScore = calculateSearchScore(searchQuery, post.content, false, false);
    const totalScore = titleScore * 2.5 + contentScore;
    if (totalScore > 10) {
      const excerpt =
        post.content.length > 600 ? post.content.substring(0, 600) + "..." : post.content;
      results.push({
        type: "blog",
        title: post.title,
        content: excerpt,
        url: `/blog/${post.slug}`,
        score: totalScore,
      });
    }
  });

  crawlAllPages().forEach((page) => {
    const titleScore = calculateSearchScore(searchQuery, page.title, true, false);
    const contentScore = calculateSearchScore(searchQuery, page.content, false, false);
    const totalScore = titleScore * 2 + contentScore;
    if (totalScore > 8) {
      const excerpt =
        page.content.length > 600 ? page.content.substring(0, 600) + "..." : page.content;
      results.push({
        type: "page",
        title: page.title,
        content: excerpt,
        url: page.url,
        score: totalScore,
      });
    }
  });

  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (a.type === "faq") return -1;
    if (b.type === "faq") return 1;
    return 0;
  });

  const topResults = results.slice(0, 7);
  const sources: ChatbotSource[] = topResults.slice(0, 3).map((r) => ({
    type: r.type,
    title: r.title,
    url: r.url,
  }));

  const queryLower = query.toLowerCase();
  if (
    (queryLower.includes("find") || queryLower.includes("find out")) &&
    (queryLower.includes("someone") || queryLower.includes("person")) &&
    (queryLower.includes("custody") || queryLower.includes("arrested"))
  ) {
    const confidentialityFAQ = results.find(
      (r) =>
        r.type === "faq" &&
        (r.title.toLowerCase().includes("information") ||
          r.title.toLowerCase().includes("someone") ||
          r.title.toLowerCase().includes("confidential"))
    );
    if (confidentialityFAQ) {
      return {
        type: "instant",
        answer: `We specialise in attending when someone is in custody right now — we cannot provide status updates or confirm whether someone is detained. ${stripHTML(confidentialityFAQ.content)} See our [FAQ](/faq#immediate-custody-only) for immediate family instructions.`,
        sources: [
          {
            type: confidentialityFAQ.type,
            title: confidentialityFAQ.title,
            url: "/faq#immediate-custody-only",
          },
        ],
      };
    }
  }

  if (topResults.length === 0) {
    return {
      type: "instant",
      answer: `I don't have specific information about that on our website. Please check our [FAQ page](/faq), [blog articles](/blog), or [contact us](/contact) for more details about police station representation in Kent.`,
      sources: [],
    };
  }

  const top = topResults[0];
  const exactFaqMatch =
    top.type === "faq" &&
    (top.score >= 30 ||
      top.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      searchQuery.toLowerCase().includes(top.title.toLowerCase().substring(0, 15)));

  if (exactFaqMatch || !openAiKey || top.score <= 10) {
    const cleanContent = stripHTML(top.content);
    const displayContent =
      top.type === "faq"
        ? cleanContent
        : cleanContent.length > 200
          ? cleanContent.substring(0, 200) + "..."
          : cleanContent;
    let answer =
      top.type === "faq" ? displayContent : `Based on "${top.title}": ${displayContent}`;
    if (topResults.length > 1 && topResults[1].score > 10) {
      answer += `\n\nSee also: [${topResults[1].title}](${topResults[1].url})`;
    }
    return { type: "instant", answer, sources };
  }

  const context = topResults
    .slice(0, 7)
    .map((r) => `Source: ${r.title} (${r.type})\n${stripHTML(r.content)}`)
    .join("\n\n---\n\n");

  const conversationContext =
    conversationHistory && conversationHistory.length > 0
      ? conversationHistory
          .slice(-3)
          .map((msg) => `${msg.type === "user" ? "User" : "Assistant"}: ${msg.content}`)
          .join("\n")
      : "";

  const userPrompt = conversationContext
    ? `Previous conversation:\n${conversationContext}\n\nQuestion: ${query}\n\nWebsite Context:\n${context}`
    : `Question: ${query}\n\nWebsite Context:\n${context}`;

  return {
    type: "stream",
    answer: "",
    sources,
    streamContext: { systemPrompt: CHATBOT_SYSTEM_PROMPT, userPrompt },
  };
}
