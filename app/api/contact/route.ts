/**
 * CONTACT FORM API ROUTE
 * 
 * Handles contact form submissions and sends emails.
 * Supports both simple contact forms and police station solicitor attendance requests.
 * Uses environment variables for email configuration.
 * 
 * For production, configure one of:
 * - RESEND_API_KEY
 * - SENDGRID_API_KEY
 */

import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  subject?: string;
  // Police Station Solicitor Attendance form fields
  contactNumber?: string;
  requestType?: 'self' | 'client';
  clientName?: string;
  clientDOB?: string;
  policeStation?: string;
  interviewDate?: string;
  interviewTime?: string;
  attendanceType?: 'arrested' | 'voluntary';
  offenceSummary?: string;
  contactWindow?: 'now' | 'specify';
  contactWindowTime?: string;
  supportNeeds?: string;
  consent?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactRequest = await request.json();
    
    // Detect if this is a police station solicitor attendance request
    const isSolicitorAttendanceRequest = !!(
      body.policeStation || 
      body.interviewDate || 
      body.attendanceType ||
      body.offenceSummary
    );

    let emailSubject: string;
    let emailBody: string;
    let recipientEmail = 'robertcashman@defencelegalservices.co.uk';
    let email: string;
    let name: string;
    let phone: string | undefined;

    if (isSolicitorAttendanceRequest) {
      // Handle Police Station Solicitor Attendance Request
      const {
        name: requestorName,
        email: requestorEmail,
        contactNumber,
        requestType,
        clientName,
        clientDOB,
        policeStation,
        interviewDate,
        interviewTime,
        attendanceType,
        offenceSummary,
        contactWindow,
        contactWindowTime,
        supportNeeds,
        consent
      } = body;

      name = requestorName;
      email = requestorEmail;
      phone = contactNumber;

      // Validate required fields for solicitor attendance request
      if (!requestorName || !requestorEmail || !contactNumber || !policeStation || !interviewDate || !interviewTime || !offenceSummary || !consent) {
        return NextResponse.json(
          { error: 'All required fields must be completed' },
          { status: 400 }
        );
      }

      if (requestType === 'client' && (!clientName || !clientDOB)) {
        return NextResponse.json(
          { error: 'Client name and date of birth are required when requesting for a client' },
          { status: 400 }
        );
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(requestorEmail)) {
        return NextResponse.json(
          { error: 'Invalid email address' },
          { status: 400 }
        );
      }

      emailSubject = `URGENT: Police Station Solicitor Attendance Request - ${policeStation}`;
      
      emailBody = `
URGENT: Police Station Solicitor Attendance Request
===================================================

CONTACT DETAILS
---------------
Name: ${requestorName}
Email: ${requestorEmail}
Contact Number: ${contactNumber}
Request Type: ${requestType === 'client' ? 'Client' : 'Self'}

${requestType === 'client' ? `
CLIENT INFORMATION
------------------
Client Name: ${clientName}
Client Date of Birth: ${clientDOB}
` : ''}

INTERVIEW DETAILS
-----------------
Police Station: ${policeStation}
Date: ${interviewDate}
Time: ${interviewTime}
Attendance Type: ${attendanceType === 'arrested' ? 'Arrested' : 'Voluntary Attendance'}

Alleged Offence/Police Request:
${offenceSummary}

CONTACT PREFERENCES
-------------------
Best Contact Window: ${contactWindow === 'now' ? 'Now / As soon as possible' : `Specify time: ${contactWindowTime || 'Not specified'}`}

${supportNeeds ? `
SUPPORT REQUIREMENTS
--------------------
${supportNeeds}
` : ''}

CONSENT
-------
Data storage and email communication consent: ${consent ? 'Yes' : 'No'}

===================================================
Sent from: policestationagent.com
Timestamp: ${new Date().toISOString()}
      `.trim();
    } else {
      // Handle Simple Contact Form
      const { name: contactName, email: contactEmail, phone: contactPhone, message, subject } = body;
      
      name = contactName;
      email = contactEmail;
      phone = contactPhone;

      // Validate required fields
      if (!contactName || !contactEmail || !message) {
        return NextResponse.json(
          { error: 'Name, email, and message are required' },
          { status: 400 }
        );
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactEmail)) {
        return NextResponse.json(
          { error: 'Invalid email address' },
          { status: 400 }
        );
      }

      emailSubject = subject || `Contact Form: ${contactName}`;
      
      emailBody = `
New Contact Form Submission
============================

Name: ${contactName}
Email: ${contactEmail}
Phone: ${contactPhone || 'Not provided'}

Message:
${message}

============================
Sent from: policestationagent.com
Timestamp: ${new Date().toISOString()}
      `.trim();
    }

    // Get email configuration from environment variables
    const resendApiKey = process.env.RESEND_API_KEY;
    const sendgridApiKey = process.env.SENDGRID_API_KEY;

    // Try Resend first (easiest for Vercel)
    if (resendApiKey) {
      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'Police Station Agent <noreply@policestationagent.com>',
            to: [recipientEmail],
            subject: emailSubject,
            text: emailBody,
            reply_to: email,
          }),
        });

        if (resendResponse.ok) {
          const data = await resendResponse.json();
          console.log('[Contact Form] Sent via Resend:', data.id);
          return NextResponse.json({ success: true, method: 'resend', id: data.id });
        } else {
          const errorData = await resendResponse.json().catch(() => ({ error: 'Unknown error' }));
          console.error('[Contact Form] Resend API error:', resendResponse.status, errorData);
        }
      } catch (error) {
        console.error('[Contact Form] Resend error:', error);
      }
    }

    // Try SendGrid
    if (sendgridApiKey) {
      try {
        const sendgridResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sendgridApiKey}`,
          },
          body: JSON.stringify({
            personalizations: [{
              to: [{ email: recipientEmail }],
            }],
            from: { email: 'noreply@policestationagent.com', name: 'Police Station Agent' },
            reply_to: { email: email, name: name },
            subject: emailSubject,
            content: [{
              type: 'text/plain',
              value: emailBody,
            }],
          }),
        });

        if (sendgridResponse.ok) {
          console.log('[Contact Form] Sent via SendGrid');
          return NextResponse.json({ success: true, method: 'sendgrid' });
        } else {
          const errorText = await sendgridResponse.text().catch(() => 'Unknown error');
          console.error('[Contact Form] SendGrid API error:', sendgridResponse.status, errorText);
        }
      } catch (error) {
        console.error('[Contact Form] SendGrid error:', error);
      }
    }

    // Fallback: Log the email (for development/testing)
    console.log('\n=== CONTACT FORM SUBMISSION (No email service configured) ===');
    console.log('To:', recipientEmail);
    console.log('Subject:', emailSubject);
    console.log('From:', name, '<' + email + '>');
    console.log('Phone:', phone || 'Not provided');
    console.log('Body:', emailBody);
    console.log('==============================================================\n');

    // Return success even if email service isn't configured
    return NextResponse.json({ 
      success: true, 
      method: 'logged',
      message: 'Message received (email service not configured)'
    });

  } catch (error) {
    console.error('[Contact Form] Error:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
