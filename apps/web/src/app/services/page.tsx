import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ViewfinderSchematic } from '@/components/services/ViewfinderSchematic';
import { ServicesGovernanceWorkbench } from '@/components/services/ServicesGovernanceWorkbench';
import { generateServicesJsonLd } from '@/lib/schema/json-ld';

export const metadata: Metadata = {
  title: 'AI Workflow Automation, Agentic AI & Custom SaaS Engineering Services',
  description:
    'Custom AI workflow automation, multi-agent RAG systems, enterprise LLM engineering, B2B SaaS portals, and distributed backend pipelines engineered by WTFearB.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'AI Workflow Automation, Agentic AI & Custom SaaS Engineering Services | WTFearB',
    description:
      'Custom AI workflow automation, multi-agent RAG systems, enterprise LLM engineering, B2B SaaS portals, and distributed backend pipelines engineered by WTFearB.',
    url: '/services',
    siteName: 'WTFearB',
    type: 'website',
  },
};

export default function ServicesPage(): React.ReactElement {
  const jsonLd = generateServicesJsonLd();

  return (
    <div className="min-h-screen bg-[#F9F9FB] text-[#0A0A0C] selection:bg-[#C83E1B] selection:text-white flex flex-col scroll-smooth">
      {/* Schema.org Linked Graph JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Global Navigation */}
      <Header />

      <main className="flex-1">
        {/* =========================================================================
            1. ASYMMETRIC SPLIT HERO + CAPABILITY ARCHITECTURE STACK
           ========================================================================= */}
        <section className="bg-[#F9F9FB] border-b border-[#E2E2E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column (7 cols): Editorial Title & Subtitle */}
              <div className="lg:col-span-7">
                {/* Breadcrumb */}
                <div className="font-mono text-[12px] mb-4 flex items-center">
                  <Link href="/" className="text-[#5A5D6A] hover:text-[#0A0A0C] transition-colors">
                    Home
                  </Link>
                  <span className="text-[#9FA3B0] mx-1.5">/</span>
                  <span className="text-[#C83E1B] font-semibold">Services</span>
                </div>

                {/* Eyebrow */}
                <div className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#C83E1B] flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B] inline-block" aria-hidden="true" />
                  <span>ENGINEERING CAPABILITIES // FULL-STACK SYSTEMS</span>
                </div>

                {/* Headline */}
                <h1 className="font-sans font-extrabold text-[#0A0A0C] text-[40px] sm:text-[48px] leading-[1.08] tracking-[-0.03em] mb-4">
                  Disciplines We Own &amp; Deliver.
                </h1>

                {/* Lead Paragraph */}
                <p className="font-sans text-[15.5px] sm:text-[16.5px] leading-[1.6] text-[#3F414A] max-w-xl">
                  End-to-end systems engineering—from governed AI pipelines and custom software to distributed backends and enterprise B2B platforms.
                </p>

                {/* 3-Column Hairline Metadata Strip */}
                <div className="mt-9 pt-6 border-t border-[#E2E2E8] grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0 sm:divide-x sm:divide-[#E2E2E8]">
                  <div className="sm:pr-5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#5A5D6A] block">
                      SYSTEM SCOPE
                    </span>
                    <span className="font-sans text-[13px] font-bold text-[#0A0A0C] block mt-1">
                      0-to-1 &amp; Core Modernization
                    </span>
                  </div>
                  <div className="sm:px-5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#5A5D6A] block">
                      AI GOVERNANCE
                    </span>
                    <span className="font-sans text-[13px] font-bold text-[#0A0A0C] block mt-1">
                      Schema &amp; Evaluation Enforced
                    </span>
                  </div>
                  <div className="sm:pl-5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#5A5D6A] block">
                      DELIVERY MODEL
                    </span>
                    <span className="font-sans text-[13px] font-bold text-[#0A0A0C] block mt-1">
                      Principal-Led Engineering Pods
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column (5 cols): // CAPABILITY ARCHITECTURE STACK Schematic */}
              <div className="lg:col-span-5">
                <div className="relative p-5 sm:p-7 bg-[#FAFBFD] border border-[#E2E2E8] bg-[linear-gradient(to_right,#E2E2E8_1px,transparent_1px),linear-gradient(to_bottom,#E2E2E8_1px,transparent_1px)] bg-[size:20px_20px]">
                  {/* Four Crisp Corner Viewfinder Brackets */}
                  <span
                    className="absolute -top-[1px] -left-[1px] w-[14px] h-[14px] border-t-[1.5px] border-l-[1.5px] border-[#3F414A]"
                    aria-hidden="true"
                  />
                  <span
                    className="absolute -top-[1px] -right-[1px] w-[14px] h-[14px] border-t-[1.5px] border-r-[1.5px] border-[#3F414A]"
                    aria-hidden="true"
                  />
                  <span
                    className="absolute -bottom-[1px] -left-[1px] w-[14px] h-[14px] border-b-[1.5px] border-l-[1.5px] border-[#3F414A]"
                    aria-hidden="true"
                  />
                  <span
                    className="absolute -bottom-[1px] -right-[1px] w-[14px] h-[14px] border-b-[1.5px] border-r-[1.5px] border-[#3F414A]"
                    aria-hidden="true"
                  />

                  {/* Header */}
                  <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0A0A0C] mb-5">
                    // CAPABILITY ARCHITECTURE STACK
                  </div>

                  {/* 3 Step Boxes Connected by Arrows */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                    {/* Node 01 */}
                    <div className="flex-1 bg-[#FFFFFF] border border-[#E2E2E8] rounded-[2px] p-3 shadow-2xs">
                      <div className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-bold text-[#C83E1B]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B]" />
                        <span>01</span>
                      </div>
                      <div className="font-mono text-[10.5px] font-bold text-[#0A0A0C] leading-snug mt-1">
                        CLIENT &amp;
                        <br />
                        INTERFACES
                      </div>
                    </div>

                    {/* Arrow 1 -> 2 */}
                    <div className="shrink-0 flex justify-center text-[#3F414A]" aria-hidden="true">
                      <svg
                        className="w-4 h-4 transform sm:rotate-0 rotate-90"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M3 8H13M13 8L9 4M13 8L9 12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    {/* Node 02 */}
                    <div className="flex-1 bg-[#FFFFFF] border border-[#E2E2E8] rounded-[2px] p-3 shadow-2xs">
                      <div className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-bold text-[#C83E1B]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B]" />
                        <span>02</span>
                      </div>
                      <div className="font-mono text-[10.5px] font-bold text-[#0A0A0C] leading-snug mt-1">
                        GOVERNED AI
                        <br />
                        &amp; LOGIC
                      </div>
                    </div>

                    {/* Arrow 2 -> 3 */}
                    <div className="shrink-0 flex justify-center text-[#3F414A]" aria-hidden="true">
                      <svg
                        className="w-4 h-4 transform sm:rotate-0 rotate-90"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M3 8H13M13 8L9 4M13 8L9 12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    {/* Node 03 */}
                    <div className="flex-1 bg-[#FFFFFF] border border-[#E2E2E8] rounded-[2px] p-3 shadow-2xs">
                      <div className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-bold text-[#C83E1B]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B]" />
                        <span>03</span>
                      </div>
                      <div className="font-mono text-[10.5px] font-bold text-[#0A0A0C] leading-snug mt-1">
                        DISTRIBUTED
                        <br />
                        CORE
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. DISCIPLINE JUMP BAR
           ========================================================================= */}
        <nav
          aria-label="Discipline jump navigation"
          className="bg-[#FFFFFF] border-b border-[#E2E2E8] sticky top-16 z-30"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 sm:divide-x sm:divide-[#E2E2E8] py-3 text-[12px]">
              <a
                href="#discipline-01"
                className="py-1 px-2 hover:text-[#C83E1B] transition-colors flex items-center gap-1.5 truncate"
              >
                <span className="font-mono font-bold text-[#C83E1B]">01 //</span>
                <span className="font-sans font-semibold text-[#0A0A0C]">Governed AI &amp; RAG</span>
              </a>
              <a
                href="#discipline-02"
                className="py-1 px-2 hover:text-[#C83E1B] transition-colors flex items-center gap-1.5 truncate"
              >
                <span className="font-mono font-bold text-[#5A5D6A]">02 //</span>
                <span className="font-sans font-semibold text-[#0A0A0C]">Custom Software</span>
              </a>
              <a
                href="#discipline-03"
                className="py-1 px-2 hover:text-[#C83E1B] transition-colors flex items-center gap-1.5 truncate"
              >
                <span className="font-mono font-bold text-[#5A5D6A]">03 //</span>
                <span className="font-sans font-semibold text-[#0A0A0C]">B2B Portals</span>
              </a>
              <a
                href="#discipline-04"
                className="py-1 px-2 hover:text-[#C83E1B] transition-colors flex items-center gap-1.5 truncate"
              >
                <span className="font-mono font-bold text-[#5A5D6A]">04 //</span>
                <span className="font-sans font-semibold text-[#0A0A0C]">Event Pipelines</span>
              </a>
              <a
                href="#discipline-05"
                className="py-1 px-2 hover:text-[#C83E1B] transition-colors flex items-center gap-1.5 truncate"
              >
                <span className="font-mono font-bold text-[#5A5D6A]">05 //</span>
                <span className="font-sans font-semibold text-[#0A0A0C]">Workflow Automation</span>
              </a>
              <a
                href="#discipline-06"
                className="py-1 px-2 hover:text-[#C83E1B] transition-colors flex items-center gap-1.5 truncate"
              >
                <span className="font-mono font-bold text-[#5A5D6A]">06 //</span>
                <span className="font-sans font-semibold text-[#0A0A0C]">Architecture Audits</span>
              </a>
            </div>
          </div>
        </nav>

        {/* =========================================================================
            3. CORE ENGINEERING DISCIPLINES — PART A (3 Spacious Alternating Rows)
           ========================================================================= */}
        <section className="bg-[#F9F9FB] divide-y divide-[#E2E2E8] border-b border-[#E2E2E8]">
          {/* -----------------------------------------------------------------------
              Row 01: Governed AI Engineering & RAG Systems (Text Left / Schematic Right)
             ----------------------------------------------------------------------- */}
          <div id="discipline-01" className="scroll-mt-28 py-12 lg:py-14">
            <span id="ai-engineering" className="scroll-mt-28 block" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                {/* Left (5 cols): Description & Capabilities */}
                <div className="lg:col-span-5">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B] block mb-2">
                    01 // GOVERNED AI &amp; RAG
                  </span>
                  <h2 className="font-sans font-extrabold text-[26px] sm:text-[30px] leading-[1.15] tracking-[-0.025em] text-[#0A0A0C] mb-3">
                    Governed AI Engineering &amp; RAG Systems
                  </h2>
                  <p className="font-sans text-[14.5px] leading-[1.65] text-[#3F414A] mb-6">
                    Production-ready AI systems with structured retrieval, evaluation, and guardrails.
                  </p>

                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2.5 font-mono text-[12px] font-semibold text-[#0A0A0C]">
                      <span className="w-1.5 h-1.5 bg-[#C83E1B] shrink-0" aria-hidden="true" />
                      <span>Hybrid Retrieval &amp; Indexing</span>
                    </div>
                    <div className="flex items-center gap-2.5 font-mono text-[12px] font-semibold text-[#0A0A0C]">
                      <span className="w-1.5 h-1.5 bg-[#C83E1B] shrink-0" aria-hidden="true" />
                      <span>Structured Schema Validation</span>
                    </div>
                    <div className="flex items-center gap-2.5 font-mono text-[12px] font-semibold text-[#0A0A0C]">
                      <span className="w-1.5 h-1.5 bg-[#C83E1B] shrink-0" aria-hidden="true" />
                      <span>Automated Evaluation Suites</span>
                    </div>
                  </div>
                </div>

                {/* Right (7 cols): Schematic with orange accent top */}
                <div className="lg:col-span-7">
                  <ViewfinderSchematic
                    accentTop={true}
                    steps={['INGEST & INDEX', 'HYBRID RETRIEVAL', 'SCHEMA & CITATION GATE']}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* -----------------------------------------------------------------------
              Row 02: Custom Software & Systems Engineering (Schematic Left / Text Right)
             ----------------------------------------------------------------------- */}
          <div id="discipline-02" className="scroll-mt-28 py-12 lg:py-14">
            <span id="custom-software" className="scroll-mt-28 block" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                {/* Left (7 cols): Schematic */}
                <div className="lg:col-span-7 order-2 lg:order-1">
                  <ViewfinderSchematic
                    steps={[
                      'TYPED API GATEWAY',
                      'CORE DOMAIN SERVICES',
                      'TRANSACTIONAL DATA STORE',
                    ]}
                  />
                </div>

                {/* Right (5 cols): Description & Capabilities */}
                <div className="lg:col-span-5 order-1 lg:order-2">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B] block mb-2">
                    02 // CUSTOM SOFTWARE
                  </span>
                  <h2 className="font-sans font-extrabold text-[26px] sm:text-[30px] leading-[1.15] tracking-[-0.025em] text-[#0A0A0C] mb-3">
                    Custom Software &amp; Systems Engineering
                  </h2>
                  <p className="font-sans text-[14.5px] leading-[1.65] text-[#3F414A] mb-6">
                    Build reliable, maintainable software systems for your business operations.
                  </p>

                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2.5 font-mono text-[12px] font-semibold text-[#0A0A0C]">
                      <span className="w-1.5 h-1.5 bg-[#C83E1B] shrink-0" aria-hidden="true" />
                      <span>Core Operational Platforms</span>
                    </div>
                    <div className="flex items-center gap-2.5 font-mono text-[12px] font-semibold text-[#0A0A0C]">
                      <span className="w-1.5 h-1.5 bg-[#C83E1B] shrink-0" aria-hidden="true" />
                      <span>Typed APIs &amp; Data Models</span>
                    </div>
                    <div className="flex items-center gap-2.5 font-mono text-[12px] font-semibold text-[#0A0A0C]">
                      <span className="w-1.5 h-1.5 bg-[#C83E1B] shrink-0" aria-hidden="true" />
                      <span>Legacy System Modernization</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* -----------------------------------------------------------------------
              Row 03: SaaS & Enterprise B2B Portals (Text Left / Schematic Right)
             ----------------------------------------------------------------------- */}
          <div id="discipline-03" className="scroll-mt-28 py-12 lg:py-14">
            <span id="saas-b2b" className="scroll-mt-28 block" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                {/* Left (5 cols): Description & Capabilities */}
                <div className="lg:col-span-5">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B] block mb-2">
                    03 // ENTERPRISE SAAS
                  </span>
                  <h2 className="font-sans font-extrabold text-[26px] sm:text-[30px] leading-[1.15] tracking-[-0.025em] text-[#0A0A0C] mb-3">
                    SaaS &amp; Enterprise B2B Portals
                  </h2>
                  <p className="font-sans text-[14.5px] leading-[1.65] text-[#3F414A] mb-6">
                    Secure multi-tenant platforms for modern business operations.
                  </p>

                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2.5 font-mono text-[12px] font-semibold text-[#0A0A0C]">
                      <span className="w-1.5 h-1.5 bg-[#C83E1B] shrink-0" aria-hidden="true" />
                      <span>Multi-Tenant Data Isolation</span>
                    </div>
                    <div className="flex items-center gap-2.5 font-mono text-[12px] font-semibold text-[#0A0A0C]">
                      <span className="w-1.5 h-1.5 bg-[#C83E1B] shrink-0" aria-hidden="true" />
                      <span>RBAC &amp; Enterprise SSO</span>
                    </div>
                    <div className="flex items-center gap-2.5 font-mono text-[12px] font-semibold text-[#0A0A0C]">
                      <span className="w-1.5 h-1.5 bg-[#C83E1B] shrink-0" aria-hidden="true" />
                      <span>Tenant Usage &amp; Admin Consoles</span>
                    </div>
                  </div>
                </div>

                {/* Right (7 cols): Schematic */}
                <div className="lg:col-span-7">
                  <ViewfinderSchematic
                    steps={[
                      'TENANT PORTALS',
                      'RBAC & POLICY LAYER',
                      'ISOLATED TENANT PARTITIONS',
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. EXTENDED CAPABILITIES INDEX — PART B (04–06)
           ========================================================================= */}
        <section className="bg-[#F9F9FB] pt-14 pb-14 border-b border-[#E2E2E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B] block mb-2">
              04–06 // INFRASTRUCTURE, AUTOMATION &amp; ADVISORY
            </span>
            <h2 className="font-sans font-extrabold text-[26px] sm:text-[30px] tracking-[-0.025em] text-[#0A0A0C] mb-6">
              Specialized Systems &amp; Architectural Advisory.
            </h2>

            {/* Explicit 12-Column Horizontal Grid List */}
            <div className="border-t border-[#E2E2E8]">
              {/* Row 04 */}
              <span id="backend-distributed" className="scroll-mt-24 block" />
              <div
                id="discipline-04"
                className="scroll-mt-24 py-5 border-b border-[#E2E2E8] grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline"
              >
                <span className="md:col-span-1 font-mono text-[12px] font-bold text-[#C83E1B]">04 //</span>
                <h3 className="md:col-span-4 font-sans text-[15px] font-bold text-[#0A0A0C]">
                  Backend &amp; Distributed Event Pipelines
                </h3>
                <p className="md:col-span-7 font-sans text-[13.5px] leading-[1.6] text-[#3F414A]">
                  High-throughput APIs, async queue workers, idempotent state machines, and OpenTelemetry observability.
                </p>
              </div>

              {/* Row 05 */}
              <span id="workflow-automation" className="scroll-mt-24 block" />
              <div
                id="discipline-05"
                className="scroll-mt-24 py-5 border-b border-[#E2E2E8] grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline"
              >
                <span className="md:col-span-1 font-mono text-[12px] font-bold text-[#C83E1B]">05 //</span>
                <h3 className="md:col-span-4 font-sans text-[15px] font-bold text-[#0A0A0C]">
                  Workflow Automation &amp; System Integrations
                </h3>
                <p className="md:col-span-7 font-sans text-[13.5px] leading-[1.6] text-[#3F414A]">
                  Deterministic ERP/CRM synchronization, human-in-the-loop approval gates, and resilient webhook engines.
                </p>
              </div>

              {/* Row 06 */}
              <span id="architecture-consulting" className="scroll-mt-24 block" />
              <div
                id="discipline-06"
                className="scroll-mt-24 py-5 border-b border-[#E2E2E8] grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline"
              >
                <span className="md:col-span-1 font-mono text-[12px] font-bold text-[#C83E1B]">06 //</span>
                <h3 className="md:col-span-4 font-sans text-[15px] font-bold text-[#0A0A0C]">
                  Architecture &amp; Technical Consulting
                </h3>
                <p className="md:col-span-7 font-sans text-[13.5px] leading-[1.6] text-[#3F414A]">
                  System topology audits, AI feasibility reviews, database latency tuning, and build-vs-buy monographs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. REGION 07 — LIVE GOVERNANCE WORKBENCH
           ========================================================================= */}
        <ServicesGovernanceWorkbench />

        {/* =========================================================================
            6. REGION 08 — PRODUCTION STACK
           ========================================================================= */}
        <section className="bg-[#F9F9FB] pt-16 pb-12 border-b border-[#E2E2E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Title & Subtitle */}
              <div className="lg:col-span-5">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B] block mb-2">
                  08 // PRODUCTION STACK
                </span>
                <h2 className="font-sans font-extrabold text-[26px] sm:text-[30px] leading-[1.15] tracking-[-0.025em] text-[#0A0A0C] mb-3">
                  Built With Technologies That Scale.
                </h2>
                <p className="font-sans text-[14.5px] leading-[1.6] text-[#3F414A]">
                  Battle-tested, observable tools over hype.
                </p>
              </div>

              {/* Right Column: 5 Technology Rows */}
              <div className="lg:col-span-7">
                <div className="bg-[#FFFFFF] border border-[#E2E2E8] rounded-[2px] divide-y divide-[#E2E2E8] shadow-2xs">
                  {/* Row 1 */}
                  <div className="py-3.5 px-4 sm:px-5 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 items-center">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0A0A0C]">
                      FRONTEND &amp; INTERFACES
                    </span>
                    <span className="font-sans text-[13px] text-[#3F414A]">
                      Next.js &bull; React &bull; TypeScript &bull; Tailwind CSS
                    </span>
                  </div>

                  {/* Row 2 */}
                  <div className="py-3.5 px-4 sm:px-5 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 items-center">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0A0A0C]">
                      BACKEND &amp; APIS
                    </span>
                    <span className="font-sans text-[13px] text-[#3F414A]">
                      Node.js &bull; Python &bull; FastAPI &bull; Go &bull; REST / GraphQL
                    </span>
                  </div>

                  {/* Row 3 */}
                  <div className="py-3.5 px-4 sm:px-5 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 items-center">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0A0A0C]">
                      AI &amp; RETRIEVAL
                    </span>
                    <span className="font-sans text-[13px] text-[#3F414A]">
                      OpenAI / Anthropic &bull; Pydantic &bull; pgvector &bull; Hybrid BM25
                    </span>
                  </div>

                  {/* Row 4 */}
                  <div className="py-3.5 px-4 sm:px-5 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 items-center">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0A0A0C]">
                      DATA &amp; STREAMING
                    </span>
                    <span className="font-sans text-[13px] text-[#3F414A]">
                      PostgreSQL &bull; Redis &bull; Kafka / BullMQ &bull; S3
                    </span>
                  </div>

                  {/* Row 5 */}
                  <div className="py-3.5 px-4 sm:px-5 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 items-center">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0A0A0C]">
                      INFRA &amp; OBSERVABILITY
                    </span>
                    <span className="font-sans text-[13px] text-[#3F414A]">
                      Docker &bull; AWS / GCP &bull; OpenTelemetry &bull; GitHub Actions
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. SPLIT FINAL CTA (bg-[#F9F9FB] pt-12 pb-20)
           ========================================================================= */}
        <section className="bg-[#F9F9FB] pt-12 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Panel: Direct Inquiry Card */}
              <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E2E2E8] rounded-[2px] p-8 sm:p-10 flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B] flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B]" />
                    <span>DIRECT ENGINEERING INQUIRY</span>
                  </div>
                  <h2 className="font-sans font-extrabold text-[26px] sm:text-[30px] tracking-[-0.025em] text-[#0A0A0C] mb-3">
                    Have a Complex System to Build?
                  </h2>
                  <p className="font-sans text-[14px] leading-[1.6] text-[#3F414A] max-w-md">
                    Share your technical scope, architecture constraints, or workflow bottleneck directly with our principal engineers.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/contact"
                    className="bg-[#0A0A0C] hover:bg-[#181A20] text-[#FFFFFF] px-5 py-3 rounded-[2px] font-sans text-[13px] font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Start a Technical Conversation</span>
                    <span className="text-[#C83E1B]">&rarr;</span>
                  </Link>
                  <Link
                    href="/blueprints"
                    className="bg-[#FFFFFF] hover:bg-[#F9F9FB] text-[#0A0A0C] border border-[#E2E2E8] hover:border-[#0A0A0C] px-5 py-3 rounded-[2px] font-sans text-[13px] font-semibold transition-colors cursor-pointer"
                  >
                    Explore Engineering Blueprints
                  </Link>
                </div>
              </div>

              {/* Right Panel: Three Ways We Partner */}
              <div className="lg:col-span-5 bg-[#0C0D10] border-t-2 border-t-[#C83E1B] rounded-[2px] p-8 sm:p-10 text-[#FFFFFF] shadow-2xs flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B] block mb-2">
                    // ENGAGEMENT TRACKS
                  </span>
                  <h2 className="font-sans font-extrabold text-[24px] sm:text-[26px] tracking-[-0.025em] text-[#FFFFFF] mb-6">
                    Three Ways We Partner
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 font-sans text-[14px] font-medium text-[#FFFFFF]">
                      <span className="w-2 h-2 bg-[#C83E1B] shrink-0 mt-1.5" aria-hidden="true" />
                      <span>Fixed-Scope Product &amp; AI Builds</span>
                    </div>
                    <div className="flex items-start gap-3 font-sans text-[14px] font-medium text-[#FFFFFF]">
                      <span className="w-2 h-2 bg-[#C83E1B] shrink-0 mt-1.5" aria-hidden="true" />
                      <span>Embedded Principal Engineering Pods</span>
                    </div>
                    <div className="flex items-start gap-3 font-sans text-[14px] font-medium text-[#FFFFFF]">
                      <span className="w-2 h-2 bg-[#C83E1B] shrink-0 mt-1.5" aria-hidden="true" />
                      <span>Architecture Audits &amp; System Blueprints</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Global Dark Obsidian Footer */}
      <Footer />
    </div>
  );
}
