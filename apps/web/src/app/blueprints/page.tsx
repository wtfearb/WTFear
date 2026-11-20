import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BLUEPRINT_CATALOG } from '@/lib/state/blueprints-machine';
import { generateBlueprintsCatalogJsonLd } from '@/lib/schema/json-ld';
import { BlueprintSchematicViewfinder } from '@/components/blueprints/BlueprintSchematicViewfinder';

export const metadata: Metadata = {
  title: 'AI & Distributed Engineering Blueprints',
  description:
    'Reference architectures for governed RAG triage agents, multi-tenant Postgres SaaS portals, and distributed integration pipelines.',
  alternates: {
    canonical: '/blueprints',
  },
  openGraph: {
    title: 'AI & Distributed Engineering Blueprints',
    description:
      'Reference architectures for governed RAG triage agents, multi-tenant Postgres SaaS portals, and distributed integration pipelines.',
    url: '/blueprints',
    siteName: 'WTFearB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI & Distributed Engineering Blueprints',
    description:
      'Reference architectures for governed RAG triage agents, multi-tenant Postgres SaaS portals, and distributed integration pipelines.',
  },
};

export default function BlueprintsIndexPage(): React.ReactElement {
  const jsonLd = generateBlueprintsCatalogJsonLd();

  const aiTriage = BLUEPRINT_CATALOG.find((b) => b.id === 'ai-triage')!;
  const saasPortal = BLUEPRINT_CATALOG.find((b) => b.id === 'saas-portal')!;
  const eventSpine = BLUEPRINT_CATALOG.find((b) => b.id === 'event-spine')!;

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
            1. ASYMMETRIC SPLIT HERO + BLUEPRINT VERIFICATION MODEL
           ========================================================================= */}
        <section className="bg-[#F9F9FB] border-b border-[#E2E2E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column (7 cols): Editorial Title & Scope */}
              <div className="lg:col-span-7">
                {/* Breadcrumb */}
                <div className="font-mono text-[12px] mb-4 flex items-center">
                  <Link href="/" className="text-[#5A5D6A] hover:text-[#0A0A0C] transition-colors">
                    Home
                  </Link>
                  <span className="text-[#9FA3B0] mx-1.5">/</span>
                  <span className="text-[#C83E1B] font-semibold">Engineering Blueprints</span>
                </div>

                {/* Eyebrow */}
                <div className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#C83E1B] flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 bg-[#C83E1B] inline-block" aria-hidden="true" />
                  <span>ARCHITECTURE MONOGRAPHS // REFERENCE SYSTEMS</span>
                </div>

                {/* Headline */}
                <h1 className="font-sans font-extrabold text-[#0A0A0C] text-[40px] sm:text-[48px] leading-[1.08] tracking-[-0.03em] mb-4">
                  Observable Reference Architectures.
                </h1>

                {/* Lead Paragraph */}
                <p className="font-sans text-[15.5px] sm:text-[16.5px] leading-[1.6] text-[#3F414A] max-w-xl">
                  Production-tested system blueprints for governed AI agents, multi-tenant B2B portals, and event-driven backends—documented with clear boundaries, failure modes, and evaluation gates.
                </p>

                {/* 3-Column Hairline Metadata Strip */}
                <div className="mt-9 pt-6 border-t border-[#E2E2E8] grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0 sm:divide-x sm:divide-[#E2E2E8]">
                  <div className="sm:pr-5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#5A5D6A] block">
                      CATALOG SCOPE
                    </span>
                    <span className="font-sans text-[13px] font-bold text-[#0A0A0C] block mt-1">
                      3 Production Reference Systems
                    </span>
                  </div>
                  <div className="sm:px-5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#5A5D6A] block">
                      VERIFICATION
                    </span>
                    <span className="font-sans text-[13px] font-bold text-[#0A0A0C] block mt-1">
                      Schema, Eval &amp; Replay Gates
                    </span>
                  </div>
                  <div className="sm:pl-5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#5A5D6A] block">
                      DELIVERY MODEL
                    </span>
                    <span className="font-sans text-[13px] font-bold text-[#0A0A0C] block mt-1">
                      Direct Repository Implementation
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column (5 cols): // BLUEPRINT VERIFICATION MODEL */}
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
                    // BLUEPRINT VERIFICATION MODEL
                  </div>

                  {/* 3 Step Boxes Connected by Arrows */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                    {/* Step 01 */}
                    <div className="flex-1 bg-[#FFFFFF] border border-[#E2E2E8] rounded-[2px] p-3 shadow-2xs">
                      <div className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-bold text-[#5A5D6A]">
                        <span>01</span>
                      </div>
                      <div className="font-mono text-[10.5px] font-bold text-[#0A0A0C] leading-snug mt-1">
                        SPECIFICATION
                      </div>
                      <div className="font-sans text-[10.5px] text-[#5A5D6A] mt-0.5">
                        Boundaries &amp; Contracts
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

                    {/* Step 02 (Highlighted) */}
                    <div className="flex-1 bg-[#FFFFFF] border-2 border-[#C83E1B] rounded-[2px] p-3 shadow-2xs">
                      <div className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-bold text-[#C83E1B]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B]" />
                        <span>02</span>
                      </div>
                      <div className="font-mono text-[10.5px] font-bold text-[#C83E1B] leading-snug mt-1">
                        IMPLEMENTATION
                      </div>
                      <div className="font-sans text-[10.5px] text-[#3F414A] font-medium mt-0.5">
                        Deterministic Core
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

                    {/* Step 03 */}
                    <div className="flex-1 bg-[#FFFFFF] border border-[#E2E2E8] rounded-[2px] p-3 shadow-2xs">
                      <div className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-bold text-[#5A5D6A]">
                        <span>03</span>
                      </div>
                      <div className="font-mono text-[10.5px] font-bold text-[#0A0A0C] leading-snug mt-1">
                        EVALUATION GATE
                      </div>
                      <div className="font-sans text-[10.5px] text-[#5A5D6A] mt-0.5">
                        Observable Release
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. STICKY SUB-NAV JUMP BAR
           ========================================================================= */}
        <nav
          aria-label="Blueprints jump navigation"
          className="bg-[#FFFFFF] border-b border-[#E2E2E8] sticky top-16 z-30"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 sm:divide-x sm:divide-[#E2E2E8] py-3 text-[12px]">
              <a
                href="#bp-ai-triage"
                className="py-1 px-3 hover:text-[#C83E1B] transition-colors flex items-center gap-1.5 truncate"
              >
                <span className="font-mono font-bold text-[#C83E1B]">01 //</span>
                <span className="font-sans font-semibold text-[#0A0A0C]">Governed AI Triage</span>
              </a>
              <a
                href="#bp-saas-portal"
                className="py-1 px-3 hover:text-[#C83E1B] transition-colors flex items-center gap-1.5 truncate"
              >
                <span className="font-mono font-bold text-[#5A5D6A]">02 //</span>
                <span className="font-sans font-semibold text-[#0A0A0C]">Multi-Tenant SaaS Portal</span>
              </a>
              <a
                href="#bp-event-spine"
                className="py-1 px-3 hover:text-[#C83E1B] transition-colors flex items-center gap-1.5 truncate"
              >
                <span className="font-mono font-bold text-[#5A5D6A]">03 //</span>
                <span className="font-sans font-semibold text-[#0A0A0C]">Event-Driven Sync Spine</span>
              </a>
              <a
                href="#bp-matrix"
                className="py-1 px-3 hover:text-[#C83E1B] transition-colors flex items-center gap-1.5 truncate"
              >
                <span className="font-mono font-bold text-[#5A5D6A]">04 //</span>
                <span className="font-sans font-semibold text-[#0A0A0C]">Trade-Off Matrix</span>
              </a>
            </div>
          </div>
        </nav>

        {/* =========================================================================
            3. THREE ALTERNATING EDITORIAL BLUEPRINT MONOGRAPHS
           ========================================================================= */}
        <section className="bg-[#F9F9FB] divide-y divide-[#E2E2E8] border-b border-[#E2E2E8]">
          {/* -----------------------------------------------------------------------
              Monograph 01: Governed AI Triage (Text Left / Schematic Right)
             ----------------------------------------------------------------------- */}
          <div id="bp-ai-triage" className="scroll-mt-28 py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                {/* Narrative (6 cols) */}
                <div className="lg:col-span-6">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B] block mb-2">
                    01 // AI AGENTS &amp; GOVERNANCE
                  </span>
                  <h2 className="font-sans font-extrabold text-[26px] sm:text-[32px] leading-[1.15] tracking-[-0.025em] text-[#0A0A0C] mb-3">
                    {aiTriage.title}
                  </h2>
                  <p className="font-sans text-[15px] leading-[1.65] text-[#3F414A] mb-3">
                    {aiTriage.summary}
                  </p>
                  <p className="font-sans text-[13.5px] leading-[1.6] text-[#5A5D6A] mb-6">
                    {aiTriage.problemStatement}
                  </p>

                  {/* Verification Gate Box */}
                  <div className="bg-[#F9F9FB] border border-[#E2E2E8] border-l-2 border-l-[#C83E1B] p-4 rounded-[2px] mb-6">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#C83E1B] block mb-1">
                      VERIFICATION GATE // AUTOMATED EVAL
                    </span>
                    <p className="font-sans text-[13px] text-[#0A0A0C] font-semibold leading-snug">
                      {aiTriage.verificationGate}
                    </p>
                  </div>

                  {/* Core Stack */}
                  <div className="mb-6">
                    <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#5A5D6A] block mb-2">
                      CORE ARCHITECTURE STACK
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {aiTriage.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-[2px] border border-[#E2E2E8] bg-[#FFFFFF] px-2.5 py-1 text-[11px] font-mono text-[#0A0A0C] font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Row */}
                  <div className="pt-6 border-t border-[#E2E2E8] flex flex-wrap items-center justify-between gap-4">
                    <Link
                      href={`/blueprints/${aiTriage.id}`}
                      className="bg-[#0A0A0C] hover:bg-[#181A20] text-[#FFFFFF] px-5 py-2.5 rounded-[2px] font-mono text-[12px] font-bold uppercase tracking-[0.08em] inline-flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <span>Inspect Full Blueprint</span>
                      <span className="text-[#C83E1B]">&rarr;</span>
                    </Link>
                    <span className="font-mono text-[12px] text-[#5A5D6A]">
                      {aiTriage.checklist.length} Verification Checks &bull; {aiTriage.durationLabel}
                    </span>
                  </div>
                </div>

                {/* Schematic (6 cols) */}
                <div className="lg:col-span-6">
                  <BlueprintSchematicViewfinder id="ai-triage" />
                </div>
              </div>
            </div>
          </div>

          {/* -----------------------------------------------------------------------
              Monograph 02: Multi-Tenant SaaS Portal (Schematic Left / Text Right)
             ----------------------------------------------------------------------- */}
          <div id="bp-saas-portal" className="scroll-mt-28 py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                {/* Schematic (6 cols, desktop order 1) */}
                <div className="lg:col-span-6 lg:order-1 order-2">
                  <BlueprintSchematicViewfinder id="saas-portal" />
                </div>

                {/* Narrative (6 cols, desktop order 2) */}
                <div className="lg:col-span-6 lg:order-2 order-1">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B] block mb-2">
                    02 // MULTI-TENANT SAAS
                  </span>
                  <h2 className="font-sans font-extrabold text-[26px] sm:text-[32px] leading-[1.15] tracking-[-0.025em] text-[#0A0A0C] mb-3">
                    {saasPortal.title}
                  </h2>
                  <p className="font-sans text-[15px] leading-[1.65] text-[#3F414A] mb-3">
                    {saasPortal.summary}
                  </p>
                  <p className="font-sans text-[13.5px] leading-[1.6] text-[#5A5D6A] mb-6">
                    {saasPortal.problemStatement}
                  </p>

                  {/* Verification Gate Box */}
                  <div className="bg-[#F9F9FB] border border-[#E2E2E8] border-l-2 border-l-[#C83E1B] p-4 rounded-[2px] mb-6">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#C83E1B] block mb-1">
                      VERIFICATION GATE // SECURITY &amp; SPEED
                    </span>
                    <p className="font-sans text-[13px] text-[#0A0A0C] font-semibold leading-snug">
                      {saasPortal.verificationGate}
                    </p>
                  </div>

                  {/* Core Stack */}
                  <div className="mb-6">
                    <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#5A5D6A] block mb-2">
                      CORE ARCHITECTURE STACK
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {saasPortal.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-[2px] border border-[#E2E2E8] bg-[#FFFFFF] px-2.5 py-1 text-[11px] font-mono text-[#0A0A0C] font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Row */}
                  <div className="pt-6 border-t border-[#E2E2E8] flex flex-wrap items-center justify-between gap-4">
                    <Link
                      href={`/blueprints/${saasPortal.id}`}
                      className="bg-[#0A0A0C] hover:bg-[#181A20] text-[#FFFFFF] px-5 py-2.5 rounded-[2px] font-mono text-[12px] font-bold uppercase tracking-[0.08em] inline-flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <span>Inspect Full Blueprint</span>
                      <span className="text-[#C83E1B]">&rarr;</span>
                    </Link>
                    <span className="font-mono text-[12px] text-[#5A5D6A]">
                      {saasPortal.checklist.length} Verification Checks &bull; {saasPortal.durationLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* -----------------------------------------------------------------------
              Monograph 03: Event-Driven Sync Spine (Text Left / Schematic Right)
             ----------------------------------------------------------------------- */}
          <div id="bp-event-spine" className="scroll-mt-28 py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                {/* Narrative (6 cols) */}
                <div className="lg:col-span-6">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B] block mb-2">
                    03 // DISTRIBUTED SYSTEMS
                  </span>
                  <h2 className="font-sans font-extrabold text-[26px] sm:text-[32px] leading-[1.15] tracking-[-0.025em] text-[#0A0A0C] mb-3">
                    {eventSpine.title}
                  </h2>
                  <p className="font-sans text-[15px] leading-[1.65] text-[#3F414A] mb-3">
                    {eventSpine.summary}
                  </p>
                  <p className="font-sans text-[13.5px] leading-[1.6] text-[#5A5D6A] mb-6">
                    {eventSpine.problemStatement}
                  </p>

                  {/* Verification Gate Box */}
                  <div className="bg-[#F9F9FB] border border-[#E2E2E8] border-l-2 border-l-[#C83E1B] p-4 rounded-[2px] mb-6">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#C83E1B] block mb-1">
                      VERIFICATION GATE // RESILIENCE &amp; LOAD
                    </span>
                    <p className="font-sans text-[13px] text-[#0A0A0C] font-semibold leading-snug">
                      {eventSpine.verificationGate}
                    </p>
                  </div>

                  {/* Core Stack */}
                  <div className="mb-6">
                    <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#5A5D6A] block mb-2">
                      CORE ARCHITECTURE STACK
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {eventSpine.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-[2px] border border-[#E2E2E8] bg-[#FFFFFF] px-2.5 py-1 text-[11px] font-mono text-[#0A0A0C] font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Row */}
                  <div className="pt-6 border-t border-[#E2E2E8] flex flex-wrap items-center justify-between gap-4">
                    <Link
                      href={`/blueprints/${eventSpine.id}`}
                      className="bg-[#0A0A0C] hover:bg-[#181A20] text-[#FFFFFF] px-5 py-2.5 rounded-[2px] font-mono text-[12px] font-bold uppercase tracking-[0.08em] inline-flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <span>Inspect Full Blueprint</span>
                      <span className="text-[#C83E1B]">&rarr;</span>
                    </Link>
                    <span className="font-mono text-[12px] text-[#5A5D6A]">
                      {eventSpine.checklist.length} Verification Checks &bull; {eventSpine.durationLabel}
                    </span>
                  </div>
                </div>

                {/* Schematic (6 cols) */}
                <div className="lg:col-span-6">
                  <BlueprintSchematicViewfinder id="event-spine" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. ARCHITECTURE TRADE-OFF MATRIX (Full-Width Obsidian Band)
           ========================================================================= */}
        <section
          id="bp-matrix"
          className="scroll-mt-28 bg-[#0C0D10] border-t-2 border-t-[#C83E1B] py-16 lg:py-20 text-[#FFFFFF]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B] block mb-2">
                04 // SYSTEM SELECTION GUIDE
              </span>
              <h2 className="font-sans font-extrabold text-[28px] sm:text-[34px] tracking-[-0.025em] text-[#FFFFFF] mb-3">
                Matching the Blueprint to the Constraint.
              </h2>
              <p className="font-sans text-[14.5px] leading-[1.65] text-[#A6A9B6]">
                Comparing reference architectures across real-world business constraints, primary bottleneck resolutions, and verification gating.
              </p>
            </div>

            {/* Semantic Table */}
            <div className="overflow-x-auto border border-[#242731] bg-[#14161B] rounded-[2px]">
              <table className="w-full text-left border-collapse text-[13px]">
                <thead>
                  <tr className="border-b border-[#242731] bg-[#0A0A0C]/60 text-[#8C90A0] font-mono text-[11px] font-bold uppercase tracking-wider">
                    <th scope="col" className="py-3.5 px-4 sm:px-6">BLUEPRINT</th>
                    <th scope="col" className="py-3.5 px-4 sm:px-6">PRIMARY BOTTLENECK SOLVED</th>
                    <th scope="col" className="py-3.5 px-4 sm:px-6">KEY GOVERNANCE / RELIABILITY GATE</th>
                    <th scope="col" className="py-3.5 px-4 sm:px-6">RECOMMENDED STACK</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#242731] text-[#E2E2E8]">
                  {/* Row 1: ai-triage */}
                  <tr className="hover:bg-[#181A22] transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-medium text-white">
                      <Link
                        href={`/blueprints/${aiTriage.id}`}
                        className="hover:text-[#C83E1B] transition-colors flex items-center gap-1.5"
                      >
                        <span className="font-mono text-[#C83E1B] text-[11px]">01 //</span>
                        <span className="font-bold underline decoration-[#242731] hover:decoration-[#C83E1B]">
                          {aiTriage.title}
                        </span>
                      </Link>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-[#A6A9B6] max-w-xs">
                      {aiTriage.problemStatement}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-[#E2E2E8] font-medium max-w-xs">
                      {aiTriage.verificationGate}
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-mono text-[11px] text-[#A6A9B6]">
                      {aiTriage.stack.slice(0, 4).join(' &bull; ')}
                    </td>
                  </tr>

                  {/* Row 2: saas-portal */}
                  <tr className="hover:bg-[#181A22] transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-medium text-white">
                      <Link
                        href={`/blueprints/${saasPortal.id}`}
                        className="hover:text-[#C83E1B] transition-colors flex items-center gap-1.5"
                      >
                        <span className="font-mono text-[#C83E1B] text-[11px]">02 //</span>
                        <span className="font-bold underline decoration-[#242731] hover:decoration-[#C83E1B]">
                          {saasPortal.title}
                        </span>
                      </Link>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-[#A6A9B6] max-w-xs">
                      {saasPortal.problemStatement}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-[#E2E2E8] font-medium max-w-xs">
                      {saasPortal.verificationGate}
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-mono text-[11px] text-[#A6A9B6]">
                      {saasPortal.stack.slice(0, 4).join(' &bull; ')}
                    </td>
                  </tr>

                  {/* Row 3: event-spine */}
                  <tr className="hover:bg-[#181A22] transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-medium text-white">
                      <Link
                        href={`/blueprints/${eventSpine.id}`}
                        className="hover:text-[#C83E1B] transition-colors flex items-center gap-1.5"
                      >
                        <span className="font-mono text-[#C83E1B] text-[11px]">03 //</span>
                        <span className="font-bold underline decoration-[#242731] hover:decoration-[#C83E1B]">
                          {eventSpine.title}
                        </span>
                      </Link>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-[#A6A9B6] max-w-xs">
                      {eventSpine.problemStatement}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-[#E2E2E8] font-medium max-w-xs">
                      {eventSpine.verificationGate}
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-mono text-[11px] text-[#A6A9B6]">
                      {eventSpine.stack.slice(0, 4).join(' &bull; ')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. SPLIT FINAL CTA (Matching /services and /about pixel-for-pixel)
           ========================================================================= */}
        <section className="bg-[#F9F9FB] pt-12 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Panel: Direct Inquiry Card */}
              <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E2E2E8] rounded-[2px] p-8 sm:p-10 flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B] flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B]" />
                    <span>CUSTOM SYSTEM ARCHITECTURE</span>
                  </div>
                  <h2 className="font-sans font-extrabold text-[26px] sm:text-[30px] tracking-[-0.025em] text-[#0A0A0C] mb-3">
                    Need a Blueprint Tailored to Your Stack?
                  </h2>
                  <p className="font-sans text-[14px] leading-[1.6] text-[#3F414A] max-w-md">
                    Share your current topology, latency constraints, or AI governance requirements directly with our principal engineers.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/contact?intent=audit"
                    className="bg-[#0A0A0C] hover:bg-[#181A20] text-[#FFFFFF] px-5 py-3 rounded-[2px] font-sans text-[13px] font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Start a Technical Conversation</span>
                    <span className="text-[#C83E1B]">&rarr;</span>
                  </Link>
                  <Link
                    href="/projects"
                    className="bg-[#FFFFFF] hover:bg-[#F9F9FB] text-[#0A0A0C] border border-[#E2E2E8] hover:border-[#0A0A0C] px-5 py-3 rounded-[2px] font-sans text-[13px] font-semibold transition-colors cursor-pointer"
                  >
                    Explore Flagship Projects
                  </Link>
                </div>
              </div>

              {/* Right Panel: What Every Monograph Includes */}
              <div className="lg:col-span-5 bg-[#0C0D10] border-t-2 border-t-[#C83E1B] rounded-[2px] p-8 sm:p-10 text-[#FFFFFF] shadow-2xs flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B] block mb-2">
                    // BLUEPRINT TO PRODUCTION
                  </span>
                  <h2 className="font-sans font-extrabold text-[24px] sm:text-[26px] tracking-[-0.025em] text-[#FFFFFF] mb-6">
                    What Every Monograph Includes
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 font-sans text-[14px] font-medium text-[#FFFFFF]">
                      <span className="w-2 h-2 bg-[#C83E1B] shrink-0 mt-1.5" aria-hidden="true" />
                      <span>Explicit data boundaries &amp; failure-mode handling</span>
                    </div>
                    <div className="flex items-start gap-3 font-sans text-[14px] font-medium text-[#FFFFFF]">
                      <span className="w-2 h-2 bg-[#C83E1B] shrink-0 mt-1.5" aria-hidden="true" />
                      <span>Automated schema, eval, or replay verification gates</span>
                    </div>
                    <div className="flex items-start gap-3 font-sans text-[14px] font-medium text-[#FFFFFF]">
                      <span className="w-2 h-2 bg-[#C83E1B] shrink-0 mt-1.5" aria-hidden="true" />
                      <span>Clean repository handoff with full observability</span>
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
