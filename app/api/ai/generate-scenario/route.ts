import { NextRequest, NextResponse } from 'next/server';
import { generateScenario } from '@/lib/ai/openai';
import { requirePaidTrainingAccess } from '@/lib/auth/api-guards';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const MAX_CONTEXT_LENGTH = 2000;

export async function POST(request: NextRequest) {
  const gate = await requirePaidTrainingAccess();
  if (!gate.ok) return gate.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const rawContext = (body as { context?: unknown })?.context;
  if (rawContext !== undefined && typeof rawContext !== 'string') {
    return NextResponse.json({ error: 'Invalid context' }, { status: 400 });
  }
  // Cap input to bound OpenAI token cost and mitigate abuse/DoS.
  const context = typeof rawContext === 'string' ? rawContext.slice(0, MAX_CONTEXT_LENGTH) : '';

  try {
    const scenario = await generateScenario(context);
    return NextResponse.json(scenario);
  } catch (error: unknown) {
    // Log details server-side; never surface internal/provider errors to the client.
    console.error('Error generating scenario:', error);
    return NextResponse.json({ error: 'Failed to generate scenario' }, { status: 500 });
  }
}
