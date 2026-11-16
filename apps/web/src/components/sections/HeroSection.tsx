'use client';

import React from 'react';
import Link from 'next/link';
import { useAuditModal } from '../modals/AuditModalProvider';

export function HeroSection(): React.ReactElement {
  const { openModal } = useAuditModal();

  return (
    <section aria-labelledby="hero-title" className="relative border-b border-[var(--color-border-hairline)] pt-12 pb-16 md:pt-20 md:pb-24">
      <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
        {/* Direct Definition Lead (<dfn> + <dl>) for AEO crawlers */}
        <div className="mb-6 p-4 border border-[var(--color-border-hairline)] bg-[var(--color-surface-subtle)]">
          <dl className="font-mono text-xs text-[var(--color-ink-secondary)] leading-relaxed">
            <dt className="inline font-bold text-[var(--color-ink-primary)]">
              <dfn>wtfear (Product &amp; AI Engineering Studio)</dfn>:
            </dt>{' '}
            <dd className="inline">
              A specialized senior systems engineering pod that builds and deploys governed AI agents, Next.js 15 web applications, and distributed event pipelines in deterministic 2-week sprints with 100% client GitHub IP ownership and sub-second Core Web Vitals.
            </dd>
          </dl>
        </div>

        {/* Studio Badge */}
        <div className="inline-flex items-center gap-2 border border-[var(--color-border-hairline)] bg-[var(--color-surface-elevated)] px-3 py-1 font-mono text-xs uppercase tracking-widest text-[var(--color-accent-signal)] mb-6 font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-signal)] animate-pulse" />
          <span>PRODUCTION-GRADE AI &amp; PRODUCT ENGINEERING</span>
        </div>

        {/* Main Headline */}
        <h1
          id="hero-title"
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--color-ink-primary)] leading-[1.04] max-w-5xl"
        >
          Ship Governed AI Agents &amp; Production Software in 2-Week Sprints.
        </h1>

        {/* Secondary Subhead */}
        <p className="mt-6 text-lg sm:text-xl text-[var(--color-ink-secondary)] max-w-3xl leading-relaxed">
          Zero marketing fluff. No junior contractors. Just two embedded senior engineers shipping deterministic RAG pipelines, FastAPI backends, and Next.js 15 apps directly to your GitHub organization with CI-blocking golden evaluation gates.
        </p>

        {/* Call to Action Group */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={openModal}
            className="inline-flex items-center justify-center bg-[var(--color-ink-primary)] text-white px-6 py-3.5 font-mono text-xs font-semibold hover:bg-[var(--color-accent-signal)] transition-colors"
          >
            BOOK 15-MIN ARCHITECTURE AUDIT ($0) &rarr;
          </button>

          <Link
            href="#sandbox"
            className="inline-flex items-center justify-center border border-[var(--color-border-strong)] bg-[var(--color-surface-elevated)] text-[var(--color-ink-primary)] px-6 py-3.5 font-mono text-xs font-semibold hover:border-[var(--color-ink-primary)] transition-colors"
          >
            TEST RAG GOVERNANCE LIVE [SANDBOX]
          </Link>
        </div>

        {/* Quantitative Proof Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-[var(--color-border-hairline)] pt-8">
          <div className="border border-[var(--color-border-hairline)] p-4 bg-[var(--color-surface-elevated)]">
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[var(--color-ink-primary)]">
              14 Days
            </div>
            <div className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-muted)] mt-1">
              Rapid Sprint Cadence
            </div>
          </div>

          <div className="border border-[var(--color-border-hairline)] p-4 bg-[var(--color-surface-elevated)]">
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[var(--color-ink-primary)]">
              100%
            </div>
            <div className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-muted)] mt-1">
              Client GitHub IP Ownership
            </div>
          </div>

          <div className="border border-[var(--color-border-hairline)] p-4 bg-[var(--color-surface-elevated)]">
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[var(--color-accent-signal)]">
              0.00%
            </div>
            <div className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-muted)] mt-1">
              Uncited Autonomous Actions
            </div>
          </div>

          <div className="border border-[var(--color-border-hairline)] p-4 bg-[var(--color-surface-elevated)]">
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[var(--color-ink-primary)]">
              &lt; 1.2s
            </div>
            <div className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-muted)] mt-1">
              LCP Performance Target
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
