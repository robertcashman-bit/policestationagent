import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { runChatbotSearch } from "@/lib/chatbot-core";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function callOpenAI(
  messages: Array<{ role: string; content: string }>,
  maxTokens: number = 200
): Promise<string> {
  if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY not configured");

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages,
      max_tokens: maxTokens,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`OpenAI API error: ${error.error?.message || "Unknown error"}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || "";
}

export async function POST(request: NextRequest) {
  try {
    const rate = checkRateLimit(request, 20, 60_000);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a moment." },
        { status: 429 }
      );
    }

    const { query, conversationHistory } = await request.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const result = runChatbotSearch(query, conversationHistory, { openAiKey: OPENAI_API_KEY });

    if (result.type === "instant") {
      return NextResponse.json({
        answer: result.answer,
        sources: result.sources,
        usedAI: false,
      });
    }

    if (result.streamContext && OPENAI_API_KEY) {
      try {
        const aiAnswer = await callOpenAI(
          [
            { role: "system", content: result.streamContext.systemPrompt },
            { role: "user", content: result.streamContext.userPrompt },
          ],
          200
        );

        if (aiAnswer && aiAnswer.trim().length > 20) {
          return NextResponse.json({
            answer: aiAnswer.trim(),
            sources: result.sources,
            usedAI: true,
          });
        }
      } catch (error) {
        console.error("OpenAI failed:", error);
      }
    }

    const fallback = runChatbotSearch(query, conversationHistory, { openAiKey: null });
    return NextResponse.json({
      answer: fallback.answer,
      sources: fallback.sources,
      usedAI: false,
    });
  } catch (error) {
    console.error("Error in chatbot search:", error);
    return NextResponse.json(
      { error: "An error occurred", answer: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
