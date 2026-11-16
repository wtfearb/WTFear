import React from 'react';
import Link from 'next/link';

interface CapabilityItem {
  readonly id: string;
  readonly index: string;
  readonly title: string;
  readonly headline: string;
  readonly description: string;
  readonly stack: readonly string[];
  readonly latencySlo: string;
  readonly exitGate: string;
  readonly canonicalLink: string;
}

const CAPABILITIES: readonly CapabilityItem[] = [
  {
    id: 'ai-agents',
    index: '01',
    title: 'Governed AI Agents & Production RAG Systems',
    headline: 'Eliminating hallucinations through deterministic Pydantic gates and hybrid RRF retrieval.',
    description:
      'We architect AI agents that only act autonomously when verified citations and high confidence scores are met. Every query leverages single-round PostgreSQL 16 pgvector HNSW + BM25 ts_rank_cd retrieval, backed by CI-blocking 50-case golden evaluation suites.',
    stack: ['Python 3.12', 'FastAPI', 'Pydantic v2', 'PostgreSQL 16 pgvector', 'BM25 RRF', 'OpenTelemetry'],
    latencySlo: 'p95 < 1,400ms end-to-end',
    exitGate: '100% citation precision, cosine similarity >= 0.85 on 50 golden test cases',
    canonicalLink: '/blueprints/ai-triage',
  },
  {
    id: 'saas-portals',
    index: '02',
    title: 'Zero-Friction B2B SaaS & Enterprise Portals',
    headline: 'Sub-second Core Web Vitals with bulletproof PostgreSQL Row-Level Security isolation.',
    description:
      'Modern multi-tenant web applications built on Next.js 15 App Router and React 19 RSC. Eliminates client-bundle bloat, enforces cryptographic CSP nonce headers at the edge, and isolates organization data strictly at the PostgreSQL layer.',
    stack: ['Next.js 15 (React 19)', 'TypeScript 5.7', 'Tailwind CSS v4', 'PostgreSQL 16 RLS', 'Playwright'],
    latencySlo: 'LCP < 1.2s, CLS = 0.000, TBT < 50ms',
    exitGate: 'Playwright E2E security suite pass + Lighthouse CI Performance >= 98',
    canonicalLink: '/blueprints/saas-portal',
  },
  {
    id: 'event-spines',
    index: '03',
    title: 'Event-Driven Ingestion & Observability Spines',
    headline: 'Zero-data-loss webhook consumers with sliding idempotency locks and DLQ replay.',
    description:
      'Edge-first webhook consumers handling high-throughput ingress with Cloudflare Workers (< 15ms), Redis Streams backpressure queues, and dead-letter queue workers that automatically trigger alerts and replay on recovery.',
    stack: ['Cloudflare Workers', 'Redis Streams', 'FastAPI', 'asyncpg', 'OpenTelemetry', 'BetterStack'],
    latencySlo: 'Edge ACK < 15ms, Ingestion worker < 35ms',
    exitGate: 'k6 load test (5,000 req/sec) + automated DLQ replay validation',
    canonicalLink: '/blueprints/event-spine',
  },
];

export function CapabilitiesGrid(): React.ReactElement {
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="py-16 md:py-24 border-b border-[var(--color-border-hairline)] bg-[var(--color-canvas)]">
      <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[var(--color-border-hairline)]">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-signal)] font-semibold">
              Core Engineering Practices
            </span>
            <h2 id="capabilities-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-ink-primary)] mt-2">
              Architectural Domains We Own &amp; Deliver.
            </h2>
          </div>
          <p className="font-mono text-xs text-[var(--color-ink-muted)] max-w-md">
            Every engagement delivers production code directly into your GitHub org. Zero proprietary agency lock-in.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-12">
          {CAPABILITIES.map((cap) => (
            <article
              key={cap.id}
              className="border border-[var(--color-border-hairline)] bg-[var(--color-surface-elevated)] p-6 sm:p-8 flex flex-col justify-between hover:border-[var(--color-border-strong)] transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs text-[var(--color-accent-signal)] font-bold">
                  <span>CAPABILITY // {cap.index}</span>
                  <span className="text-[var(--color-ink-muted)] font-normal">{cap.latencySlo}</span>
                </div>

                <h3 className="text-xl font-bold text-[var(--color-ink-primary)] leading-snug">
                  {cap.title}
                </h3>

                <p className="text-sm font-medium text-[var(--color-ink-secondary)]">
                  {cap.headline}
                </p>

                <p className="text-xs text-[var(--color-ink-muted)] leading-relaxed">
                  {cap.description}
                </p>

                <div className="pt-2">
                  <div className="font-mono text-[10px] uppercase text-[var(--color-ink-muted)] mb-2 font-semibold">
                    Production Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                    {cap.stack.map((item) => (
                      <span
                        key={item}
                        className="border border-[var(--color-border-hairline)] bg-[var(--color-surface-subtle)] px-2 py-0.5 text-[var(--color-ink-secondary)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-[var(--color-border-hairline)] space-y-3">
                <div className="font-mono text-[11px] text-[var(--color-ink-muted)]">
                  <strong className="text-[var(--color-ink-primary)]">Exit Gate:</strong> {cap.exitGate}
                </div>
                <Link
                  href={cap.canonicalLink}
                  className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-[var(--color-accent-signal)] hover:text-[var(--color-accent-signal-hover)]"
                >
                  Inspect Architecture Blueprint &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
