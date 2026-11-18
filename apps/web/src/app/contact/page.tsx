import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContactFormClient } from '@/components/forms/ContactFormClient';

export const metadata: Metadata = {
  title: 'Contact & Project Inquiry | WTFearB',
  description: 'Start a technical conversation or scope an engineering engagement with WTFearB.',
  alternates: {
    canonical: '/contact',
  },
};

interface ContactPageProps {
  searchParams: Promise<{
    engagement?: string;
    complexity?: string;
    validation?: string;
    intent?: string;
  }>;
}

export default async function ContactPage({
  searchParams,
}: ContactPageProps): Promise<React.ReactElement> {
  const params = await searchParams;

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
              {/* Form Column - Synchronous SSR with Zero Suspense Fallback */}
              <div className="lg:col-span-7 border border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)] p-6 sm:p-10 shadow-xs">
                <ContactFormClient
                  initialEngagement={params.engagement}
                  initialComplexity={params.complexity}
                  initialValidation={params.validation}
                  initialIntent={params.intent}
                />
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
                      href="/contact?intent=audit"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-primary)] hover:text-[var(--color-accent-signal)] underline"
                    >
                      <span>Discuss Architecture &amp; Scope</span>
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
