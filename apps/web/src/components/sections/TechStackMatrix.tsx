import React from 'react';

interface StackRow {
  readonly group: string;
  readonly layer: string;
  readonly technology: string;
  readonly role: string;
  readonly latencyTarget: string;
  readonly verificationGate: string;
}

const STACK_ROWS: readonly StackRow[] = [
  {
    group: 'Frontend',
    layer: 'Client & RSC',
    technology: 'Next.js 15 + React 19 + Tailwind CSS v4',
    role: 'Server components, sub-second LCP, zero client bundle bloat',
    latencyTarget: 'LCP < 1.2s, TBT < 50ms',
    verificationGate: 'Lighthouse CI Performance >= 98, First Load JS < 85 KB',
  },
  {
    group: 'Backend',
    layer: 'Governed Agent Runtime',
    technology: 'Python 3.12 + FastAPI + Pydantic v2',
    role: 'Deterministic schema validation, confidence gating, hallucination prevention',
    latencyTarget: 'p95 < 1,400ms orchestrate',
    verificationGate: 'Golden Eval Suite (100% precision) + Ruff & Mypy Strict',
  },
  {
    group: 'Database & Retrieval',
    layer: 'Hybrid Vector & Lexical',
    technology: 'PostgreSQL 16 + pgvector HNSW + BM25 GIN + Drizzle ORM',
    role: 'Single-round Reciprocal Rank Fusion + strict tenant Row-Level Security',
    latencyTarget: 'p95 < 45ms query',
    verificationGate: 'RLS multi-tenant isolation unit tests + HNSW recall > 95%',
  },
  {
    group: 'Infrastructure',
    layer: 'Edge Ingress & Event Bus',
    technology: 'Cloudflare Workers + Redis Streams + Neon Serverless',
    role: 'Sub-15ms edge ACK, HMAC verification, partitioned queuing & auto DLQ replay',
    latencyTarget: 'Edge ACK < 15ms, Dequeue < 35ms',
    verificationGate: 'k6 load test (5,000 req/sec) + automated DLQ replay validation',
  },
  {
    group: 'Quality & Observability',
    layer: 'Telemetry & E2E Testing',
    technology: 'OpenTelemetry + Playwright + Biome',
    role: 'End-to-end W3C traceparent propagation, automated regression gates',
    latencyTarget: 'Overhead < 2ms / span',
    verificationGate: '100% automated CI gate pass before production merge',
  },
];

export function TechStackMatrix(): React.ReactElement {
  return (
    <section id="stack" aria-labelledby="stack-title" className="py-16 md:py-24 border-b border-[var(--color-border-hairline)] bg-[var(--color-surface-subtle)]">
      <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
        <div className="pb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-signal)] font-semibold">
            Zero-Bloat Architectural Rigor
          </span>
          <h2 id="stack-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-ink-primary)] mt-2">
            Built With Technologies That Scale.
          </h2>
          <p className="mt-3 text-sm text-[var(--color-ink-secondary)] max-w-2xl leading-relaxed">
            Every layer in our production blueprint is chosen for latency determinism, type safety, and zero vendor lock-in. No fragile low-code tools or black-box abstractions.
          </p>
        </div>

        {/* Semantic Zero-JS Table */}
        <div className="overflow-x-auto border border-[var(--color-border-hairline)] bg-[var(--color-surface-pure)] shadow-xs">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink-primary)]">
                <th scope="col" className="p-4 font-bold uppercase tracking-wider">
                  Discipline / Group
                </th>
                <th scope="col" className="p-4 font-bold uppercase tracking-wider">
                  Technology Stack
                </th>
                <th scope="col" className="p-4 font-bold uppercase tracking-wider hidden sm:table-cell">
                  Production Role
                </th>
                <th scope="col" className="p-4 font-bold uppercase tracking-wider">
                  Latency SLO (p95)
                </th>
                <th scope="col" className="p-4 font-bold uppercase tracking-wider hidden md:table-cell">
                  CI Verification Gate
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-hairline)] text-[var(--color-ink-secondary)]">
              {STACK_ROWS.map((row) => (
                <tr key={row.layer} className="hover:bg-[var(--color-surface-subtle)] transition-colors">
                  <td className="p-4 font-semibold text-[var(--color-ink-primary)]">
                    <span className="text-[var(--color-accent-signal)] font-bold">// </span>
                    {row.group}
                  </td>
                  <td className="p-4 text-[var(--color-ink-primary)] font-medium">
                    {row.technology}
                  </td>
                  <td className="p-4 text-[var(--color-ink-secondary)] hidden sm:table-cell">
                    {row.role}
                  </td>
                  <td className="p-4 text-[var(--color-ink-primary)] font-bold">
                    {row.latencyTarget}
                  </td>
                  <td className="p-4 text-[var(--color-ink-muted)] hidden md:table-cell">
                    {row.verificationGate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
