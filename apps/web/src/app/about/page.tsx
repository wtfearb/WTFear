import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { generateAboutJsonLd } from '@/lib/schema/json-ld';

export const metadata: Metadata = {
  title: 'About WTFearB | Systems Engineering Philosophy & Operating Architecture',
  description:
    'WTFearB is a principal-led Product and AI Engineering Studio built for teams solving complex operational and technical problems—without agency bloat or fragile AI wrappers.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About WTFearB — Make "What If" Work',
    description:
      'WTFearB is a principal-led Product and AI Engineering Studio built for teams solving complex operational and technical problems.',
    url: '/about',
    siteName: 'WTFearB Systems Studio',
    type: 'website',
  },
};

export default function AboutPage(): React.ReactElement {
  const jsonLd = generateAboutJsonLd();

  return (
    <div className="min-h-screen bg-[#F9F9FB] text-[#0A0A0C] selection:bg-[#C83E1B] selection:text-white flex flex-col">
      {/* Schema.org Linked Graph JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Global Navigation */}
      <Header />

      <main className="flex-1">
        {/* =========================================================================
            PART 1: ASYMMETRIC SPLIT HERO + STUDIO TOPOLOGY SCHEMATIC
           ========================================================================= */}
        <section className="bg-[#F9F9FB] border-b border-[#E2E2E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column (7 cols): Editorial Title, Thesis & Metadata Strip */}
              <div className="lg:col-span-7">
                {/* Breadcrumb */}
                <div className="font-mono text-[12px] mb-4 flex items-center">
                  <Link href="/" className="text-[#5A5D6A] hover:text-[#0A0A0C] transition-colors">
                    Home
                  </Link>
                  <span className="text-[#9FA3B0] mx-1.5">/</span>
                  <span className="text-[#C83E1B] font-semibold">About</span>
                </div>

                {/* Eyebrow */}
                <div className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#C83E1B] flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B] inline-block" aria-hidden="true" />
                  <span>STUDIO MONOGRAPH // ABOUT WTFEARB</span>
                </div>

                {/* H1 */}
                <h1 className="font-sans font-extrabold text-[#0A0A0C] text-[40px] sm:text-[48px] lg:text-[52px] leading-[1.06] tracking-[-0.03em] mb-4">
                  Make &ldquo;What If&rdquo; Work.
                </h1>

                {/* Lead Paragraph */}
                <p className="font-sans text-[15.5px] sm:text-[16.5px] leading-[1.6] text-[#3F414A] max-w-xl">
                  WTFearB is a principal-led Product and AI Engineering Studio built for teams solving complex operational and technical problems—without agency bloat or fragile AI wrappers.
                </p>

                {/* 3-Column Hairline Metadata Strip */}
                <div className="mt-9 pt-6 border-t border-[#E2E2E8] grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0 sm:divide-x sm:divide-[#E2E2E8]">
                  <div className="sm:pr-5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#5A5D6A] block">
                      STRUCTURE
                    </span>
                    <span className="font-sans text-[13px] font-bold text-[#0A0A0C] block mt-1">
                      Principal Engineering Pods
                    </span>
                  </div>
                  <div className="sm:px-5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#5A5D6A] block">
                      DISCIPLINE
                    </span>
                    <span className="font-sans text-[13px] font-bold text-[#0A0A0C] block mt-1">
                      Governed AI &amp; Core Systems
                    </span>
                  </div>
                  <div className="sm:pl-5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#5A5D6A] block">
                      WORKFLOW
                    </span>
                    <span className="font-sans text-[13px] font-bold text-[#0A0A0C] block mt-1">
                      Direct Repository Delivery
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column (5 cols): // STUDIO OPERATING TOPOLOGY Schematic */}
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
                  <div className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#0A0A0C] mb-5">
                    // STUDIO OPERATING TOPOLOGY
                  </div>

                  {/* 3 Connected Step Nodes */}
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr_auto_1fr] gap-2.5 items-start">
                    {/* Node 1 */}
                    <div>
                      <div className="bg-[#FFFFFF] border border-[#E2E2E8] rounded-[2px] p-3 shadow-2xs">
                        <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#C83E1B]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B] shrink-0" />
                          <span>01</span>
                        </div>
                        <div className="font-mono text-[10.5px] font-bold text-[#0A0A0C] leading-snug mt-1">
                          PRODUCT
                          <br />
                          THESIS
                        </div>
                      </div>
                      <div className="font-sans text-[11px] text-[#3F414A] mt-2 text-center sm:text-left">
                        Problem Framing
                      </div>
                    </div>

                    {/* Arrow 1 -> 2 */}
                    <div className="text-[#3F414A] sm:mt-6 flex justify-center" aria-hidden="true">
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

                    {/* Node 2 */}
                    <div>
                      <div className="bg-[#FFFFFF] border border-[#E2E2E8] rounded-[2px] p-3 shadow-2xs">
                        <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#C83E1B]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B] shrink-0" />
                          <span>02</span>
                        </div>
                        <div className="font-mono text-[10.5px] font-bold text-[#0A0A0C] leading-snug mt-1">
                          SYSTEM
                          <br />
                          ARCHITECTURE
                        </div>
                      </div>
                      <div className="font-sans text-[11px] text-[#3F414A] mt-2 text-center sm:text-left">
                        Deterministic Core
                      </div>
                    </div>

                    {/* Arrow 2 -> 3 */}
                    <div className="text-[#3F414A] sm:mt-6 flex justify-center" aria-hidden="true">
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

                    {/* Node 3 */}
                    <div>
                      <div className="bg-[#FFFFFF] border border-[#E2E2E8] rounded-[2px] p-3 shadow-2xs">
                        <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#C83E1B]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B] shrink-0" />
                          <span>03</span>
                        </div>
                        <div className="font-mono text-[10.5px] font-bold text-[#0A0A0C] leading-snug mt-1">
                          GOVERNED
                          <br />
                          PRODUCTION
                        </div>
                      </div>
                      <div className="font-sans text-[11px] text-[#3F414A] mt-2 text-center sm:text-left">
                        Evaluated Release
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PART 2: STUDIO THESIS & COMPARISON TABLE (01 // STUDIO THESIS)
           ========================================================================= */}
        <section className="bg-[#F9F9FB] border-b border-[#E2E2E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column (5 cols): Studio Thesis */}
              <div className="lg:col-span-5">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B] block mb-2">
                  01 // STUDIO THESIS
                </span>
                <h2 className="font-sans font-extrabold text-[26px] sm:text-[30px] leading-[1.15] tracking-[-0.025em] text-[#0A0A0C] mb-4">
                  Bridging Frontier AI and Systems Rigor.
                </h2>
                <p className="font-sans text-[14px] leading-[1.65] text-[#3F414A] mb-4">
                  Modern teams are often trapped between slow, bloated traditional agencies and brittle prompt-only prototypes. WTFearB combines production backend architecture with governed AI workflows.
                </p>
                <p className="font-sans text-[14px] leading-[1.65] text-[#3F414A]">
                  We build systems that are reliable, observable and maintainable — because real progress comes from durable engineering, not short-term demos.
                </p>
              </div>

              {/* Right Column (7 cols): Semantic Comparison Matrix Table */}
              <div className="lg:col-span-7">
                <div className="bg-[#FFFFFF] border border-[#E2E2E8] rounded-[2px] overflow-x-auto shadow-2xs">
                  <table className="w-full text-left border-collapse min-w-[540px]">
                    <thead>
                      <tr className="border-b border-[#E2E2E8] font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-[#0A0A0C] bg-[#FAFBFD]">
                        <th className="w-[26%] px-4 py-3.5 border-r border-[#E2E2E8]">DIMENSION</th>
                        <th className="w-[37%] px-4 py-3.5 border-r border-[#E2E2E8]">TRADITIONAL AGENCIES</th>
                        <th className="w-[37%] px-4 py-3.5 text-[#C83E1B]">WTFEARB STUDIO</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E2E8] font-sans text-[13px]">
                      {/* Row 1 */}
                      <tr>
                        <td className="px-4 py-3.5 border-r border-[#E2E2E8] font-bold text-[#0A0A0C]">
                          Execution Team
                        </td>
                        <td className="px-4 py-3.5 border-r border-[#E2E2E8] text-[#3F414A]">
                          Account managers + junior handoffs
                        </td>
                        <td className="px-4 py-3.5 font-semibold text-[#0A0A0C]">
                          Direct principal &amp; senior engineers
                        </td>
                      </tr>

                      {/* Row 2 */}
                      <tr>
                        <td className="px-4 py-3.5 border-r border-[#E2E2E8] font-bold text-[#0A0A0C]">
                          AI Architecture
                        </td>
                        <td className="px-4 py-3.5 border-r border-[#E2E2E8] text-[#3F414A]">
                          Unchecked prompt wrappers
                        </td>
                        <td className="px-4 py-3.5 font-semibold text-[#0A0A0C]">
                          Schema-enforced, evaluated pipelines
                        </td>
                      </tr>

                      {/* Row 3 */}
                      <tr>
                        <td className="px-4 py-3.5 border-r border-[#E2E2E8] font-bold text-[#0A0A0C]">
                          Codebase Ownership
                        </td>
                        <td className="px-4 py-3.5 border-r border-[#E2E2E8] text-[#3F414A]">
                          Opaque black-box deliverables
                        </td>
                        <td className="px-4 py-3.5 font-semibold text-[#0A0A0C]">
                          Continuous client-repo commits &amp; docs
                        </td>
                      </tr>

                      {/* Row 4 */}
                      <tr>
                        <td className="px-4 py-3.5 border-r border-[#E2E2E8] font-bold text-[#0A0A0C]">
                          Technical Candor
                        </td>
                        <td className="px-4 py-3.5 border-r border-[#E2E2E8] text-[#3F414A]">
                          Over-scoped retainers
                        </td>
                        <td className="px-4 py-3.5 font-semibold text-[#0A0A0C]">
                          Right-sized architecture &amp; honest trade-offs
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PART 3: FULL-WIDTH OBSIDIAN OPERATING PILLARS (02 // OPERATING ARCHITECTURE)
           ========================================================================= */}
        <section className="bg-[#0C0D10] border-t-2 border-t-[#C83E1B] text-[#FFFFFF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            {/* Header */}
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B] block mb-2">
              02 // OPERATING ARCHITECTURE
            </span>
            <h2 className="font-sans font-extrabold text-[28px] sm:text-[34px] tracking-[-0.025em] text-[#FFFFFF] mb-8">
              Four Pillars Governing Every System.
            </h2>

            {/* 2x2 Grid of Obsidian Pillar Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pillar 01 */}
              <div className="bg-[#14161B] border border-[#242731] rounded-[2px] p-6 sm:p-7 shadow-xs">
                <h3 className="font-sans text-[15px] font-bold text-[#FFFFFF] mb-5">
                  [01] Governed AI Over Raw Prompting
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-[148px_1px_1fr] gap-5 items-center">
                  {/* Left SVG Schematic: Database -> Checkmark Square -> Shield */}
                  <div className="flex items-center justify-center sm:justify-start">
                    <svg
                      viewBox="0 0 148 34"
                      fill="none"
                      className="w-[140px] h-[32px] text-[#E2E2E8]"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      {/* Database Cylinder */}
                      <ellipse cx="14" cy="8" rx="10" ry="4" />
                      <path d="M4 8v14c0 2.2 4.5 4 10 4s10-1.8 10-4V8" />
                      <path d="M4 15c0 2.2 4.5 4 10 4s10-1.8 10-4" />
                      {/* Arrow 1 */}
                      <path d="M34 17h12M42 13l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                      {/* Checkmark Square */}
                      <rect x="56" y="7" width="20" height="20" rx="2" />
                      <path d="M61 17l3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      {/* Arrow 2 */}
                      <path d="M86 17h12M94 13l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                      {/* Shield with check */}
                      <path d="M118 7l10-4 10 4v8c0 7-10 11-10 11s-10-4-10-11V7z" />
                      <path d="M124 16l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* Vertical Divider */}
                  <span className="hidden sm:block w-px h-14 bg-[#242731]" aria-hidden="true" />

                  {/* Right Description */}
                  <p className="font-sans text-[13px] leading-[1.6] text-[#A1A5B2]">
                    Production AI systems built with structured outputs, hybrid retrieval, and automated evaluation suites.
                  </p>
                </div>
              </div>

              {/* Pillar 02 */}
              <div className="bg-[#14161B] border border-[#242731] rounded-[2px] p-6 sm:p-7 shadow-xs">
                <h3 className="font-sans text-[15px] font-bold text-[#FFFFFF] mb-5">
                  [02] Pure Engineering Seniority
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-[148px_1px_1fr] gap-5 items-center">
                  {/* Left SVG Schematic: 3 Person Pod -> Arrow -> Code Window */}
                  <div className="flex items-center justify-center sm:justify-start">
                    <svg
                      viewBox="0 0 148 34"
                      fill="none"
                      className="w-[140px] h-[32px] text-[#E2E2E8]"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      {/* 3 Person Pod */}
                      <circle cx="26" cy="9" r="4" />
                      <path d="M19 25c0-3.5 3.1-6 7-6s7 2.5 7 6" />
                      <circle cx="12" cy="11" r="3.2" />
                      <path d="M6 25c0-2.8 2.5-4.8 5.6-4.8" />
                      <circle cx="40" cy="11" r="3.2" />
                      <path d="M40.4 20.2c3.1 0 5.6 2 5.6 4.8" />
                      {/* Arrow */}
                      <path d="M58 17h18M70 12l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                      {/* Code Window */}
                      <rect x="88" y="5" width="46" height="24" rx="2" />
                      <path d="M88 11h46" strokeWidth="1" />
                      <circle cx="93" cy="8" r="1" fill="currentColor" />
                      <circle cx="97" cy="8" r="1" fill="currentColor" />
                      <path
                        d="M102 19l-3 3 3 3M116 19l3 3-3 3M111 17l-4 8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.2"
                      />
                    </svg>
                  </div>

                  {/* Vertical Divider */}
                  <span className="hidden sm:block w-px h-14 bg-[#242731]" aria-hidden="true" />

                  {/* Right Description */}
                  <p className="font-sans text-[13px] leading-[1.6] text-[#A1A5B2]">
                    Zero translation layers. You collaborate directly with the architects designing schemas, APIs, and interfaces.
                  </p>
                </div>
              </div>

              {/* Pillar 03 */}
              <div className="bg-[#14161B] border border-[#242731] rounded-[2px] p-6 sm:p-7 shadow-xs">
                <h3 className="font-sans text-[15px] font-bold text-[#FFFFFF] mb-5">
                  [03] Transparent Repository Workflow
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-[148px_1px_1fr] gap-5 items-center">
                  {/* Left SVG Schematic: Git Branch -> Gear -> Verified Checkmark */}
                  <div className="flex items-center justify-center sm:justify-start">
                    <svg
                      viewBox="0 0 148 34"
                      fill="none"
                      className="w-[140px] h-[32px] text-[#E2E2E8]"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      {/* Git Branch Node */}
                      <circle cx="10" cy="24" r="3" />
                      <circle cx="10" cy="10" r="3" />
                      <circle cx="24" cy="10" r="3" />
                      <path d="M10 13v8M10 17c0-4 4-7 11-7" strokeLinecap="round" strokeLinejoin="round" />
                      {/* Arrow 1 */}
                      <path d="M36 17h12M44 13l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                      {/* Gear / CI Node */}
                      <circle cx="66" cy="17" r="5" />
                      <path
                        d="M66 6v3M66 25v3M55 17h3M74 17h3M58.2 9.2l2.1 2.1M71.7 22.7l2.1 2.1M58.2 24.8l2.1-2.1M71.7 11.3l2.1-2.1"
                        strokeLinecap="round"
                      />
                      {/* Arrow 2 */}
                      <path d="M88 17h12M96 13l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                      {/* Verified checkmark circle */}
                      <circle cx="124" cy="17" r="10" />
                      <path d="M119 17l3.5 3.5 7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* Vertical Divider */}
                  <span className="hidden sm:block w-px h-14 bg-[#242731]" aria-hidden="true" />

                  {/* Right Description */}
                  <p className="font-sans text-[13px] leading-[1.6] text-[#A1A5B2]">
                    All application code, infrastructure configs, and architecture docs ship cleanly into your repositories.
                  </p>
                </div>
              </div>

              {/* Pillar 04 */}
              <div className="bg-[#14161B] border border-[#242731] rounded-[2px] p-6 sm:p-7 shadow-xs">
                <h3 className="font-sans text-[15px] font-bold text-[#FFFFFF] mb-5">
                  [04] Maintainable Foundations First
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-[148px_1px_1fr] gap-5 items-center">
                  {/* Left SVG Schematic: Layered Architecture Stack -> Database */}
                  <div className="flex items-center justify-center sm:justify-start">
                    <svg
                      viewBox="0 0 148 34"
                      fill="none"
                      className="w-[140px] h-[32px] text-[#E2E2E8]"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      {/* Layered Architecture Stack */}
                      <path d="M22 6L4 12l18 6 18-6-18-6z" strokeLinejoin="round" />
                      <path d="M4 17l18 6 18-6" strokeLinejoin="round" />
                      <path d="M4 22l18 6 18-6" strokeLinejoin="round" />
                      {/* Arrow */}
                      <path d="M58 17h24M76 12l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                      {/* Database Cylinder */}
                      <ellipse cx="116" cy="9" rx="14" ry="5" />
                      <path d="M102 9v16c0 2.8 6.3 5 14 5s14-2.2 14-5V9" />
                      <path d="M102 17c0 2.8 6.3 5 14 5s14-2.2 14-5" />
                    </svg>
                  </div>

                  {/* Vertical Divider */}
                  <span className="hidden sm:block w-px h-14 bg-[#242731]" aria-hidden="true" />

                  {/* Right Description */}
                  <p className="font-sans text-[13px] leading-[1.6] text-[#A1A5B2]">
                    Proven databases, typed APIs, and clean observability designed so your internal team can extend them effortlessly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PART 4: ENGINEERING STANDARDS INDEX (03 // ENGINEERING STANDARDS)
           ========================================================================= */}
        <section className="bg-[#F9F9FB] pt-16 pb-12 border-b border-[#E2E2E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B] block mb-2">
              03 // ENGINEERING STANDARDS
            </span>
            <h2 className="font-sans font-extrabold text-[26px] sm:text-[30px] tracking-[-0.025em] text-[#0A0A0C] mb-6">
              How We Make Technical Decisions.
            </h2>

            {/* Borderless Horizontal Divider List */}
            <div className="border-t border-[#E2E2E8] divide-y divide-[#E2E2E8]">
              {/* Row 1 */}
              <div className="py-5 grid grid-cols-1 md:grid-cols-[76px_310px_1fr] gap-2 md:gap-4 items-baseline">
                <span className="font-mono text-[12px] font-bold text-[#C83E1B]">
                  01 //
                </span>
                <span className="font-sans text-[14.5px] font-bold text-[#0A0A0C]">
                  Observable &amp; Deterministic by Default
                </span>
                <p className="font-sans text-[13.5px] text-[#3F414A] leading-relaxed">
                  Structured telemetry, explicit failure modes, and deterministic fallbacks across every critical path.
                </p>
              </div>

              {/* Row 2 */}
              <div className="py-5 grid grid-cols-1 md:grid-cols-[76px_310px_1fr] gap-2 md:gap-4 items-baseline">
                <span className="font-mono text-[12px] font-bold text-[#C83E1B]">
                  02 //
                </span>
                <span className="font-sans text-[14.5px] font-bold text-[#0A0A0C]">
                  Security &amp; Data Boundaries First
                </span>
                <p className="font-sans text-[13.5px] text-[#3F414A] leading-relaxed">
                  Strict tenant isolation, least-privilege access, and auditable data routing baked into the initial schema.
                </p>
              </div>

              {/* Row 3 */}
              <div className="py-5 grid grid-cols-1 md:grid-cols-[76px_310px_1fr] gap-2 md:gap-4 items-baseline">
                <span className="font-mono text-[12px] font-bold text-[#C83E1B]">
                  03 //
                </span>
                <span className="font-sans text-[14.5px] font-bold text-[#0A0A0C]">
                  Simplicity Over Hype
                </span>
                <p className="font-sans text-[13.5px] text-[#3F414A] leading-relaxed">
                  When deterministic logic or SQL solves a problem faster and more reliably than an LLM, we choose the simpler tool.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PART 5: SPLIT FINAL CTA (bg-[#F9F9FB] pt-12 pb-20)
           ========================================================================= */}
        <section className="bg-[#F9F9FB] pt-12 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Panel: Direct Collaboration Card */}
              <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E2E2E8] rounded-[2px] p-8 sm:p-10 flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B] flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B]" />
                    <span>DIRECT COLLABORATION</span>
                  </div>
                  <h2 className="font-sans font-extrabold text-[26px] sm:text-[30px] tracking-[-0.025em] text-[#0A0A0C] mb-3">
                    Build With Principal Engineers.
                  </h2>
                  <p className="font-sans text-[14px] leading-[1.6] text-[#3F414A] max-w-md">
                    Bring us a complex product scope, an AI workflow bottleneck, or an architecture that needs senior rigor.
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

              {/* Right Panel: Where We Add the Most Leverage */}
              <div className="lg:col-span-5 bg-[#0C0D10] border-t-2 border-t-[#C83E1B] rounded-[2px] p-8 sm:p-10 text-[#FFFFFF] shadow-2xs flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B] block mb-2">
                    // ENGAGEMENT FIT
                  </span>
                  <h2 className="font-sans font-extrabold text-[24px] sm:text-[26px] tracking-[-0.025em] text-[#FFFFFF] mb-6">
                    Where We Add the Most Leverage
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 font-sans text-[14px] font-medium text-[#FFFFFF]">
                      <span className="w-2 h-2 bg-[#C83E1B] shrink-0 mt-1.5" aria-hidden="true" />
                      <span>0-to-1 B2B SaaS &amp; Internal Platforms</span>
                    </div>
                    <div className="flex items-start gap-3 font-sans text-[14px] font-medium text-[#FFFFFF]">
                      <span className="w-2 h-2 bg-[#C83E1B] shrink-0 mt-1.5" aria-hidden="true" />
                      <span>Governed AI Agents &amp; Document Workflows</span>
                    </div>
                    <div className="flex items-start gap-3 font-sans text-[14px] font-medium text-[#FFFFFF]">
                      <span className="w-2 h-2 bg-[#C83E1B] shrink-0 mt-1.5" aria-hidden="true" />
                      <span>Legacy System Modernization &amp; Audits</span>
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
