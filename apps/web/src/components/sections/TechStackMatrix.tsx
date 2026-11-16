import React from 'react';

interface StackRow {
  readonly layer: string;
  readonly technology: string;
  readonly role: string;
  readonly latencyTarget: string;
  readonly verificationGate: string;
}

const STACK_ROWS: readonly StackRow[] = [
  {
    layer: 'Frontend Client & RSC',
    technology: 'Next.js 15 + React 19 + Tailwind CSS v4',
    role: 'Server components, sub-second LCP, zero client bundle bloat',
    latencyTarget: 'LCP < 1.2s, TBT < 50ms',
    verificationGate: 'Lighthouse CI Performance >= 98, First Load JS < 85 KB',
  },
  {
    layer: 'Edge Security & Ingress',
    technology: 'Next.js Middleware + Cloudflare Turnstile',
    role: 'Cryptographic CSP nonce generation, bot protection, 24h idempotency lock',
    latencyTarget: 'p95 < 15ms at edge',
    verificationGate: 'Playwright CSP violation tests + strict CSP header checks',
  },
  {
    layer: 'Governed Agent Runtime',
    technology: 'Python 3.12 + FastAPI + Pydantic v2',
    role: 'Deterministic schema validation, confidence gating, hallucination prevention',
    latencyTarget: 'p95 < 1,400ms orchestrate',
    verificationGate: 'Ruff, Mypy Strict + Golden Eval Suite (100% precision)',
  },
  {
    layer: 'Data & Hybrid Retrieval',
    technology: 'PostgreSQL 16 + pgvector HNSW + BM25 GIN',
    role: 'Single-query Reciprocal Rank Fusion + strict tenant Row-Level Security',
    latencyTarget: 'p95 < 45ms query',
    verificationGate: 'RLS multi-tenant isolation unit tests + HNSW query recall > 95%',
  },
  {
    layer: 'Event Queue & DLQ',
    technology: 'Redis Streams + asyncpg Outbox Worker',
    role: 'At-least-once webhook delivery, exponential backoff, DLQ auto-alerting',
    latencyTarget: 'p95 < 35ms dequeue',
    verificationGate: 'Automated replay_dlq.py worker validation + zero dropped events',
  },
  {
    layer: 'Distributed Tracing',
    technology: 'OpenTelemetry + W3C Trace Context',
    role: 'End-to-end traceparent propagation from Edge to FastAPI to PostgreSQL',
    latencyTarget: 'Overhead < 2ms / span',
    verificationGate: 'Structured JSON log schema validation against BetterStack',
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
          <h2 id="stack-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-ink-primary)] mt-2">
            The Production Engineering Stack.
          </h2>
          <p className="mt-3 text-sm text-[var(--color-ink-secondary)] max-w-2xl">
            Every layer in our production blueprint is chosen for latency determinism, type safety, and zero vendor lock-in. No fragile low-code tools.
          </p>
        </div>

        {/* Semantic Zero-JS Table */}
        <div className="overflow-x-auto border border-[var(--color-border-hairline)] bg-[var(--color-surface-elevated)]">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink-primary)]">
                <th scope="col" className="p-4 font-bold uppercase tracking-wider">
                  Architecture Layer
                </th>
                <th scope="col" className="p-4 font-bold uppercase tracking-wider">
                  Core Technology
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
                    {row.layer}
                  </td>
                  <td className="p-4 text-[var(--color-accent-signal)] font-medium">
                    {row.technology}
                  </td>
                  <td className="p-4 text-[var(--color-ink-secondary)] hidden sm:table-cell">
                    {row.role}
                  </td>
                  <td className="p-4 text-[var(--color-ink-primary)]">
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
