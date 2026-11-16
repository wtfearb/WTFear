'use client';

import React from 'react';
import Link from 'next/link';
import { useAuditModal } from '../modals/AuditModalProvider';
import { trackClientEvent } from '../TelemetryTracker';

export function FinalCtaSection(): React.ReactElement {
  const { openModal } = useAuditModal();

  const handleAuditClick = () => {
    trackClientEvent('cta_click', 'Final CTA: Book a 15-Minute Architecture Audit');
    openModal();
  };

  const handleContactClick = () => {
    trackClientEvent('cta_click', 'Final CTA: Get in Touch');
  };

  return (
    <section
      id="audit"
      aria-labelledby="cta-heading"
      className="py-20 md:py-28 border-b border-[var(--color-border-hairline)] bg-[var(--color-surface-pure)]"
    >
      <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 border border-[var(--color-border-hairline)] bg-[var(--color-canvas)] px-3 py-1 font-mono text-xs uppercase tracking-widest text-[var(--color-accent-signal)] font-semibold mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-signal)] animate-pulse" />
          <span>ZERO-SALES TECHNICAL DIAGNOSIS</span>
        </div>

        <h2
          id="cta-heading"
          className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-ink-primary)] max-w-4xl mx-auto leading-tight"
        >
          Have a Complex Problem Worth Solving?
        </h2>

        <p className="mt-6 text-lg text-[var(--color-ink-secondary)] max-w-2xl mx-auto leading-relaxed">
          Book a 15-minute diagnosis directly with a Principal Systems Engineer. We inspect your bottleneck, evaluate technical feasibility, and give you a fixed-scope roadmap with zero sales pitch.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleAuditClick}
            className="inline-flex items-center justify-center bg-[var(--color-ink-primary)] text-white px-8 py-4 font-mono text-xs font-semibold hover:bg-[var(--color-accent-signal)] transition-colors shadow-sm"
          >
            Book a 15-Minute Architecture Audit ($0) &rarr;
          </button>

          <Link
            href="/contact"
            onClick={handleContactClick}
            className="inline-flex items-center justify-center border border-[var(--color-border-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink-primary)] px-8 py-4 font-mono text-xs font-semibold hover:border-[var(--color-ink-primary)] transition-colors"
          >
            Get in Touch &rarr;
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--color-border-hairline)] max-w-2xl mx-auto flex flex-wrap items-center justify-around gap-4 font-mono text-xs text-[var(--color-ink-muted)]">
          <span>✓ Direct Principal Consultation</span>
          <span>✓ Zero Sales Representatives</span>
          <span>✓ 100% Client GitHub IP Ownership</span>
        </div>
      </div>
    </section>
  );
}
