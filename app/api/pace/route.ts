import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { requirePaidTrainingAccess, sanitizePaceSearch } from '@/lib/auth/api-guards';

export async function GET(request: NextRequest) {
  try {
    const gate = await requirePaidTrainingAccess();
    if (!gate.ok) return gate.response;

    const supabase = await createClient();
    
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const search = sanitizePaceSearch(searchParams.get('search'));
    
    let query = supabase
      .from('pace_code_sections')
      .select('*')
      .order('code_letter', { ascending: true })
      .order('section_number', { ascending: true });
    
    // Filter by code letter if provided
    if (code) {
      query = query.eq('code_letter', code.toUpperCase());
    }
    
    // Search functionality
    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching PACE sections:', error);
      return NextResponse.json(
        { error: 'Failed to fetch PACE sections' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ sections: data || [] });
  } catch (error) {
    console.error('PACE API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
