import { NextRequest, NextResponse } from 'next/server';
import { startSession } from '@/lib/session-tracker';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sessionId = await startSession(user.id);
    return NextResponse.json({ sessionId });
  } catch (error) {
    console.error('login-track error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}




























