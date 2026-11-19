import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContactFormClient } from '@/components/forms/ContactFormClient';
import { CopyEmailButton } from '@/components/forms/CopyEmailButton';

export const metadata: Metadata = {
  title: 'Contact & Engineering Inquiries | WTFearB',
  description:
    'Start a direct technical conversation with principal product and AI engineers. Share your architecture, workflow constraints, or product scope with zero sales intermediaries.',
  alternates: {
    canonical: '/contact',
  },
};

interface ContactPageProps {
  searchParams: Promise<{
    engagement?: string;
    complexity?: string;
    validation?: string;
    intent?: string;
    track?: string;
  }>;
}

export default async function ContactPage({
  searchParams,
}: ContactPageProps): Promise<React.ReactElement> {
  const params = await searchParams;

  return (
    <div className="min-h-screen bg-[#F9F9FB] text-[#0A0A0C] selection:bg-[#C83E1B] selection:text-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* =========================================================================
            PART 1: ASYMMETRIC SPLIT HERO
           ========================================================================= */}
        <section className="bg-[#F9F9FB] border-b border-[#E2E2E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column (7 cols): Editorial Title & Subtitle */}
              <div className="lg:col-span-7">
                {/* Breadcrumb */}
                <div className="font-mono text-[12px] mb-4 flex items-center">
                  <Link href="/" className="text-[#5A5D6A] hover:text-[#0A0A0C] transition-colors">
                    Home
                  </Link>
                  <span className="text-[#9FA3B0] mx-1.5">/</span>
                  <span className="text-[#C83E1B] font-semibold">Contact</span>
                </div>

                {/* Eyebrow */}
                <div className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#C83E1B] flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B] inline-block" aria-hidden="true" />
                  <span>DIRECT ENGINEERING INQUIRIES</span>
                </div>

                {/* Headline */}
                <h1 className="font-sans font-extrabold text-[#0A0A0C] text-[36px] sm:text-[44px] lg:text-[48px] leading-[1.08] tracking-[-0.03em] mb-4">
                  Start a Technical Conversation.
                </h1>

                {/* Subheadline */}
                <p className="font-sans text-[15.5px] sm:text-[16.5px] leading-[1.6] text-[#3F414A] max-w-xl">
                  Engage directly with principal product and AI engineers. Share your system architecture, workflow bottleneck, or product scope—no sales intermediaries.
                </p>
              </div>

              {/* Right Column (5 cols): Intake Routing Protocol Schematic */}
              <div className="lg:col-span-5">
                <div className="relative p-5 sm:p-6 bg-[#FAFBFD] border border-[#E2E2E8] bg-[linear-gradient(to_right,#E2E2E8_1px,transparent_1px),linear-gradient(to_bottom,#E2E2E8_1px,transparent_1px)] bg-[size:20px_20px]">
                  {/* Four Crisp Corner Viewfinder Brackets */}
                  <span
                    className="absolute -top-[1px] -left-[1px] w-[14px] h-[14px] border-t-[1.5px] border-l-[1.5px] border-[#5A5D6A]"
                    aria-hidden="true"
                  />
                  <span
                    className="absolute -top-[1px] -right-[1px] w-[14px] h-[14px] border-t-[1.5px] border-r-[1.5px] border-[#5A5D6A]"
                    aria-hidden="true"
                  />
                  <span
                    className="absolute -bottom-[1px] -left-[1px] w-[14px] h-[14px] border-b-[1.5px] border-l-[1.5px] border-[#5A5D6A]"
                    aria-hidden="true"
                  />
                  <span
                    className="absolute -bottom-[1px] -right-[1px] w-[14px] h-[14px] border-b-[1.5px] border-r-[1.5px] border-[#5A5D6A]"
                    aria-hidden="true"
                  />

                  {/* Header */}
                  <div className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#3F414A] mb-4">
                    // INTAKE ROUTING PROTOCOL
                  </div>

                  {/* Three Horizontal Step Nodes */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                    {/* Node 1 */}
                    <div className="flex-1 bg-[#FFFFFF] border border-[#E2E2E8] rounded-[2px] p-3 shadow-2xs">
                      <div className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#C83E1B]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B]" />
                        <span>01</span>
                      </div>
                      <div className="font-mono text-[11px] font-bold uppercase leading-tight text-[#0A0A0C] mt-1">
                        TECHNICAL
                        <br />
                        BRIEF
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

                    {/* Node 2 */}
                    <div className="flex-1 bg-[#FFFFFF] border border-[#E2E2E8] rounded-[2px] p-3 shadow-2xs">
                      <div className="font-mono text-[11px] font-bold text-[#5A5D6A]">
                        02
                      </div>
                      <div className="font-mono text-[11px] font-bold uppercase leading-tight text-[#0A0A0C] mt-1">
                        ARCHITECTURE
                        <br />
                        REVIEW
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

                    {/* Node 3 */}
                    <div className="flex-1 bg-[#FFFFFF] border border-[#E2E2E8] rounded-[2px] p-3 shadow-2xs">
                      <div className="font-mono text-[11px] font-bold text-[#5A5D6A]">
                        03
                      </div>
                      <div className="font-mono text-[11px] font-bold uppercase leading-tight text-[#0A0A0C] mt-1">
                        SCOPED
                        <br />
                        PROPOSAL
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PART 2: TWO-COLUMN INTAKE WORKSPACE
           ========================================================================= */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column (7 cols): Client Form Card (Synchronous SSR) */}
              <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E2E2E8] rounded-[4px] p-6 sm:p-9 shadow-xs">
                <ContactFormClient
                  initialEngagement={params.engagement}
                  initialComplexity={params.complexity}
                  initialValidation={params.validation}
                  initialIntent={params.intent}
                  initialTrack={params.track}
                />
              </div>

              {/* Right Column (5 cols): Discovery Protocol + Direct Channels */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {/* 1. Top Panel: Obsidian Discovery Protocol */}
                <div className="bg-[#0C0D10] border-t-2 border-t-[#C83E1B] rounded-[2px] p-6 sm:p-8 text-[#FFFFFF]">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B] block mb-1.5">
                    02 // DISCOVERY PROTOCOL
                  </span>
                  <h2 className="font-sans text-[24px] sm:text-[26px] font-extrabold tracking-[-0.02em] text-[#FFFFFF] mb-4">
                    What Happens Next
                  </h2>

                  <div className="divide-y divide-[#242731] border-t border-[#242731]">
                    {/* Step 01 */}
                    <div className="py-5 grid grid-cols-1 sm:grid-cols-[155px_1fr] gap-3 sm:gap-4 items-start">
                      <div className="font-mono text-[11px] text-[#898E99]">
                        01 /{' '}
                        <span className="font-sans text-[13.5px] font-semibold text-[#FFFFFF] block sm:inline ml-1 sm:ml-0">
                          Architecture Evaluation
                        </span>
                      </div>
                      <p className="font-sans text-[12.5px] leading-[1.55] text-[#A1A5B2]">
                        Principal engineers review your problem statement, data boundaries, and technical feasibility.
                      </p>
                    </div>

                    {/* Step 02 */}
                    <div className="py-5 grid grid-cols-1 sm:grid-cols-[155px_1fr] gap-3 sm:gap-4 items-start">
                      <div className="font-mono text-[11px] text-[#898E99]">
                        02 /{' '}
                        <span className="font-sans text-[13.5px] font-semibold text-[#FFFFFF] block sm:inline ml-1 sm:ml-0">
                          Technical Scoping Session
                        </span>
                      </div>
                      <p className="font-sans text-[12.5px] leading-[1.55] text-[#A1A5B2]">
                        Focused working session to align on system topology, integration points, and build vs. blueprint fit.
                      </p>
                    </div>

                    {/* Step 03 */}
                    <div className="py-5 grid grid-cols-1 sm:grid-cols-[155px_1fr] gap-3 sm:gap-4 items-start">
                      <div className="font-mono text-[11px] text-[#898E99]">
                        03 /{' '}
                        <span className="font-sans text-[13.5px] font-semibold text-[#FFFFFF] block sm:inline ml-1 sm:ml-0">
                          Written Monograph &amp; Roadmap
                        </span>
                      </div>
                      <p className="font-sans text-[12.5px] leading-[1.55] text-[#A1A5B2]">
                        Receive a structured architecture breakdown, milestone plan, and transparent engagement scope.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Bottom Panel: Direct Channels */}
                <div className="bg-[#FFFFFF] border border-[#E2E2E8] rounded-[4px] p-6 sm:p-8 shadow-xs">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#5A5D6A] block mb-3">
                    03 // DIRECT CHANNELS
                  </span>

                  <div className="divide-y divide-[#E2E2E8] border-t border-[#E2E2E8]">
                    {/* Row 1: Direct Email */}
                    <div className="py-4 grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-2 sm:gap-3 items-center">
                      <span className="font-mono text-[11px] font-semibold text-[#5A5D6A]">
                        DIRECT ELECTRONIC MAIL
                      </span>
                      <div className="flex items-center gap-3">
                        <a
                          href="mailto:wtfearb@gmail.com"
                          className="font-sans text-[14px] font-bold text-[#0A0A0C] border-b border-[#C83E1B] pb-0.5 hover:text-[#C83E1B] transition-colors"
                        >
                          wtfearb@gmail.com
                        </a>
                        <CopyEmailButton email="wtfearb@gmail.com" />
                      </div>
                    </div>

                    {/* Row 2: Studio Network */}
                    <div className="py-4 grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-2 sm:gap-3 items-center">
                      <span className="font-mono text-[11px] font-semibold text-[#5A5D6A]">
                        STUDIO NETWORK
                      </span>
                      <div>
                        <a
                          href="https://www.linkedin.com/company/wtfearb/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-sans text-[14px] font-bold text-[#0A0A0C] border-b border-[#C83E1B] pb-0.5 inline-flex items-center gap-1 hover:text-[#C83E1B] transition-colors"
                        >
                          <span>WTFearB on LinkedIn</span>
                          <span className="text-[#C83E1B]">↗</span>
                        </a>
                      </div>
                    </div>

                    {/* Row 3: Engagement Models */}
                    <div className="py-4 grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-2 sm:gap-3 items-center">
                      <span className="font-mono text-[11px] font-semibold text-[#5A5D6A]">
                        ENGAGEMENT MODELS
                      </span>
                      <div>
                        <span className="font-sans text-[12.5px] leading-[1.5] text-[#3F414A]">
                          Fixed-Scope Builds &bull; Embedded Architecture Pods &bull; Blueprint Audits
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
