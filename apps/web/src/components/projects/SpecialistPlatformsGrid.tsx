import React from 'react';
import Link from 'next/link';

interface SpecialistPlatform {
  readonly rank: string;
  readonly slug: string;
  readonly domain: string;
  readonly buyer: string;
  readonly title: string;
  readonly description: string;
  readonly moat: string;
  readonly liveUrl?: string;
  readonly repoUrl: string;
  readonly renderDiagram: () => React.ReactElement;
}

const SPECIALIST_PLATFORMS: readonly SpecialistPlatform[] = [
  {
    rank: '02',
    slug: 'nexus-voice',
    domain: 'CONVERSATIONAL VOICE AI',
    buyer: 'VP SALES / HEAD OF CX',
    title: 'NexusVoice — Sovereign Real-Time Voice AI',
    description:
      'Low-latency sovereign conversational voice AI platform designed for automated call dispatch, inbound qualification, and real-time telephony routing via direct WebRTC and SIP integration.',
    moat: 'Direct WebRTC & SIP trunking with zero vendor lock-in and streaming audio turn-taking.',
    repoUrl: 'https://github.com/wtfear/NexusVoice',
    renderDiagram: () => (
      <svg viewBox="0 0 112 84" fill="none" className="w-full h-full block">
        {/* Waveform & SIP Node */}
        <line x1="16" y1="42" x2="16" y2="42" stroke="#C83E1B" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="24" y1="32" x2="24" y2="52" stroke="#C83E1B" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="32" y1="22" x2="32" y2="62" stroke="#C83E1B" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="40" y1="28" x2="40" y2="56" stroke="#C83E1B" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="48" y1="36" x2="48" y2="48" stroke="#C83E1B" strokeWidth="2.5" strokeLinecap="round" />
        {/* SIP Gateway Cube */}
        <rect x="66" y="24" width="36" height="36" rx="3" fill="#14161B" stroke="#2C303D" strokeWidth="1.2" />
        <circle cx="84" cy="42" r="8" stroke="#C83E1B" strokeWidth="1.5" />
        <path d="M84 37v5l3 2" stroke="#C83E1B" strokeWidth="1.2" />
        <text x="84" y="70" textAnchor="middle" fill="#898E99" fontFamily="monospace" fontSize="7">
          SIP // VAD
        </text>
      </svg>
    ),
  },
  {
    rank: '03',
    slug: 'vega-docs',
    domain: 'DOCUMENT RAG & INTELLIGENCE',
    buyer: 'GENERAL COUNSEL / CCO',
    title: 'VegaDocs — Air-Gapped Document Intelligence',
    description:
      'Privacy-first document intelligence workspace delivering isolated vector memory and deterministic source-page citations across large legal contracts, compliance filings, and audit dossiers.',
    moat: 'Isolated vector memory with deterministic source-page & paragraph citation linking.',
    liveUrl: 'https://vegadocs.vercel.app/',
    repoUrl: 'https://github.com/wtfear/VegaDocs',
    renderDiagram: () => (
      <svg viewBox="0 0 112 84" fill="none" className="w-full h-full block">
        {/* PDF Document Page with Citation Offset Lock */}
        <rect x="22" y="14" width="46" height="56" rx="2" fill="#FFFFFF" stroke="#2C303D" strokeWidth="1.2" />
        <line x1="28" y1="24" x2="56" y2="24" stroke="#D5D7E0" strokeWidth="1.5" />
        <line x1="28" y1="32" x2="62" y2="32" stroke="#D5D7E0" strokeWidth="1.5" />
        <line x1="28" y1="40" x2="52" y2="40" stroke="#C83E1B" strokeWidth="1.5" />
        <line x1="28" y1="48" x2="60" y2="48" stroke="#D5D7E0" strokeWidth="1.5" />
        {/* Lock / Verification Badge */}
        <circle cx="80" cy="42" r="14" fill="#221513" stroke="#C83E1B" strokeWidth="1.2" />
        <rect x="75" y="40" width="10" height="8" rx="1" fill="#C83E1B" />
        <path d="M77 40v-3a3 3 0 0 1 6 0v3" stroke="#C83E1B" strokeWidth="1.2" fill="none" />
        <text x="80" y="68" textAnchor="middle" fill="#898E99" fontFamily="monospace" fontSize="7">
          CITATION
        </text>
      </svg>
    ),
  },
  {
    rank: '04',
    slug: 'nexus-audit',
    domain: 'TECHNICAL SECURITY & WEB AUDIT',
    buyer: 'CTO / CMO / LEADERSHIP',
    title: 'NexusAudit — Autonomous Web Auditor',
    description:
      'Rapid technical intelligence and web auditing engine that inspects public web infrastructure for security headers, Core Web Vitals bottlenecks, and SEO/AEO gaps, generating actionable remediation diffs.',
    moat: 'Rapid multi-layer security, CWV & SEO/AEO inspection with actionable remediation code.',
    liveUrl: 'https://nexusaudit.vercel.app/',
    repoUrl: 'https://github.com/wtfear/NexusAudit',
    renderDiagram: () => (
      <svg viewBox="0 0 112 84" fill="none" className="w-full h-full block">
        {/* Radar Scan / Security Gauge */}
        <circle cx="56" cy="42" r="28" stroke="#2C303D" strokeWidth="1.2" />
        <circle cx="56" cy="42" r="18" stroke="#D5D7E0" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="56" cy="42" r="6" fill="#C83E1B" />
        <line x1="56" y1="14" x2="56" y2="70" stroke="#2C303D" strokeWidth="1" />
        <line x1="28" y1="42" x2="84" y2="42" stroke="#2C303D" strokeWidth="1" />
        {/* Sweep Needle */}
        <line x1="56" y1="42" x2="76" y2="22" stroke="#C83E1B" strokeWidth="1.5" />
        <text x="56" y="78" textAnchor="middle" fill="#898E99" fontFamily="monospace" fontSize="7">
          3s SCAN
        </text>
      </svg>
    ),
  },
  {
    rank: '05',
    slug: 'capella-bi',
    domain: 'DUCKDB-WASM ANALYTICS',
    buyer: 'HEAD OF FINANCE / PE / OPS',
    title: 'CapellaBI — In-Browser DuckDB-WASM Analytics',
    description:
      'Client-side executive business intelligence studio powered by in-browser DuckDB-WASM, executing analytical SQL over Parquet and CSV datasets locally with zero cloud warehouse compute overhead.',
    moat: 'In-browser DuckDB-WASM columnar SQL execution with zero cloud compute overhead.',
    liveUrl: 'https://capellabi.vercel.app/',
    repoUrl: 'https://github.com/wtfear/CapellaBI',
    renderDiagram: () => (
      <svg viewBox="0 0 112 84" fill="none" className="w-full h-full block">
        {/* Columnar OLAP Cube */}
        <path d="M56 18 L86 32 L86 58 L56 72 L26 58 L26 32 Z" fill="#14161B" stroke="#2C303D" strokeWidth="1.2" />
        <path d="M56 18 L56 46 L86 32" stroke="#D5D7E0" strokeWidth="1" />
        <path d="M56 46 L26 32" stroke="#D5D7E0" strokeWidth="1" />
        <path d="M56 46 L56 72" stroke="#C83E1B" strokeWidth="1.5" />
        {/* Internal Column Indicator */}
        <rect x="42" y="38" width="8" height="14" fill="#C83E1B" rx="1" />
        <text x="56" y="80" textAnchor="middle" fill="#898E99" fontFamily="monospace" fontSize="7">
          WASM OLAP
        </text>
      </svg>
    ),
  },
  {
    rank: '06',
    slug: 'nexus-persona',
    domain: 'COGNITIVE PERSONA SIMULATION',
    buyer: 'CHIEF STRATEGY OFFICER / PRODUCT',
    title: 'NexusPersona — Autonomous Multi-Agent Persona Engine',
    description:
      'Multi-agent simulation engine that models synthetic user cohorts and structured executive decision debates using calibrated psychometric constraint vectors.',
    moat: 'Psychometric Big Five constraint vectors preventing drift across multi-turn debate loops.',
    repoUrl: 'https://github.com/wtfear/NexusPersona',
    renderDiagram: () => (
      <svg viewBox="0 0 112 84" fill="none" className="w-full h-full block">
        {/* Pentagonal Vector Radar Web */}
        <polygon points="56,16 82,34 72,64 40,64 30,34" stroke="#2C303D" strokeWidth="1.2" fill="none" />
        <polygon points="56,26 72,38 66,54 46,54 40,38" stroke="#D5D7E0" strokeWidth="1" strokeDasharray="2 2" fill="none" />
        <polygon points="56,22 76,36 68,58 44,52 36,32" stroke="#C83E1B" strokeWidth="1.5" fill="#C83E1B" fillOpacity="0.15" />
        <circle cx="56" cy="42" r="2.5" fill="#C83E1B" />
        <text x="56" y="78" textAnchor="middle" fill="#898E99" fontFamily="monospace" fontSize="7">
          BIG FIVE
        </text>
      </svg>
    ),
  },
  {
    rank: '07',
    slug: 'castor-chat',
    domain: 'WHATSAPP SUPPORT DESK',
    buyer: 'HEAD OF SUPPORT / COMMERCE',
    title: 'CastorChat — Omnichannel WhatsApp Automation Desk',
    description:
      'Omnichannel customer operations desk built around direct WhatsApp and messaging ingestion, combining automated Tier-1 triage with seamless human-agent takeover and CRM synchronization.',
    moat: 'Direct WhatsApp webhook ingestion with seamless human takeover and CRM synchronization.',
    liveUrl: 'https://castor-chat.vercel.app/',
    repoUrl: 'https://github.com/wtfear/CastorChat',
    renderDiagram: () => (
      <svg viewBox="0 0 112 84" fill="none" className="w-full h-full block">
        {/* Omnichannel Webhook Router */}
        <rect x="20" y="24" width="34" height="24" rx="4" fill="#FFFFFF" stroke="#2C303D" strokeWidth="1.2" />
        <path d="M26 32h14M26 38h8" stroke="#D5D7E0" strokeWidth="1.5" />
        {/* Router Core */}
        <circle cx="70" cy="36" r="12" fill="#221513" stroke="#C83E1B" strokeWidth="1.2" />
        <path d="M66 36l3 3 5-6" stroke="#C83E1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M54 36 L58 36" stroke="#C83E1B" strokeWidth="1.5" />
        {/* Human Takeover Gateway */}
        <rect x="86" y="46" width="18" height="18" rx="3" fill="#14161B" stroke="#2C303D" strokeWidth="1" />
        <circle cx="95" cy="53" r="3" fill="#C83E1B" />
        <path d="M90 61c0-2 2-3 5-3s5 1 5 3" stroke="#C83E1B" strokeWidth="1" fill="none" />
        <text x="56" y="76" textAnchor="middle" fill="#898E99" fontFamily="monospace" fontSize="7">
          WHATSAPP // CRM
        </text>
      </svg>
    ),
  },
];

export function SpecialistPlatformsGrid(): React.ReactElement {
  return (
    <section className="py-16 border-b border-[#E2E2E8] bg-[#FAFAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 mb-10 border-b border-[#E2E2E8]">
          <div>
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B] block mb-2">
              02 / SOVEREIGN AI &amp; SPECIALIST PLATFORMS
            </span>
            <h2 className="font-sans text-[26px] sm:text-[32px] font-extrabold tracking-[-0.025em] text-[#0A0A0C]">
              High-Moat Systems &amp; Live Platforms.
            </h2>
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#5A5D6A]">
            RANKS 02—07 / VOICE · RAG · AUDIT · WASM BI · PERSONA · WHATSAPP
          </div>
        </div>

        {/* 2-Column Architectural Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SPECIALIST_PLATFORMS.map((platform) => (
            <article
              key={platform.slug}
              className="bg-[#FFFFFF] border border-[#E2E2E8] hover:border-[#C83E1B]/70 rounded-[6px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 shadow-[0_4px_16px_rgba(10,10,12,0.02)]"
            >
              <div>
                {/* Top Bar with Viewfinder Schematic */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-[13px] font-bold text-[#C83E1B]">
                        {platform.rank}
                      </span>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.06em] text-[#0A0A0C]">
                        {platform.domain}
                      </span>
                    </div>
                    <span className="inline-block px-2 py-0.5 bg-[#F4F5F8] border border-[#E2E2E8] rounded-[2px] font-mono text-[9.5px] uppercase tracking-[0.05em] text-[#5A5D6A]">
                      {platform.buyer}
                    </span>
                  </div>

                  {/* Upper-Right Viewfinder Frame with Schematic */}
                  <div className="relative w-[112px] h-[84px] bg-[#F9F9FB] border border-[#E2E2E8] rounded-[3px] p-1 shrink-0 overflow-hidden">
                    {/* Viewfinder Corners */}
                    <span className="absolute top-0.5 left-0.5 w-1.5 h-1.5 border-t border-l border-[#898E99]" />
                    <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 border-t border-r border-[#898E99]" />
                    <span className="absolute bottom-0.5 left-0.5 w-1.5 h-1.5 border-b border-l border-[#898E99]" />
                    <span className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 border-b border-r border-[#898E99]" />
                    {platform.renderDiagram()}
                  </div>
                </div>

                {/* Platform Title & Description */}
                <h3 className="font-sans text-[20px] sm:text-[22px] font-extrabold tracking-[-0.02em] text-[#0A0A0C] mb-2 leading-snug">
                  <Link href={`/projects/${platform.slug}`} className="hover:text-[#C83E1B] transition-colors">
                    {platform.title}
                  </Link>
                </h3>

                <p className="font-sans text-[13.5px] leading-[1.6] text-[#3F414A] mb-4">
                  {platform.description}
                </p>

                {/* Highlighted Technological Moat Callout */}
                <div className="border-l-2 border-[#C83E1B] pl-3 py-1 text-[12px] font-medium text-[#0A0A0C] bg-[#FDF6F2]/60 mb-6">
                  <strong className="text-[#C83E1B] font-mono uppercase tracking-wider text-[10px] block mb-0.5">
                    TECHNOLOGICAL MOAT
                  </strong>
                  {platform.moat}
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="pt-4 border-t border-[#E2E2E8] flex flex-wrap items-center justify-between gap-3 font-mono text-[11.5px]">
                <div className="flex items-center gap-3">
                  {platform.liveUrl ? (
                    <>
                      <a
                        href={platform.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#C83E1B] font-bold hover:underline inline-flex items-center gap-1"
                      >
                        <span>Live App</span>
                        <span aria-hidden="true">&rarr;</span>
                      </a>
                      <span className="text-[#D5D7E0]">|</span>
                      <a
                        href={platform.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#5A5D6A] hover:text-[#0A0A0C] transition-colors"
                      >
                        GitHub ↗
                      </a>
                    </>
                  ) : (
                    <a
                      href={platform.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C83E1B] font-bold hover:underline inline-flex items-center gap-1"
                    >
                      <span>GitHub Repository</span>
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  )}
                </div>

                <Link
                  href={`/projects/${platform.slug}`}
                  className="font-bold text-[#0A0A0C] hover:text-[#C83E1B] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Profile</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
