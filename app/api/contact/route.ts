import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getClientIp(request: NextRequest): string | null {
  // Vercel / proxies commonly set one of these.
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0]?.trim() || null;
  const realIp = request.headers.get('x-real-ip');
  return realIp?.trim() || null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = String(body?.name ?? '').trim();
    const contactNumber = String(body?.contactNumber ?? '').trim();
    const email = String(body?.email ?? '').trim();
    const requestType = String(body?.requestType ?? '').trim(); // 'self' | 'client'
    const clientName = String(body?.clientName ?? '').trim();
    const clientDOB = String(body?.clientDOB ?? '').trim();
    const policeStation = String(body?.policeStation ?? '').trim();
    const interviewDate = String(body?.interviewDate ?? '').trim();
    const interviewTime = String(body?.interviewTime ?? '').trim();
    const attendanceType = String(body?.attendanceType ?? '').trim(); // 'arrested' | 'voluntary'
    const offenceSummary = String(body?.offenceSummary ?? '').trim();
    const contactWindow = String(body?.contactWindow ?? '').trim(); // 'now' | 'specify'
    const contactWindowTime = String(body?.contactWindowTime ?? '').trim();
    const supportNeeds = String(body?.supportNeeds ?? '').trim();
    const consent = Boolean(body?.consent);

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!contactNumber) {
      return NextResponse.json({ error: 'Contact number is required' }, { status: 400 });
    }
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }
    if (!policeStation) {
      return NextResponse.json({ error: 'Police station is required' }, { status: 400 });
    }
    if (!interviewDate) {
      return NextResponse.json({ error: 'Interview date is required' }, { status: 400 });
    }
    if (!interviewTime) {
      return NextResponse.json({ error: 'Interview time is required' }, { status: 400 });
    }
    if (!attendanceType) {
      return NextResponse.json({ error: 'Attendance type is required' }, { status: 400 });
    }
    if (!offenceSummary) {
      return NextResponse.json({ error: 'Offence summary is required' }, { status: 400 });
    }
    if (requestType === 'client' && (!clientName || !clientDOB)) {
      return NextResponse.json(
        { error: 'Client name and date of birth are required when requesting for a client' },
        { status: 400 }
      );
    }
    if (contactWindow === 'specify' && !contactWindowTime) {
      return NextResponse.json({ error: 'Please specify a contact time' }, { status: 400 });
    }
    if (!consent) {
      return NextResponse.json({ error: 'Consent is required' }, { status: 400 });
    }

    const userAgent = request.headers.get('user-agent');
    const ipAddress = getClientIp(request);

    db.prepare(
      `
        INSERT INTO contact_messages (
          name,
          contact_number,
          email,
          request_type,
          client_name,
          client_dob,
          police_station,
          interview_date,
          interview_time,
          attendance_type,
          offence_summary,
          contact_window,
          contact_window_time,
          support_needs,
          consent,
          user_agent,
          ip_address
        ) VALUES (
          @name,
          @contact_number,
          @email,
          @request_type,
          @client_name,
          @client_dob,
          @police_station,
          @interview_date,
          @interview_time,
          @attendance_type,
          @offence_summary,
          @contact_window,
          @contact_window_time,
          @support_needs,
          @consent,
          @user_agent,
          @ip_address
        )
      `
    ).run({
      name,
      contact_number: contactNumber,
      email,
      request_type: requestType,
      client_name: clientName || null,
      client_dob: clientDOB || null,
      police_station: policeStation,
      interview_date: interviewDate,
      interview_time: interviewTime,
      attendance_type: attendanceType,
      offence_summary: offenceSummary,
      contact_window: contactWindow,
      contact_window_time: contactWindowTime || null,
      support_needs: supportNeeds || null,
      consent: consent ? 1 : 0,
      user_agent: userAgent,
      ip_address: ipAddress,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json({ error: 'Failed to submit contact request' }, { status: 500 });
  }
}
