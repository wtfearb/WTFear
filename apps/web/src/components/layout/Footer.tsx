import React from 'react';
import Link from 'next/link';

export function Footer(): React.ReactElement {
  return (
    <footer className="border-t border-[var(--color-border-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink-secondary)] py-16">
      <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[var(--color-border-hairline)]">
          {/* Studio Summary */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 font-mono text-base font-bold text-[var(--color-ink-primary)]">
              <span className="inline-block h-2.5 w-2.5 bg-[var(--color-accent-signal)]" aria-hidden="true" />
              <span>wtfear</span>
              <span className="text-[var(--color-ink-muted)] font-normal text-xs">/ agency</span>
            </div>
            <p className="text-sm leading-relaxed text-[var(--color-ink-secondary)] max-w-md">
              Senior Product and AI Engineering Studio that designs, builds, and ships governed AI agents, Next.js 15 + FastAPI web applications, and distributed backends in deterministic 2-week sprints. Clients retain 100% GitHub IP ownership from commit #1.
            </p>
            <div className="font-mono text-xs text-[var(--color-ink-muted)] space-y-1">
              <div>Domain: <code className="text-[var(--color-ink-primary)]">https://wtfear.agency</code></div>
              <div>Direct: <code className="text-[var(--color-ink-primary)]">hello@wtfear.agency</code></div>
            </div>
          </div>

          {/* Machine-Readable & AEO Endpoints */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-primary)] font-semibold">
              Machine-Readable Feeds
            </h4>
            <ul className="space-y-2 font-mono text-xs">
              <li>
                <Link href="/llms.txt" className="hover:text-[var(--color-accent-signal)] transition-colors">
                  /llms.txt (AI Index)
                </Link>
              </li>
              <li>
                <Link href="/llms-full.txt" className="hover:text-[var(--color-accent-signal)] transition-colors">
                  /llms-full.txt (Technical Corpus)
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="hover:text-[var(--color-accent-signal)] transition-colors">
                  /sitemap.xml
                </Link>
              </li>
              <li>
                <Link href="/robots.txt" className="hover:text-[var(--color-accent-signal)] transition-colors">
                  /robots.txt
                </Link>
              </li>
            </ul>
          </div>

          {/* Programmatic Comparison & Playbooks */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-primary)] font-semibold">
              Comparisons &amp; Playbooks
            </h4>
            <ul className="space-y-2 font-mono text-xs">
              <li>
                <Link href="/compare/traditional-dev-agencies" className="hover:text-[var(--color-accent-signal)] transition-colors">
                  wtfear vs Traditional Agencies
                </Link>
              </li>
              <li>
                <Link href="/compare/in-house-hiring" className="hover:text-[var(--color-accent-signal)] transition-colors">
                  wtfear Pod vs In-House Hiring
                </Link>
              </li>
              <li>
                <Link href="/playbooks/governed-rag-evaluation-harness" className="hover:text-[var(--color-accent-signal)] transition-colors">
                  Playbook: Eliminating Hallucinations in RAG
                </Link>
              </li>
              <li>
                <Link href="/playbooks/postgres-rls-pgvector-hybrid-search" className="hover:text-[var(--color-accent-signal)] transition-colors">
                  Playbook: PostgreSQL RLS + pgvector Hybrid Search
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--color-ink-muted)]">
          <div>
            &copy; 2026 wtfear.agency &bull; Built with Next.js 15, FastAPI, and PostgreSQL 16.
          </div>
          <div className="flex items-center gap-4">
            <span>WCAG 2.2 AAA Compliant</span>
            <span>&bull;</span>
            <span>Zero-Sales Engineering</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
