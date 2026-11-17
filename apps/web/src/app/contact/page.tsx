'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

function ContactFormInner(): React.ReactElement {
  const searchParams = useSearchParams();
  const engagementParam = searchParams.get('engagement') || '';
  const complexityParam = searchParams.get('complexity') || '';
  const validationParam = searchParams.get('validation') || '';

  const hasScopePrefill = Boolean(engagementParam || complexityParam || validationParam);

  const initialMessage = hasScopePrefill
    ? `I would like to discuss an engagement with the following scope:\n- Engagement Model: ${engagementParam || 'Custom'}\n- System Profile: ${complexityParam || 'Custom'}\n- Validation Scope: ${validationParam || 'Not included'}\n\nProject details: `
    : '';

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState(initialMessage);
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
          bottleneckDescription: `[Direct Contact: ${name || 'N/A'}] ${message}`,
          systemBottleneck: `[Direct Contact] ${message}`,
          targetTimeline: 'contact-inquiry',
          metadata: {
            engagement: engagementParam || undefined,
            complexity: complexityParam || undefined,
            validation: validationParam || undefined,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit message.');
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
        <h2 className="text-2xl font-bold text-[var(--color-ink-primary)]">Message Received</h2>
        <p className="mt-3 text-sm text-[var(--color-ink-secondary)] max-w-md mx-auto leading-relaxed">
          Thank you for reaching out. A principal systems engineer will review your inquiry and
          respond within 4 business hours.
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
          Direct Channel
        </span>
        <h2 className="text-xl font-bold text-[var(--color-ink-primary)]">
          Send a Technical Brief or Inquiry
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
              <span className="font-bold text-[#0A0A0C]">{engagementParam || 'Custom'}</span>
            </div>
            <div>
              <span className="text-[#8E95A5] text-[10px] uppercase block">SYSTEM PROFILE</span>
              <span className="font-bold text-[#0A0A0C]">{complexityParam || 'Custom'}</span>
            </div>
            <div>
              <span className="text-[#8E95A5] text-[10px] uppercase block">VALIDATION SCOPE</span>
              <span className="font-bold text-[#0A0A0C]">{validationParam || 'Not included'}</span>
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
          Project Scope or Architecture Inquiry *
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about the system you need to build, your current stack, or the technical bottleneck you are facing..."
          className="w-full px-3.5 py-2.5 border border-[var(--color-border-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink-primary)] text-sm font-mono focus:outline-none focus:border-[var(--color-accent-signal)]"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center px-6 py-3.5 bg-[var(--color-accent-signal)] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:brightness-110 transition-all disabled:opacity-50 cursor-pointer"
      >
        {isSubmitting ? 'Transmitting...' : 'Send Message to Engineering Pod →'}
      </button>
    </form>
  );
}

export default function ContactPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-ink-primary)] selection:bg-[var(--color-accent-signal)] selection:text-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Editorial Header */}
        <section className="py-12 md:py-16 border-b border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)]">
          <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-ink-muted)] mb-4">
              <Link
                href="/"
                className="hover:text-[var(--color-ink-primary)] underline decoration-[var(--color-border-hairline)]"
              >
                Home
              </Link>
              <span>/</span>
              <span className="text-[var(--color-accent-signal)] font-semibold">Contact</span>
            </div>

            <div className="max-w-3xl">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-signal)] font-semibold">
                Direct Engineering Inquiries &bull; Zero Gatekeepers
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-ink-primary)] mt-3">
                Contact WTFearB.
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[var(--color-ink-secondary)] leading-relaxed">
                Connect directly with our senior engineering team. Whether you need a 2-week rapid
                sprint, a custom system monograph, or technical due diligence, your message reaches
                principal engineers directly.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content Grid */}
        <section className="py-12 md:py-20">
          <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Form Column */}
              <div className="lg:col-span-7 border border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)] p-6 sm:p-10 shadow-xs">
                <Suspense
                  fallback={
                    <div className="py-12 text-center font-mono text-xs text-[var(--color-ink-muted)]">
                      Loading inquiry form...
                    </div>
                  }
                >
                  <ContactFormInner />
                </Suspense>
              </div>

              {/* Direct Info Column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="border border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)] p-6 sm:p-8">
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-muted)] font-semibold block mb-2">
                    Studio Communications
                  </span>
                  <h3 className="text-lg font-bold text-[var(--color-ink-primary)] mb-4">
                    Direct Email &amp; Response SLA
                  </h3>
                  <div className="space-y-4 text-sm text-[var(--color-ink-secondary)]">
                    <div>
                      <span className="font-mono text-xs text-[var(--color-ink-muted)] block">
                        PRIMARY INBOX
                      </span>
                      <a
                        href="mailto:wtfearb@gmail.com"
                        className="font-mono text-sm font-bold text-[var(--color-accent-signal)] hover:underline"
                      >
                        wtfearb@gmail.com
                      </a>
                    </div>
                    <div>
                      <span className="font-mono text-xs text-[var(--color-ink-muted)] block">
                        RESPONSE SLA
                      </span>
                      <p className="font-mono text-xs text-[var(--color-ink-primary)] mt-0.5">
                        &lt; 4 hours during business days (EST / UTC)
                      </p>
                    </div>
                    <div>
                      <span className="font-mono text-xs text-[var(--color-ink-muted)] block">
                        STRUCTURE
                      </span>
                      <p className="font-mono text-xs text-[var(--color-ink-primary)] mt-0.5">
                        Embedded Senior Engineering Pod (Zero junior delegation)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)] p-6 sm:p-8 font-mono text-xs space-y-3">
                  <div className="text-[var(--color-accent-signal)] font-semibold uppercase tracking-wider">
                    // Prefer A Direct Architecture Call?
                  </div>
                  <p className="text-[var(--color-ink-secondary)] leading-relaxed">
                    Skip email back-and-forth and book a focused 15-minute technical audit directly
                    with our systems engineers.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/audit"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-primary)] hover:text-[var(--color-accent-signal)] underline"
                    >
                      <span>Book Architecture Audit Now</span>
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
