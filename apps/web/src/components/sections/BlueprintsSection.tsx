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

interface CategoryTabConfig {
  readonly id: BlueprintCategory;
  readonly label: string;
}

const CATEGORY_TABS: readonly CategoryTabConfig[] = [
  { id: 'ALL', label: 'All Blueprints' },
  { id: 'AI AGENTS', label: 'AI Agents' },
  { id: 'SAAS & PORTALS', label: 'SaaS & Portals' },
  { id: 'SYSTEMS', label: 'Systems' },
];

export function BlueprintsSection(): React.ReactElement {
  const [state, dispatch] = useReducer(blueprintsReducer, INITIAL_BLUEPRINTS_STATE);

  // Determine Flagship (dominant) and Supporting blueprints based on selected category
  const getOrderedBlueprints = (): { flagship: BlueprintItem; supporting: BlueprintItem[] } => {
    if (state.selectedCategory === 'SAAS & PORTALS') {
      const flagship = BLUEPRINT_CATALOG.find((b) => b.id === 'saas-portal') ?? BLUEPRINT_CATALOG[1];
      const supporting = BLUEPRINT_CATALOG.filter((b) => b.id !== flagship.id);
      return { flagship, supporting };
    }
    if (state.selectedCategory === 'SYSTEMS') {
      const flagship = BLUEPRINT_CATALOG.find((b) => b.id === 'event-spine') ?? BLUEPRINT_CATALOG[2];
      const supporting = BLUEPRINT_CATALOG.filter((b) => b.id !== flagship.id);
      return { flagship, supporting };
    }
    // Default 'ALL' or 'AI AGENTS'
    const flagship = BLUEPRINT_CATALOG.find((b) => b.id === 'ai-triage') ?? BLUEPRINT_CATALOG[0];
    const supporting = BLUEPRINT_CATALOG.filter((b) => b.id !== flagship.id);
    return { flagship, supporting };
  };

  const { flagship, supporting } = getOrderedBlueprints();

  const handleInspect = (id: typeof flagship.id, title: string) => {
    dispatch({ type: 'OPEN_DRAWER', id });
    trackClientEvent('blueprint_inspect', title, { blueprintId: id });
  };

  return (
    <section
      id="blueprints"
      aria-labelledby="blueprints-heading"
      className="py-14 md:py-20 border-b border-[#E2E2E8] bg-[#FFFFFF]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            REGION A: EDITORIAL HEADING & ABSTRACT ISOMETRIC HEADER ARTWORK
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end pb-8 mb-8 border-b border-[#E2E2E8]">
          {/* Left Title & Eyebrow (lg:col-span-7) */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-[#C83E1B]" aria-hidden="true" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#C83E1B]">
                ENGINEERING BLUEPRINTS
              </span>
            </div>

            <h2
              id="blueprints-heading"
              className="font-sans font-extrabold text-[#0A0A0C] text-[34px] sm:text-[42px] lg:text-[46px] leading-[1.06] tracking-[-0.03em]"
            >
              Reference Architectures
              <br />
              for <span className="text-[#C83E1B]">Real-World</span> Use Cases.
            </h2>
          </div>

          {/* Center Copy (lg:col-span-3) */}
          <div className="lg:col-span-3">
            <div className="border-l-[3px] border-[#C83E1B] pl-4 py-1">
              <p className="font-mono text-[12px] sm:text-[12.5px] leading-[1.65] text-[#3F414A]">
                Explore practical architectures and design approaches for common business scenarios &mdash;
                understand the solution before you build it.
              </p>
            </div>
          </div>

          {/* Far Right Abstract Floating Architectural Illustration (lg:col-span-2) */}
          <div className="hidden lg:flex lg:col-span-2 items-center justify-end">
            <svg
              viewBox="0 0 160 110"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[150px] h-[100px] select-none"
              aria-hidden="true"
            >
              {/* Construction Grid & Projection Rays */}
              <line x1="80" y1="10" x2="80" y2="100" stroke="#E2E2E8" strokeWidth="0.8" strokeDasharray="2 2" />
              <line x1="10" y1="45" x2="150" y2="45" stroke="#E2E2E8" strokeWidth="0.8" strokeDasharray="2 2" />

              {/* Floating Top Plane (Wireframe) */}
              <polygon
                points="80,18 126,34 80,50 34,34"
                stroke="#3F414A"
                strokeWidth="1.2"
                fill="#FFFFFF"
                fillOpacity="0.8"
              />
              {/* Floating Middle Plane (Signal Orange Highlighted Layer) */}
              <polygon
                points="80,36 126,52 80,68 34,52"
                stroke="#C83E1B"
                strokeWidth="1.4"
                fill="#C83E1B"
                fillOpacity="0.32"
              />
              {/* Floating Bottom Plane (Wireframe) */}
              <polygon
                points="80,54 126,70 80,86 34,70"
                stroke="#9FA3B0"
                strokeWidth="1.2"
                fill="#FFFFFF"
                fillOpacity="0.7"
              />

              {/* Technical Calibration Coordinates */}
              <circle cx="80" cy="52" r="2" fill="#C83E1B" />
              <circle cx="126" cy="52" r="1.5" fill="#3F414A" />
              <circle cx="34" cy="52" r="1.5" fill="#3F414A" />
              <text x="105" y="98" fontFamily="var(--font-mono), monospace" fontSize="8" fill="#9FA3B0">
                // ARCH.REF
              </text>
            </svg>
          </div>
        </div>

        {/* Category Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5 mb-8" role="tablist" aria-label="Blueprint categories">
          {CATEGORY_TABS.map((tab) => {
            const isSelected = state.selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => dispatch({ type: 'SELECT_CATEGORY', category: tab.id })}
                className={`group px-3.5 py-2 font-mono text-[12px] font-semibold border rounded-[3px] transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0C0D10] border-[#0C0D10] text-[#FFFFFF] shadow-xs'
                    : 'bg-[#FFFFFF] border-[#E2E2E8] text-[#0A0A0C] hover:border-[#C83E1B]/50 hover:bg-[#F9F9FB]'
                }`}
              >
                {/* Compact Line Icon */}
                <span className={isSelected ? 'text-[#C83E1B]' : 'text-[#5A5D6A] group-hover:text-[#C83E1B]'}>
                  {tab.id === 'ALL' && (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="2" width="5" height="5" rx="1" />
                      <rect x="9" y="2" width="5" height="5" rx="1" />
                      <rect x="2" y="9" width="5" height="5" rx="1" />
                      <rect x="9" y="9" width="5" height="5" rx="1" />
                    </svg>
                  )}
                  {tab.id === 'AI AGENTS' && (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M8 2V14M2 8H14M4 4L12 12M12 4L4 12" strokeLinecap="round" />
                    </svg>
                  )}
                  {tab.id === 'SAAS & PORTALS' && (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="3" width="12" height="10" rx="1.5" />
                      <line x1="2" y1="7" x2="14" y2="7" />
                      <line x1="6" y1="7" x2="6" y2="13" />
                    </svg>
                  )}
                  {tab.id === 'SYSTEMS' && (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="8" cy="4" r="2" />
                      <circle cx="4" cy="12" r="2" />
                      <circle cx="12" cy="12" r="2" />
                      <path d="M7 6L5 10M9 6L11 10" strokeLinecap="round" />
                    </svg>
                  )}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            REGION B: FLAGSHIP SHOWCASE (~65%) + TWO SUPPORTING PREVIEWS (~35%)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* =========================================================================
              FLAGSHIP SHOWCASE (lg:col-span-8 — Dominant Dark Architecture Panel)
             ========================================================================= */}
          <article className="lg:col-span-8 bg-[#0C0D10] border border-[#1E212A] rounded-[8px] p-6 sm:p-8 text-white relative overflow-hidden shadow-[0_16px_40px_rgba(10,10,12,0.22)] flex flex-col justify-between">
            {/* Subtle Architectural Grid Texture */}
            <div className="absolute inset-0 pointer-events-none opacity-25 select-none" aria-hidden="true">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="flagshipGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#252936" strokeWidth="0.8" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#flagshipGrid)" />
              </svg>
            </div>

            {/* Top Metadata Row */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1E212A] mb-6 relative z-10">
              <div className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B]">
                {flagship.id === 'ai-triage' && '01 // AI AGENTS'}
                {flagship.id === 'saas-portal' && '02 // SAAS & PORTALS'}
                {flagship.id === 'event-spine' && '03 // SYSTEMS'}
              </div>
              <span className="px-2.5 py-0.5 bg-[#14161B] border border-[#2D313E] rounded-[3px] font-mono text-[9.5px] uppercase tracking-[0.08em] text-[#9FA3B0]">
                REFERENCE BLUEPRINT
              </span>
            </div>

            {/* Core Flagship Content: Left Editorial Specs + Right Large Architecture Visualization */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 items-center my-auto relative z-10">
              {/* Left Editorial Specs (xl:col-span-5) */}
              <div className="xl:col-span-5 flex flex-col justify-center">
                <h3 className="font-sans font-extrabold text-[24px] sm:text-[27px] text-white leading-[1.18] mb-3">
                  {flagship.title}
                </h3>

                <p className="font-sans text-[13px] sm:text-[13.5px] leading-[1.6] text-[#9FA3B0] mb-5">
                  {flagship.id === 'ai-triage' &&
                    'An architectural reference for support and incident workflows using grounded retrieval, structured validation and human escalation.'}
                  {flagship.id === 'saas-portal' &&
                    'A scalable application architecture with cryptographic tenant isolation, zero-client-JS layouts, and sub-second rendering.'}
                  {flagship.id === 'event-spine' &&
                    'A resilient event-driven backbone for data sync, partitioned queues, distributed tracing, and automated DLQ recovery.'}
                </p>

                {/* Key Architectural Highlights */}
                <div className="mb-6 space-y-2">
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.06em] text-[#5A5D6A]">
                    // KEY ARCHITECTURAL HIGHLIGHTS
                  </div>
                  <ul className="space-y-1.5 font-mono text-[11.5px] text-[#D5D7E0]">
                    {flagship.checklist.map((step) => (
                      <li key={step.stepIndex} className="flex items-start gap-2">
                        <span className="text-[#C83E1B] font-bold leading-none mt-0.5 select-none" aria-hidden="true">
                          &#10003;
                        </span>
                        <span>{step.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => handleInspect(flagship.id, flagship.title)}
                    className="px-4 py-2.5 bg-white hover:bg-[#C83E1B] text-[#0A0A0C] hover:text-white font-mono text-[12px] font-bold rounded-[3px] transition-colors cursor-pointer shadow-xs inline-flex items-center gap-1.5"
                  >
                    <span>Quick Inspect</span>
                    <span aria-hidden="true">&rarr;</span>
                  </button>

                  <Link
                    href={`/blueprints/${flagship.id}`}
                    className="px-3 py-2 text-[#9FA3B0] hover:text-white font-mono text-[11.5px] font-medium transition-colors inline-flex items-center gap-1"
                  >
                    <span>Full Specification</span>
                    <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3">
                      <path d="M4.5 2.5H2.5V9.5H9.5V7.5M6.5 2.5H9.5V5.5M9.2 2.8L5.2 6.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Right Large Custom System Architecture SVG Diagram (xl:col-span-7) */}
              <div className="xl:col-span-7 bg-[#14161B]/95 border border-[#222530] rounded-[6px] p-4 sm:p-5 flex items-center justify-center">
                {flagship.id === 'ai-triage' && (
                  <svg
                    viewBox="0 0 380 230"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto select-none font-mono"
                    aria-label="Governed Support & Ops Triage System Architecture Diagram"
                  >
                    {/* Central Vertical Connector Guideline */}
                    <line x1="110" y1="20" x2="110" y2="210" stroke="#252936" strokeWidth="1" strokeDasharray="3 3" />

                    {/* Central Layered Translucent Architectural Planes */}
                    {/* Top Plane: Headset / Support Input */}
                    <polygon points="110,30 162,52 110,74 58,52" fill="#1A1D26" stroke="#484D5E" strokeWidth="1.2" />
                    <circle cx="110" cy="50" r="8" stroke="#D5D7E0" strokeWidth="1.4" fill="none" />
                    <path d="M 104 53 C 104 46, 116 46, 116 53" stroke="#D5D7E0" strokeWidth="1.4" fill="none" />

                    {/* Middle Plane: Signal Orange Reasoning & Guardrails Core */}
                    <polygon points="110,84 162,106 110,128 58,106" fill="#C83E1B" fillOpacity="0.4" stroke="#C83E1B" strokeWidth="1.6" />
                    <circle cx="110" cy="106" r="10" fill="#C83E1B" fillOpacity="0.5" stroke="#FF6B47" strokeWidth="1.2" />
                    <circle cx="110" cy="106" r="3" fill="#FFFFFF" />

                    {/* Bottom Plane: Database / Vector Knowledge Base */}
                    <polygon points="110,138 162,160 110,182 58,160" fill="#1A1D26" stroke="#484D5E" strokeWidth="1.2" />
                    <ellipse cx="110" cy="158" rx="12" ry="5" stroke="#D5D7E0" strokeWidth="1.2" fill="none" />
                    <path d="M 98 158 V 164 C 98 167, 122 167, 122 164 V 158" stroke="#D5D7E0" strokeWidth="1.2" fill="none" />

                    {/* Left Ingress Connection Lines */}
                    <path d="M 162 52 L 186 52" stroke="#5A5D6A" strokeWidth="1.2" strokeDasharray="3 2" />
                    <path d="M 162 106 L 186 106" stroke="#C83E1B" strokeWidth="1.4" />
                    <path d="M 162 160 L 186 160" stroke="#5A5D6A" strokeWidth="1.2" strokeDasharray="3 2" />

                    {/* Right System Blocks */}
                    {/* Block 1: Inputs */}
                    <g transform="translate(194, 24)">
                      <rect x="0" y="0" width="166" height="54" rx="4" fill="#0C0D10" stroke="#262932" strokeWidth="1" />
                      <circle cx="14" cy="16" r="4" fill="#3F414A" />
                      <text x="24" y="19" fill="#FFFFFF" fontSize="10" fontWeight="bold">Inputs</text>
                      <text x="14" y="34" fill="#9FA3B0" fontSize="8.5">• Support Requests</text>
                      <text x="14" y="45" fill="#9FA3B0" fontSize="8.5">• System Alerts &amp; KB</text>
                    </g>

                    {/* Block 2: AI Agent Core (Signal Orange Highlighted) */}
                    <g transform="translate(194, 84)">
                      <rect x="0" y="0" width="166" height="58" rx="4" fill="#1A1211" stroke="#C83E1B" strokeWidth="1.5" />
                      <circle cx="14" cy="16" r="4" fill="#C83E1B" />
                      <text x="24" y="19" fill="#FF7D5E" fontSize="10" fontWeight="bold">AI Agent Core</text>
                      <text x="14" y="34" fill="#D5D7E0" fontSize="8.5">• Retrieval &amp; Routing</text>
                      <text x="14" y="45" fill="#D5D7E0" fontSize="8.5">• Validation &amp; Guardrails</text>
                    </g>

                    {/* Block 3: Outputs */}
                    <g transform="translate(194, 148)">
                      <rect x="0" y="0" width="166" height="54" rx="4" fill="#0C0D10" stroke="#262932" strokeWidth="1" />
                      <circle cx="14" cy="16" r="4" fill="#3F414A" />
                      <text x="24" y="19" fill="#FFFFFF" fontSize="10" fontWeight="bold">Outputs</text>
                      <text x="14" y="34" fill="#9FA3B0" fontSize="8.5">• Suggested Resolution</text>
                      <text x="14" y="45" fill="#9FA3B0" fontSize="8.5">• Human Escalation</text>
                    </g>
                  </svg>
                )}

                {flagship.id === 'saas-portal' && (
                  <svg
                    viewBox="0 0 380 230"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto select-none font-mono"
                    aria-label="Multi-Tenant SaaS Portal Architecture Diagram"
                  >
                    {/* Viewport Frame */}
                    <rect x="20" y="24" width="190" height="180" rx="4" fill="#0C0D10" stroke="#2D313E" strokeWidth="1.3" />
                    <line x1="20" y1="46" x2="210" y2="46" stroke="#222530" />
                    <circle cx="34" cy="35" r="2.5" fill="#C83E1B" />
                    <circle cx="43" cy="35" r="2.5" fill="#4B4E59" />
                    <circle cx="52" cy="35" r="2.5" fill="#4B4E59" />
                    <text x="68" y="38" fill="#9FA3B0" fontSize="9">tenant.app.domain/portal</text>

                    {/* Tenant Partition Layers */}
                    <rect x="36" y="58" width="158" height="34" rx="2" fill="#14161B" stroke="#C83E1B" strokeWidth="1.2" />
                    <text x="46" y="74" fill="#FFFFFF" fontSize="9" fontWeight="bold">Tenant Isolation Layer (RLS)</text>
                    <text x="46" y="85" fill="#9FA3B0" fontSize="8">SET LOCAL app.current_tenant_id</text>

                    <rect x="36" y="100" width="158" height="44" rx="2" fill="#14161B" stroke="#2D313E" strokeWidth="1" />
                    <text x="46" y="117" fill="#FFFFFF" fontSize="9" fontWeight="bold">React 19 Server Components</text>
                    <text x="46" y="130" fill="#9FA3B0" fontSize="8">Sub-second LCP &bull; Streaming HTML</text>

                    <rect x="36" y="152" width="158" height="38" rx="2" fill="#14161B" stroke="#2D313E" strokeWidth="1" />
                    <text x="46" y="169" fill="#FFFFFF" fontSize="9" fontWeight="bold">Stripe Usage Metering</text>
                    <text x="46" y="181" fill="#9FA3B0" fontSize="8">Idempotent Webhook State Machine</text>

                    {/* Right Telemetry Stack */}
                    <g transform="translate(226, 32)">
                      <rect x="0" y="0" width="140" height="76" rx="3" fill="#1A1211" stroke="#C83E1B" strokeWidth="1.3" />
                      <text x="12" y="22" fill="#FF7D5E" fontSize="9.5" fontWeight="bold">Security Gate</text>
                      <text x="12" y="38" fill="#D5D7E0" fontSize="8">• Nonce Middleware</text>
                      <text x="12" y="50" fill="#D5D7E0" fontSize="8">• Session Claims Check</text>
                      <text x="12" y="62" fill="#D5D7E0" fontSize="8">• WCAG 2.2 AAA Audit</text>
                    </g>

                    <g transform="translate(226, 122)">
                      <rect x="0" y="0" width="140" height="76" rx="3" fill="#0C0D10" stroke="#2D313E" strokeWidth="1" />
                      <text x="12" y="22" fill="#FFFFFF" fontSize="9.5" fontWeight="bold">Database Gate</text>
                      <text x="12" y="38" fill="#9FA3B0" fontSize="8">• PostgreSQL 16 RLS</text>
                      <text x="12" y="50" fill="#9FA3B0" fontSize="8">• Drizzle Migrations</text>
                      <text x="12" y="62" fill="#9FA3B0" fontSize="8">• Read Replicas</text>
                    </g>
                  </svg>
                )}

                {flagship.id === 'event-spine' && (
                  <svg
                    viewBox="0 0 380 230"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto select-none font-mono"
                    aria-label="Event-Driven Sync & Observability Spine Architecture Diagram"
                  >
                    {/* Ingress Edge Proxy */}
                    <rect x="18" y="44" width="84" height="140" rx="3" fill="#0C0D10" stroke="#2D313E" strokeWidth="1.2" />
                    <text x="28" y="66" fill="#FFFFFF" fontSize="9" fontWeight="bold">Edge Proxy</text>
                    <text x="28" y="82" fill="#9FA3B0" fontSize="8">HMAC Check</text>
                    <text x="28" y="96" fill="#9FA3B0" fontSize="8">&lt; 15ms Ingress</text>
                    <circle cx="60" cy="130" r="16" fill="#14161B" stroke="#C83E1B" strokeWidth="1.2" />
                    <text x="50" y="133" fill="#C83E1B" fontSize="9">JSON</text>

                    {/* Central Redis Streams Partitioned Log */}
                    <rect x="132" y="30" width="124" height="168" rx="3" fill="#1A1211" stroke="#C83E1B" strokeWidth="1.5" />
                    <text x="144" y="52" fill="#FF7D5E" fontSize="9.5" fontWeight="bold">Redis Streams</text>
                    <text x="144" y="68" fill="#D5D7E0" fontSize="8">Partitioned Log</text>

                    {/* Stream tracks */}
                    <rect x="142" y="80" width="104" height="22" rx="2" fill="#221514" stroke="#C83E1B" strokeWidth="0.8" />
                    <text x="150" y="94" fill="#FFFFFF" fontSize="8">partition_0 (active)</text>
                    <rect x="142" y="108" width="104" height="22" rx="2" fill="#221514" stroke="#C83E1B" strokeWidth="0.8" />
                    <text x="150" y="122" fill="#FFFFFF" fontSize="8">partition_1 (active)</text>
                    <rect x="142" y="136" width="104" height="22" rx="2" fill="#221514" stroke="#C83E1B" strokeWidth="0.8" />
                    <text x="150" y="150" fill="#FFFFFF" fontSize="8">partition_2 (active)</text>

                    {/* Right Consumers & DLQ */}
                    <g transform="translate(282, 38)">
                      <rect x="0" y="0" width="82" height="64" rx="3" fill="#0C0D10" stroke="#2D313E" strokeWidth="1" />
                      <text x="10" y="20" fill="#FFFFFF" fontSize="8.5" fontWeight="bold">Workers</text>
                      <text x="10" y="34" fill="#9FA3B0" fontSize="7.5">At-least-once</text>
                      <text x="10" y="46" fill="#9FA3B0" fontSize="7.5">Idempotent</text>
                    </g>

                    <g transform="translate(282, 118)">
                      <rect x="0" y="0" width="82" height="64" rx="3" fill="#0C0D10" stroke="#C83E1B" strokeWidth="1.2" />
                      <text x="10" y="20" fill="#FF7D5E" fontSize="8.5" fontWeight="bold">DLQ Replay</text>
                      <text x="10" y="34" fill="#D5D7E0" fontSize="7.5">Circuit Break</text>
                      <text x="10" y="46" fill="#D5D7E0" fontSize="7.5">CLI Replay</text>
                    </g>

                    {/* Connector lines */}
                    <line x1="102" y1="114" x2="132" y2="114" stroke="#C83E1B" strokeWidth="1.5" />
                    <line x1="256" y1="70" x2="282" y2="70" stroke="#5A5D6A" strokeWidth="1.2" />
                    <line x1="256" y1="150" x2="282" y2="150" stroke="#C83E1B" strokeWidth="1.2" strokeDasharray="3 2" />
                  </svg>
                )}
              </div>
            </div>
          </article>

          {/* =========================================================================
              TWO SUPPORTING BLUEPRINT PREVIEWS (lg:col-span-4 — Stacked Vertically)
             ========================================================================= */}
          <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
            {supporting.map((suppBp) => (
              <article
                key={suppBp.id}
                className="group bg-[#FFFFFF] border border-[#E2E2E8] hover:border-[#C83E1B]/60 rounded-[8px] p-5 sm:p-6 shadow-[0_2px_8px_rgba(10,10,12,0.03)] flex flex-col justify-between transition-all duration-300 flex-1"
              >
                <div>
                  {/* Top Metadata Row */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#F0F1F5] mb-4">
                    <div className="font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-[#C83E1B]">
                      {suppBp.id === 'ai-triage' && '01 // AI AGENTS'}
                      {suppBp.id === 'saas-portal' && '02 // SAAS & PORTALS'}
                      {suppBp.id === 'event-spine' && '03 // SYSTEMS'}
                    </div>
                    <span className="px-2 py-0.5 bg-[#F9F9FB] border border-[#E2E2E8] rounded-[3px] font-mono text-[9px] uppercase tracking-[0.06em] text-[#5A5D6A]">
                      REFERENCE BLUEPRINT
                    </span>
                  </div>

                  {/* Title & Description with Side Geometric SVG Illustration */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex-1">
                      <h4 className="font-sans font-extrabold text-[18px] sm:text-[19px] text-[#0A0A0C] leading-[1.2] mb-1.5">
                        {suppBp.id === 'saas-portal' ? 'Multi-Tenant SaaS Portal' : suppBp.title}
                      </h4>
                      <p className="font-sans text-[12.5px] leading-[1.55] text-[#5A5D6A]">
                        {suppBp.id === 'ai-triage' &&
                          'An architectural reference for support and incident triage with grounded retrieval and validation.'}
                        {suppBp.id === 'saas-portal' &&
                          'A scalable application architecture with tenant isolation and access control.'}
                        {suppBp.id === 'event-spine' &&
                          'A resilient event-driven backbone for data sync, processing and observability.'}
                      </p>
                    </div>

                    {/* Small Isometric Architecture Illustration */}
                    <div className="w-[84px] h-[72px] shrink-0 bg-[#FAFBFD] border border-[#F0F1F5] rounded-[4px] flex items-center justify-center overflow-hidden">
                      {suppBp.id === 'saas-portal' && (
                        <svg viewBox="0 0 84 72" fill="none" className="w-full h-full p-1.5 select-none">
                          {/* 3 Isometric Layered Planes with Orange Boundary */}
                          <polygon points="42,12 68,23 42,34 16,23" fill="#FFFFFF" stroke="#3F414A" strokeWidth="1.1" />
                          <polygon points="42,26 68,37 42,48 16,37" fill="#C83E1B" fillOpacity="0.28" stroke="#C83E1B" strokeWidth="1.3" />
                          <polygon points="42,40 68,51 42,62 16,51" fill="#FFFFFF" stroke="#9FA3B0" strokeWidth="1.1" />
                          <circle cx="42" cy="37" r="2" fill="#C83E1B" />
                        </svg>
                      )}

                      {suppBp.id === 'event-spine' && (
                        <svg viewBox="0 0 84 72" fill="none" className="w-full h-full p-1.5 select-none">
                          {/* Connected Node Architecture with Central Orange Node */}
                          <polygon points="42,16 54,23 42,30 30,23" fill="#C83E1B" fillOpacity="0.3" stroke="#C83E1B" strokeWidth="1.3" />
                          <polygon points="24,42 36,49 24,56 12,49" fill="#FFFFFF" stroke="#3F414A" strokeWidth="1.1" />
                          <polygon points="60,42 72,49 60,56 48,49" fill="#FFFFFF" stroke="#3F414A" strokeWidth="1.1" />
                          <line x1="36" y1="28" x2="24" y2="42" stroke="#C83E1B" strokeWidth="1" strokeDasharray="2 2" />
                          <line x1="48" y1="28" x2="60" y2="42" stroke="#C83E1B" strokeWidth="1" strokeDasharray="2 2" />
                        </svg>
                      )}

                      {suppBp.id === 'ai-triage' && (
                        <svg viewBox="0 0 84 72" fill="none" className="w-full h-full p-1.5 select-none">
                          {/* Hexagonal Agent Core */}
                          <polygon points="42,12 64,24 64,48 42,60 20,48 20,24" fill="#C83E1B" fillOpacity="0.2" stroke="#C83E1B" strokeWidth="1.3" />
                          <circle cx="42" cy="36" r="6" fill="#C83E1B" />
                          <line x1="12" y1="36" x2="20" y2="36" stroke="#3F414A" strokeWidth="1" />
                          <line x1="64" y1="36" x2="72" y2="36" stroke="#3F414A" strokeWidth="1" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-[#F0F1F5] flex items-center justify-between gap-3 mt-auto">
                  <button
                    type="button"
                    onClick={() => handleInspect(suppBp.id, suppBp.title)}
                    className="font-mono text-[11.5px] font-bold text-[#0A0A0C] hover:text-[#C83E1B] inline-flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Quick Inspect</span>
                    <span aria-hidden="true">&rarr;</span>
                  </button>

                  <Link
                    href={`/blueprints/${suppBp.id}`}
                    className="font-mono text-[11px] font-medium text-[#5A5D6A] hover:text-[#0A0A0C] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Full Specs</span>
                    <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3">
                      <path d="M4.5 2.5H2.5V9.5H9.5V7.5M6.5 2.5H9.5V5.5M9.2 2.8L5.2 6.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* =========================================================================
            REGION C: RESTRAINED BOTTOM BOUNDARY / THREE EDITORIAL PILLARS
           ========================================================================= */}
        <div className="mt-14 pt-8 border-t border-[#E2E2E8]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="flex items-start gap-3.5 pr-4 md:border-r md:border-[#E2E2E8]">
              <div className="w-8 h-8 rounded-[3px] bg-[#FFF5F2] border border-[#C83E1B]/30 flex items-center justify-center text-[#C83E1B] shrink-0 mt-0.5">
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polygon points="8,2 14,5.5 8,9 2,5.5" />
                  <polygon points="8,7 14,10.5 8,14 2,10.5" />
                </svg>
              </div>
              <div>
                <h4 className="font-sans font-bold text-[14px] text-[#0A0A0C] mb-0.5">
                  Practical by Design
                </h4>
                <p className="font-sans text-[12px] leading-[1.5] text-[#5A5D6A]">
                  Realistic architectures for business use cases.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="flex items-start gap-3.5 pr-4 md:border-r md:border-[#E2E2E8]">
              <div className="w-8 h-8 rounded-[3px] bg-[#FFF5F2] border border-[#C83E1B]/30 flex items-center justify-center text-[#C83E1B] shrink-0 mt-0.5">
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 2 L14 5.5 V10.5 L8 14 L2 10.5 V5.5 Z" />
                  <line x1="8" y1="2" x2="8" y2="14" />
                </svg>
              </div>
              <div>
                <h4 className="font-sans font-bold text-[14px] text-[#0A0A0C] mb-0.5">
                  Explorable &amp; Detailed
                </h4>
                <p className="font-sans text-[12px] leading-[1.5] text-[#5A5D6A]">
                  Inspect, understand and evaluate the design.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-[3px] bg-[#FFF5F2] border border-[#C83E1B]/30 flex items-center justify-center text-[#C83E1B] shrink-0 mt-0.5">
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="3" y1="13" x2="3" y2="10" strokeLinecap="round" />
                  <line x1="8" y1="13" x2="8" y2="6" strokeLinecap="round" />
                  <line x1="13" y1="13" x2="13" y2="3" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h4 className="font-sans font-bold text-[14px] text-[#0A0A0C] mb-0.5">
                  A Starting Point
                </h4>
                <p className="font-sans text-[12px] leading-[1.5] text-[#5A5D6A]">
                  Use, adapt or extend for your own requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accessible Inspection Drawer (Preserved Existing Reducer State Machine) */}
      <BlueprintDrawer
        blueprintId={state.inspectedBlueprintId}
        onClose={() => dispatch({ type: 'CLOSE_DRAWER' })}
      />
    </section>
  );
}
