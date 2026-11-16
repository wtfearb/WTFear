import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getPortfolioProjects, getSiteSettings } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Engineering Portfolio & Case Studies | WTFearB Systems Studio',
  description:
    'Production case studies and systems monographs delivered by WTFearB: Governed AI agents, high-concurrency SaaS portals, and distributed event pipelines.',
  alternates: {
    canonical: 'https://wtfear.agency/projects',
  },
  openGraph: {
    title: 'Engineering Portfolio & Production Case Studies — WTFearB',
    description:
      'Explore 10 production system monographs with real architectures, code contracts, and measured outcomes.',
    url: 'https://wtfear.agency/projects',
    siteName: 'WTFearB Systems Studio',
    type: 'website',
  },
};

export default async function ProjectsIndexPage(): Promise<React.ReactElement> {
  const [projects, siteSettings] = await Promise.all([
    getPortfolioProjects(true),
    getSiteSettings(),
  ]);

  const isEmpty = siteSettings.portfolioDisplayMode === 'coming_soon_empty_state';

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
              <span className="text-[var(--color-accent-signal)] font-semibold">Projects</span>
            </div>

            <div className="max-w-3xl">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-signal)] font-semibold">
                Case Studies &bull; Systems Monographs
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-ink-primary)] mt-3">
                Production Engineering Case Studies.
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[var(--color-ink-secondary)] leading-relaxed">
                Representative systems architectures, technical specifications, and measured production outcomes delivered by our embedded senior engineering pods.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 md:py-20">
          <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
            {isEmpty ? (
              <div className="border border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)] p-8 sm:p-12 text-center max-w-2xl mx-auto">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-signal)] font-semibold">
                  Client Confidentiality &bull; NDA Protection
                </span>
                <h2 className="text-2xl font-bold text-[var(--color-ink-primary)] mt-3">
                  Production Case Studies Under Direct Preparation
                </h2>
                <p className="mt-4 text-sm text-[var(--color-ink-secondary)] leading-relaxed">
                  We respect our clients&apos; proprietary intellectual property. Sanitised architecture monographs, latency benchmarks, and verified code patterns are currently being prepared for public release.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/audit"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 bg-[var(--color-accent-signal)] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:brightness-110"
                  >
                    <span>Request Confidential Architecture Walkthrough</span>
                    <span className="ml-2">&rarr;</span>
                  </Link>
                  <Link
                    href="/blueprints"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 border border-[var(--color-border-hairline)] text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[var(--color-canvas)]"
                  >
                    View Open Blueprints
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border-hairline)]">
                  <span className="font-mono text-xs text-[var(--color-ink-muted)]">
                    Showing <strong className="text-[var(--color-ink-primary)]">{projects.length}</strong> Production Case Studies
                  </span>
                  <span className="font-mono text-xs text-[var(--color-accent-signal)]">
                    100% Client GitHub Ownership
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {projects.map((project) => {
                    const stack = Array.isArray(project.stackTags)
                      ? (project.stackTags as string[])
                      : [];

                    return (
                      <article
                        key={project.id}
                        className="flex flex-col border border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)] p-6 sm:p-8 hover:border-[var(--color-ink-primary)] transition-all group"
                      >
                        <div className="flex items-center justify-between gap-4 pb-4 border-b border-[var(--color-border-hairline)]">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[var(--color-accent-signal)]">
                              [{String(project.indexNumber).padStart(2, '0')}]
                            </span>
                            <span className="font-mono text-xs text-[var(--color-ink-muted)] uppercase tracking-wider">
                              {project.industry}
                            </span>
                          </div>
                          <span className="font-mono text-[11px] px-2 py-0.5 border border-[var(--color-border-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink-secondary)]">
                            {project.category}
                          </span>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-ink-primary)] mt-4 group-hover:text-[var(--color-accent-signal)] transition-colors">
                          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                        </h2>

                        <p className="mt-3 text-sm text-[var(--color-ink-secondary)] leading-relaxed flex-1">
                          {project.summary}
                        </p>

                        <div className="mt-6 pt-4 border-t border-[var(--color-border-hairline)]">
                          <div className="text-xs font-mono text-emerald-800 bg-emerald-50/50 p-2.5 border border-emerald-200/60 mb-4">
                            <span className="font-bold text-emerald-950">Outcome:</span> {project.outcomesSummary}
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {stack.map((t) => (
                              <span
                                key={t}
                                className="font-mono text-[11px] px-2 py-0.5 border border-[var(--color-border-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink-secondary)]"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-[var(--color-border-hairline)] flex items-center justify-between">
                          <span className="font-mono text-xs text-[var(--color-ink-muted)]">
                            Architecture Monograph
                          </span>
                          <Link
                            href={`/projects/${project.slug}`}
                            className="inline-flex items-center gap-1 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-signal)] group-hover:underline"
                          >
                            <span>Read Monograph</span>
                            <span aria-hidden="true">&rarr;</span>
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Global Bottom CTA */}
        <section className="py-16 border-t border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)]">
          <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-ink-primary)]">
              Ready to Ship Your System in a 2-Week Sprint?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--color-ink-secondary)] max-w-xl mx-auto">
              We eliminate technical ambiguity with concrete architecture, fixed scope, and guaranteed deliverables.
            </p>
            <div className="mt-6">
              <Link
                href="/audit"
                className="inline-flex items-center justify-center px-6 py-3 bg-[var(--color-accent-signal)] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:brightness-110 transition-all"
              >
                <span>Book 15-Min Architecture Audit</span>
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
