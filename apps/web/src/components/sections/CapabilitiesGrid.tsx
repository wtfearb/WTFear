'use client';

import React from 'react';
import Link from 'next/link';

interface CapabilityCard {
  readonly id: string;
  readonly number: string;
  readonly category: string;
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly href: string;
  readonly linkLabel: string;
  readonly detailsHref: string;
}

const CAPABILITY_CARDS: readonly CapabilityCard[] = [
  {
    id: 'ai-engineering',
    number: '01',
    category: 'AI ENGINEERING & RAG',
    title: 'AI Engineering & RAG Systems',
    description:
      'AI agents, retrieval and document workflows designed around practical business use cases.',
    tags: ['AI Agents', 'RAG Systems', 'Knowledge Assistants'],
    href: '/blueprints/ai-triage',
    linkLabel: 'View Engineering Blueprint',
    detailsHref: '/services#ai-engineering',
  },
  {
    id: 'custom-software',
    number: '02',
    category: 'CUSTOM SOFTWARE',
    title: 'Custom Software Development',
    description:
      'Purpose-built software for operational needs, integrating with the tools and processes your team already uses.',
    tags: ['Web Applications', 'Internal Tools', 'API Integrations'],
    href: '/services#custom-software',
    linkLabel: 'Explore Service',
    detailsHref: '/services#custom-software',
  },
  {
    id: 'saas-b2b',
    number: '03',
    category: 'SAAS & B2B PRODUCTS',
    title: 'SaaS & B2B Applications',
    description:
      'Customer portals and multi-tenant applications, from early MVPs to evolving business products.',
    tags: ['SaaS Platforms', 'Client Portals', 'Product MVPs'],
    href: '/blueprints/saas-portal',
    linkLabel: 'View Engineering Blueprint',
    detailsHref: '/services#saas-b2b',
  },
  {
    id: 'backend-distributed',
    number: '04',
    category: 'BACKEND & DISTRIBUTED',
    title: 'Backend & Distributed Systems',
    description:
      'APIs, event flows and data services that help applications remain connected and dependable.',
    tags: ['Backend APIs', 'Event Pipelines', 'Data Systems'],
    href: '/blueprints/event-spine',
    linkLabel: 'View Engineering Blueprint',
    detailsHref: '/services#backend-distributed',
  },
  {
    id: 'workflow-automation',
    number: '05',
    category: 'WORKFLOW AUTOMATION',
    title: 'Workflow Automation & Integrations',
    description:
      'Connect repetitive business processes, integrate applications and reduce manual operational handoffs.',
    tags: ['Workflow Automation', 'CRM Integrations', 'Document Processing'],
    href: '/services#workflow-automation',
    linkLabel: 'Explore Service',
    detailsHref: '/services#workflow-automation',
  },
  {
    id: 'architecture-consulting',
    number: '06',
    category: 'ARCHITECTURE & STRATEGY',
    title: 'Architecture & Technical Consulting',
    description:
      'Understand the problem, assess technical trade-offs and define a practical route to implementation.',
    tags: ['Discovery', 'System Architecture', 'Technical Planning'],
    href: '/contact',
    linkLabel: 'Discuss a Project',
    detailsHref: '/services#architecture-consulting',
  },
];

export function CapabilitiesGrid(): React.ReactElement {
  return (
    <section
      id="services"
      aria-labelledby="capabilities-title"
      className="py-14 md:py-20 bg-[#F9F9FB] border-b border-[#E2E2E8]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. EDITORIAL SECTION HEADING */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end pb-8 mb-10 border-b border-[#E2E2E8]">
          {/* LEFT (lg:col-span-7) */}
          <div className="lg:col-span-7">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFFFFF] border border-[#E2E2E8] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B] shrink-0" aria-hidden="true" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B]">
                ENGINEERING CAPABILITIES
              </span>
            </div>

            {/* Main Heading (<h2>) */}
            <h2
              id="capabilities-title"
              className="font-sans font-extrabold text-[#0A0A0C] text-[36px] sm:text-[44px] lg:text-[50px] leading-[1.06] tracking-[-0.03em]"
            >
              Six Engineering Capabilities.
              <br />
              <span className="text-[#C83E1B]">One Practical Mindset.</span>
            </h2>
          </div>

          {/* RIGHT (lg:col-span-5) */}
          <div className="lg:col-span-5">
            <div className="border-l-[3px] border-[#C83E1B] pl-5 py-1 max-w-md lg:ml-auto">
              <p className="font-mono text-[13px] sm:text-[13.5px] leading-[1.65] text-[#3F414A]">
                From customer-facing products to internal systems, we design and develop software around
                the way your business works.
              </p>
            </div>
          </div>
        </div>

        {/* 2. MAIN CAPABILITY ATLAS GRID: STICKY LEFT OBSIDIAN SIDEBAR + 6-CARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start relative">
          {/* LEFT OBSIDIAN SIDEBAR: Pinned static/sticky until cards 1 to 6 scroll past */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 self-start">
            <aside className="bg-[#0C0D10] border border-[#1E212A] rounded-[6px] p-6 sm:p-7 text-[#FFFFFF] relative overflow-hidden shadow-[0_16px_40px_rgba(10,10,12,0.16)]">
              {/* Background SVG Grid & Dot Matrix Texture */}
              <div className="absolute inset-0 pointer-events-none opacity-40 select-none overflow-hidden" aria-hidden="true">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="sidebarGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1B1E26" strokeWidth="1" />
                    </pattern>
                    <pattern id="sidebarDots" width="12" height="12" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="0.75" fill="#252832" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="65%" fill="url(#sidebarGrid)" />
                  <rect y="65%" width="100%" height="35%" fill="url(#sidebarDots)" />
                </svg>
              </div>

              <div>
                {/* Sidebar Title */}
                <div className="font-mono text-[12px] font-bold uppercase tracking-[0.08em] text-[#FFFFFF] mb-3 relative z-10">
                  // CAPABILITY SCOPE
                </div>

                {/* Top Centerpiece SVG: Interlocking 3-Axis System Gyro & Concentric Core */}
                <div className="w-full h-[180px] my-2 relative z-10 flex items-center justify-center">
                  <svg
                    viewBox="0 0 260 190"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full block select-none"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="sidebarOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#C83E1B" stopOpacity="0.65" />
                        <stop offset="100%" stopColor="#C83E1B" stopOpacity="0.18" />
                      </linearGradient>
                    </defs>

                    {/* Central Telemetry Axis */}
                    <line
                      x1="130"
                      y1="16"
                      x2="130"
                      y2="174"
                      stroke="#2D313E"
                      strokeDasharray="3 3"
                      strokeWidth="1"
                    />
                    <circle cx="130" cy="16" r="2" fill="#C83E1B" />
                    <circle cx="130" cy="174" r="2" fill="#686C7A" />

                    {/* Outer Isometric Wireframe Octagonal Gyro Frame */}
                    <polygon
                      points="130,28 212,66 212,124 130,162 48,124 48,66"
                      fill="none"
                      stroke="#3F4352"
                      strokeWidth="1.2"
                    />
                    {/* Node coordinates */}
                    <circle cx="130" cy="28" r="2" fill="#686C7A" />
                    <circle cx="212" cy="66" r="2" fill="#686C7A" />
                    <circle cx="212" cy="124" r="2" fill="#686C7A" />
                    <circle cx="130" cy="162" r="2" fill="#686C7A" />
                    <circle cx="48" cy="124" r="2" fill="#686C7A" />
                    <circle cx="48" cy="66" r="2" fill="#686C7A" />

                    {/* Middle Glowing Signal Orange Isometric Torus / Core Ring */}
                    <polygon
                      points="130,52 192,82 192,108 130,138 68,108 68,82"
                      fill="url(#sidebarOrangeGrad)"
                      stroke="#C83E1B"
                      strokeWidth="1.6"
                    />

                    {/* Inner Suspended Hollow Core Prism */}
                    <polygon
                      points="130,72 162,88 130,104 98,88"
                      fill="#0C0D10"
                      stroke="#FF6B47"
                      strokeWidth="1.3"
                    />
                    {/* Glowing Center Pulse Dot */}
                    <circle cx="130" cy="88" r="3.5" fill="#C83E1B" />
                    <circle cx="130" cy="88" r="8" stroke="#C83E1B" strokeOpacity="0.4" strokeWidth="1" />

                    {/* Orbiting Telemetry Callout Ticks */}
                    <line x1="68" y1="66" x2="80" y2="72" stroke="#C83E1B" strokeWidth="1" />
                    <circle cx="68" cy="66" r="1.5" fill="#C83E1B" />
                    <line x1="192" y1="66" x2="180" y2="72" stroke="#C83E1B" strokeWidth="1" />
                    <circle cx="192" cy="66" r="1.5" fill="#C83E1B" />
                    <line x1="130" y1="138" x2="130" y2="152" stroke="#C83E1B" strokeWidth="1" />
                    <circle cx="130" cy="152" r="1.5" fill="#C83E1B" />
                  </svg>
                </div>

                {/* Three Conceptual Capability Groups */}
                <div className="divide-y divide-[#222530] border-t border-[#222530] mt-4 relative z-10">
                  {/* GROUP 01 — SYSTEMS */}
                  <div className="group/item py-3.5 first:pt-4 last:pb-1 flex items-start gap-3.5 transition-colors duration-200 hover:bg-[#14161B]/70 -mx-2 px-2 rounded-[4px]">
                    <div className="w-7 h-7 shrink-0 flex items-center justify-center text-[#C83E1B] mt-0.5" aria-hidden="true">
                      <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6 stroke-current" strokeWidth="1.5">
                        <rect x="4" y="5" width="20" height="4.5" rx="1" />
                        <rect x="4" y="11.5" width="20" height="4.5" rx="1" />
                        <rect x="4" y="18" width="20" height="4.5" rx="1" />
                        <circle cx="7.5" cy="7.25" r="0.75" fill="#C83E1B" />
                        <circle cx="7.5" cy="13.75" r="0.75" fill="#C83E1B" />
                        <circle cx="7.5" cy="20.25" r="0.75" fill="#C83E1B" />
                        <path d="M 20 7.25 L 22 7.25" strokeLinecap="round" />
                        <path d="M 20 13.75 L 22 13.75" strokeLinecap="round" />
                        <path d="M 20 20.25 L 22 20.25" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-sans text-[13.5px] font-extrabold uppercase tracking-[0.04em] text-[#FFFFFF] group-hover/item:text-[#C83E1B] transition-colors">
                        SYSTEMS
                      </h3>
                      <p className="font-mono text-[11.5px] leading-[1.45] text-[#9FA3B0] mt-0.5">
                        Build reliable, scalable foundations.
                      </p>
                    </div>
                  </div>

                  {/* GROUP 02 — PRODUCT */}
                  <div className="group/item py-3.5 first:pt-4 last:pb-1 flex items-start gap-3.5 transition-colors duration-200 hover:bg-[#14161B]/70 -mx-2 px-2 rounded-[4px]">
                    <div className="w-7 h-7 shrink-0 flex items-center justify-center text-[#C83E1B] mt-0.5" aria-hidden="true">
                      <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6 stroke-current" strokeWidth="1.5">
                        <rect x="3.5" y="4" width="21" height="20" rx="2" />
                        <line x1="3.5" y1="9" x2="24.5" y2="9" />
                        <line x1="10.5" y1="9" x2="10.5" y2="24" />
                        <circle cx="6" cy="6.5" r="0.75" fill="#C83E1B" />
                        <circle cx="8.5" cy="6.5" r="0.75" fill="#C83E1B" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-sans text-[13.5px] font-extrabold uppercase tracking-[0.04em] text-[#FFFFFF] group-hover/item:text-[#C83E1B] transition-colors">
                        PRODUCT
                      </h3>
                      <p className="font-mono text-[11.5px] leading-[1.45] text-[#9FA3B0] mt-0.5">
                        Turn ideas into usable, valuable products.
                      </p>
                    </div>
                  </div>

                  {/* GROUP 03 — AUTOMATION */}
                  <div className="group/item py-3.5 first:pt-4 last:pb-1 flex items-start gap-3.5 transition-colors duration-200 hover:bg-[#14161B]/70 -mx-2 px-2 rounded-[4px]">
                    <div className="w-7 h-7 shrink-0 flex items-center justify-center text-[#C83E1B] mt-0.5" aria-hidden="true">
                      <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6 stroke-current" strokeWidth="1.5">
                        <path
                          d="M15 3 L6 15 H14 L13 25 L22 13 H14 L15 3 Z"
                          stroke="#C83E1B"
                          strokeWidth="1.6"
                          fill="#C83E1B"
                          fillOpacity="0.18"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-sans text-[13.5px] font-extrabold uppercase tracking-[0.04em] text-[#FFFFFF] group-hover/item:text-[#C83E1B] transition-colors">
                        AUTOMATION
                      </h3>
                      <p className="font-mono text-[11.5px] leading-[1.45] text-[#9FA3B0] mt-0.5">
                        Reduce friction and improve operational efficiency.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Architectural Grounding Bar */}
              <div className="mt-8 pt-4 border-t border-[#1E212A] relative z-10 flex flex-col gap-1.5">
                <div className="flex items-center justify-between font-mono text-[10px] text-[#5A5D6A]">
                  <span>// ARCHITECTURAL SCOPE</span>
                  <span className="text-[#C83E1B] font-bold">100% IP HANDOVER</span>
                </div>
                <div className="font-mono text-[11px] leading-relaxed text-[#9FA3B0]">
                  Grounded systems engineering with transparent architecture and zero vendor lock-in.
                </div>
              </div>
            </aside>
          </div>

          {/* RIGHT 6-CARD GRID (2 columns × 3 rows) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {CAPABILITY_CARDS.map((card) => (
              <article
                key={card.id}
                className="group bg-[#FFFFFF] hover:bg-[#FCFDFE] border border-[#E2E2E8] hover:border-[#C83E1B]/65 rounded-[6px] p-6 flex flex-col justify-between transition-all duration-300 ease-out hover:shadow-[0_10px_28px_rgba(10,10,12,0.05)]"
              >
                <div>
                  {/* UPPER SPLIT ROW */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    {/* Left: Number, Category & Title */}
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-[#C83E1B] mb-2">
                        {card.number} <span className="text-[#9FA3B0] mx-1">//</span> {card.category}
                      </div>
                      <h3 className="font-sans text-[20px] sm:text-[21px] font-extrabold tracking-[-0.02em] text-[#0A0A0C] leading-[1.18]">
                        {card.title}
                      </h3>
                    </div>

                    {/* Right: Technical Viewfinder Frame with Unique Custom SVG */}
                    <div className="w-[116px] h-[92px] shrink-0 relative bg-[#FAFBFD] border border-[#F0F1F5] flex items-center justify-center overflow-hidden rounded-[4px]">
                      {/* Background Micro Grid */}
                      <svg width="100%" height="100%" className="absolute inset-0 pointer-events-none" aria-hidden="true">
                        <defs>
                          <pattern id={`cardGrid-${card.id}`} width="12" height="12" patternUnits="userSpaceOnUse">
                            <path d="M 12 0 L 0 0 0 12" fill="none" stroke="#EFEFF4" strokeWidth="0.8" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#cardGrid-${card.id})`} />
                      </svg>

                      {/* 4 Viewfinder Corner Ticks */}
                      <path
                        d="M 6 12 L 6 6 L 12 6"
                        className="stroke-[#B4B8C5] group-hover:stroke-[#C83E1B] transition-colors duration-300"
                        strokeWidth="1"
                        fill="none"
                      />
                      <path
                        d="M 104 6 L 110 6 L 110 12"
                        className="stroke-[#B4B8C5] group-hover:stroke-[#C83E1B] transition-colors duration-300"
                        strokeWidth="1"
                        fill="none"
                      />
                      <path
                        d="M 6 80 L 6 86 L 12 86"
                        className="stroke-[#B4B8C5] group-hover:stroke-[#C83E1B] transition-colors duration-300"
                        strokeWidth="1"
                        fill="none"
                      />
                      <path
                        d="M 104 86 L 110 86 L 110 80"
                        className="stroke-[#B4B8C5] group-hover:stroke-[#C83E1B] transition-colors duration-300"
                        strokeWidth="1"
                        fill="none"
                      />

                      {/* Unique Custom SVG Composition */}
                      <div className="relative z-10 w-full h-full flex items-center justify-center group-hover:scale-[1.04] transition-transform duration-300">
                        {/* CARD 01: Vector Matrix & Context Scanner */}
                        {card.id === 'ai-engineering' && (
                          <svg viewBox="0 0 116 92" fill="none" className="w-full h-full block">
                            {/* Document Sheet */}
                            <rect x="16" y="22" width="24" height="32" rx="1.5" fill="#FFFFFF" stroke="#3F414A" strokeWidth="1.2" />
                            <line x1="20" y1="28" x2="32" y2="28" stroke="#9FA3B0" strokeWidth="1" />
                            <line x1="20" y1="33" x2="36" y2="33" stroke="#9FA3B0" strokeWidth="1" />
                            <line x1="20" y1="43" x2="34" y2="43" stroke="#9FA3B0" strokeWidth="1" />
                            <line x1="20" y1="48" x2="28" y2="48" stroke="#9FA3B0" strokeWidth="1" />
                            {/* Scanner Beam */}
                            <line x1="14" y1="38" x2="42" y2="38" stroke="#C83E1B" strokeWidth="1.5" />

                            {/* 3x3 Semantic Coordinate Matrix */}
                            {[56, 72, 88].map((x) =>
                              [26, 44, 62].map((y) => (
                                <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill="#CBD0DC" />
                              ))
                            )}
                            {/* Highlighted Semantic Cluster Polygon */}
                            <polygon points="56,26 88,26 72,44" fill="#C83E1B" fillOpacity="0.22" stroke="#C83E1B" strokeWidth="1.3" />
                            {/* Vector Trajectory */}
                            <path d="M 40 38 L 72 44" stroke="#C83E1B" strokeWidth="1.3" strokeDasharray="2 2" />
                            <circle cx="72" cy="44" r="2.5" fill="#C83E1B" />
                            {/* Verified Response Badge */}
                            <rect x="68" y="58" width="26" height="15" rx="2" fill="#FFF5F2" stroke="#C83E1B" strokeWidth="1.3" />
                            <path d="M 74 65.5 L 77.5 69 L 85 61.5" stroke="#C83E1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}

                        {/* CARD 02: Modular Software Assembly & API Socket */}
                        {card.id === 'custom-software' && (
                          <svg viewBox="0 0 116 92" fill="none" className="w-full h-full block">
                            {/* Left Existing Operations Interlocking Block */}
                            <path
                              d="M 18 26 H 50 V 38 H 58 V 50 H 50 V 62 H 18 Z"
                              fill="#FFFFFF"
                              stroke="#3F414A"
                              strokeWidth="1.3"
                            />
                            <line x1="24" y1="34" x2="38" y2="34" stroke="#D5D7E0" strokeWidth="1" />
                            <line x1="24" y1="44" x2="42" y2="44" stroke="#D5D7E0" strokeWidth="1" />
                            <line x1="24" y1="54" x2="34" y2="54" stroke="#D5D7E0" strokeWidth="1" />

                            {/* Right Custom-Engineered Logic Module */}
                            <path
                              d="M 64 26 H 98 V 62 H 64 V 52 H 56 V 36 H 64 Z"
                              fill="#FFF7F5"
                              stroke="#C83E1B"
                              strokeWidth="1.5"
                            />
                            {/* Terminal Prompt >_ inside */}
                            <path d="M 72 41 L 76 44 L 72 47" stroke="#C83E1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <line x1="79" y1="47" x2="85" y2="47" stroke="#C83E1B" strokeWidth="1.5" />

                            {/* Bridge Connectors */}
                            <circle cx="54" cy="44" r="1.5" fill="#C83E1B" />
                            <line x1="50" y1="44" x2="56" y2="44" stroke="#C83E1B" strokeWidth="1.2" strokeDasharray="1 1" />
                          </svg>
                        )}

                        {/* CARD 03: Multi-Tenant Isolated Hub & Partition Chambers */}
                        {card.id === 'saas-b2b' && (
                          <svg viewBox="0 0 116 92" fill="none" className="w-full h-full block">
                            {/* Center Core Platform Hub Cylinder */}
                            <ellipse cx="58" cy="38" rx="16" ry="7" fill="#C83E1B" fillOpacity="0.25" stroke="#C83E1B" strokeWidth="1.4" />
                            <path d="M 42 38 V 50 C 42 54, 74 54, 74 50 V 38" fill="#FFF5F2" stroke="#C83E1B" strokeWidth="1.4" />
                            <ellipse cx="58" cy="50" rx="16" ry="7" fill="none" stroke="#C83E1B" strokeWidth="1" strokeDasharray="2 2" />

                            {/* Isolated Tenant Nodes */}
                            {/* Top-Left Tenant */}
                            <rect x="18" y="22" width="20" height="13" rx="2" fill="#FFFFFF" stroke="#3F414A" strokeWidth="1.2" />
                            <line x1="22" y1="27" x2="30" y2="27" stroke="#9FA3B0" strokeWidth="1" />
                            <path d="M 38 29 C 44 32, 46 36, 46 40" stroke="#C83E1B" strokeWidth="1" strokeDasharray="2 2" />

                            {/* Top-Right Tenant */}
                            <rect x="78" y="22" width="20" height="13" rx="2" fill="#FFFFFF" stroke="#3F414A" strokeWidth="1.2" />
                            <line x1="82" y1="27" x2="90" y2="27" stroke="#9FA3B0" strokeWidth="1" />
                            <path d="M 78 29 C 72 32, 70 36, 70 40" stroke="#C83E1B" strokeWidth="1" strokeDasharray="2 2" />

                            {/* Bottom Center Tenant */}
                            <rect x="48" y="66" width="20" height="13" rx="2" fill="#FFFFFF" stroke="#3F414A" strokeWidth="1.2" />
                            <line x1="52" y1="71" x2="60" y2="71" stroke="#9FA3B0" strokeWidth="1" />
                            <path d="M 58 54 L 58 66" stroke="#C83E1B" strokeWidth="1" strokeDasharray="2 2" />
                          </svg>
                        )}

                        {/* CARD 04: Parallel Event-Stream Lanes & Broker Router */}
                        {card.id === 'backend-distributed' && (
                          <svg viewBox="0 0 116 92" fill="none" className="w-full h-full block">
                            {/* 3 Stream Lanes */}
                            <line x1="14" y1="28" x2="48" y2="28" stroke="#D5D7E0" strokeWidth="1.2" />
                            <line x1="14" y1="46" x2="48" y2="46" stroke="#D5D7E0" strokeWidth="1.2" />
                            <line x1="14" y1="64" x2="48" y2="64" stroke="#D5D7E0" strokeWidth="1.2" />

                            {/* Data Packet Capsules on Ingress */}
                            <rect x="22" y="26" width="8" height="4" rx="2" fill="#3F414A" />
                            <rect x="32" y="44" width="8" height="4" rx="2" fill="#C83E1B" />
                            <rect x="20" y="62" width="8" height="4" rx="2" fill="#3F414A" />

                            {/* Central Message Broker Router Gate */}
                            <rect x="48" y="18" width="18" height="56" rx="2" fill="#FFF5F2" stroke="#C83E1B" strokeWidth="1.5" />
                            <line x1="52" y1="28" x2="62" y2="38" stroke="#C83E1B" strokeWidth="1" />
                            <line x1="52" y1="46" x2="62" y2="46" stroke="#C83E1B" strokeWidth="1" />
                            <line x1="52" y1="64" x2="62" y2="54" stroke="#C83E1B" strokeWidth="1" />

                            {/* Consumer Output Tracks */}
                            <line x1="66" y1="28" x2="94" y2="28" stroke="#3F414A" strokeWidth="1.2" />
                            <line x1="66" y1="46" x2="94" y2="46" stroke="#3F414A" strokeWidth="1.2" />
                            <line x1="66" y1="64" x2="94" y2="64" stroke="#3F414A" strokeWidth="1.2" />

                            {/* Consumer Nodes */}
                            <circle cx="94" cy="28" r="3.5" fill="#FFFFFF" stroke="#3F414A" strokeWidth="1.2" />
                            <circle cx="94" cy="46" r="3.5" fill="#FFFFFF" stroke="#3F414A" strokeWidth="1.2" />
                            <circle cx="94" cy="64" r="3.5" fill="#FFFFFF" stroke="#3F414A" strokeWidth="1.2" />

                            {/* Retry Feedback Arc */}
                            <path d="M 88 70 C 80 82, 34 82, 28 69" stroke="#C83E1B" strokeWidth="1" strokeDasharray="3 2" />
                          </svg>
                        )}

                        {/* CARD 05: Synchronized Automation Rotor & Orbiting Flow */}
                        {card.id === 'workflow-automation' && (
                          <svg viewBox="0 0 116 92" fill="none" className="w-full h-full block">
                            {/* Central Precision Automation Rotor */}
                            <g className="origin-[58px_46px]">
                              {/* 8-tooth gear path */}
                              <path
                                d="M 54 26 H 62 V 30 C 65 31, 68 33, 71 35 L 74 32 L 80 38 L 77 41 C 79 44, 81 47, 82 50 H 86 V 58 H 82 C 81 61, 79 64, 77 67 L 80 70 L 74 76 L 71 73 C 68 75, 65 77, 62 78 V 82 H 54 V 78 C 51 77, 48 75, 45 73 L 42 76 L 36 70 L 39 67 C 37 64, 35 61, 34 58 H 30 V 50 H 34 C 35 47, 37 44, 39 41 L 36 38 L 42 32 L 45 35 C 48 33, 51 31, 54 30 Z"
                                fill="#FFFFFF"
                                stroke="#3F414A"
                                strokeWidth="1.2"
                              />
                              {/* Inner Hub */}
                              <circle cx="58" cy="46" r="8" fill="#FFF5F2" stroke="#C83E1B" strokeWidth="1.4" />
                              <circle cx="58" cy="46" r="2.5" fill="#C83E1B" />
                            </g>

                            {/* Orbiting Flow Motion Arrows */}
                            <path
                              d="M 76 28 C 88 34, 92 48, 86 60"
                              stroke="#C83E1B"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path d="M 83 58 L 86 63 L 90 59" stroke="#C83E1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

                            <path
                              d="M 40 64 C 28 58, 24 44, 30 32"
                              stroke="#C83E1B"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path d="M 33 34 L 30 29 L 26 33" stroke="#C83E1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}

                        {/* CARD 06: Architecture Blueprint Elevation & Drafting Set-Square */}
                        {card.id === 'architecture-consulting' && (
                          <svg viewBox="0 0 116 92" fill="none" className="w-full h-full block">
                            {/* Technical Blueprint Grid Sheet */}
                            <rect x="18" y="20" width="68" height="52" rx="1.5" fill="#FFFFFF" stroke="#3F414A" strokeWidth="1.2" />
                            {/* Internal 3-Tier Block Schematic */}
                            <rect x="24" y="26" width="16" height="10" rx="1" fill="#FAFBFD" stroke="#9FA3B0" strokeWidth="0.8" />
                            <rect x="46" y="26" width="16" height="10" rx="1" fill="#FAFBFD" stroke="#9FA3B0" strokeWidth="0.8" />
                            <rect x="24" y="42" width="38" height="10" rx="1" fill="#FAFBFD" stroke="#9FA3B0" strokeWidth="0.8" />
                            <rect x="24" y="56" width="56" height="10" rx="1" fill="#FAFBFD" stroke="#9FA3B0" strokeWidth="0.8" />

                            {/* Overlaid Signal Orange Drafting Set-Square Triangle */}
                            <polygon
                              points="52,26 98,70 52,70"
                              fill="#FFF5F2"
                              stroke="#C83E1B"
                              strokeWidth="1.5"
                            />
                            {/* Inner Cutout Triangle */}
                            <polygon
                              points="60,44 80,64 60,64"
                              fill="#FFFFFF"
                              stroke="#C83E1B"
                              strokeWidth="1.1"
                            />
                            {/* Ruler Tick Marks */}
                            <line x1="52" y1="34" x2="55" y2="34" stroke="#C83E1B" strokeWidth="1" />
                            <line x1="52" y1="42" x2="56" y2="42" stroke="#C83E1B" strokeWidth="1" />
                            <line x1="52" y1="50" x2="55" y2="50" stroke="#C83E1B" strokeWidth="1" />
                            <line x1="52" y1="58" x2="56" y2="58" stroke="#C83E1B" strokeWidth="1" />
                            <line x1="52" y1="66" x2="55" y2="66" stroke="#C83E1B" strokeWidth="1" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* MIDDLE DESCRIPTION */}
                  <p className="font-sans text-[13px] sm:text-[13.5px] leading-[1.6] text-[#3F414A] mb-4">
                    {card.description}
                  </p>
                </div>

                <div>
                  {/* WORK-TYPE TAGS */}
                  <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-[#F9F9FB] border border-[#E2E2E8] rounded-[3px] font-mono text-[10.5px] sm:text-[11px] font-medium text-[#3F414A]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* BOTTOM CTA BAR */}
                  <div className="pt-3.5 border-t border-[#E2E2E8] flex items-center justify-between gap-2">
                    {/* Primary Left Link */}
                    <Link
                      href={card.href}
                      className="font-mono text-[11.5px] sm:text-[12px] font-bold text-[#C83E1B] hover:text-[#A32F12] inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>{card.linkLabel}</span>
                      <span
                        className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                      >
                        &rarr;
                      </span>
                    </Link>

                    {/* Secondary Right Details Link */}
                    <Link
                      href={card.detailsHref}
                      className="font-mono text-[11px] font-medium text-[#5A5D6A] hover:text-[#0A0A0C] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Details</span>
                      <svg
                        className="w-3 h-3"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        aria-hidden="true"
                      >
                        <path
                          d="M4.5 2.5H2.5V9.5H9.5V7.5M6.5 2.5H9.5V5.5M9.2 2.8L5.2 6.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* 3. BOTTOM EDITORIAL DIVIDER & CLOSING STATEMENT */}
        <div className="mt-14 flex items-center gap-4">
          <span className="w-12 h-[3px] bg-[#C83E1B] shrink-0" aria-hidden="true" />
          <div className="h-px flex-1 bg-[#E2E2E8]" aria-hidden="true" />
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#3F414A] shrink-0">
            FROM PROBLEM TO PRODUCTION <span className="text-[#C83E1B] mx-1.5">//</span> ENGINEERING CAPABILITIES
          </div>
        </div>
      </div>
    </section>
  );
}
