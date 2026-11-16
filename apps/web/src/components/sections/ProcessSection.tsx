import React from 'react';

const STAGES = [
  {
    step: '01',
    name: 'Discover & Diagnose',
    timeframe: 'Day 0',
    headline: 'Direct bottleneck diagnosis with a Principal Engineer.',
    details:
      'We begin with a focused 15-minute architecture diagnosis. No sales reps or account managers. We inspect your data contracts, concurrency bottlenecks, vector retrieval requirements, and API constraints to determine feasibility before writing any code.',
    checkpoints: [
      'Data flow & schema bottleneck mapping',
      'Retrieval & latency SLA feasibility audit',
      'Security & RLS boundary analysis',
      'Immediate go/no-go technical verdict',
    ],
  },
  {
    step: '02',
    name: 'Architect & Scope',
    timeframe: 'Day 1',
    headline: 'Fixed-price SOW with mathematically bounded deliverables.',
    details:
      'We generate a comprehensive technical specification monograph. Exact database schemas, Pydantic contracts, and API routes are defined upfront. You receive a guaranteed fixed-price quote with zero open-ended hourly billing or scope creep incentives.',
    checkpoints: [
      'Interactive architectural topology diagram',
      'Fixed-price agreement ($6,500 – $8,500 / sprint)',
      '50-case golden evaluation test criteria defined',
      'Repository permissions & secrets configured',
    ],
  },
  {
    step: '03',
    name: 'Build & Verify',
    timeframe: 'Days 2 – 13',
    headline: 'Continuous code drops straight into your GitHub org.',
    details:
      'Two embedded senior systems engineers build your subsystem in daily iterative pull requests. On Day 7, you test a live staging demo. Automated CI gates block regressions and ensure 100% citation precision and sub-second Core Web Vitals.',
    checkpoints: [
      'Direct commits to your GitHub organization',
      'Day-7 live staging deployment demo',
      'Continuous CI-blocking golden eval suite execution',
      'Sub-second Core Web Vitals & Playwright verification',
    ],
  },
  {
    step: '04',
    name: 'Deploy & Handover',
    timeframe: 'Day 14',
    headline: 'Production cutover with 100% IP ownership transfer.',
    details:
      'Day-14 production cutover with zero downtime. We transfer full ownership of all code, Terraform scripts, and CI workflows. Includes comprehensive operational runbooks and 14 days of post-launch monitoring and warranty support.',
    checkpoints: [
      'Zero-downtime production cutover',
      '100% client GitHub organization IP ownership',
      'Architectural runbook & replay documentation',
      '14-day warranty stabilization & telemetry handoff',
    ],
  },
] as const;

export function ProcessSection(): React.ReactElement {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="py-16 md:py-24 border-b border-[var(--color-border-hairline)] bg-[var(--color-canvas)]"
    >
      <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[var(--color-border-hairline)]">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-signal)] font-semibold">
              Deterministic Execution Cadence
            </span>
            <h2
              id="process-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-ink-primary)] mt-2"
            >
              From Architecture to Production.
            </h2>
          </div>
          <p className="font-mono text-xs text-[var(--color-ink-muted)] max-w-md leading-relaxed">
            Our 4-stage monograph replaces bloated 6-month consultancy cycles with a deterministic 14-day engineering cadence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
          {STAGES.map((s) => (
            <div
              key={s.step}
              className="border border-[var(--color-border-hairline)] bg-[var(--color-surface-pure)] p-6 sm:p-7 flex flex-col justify-between hover:border-[var(--color-border-strong)] transition-colors shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-[var(--color-border-hairline)] mb-4">
                  <span className="font-bold text-[var(--color-accent-signal)]">{s.step} // STAGE</span>
                  <span className="text-[var(--color-ink-muted)]">{s.timeframe}</span>
                </div>

                <h3 className="text-xl font-bold text-[var(--color-ink-primary)] mb-2">
                  {s.name}
                </h3>

                <p className="font-mono text-xs text-[var(--color-accent-signal)] font-semibold mb-3">
                  {s.headline}
                </p>

                <p className="text-xs text-[var(--color-ink-secondary)] leading-relaxed mb-6">
                  {s.details}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--color-border-hairline)]">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-muted)] font-bold mb-2">
                  Stage Checkpoints
                </div>
                <ul className="space-y-1.5 font-mono text-[11px] text-[var(--color-ink-secondary)]">
                  {s.checkpoints.map((cp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[var(--color-accent-signal)] font-bold">✓</span>
                      <span>{cp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
