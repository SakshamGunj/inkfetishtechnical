import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { smtpUser, smtpPass, to, subject, html, attachmentUrl, attachmentName, attachmentBase64 } = await request.json();

    if (!smtpUser || !smtpPass || !to || !subject || !html) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters: smtpUser, smtpPass, to, subject, or html' },
        { status: 400 }
      );
    }

    // Configure the SMTP transporter for Gmail
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for port 465 (SSL)
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const attachments = [];
    if (attachmentUrl) {
      attachments.push({
        filename: attachmentName || 'Attachment.pdf',
        path: attachmentUrl,
      });
    } else if (attachmentBase64) {
      // Remove data URI scheme prefix if present
      const base64Data = attachmentBase64.includes(';base64,')
        ? attachmentBase64.split(';base64,')[1]
        : attachmentBase64;

      attachments.push({
        filename: attachmentName || 'document.pdf',
        content: base64Data,
        encoding: 'base64',
      });
    }

    // Send the email
    const info = await transporter.sendMail({
      from: `"Inkfetish" <${smtpUser}>`,
      to,
      subject,
      html,
      attachments,
    });

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      response: info.response,
    });
  } catch (error: any) {
    console.error('SMTP sending error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to send email via SMTP' },
      { status: 500 }
    );
  }
}
