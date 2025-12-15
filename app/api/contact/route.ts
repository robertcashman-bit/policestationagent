/**
 * CONTACT FORM API ROUTE
 * 
 * Handles contact form submissions for police station representation requests.
 * Validates input, sanitizes data, and sends formatted email.
 * GDPR compliant - no sensitive data in logs.
 */

import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ContactFormData {
  name: string;
  contactNumber: string;
  email: string;
  requestType: 'self' | 'client';
  clientName?: string;
  clientDOB?: string;
  policeStation: string;
  interviewDate: string;
  interviewTime: string;
  attendanceType: 'arrested' | 'voluntary';
  offenceSummary: string;
  contactWindow: 'now' | 'specify';
  contactWindowTime?: string;
  supportNeeds?: string;
  consent: boolean;
}

// Sanitize input to prevent XSS
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim()
    .substring(0, 1000); // Limit length
}

// Validate email format
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Format email body as case briefing
function formatEmailBody(data: ContactFormData): string {
  const isClient = data.requestType === 'client';
  const contactTime = data.contactWindow === 'now' 
    ? 'ASAP / Now' 
    : `Specified time: ${data.contactWindowTime || 'Not specified'}`;
  
  return `
NEW POLICE STATION ATTENDANCE REQUEST
=====================================

REQUESTOR INFORMATION
---------------------
Name: ${data.name}
Contact Number: ${data.contactNumber}
Email: ${data.email}
Request Type: ${isClient ? 'Solicitor requesting for client' : 'Self'}

${isClient ? `
CLIENT INFORMATION
------------------
Client Name: ${data.clientName || 'Not provided'}
Client Date of Birth: ${data.clientDOB || 'Not provided'}
` : ''}

INTERVIEW DETAILS
-----------------
Police Station: ${data.policeStation}
Date: ${data.interviewDate}
Time: ${data.interviewTime}
Attendance Type: ${data.attendanceType === 'arrested' ? 'Arrested' : 'Voluntary Attendance'}

OFFENCE SUMMARY
---------------
${data.offenceSummary}

CONTACT PREFERENCES
-------------------
Best Contact Window: ${contactTime}
${data.supportNeeds ? `
SUPPORT REQUIREMENTS
-------------------
${data.supportNeeds}
` : ''}

=====================================
Submitted via website contact form
Timestamp: ${new Date().toISOString()}
Consent Given: ${data.consent ? 'Yes' : 'No'}
=====================================
`.trim();
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    
    // Validate required fields
    if (!body.name || !body.contactNumber || !body.email || !body.policeStation || 
        !body.interviewDate || !body.interviewTime || !body.offenceSummary || !body.consent) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate email format
    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Validate client fields if requestType is 'client'
    if (body.requestType === 'client') {
      if (!body.clientName || !body.clientDOB) {
        return NextResponse.json(
          { error: 'Client name and date of birth required when requesting for a client' },
          { status: 400 }
        );
      }
    }
    
    // Validate contact window time if specified
    if (body.contactWindow === 'specify' && !body.contactWindowTime) {
      return NextResponse.json(
        { error: 'Contact window time required when specifying a time' },
        { status: 400 }
      );
    }
    
    // Sanitize inputs
    const sanitizedData: ContactFormData = {
      name: sanitizeInput(body.name),
      contactNumber: sanitizeInput(body.contactNumber),
      email: sanitizeInput(body.email),
      requestType: body.requestType,
      clientName: body.clientName ? sanitizeInput(body.clientName) : undefined,
      clientDOB: body.clientDOB ? sanitizeInput(body.clientDOB) : undefined,
      policeStation: sanitizeInput(body.policeStation),
      interviewDate: sanitizeInput(body.interviewDate),
      interviewTime: sanitizeInput(body.interviewTime),
      attendanceType: body.attendanceType,
      offenceSummary: sanitizeInput(body.offenceSummary),
      contactWindow: body.contactWindow,
      contactWindowTime: body.contactWindowTime ? sanitizeInput(body.contactWindowTime) : undefined,
      supportNeeds: body.supportNeeds ? sanitizeInput(body.supportNeeds) : undefined,
      consent: body.consent,
    };
    
    // Format email
    const emailSubject = 'New Police Station Attendance Request';
    const emailBody = formatEmailBody(sanitizedData);
    const recipientEmail = process.env.CONTACT_EMAIL || 'robertdavidcashman@gmail.com';
    
    // Get email configuration from environment variables
    const resendApiKey = process.env.RESEND_API_KEY;
    const sendgridApiKey = process.env.SENDGRID_API_KEY;
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    
    let emailSent = false;
    const errors: string[] = [];
    
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
            reply_to: sanitizedData.email,
          }),
        });
        
        if (resendResponse.ok) {
          const data = await resendResponse.json();
          console.log('[Contact Form] Email sent via Resend:', data.id);
          emailSent = true;
        } else {
          // Log the error response
          const errorText = await resendResponse.text();
          const errorStatus = resendResponse.status;
          console.error(`[Contact Form] Resend failed with status ${errorStatus}:`, errorText);
          errors.push(`Resend: ${errorStatus} ${errorText.substring(0, 100)}`);
        }
      } catch (error) {
        console.error('[Contact Form] Resend exception:', error);
        errors.push(`Resend exception: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
    
    // If Resend succeeded, return success
    if (emailSent) {
      return NextResponse.json({ 
        success: true, 
        message: 'Request submitted successfully' 
      });
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
            subject: emailSubject,
            content: [{
              type: 'text/plain',
              value: emailBody,
            }],
            reply_to: { email: sanitizedData.email },
          }),
        });
        
        if (sendgridResponse.ok) {
          console.log('[Contact Form] Email sent via SendGrid');
          emailSent = true;
        } else {
          // Log the error response
          const errorText = await sendgridResponse.text();
          const errorStatus = sendgridResponse.status;
          console.error(`[Contact Form] SendGrid failed with status ${errorStatus}:`, errorText);
          errors.push(`SendGrid: ${errorStatus} ${errorText.substring(0, 100)}`);
        }
      } catch (error) {
        console.error('[Contact Form] SendGrid exception:', error);
        errors.push(`SendGrid exception: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
    
    // If SendGrid succeeded, return success
    if (emailSent) {
      return NextResponse.json({ 
        success: true, 
        message: 'Request submitted successfully' 
      });
    }
    
    // Try SMTP (if configured)
    if (smtpHost && smtpUser && smtpPass) {
      // For production, implement nodemailer here
      console.log('[Contact Form] SMTP configured but not fully implemented');
      console.log('[Contact Form] Email would be sent to:', recipientEmail);
      // SMTP not implemented, so we can't actually send
      errors.push('SMTP: Not fully implemented');
    }
    
    // If we reach here, all email services failed
    // Log the failure with all error details
    console.error('\n=== CONTACT FORM EMAIL FAILURE ===');
    console.error('All email services failed to send');
    console.error('Request Type:', sanitizedData.requestType);
    console.error('Police Station:', sanitizedData.policeStation);
    console.error('Date/Time:', `${sanitizedData.interviewDate} at ${sanitizedData.interviewTime}`);
    console.error('Attendance Type:', sanitizedData.attendanceType);
    console.error('Recipient Email:', recipientEmail);
    console.error('Errors:', errors);
    console.error('===================================\n');
    
    // Return error - do NOT return success if email was not sent
    // This is critical for urgent legal representation requests
    return NextResponse.json(
      { 
        error: 'Failed to send email. Please call 01732 247427 immediately for urgent assistance.',
        message: 'Your request was received but we could not send the confirmation email. Please call us directly.'
      },
      { status: 500 }
    );
    
  } catch (error) {
    // Don't expose error details to client
    console.error('[Contact Form] Error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Failed to submit request. Please try again or call 01732 247427.' },
      { status: 500 }
    );
  }
}

