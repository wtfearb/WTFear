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
    <section
      id="stack"
      aria-labelledby="stack-title"
      className="py-16 md:py-24 border-b border-[#E2E2E8] bg-[#F7F7F9]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header: Swiss-Editorial Split Layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#E2E2E8]">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#C83E1B] bg-[#C83E1B]/8 px-2.5 py-1 rounded-sm border border-[#C83E1B]/20 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B]" />
              Zero-Bloat Architectural Rigor
            </div>
            <h2
              id="stack-title"
              className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-[#0C0D10] leading-[1.1]"
            >
              Built With Technologies That <span className="text-[#C83E1B]">Scale</span>.
            </h2>
          </div>
          <div className="max-w-md md:border-l md:border-[#E2E2E8] md:pl-6">
            <p className="text-sm text-[#5B616E] leading-relaxed">
              Every layer in our production blueprint is chosen for latency determinism, type safety, and zero vendor lock-in. No fragile low-code wrappers or black-box abstractions.
            </p>
          </div>
        </div>

        {/* Semantic Zero-JS Matrix Table Container */}
        <div className="mt-8 border border-[#E2E2E8] bg-white shadow-xs overflow-hidden">
          {/* Top Workbench Status Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#0C0D10] text-white border-b border-[#1E2028] font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="font-semibold tracking-wider text-[11px] uppercase">
                PRODUCTION TECHNOLOGY MATRIX // VERIFIED BLUEPRINTS
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#8E95A5]">
              <span>5 LAYERS EVALUATED</span>
              <span className="text-[#343846]">|</span>
              <span className="text-[#C83E1B] font-semibold">100% CI GATED</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse min-w-[760px]">
              <thead>
                <tr className="border-b border-[#E2E2E8] bg-[#F9F9FB] text-[#0C0D10]">
                  <th scope="col" className="p-4 font-bold uppercase tracking-wider text-[11px] w-[18%]">
                    <span className="text-[#C83E1B] mr-1">// 01</span> Discipline
                  </th>
                  <th scope="col" className="p-4 font-bold uppercase tracking-wider text-[11px] w-[26%]">
                    <span className="text-[#C83E1B] mr-1">// 02</span> Technology Stack
                  </th>
                  <th scope="col" className="p-4 font-bold uppercase tracking-wider text-[11px] w-[26%]">
                    <span className="text-[#C83E1B] mr-1">// 03</span> Production Role
                  </th>
                  <th scope="col" className="p-4 font-bold uppercase tracking-wider text-[11px] w-[15%]">
                    <span className="text-[#C83E1B] mr-1">// 04</span> Latency SLO (p95)
                  </th>
                  <th scope="col" className="p-4 font-bold uppercase tracking-wider text-[11px] w-[15%]">
                    <span className="text-[#C83E1B] mr-1">// 05</span> CI Gate
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E2E8] text-[#5B616E]">
                {STACK_ROWS.map((row) => (
                  <tr
                    key={row.layer}
                    className="hover:bg-[#F9F9FB] transition-colors group"
                  >
                    <td className="p-4 font-semibold text-[#0C0D10]">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#C83E1B] font-bold">//</span>
                        <span>{row.group}</span>
                      </div>
                      <div className="text-[10.5px] font-mono text-[#8E95A5] mt-0.5 tracking-tight font-normal">
                        {row.layer}
                      </div>
                    </td>
                    <td className="p-4 text-[#0C0D10] font-medium">
                      <span className="inline-block px-2 py-0.5 bg-[#F4F4F6] border border-[#E2E2E8] text-[#0C0D10] text-[11px]">
                        {row.technology}
                      </span>
                    </td>
                    <td className="p-4 text-[#5B616E] text-[11.5px] leading-relaxed">
                      {row.role}
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-[#C83E1B] bg-[#C83E1B]/8 border border-[#C83E1B]/20 px-2 py-0.5 text-[11px] whitespace-nowrap">
                        {row.latencyTarget}
                      </span>
                    </td>
                    <td className="p-4 text-[#5B616E] text-[11px] leading-snug">
                      <div className="flex items-start gap-1.5">
                        <svg
                          className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{row.verificationGate}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Architectural Guarantee Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E2E2E8] border-t border-[#E2E2E8] bg-[#F9F9FB] text-xs font-mono">
            <div className="p-3.5 flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 bg-[#C83E1B]" />
              <span className="font-bold text-[#0C0D10]">[01] Zero Vendor Lock-in</span>
              <span className="text-[#8E95A5] text-[11px] ml-auto">100% Client Owned</span>
            </div>
            <div className="p-3.5 flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 bg-[#C83E1B]" />
              <span className="font-bold text-[#0C0D10]">[02] Deterministic Schemas</span>
              <span className="text-[#8E95A5] text-[11px] ml-auto">Pydantic & Zod Gates</span>
            </div>
            <div className="p-3.5 flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 bg-[#C83E1B]" />
              <span className="font-bold text-[#0C0D10]">[03] Sub-Second Latency</span>
              <span className="text-[#8E95A5] text-[11px] ml-auto">Edge + RSC Optimization</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
