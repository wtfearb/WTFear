import React from 'react';
import Link from 'next/link';
import { getPortfolioProjects, getSiteSettings } from '@/lib/db';

interface ProjectIndexRow {
  readonly number: string;
  readonly category: string;
  readonly title: string;
  readonly capabilities: string;
  readonly stack: string;
  readonly href: string;
}

const COMPACT_PROJECT_INDEX: readonly ProjectIndexRow[] = [
  {
    number: '02',
    category: 'CONVERSATIONAL VOICE AI',
    title: 'NexusVoice — Sovereign Real-Time Conversational Voice AI Platform',
    capabilities: 'Streaming audio VAD · Direct WebRTC & SIP · Zero per-minute markups',
    stack: 'Python 3.12 / FastAPI / WebRTC',
    href: '/projects/nexus-voice',
  },
  {
    number: '03',
    category: 'DOCUMENT RAG & INTELLIGENCE',
    title: 'VegaDocs — Air-Gapped Document Intelligence & Multi-Model RAG',
    capabilities: 'Isolated vector memory · Deterministic citations · Clause analysis',
    stack: 'Next.js 15 / pgvector / ParadeDB BM25',
    href: '/projects/vega-docs',
  },
  {
    number: '04',
    category: 'TECHNICAL SECURITY & WEB AUDIT',
    title: 'NexusAudit — Autonomous Web Auditor & Technical Intelligence Engine',
    capabilities: 'Multi-layer security audit · CWV bottlenecks · Remediation patches',
    stack: 'Next.js 15 / Edge Inspector / Playwright',
    href: '/projects/nexus-audit',
  },
];

export async function ProjectsPreviewSection(): Promise<React.ReactElement> {
  const [, settings] = await Promise.all([
    getPortfolioProjects(true),
    getSiteSettings(),
  ]);

  const isComingSoon = settings.portfolioDisplayMode === 'coming_soon_empty_state';

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="py-16 md:py-24 border-b border-[#E0E2E7] bg-[#F7F7F9]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* REGION A: SECTION INTRODUCTION */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 mb-10 border-b border-[#E0E2E7]">
          <div>
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#D63F1F] mb-3">
              SELECTED WORK / ENGINEERING CASE FILES
            </div>
            <h2
              id="projects-title"
              className="font-sans font-extrabold text-[#101114] text-[36px] sm:text-[44px] lg:text-[48px] leading-[1.06] tracking-[-0.03em] mb-3"
            >
              Work That Speaks Through Execution.
            </h2>
            <p className="font-sans text-[15px] sm:text-[16px] leading-[1.6] text-[#596171] max-w-2xl">
              A curated selection of engineering work and technical explorations across AI,
              applications and connected systems.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="/projects"
              className="font-mono text-[12px] font-bold uppercase tracking-[0.06em] text-[#101114] hover:text-[#D63F1F] inline-flex items-center gap-2 transition-colors group"
            >
              <span>VIEW FULL 10-PROJECT CATALOG</span>
              <span
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                &rarr;
              </span>
            </Link>
          </div>
        </div>

        {isComingSoon ? (
          /* Empty State View */
          <div className="my-12 p-12 border border-[#E0E2E7] bg-white text-center space-y-4 max-w-3xl mx-auto rounded-[6px]">
            <div className="inline-block p-3 border border-[#E0E2E7] bg-[#F7F7F9] font-mono text-xs text-[#D63F1F] font-bold">
              [SYSTEM NOTICE: PORTFOLIO REFACTORING]
            </div>
            <h3 className="text-2xl font-bold text-[#101114]">
              Good engineering deserves to be shown properly. Our project portfolio is being prepared.
            </h3>
            <p className="text-sm text-[#596171] leading-relaxed max-w-xl mx-auto">
              We are finalizing live interactive sandboxes, sanitized architectural diagrams, and
              verified telemetry logs for each production engagement. In the meantime, you can
              inspect our live blueprints or schedule a 15-minute architecture audit.
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <Link
                href="/blueprints"
                className="inline-flex items-center px-5 py-2.5 bg-[#101114] text-white font-mono text-xs font-semibold hover:bg-[#D63F1F] transition-colors"
              >
                Inspect Blueprints &rarr;
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* REGION B: FEATURED PROJECT: POLARIS ERP (Two-Column Horizontal Container) */}
            <div className="bg-[#FFFFFF] border border-[#E0E2E7] rounded-[6px] p-6 sm:p-8 lg:p-10 mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch shadow-[0_2px_8px_rgba(16,17,20,0.03)]">
              {/* LEFT COLUMN: PROJECT INFORMATION */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  {/* Top Classification Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-[#D63F1F]">
                      01 / ENTERPRISE OPERATIONS &amp; CRM
                    </span>
                    <span className="px-2.5 py-1 bg-[#F7F7F9] border border-[#E0E2E7] rounded-[3px] font-mono text-[10px] font-semibold uppercase tracking-[0.05em] text-[#596171]">
                      CFO / COO (MID-MARKET ENTERPRISES)
                    </span>
                  </div>

                  {/* Project Title & Description */}
                  <h3 className="font-sans text-[24px] sm:text-[28px] font-extrabold tracking-[-0.025em] text-[#101114] leading-[1.15] mb-3">
                    PolarisERP — Autonomous Enterprise CRM &amp; ERP
                  </h3>
                  <p className="font-sans text-[14.5px] leading-[1.6] text-[#596171] mb-6">
                    An AI-native enterprise resource planning and CRM framework engineered to replace
                    rigid legacy ERP stacks with autonomous invoice reconciliation, real-time working
                    capital forecasting, and unified operations.
                  </p>

                  {/* Engineering Focus List */}
                  <div className="mb-6">
                    <div className="font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-[#101114] mb-2.5">
                      ENGINEERING FOCUS
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2.5 font-sans text-[13.5px] text-[#101114] font-medium">
                        <span className="w-1.5 h-1.5 rounded-[1px] bg-[#D63F1F] shrink-0" />
                        <span>Autonomous invoice &amp; ledger reconciliation</span>
                      </li>
                      <li className="flex items-center gap-2.5 font-sans text-[13.5px] text-[#101114] font-medium">
                        <span className="w-1.5 h-1.5 rounded-[1px] bg-[#D63F1F] shrink-0" />
                        <span>Real-time working capital &amp; treasury forecasting</span>
                      </li>
                      <li className="flex items-center gap-2.5 font-sans text-[13.5px] text-[#101114] font-medium">
                        <span className="w-1.5 h-1.5 rounded-[1px] bg-[#D63F1F] shrink-0" />
                        <span>Unified CRM, inventory &amp; operations without plugin sprawl</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Technology Tags & CTA */}
                <div className="pt-5 mt-auto border-t border-[#E0E2E7] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {['Next.js 15', 'PostgreSQL 16', 'Drizzle ORM', 'TypeScript 5.7'].map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-[#F7F7F9] border border-[#E0E2E7] rounded-[3px] font-mono text-[11px] font-medium text-[#596171]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/projects/polaris-erp"
                    className="font-mono text-[12px] font-bold uppercase tracking-[0.06em] text-[#D63F1F] hover:text-[#101114] inline-flex items-center gap-1.5 transition-colors group/cta"
                  >
                    <span>EXPLORE CASE STUDY</span>
                    <span
                      className="transition-transform duration-200 group-hover/cta:translate-x-1"
                      aria-hidden="true"
                    >
                      &rarr;
                    </span>
                  </Link>
                </div>
              </div>

              {/* RIGHT COLUMN: DARK ARCHITECTURE VISUALIZATION */}
              <div className="lg:col-span-6 bg-[#101114] text-[#E8EAF0] border border-[#23262F] rounded-[6px] p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden">
                {/* 20px Grid Background Overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, #23262F 1px, transparent 1px), linear-gradient(to bottom, #23262F 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />

                {/* Panel Header */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#23262F] relative z-10">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#E8EAF0]">
                    SYSTEM OVERVIEW
                  </span>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#D63F1F]">
                    REFERENCE FLOW
                  </span>
                </div>

                {/* Four Connected Architectural Stages */}
                <div className="relative z-10 my-auto py-4">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5">
                    {/* Stage 01 */}
                    <div className="flex-1 min-w-0 bg-[#16181E] border border-[#2C303C] rounded-[4px] p-2.5 sm:p-3 text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-[#8C93A4]">01.</span>
                        <svg
                          className="w-3.5 h-3.5 text-[#8C93A4]"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="3" width="12" height="10" rx="1.5" />
                          <path d="M5 8h6M8 5l3 3-3 3" />
                        </svg>
                      </div>
                      <div className="font-mono text-[11px] sm:text-[12px] font-bold text-[#E8EAF0] mt-2">
                        INGRESS
                      </div>
                      <div className="font-mono text-[9.5px] sm:text-[10px] uppercase leading-tight tracking-[0.01em] text-[#8C93A4] mt-0.5 whitespace-nowrap">
                        INVOICES
                      </div>
                    </div>

                    {/* Arrow 1 -> 2 */}
                    <div className="hidden sm:flex text-[#D63F1F] shrink-0 font-mono text-xs px-0.5">
                      &rarr;
                    </div>
                    <div className="sm:hidden flex justify-center text-[#D63F1F] font-mono text-xs py-0.5">
                      &darr;
                    </div>

                    {/* Stage 02 */}
                    <div className="flex-1 min-w-0 bg-[#16181E] border border-[#2C303C] rounded-[4px] p-2.5 sm:p-3 text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-[#8C93A4]">02.</span>
                        <svg
                          className="w-3.5 h-3.5 text-[#8C93A4]"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <ellipse cx="8" cy="4" rx="5" ry="2" />
                          <path d="M3 4v4c0 1.1 2.2 2 5 2s5-.9 5-2V4" />
                          <path d="M3 8v4c0 1.1 2.2 2 5 2s5-.9 5-2V8" />
                        </svg>
                      </div>
                      <div className="font-mono text-[11px] sm:text-[12px] font-bold text-[#E8EAF0] mt-2">
                        MATCH
                      </div>
                      <div className="font-mono text-[9.5px] sm:text-[10px] uppercase leading-tight tracking-[0.01em] text-[#8C93A4] mt-0.5 whitespace-nowrap">
                        LEDGER
                      </div>
                    </div>

                    {/* Arrow 2 -> 3 */}
                    <div className="hidden sm:flex text-[#D63F1F] shrink-0 font-mono text-xs px-0.5">
                      &rarr;
                    </div>
                    <div className="sm:hidden flex justify-center text-[#D63F1F] font-mono text-xs py-0.5">
                      &darr;
                    </div>

                    {/* Stage 03 (Highlighted in Signal Orange) */}
                    <div className="flex-1 min-w-0 bg-[#221513] border border-[#D63F1F] rounded-[4px] p-2.5 sm:p-3 text-left shadow-[0_0_20px_rgba(214,63,31,0.18)]">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold text-[#D63F1F]">03.</span>
                        <svg
                          className="w-3.5 h-3.5 text-[#D63F1F]"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M8 2l5 2v4.5c0 3.2-2.3 5.5-5 6.5-2.7-1-5-3.3-5-6.5V4l5-2z" />
                          <path d="M6 8l1.5 1.5L10.5 6" />
                        </svg>
                      </div>
                      <div className="font-mono text-[11px] sm:text-[12px] font-bold text-[#FFFFFF] mt-2">
                        FORECAST
                      </div>
                      <div className="font-mono text-[9.5px] sm:text-[10px] uppercase leading-tight tracking-[0.01em] text-[#F29B88] mt-0.5 whitespace-nowrap">
                        CAPITAL
                      </div>
                    </div>

                    {/* Arrow 3 -> 4 */}
                    <div className="hidden sm:flex text-[#D63F1F] shrink-0 font-mono text-xs px-0.5">
                      &rarr;
                    </div>
                    <div className="sm:hidden flex justify-center text-[#D63F1F] font-mono text-xs py-0.5">
                      &darr;
                    </div>

                    {/* Stage 04 */}
                    <div className="flex-1 min-w-0 bg-[#16181E] border border-[#2C303C] rounded-[4px] p-2.5 sm:p-3 text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-[#8C93A4]">04.</span>
                        <svg
                          className="w-3.5 h-3.5 text-[#8C93A4]"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="4" cy="4" r="2" />
                          <circle cx="12" cy="4" r="2" />
                          <circle cx="4" cy="12" r="2" />
                          <path d="M4 6v4M6 4h4" />
                        </svg>
                      </div>
                      <div className="font-mono text-[11px] sm:text-[12px] font-bold text-[#E8EAF0] mt-2">
                        COMMIT
                      </div>
                      <div className="font-mono text-[9.5px] sm:text-[10px] uppercase leading-tight tracking-[0.01em] text-[#8C93A4] mt-0.5 whitespace-nowrap">
                        ERP STATE
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Three Architectural Principles */}
                <div className="pt-4 mt-6 border-t border-[#23262F] flex flex-wrap items-center justify-between gap-3 relative z-10">
                  {['Double-entry ledger', 'Real-time treasury', 'Autonomous reconciliation'].map(
                    (principle) => (
                      <div
                        key={principle}
                        className="flex items-center gap-2 font-mono text-[11px] text-[#A4ABB8]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D63F1F]" />
                        <span>{principle}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* REGION C: MORE SELECTED WORK: COMPACT PROJECT INDEX (Rows 02–04) */}
            <div>
              {/* Index Header Bar */}
              <div className="flex items-center justify-between pb-3.5 border-b border-[#101114]">
                <span className="font-mono text-[12px] font-bold uppercase tracking-[0.08em] text-[#101114]">
                  MORE SELECTED WORK
                </span>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-[#596171]">
                  PROJECT INDEX / 02—04
                </span>
              </div>

              {/* Three Horizontal Project Rows */}
              <div className="divide-y divide-[#E0E2E7] border-b border-[#E0E2E7]">
                {COMPACT_PROJECT_INDEX.map((row) => (
                  <div
                    key={row.number}
                    className="group py-5 px-2 hover:bg-[#FFFFFF] transition-colors grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center"
                  >
                    {/* Zone 1: Project Number */}
                    <div className="lg:col-span-1 font-mono text-[13px] font-bold text-[#D63F1F]">
                      {row.number}
                    </div>

                    {/* Zone 2: Category & Project Title */}
                    <div className="lg:col-span-5">
                      <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.06em] text-[#596171] mb-1 block">
                        {row.category}
                      </span>
                      <h3 className="font-sans text-[17px] sm:text-[18px] font-extrabold tracking-[-0.015em] text-[#101114] group-hover:text-[#D63F1F] transition-colors leading-snug">
                        <Link href={row.href}>{row.title}</Link>
                      </h3>
                    </div>

                    {/* Zone 3: Technical Capabilities & Technology Stack */}
                    <div className="lg:col-span-4">
                      <div className="font-sans text-[13px] font-medium text-[#101114] mb-1 leading-snug">
                        {row.capabilities}
                      </div>
                      <div className="font-mono text-[11.5px] text-[#596171]">
                        {row.stack}
                      </div>
                    </div>

                    {/* Zone 4: Explore Action */}
                    <div className="lg:col-span-2 lg:text-right">
                      <Link
                        href={row.href}
                        className="font-mono text-[12px] font-bold uppercase tracking-[0.06em] text-[#101114] group-hover:text-[#D63F1F] inline-flex items-center lg:justify-end gap-1.5 transition-colors"
                      >
                        <span>EXPLORE</span>
                        <span
                          className="transition-transform duration-200 group-hover:translate-x-1"
                          aria-hidden="true"
                        >
                          &rarr;
                        </span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
