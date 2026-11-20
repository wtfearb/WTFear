import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContactFormClient } from '@/components/forms/ContactFormClient';

export const metadata: Metadata = {
  title: 'Architecture Review & Project Inquiry',
  description:
    'Direct technical bottleneck diagnosis with a Principal Systems Engineer. Zero sales reps, mathematically bounded deliverables.',
  alternates: {
    canonical: '/audit',
  },
  openGraph: {
    title: 'Architecture Review & Project Inquiry',
    description:
      'Direct technical bottleneck diagnosis with a Principal Systems Engineer. Zero sales reps, mathematically bounded deliverables.',
    url: '/audit',
    siteName: 'WTFearB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Architecture Review & Project Inquiry',
    description:
      'Direct technical bottleneck diagnosis with a Principal Systems Engineer. Zero sales reps, mathematically bounded deliverables.',
  },
};

export default function AuditPage(): React.ReactElement {
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
                Zero sales reps. Talk directly with our principal engineers. We review your data
                topology, diagnose latency or hallucination bottlenecks, and outline a practical
                engineering approach.
              </p>
            </div>
          </div>
        </section>

        {/* Audit Form Section */}
        <section className="py-12 md:py-20">
          <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Form Column - Synchronous SSR */}
              <div className="lg:col-span-7 border border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)] p-6 sm:p-10 shadow-xs">
                <ContactFormClient initialIntent="audit" />
              </div>

              {/* Direct Info Column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="border border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)] p-6 sm:p-8">
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-muted)] font-semibold block mb-2">
                    Direct Diagnostic Channel
                  </span>
                  <h3 className="text-lg font-bold text-[var(--color-ink-primary)] mb-4">
                    Audit Deliverables &amp; Invariants
                  </h3>
                  <div className="space-y-4 text-sm text-[var(--color-ink-secondary)]">
                    <div>
                      <span className="font-mono text-xs text-[var(--color-ink-muted)] block">
                        PARTICIPANTS
                      </span>
                      <p className="font-mono text-xs text-[var(--color-ink-primary)] mt-0.5">
                        Principal Full-Stack &amp; AI Systems Engineer (Never a salesperson)
                      </p>
                    </div>
                    <div>
                      <span className="font-mono text-xs text-[var(--color-ink-muted)] block">
                        OUTPUT
                      </span>
                      <p className="font-mono text-xs text-[var(--color-ink-primary)] mt-0.5">
                        Bottleneck diagnosis, data topology review, and realistic milestone scope
                      </p>
                    </div>
                    <div>
                      <span className="font-mono text-xs text-[var(--color-ink-muted)] block">
                        TURNAROUND
                      </span>
                      <p className="font-mono text-xs text-[var(--color-ink-primary)] mt-0.5">
                        Direct scheduling link provided within 4 business hours
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)] p-6 sm:p-8 font-mono text-xs space-y-3">
                  <div className="text-[var(--color-accent-signal)] font-semibold uppercase tracking-wider">
                    // Direct Email Channel
                  </div>
                  <p className="text-[var(--color-ink-secondary)] leading-relaxed">
                    Have an existing architecture document or codebase you prefer to share
                    asynchronously?
                  </p>
                  <div className="pt-2">
                    <a
                      href="mailto:wtfearb@gmail.com"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-signal)] hover:underline"
                    >
                      <span>wtfearb@gmail.com</span>
                      <span aria-hidden="true">&rarr;</span>
                    </a>
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
