'use client';

import React, { useReducer } from 'react';
import Link from 'next/link';
import {
  BLUEPRINT_CATALOG,
  INITIAL_BLUEPRINTS_STATE,
  blueprintsReducer,
  type BlueprintCategory,
  type BlueprintItem,
} from '@/lib/state/blueprints-machine';
import { BlueprintDrawer } from './BlueprintDrawer';
import { trackClientEvent } from '../TelemetryTracker';

const CATEGORIES: readonly BlueprintCategory[] = ['ALL', 'AI AGENTS', 'SAAS & PORTALS', 'SYSTEMS'];

function BlueprintSvgDiagram({ blueprint }: { readonly blueprint: BlueprintItem }): React.ReactElement {
  return (
    <div className="w-full bg-[var(--color-terminal-bg)] border border-[var(--color-terminal-border)] p-4 my-4 overflow-hidden">
      <svg
        viewBox="0 0 640 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto text-white font-mono"
        aria-label={`${blueprint.title} Architecture Diagram`}
      >
        {/* Connection flow lines */}
        <line x1="160" y1="90" x2="260" y2="90" stroke="#262932" strokeWidth="2" strokeDasharray="4 4" />
        <line x1="380" y1="90" x2="480" y2="90" stroke="#262932" strokeWidth="2" strokeDasharray="4 4" />

        {/* Step 01 Node */}
        <g role="button" tabIndex={0} data-step-index="01" className="cursor-pointer group">
          <rect
            x="40"
            y="50"
            width="120"
            height="80"
            rx="2"
            fill="#14161B"
            stroke="#262932"
            strokeWidth="1.5"
            className="group-hover:stroke-[var(--color-accent-signal)] group-focus:stroke-[var(--color-accent-signal)] transition-colors"
          />
          <circle cx="60" cy="72" r="5" fill="#C83E1B" className="animate-svg-pulse" />
          <text x="75" y="76" fill="#9CA3AF" fontSize="10" fontWeight="bold">01 INGRESS</text>
          <text x="50" y="105" fill="#F3F4F6" fontSize="9" fontWeight="500">
            {blueprint.checklist[0]?.title.slice(0, 15)}...
          </text>
        </g>

        {/* Step 02 Node */}
        <g role="button" tabIndex={0} data-step-index="02" className="cursor-pointer group">
          <rect
            x="260"
            y="50"
            width="120"
            height="80"
            rx="2"
            fill="#14161B"
            stroke="#262932"
            strokeWidth="1.5"
            className="group-hover:stroke-[var(--color-accent-signal)] group-focus:stroke-[var(--color-accent-signal)] transition-colors"
          />
          <circle cx="280" cy="72" r="5" fill="#10B981" className="animate-svg-pulse" />
          <text x="295" y="76" fill="#9CA3AF" fontSize="10" fontWeight="bold">02 ENGINE</text>
          <text x="270" y="105" fill="#F3F4F6" fontSize="9" fontWeight="500">
            {blueprint.checklist[1]?.title.slice(0, 15)}...
          </text>
        </g>

        {/* Step 03 Node */}
        <g role="button" tabIndex={0} data-step-index="03" className="cursor-pointer group">
          <rect
            x="480"
            y="50"
            width="120"
            height="80"
            rx="2"
            fill="#14161B"
            stroke="#262932"
            strokeWidth="1.5"
            className="group-hover:stroke-[var(--color-accent-signal)] group-focus:stroke-[var(--color-accent-signal)] transition-colors"
          />
          <circle cx="500" cy="72" r="5" fill="#C83E1B" className="animate-svg-pulse" />
          <text x="515" y="76" fill="#9CA3AF" fontSize="10" fontWeight="bold">03 GATE</text>
          <text x="490" y="105" fill="#F3F4F6" fontSize="9" fontWeight="500">
            {blueprint.checklist[2]?.title.slice(0, 15)}...
          </text>
        </g>

        {/* Bottom Telemetry Bar */}
        <rect x="40" y="145" width="560" height="20" fill="#0A0A0C" />
        <text x="50" y="159" fill="#9CA3AF" fontSize="9">
          VERIFICATION: {blueprint.verificationGate.slice(0, 65)}...
        </text>
      </svg>
    </div>
  );
}

export function BlueprintsSection(): React.ReactElement {
  const [state, dispatch] = useReducer(blueprintsReducer, INITIAL_BLUEPRINTS_STATE);

  const filtered =
    state.selectedCategory === 'ALL'
      ? BLUEPRINT_CATALOG
      : BLUEPRINT_CATALOG.filter((b) => b.category === state.selectedCategory);

  return (
    <section
      id="blueprints"
      aria-labelledby="blueprints-heading"
      className="py-16 md:py-24 border-b border-[var(--color-border-hairline)] bg-[var(--color-canvas)]"
    >
      <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[var(--color-border-hairline)]">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-signal)] font-semibold">
              Production Architecture Blueprints
            </span>
            <h2 id="blueprints-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-ink-primary)] mt-2">
              Architecture Before Assumptions.
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Blueprint categories">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={state.selectedCategory === cat}
                onClick={() => dispatch({ type: 'SELECT_CATEGORY', category: cat })}
                className={`px-3 py-1.5 font-mono text-xs border transition-colors ${
                  state.selectedCategory === cat
                    ? 'border-[var(--color-ink-primary)] bg-[var(--color-ink-primary)] text-white'
                    : 'border-[var(--color-border-hairline)] bg-[var(--color-surface-elevated)] text-[var(--color-ink-secondary)] hover:border-[var(--color-border-strong)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blueprint Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-10">
          {filtered.map((bp) => (
            <article
              key={bp.id}
              className="border border-[var(--color-border-hairline)] bg-[var(--color-surface-elevated)] p-6 sm:p-8 flex flex-col justify-between hover:border-[var(--color-border-strong)] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs mb-3">
                  <span className="text-[var(--color-accent-signal)] font-bold">{bp.badge}</span>
                  <span className="text-[var(--color-ink-muted)]">{bp.durationLabel}</span>
                </div>

                <h3 className="text-xl font-bold text-[var(--color-ink-primary)] mb-2">
                  {bp.title}
                </h3>

                <p className="text-xs text-[var(--color-ink-secondary)] leading-relaxed mb-4">
                  {bp.summary}
                </p>

                {/* Inline Architecture SVG */}
                <BlueprintSvgDiagram blueprint={bp} />

                {/* Checklist Summary */}
                <div className="space-y-1.5 font-mono text-[11px] text-[var(--color-ink-muted)] mb-6">
                  {bp.checklist.map((step) => (
                    <div key={step.stepIndex} className="flex items-start gap-2">
                      <span className="text-[var(--color-accent-signal)] font-bold">{step.stepIndex}.</span>
                      <span className="text-[var(--color-ink-secondary)]">{step.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--color-border-hairline)] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    dispatch({ type: 'OPEN_DRAWER', id: bp.id });
                    trackClientEvent('blueprint_inspect', bp.title, { blueprintId: bp.id });
                  }}
                  className="inline-flex items-center justify-center border border-[var(--color-ink-primary)] py-2 px-3.5 font-mono text-xs font-semibold text-[var(--color-ink-primary)] hover:bg-[var(--color-ink-primary)] hover:text-white transition-colors"
                >
                  Quick Inspect &rarr;
                </button>
                <Link
                  href={`/blueprints/${bp.id}`}
                  className="font-mono text-xs text-[var(--color-ink-muted)] hover:text-[var(--color-accent-signal)] transition-colors underline underline-offset-4"
                >
                  Full Specs
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Inspection Drawer */}
      <BlueprintDrawer
        blueprintId={state.inspectedBlueprintId}
        onClose={() => dispatch({ type: 'CLOSE_DRAWER' })}
      />
    </section>
  );
}
