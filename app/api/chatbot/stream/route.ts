import { NextRequest } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { runChatbotSearch } from "@/lib/chatbot-core";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

function sseMessage(event: string, data: object): string {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

export async function POST(request: NextRequest) {
  const rate = checkRateLimit(request, 20, 60_000);
  if (!rate.allowed) {
    return new Response(sseMessage("error", { message: "Too many requests. Please try again." }), {
      status: 429,
      headers: { "Content-Type": "text/event-stream" },
    });
  }

  let query = "";
  let conversationHistory: Array<{ type: string; content: string }> = [];

  try {
    const body = await request.json();
    query = body.query || "";
    conversationHistory = body.conversationHistory || [];
  } catch {
    return new Response(sseMessage("error", { message: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "text/event-stream" },
    });
  }

  if (!query || typeof query !== "string") {
    return new Response(sseMessage("error", { message: "Query is required" }), {
      status: 400,
      headers: { "Content-Type": "text/event-stream" },
    });
  }

  const result = runChatbotSearch(query, conversationHistory, { openAiKey: OPENAI_API_KEY });

  if (result.type === "instant" || result.type === "fallback") {
    const stream = new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder();
        controller.enqueue(
          encoder.encode(
            sseMessage("instant", { answer: result.answer, sources: result.sources, usedAI: false })
          )
        );
        controller.enqueue(encoder.encode(sseMessage("done", { sources: result.sources })));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  }

  if (!OPENAI_API_KEY || !result.streamContext) {
    const stream = new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder();
        controller.enqueue(
          encoder.encode(
            sseMessage("instant", {
              answer:
                "I don't have specific information about that on our website. Please check our [FAQ page](/faq) or [contact us](/contact).",
              sources: result.sources,
              usedAI: false,
            })
          )
        );
        controller.enqueue(encoder.encode(sseMessage("done", { sources: result.sources })));
        controller.close();
      },
    });
    return new Response(stream, {
      headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
    });
  }

  const { systemPrompt, userPrompt } = result.streamContext;

  const openAiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 200,
      temperature: 0.7,
      stream: true,
    }),
  });

  if (!openAiResponse.ok || !openAiResponse.body) {
    const stream = new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder();
        controller.enqueue(
          encoder.encode(
            sseMessage("error", {
              message: "Unable to generate a response. Please call us or see our FAQ.",
            })
          )
        );
        controller.close();
      },
    });
    return new Response(stream, {
      headers: { "Content-Type": "text/event-stream" },
    });
  }

  const sources = result.sources;
  const reader = openAiResponse.body.getReader();
  const decoder = new TextDecoder();

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data: ")) continue;
            const payload = trimmed.slice(6);
            if (payload === "[DONE]") continue;

            try {
              const parsed = JSON.parse(payload);
              const token = parsed.choices?.[0]?.delta?.content;
              if (token) {
                controller.enqueue(encoder.encode(sseMessage("token", { content: token })));
              }
            } catch {
              /* skip malformed chunk */
            }
          }
        }

        controller.enqueue(encoder.encode(sseMessage("done", { sources, usedAI: true })));
        controller.close();
      } catch (error) {
        controller.enqueue(
          encoder.encode(
            sseMessage("error", {
              message: error instanceof Error ? error.message : "Stream interrupted",
            })
          )
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
