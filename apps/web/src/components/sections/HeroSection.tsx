'use client';

import React from 'react';
import Link from 'next/link';
import { trackClientEvent } from '../TelemetryTracker';

interface FeatureHighlight {
  readonly number: string;
  readonly title: string;
  readonly description: string;
}

const FEATURE_HIGHLIGHTS: readonly FeatureHighlight[] = [
  {
    number: '01',
    title: 'END-TO-END',
    description: 'From discovery to deployment',
  },
  {
    number: '02',
    title: 'CLIENT-OWNED',
    description: 'Clear ownership and handover',
  },
  {
    number: '03',
    title: 'HUMAN-LED',
    description: 'Automation with appropriate oversight',
  },
  {
    number: '04',
    title: 'BUILT TO EVOLVE',
    description: 'Designed for iteration and growth',
  },
];

export function HeroSection(): React.ReactElement {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative bg-[#F9F9FB] border-b border-[#E2E2E8] pt-6 pb-10 md:pt-8 md:pb-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Definition Lead for AEO and technical indexing (Hidden visually, preserved in DOM for AI answer engines) */}
        <div className="sr-only">
          <dl className="font-mono text-xs text-[var(--color-ink-secondary)] leading-relaxed">
            <dt className="inline font-bold text-[var(--color-ink-primary)]">
              <dfn>WTFearB (Product &amp; AI Engineering Studio)</dfn>:
            </dt>{' '}
            <dd className="inline">
              An embedded senior engineering pod that turns speculative &ldquo;What If&rdquo; into deterministic production reality. We architect and ship governed AI agents, Next.js 15 web applications, and distributed event systems in rapid 2-week sprints with 100% client GitHub IP ownership.
            </dd>
          </dl>
        </div>

        {/* Two-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Headline, Copy & CTAs */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#FFFFFF] border border-[#E2E2E8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B] shrink-0" aria-hidden="true" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B]">
                PRODUCT &amp; AI ENGINEERING STUDIO
              </span>
            </div>

            {/* Main Headline with Orange 'What If' */}
            <h1
              id="hero-title"
              className="font-sans font-extrabold text-[#0A0A0C] text-[40px] sm:text-[52px] lg:text-[58px] leading-[1.04] tracking-[-0.035em]"
            >
              Make <span className="text-[#C83E1B]">&lsquo;What If&rsquo;</span>
              <br />
              Work.
            </h1>

            {/* Supporting Paragraph */}
            <p className="font-sans text-[16px] sm:text-[17px] leading-[1.55] text-[#3F414A] max-w-[500px]">
              We turn business problems and ambitious ideas into practical software — through thoughtful engineering, useful automation, and systems designed to grow.
            </p>

            {/* CTA Button Group */}
            <div className="pt-1 flex flex-wrap items-center gap-3.5">
              <Link
                href="/contact"
                onClick={() =>
                  trackClientEvent('cta_click', 'Hero Discuss a Project', { href: '/contact' })
                }
                className="bg-[#0A0A0C] hover:bg-[#C83E1B] text-[#FFFFFF] font-mono text-[13px] font-semibold px-5 py-3 inline-flex items-center justify-center gap-2.5 transition-colors cursor-pointer border border-[#0A0A0C] hover:border-[#C83E1B]"
              >
                <span>Discuss a Project</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>

              <Link
                href="/blueprints"
                onClick={() =>
                  trackClientEvent('cta_click', 'Hero Explore Our Engineering', {
                    href: '/blueprints',
                  })
                }
                className="bg-[#FFFFFF] hover:bg-[#F3F4F7] text-[#0A0A0C] border border-[#D5D7E0] font-sans text-[13px] font-semibold px-5 py-3 inline-flex items-center justify-center transition-colors cursor-pointer"
              >
                Explore Our Engineering
              </Link>
            </div>
          </div>

          {/* Right Column: // DELIVERY WORKFLOW Diagram Card */}
          <div className="lg:col-span-6">
            <div className="bg-[#FFFFFF] border border-[#E2E2E8] p-4 sm:p-5 w-full shadow-xs">
              {/* Top Header Row inside Card */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[11px] sm:text-[12px] font-bold tracking-[0.05em] text-[#0A0A0C]">
                  // DELIVERY WORKFLOW
                </span>
                <span className="font-mono text-[11px] sm:text-[12px] font-bold tracking-[0.05em] text-[#C83E1B]">
                  SYSTEM ENGINEERING
                </span>
              </div>

              {/* Diagram Canvas with Technical Grid & 4 Connected Workflow Nodes */}
              <div className="relative bg-[#FAFBFD] border border-[#ECEEF3] p-3 sm:p-4 overflow-hidden">
                <svg
                  viewBox="0 0 520 250"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-auto block select-none"
                  aria-label="Delivery Workflow: 01 Discover to 02 Architect, 03 Build, and 04 Deploy"
                >
                  {/* Background Grid Pattern */}
                  <defs>
                    <pattern id="workflowGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#ECEEF3" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="520" height="250" fill="url(#workflowGrid)" />

                  {/* Connectors */}
                  {/* Arrow 01 -> 02 */}
                  <path
                    d="M 215 61 L 281 61"
                    stroke="#3F414A"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                  <path
                    d="M 275 56 L 282 61 L 275 66"
                    fill="none"
                    stroke="#3F414A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* S-Curve Arrow 02 -> 03 (routed down and across into top center of 03 BUILD) */}
                  <path
                    d="M 480 61 L 496 61 Q 502 61 502 67 L 502 119 Q 502 125 496 125 L 124 125 Q 118 125 118 131 L 118 148"
                    fill="none"
                    stroke="#3F414A"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                  <path
                    d="M 113 142 L 118 149 L 123 142"
                    fill="none"
                    stroke="#3F414A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Arrow 03 -> 04 */}
                  <path
                    d="M 215 189 L 281 189"
                    stroke="#3F414A"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                  <path
                    d="M 275 184 L 282 189 L 275 194"
                    fill="none"
                    stroke="#3F414A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Node 01: 01 DISCOVER (Top-Left) */}
                  <g>
                    <rect
                      x="20"
                      y="24"
                      width="195"
                      height="74"
                      rx="2"
                      fill="#FFFFFF"
                      stroke="#D5D7E0"
                      strokeWidth="1"
                    />
                    <rect x="36" y="43" width="8" height="8" fill="#9FA3B0" />
                    <text
                      x="54"
                      y="51"
                      fontFamily="var(--font-mono), monospace"
                      fontSize="12"
                      fontWeight="700"
                      fill="#0A0A0C"
                    >
                      01 DISCOVER
                    </text>
                    <text
                      x="54"
                      y="73"
                      fontFamily="var(--font-mono), monospace"
                      fontSize="11"
                      fill="#5A5D6A"
                    >
                      Problem &amp; workflow
                    </text>
                  </g>

                  {/* Node 02: 02 ARCHITECT (Top-Right) */}
                  <g>
                    <rect
                      x="285"
                      y="24"
                      width="195"
                      height="74"
                      rx="2"
                      fill="#FFFFFF"
                      stroke="#D5D7E0"
                      strokeWidth="1"
                    />
                    <rect x="301" y="43" width="8" height="8" fill="#9FA3B0" />
                    <text
                      x="319"
                      y="51"
                      fontFamily="var(--font-mono), monospace"
                      fontSize="12"
                      fontWeight="700"
                      fill="#0A0A0C"
                    >
                      02 ARCHITECT
                    </text>
                    <text
                      x="319"
                      y="73"
                      fontFamily="var(--font-mono), monospace"
                      fontSize="11"
                      fill="#5A5D6A"
                    >
                      System design
                    </text>
                  </g>

                  {/* Node 03: 03 BUILD (Bottom-Left — Signal Orange Highlighted) */}
                  <g>
                    <rect
                      x="20"
                      y="152"
                      width="195"
                      height="74"
                      rx="2"
                      fill="#C83E1B"
                      stroke="#B03415"
                      strokeWidth="1"
                    />
                    <rect x="36" y="171" width="8" height="8" fill="#FFFFFF" />
                    <text
                      x="54"
                      y="179"
                      fontFamily="var(--font-mono), monospace"
                      fontSize="12"
                      fontWeight="700"
                      fill="#FFFFFF"
                    >
                      03 BUILD
                    </text>
                    <text
                      x="54"
                      y="201"
                      fontFamily="var(--font-mono), monospace"
                      fontSize="11"
                      fill="#FFFFFF"
                      fillOpacity="0.92"
                    >
                      Software + automation
                    </text>
                  </g>

                  {/* Node 04: 04 DEPLOY (Bottom-Right) */}
                  <g>
                    <rect
                      x="285"
                      y="152"
                      width="195"
                      height="74"
                      rx="2"
                      fill="#FFFFFF"
                      stroke="#D5D7E0"
                      strokeWidth="1"
                    />
                    <rect x="301" y="171" width="8" height="8" fill="#9FA3B0" />
                    <text
                      x="319"
                      y="179"
                      fontFamily="var(--font-mono), monospace"
                      fontSize="12"
                      fontWeight="700"
                      fill="#0A0A0C"
                    >
                      04 DEPLOY
                    </text>
                    <text
                      x="319"
                      y="201"
                      fontFamily="var(--font-mono), monospace"
                      fontSize="11"
                      fill="#5A5D6A"
                    >
                      Launch &amp; improve
                    </text>
                  </g>
                </svg>
              </div>

              {/* Bottom Caption Bar inside Right Card */}
              <div className="mt-3 pt-2.5 flex items-center gap-2.5">
                <span className="w-[3px] h-3.5 bg-[#C83E1B] shrink-0" aria-hidden="true" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-[#3F414A]">
                  FROM POSSIBILITY TO WORKING SYSTEMS
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Four Feature Highlights Below Hero */}
        <div className="border-t border-[#E2E2E8] mt-7 pt-6 md:mt-8 md:pt-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURE_HIGHLIGHTS.map((item) => (
              <div
                key={item.number}
                className="bg-[#FFFFFF] border border-[#E2E2E8] p-4 sm:p-5 flex flex-col justify-start transition-all hover:border-[#C83E1B]/40 hover:shadow-xs"
              >
                <span className="font-mono text-[13px] font-bold text-[#C83E1B] mb-1.5">
                  {item.number}
                </span>
                <h3 className="font-sans text-[15px] sm:text-[16px] font-extrabold tracking-[-0.02em] text-[#0A0A0C] uppercase mb-1">
                  {item.title}
                </h3>
                <p className="font-sans text-[13px] leading-[1.45] text-[#5A5D6A]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
