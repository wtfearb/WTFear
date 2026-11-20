import nodemailer from 'nodemailer';

export interface AuditEmailPayload {
  readonly referenceId: string;
  readonly email: string;
  readonly name?: string;
  readonly organization?: string;
  readonly focusArea: string;
  readonly systemStage: string;
  readonly bottleneckDescription: string;
  readonly source: 'modal' | 'contact';
  readonly timestamp?: string;
}

interface SingleEmailParams {
  readonly to: string;
  readonly subject: string;
  readonly html: string;
  readonly text: string;
  readonly replyTo?: string;
}

interface EmailDispatchResult {
  readonly success: boolean;
  readonly provider: 'resend' | 'smtp' | 'none';
  readonly error?: string;
}

async function sendSingleEmail(params: SingleEmailParams): Promise<EmailDispatchResult> {
  const { to, subject, html, text, replyTo } = params;

  // Provider 1: Resend API
  if (process.env.RESEND_API_KEY) {
    try {
      const from = process.env.RESEND_FROM || 'WTFearB <onboarding@resend.dev>';
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: replyTo,
          subject,
          html,
          text,
        }),
      });

      if (!res.ok) {
        const errorBody = await res.text();
        console.error('[Mailer Resend Error]', res.status, errorBody);
        return { success: false, provider: 'resend', error: errorBody };
      }

      return { success: true, provider: 'resend' };
    } catch (err: unknown) {
      console.error('[Mailer Resend Exception]', err);
      return {
        success: false,
        provider: 'resend',
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }

  // Provider 2: Gmail SMTP via Nodemailer
  if (process.env.SMTP_PASS) {
    try {
      const user = process.env.SMTP_USER || 'wtfearb@gmail.com';
      const from = process.env.SMTP_FROM || `"WTFearB" <${user}>`;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from,
        to,
        replyTo,
        subject,
        html,
        text,
      });

      return { success: true, provider: 'smtp' };
    } catch (err: unknown) {
      console.error('[Mailer SMTP Exception]', err);
      return {
        success: false,
        provider: 'smtp',
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }

  // Graceful fallback when no mailer credentials are set in development / preview
  console.warn(
    '[Mailer] Neither RESEND_API_KEY nor SMTP_PASS is configured. Skipping email dispatch.'
  );
  return {
    success: false,
    provider: 'none',
    error: 'No mailer credentials configured',
  };
}

export async function sendAuditEmails(
  payload: AuditEmailPayload
): Promise<{ emailDispatched: boolean; results: PromiseSettledResult<EmailDispatchResult>[] }> {
  const timestamp = payload.timestamp || new Date().toISOString();
  const studioEmail = process.env.STUDIO_INBOX_EMAIL || 'wtfearb@gmail.com';

  const sourceTitle = payload.source === 'modal' ? 'Architecture Audit' : 'Technical Brief';

  // 1. Studio Email
  const studioSubject = `[WTFearB] New ${sourceTitle} — ${payload.focusArea} (${payload.email})`;
  const studioText = `WTFearB — Inbound ${sourceTitle}

Reference ID: ${payload.referenceId}
Timestamp: ${timestamp}
Source: ${payload.source === 'modal' ? 'Global Audit Modal' : '/contact Form'}

VISITOR DETAILS:
- Email: ${payload.email}
${payload.name ? `- Name: ${payload.name}` : ''}
${payload.organization ? `- Organization / URL: ${payload.organization}` : ''}

TECHNICAL SCOPE:
- Focus Area / Track: ${payload.focusArea}
- System Stage: ${payload.systemStage}
- Primary Bottleneck / Scope:
${payload.bottleneckDescription}
`;

  const studioHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${studioSubject}</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #F9F9FB; color: #0A0A0C;">
  <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E2E2E8; border-top: 3px solid #C83E1B; padding: 32px;">
    <div style="font-family: monospace; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; color: #C83E1B; margin-bottom: 8px;">
      WTFEARB // INBOUND ${sourceTitle.toUpperCase()}
    </div>
    <h2 style="font-size: 22px; font-weight: 800; margin: 0 0 16px 0; color: #0A0A0C;">
      New ${sourceTitle} Inbound
    </h2>
    <div style="font-family: monospace; font-size: 12px; background: #0C0D10; color: #FFFFFF; padding: 12px 16px; margin-bottom: 24px;">
      <span style="color: #C83E1B;">REF //</span> <strong>${payload.referenceId}</strong> &nbsp;|&nbsp; <span>${timestamp}</span>
    </div>

    <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 24px;">
      <tr>
        <td style="padding: 8px 0; color: #717684; font-family: monospace; font-size: 11px; width: 140px;">EMAIL:</td>
        <td style="padding: 8px 0; font-weight: bold; color: #0A0A0C;"><a href="mailto:${payload.email}" style="color: #0A0A0C; text-decoration: underline;">${payload.email}</a></td>
      </tr>
      ${
        payload.name
          ? `<tr>
        <td style="padding: 8px 0; color: #717684; font-family: monospace; font-size: 11px;">NAME:</td>
        <td style="padding: 8px 0; color: #0A0A0C;">${payload.name}</td>
      </tr>`
          : ''
      }
      ${
        payload.organization
          ? `<tr>
        <td style="padding: 8px 0; color: #717684; font-family: monospace; font-size: 11px;">ORGANIZATION:</td>
        <td style="padding: 8px 0; color: #0A0A0C;">${payload.organization}</td>
      </tr>`
          : ''
      }
      <tr>
        <td style="padding: 8px 0; color: #717684; font-family: monospace; font-size: 11px;">FOCUS / TRACK:</td>
        <td style="padding: 8px 0; font-weight: bold; color: #C83E1B;">${payload.focusArea}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #717684; font-family: monospace; font-size: 11px;">SYSTEM STAGE:</td>
        <td style="padding: 8px 0; color: #0A0A0C;">${payload.systemStage}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #717684; font-family: monospace; font-size: 11px;">ORIGIN:</td>
        <td style="padding: 8px 0; color: #0A0A0C;">${payload.source === 'modal' ? 'Global Header Audit Modal' : '/contact Form'}</td>
      </tr>
    </table>

    <div style="font-family: monospace; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #3F414A; margin-bottom: 8px;">
      PRIMARY SYSTEM BOTTLENECK / SCOPE:
    </div>
    <div style="background: #F9F9FB; border: 1px solid #E2E2E8; padding: 16px; font-size: 13.5px; line-height: 1.6; color: #0A0A0C; white-space: pre-wrap;">
${payload.bottleneckDescription}
    </div>

    <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #E2E2E8; font-family: monospace; font-size: 11px; color: #717684;">
      WTFearB Production Engine • Direct Engineering Inbound
    </div>
  </div>
</body>
</html>
`;

  // 2. Visitor Email
  const visitorSubject = `WTFearB — Your ${sourceTitle} Received [${payload.referenceId}]`;
  const visitorText = `WTFearB — Make "What If" Work.

Hello,

Thank you for submitting your ${sourceTitle.toLowerCase()}. We have recorded your intake under Reference ID: ${payload.referenceId}.

INTAKE SUMMARY:
- Reference ID: ${payload.referenceId}
- Focus Area / Track: ${payload.focusArea}
- System Stage: ${payload.systemStage}
${payload.organization ? `- Organization: ${payload.organization}` : ''}

WHAT HAPPENS NEXT (DISCOVERY PROTOCOL):
01 // Architecture Evaluation
Principal engineers review your problem statement, data boundaries, and technical feasibility.

02 // Technical Scoping Session
Focused working session to align on system topology, integration points, and build vs. blueprint fit.

03 // Written Action Brief & Roadmap
Receive a structured architecture breakdown, milestone plan, and transparent engagement scope.

We evaluate problem statements directly with senior architects—zero sales reps or account layers. If you have immediate questions, simply reply directly to this email or reach us at wtfearb@gmail.com.

— WTFearB Engineering Pod
Make "What If" Work.
https://www.wtfearb.tech
`;

  const visitorHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${visitorSubject}</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #F9F9FB; color: #0A0A0C;">
  <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E2E2E8; border-top: 3px solid #C83E1B; padding: 32px;">
    <div style="font-family: monospace; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; color: #C83E1B; margin-bottom: 8px;">
      • PRINCIPAL ARCHITECTURE REVIEW
    </div>
    <h2 style="font-size: 24px; font-weight: 800; margin: 0 0 12px 0; color: #0A0A0C; letter-spacing: -0.02em;">
      ${sourceTitle} Received
    </h2>
    <p style="font-size: 14px; line-height: 1.6; color: #3F414A; margin: 0 0 20px 0;">
      Your submission has been routed directly to our principal product and AI engineers. We review problem statements, data boundaries, and system feasibility without sales intermediaries.
    </p>

    <!-- Reference ID Banner -->
    <div style="background: #0C0D10; color: #FFFFFF; padding: 14px 18px; font-family: monospace; font-size: 12px; margin-bottom: 24px; display: flex; justify-content: space-between;">
      <span><span style="color: #C83E1B;">REFERENCE ID:</span> <strong>${payload.referenceId}</strong></span>
    </div>

    <!-- Intake Summary Box -->
    <div style="background: #F9F9FB; border: 1px solid #E2E2E8; padding: 16px 20px; margin-bottom: 24px;">
      <div style="font-family: monospace; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #717684; margin-bottom: 12px;">
        INTAKE SUMMARY
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <tr>
          <td style="padding: 6px 0; color: #717684; font-family: monospace; font-size: 11px; width: 140px;">FOCUS / TRACK:</td>
          <td style="padding: 6px 0; font-weight: bold; color: #C83E1B;">${payload.focusArea}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #717684; font-family: monospace; font-size: 11px;">SYSTEM STAGE:</td>
          <td style="padding: 6px 0; color: #0A0A0C;">${payload.systemStage}</td>
        </tr>
        ${
          payload.organization
            ? `<tr>
          <td style="padding: 6px 0; color: #717684; font-family: monospace; font-size: 11px;">ORGANIZATION:</td>
          <td style="padding: 6px 0; color: #0A0A0C;">${payload.organization}</td>
        </tr>`
            : ''
        }
      </table>
    </div>

    <!-- Discovery Protocol -->
    <div style="margin-bottom: 28px;">
      <div style="font-family: monospace; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #0A0A0C; margin-bottom: 12px;">
        DISCOVERY PROTOCOL // WHAT HAPPENS NEXT
      </div>

      <div style="border-left: 2px solid #C83E1B; padding-left: 14px; margin-bottom: 14px;">
        <div style="font-family: monospace; font-size: 11px; font-weight: bold; color: #C83E1B;">01 // Architecture Evaluation</div>
        <div style="font-size: 13px; color: #3F414A; margin-top: 2px;">
          Principal engineers review your problem statement, data boundaries, and technical feasibility.
        </div>
      </div>

      <div style="border-left: 2px solid #0A0A0C; padding-left: 14px; margin-bottom: 14px;">
        <div style="font-family: monospace; font-size: 11px; font-weight: bold; color: #0A0A0C;">02 // Technical Scoping Session</div>
        <div style="font-size: 13px; color: #3F414A; margin-top: 2px;">
          Focused working session to align on system topology, integration points, and build vs. blueprint fit.
        </div>
      </div>

      <div style="border-left: 2px solid #0A0A0C; padding-left: 14px;">
        <div style="font-family: monospace; font-size: 11px; font-weight: bold; color: #0A0A0C;">03 // Written Action Brief & Roadmap</div>
        <div style="font-size: 13px; color: #3F414A; margin-top: 2px;">
          Receive a structured architecture breakdown, milestone plan, and transparent engagement scope.
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding-top: 20px; border-top: 1px solid #E2E2E8; font-size: 12px; line-height: 1.6; color: #717684;">
      <p style="margin: 0 0 8px 0; color: #0A0A0C; font-weight: 600;">
        WTFearB — Make "What If" Work.
      </p>
      <p style="margin: 0 0 8px 0;">
        Principal-led Product &amp; AI Engineering Studio.<br>
        Direct Inquiries: <a href="mailto:wtfearb@gmail.com" style="color: #C83E1B; text-decoration: none;">wtfearb@gmail.com</a> | <a href="https://www.wtfearb.tech" style="color: #0A0A0C;">www.wtfearb.tech</a>
      </p>
    </div>
  </div>
</body>
</html>
`;

  const results = await Promise.allSettled([
    sendSingleEmail({
      to: studioEmail,
      subject: studioSubject,
      html: studioHtml,
      text: studioText,
      replyTo: payload.email,
    }),
    sendSingleEmail({
      to: payload.email,
      subject: visitorSubject,
      html: visitorHtml,
      text: visitorText,
      replyTo: studioEmail,
    }),
  ]);

  const atLeastOneSuccess = results.some(
    (r) => r.status === 'fulfilled' && r.value.success === true
  );

  return {
    emailDispatched: atLeastOneSuccess,
    results,
  };
}
