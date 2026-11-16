import React from 'react';
import Link from 'next/link';

export function Footer(): React.ReactElement {
  return (
    <footer className="border-t border-[var(--color-border-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink-secondary)] py-16">
      <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[var(--color-border-hairline)]">
          {/* Studio Summary */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5 font-mono text-base font-bold text-[var(--color-ink-primary)]">
              <span className="inline-block h-2.5 w-2.5 bg-[var(--color-accent-signal)]" aria-hidden="true" />
              <span>WTFearB</span>
              <span className="text-[var(--color-ink-muted)] font-normal text-xs pl-1 border-l border-[var(--color-border-hairline)]">
                Make &ldquo;What If&rdquo; Work.
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[var(--color-ink-secondary)] max-w-md">
              Senior Product and AI Engineering Studio that designs, builds, and ships governed AI agents, Next.js 15 web applications, and distributed event pipelines in deterministic 2-week sprints with 100% client GitHub IP ownership.
            </p>
            <div className="font-mono text-xs text-[var(--color-ink-muted)] space-y-1">
              <div>Direct Engineering Inquiries: <a href="mailto:wtfearb@gmail.com" className="text-[var(--color-ink-primary)] hover:text-[var(--color-accent-signal)] transition-colors"><code>wtfearb@gmail.com</code></a></div>
              <div>Delivery Model: <span className="text-[var(--color-ink-primary)]">100% Client GitHub Organization Transfer</span></div>
            </div>
          </div>

          {/* Directory Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-primary)] font-semibold">
              Route Directory
            </h4>
            <ul className="space-y-2 font-mono text-xs">
              <li>
                <Link href="/services" className="hover:text-[var(--color-accent-signal)] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/blueprints" className="hover:text-[var(--color-accent-signal)] transition-colors">
                  Engineering Blueprints
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[var(--color-accent-signal)] transition-colors">
                  Projects &amp; Case Studies
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[var(--color-accent-signal)] transition-colors">
                  About the Studio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--color-accent-signal)] transition-colors">
                  Contact &amp; Audit
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] transition-colors">
                  Admin Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Machine-Readable & Comparisons */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-primary)] font-semibold">
              Technical Corpus &amp; Feeds
            </h4>
            <ul className="space-y-2 font-mono text-xs">
              <li>
                <Link href="/llms.txt" className="hover:text-[var(--color-accent-signal)] transition-colors">
                  /llms.txt (AI Crawler Context)
                </Link>
              </li>
              <li>
                <Link href="/llms-full.txt" className="hover:text-[var(--color-accent-signal)] transition-colors">
                  /llms-full.txt (Technical Corpus)
                </Link>
              </li>
              <li>
                <Link href="/compare/traditional-dev-agencies" className="hover:text-[var(--color-accent-signal)] transition-colors">
                  WTFearB vs Traditional Consultancies
                </Link>
              </li>
              <li>
                <Link href="/playbooks/governed-rag-evaluation-harness" className="hover:text-[var(--color-accent-signal)] transition-colors">
                  Playbook: Eliminating Hallucinations in RAG
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
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--color-ink-muted)]">
          <div>
            &copy; {new Date().getFullYear()} WTFearB Studio &bull; Make &ldquo;What If&rdquo; Work.
          </div>
          <div className="flex items-center gap-4">
            <span>Sub-Second Core Web Vitals</span>
            <span>&bull;</span>
            <span>Deterministic Golden Evals</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
