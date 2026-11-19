import React from 'react';
import Link from 'next/link';

interface IndexRow {
  readonly rank: string;
  readonly code: string;
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly classification: string;
  readonly liveUrl: string;
  readonly repoUrl: string;
}

const INDEX_ROWS: readonly IndexRow[] = [
  {
    rank: '08',
    code: 'SIRIUSIQ',
    slug: 'sirius-iq',
    title: 'Cognitive Agent Decision Fabric & Algorithmic Task Runtime',
    description:
      'Coordinates multi-agent workflows, data ingestion loops, and self-correcting verification before database mutations.',
    classification: 'MULTI-AGENT DECISION FABRIC · VP ENGINEERING / OPS',
    liveUrl: 'https://sirius-iq.vercel.app/',
    repoUrl: 'https://github.com/wtfear/SiriusIQ',
  },
  {
    rank: '09',
    code: 'ALTAIRCOMMERCE',
    slug: 'altair-commerce',
    title: 'Headless Digital Commerce & Multi-Vendor Marketplace',
    description:
      'Edge-cached headless storefront with multi-vendor escrow management and automated vendor commission splitting.',
    classification: 'HEADLESS COMMERCE ENGINE · E-COMMERCE / BRAND VP',
    liveUrl: 'https://altair-commerce.vercel.app/',
    repoUrl: 'https://github.com/wtfear/AltairCommerce',
  },
  {
    rank: '10',
    code: 'ANTARESERP',
    slug: 'antares-erp',
    title: 'Autonomous Retail POS & Multi-Warehouse Operations Engine',
    description:
      'Connects barcode scanning lanes, stockrooms, and automated purchase ordering with offline-resilient checkout sync.',
    classification: 'RETAIL POS & SUPPLY CHAIN · RETAIL / LOGISTICS VP',
    liveUrl: 'https://antares-erp.vercel.app/',
    repoUrl: 'https://github.com/wtfear/AntaresERP',
  },
];

export function ProjectsIndexTable(): React.ReactElement {
  return (
    <section className="py-16 border-b border-[#E2E2E8] bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 mb-8 border-b border-[#E2E2E8]">
          <div>
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B] block mb-2">
              03 / PROJECT INDEX
            </span>
            <h2 className="font-sans text-[26px] sm:text-[32px] font-extrabold tracking-[-0.025em] text-[#0A0A0C]">
              Revenue engines &amp; workflow fabrics.
            </h2>
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#5A5D6A]">
            RANKS 08—10 / THREE PRODUCTION SYSTEMS
          </div>
        </div>

        {/* 3 Spacious Horizontal Editorial Index Rows */}
        <div className="divide-y divide-[#E2E2E8] border-t border-b border-[#E2E2E8]">
          {INDEX_ROWS.map((row) => (
            <div
              key={row.slug}
              className="py-6 px-2 sm:px-4 hover:bg-[#F9F9FB] transition-colors grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center"
            >
              {/* Zone 1: Rank */}
              <div className="lg:col-span-1">
                <span className="font-mono text-[15px] font-bold text-[#C83E1B]">
                  {row.rank}
                </span>
              </div>

              {/* Zone 2: Code & Title */}
              <div className="lg:col-span-5">
                <span className="font-mono text-[11px] font-bold tracking-wider text-[#717684] block mb-1">
                  {row.code}
                </span>
                <h3 className="font-sans text-[17px] sm:text-[18px] font-extrabold tracking-[-0.015em] text-[#0A0A0C] leading-snug">
                  <Link href={`/projects/${row.slug}`} className="hover:text-[#C83E1B] transition-colors">
                    {row.title}
                  </Link>
                </h3>
              </div>

              {/* Zone 3: Description & Classification */}
              <div className="lg:col-span-4">
                <p className="font-sans text-[13px] text-[#3F414A] leading-relaxed mb-1.5">
                  &ldquo;{row.description}&rdquo;
                </p>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#898E99] block">
                  {row.classification}
                </span>
              </div>

              {/* Zone 4: Action Links */}
              <div className="lg:col-span-2 lg:text-right flex items-center lg:justify-end gap-3 font-mono text-[11.5px]">
                <a
                  href={row.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C83E1B] font-bold hover:underline whitespace-nowrap shrink-0"
                >
                  Live App ↗
                </a>
                <span className="text-[#D5D7E0]">|</span>
                <a
                  href={row.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5A5D6A] hover:text-[#0A0A0C] transition-colors whitespace-nowrap shrink-0"
                >
                  GitHub ↗
                </a>
                <Link
                  href={`/projects/${row.slug}`}
                  className="p-1 hover:text-[#C83E1B] transition-colors whitespace-nowrap shrink-0"
                  aria-label={`View profile for ${row.code}`}
                >
                  &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* =========================================================================
            3-PRONGED ENTERPRISE ARCHITECTURE PATHWAY
           ========================================================================= */}
        <div className="mt-14 pt-10 border-t border-[#E2E2E8]">
          <div className="mb-6">
            <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#717684] block mb-1">
              ENGAGEMENT CADENCE
            </span>
            <h3 className="font-sans text-[19px] sm:text-[21px] font-extrabold tracking-[-0.02em] text-[#0A0A0C]">
              The 3-Pronged Enterprise Architecture Pathway
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pathway 1: Door Opener */}
            <div className="bg-[#F9F9FB] border border-[#E2E2E8] rounded-[6px] p-5">
              <span className="font-mono text-[11px] font-bold text-[#C83E1B] block mb-2">
                01 // DOOR OPENER
              </span>
              <h4 className="font-sans text-[15px] font-bold text-[#0A0A0C] mb-2">
                Architecture Audit &amp; Technical Discovery
              </h4>
              <p className="font-sans text-[13px] text-[#5A5D6A] leading-relaxed mb-4">
                Fast-turnaround assessment of bottlenecks, security postures, and retrieval architectures (NexusAudit inspection mode).
              </p>
              <div className="font-mono text-[10.5px] text-[#717684]">
                TIMELINE: 3–5 DAYS · ACTIONABLE REPORT
              </div>
            </div>

            {/* Pathway 2: High-ROI Solution */}
            <div className="bg-[#F9F9FB] border border-[#E2E2E8] rounded-[6px] p-5">
              <span className="font-mono text-[11px] font-bold text-[#C83E1B] block mb-2">
                02 // HIGH-ROI SOLUTION
              </span>
              <h4 className="font-sans text-[15px] font-bold text-[#0A0A0C] mb-2">
                Sovereign AI &amp; Operational Automations
              </h4>
              <p className="font-sans text-[13px] text-[#5A5D6A] leading-relaxed mb-4">
                Deploy focused high-leverage workflows (VegaDocs RAG, CastorChat desk, or CapellaBI client-side OLAP).
              </p>
              <div className="font-mono text-[10.5px] text-[#717684]">
                TIMELINE: 2–3 WEEKS · PRODUCTION MVP
              </div>
            </div>

            {/* Pathway 3: Core Contract */}
            <div className="bg-[#F9F9FB] border border-[#C83E1B]/50 rounded-[6px] p-5">
              <span className="font-mono text-[11px] font-bold text-[#C83E1B] block mb-2">
                03 // CORE CONTRACT
              </span>
              <h4 className="font-sans text-[15px] font-bold text-[#0A0A0C] mb-2">
                Autonomous ERP &amp; Event Backbones
              </h4>
              <p className="font-sans text-[13px] text-[#5A5D6A] leading-relaxed mb-4">
                Full-scale enterprise operational spines (PolarisERP, AntaresERP, or SiriusIQ cognitive decision engines).
              </p>
              <div className="font-mono text-[10.5px] text-[#C83E1B] font-semibold">
                TIMELINE: MILESTONE-SCOPED ARCHITECTURE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
