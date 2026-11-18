import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BLUEPRINT_CATALOG } from '@/lib/state/blueprints-machine';

export const metadata: Metadata = {
  title: 'Production Blueprints Catalog | WTFearB Systems Studio',
  description:
    'Exhaustive architectural blueprints, component topologies, latency targets, and CI verification gates for governed AI agents, multi-tenant SaaS, and distributed event backends.',
  alternates: {
    canonical: '/blueprints',
  },
  openGraph: {
    title: 'Production Blueprints Catalog — WTFearB',
    description:
      'Inspect production-ready architectural monographs: data topologies, verification gates, and code contracts.',
    url: '/blueprints',
    siteName: 'WTFearB Systems Studio',
    type: 'website',
  },
};

export default function BlueprintsIndexPage(): React.ReactElement {
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
              <span className="text-[var(--color-accent-signal)] font-semibold">Blueprints</span>
            </div>

            <div className="max-w-3xl">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-signal)] font-semibold">
                Engineering Blueprints &bull; Verified Architectures
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-ink-primary)] mt-3">
                Production Architecture Catalog.
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[var(--color-ink-secondary)] leading-relaxed">
                Every blueprint represents a battle-tested system architecture with explicit data contracts, verified latency targets, and automated CI-blocking evaluation gates. No hypothetical diagrams or marketing fluff.
              </p>
            </div>
          </div>
        </section>

        {/* Blueprint Catalog Grid */}
        <section className="py-12 md:py-20">
          <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {BLUEPRINT_CATALOG.map((bp) => (
                <article
                  key={bp.id}
                  className="flex flex-col border border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)] p-6 sm:p-8 hover:border-[var(--color-ink-primary)] transition-all group"
                >
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-[var(--color-border-hairline)]">
                    <span className="font-mono text-[11px] font-semibold tracking-wider text-[var(--color-accent-signal)] uppercase">
                      {bp.badge}
                    </span>
                    <span className="font-mono text-[11px] px-2 py-0.5 border border-[var(--color-border-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink-muted)]">
                      {bp.durationLabel}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-[var(--color-ink-primary)] mt-4 group-hover:text-[var(--color-accent-signal)] transition-colors">
                    <Link href={`/blueprints/${bp.id}`}>{bp.title}</Link>
                  </h2>

                  <p className="mt-3 text-xs sm:text-sm text-[var(--color-ink-secondary)] leading-relaxed flex-1">
                    {bp.summary}
                  </p>

                  <div className="mt-6 pt-4 border-t border-[var(--color-border-hairline)]">
                    <div className="text-[11px] font-mono text-[var(--color-ink-muted)] mb-2">
                      <span className="font-semibold text-[var(--color-ink-primary)]">Verification Gate:</span>
                      <p className="text-[11px] text-[var(--color-ink-secondary)] mt-0.5">{bp.verificationGate}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {bp.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] px-1.5 py-0.5 border border-[var(--color-border-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink-secondary)]"
                        >
                          {tech}
                        </span>
                      ))}
                      {bp.stack.length > 4 && (
                        <span className="font-mono text-[10px] px-1.5 py-0.5 text-[var(--color-ink-muted)]">
                          +{bp.stack.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[var(--color-border-hairline)] flex items-center justify-between">
                    <span className="font-mono text-xs text-[var(--color-ink-muted)]">
                      {bp.checklist.length} Verification Steps
                    </span>
                    <Link
                      href={`/blueprints/${bp.id}`}
                      className="inline-flex items-center gap-1 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-signal)] group-hover:underline"
                    >
                      <span>Deep Dive</span>
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
              Need a Custom Architecture Blueprint for Your System?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--color-ink-secondary)] max-w-xl mx-auto">
              Book a 15-Minute Architecture Audit. We will analyze your bottlenecks, evaluate your requirements, and author a custom monograph.
            </p>
            <div className="mt-6">
              <Link
                href="/contact?intent=audit"
                className="inline-flex items-center justify-center px-6 py-3 bg-[var(--color-accent-signal)] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:brightness-110 transition-all"
              >
                <span>Discuss Architecture &amp; Scope</span>
                <span className="ml-2" aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
