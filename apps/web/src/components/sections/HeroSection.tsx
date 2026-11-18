'use client';

import React from 'react';
import Link from 'next/link';
import { trackClientEvent } from '../TelemetryTracker';

export function HeroSection(): React.ReactElement {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative bg-[#F9F9FB] border-b border-[#E2E2E8] pt-6 pb-8 md:pt-8 md:pb-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Headline, Copy & CTAs */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFFFFF] border border-[#E2E2E8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B] shrink-0" aria-hidden="true" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B]">
                PRODUCT &amp; AI ENGINEERING STUDIO
              </span>
            </div>

            {/* Main Headline with Orange 'What If' */}
            <h1
              id="hero-title"
              className="font-sans font-extrabold text-[#0A0A0C] text-[44px] sm:text-[54px] lg:text-[62px] leading-[1.04] tracking-[-0.035em]"
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

                  {/* S-Curve Arrow 02 -> 03 */}
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

        {/* SECTION 01 BOTTOM STRIP: OUR ENGINEERING PRINCIPLES // HOW WE WORK */}
        <div className="mt-7 md:mt-8 pt-4">
          {/* Header Bar */}
          <div className="flex items-center justify-between mb-3.5 sm:mb-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[13px] font-bold text-[#C83E1B]" aria-hidden="true">
                /
              </span>
              <span className="font-mono text-[11px] sm:text-[11.5px] font-bold uppercase tracking-[0.08em] text-[#0A0A0C]">
                OUR ENGINEERING PRINCIPLES
              </span>
            </div>
            <div className="hidden sm:block flex-1 h-px bg-[#E2E2E8] mx-6" aria-hidden="true" />
            <span className="font-mono text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.08em] text-[#5A5D6A]">
              // HOW WE WORK
            </span>
          </div>

          {/* 4 Architectural Principle Cards (Compact Space-Optimized Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {/* CARD 01: END-TO-END */}
            <div className="group relative bg-[#FFFFFF] hover:bg-[#0C0D10] border border-[#E2E2E8] hover:border-[#2D3039] rounded-[8px] p-3.5 sm:p-4 flex flex-col justify-between shadow-[0_2px_6px_rgba(10,10,12,0.02)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out hover:-translate-y-0.5 overflow-hidden">
              {/* Top-Right Orange Chamfer Notch (Reveals on Hover) */}
              <div
                className="absolute top-0 right-0 w-4 h-4 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              >
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[14px] border-t-[#C83E1B] border-l-[14px] border-l-transparent" />
              </div>

              <div>
                <span className="font-mono text-[12px] font-bold text-[#C83E1B] transition-colors duration-300">
                  01
                </span>
                <h3 className="font-sans text-[14.5px] sm:text-[15px] font-extrabold tracking-[-0.02em] text-[#0A0A0C] group-hover:text-[#FFFFFF] uppercase mt-0.5 mb-0.5 transition-colors duration-300">
                  END-TO-END
                </h3>
                <p className="font-sans text-[11.5px] leading-[1.35] text-[#5A5D6A] group-hover:text-[#9FA3B0] transition-colors duration-300">
                  From discovery to deployment
                </p>
              </div>

              {/* Isometric Layered Stack SVG Illustration (Compact) */}
              <div className="relative w-full h-[76px] sm:h-[82px] my-1.5 flex items-center justify-center">
                <svg
                  viewBox="0 0 200 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full block select-none"
                  aria-hidden="true"
                >
                  {/* Crop marks */}
                  <path
                    d="M 32 28 L 32 20 L 40 20"
                    className="stroke-[#CBD0DC] group-hover:stroke-[#3A3E4E] transition-colors duration-300"
                    strokeWidth="1"
                    fill="none"
                  />
                  <path
                    d="M 160 20 L 168 20 L 168 28"
                    className="stroke-[#CBD0DC] group-hover:stroke-[#3A3E4E] transition-colors duration-300"
                    strokeWidth="1"
                    fill="none"
                  />
                  <path
                    d="M 32 92 L 32 100 L 40 100"
                    className="stroke-[#CBD0DC] group-hover:stroke-[#3A3E4E] transition-colors duration-300"
                    strokeWidth="1"
                    fill="none"
                  />
                  <path
                    d="M 160 100 L 168 100 L 168 92"
                    className="stroke-[#CBD0DC] group-hover:stroke-[#3A3E4E] transition-colors duration-300"
                    strokeWidth="1"
                    fill="none"
                  />

                  {/* Top Layer */}
                  <polygon
                    points="100,24 146,41 100,58 54,41"
                    className="stroke-[#4A4D57] group-hover:stroke-[#8E92A0] fill-[#FFFFFF] group-hover:fill-[#1A1C24] transition-all duration-300"
                    strokeWidth="1.25"
                  />
                  {/* Middle Layer (Signal Orange Accent) */}
                  <polygon
                    points="100,43 146,60 100,77 54,60"
                    stroke="#C83E1B"
                    strokeWidth="1.4"
                    fill="#C83E1B"
                    className="fill-opacity-30 group-hover:fill-opacity-50 transition-all duration-300"
                  />
                  {/* Bottom Layer */}
                  <polygon
                    points="100,62 146,79 100,96 54,79"
                    className="stroke-[#4A4D57] group-hover:stroke-[#8E92A0] fill-[#FFFFFF] group-hover:fill-[#1A1C24] transition-all duration-300"
                    strokeWidth="1.25"
                  />
                </svg>
              </div>

              {/* Bottom Tag */}
              <div className="pt-2 sm:pt-2.5 border-t border-[#F0F1F5] group-hover:border-[#232631] flex items-center gap-1.5 font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.06em] text-[#5A5D6A] group-hover:text-[#9FA3B0] transition-colors duration-300">
                <span className="text-[#C83E1B] font-bold">/</span>
                <span>DISCOVER &rarr; BUILD &rarr; DEPLOY</span>
              </div>
            </div>

            {/* CARD 02: CLIENT-OWNED */}
            <div className="group relative bg-[#FFFFFF] hover:bg-[#0C0D10] border border-[#E2E2E8] hover:border-[#2D3039] rounded-[8px] p-3.5 sm:p-4 flex flex-col justify-between shadow-[0_2px_6px_rgba(10,10,12,0.02)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out hover:-translate-y-0.5 overflow-hidden">
              {/* Top-Right Orange Chamfer Notch */}
              <div
                className="absolute top-0 right-0 w-4 h-4 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              >
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[14px] border-t-[#C83E1B] border-l-[14px] border-l-transparent" />
              </div>

              <div>
                <span className="font-mono text-[12px] font-bold text-[#C83E1B] transition-colors duration-300">
                  02
                </span>
                <h3 className="font-sans text-[14.5px] sm:text-[15px] font-extrabold tracking-[-0.02em] text-[#0A0A0C] group-hover:text-[#FFFFFF] uppercase mt-0.5 mb-0.5 transition-colors duration-300">
                  CLIENT-OWNED
                </h3>
                <p className="font-sans text-[11.5px] leading-[1.35] text-[#5A5D6A] group-hover:text-[#9FA3B0] transition-colors duration-300">
                  Clear ownership and handover.
                </p>
              </div>

              {/* Isometric Folders SVG Illustration (Compact) */}
              <div className="relative w-full h-[76px] sm:h-[82px] my-1.5 flex items-center justify-center">
                <svg
                  viewBox="0 0 200 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full block select-none"
                  aria-hidden="true"
                >
                  {/* Crop marks */}
                  <path
                    d="M 32 28 L 32 20 L 40 20"
                    className="stroke-[#CBD0DC] group-hover:stroke-[#3A3E4E] transition-colors duration-300"
                    strokeWidth="1"
                    fill="none"
                  />
                  <path
                    d="M 160 20 L 168 20 L 168 28"
                    className="stroke-[#CBD0DC] group-hover:stroke-[#3A3E4E] transition-colors duration-300"
                    strokeWidth="1"
                    fill="none"
                  />
                  <path
                    d="M 32 92 L 32 100 L 40 100"
                    className="stroke-[#CBD0DC] group-hover:stroke-[#3A3E4E] transition-colors duration-300"
                    strokeWidth="1"
                    fill="none"
                  />
                  <path
                    d="M 160 100 L 168 100 L 168 92"
                    className="stroke-[#CBD0DC] group-hover:stroke-[#3A3E4E] transition-colors duration-300"
                    strokeWidth="1"
                    fill="none"
                  />

                  {/* Back Folder */}
                  <path
                    d="M 66 38 L 84 38 L 92 46 L 132 46 L 132 86 L 66 86 Z"
                    className="stroke-[#CBD0DC] group-hover:stroke-[#3A3E4E] transition-colors duration-300"
                    strokeWidth="1.2"
                    fill="none"
                  />
                  {/* Middle Folder */}
                  <path
                    d="M 76 43 L 94 43 L 102 51 L 142 51 L 142 91 L 76 91 Z"
                    className="stroke-[#8E92A0] group-hover:stroke-[#666B7C] transition-colors duration-300"
                    strokeWidth="1.2"
                    fill="none"
                  />
                  {/* Front Folder (Code Symbol) */}
                  <path
                    d="M 86 48 L 104 48 L 112 56 L 152 56 L 152 96 L 86 96 Z"
                    stroke="#C83E1B"
                    strokeWidth="1.4"
                    className="fill-[#FFF8F6] group-hover:fill-[#1F1716] transition-colors duration-300"
                  />
                  {/* Code Symbol </ > */}
                  <path
                    d="M 112 70 L 106 76 L 112 82"
                    className="stroke-[#0A0A0C] group-hover:stroke-[#FFFFFF] transition-colors duration-300"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="121"
                    y1="67"
                    x2="117"
                    y2="85"
                    className="stroke-[#0A0A0C] group-hover:stroke-[#FFFFFF] transition-colors duration-300"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 126 70 L 132 76 L 126 82"
                    className="stroke-[#0A0A0C] group-hover:stroke-[#FFFFFF] transition-colors duration-300"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Bottom Tag */}
              <div className="pt-2 sm:pt-2.5 border-t border-[#F0F1F5] group-hover:border-[#232631] flex items-center gap-1.5 font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.06em] text-[#5A5D6A] group-hover:text-[#9FA3B0] transition-colors duration-300">
                <span className="text-[#C83E1B] font-bold">/</span>
                <span>YOUR CODE &bull; YOUR DATA &bull; YOUR IP</span>
              </div>
            </div>

            {/* CARD 03: HUMAN-LED */}
            <div className="group relative bg-[#FFFFFF] hover:bg-[#0C0D10] border border-[#E2E2E8] hover:border-[#2D3039] rounded-[8px] p-3.5 sm:p-4 flex flex-col justify-between shadow-[0_2px_6px_rgba(10,10,12,0.02)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out hover:-translate-y-0.5 overflow-hidden">
              {/* Top-Right Orange Chamfer Notch */}
              <div
                className="absolute top-0 right-0 w-4 h-4 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              >
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[14px] border-t-[#C83E1B] border-l-[14px] border-l-transparent" />
              </div>

              <div>
                <span className="font-mono text-[12px] font-bold text-[#C83E1B] group-hover:text-[#E0532C] transition-colors duration-300">
                  03
                </span>
                <h3 className="font-sans text-[14.5px] sm:text-[15px] font-extrabold tracking-[-0.02em] text-[#0A0A0C] group-hover:text-[#FFFFFF] uppercase mt-0.5 mb-0.5 transition-colors duration-300">
                  HUMAN-LED
                </h3>
                <p className="font-sans text-[11.5px] leading-[1.35] text-[#5A5D6A] group-hover:text-[#9FA3B0] transition-colors duration-300">
                  Automation with appropriate oversight.
                </p>
              </div>

              {/* Target / Avatar Radar SVG Illustration (Compact) */}
              <div className="relative w-full h-[76px] sm:h-[82px] my-1.5 flex items-center justify-center">
                <svg
                  viewBox="0 0 200 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full block select-none"
                  aria-hidden="true"
                >
                  {/* Crop marks */}
                  <path
                    d="M 32 28 L 32 20 L 40 20"
                    className="stroke-[#CBD0DC] group-hover:stroke-[#3A3E4E] transition-colors duration-300"
                    strokeWidth="1"
                    fill="none"
                  />
                  <path
                    d="M 160 20 L 168 20 L 168 28"
                    className="stroke-[#CBD0DC] group-hover:stroke-[#3A3E4E] transition-colors duration-300"
                    strokeWidth="1"
                    fill="none"
                  />
                  <path
                    d="M 32 92 L 32 100 L 40 100"
                    className="stroke-[#CBD0DC] group-hover:stroke-[#3A3E4E] transition-colors duration-300"
                    strokeWidth="1"
                    fill="none"
                  />
                  <path
                    d="M 160 100 L 168 100 L 168 92"
                    className="stroke-[#CBD0DC] group-hover:stroke-[#3A3E4E] transition-colors duration-300"
                    strokeWidth="1"
                    fill="none"
                  />

                  {/* Outer Radar Target Circle */}
                  <circle
                    cx="100"
                    cy="60"
                    r="34"
                    stroke="#C83E1B"
                    strokeWidth="1.25"
                    strokeOpacity="0.85"
                  />

                  {/* Radar Crosshair ticks */}
                  <line
                    x1="100"
                    y1="20"
                    x2="100"
                    y2="24"
                    className="stroke-[#9FA3B0] group-hover:stroke-[#5A5D6A] transition-colors duration-300"
                    strokeWidth="1.2"
                  />
                  <line
                    x1="100"
                    y1="96"
                    x2="100"
                    y2="100"
                    className="stroke-[#9FA3B0] group-hover:stroke-[#5A5D6A] transition-colors duration-300"
                    strokeWidth="1.2"
                  />
                  <line
                    x1="60"
                    y1="60"
                    x2="64"
                    y2="60"
                    className="stroke-[#9FA3B0] group-hover:stroke-[#5A5D6A] transition-colors duration-300"
                    strokeWidth="1.2"
                  />
                  <line
                    x1="136"
                    y1="60"
                    x2="140"
                    y2="60"
                    className="stroke-[#9FA3B0] group-hover:stroke-[#5A5D6A] transition-colors duration-300"
                    strokeWidth="1.2"
                  />

                  {/* Human Avatar Profile */}
                  <circle
                    cx="100"
                    cy="52"
                    r="8"
                    className="stroke-[#0A0A0C] group-hover:stroke-[#FFFFFF] transition-colors duration-300"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M 87 74 C 87 66 93 63 100 63 C 107 63 113 66 113 74"
                    className="stroke-[#0A0A0C] group-hover:stroke-[#FFFFFF] transition-colors duration-300"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* 4-pointed Sparkle Star (Signal Orange) */}
                  <path
                    d="M 134 38 Q 134 43 139 43 Q 134 43 134 48 Q 134 43 129 43 Q 134 43 134 38 Z"
                    fill="#E0532C"
                  />
                </svg>
              </div>

              {/* Bottom Tag */}
              <div className="pt-2 sm:pt-2.5 border-t border-[#F0F1F5] group-hover:border-[#232631] flex items-center gap-1.5 font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.06em] text-[#5A5D6A] group-hover:text-[#9FA3B0] transition-colors duration-300">
                <span className="text-[#C83E1B] font-bold">/</span>
                <span>AUTOMATE &bull; AUGMENT &bull; OVERSIGHT</span>
              </div>
            </div>

            {/* CARD 04: BUILT TO EVOLVE */}
            <div className="group relative bg-[#FFFFFF] hover:bg-[#0C0D10] border border-[#E2E2E8] hover:border-[#2D3039] rounded-[8px] p-3.5 sm:p-4 flex flex-col justify-between shadow-[0_2px_6px_rgba(10,10,12,0.02)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out hover:-translate-y-0.5 overflow-hidden">
              {/* Top-Right Orange Chamfer Notch */}
              <div
                className="absolute top-0 right-0 w-4 h-4 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              >
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[14px] border-t-[#C83E1B] border-l-[14px] border-l-transparent" />
              </div>

              <div>
                <span className="font-mono text-[12px] font-bold text-[#C83E1B] transition-colors duration-300">
                  04
                </span>
                <h3 className="font-sans text-[14.5px] sm:text-[15px] font-extrabold tracking-[-0.02em] text-[#0A0A0C] group-hover:text-[#FFFFFF] uppercase mt-0.5 mb-0.5 transition-colors duration-300">
                  BUILT TO EVOLVE
                </h3>
                <p className="font-sans text-[11.5px] leading-[1.35] text-[#5A5D6A] group-hover:text-[#9FA3B0] transition-colors duration-300">
                  Designed for iteration and growth.
                </p>
              </div>

              {/* Translucent Angled Panes & Growth Curve SVG (Compact) */}
              <div className="relative w-full h-[76px] sm:h-[82px] my-1.5 flex items-center justify-center">
                <svg
                  viewBox="0 0 200 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full block select-none"
                  aria-hidden="true"
                >
                  {/* Crop marks */}
                  <path
                    d="M 32 28 L 32 20 L 40 20"
                    className="stroke-[#CBD0DC] group-hover:stroke-[#3A3E4E] transition-colors duration-300"
                    strokeWidth="1"
                    fill="none"
                  />
                  <path
                    d="M 160 20 L 168 20 L 168 28"
                    className="stroke-[#CBD0DC] group-hover:stroke-[#3A3E4E] transition-colors duration-300"
                    strokeWidth="1"
                    fill="none"
                  />
                  <path
                    d="M 32 92 L 32 100 L 40 100"
                    className="stroke-[#CBD0DC] group-hover:stroke-[#3A3E4E] transition-colors duration-300"
                    strokeWidth="1"
                    fill="none"
                  />
                  <path
                    d="M 160 100 L 168 100 L 168 92"
                    className="stroke-[#CBD0DC] group-hover:stroke-[#3A3E4E] transition-colors duration-300"
                    strokeWidth="1"
                    fill="none"
                  />

                  {/* Back Pane */}
                  <polygon
                    points="68,40 98,28 98,84 68,96"
                    className="stroke-[#A0A5B5] group-hover:stroke-[#4A4D57] transition-colors duration-300"
                    strokeWidth="1.2"
                    fill="none"
                  />

                  {/* Front Translucent Pane (Signal Orange Tint) */}
                  <polygon
                    points="92,42 122,30 122,86 92,98"
                    stroke="#C83E1B"
                    strokeWidth="1.4"
                    fill="#C83E1B"
                    className="fill-opacity-25 group-hover:fill-opacity-40 transition-all duration-300"
                  />

                  {/* Dynamic Growth Upward Arrow */}
                  <path
                    d="M 76 96 C 88 94 116 88 136 46"
                    stroke="#C83E1B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M 126 48 L 137 45 L 135 56"
                    stroke="#C83E1B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>

              {/* Bottom Tag */}
              <div className="pt-2 sm:pt-2.5 border-t border-[#F0F1F5] group-hover:border-[#232631] flex items-center gap-1.5 font-mono text-[9.5px] sm:text-[10px] uppercase tracking-[0.06em] text-[#5A5D6A] group-hover:text-[#9FA3B0] transition-colors duration-300">
                <span className="text-[#C83E1B] font-bold">/</span>
                <span>ITERATE &bull; SCALE &bull; ADAPT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
