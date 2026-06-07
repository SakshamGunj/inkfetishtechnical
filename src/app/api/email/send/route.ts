import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const startTime = Date.now();
  let recipientEmail = '';

  try {
    const body = await request.json();
    const { smtpUser, smtpPass, to, subject, html, attachmentUrl, attachmentName, attachmentBase64, certificate_id } = body;
    recipientEmail = to || '';

    console.log(`[SMTP Send] Received send request to: ${recipientEmail || 'unknown'}`);
    console.log(`[SMTP Send] Parameters parsed. Elapsed: ${Date.now() - startTime}ms`);

    if (!smtpUser || !smtpPass || !to || !subject || !html) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters: smtpUser, smtpPass, to, subject, or html' },
        { status: 400 }
      );
    }

    // Define global transporter cache to reuse SMTP connections across requests
    const transporterCache = (global as any).transporterCache || ((global as any).transporterCache = {});
    const cacheKey = `${smtpUser}_${smtpPass}`;
    let transporter = transporterCache[cacheKey];

    if (!transporter) {
      console.log(`[SMTP Send] Creating new pooled SMTP transport for ${smtpUser}...`);
      transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for port 465 (SSL)
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        pool: true,             // Enable connection pooling to reuse SMTP connections
        maxConnections: 3,      // Maintain up to 3 concurrent connections
        maxMessages: 100,       // Reuse each connection up to 100 times
        connectionTimeout: 10000, // 10s connection timeout
        greetingTimeout: 10000,   // 10s greeting timeout
        socketTimeout: 30000,     // 30s socket inactivity timeout
      });
      transporterCache[cacheKey] = transporter;
    } else {
      console.log(`[SMTP Send] Reusing cached pooled SMTP transport for ${smtpUser}.`);
    }

    const attachments = [];

    // Prioritize local certificate attachment if certificate_id is provided
    const certId = certificate_id || body.certificateId;
    if (certId) {
      const path = require('path');
      const fs = require('fs');
      const cleanCertId = String(certId).trim();
      const localPdfPath = path.join(process.cwd(), 'public', 'certificates-compressed', `${cleanCertId}.pdf`);

      console.log(`[SMTP Send] Checking for local certificate at: ${localPdfPath}`);
      if (fs.existsSync(localPdfPath)) {
        console.log(`[SMTP Send] Found local certificate file. Attaching directly from local disk.`);
        attachments.push({
          filename: attachmentName || `${cleanCertId}.pdf`,
          path: localPdfPath,
        });
      } else {
        console.log(`[SMTP Send] Warning: Local certificate file not found at ${localPdfPath}`);
      }
    }

    if (attachments.length === 0) {
      if (attachmentUrl) {
        console.log(`[SMTP Send] Configuring attachment from URL: ${attachmentUrl}`);
        const fetchStart = Date.now();
        attachments.push({
          filename: attachmentName || 'Attachment.pdf',
          path: attachmentUrl,
        });
        console.log(`[SMTP Send] Attachment path configured. Elapsed: ${Date.now() - fetchStart}ms`);
      } else if (attachmentBase64) {
        console.log(`[SMTP Send] Processing base64 attachment. Size: ${Math.round(attachmentBase64.length / 1024)} KB`);
        const base64Start = Date.now();
        // Remove data URI scheme prefix if present
        const base64Data = attachmentBase64.includes(';base64,')
          ? attachmentBase64.split(';base64,')[1]
          : attachmentBase64;

        attachments.push({
          filename: attachmentName || 'document.pdf',
          content: base64Data,
          encoding: 'base64',
        });
        console.log(`[SMTP Send] Base64 attachment parsed. Elapsed: ${Date.now() - base64Start}ms`);
      }
    }


    console.log(`[SMTP Send] Executing sendMail...`);
    const mailStart = Date.now();
    // Send the email
    const info = await transporter.sendMail({
      from: `"Inkfetish" <${smtpUser}>`,
      to,
      subject,
      html,
      attachments,
    });
    console.log(`[SMTP Send] sendMail completed successfully. Duration: ${Date.now() - mailStart}ms, MessageId: ${info.messageId}`);

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      response: info.response,
    });
  } catch (error: any) {
    console.error(`[SMTP Send] Error occurred after ${Date.now() - startTime}ms:`, error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to send email via SMTP' },
      { status: 500 }
    );
  }
}

