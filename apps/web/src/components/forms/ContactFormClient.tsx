'use client';

import React, { useState } from 'react';

export interface ContactFormClientProps {
  readonly initialEngagement?: string;
  readonly initialComplexity?: string;
  readonly initialValidation?: string;
  readonly initialIntent?: string;
}

export function ContactFormClient({
  initialEngagement = '',
  initialComplexity = '',
  initialValidation = '',
  initialIntent = '',
}: ContactFormClientProps): React.ReactElement {
  const isAuditIntent = initialIntent.toLowerCase() === 'audit';
  const hasScopePrefill = Boolean(initialEngagement || initialComplexity || initialValidation);

  const defaultMessage = hasScopePrefill
    ? `I would like to discuss an engagement with the following scope:\n- Engagement Model: ${initialEngagement || 'Custom'}\n- System Profile: ${initialComplexity || 'Custom'}\n- Validation Scope: ${initialValidation || 'Not included'}\n\nProject details: `
    : isAuditIntent
    ? `I would like to book a 15-minute architecture audit to diagnose bottlenecks in our system and explore practical next steps.\n\nSystem details & current stack: `
    : '';

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState(defaultMessage);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const sessionId =
        typeof window !== 'undefined'
          ? localStorage.getItem('wtfear_session_id') || `sess_${Date.now()}`
          : `sess_${Date.now()}`;

      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sessionId,
        },
        body: JSON.stringify({
          workEmail: email,
          email,
          companyDomain: email.includes('@') ? email.split('@')[1] : '',
          bottleneckDescription: `[${isAuditIntent ? 'Architecture Audit' : 'Direct Contact'}: ${name || 'N/A'}] ${message}`,
          systemBottleneck: `[${isAuditIntent ? 'Architecture Audit' : 'Direct Contact'}] ${message}`,
          targetTimeline: isAuditIntent ? 'architecture-audit' : 'contact-inquiry',
          metadata: {
            engagement: initialEngagement || undefined,
            complexity: initialComplexity || undefined,
            validation: initialValidation || undefined,
            intent: initialIntent || undefined,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto text-xl font-bold mb-4">
          ✓
        </div>
        <h2 className="text-2xl font-bold text-[var(--color-ink-primary)]">
          {isAuditIntent ? 'Architecture Audit Request Dispatched' : 'Message Received'}
        </h2>
        <p className="mt-3 text-sm text-[var(--color-ink-secondary)] max-w-md mx-auto leading-relaxed">
          {isAuditIntent
            ? 'Thank you for requesting an architecture audit. A principal systems engineer will review your system context and confirm scheduling details within 4 business hours.'
            : 'Thank you for reaching out. A principal systems engineer will review your inquiry and respond within 4 business hours.'}
        </p>
        <div className="mt-8 font-mono text-xs text-[var(--color-ink-muted)]">
          Direct contact:{' '}
          <a href="mailto:wtfearb@gmail.com" className="text-[var(--color-accent-signal)] underline">
            wtfearb@gmail.com
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-signal)] font-semibold block mb-1">
          {isAuditIntent ? 'Principal Systems Engineering Review' : 'Direct Channel'}
        </span>
        <h2 className="text-xl font-bold text-[var(--color-ink-primary)]">
          {isAuditIntent ? 'Request an Architecture Audit' : 'Send a Technical Brief or Inquiry'}
        </h2>
      </div>

      {hasScopePrefill && (
        <div className="p-4 rounded-[6px] border border-[#F3D5C9] bg-[#FDF4F0]">
          <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#C83E1B] mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B]" />
            CONFIGURED ENGAGEMENT SNAPSHOT
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs">
            <div>
              <span className="text-[#8E95A5] text-[10px] uppercase block">ENGAGEMENT MODEL</span>
              <span className="font-bold text-[#0A0A0C]">{initialEngagement || 'Custom'}</span>
            </div>
            <div>
              <span className="text-[#8E95A5] text-[10px] uppercase block">SYSTEM PROFILE</span>
              <span className="font-bold text-[#0A0A0C]">{initialComplexity || 'Custom'}</span>
            </div>
            <div>
              <span className="text-[#8E95A5] text-[10px] uppercase block">VALIDATION SCOPE</span>
              <span className="font-bold text-[#0A0A0C]">{initialValidation || 'Not included'}</span>
            </div>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="p-3 border border-red-300 bg-red-50 text-red-800 text-xs font-mono">
          {errorMessage}
        </div>
      )}

      <div>
        <label
          htmlFor="contact-name"
          className="block text-xs font-mono uppercase tracking-wider text-[var(--color-ink-primary)] font-semibold mb-2"
        >
          Your Name
        </label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Alex Morgan"
          className="w-full px-3.5 py-2.5 border border-[var(--color-border-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink-primary)] text-sm font-mono focus:outline-none focus:border-[var(--color-accent-signal)]"
        />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="block text-xs font-mono uppercase tracking-wider text-[var(--color-ink-primary)] font-semibold mb-2"
        >
          Work Email Address *
        </label>
        <input
          id="contact-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="alex@acmecorp.com"
          className="w-full px-3.5 py-2.5 border border-[var(--color-border-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink-primary)] text-sm font-mono focus:outline-none focus:border-[var(--color-accent-signal)]"
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-xs font-mono uppercase tracking-wider text-[var(--color-ink-primary)] font-semibold mb-2"
        >
          {isAuditIntent ? 'Architecture Bottleneck & System Overview *' : 'Project Scope or Architecture Inquiry *'}
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            isAuditIntent
              ? 'Tell us about the architecture challenge, latency bottlenecks, hallucination risks, or scaling limits you are facing...'
              : 'Tell us about the system you need to build, your current stack, or the technical bottleneck you are facing...'
          }
          className="w-full px-3.5 py-2.5 border border-[var(--color-border-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink-primary)] text-sm font-mono focus:outline-none focus:border-[var(--color-accent-signal)]"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center px-6 py-3.5 bg-[var(--color-accent-signal)] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:brightness-110 transition-all disabled:opacity-50 cursor-pointer"
      >
        {isSubmitting
          ? 'Transmitting...'
          : isAuditIntent
          ? 'Request Architecture Review →'
          : 'Send Message to Engineering Pod →'}
      </button>
    </form>
  );
}
