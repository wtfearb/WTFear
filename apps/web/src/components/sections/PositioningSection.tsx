import React from 'react';

const DISCIPLINES = [
  {
    number: '01',
    title: 'AI Systems',
    subtitle: 'Governed Agents & Production RAG',
    description:
      'We build AI systems that operate with mathematical rigor. No uncontrolled prompting or unpredictable wrappers. Every agent uses deterministic Pydantic schema validation, hybrid pgvector + BM25 retrieval, and automated CI-blocking evaluation gates to eliminate hallucinations before production cutover.',
    deliverables: [
      'Single-round hybrid reciprocal rank fusion (RRF)',
      'Deterministic confidence & citation thresholding',
      '50-case CI-blocking golden evaluation suites',
      'Zero-risk human escalation fallback queues',
    ],
  },
  {
    number: '02',
    title: 'Product Engineering',
    subtitle: 'High-Performance Web & B2B SaaS',
    description:
      'We craft modern web applications built on Next.js 15 App Router, React 19 Server Components, and Tailwind CSS. Every interface is calibrated for sub-second Largest Contentful Paint (LCP < 1.2s), strict keyboard accessibility, and multi-tenant Row-Level Security isolation.',
    deliverables: [
      'Streaming server-rendered zero-client-JS layouts',
      'Multi-tenant PostgreSQL 16 with hardware RLS',
      'Stripe seat & usage metering integration',
      'Automated Playwright end-to-end test suites',
    ],
  },
  {
    number: '03',
    title: 'Systems Engineering',
    subtitle: 'Distributed Ingestion & Queue Spines',
    description:
      'We architect the event pipelines and backend engines that keep data synchronized under heavy concurrent load. Sub-15ms edge webhook acknowledgment, Redis Streams partitioned queues, exponential backoff retries, and automated dead-letter queue replay.',
    deliverables: [
      'Idempotent edge webhooks with HMAC validation',
      'Partitioned consumer groups & at-least-once delivery',
      'One-click administrative DLQ recovery CLI',
      'End-to-end OpenTelemetry distributed tracing',
    ],
  },
  {
    number: '04',
    title: 'Technical Strategy',
    subtitle: 'Zero-BS Architecture & Scoping',
    description:
      'Direct technical bottleneck diagnosis with an embedded Principal Systems Engineer. We evaluate your existing architecture, identify concurrency bottlenecks, calculate exact fixed-scope budgets, and verify AI feasibility before writing a single line of production code.',
    deliverables: [
      'Comprehensive 15-minute architecture diagnosis',
      'Fixed-price 14-day rapid sprint work orders',
      '100% client GitHub organization repository transfer',
      'Zero agency retainers or proprietary lock-in',
    ],
  },
] as const;

export function PositioningSection(): React.ReactElement {
  return (
    <section
      id="positioning"
      aria-labelledby="positioning-title"
      className="py-16 md:py-24 border-b border-[var(--color-border-hairline)] bg-[var(--color-surface-pure)]"
    >
      <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[var(--color-border-hairline)]">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-signal)] font-semibold">
              Core Architectural Philosophy
            </span>
            <h2
              id="positioning-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-ink-primary)] mt-2"
            >
              Complex Problems. Carefully Engineered Solutions.
            </h2>
          </div>
          <p className="font-mono text-xs text-[var(--color-ink-muted)] max-w-md leading-relaxed">
            Four specialized engineering disciplines delivered by two embedded senior engineers. Clean code, zero fluff, verified delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
          {DISCIPLINES.map((d) => (
            <article
              key={d.number}
              className="border border-[var(--color-border-hairline)] bg-[var(--color-canvas)] p-6 sm:p-7 flex flex-col justify-between hover:border-[var(--color-border-strong)] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs pb-4 border-b border-[var(--color-border-hairline)] mb-4">
                  <span className="font-bold text-[var(--color-accent-signal)]">{d.number}</span>
                  <span className="text-[var(--color-ink-muted)]">// DISCIPLINE</span>
                </div>

                <h3 className="text-xl font-bold text-[var(--color-ink-primary)] mb-1">
                  {d.title}
                </h3>
                <div className="font-mono text-xs text-[var(--color-accent-signal)] font-semibold mb-3">
                  {d.subtitle}
                </div>

                <p className="text-xs text-[var(--color-ink-secondary)] leading-relaxed mb-6">
                  {d.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--color-border-hairline)]">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-muted)] font-bold mb-2">
                  Key Deliverables
                </div>
                <ul className="space-y-1.5 font-mono text-[11px] text-[var(--color-ink-secondary)]">
                  {d.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[var(--color-accent-signal)] font-bold">&rsaquo;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
