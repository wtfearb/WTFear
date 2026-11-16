'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuditModal } from '../modals/AuditModalProvider';
import { trackClientEvent } from '../TelemetryTracker';

export function HeroSection(): React.ReactElement {
  const { openModal } = useAuditModal();
  const [activeNode, setActiveNode] = useState<string | null>('pgvector');

  const handleAuditClick = () => {
    trackClientEvent('cta_click', 'Hero: Book an Architecture Audit');
    openModal();
  };

  const handleExploreClick = () => {
    trackClientEvent('cta_click', 'Hero: Explore Our Engineering');
  };

  return (
    <section
      aria-labelledby="hero-title"
      className="relative border-b border-[var(--color-border-hairline)] bg-[var(--color-canvas)] pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden"
    >
      <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
        {/* Definition Lead for AEO and technical indexing (Hidden visually, preserved in DOM for AI answer engines) */}
        <div className="sr-only">
          <dl className="font-mono text-xs text-[var(--color-ink-secondary)] leading-relaxed">
            <dt className="inline font-bold text-[var(--color-ink-primary)]">
              <dfn>WTFearB (Product &amp; AI Engineering Studio)</dfn>:
            </dt>{' '}
            <dd className="inline">
              An embedded senior engineering pod that turns speculative &ldquo;What If&rdquo; into deterministic production reality. We architect and ship governed AI agents, Next.js 15 web applications, and distributed event systems in rapid 2-week sprints with 100% client GitHub IP ownership.
            </dd>
          </dl>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 border border-[var(--color-border-hairline)] bg-[var(--color-surface-pure)] px-3 py-1 font-mono text-xs uppercase tracking-widest text-[var(--color-accent-signal)] font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-signal)] animate-pulse" />
              <span>PRODUCT &amp; AI ENGINEERING STUDIO</span>
            </div>

            <h1
              id="hero-title"
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--color-ink-primary)] leading-[1.04]"
            >
              Make &ldquo;What If&rdquo; Work.
            </h1>

            <p className="text-lg sm:text-xl text-[var(--color-ink-secondary)] max-w-2xl leading-relaxed">
              We eliminate the gap between high-level ambition and production reality. No marketing fluff, no junior handoffs. Two embedded senior systems engineers delivering governed AI agents, Next.js 15 web platforms, and distributed event backends straight to your GitHub organization.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleAuditClick}
                className="inline-flex items-center justify-center bg-[var(--color-ink-primary)] text-white px-6 py-3.5 font-mono text-xs font-semibold hover:bg-[var(--color-accent-signal)] transition-colors shadow-sm"
              >
                Book an Architecture Audit &rarr;
              </button>

              <Link
                href="/blueprints"
                onClick={handleExploreClick}
                className="inline-flex items-center justify-center border border-[var(--color-border-hairline)] bg-[var(--color-surface-pure)] text-[var(--color-ink-primary)] px-6 py-3.5 font-mono text-xs font-semibold hover:border-[var(--color-ink-primary)] transition-colors"
              >
                Explore Our Engineering [BLUEPRINTS]
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Geometric Architectural System Composition */}
          <div className="lg:col-span-5">
            <div className="border border-[var(--color-border-hairline)] bg-[var(--color-surface-pure)] p-5 relative shadow-sm">
              <div className="flex items-center justify-between border-b border-[var(--color-border-hairline)] pb-3 mb-4 font-mono text-[11px] text-[var(--color-ink-muted)]">
                <span className="text-[var(--color-ink-primary)] font-bold">// ARCHITECTURAL TOPOLOGY</span>
                <span className="text-[var(--color-accent-signal)] font-bold">STATE: DETERMINISTIC</span>
              </div>

              {/* SVG Diagram with hoverable nodes */}
              <svg
                viewBox="0 0 460 280"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto font-mono text-xs select-none"
                aria-label="Interactive Architectural Topology Diagram"
              >
                {/* Precision Background Grid */}
                <defs>
                  <pattern id="heroGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E2E8" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="460" height="280" fill="url(#heroGrid)" />

                {/* Connecting Data Busses */}
                <path d="M 100 80 L 230 80 L 230 190 L 360 190" stroke="#C5C6D0" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M 100 190 L 230 190 L 360 80" stroke="#C5C6D0" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Node 1: Ingress Edge */}
                <g
                  className="cursor-pointer transition-transform"
                  onMouseEnter={() => setActiveNode('edge')}
                  onClick={() => setActiveNode('edge')}
                >
                  <rect
                    x="20"
                    y="50"
                    width="140"
                    height="60"
                    rx="2"
                    fill={activeNode === 'edge' ? '#0A0A0C' : '#FFFFFF'}
                    stroke={activeNode === 'edge' ? '#C83E1B' : '#E2E2E8'}
                    strokeWidth="1.5"
                  />
                  <circle cx="36" cy="68" r="4" fill="#C83E1B" className="animate-svg-pulse" />
                  <text x="48" y="72" fill={activeNode === 'edge' ? '#FFFFFF' : '#0A0A0C'} fontSize="10" fontWeight="bold">
                    01 CLOUDFLARE EDGE
                  </text>
                  <text x="48" y="94" fill={activeNode === 'edge' ? '#9CA3AF' : '#5A5D6A'} fontSize="9">
                    HMAC &bull; &lt; 15ms Ingress
                  </text>
                </g>

                {/* Node 2: Next.js 15 App Router */}
                <g
                  className="cursor-pointer transition-transform"
                  onMouseEnter={() => setActiveNode('rsc')}
                  onClick={() => setActiveNode('rsc')}
                >
                  <rect
                    x="20"
                    y="160"
                    width="140"
                    height="60"
                    rx="2"
                    fill={activeNode === 'rsc' ? '#0A0A0C' : '#FFFFFF'}
                    stroke={activeNode === 'rsc' ? '#C83E1B' : '#E2E2E8'}
                    strokeWidth="1.5"
                  />
                  <rect x="32" y="174" width="8" height="8" fill="#10B981" />
                  <text x="48" y="182" fill={activeNode === 'rsc' ? '#FFFFFF' : '#0A0A0C'} fontSize="10" fontWeight="bold">
                    02 REACT 19 RSC
                  </text>
                  <text x="48" y="204" fill={activeNode === 'rsc' ? '#9CA3AF' : '#5A5D6A'} fontSize="9">
                    Streaming &bull; LCP &lt; 1.2s
                  </text>
                </g>

                {/* Node 3: Hybrid pgvector + BM25 */}
                <g
                  className="cursor-pointer transition-transform"
                  onMouseEnter={() => setActiveNode('pgvector')}
                  onClick={() => setActiveNode('pgvector')}
                >
                  <rect
                    x="300"
                    y="50"
                    width="140"
                    height="60"
                    rx="2"
                    fill={activeNode === 'pgvector' ? '#0A0A0C' : '#FFFFFF'}
                    stroke={activeNode === 'pgvector' ? '#C83E1B' : '#E2E2E8'}
                    strokeWidth="1.5"
                  />
                  <circle cx="316" cy="68" r="4" fill="#C83E1B" />
                  <text x="328" y="72" fill={activeNode === 'pgvector' ? '#FFFFFF' : '#0A0A0C'} fontSize="10" fontWeight="bold">
                    03 PGVECTOR + BM25
                  </text>
                  <text x="328" y="94" fill={activeNode === 'pgvector' ? '#9CA3AF' : '#5A5D6A'} fontSize="9">
                    HNSW RRF &bull; PostgreSQL 16
                  </text>
                </g>

                {/* Node 4: CI Golden Eval Gate */}
                <g
                  className="cursor-pointer transition-transform"
                  onMouseEnter={() => setActiveNode('gate')}
                  onClick={() => setActiveNode('gate')}
                >
                  <rect
                    x="300"
                    y="160"
                    width="140"
                    height="60"
                    rx="2"
                    fill={activeNode === 'gate' ? '#0A0A0C' : '#FFFFFF'}
                    stroke={activeNode === 'gate' ? '#C83E1B' : '#E2E2E8'}
                    strokeWidth="1.5"
                  />
                  <rect x="312" y="174" width="8" height="8" fill="#10B981" />
                  <text x="328" y="182" fill={activeNode === 'gate' ? '#FFFFFF' : '#0A0A0C'} fontSize="10" fontWeight="bold">
                    04 GOLDEN EVAL GATE
                  </text>
                  <text x="328" y="204" fill={activeNode === 'gate' ? '#9CA3AF' : '#5A5D6A'} fontSize="9">
                    50-Case CI Test Harness
                  </text>
                </g>
              </svg>

              {/* Node Inspector Callout */}
              <div className="mt-3 p-3 bg-[var(--color-surface-subtle)] border border-[var(--color-border-hairline)] font-mono text-xs">
                {activeNode === 'edge' && (
                  <p className="text-[var(--color-ink-primary)]">
                    <strong className="text-[var(--color-accent-signal)]">Edge Ingress:</strong> Sub-15ms webhook capture, cryptographic HMAC verification, and distributed rate limiting.
                  </p>
                )}
                {activeNode === 'rsc' && (
                  <p className="text-[var(--color-ink-primary)]">
                    <strong className="text-[var(--color-accent-signal)]">Frontend Pipeline:</strong> Next.js 15 App Router with streaming React Server Components, delivering zero-client-JS layouts.
                  </p>
                )}
                {activeNode === 'pgvector' && (
                  <p className="text-[var(--color-ink-primary)]">
                    <strong className="text-[var(--color-accent-signal)]">Retrieval Engine:</strong> Single-round PostgreSQL 16 pgvector HNSW cosine similarity fused with BM25 lexical rank.
                  </p>
                )}
                {activeNode === 'gate' && (
                  <p className="text-[var(--color-ink-primary)]">
                    <strong className="text-[var(--color-accent-signal)]">Governance Gate:</strong> 50-case automated CI evaluation harness blocking hallucinations before code merges.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quantitative Proof Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-[var(--color-border-hairline)] pt-8">
          <div className="border border-[var(--color-border-hairline)] p-5 bg-[var(--color-surface-pure)]">
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[var(--color-ink-primary)]">
              14 Days
            </div>
            <div className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-muted)] mt-1">
              Rapid Sprint Cadence
            </div>
          </div>

          <div className="border border-[var(--color-border-hairline)] p-5 bg-[var(--color-surface-pure)]">
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[var(--color-ink-primary)]">
              100%
            </div>
            <div className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-muted)] mt-1">
              Client GitHub IP Ownership
            </div>
          </div>

          <div className="border border-[var(--color-border-hairline)] p-5 bg-[var(--color-surface-pure)]">
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[var(--color-accent-signal)]">
              0.00%
            </div>
            <div className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-muted)] mt-1">
              Uncited Autonomous Actions
            </div>
          </div>

          <div className="border border-[var(--color-border-hairline)] p-5 bg-[var(--color-surface-pure)]">
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[var(--color-ink-primary)]">
              &lt; 1.2s
            </div>
            <div className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-muted)] mt-1">
              LCP Target SLA
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
