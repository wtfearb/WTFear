import React from 'react';
import Link from 'next/link';
import { getPortfolioProjects, getSiteSettings } from '@/lib/db';

export async function ProjectsPreviewSection(): Promise<React.ReactElement> {
  const [projects, settings] = await Promise.all([
    getPortfolioProjects(true),
    getSiteSettings(),
  ]);

  const isComingSoon = settings.portfolioDisplayMode === 'coming_soon_empty_state';
  const featuredProjects = projects.slice(0, 4);

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="py-16 md:py-24 border-b border-[var(--color-border-hairline)] bg-[var(--color-surface-pure)]"
    >
      <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[var(--color-border-hairline)]">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-signal)] font-semibold">
              Selected Production Work
            </span>
            <h2
              id="projects-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-ink-primary)] mt-2"
            >
              Work That Speaks Through Execution.
            </h2>
          </div>
          <div className="font-mono text-xs text-[var(--color-ink-muted)]">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-[var(--color-ink-primary)] hover:text-[var(--color-accent-signal)] transition-colors font-semibold"
            >
              View Full 10-Project Catalog &rarr;
            </Link>
          </div>
        </div>

        {isComingSoon ? (
          /* Empty State View */
          <div className="my-12 p-12 border border-[var(--color-border-hairline)] bg-[var(--color-canvas)] text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-block p-3 border border-[var(--color-border-hairline)] bg-[var(--color-surface-pure)] font-mono text-xs text-[var(--color-accent-signal)] font-bold">
              [SYSTEM NOTICE: PORTFOLIO REFACTORING]
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-ink-primary)]">
              Good engineering deserves to be shown properly. Our project portfolio is being prepared.
            </h3>
            <p className="text-sm text-[var(--color-ink-secondary)] leading-relaxed max-w-xl mx-auto">
              We are finalizing live interactive sandboxes, sanitized architectural diagrams, and verified telemetry logs for each production engagement. In the meantime, you can inspect our live blueprints or schedule a 15-minute architecture audit.
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <Link
                href="/blueprints"
                className="inline-flex items-center px-5 py-2.5 bg-[var(--color-ink-primary)] text-white font-mono text-xs font-semibold hover:bg-[var(--color-accent-signal)] transition-colors"
              >
                Inspect Blueprints &rarr;
              </Link>
            </div>
          </div>
        ) : (
          /* Featured Projects Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
            {featuredProjects.map((p) => {
              const stack = Array.isArray(p.stackTags) ? (p.stackTags as string[]) : [];
              return (
                <article
                  key={p.id}
                  className="border border-[var(--color-border-hairline)] bg-[var(--color-canvas)] p-6 sm:p-8 flex flex-col justify-between hover:border-[var(--color-border-strong)] transition-colors shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-[var(--color-border-hairline)] mb-4">
                      <span className="font-bold text-[var(--color-accent-signal)]">
                        #{p.indexNumber.toString().padStart(2, '0')} // {p.category.toUpperCase()}
                      </span>
                      <span className="text-[var(--color-ink-muted)]">{p.industry}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-[var(--color-ink-primary)] mb-2">
                      <Link href={`/projects/${p.slug}`} className="hover:text-[var(--color-accent-signal)] transition-colors">
                        {p.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-[var(--color-ink-secondary)] leading-relaxed mb-4">
                      {p.summary}
                    </p>

                    <div className="p-3 bg-[var(--color-surface-pure)] border border-[var(--color-border-hairline)] mb-4 space-y-2">
                      <div className="font-mono text-[11px] text-[var(--color-ink-muted)]">
                        <strong className="text-[var(--color-ink-primary)]">The Problem: </strong>
                        {p.problem}
                      </div>
                      <div className="font-mono text-[11px] text-[var(--color-accent-signal)]">
                        <strong className="text-[var(--color-ink-primary)]">The Outcome: </strong>
                        {p.outcomesSummary}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {stack.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] px-2 py-0.5 border border-[var(--color-border-hairline)] bg-[var(--color-surface-pure)] text-[var(--color-ink-secondary)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border-hairline)] font-mono text-xs font-semibold">
                      <Link
                        href={`/projects/${p.slug}`}
                        className="text-[var(--color-ink-primary)] hover:text-[var(--color-accent-signal)] inline-flex items-center gap-1 transition-colors"
                      >
                        Deep-Dive Case Study &rarr;
                      </Link>
                      <span className="text-[var(--color-ink-muted)]">100% IP Transferred</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
