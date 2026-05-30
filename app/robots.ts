import { MetadataRoute } from "next";
import { SITE_DOMAIN } from "@/config/site";

const disallow = ["/admin/", "/api/", "/_next/", "/test/", "/preview/"];

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${SITE_DOMAIN}`;

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      // LLM / AI crawlers: allow indexing so search and assistants can surface the site
      { userAgent: "GPTBot", allow: "/", disallow },
      { userAgent: "ChatGPT-User", allow: "/", disallow },
      { userAgent: "Google-Extended", allow: "/", disallow },
      { userAgent: "Claude-Web", allow: "/", disallow },
      { userAgent: "ClaudeBot", allow: "/", disallow },
      { userAgent: "anthropic-ai", allow: "/", disallow },
      { userAgent: "PerplexityBot", allow: "/", disallow },
      { userAgent: "Applebot-Extended", allow: "/", disallow },
      { userAgent: "cohere-ai", allow: "/", disallow },
    ],
    sitemap: [`${baseUrl}/sitemap.xml`, `${baseUrl}/blog-sitemap.xml`],
  };
}
