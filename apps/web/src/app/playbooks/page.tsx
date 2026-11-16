import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Engineering Playbooks & Technical Guides | WTFearB',
  description:
    'In-depth principal engineering playbooks: eliminating RAG hallucinations with Pydantic v2 and PostgreSQL 16 RLS + pgvector HNSW hybrid search.',
  alternates: {
    canonical: 'https://wtfear.agency/playbooks',
  },
  openGraph: {
    title: 'Engineering Playbooks & Technical Guides — WTFearB',
    description:
      'Step-by-step engineering tutorials, SQL queries, and Python code for production AI systems and databases.',
    url: 'https://wtfear.agency/playbooks',
    siteName: 'WTFearB Systems Studio',
    type: 'website',
  },
};

const PLAYBOOKS_LIST = [
  {
    slug: 'governed-rag-evaluation-harness',
    title: 'Eliminating Hallucinations in Production RAG with Pydantic v2 & Golden Evals',
    summary:
      'A principal engineer guide to building zero-hallucination agentic retrieval systems in Python 3.12, FastAPI, and PostgreSQL 16.',
    targetLatency: 'Retriever < 45ms, Orchestrator < 1,400ms',
    stack: ['Python 3.12', 'Pydantic v2', 'FastAPI', 'Golden Eval Harness', 'Astral uv'],
  },
  {
    slug: 'postgres-rls-pgvector-hybrid-search',
    title: 'PostgreSQL 16 RLS + pgvector HNSW Hybrid BM25 Search',
    summary:
      'Architecting single-query multi-tenant hybrid search without external vector database dependencies or synchronization drift.',
    targetLatency: 'p95 query latency < 45ms across 1M chunks',
    stack: ['PostgreSQL 16', 'pgvector', 'HNSW', 'BM25 RRF', 'Row-Level Security'],
  },
];

export default function PlaybooksIndexPage(): React.ReactElement {
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
              <span className="text-[var(--color-accent-signal)] font-semibold">Playbooks</span>
            </div>

            <div className="max-w-3xl">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-signal)] font-semibold">
                Principal Engineering Guides &bull; Production Runbooks
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-ink-primary)] mt-3">
                Technical Engineering Playbooks.
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[var(--color-ink-secondary)] leading-relaxed">
                Step-by-step engineering tutorials, verified code snippets, and database schemas authored by our principal systems engineers for production deployment.
              </p>
            </div>
          </div>
        </section>

        {/* Playbooks List */}
        <section className="py-12 md:py-20">
          <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PLAYBOOKS_LIST.map((pb, idx) => (
                <article
                  key={pb.slug}
                  className="flex flex-col border border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)] p-6 sm:p-8 hover:border-[var(--color-ink-primary)] transition-all group"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border-hairline)]">
                    <span className="font-mono text-xs font-bold text-[var(--color-accent-signal)]">
                      PLAYBOOK [{String(idx + 1).padStart(2, '0')}]
                    </span>
                    <span className="font-mono text-[11px] px-2 py-0.5 border border-[var(--color-border-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink-muted)]">
                      SPECIFICATION
                    </span>
                  </div>

                  <h2 className="text-xl font-bold tracking-tight text-[var(--color-ink-primary)] mt-4 group-hover:text-[var(--color-accent-signal)] transition-colors">
                    <Link href={`/playbooks/${pb.slug}`}>{pb.title}</Link>
                  </h2>

                  <p className="mt-3 text-xs sm:text-sm text-[var(--color-ink-secondary)] leading-relaxed flex-1">
                    {pb.summary}
                  </p>

                  <div className="mt-6 pt-4 border-t border-[var(--color-border-hairline)]">
                    <div className="font-mono text-xs text-[var(--color-ink-muted)] mb-3">
                      <span className="font-semibold text-[var(--color-ink-primary)]">Target Latency:</span>{' '}
                      {pb.targetLatency}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {pb.stack.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[11px] px-2 py-0.5 border border-[var(--color-border-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink-secondary)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/playbooks/${pb.slug}`}
                      className="inline-flex items-center gap-1 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-signal)] group-hover:underline"
                    >
                      <span>Read Playbook &amp; Code Specs</span>
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
              Need Us to Implement These Patterns in Your Repository?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--color-ink-secondary)] max-w-xl mx-auto">
              Our 2-week rapid engineering sprint delivers production AI agent runtimes directly to your GitHub organization with 100% test coverage.
            </p>
            <div className="mt-6">
              <Link
                href="/audit"
                className="inline-flex items-center justify-center px-6 py-3 bg-[var(--color-accent-signal)] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:brightness-110 transition-all"
              >
                <span>Book 15-Min Architecture Audit</span>
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
