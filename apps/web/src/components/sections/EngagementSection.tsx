'use client';

import React, { useState, useMemo } from 'react';
import type {
  ArchitectureComplexity,
  EngagementModelType,
  ScopeCalculationInput,
} from '@wtfear/contracts';
import { calculateEngagementScope } from '@/lib/state/engagement-calculator';
import { useAuditModal } from '../modals/AuditModalProvider';

export function EngagementSection(): React.ReactElement {
  const { openModal } = useAuditModal();

  const [model, setModel] = useState<EngagementModelType>('sprint');
  const [complexity, setComplexity] = useState<ArchitectureComplexity>('governed_ai');
  const [durationUnits, setDurationUnits] = useState<number>(1);
  const [includeEvalHarness, setIncludeEvalHarness] = useState<boolean>(true);

  const scopeInput: ScopeCalculationInput = useMemo(
    () => ({
      model,
      complexity,
      durationUnits,
      includeEvalHarness,
    }),
    [model, complexity, durationUnits, includeEvalHarness]
  );

  const scope = useMemo(() => calculateEngagementScope(scopeInput), [scopeInput]);

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="py-16 md:py-24 border-b border-[var(--color-border-hairline)] bg-[var(--color-canvas)]">
      <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[var(--color-border-hairline)]">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-signal)] font-semibold">
              Deterministic Pricing &amp; Scope
            </span>
            <h2 id="pricing-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-ink-primary)] mt-2">
              Transparent Investment. Zero Retainer Trap.
            </h2>
          </div>
          <p className="font-mono text-xs text-[var(--color-ink-muted)] max-w-md">
            Fixed prices and guaranteed deliverables. All intellectual property committed directly to your repository.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-8">
            {/* 1. Engagement Model Selector */}
            <fieldset className="space-y-3">
              <legend className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-primary)] font-bold">
                1. Select Engagement Model
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'audit', label: '15-Minute Architecture Audit ($0)', desc: 'Direct technical bottleneck diagnosis' },
                  { id: 'sprint', label: '2-Week Rapid Sprint', desc: '14-day production delivery pod' },
                  { id: 'mvp', label: 'Fixed-Scope Production MVP', desc: '2 to 4 weeks multi-tenant app' },
                  { id: 'pod', label: 'Dedicated Senior Engineering Pod', desc: 'Embedded continuous monthly velocity' },
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`border p-4 cursor-pointer flex flex-col justify-between transition-colors ${
                      model === item.id
                        ? 'border-[var(--color-accent-signal)] bg-[var(--color-surface-elevated)]'
                        : 'border-[var(--color-border-hairline)] bg-[var(--color-canvas)] hover:border-[var(--color-border-strong)]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="engagement-model"
                        value={item.id}
                        checked={model === item.id}
                        onChange={() => setModel(item.id as EngagementModelType)}
                        className="accent-[var(--color-accent-signal)]"
                      />
                      <span className="font-mono text-xs font-bold text-[var(--color-ink-primary)]">
                        {item.label}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-[var(--color-ink-muted)] mt-2">
                      {item.desc}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* 2. Architecture Complexity */}
            <fieldset className="space-y-3">
              <legend className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-primary)] font-bold">
                2. Subsystem Complexity &amp; Surface
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'standard_web', label: 'Standard Web & API (1.0x)', desc: 'Next.js 15 + DB' },
                  { id: 'governed_ai', label: 'Governed AI & RAG (1.2x)', desc: 'pgvector + BM25 RRF' },
                  { id: 'distributed_sync', label: 'Distributed Sync (1.15x)', desc: 'Workers + Streams' },
                ].map((item) => (
                  <label
                    key={item.id}
                    className={`border p-3 cursor-pointer flex flex-col justify-between transition-colors ${
                      complexity === item.id
                        ? 'border-[var(--color-accent-signal)] bg-[var(--color-surface-elevated)]'
                        : 'border-[var(--color-border-hairline)] bg-[var(--color-canvas)] hover:border-[var(--color-border-strong)]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="architecture-complexity"
                        value={item.id}
                        checked={complexity === item.id}
                        onChange={() => setComplexity(item.id as ArchitectureComplexity)}
                        className="accent-[var(--color-accent-signal)]"
                      />
                      <span className="font-mono text-xs font-semibold text-[var(--color-ink-primary)]">
                        {item.label}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[var(--color-ink-muted)] mt-1">
                      {item.desc}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* 3. Golden Eval Harness Add-On */}
            <div className="border border-[var(--color-border-hairline)] p-4 bg-[var(--color-surface-elevated)]">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeEvalHarness}
                  onChange={(e) => setIncludeEvalHarness(e.target.checked)}
                  className="mt-0.5 accent-[var(--color-accent-signal)]"
                />
                <div>
                  <div className="font-mono text-xs font-bold text-[var(--color-ink-primary)]">
                    Include 50-Case Golden Eval Harness (+$1,800)
                  </div>
                  <div className="font-mono text-[11px] text-[var(--color-ink-muted)] mt-1">
                    Automated CI-blocking test suite curating 50 historical edge cases. Guarantees 100% citation precision and cosine similarity &gt;= 0.85 before any PR merges.
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Pricing & Deliverables Summary Card */}
          <div className="lg:col-span-6">
            <div className="border-2 border-[var(--color-ink-primary)] bg-[var(--color-surface-elevated)] p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-[var(--color-border-hairline)] pb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-signal)] font-semibold">
                  ESTIMATED INVESTMENT
                </span>
                <span className="font-mono text-xs text-[var(--color-ink-muted)]">
                  {scope.cadenceSummary}
                </span>
              </div>

              <div>
                <div
                  data-testid="calculator-price-range"
                  className="font-mono text-3xl sm:text-4xl font-bold text-[var(--color-ink-primary)] tracking-tight"
                >
                  {scope.priceRangeUsd.min === 0
                    ? '$0 / Free Architecture Audit'
                    : `$${scope.priceRangeUsd.min.toLocaleString()} – $${scope.priceRangeUsd.max.toLocaleString()} USD`}
                </div>
                <div className="font-mono text-xs text-[var(--color-ink-muted)] mt-1">
                  Model: {scope.modelLabel}
                </div>
              </div>

              {/* Team Composition */}
              <div className="p-3 bg-[var(--color-surface-subtle)] border border-[var(--color-border-hairline)]">
                <div className="font-mono text-[11px] uppercase text-[var(--color-ink-muted)] font-semibold mb-1">
                  Dedicated Pod Composition
                </div>
                <div className="font-mono text-xs text-[var(--color-ink-primary)] font-medium">
                  {scope.teamComposition.join(' + ')}
                </div>
              </div>

              {/* Deliverables Checklist */}
              <div className="space-y-2">
                <div className="font-mono text-xs uppercase text-[var(--color-ink-muted)] font-semibold">
                  Guaranteed Production Deliverables
                </div>
                <ul className="space-y-2 font-mono text-xs text-[var(--color-ink-secondary)]">
                  {scope.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[var(--color-accent-signal)] font-bold">&check;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exit Gate */}
              <div className="p-3 border border-[var(--color-border-hairline)] font-mono text-xs">
                <span className="text-[var(--color-ink-muted)] font-bold">CI Handover Gate: </span>
                <span className="text-[var(--color-ink-primary)]">{scope.exitVerificationGate}</span>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={openModal}
                  className="w-full bg-[var(--color-accent-signal)] text-white py-3.5 px-4 font-mono text-xs font-semibold hover:bg-[var(--color-accent-signal-hover)] transition-colors text-center"
                >
                  LOCK THIS SCOPE ON CAL.COM (15-MIN AUDIT) &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
