'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function AuditPage(): React.ReactElement {
  const [email, setEmail] = useState('');
  const [companyDomain, setCompanyDomain] = useState('');
  const [targetTimeline, setTargetTimeline] = useState('2-week-sprint');
  const [bottleneck, setBottleneck] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const sessionId = typeof window !== 'undefined'
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
          companyDomain: companyDomain || (email.includes('@') ? email.split('@')[1] : ''),
          bottleneckDescription: bottleneck,
          systemBottleneck: bottleneck,
          targetTimeline,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit audit request.');
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-ink-primary)] selection:bg-[var(--color-accent-signal)] selection:text-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Editorial Header */}
        <section className="py-12 md:py-16 border-b border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)]">
          <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-ink-muted)] mb-4">
              <Link href="/" className="hover:text-[var(--color-ink-primary)] underline decoration-[var(--color-border-hairline)]">
                Home
              </Link>
              <span>/</span>
              <span className="text-[var(--color-accent-signal)] font-semibold">Audit</span>
            </div>

            <div className="max-w-3xl">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-signal)] font-semibold">
                Principal Systems Engineering Review &bull; 15 Minutes
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-ink-primary)] mt-3">
                Book an Architecture Audit.
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[var(--color-ink-secondary)] leading-relaxed">
                Zero sales reps. Talk directly with our principal engineers. We review your data topology, diagnose latency or hallucination bottlenecks, and provide a fixed-scope sprint roadmap.
              </p>
            </div>
          </div>
        </section>

        {/* Audit Form Section */}
        <section className="py-12 md:py-20">
          <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Form Column */}
              <div className="lg:col-span-7 border border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)] p-6 sm:p-10 shadow-xs">
                {isSuccess ? (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto text-xl font-bold mb-4">
                      ✓
                    </div>
                    <h2 className="text-2xl font-bold text-[var(--color-ink-primary)]">
                      Architecture Audit Request Dispatched
                    </h2>
                    <p className="mt-3 text-sm text-[var(--color-ink-secondary)] max-w-md mx-auto leading-relaxed">
                      Our principal systems engineering pod has received your technical brief. We will review your domain requirements and respond within 4 business hours with calendar access and an initial assessment.
                    </p>
                    <div className="mt-8 font-mono text-xs text-[var(--color-ink-muted)]">
                      Direct contact: <a href="mailto:wtfearb@gmail.com" className="text-[var(--color-accent-signal)] underline">wtfearb@gmail.com</a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-signal)] font-semibold block mb-1">
                        System Assessment Intake
                      </span>
                      <h2 className="text-xl font-bold text-[var(--color-ink-primary)]">
                        Technical Scope &amp; Bottleneck Brief
                      </h2>
                    </div>

                    {errorMessage && (
                      <div className="p-3 border border-red-300 bg-red-50 text-red-800 text-xs font-mono">
                        {errorMessage}
                      </div>
                    )}

                    <div>
                      <label htmlFor="audit-email" className="block text-xs font-mono uppercase tracking-wider text-[var(--color-ink-primary)] font-semibold mb-2">
                        Work Email Address *
                      </label>
                      <input
                        id="audit-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@acmecorp.com"
                        className="w-full px-3.5 py-2.5 border border-[var(--color-border-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink-primary)] text-sm font-mono focus:outline-none focus:border-[var(--color-accent-signal)]"
                      />
                    </div>

                    <div>
                      <label htmlFor="audit-domain" className="block text-xs font-mono uppercase tracking-wider text-[var(--color-ink-primary)] font-semibold mb-2">
                        Company or Project Domain
                      </label>
                      <input
                        id="audit-domain"
                        type="text"
                        value={companyDomain}
                        onChange={(e) => setCompanyDomain(e.target.value)}
                        placeholder="acmecorp.com"
                        className="w-full px-3.5 py-2.5 border border-[var(--color-border-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink-primary)] text-sm font-mono focus:outline-none focus:border-[var(--color-accent-signal)]"
                      />
                    </div>

                    <div>
                      <label htmlFor="audit-timeline" className="block text-xs font-mono uppercase tracking-wider text-[var(--color-ink-primary)] font-semibold mb-2">
                        Target Execution Timeline
                      </label>
                      <select
                        id="audit-timeline"
                        value={targetTimeline}
                        onChange={(e) => setTargetTimeline(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-[var(--color-border-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink-primary)] text-sm font-mono focus:outline-none focus:border-[var(--color-accent-signal)]"
                      >
                        <option value="2-week-sprint">Rapid 2-Week Sprint (Production AI Subsystem / Feature)</option>
                        <option value="4-week-mvp">2 to 4-Week Production MVP (Full Web App + Runtime)</option>
                        <option value="dedicated-pod">Dedicated Engineering Pod (Continuous Monthly Velocity)</option>
                        <option value="exploratory">Exploratory Technical Feasibility Audit</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="audit-bottleneck" className="block text-xs font-mono uppercase tracking-wider text-[var(--color-ink-primary)] font-semibold mb-2">
                        Current System Bottleneck or What If Ambition *
                      </label>
                      <textarea
                        id="audit-bottleneck"
                        required
                        rows={4}
                        value={bottleneck}
                        onChange={(e) => setBottleneck(e.target.value)}
                        placeholder="E.g., RAG support agent hallucinates custom SLA addenda; need deterministic Pydantic citation gates, pgvector HNSW hybrid search, and CI evaluation suite..."
                        className="w-full px-3.5 py-2.5 border border-[var(--color-border-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink-primary)] text-sm font-mono focus:outline-none focus:border-[var(--color-accent-signal)]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center px-6 py-3.5 bg-[var(--color-accent-signal)] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:brightness-110 transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? 'Evaluating & Submitting...' : 'Dispatch Architecture Audit Request →'}
                    </button>
                  </form>
                )}
              </div>

              {/* Monograph Side Column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="border border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)] p-6 sm:p-8">
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-muted)] font-semibold block mb-2">
                    What Happens On The Audit
                  </span>
                  <h3 className="text-lg font-bold text-[var(--color-ink-primary)] mb-4">
                    15 Minutes &bull; Direct Principal Review
                  </h3>
                  <ul className="space-y-3 text-xs sm:text-sm text-[var(--color-ink-secondary)]">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-[var(--color-accent-signal)]">01.</span>
                      <span>Review current repository topology, latency logs, and failure modes.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-[var(--color-accent-signal)]">02.</span>
                      <span>Identify vector database, RAG grounding, or connection pooling bottlenecks.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-[var(--color-accent-signal)]">03.</span>
                      <span>Define exact 2-week sprint boundaries and fixed pricing guarantee.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-[var(--color-accent-signal)]">04.</span>
                      <span>Deliver written Architecture Monograph and CI evaluation checklist.</span>
                    </li>
                  </ul>
                </div>

                <div className="border border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)] p-6 sm:p-8 font-mono text-xs space-y-3">
                  <div className="text-[var(--color-accent-signal)] font-semibold uppercase tracking-wider">
                    // Guaranteed Engineering Commitments
                  </div>
                  <div className="text-[var(--color-ink-secondary)]">
                    &bull; 100% Client GitHub Organization IP Ownership
                  </div>
                  <div className="text-[var(--color-ink-secondary)]">
                    &bull; Zero junior contractor handoffs (Principal-only pod)
                  </div>
                  <div className="text-[var(--color-ink-secondary)]">
                    &bull; Fixed-price deterministic sprint scopes
                  </div>
                  <div className="pt-3 border-t border-[var(--color-border-hairline)] text-[var(--color-ink-muted)]">
                    Email: <a href="mailto:wtfearb@gmail.com" className="text-[var(--color-accent-signal)] underline">wtfearb@gmail.com</a>
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
