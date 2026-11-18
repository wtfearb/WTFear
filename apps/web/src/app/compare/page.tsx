import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Engineering Comparisons & Operational Tradeoffs | WTFearB',
  description:
    'Architectural and cost comparisons: WTFearB embedded senior pods vs traditional agencies, full-time hiring, and no-code tools.',
  alternates: {
    canonical: '/compare',
  },
  openGraph: {
    title: 'Engineering Comparisons & Operational Tradeoffs — WTFearB',
    description:
      'Evaluate engineering tradeoffs: Delivery cadence, AI hallucination risk, IP ownership, and burn rate.',
    url: '/compare',
    siteName: 'WTFearB Systems Studio',
    type: 'website',
  },
};

const COMPARISON_INDEX = [
  {
    slug: 'traditional-dev-agencies',
    title: 'WTFearB vs. Traditional Dev Agencies & Consultancies',
    subtitle: 'Why senior engineering pods with CI-blocking eval gates outperform 6-month agency retainers.',
    summary:
      'Contrast fixed-price 2-week sprints and 100% Day-1 client GitHub ownership against open-ended hourly retainers and off-shore contractor delegation.',
    keyMetric: '14-Day Delivery vs. 6-Month Retainers',
  },
  {
    slug: 'in-house-hiring',
    title: 'WTFearB Engineering Pod vs. In-House Full-Time Hiring',
    subtitle: 'How to bypass the 4-month hiring lag and ship production AI agents this sprint.',
    summary:
      'Compare an immediate embedded senior pod against $65k recruiting fees, 120-day recruiting lags, and full-time equity/severance overhead.',
    keyMetric: '$0 Recruiting Lag vs. 120 Days Sourcing',
  },
  {
    slug: 'no-code-wrappers',
    title: 'WTFearB Custom Systems vs. No-Code AI Wrappers',
    subtitle: 'Why mission-critical production workflows require code-governed schemas and CI test harnesses.',
    summary:
      'See why production systems require PostgreSQL RLS, pgvector HNSW hybrid search, and Pydantic validation over brittle Zapier or Bubble scripts.',
    keyMetric: 'Sub-45ms Code vs. Fragile Multi-Second Wrappers',
  },
];

export default function CompareIndexPage(): React.ReactElement {
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
              <span className="text-[var(--color-accent-signal)] font-semibold">Compare</span>
            </div>

            <div className="max-w-3xl">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-signal)] font-semibold">
                Architectural Tradeoff Analysis &bull; Objective Criteria
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-ink-primary)] mt-3">
                Engineering Model Comparisons.
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[var(--color-ink-secondary)] leading-relaxed">
                Choosing the right engineering execution vehicle determines whether your system ships to production this month or stalls in development purgatory.
              </p>
            </div>
          </div>
        </section>

        {/* Index Cards */}
        <section className="py-12 md:py-20">
          <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {COMPARISON_INDEX.map((item, idx) => (
                <article
                  key={item.slug}
                  className="flex flex-col border border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)] p-6 sm:p-8 hover:border-[var(--color-ink-primary)] transition-all group"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border-hairline)]">
                    <span className="font-mono text-xs font-bold text-[var(--color-accent-signal)]">
                      COMPARISON [{String(idx + 1).padStart(2, '0')}]
                    </span>
                    <span className="font-mono text-[11px] px-2 py-0.5 border border-[var(--color-border-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink-muted)]">
                      TRADE-OFF
                    </span>
                  </div>

                  <h2 className="text-xl font-bold tracking-tight text-[var(--color-ink-primary)] mt-4 group-hover:text-[var(--color-accent-signal)] transition-colors">
                    <Link href={`/compare/${item.slug}`}>{item.title}</Link>
                  </h2>

                  <p className="mt-3 text-xs sm:text-sm text-[var(--color-ink-secondary)] leading-relaxed flex-1">
                    {item.summary}
                  </p>

                  <div className="mt-6 pt-4 border-t border-[var(--color-border-hairline)]">
                    <div className="font-mono text-xs text-emerald-800 bg-emerald-50/50 p-2.5 border border-emerald-200/60 mb-4">
                      <span className="font-bold">Key Delta:</span> {item.keyMetric}
                    </div>

                    <Link
                      href={`/compare/${item.slug}`}
                      className="inline-flex items-center gap-1 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-signal)] group-hover:underline"
                    >
                      <span>Read Full Architectural Matrix</span>
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Global Bottom CTA */}
        <section className="py-16 border-t border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)]">
          <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-ink-primary)]">
              Evaluate Your Specific Architecture with Our Team.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--color-ink-secondary)] max-w-xl mx-auto">
              Book a 15-Minute Architecture Audit. We will analyze your engineering roadmap and give you an honest technical assessment.
            </p>
            <div className="mt-6">
              <Link
                href="/contact?intent=audit"
                className="inline-flex items-center justify-center px-6 py-3 bg-[var(--color-accent-signal)] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:brightness-110 transition-all"
              >
                <span>Discuss Architecture &amp; Scope</span>
                <span className="ml-2">&rarr;</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
