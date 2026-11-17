import React from 'react';

/**
 * WTFearB — Section 06: From Architecture to Production
 * Precision Refinement: Substantial Isometric Illustrations & Continuous Timeline Flow
 */

// STAGE 01: Discover & Diagnose — Three stacked isometric plates with magnifying glass
function Stage01Illustration(): React.ReactElement {
  return (
    <svg
      viewBox="0 0 200 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[165px] h-[125px] lg:w-[175px] lg:h-[135px] mx-auto block select-none drop-shadow-[0_8px_16px_rgba(10,10,12,0.04)]"
      aria-hidden="true"
    >
      {/* Soft orange ambient contact shadow */}
      <ellipse cx="100" cy="134" rx="66" ry="14" fill="#C83E1B" fillOpacity="0.12" />

      {/* Plate 3 (Bottom Layer with Signal Orange Highlight) */}
      {/* Extruded side facet left */}
      <polygon points="35,106 100,136 100,142 35,112" fill="#F8DDD5" stroke="#C83E1B" strokeWidth="1.2" />
      {/* Extruded side facet right */}
      <polygon points="100,136 165,106 165,112 100,142" fill="#E8C7BE" stroke="#C83E1B" strokeWidth="1.2" />
      {/* Top face */}
      <polygon points="100,76 165,106 100,136 35,106" fill="#FFF5F2" stroke="#C83E1B" strokeWidth="1.5" />

      {/* Plate 2 (Middle Layer) */}
      <polygon points="35,80 100,110 100,116 35,86" fill="#E8EBF0" stroke="#CBD0DC" strokeWidth="1.2" />
      <polygon points="100,110 165,80 165,86 100,116" fill="#DCE0E8" stroke="#CBD0DC" strokeWidth="1.2" />
      <polygon points="100,50 165,80 100,110 35,80" fill="#FFFFFF" stroke="#CBD0DC" strokeWidth="1.4" />

      {/* Plate 1 (Top Layer) */}
      <polygon points="35,54 100,84 100,90 35,60" fill="#ECEFF4" stroke="#9FA3B0" strokeWidth="1.2" />
      <polygon points="100,84 165,54 165,60 100,90" fill="#DFE3EA" stroke="#9FA3B0" strokeWidth="1.2" />
      <polygon points="100,24 165,54 100,84 35,54" fill="#FFFFFF" stroke="#9FA3B0" strokeWidth="1.5" />

      {/* Magnifying Glass Symbol on Top Face */}
      <g transform="translate(100, 54)">
        {/* Drop shadow of symbol */}
        <ellipse cx="-1" cy="0" rx="12" ry="5" fill="#C83E1B" fillOpacity="0.08" />
        {/* Glass Ring */}
        <circle cx="-2" cy="-4" r="11" fill="#FFEFEA" stroke="#C83E1B" strokeWidth="2.2" />
        <circle cx="-2" cy="-4" r="7.5" fill="#C83E1B" fillOpacity="0.14" />
        {/* Handle */}
        <line x1="6.5" y1="4.5" x2="14.5" y2="12.5" stroke="#C83E1B" strokeWidth="2.8" strokeLinecap="round" />
        {/* Glass Glare */}
        <path d="M -7 -6 A 7 7 0 0 1 -2 -11" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// STAGE 02: Architect & Scope — Layered planes with 3D Architectural Cube
function Stage02Illustration(): React.ReactElement {
  return (
    <svg
      viewBox="0 0 200 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[165px] h-[125px] lg:w-[175px] lg:h-[135px] mx-auto block select-none drop-shadow-[0_8px_16px_rgba(10,10,12,0.04)]"
      aria-hidden="true"
    >
      <ellipse cx="100" cy="134" rx="66" ry="14" fill="#C83E1B" fillOpacity="0.10" />

      {/* Bottom Plate */}
      <polygon points="35,106 100,136 100,142 35,112" fill="#F8DDD5" stroke="#C83E1B" strokeWidth="1.2" />
      <polygon points="100,136 165,106 165,112 100,142" fill="#E8C7BE" stroke="#C83E1B" strokeWidth="1.2" />
      <polygon points="100,76 165,106 100,136 35,106" fill="#FFF5F2" stroke="#C83E1B" strokeWidth="1.4" />

      {/* Middle Plate */}
      <polygon points="35,80 100,110 100,116 35,86" fill="#E8EBF0" stroke="#CBD0DC" strokeWidth="1.2" />
      <polygon points="100,110 165,80 165,86 100,116" fill="#DCE0E8" stroke="#CBD0DC" strokeWidth="1.2" />
      <polygon points="100,50 165,80 100,110 35,80" fill="#FFFFFF" stroke="#CBD0DC" strokeWidth="1.4" />

      {/* Top Plate */}
      <polygon points="35,54 100,84 100,90 35,60" fill="#ECEFF4" stroke="#9FA3B0" strokeWidth="1.2" />
      <polygon points="100,84 165,54 165,60 100,90" fill="#DFE3EA" stroke="#9FA3B0" strokeWidth="1.2" />
      <polygon points="100,24 165,54 100,84 35,54" fill="#FFFFFF" stroke="#9FA3B0" strokeWidth="1.5" />

      {/* 3D Isometric Architectural Cube */}
      <g transform="translate(100, 54)">
        {/* Cube Ambient Shadow */}
        <polygon points="0,10 18,1 0,-8 -18,1" fill="#C83E1B" fillOpacity="0.12" />
        {/* Cube Top Face */}
        <polygon points="0,-18 16,-9 0,0 -16,-9" fill="#FFEFEA" stroke="#C83E1B" strokeWidth="1.8" />
        {/* Cube Left Structural Face (Bold Signal Orange Highlight) */}
        <polygon points="-16,-9 0,0 0,16 -16,7" fill="#C83E1B" stroke="#A83215" strokeWidth="1.8" />
        {/* Cube Right Face */}
        <polygon points="0,0 16,-9 16,7 0,16" fill="#FFFFFF" stroke="#C83E1B" strokeWidth="1.8" />
        {/* Front Vertex Wireframe Edge */}
        <line x1="0" y1="0" x2="0" y2="16" stroke="#FFEFEA" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

// STAGE 03: Build & Verify — Layered planes with Code Symbol </>
function Stage03Illustration(): React.ReactElement {
  return (
    <svg
      viewBox="0 0 200 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[165px] h-[125px] lg:w-[175px] lg:h-[135px] mx-auto block select-none drop-shadow-[0_8px_16px_rgba(10,10,12,0.04)]"
      aria-hidden="true"
    >
      <ellipse cx="100" cy="134" rx="66" ry="14" fill="#C83E1B" fillOpacity="0.10" />

      {/* Bottom Plate */}
      <polygon points="35,106 100,136 100,142 35,112" fill="#F8DDD5" stroke="#C83E1B" strokeWidth="1.2" />
      <polygon points="100,136 165,106 165,112 100,142" fill="#E8C7BE" stroke="#C83E1B" strokeWidth="1.2" />
      <polygon points="100,76 165,106 100,136 35,106" fill="#FFF5F2" stroke="#C83E1B" strokeWidth="1.4" />

      {/* Middle Plate */}
      <polygon points="35,80 100,110 100,116 35,86" fill="#E8EBF0" stroke="#CBD0DC" strokeWidth="1.2" />
      <polygon points="100,110 165,80 165,86 100,116" fill="#DCE0E8" stroke="#CBD0DC" strokeWidth="1.2" />
      <polygon points="100,50 165,80 100,110 35,80" fill="#FFFFFF" stroke="#CBD0DC" strokeWidth="1.4" />

      {/* Top Plate */}
      <polygon points="35,54 100,84 100,90 35,60" fill="#ECEFF4" stroke="#9FA3B0" strokeWidth="1.2" />
      <polygon points="100,84 165,54 165,60 100,90" fill="#DFE3EA" stroke="#9FA3B0" strokeWidth="1.2" />
      <polygon points="100,24 165,54 100,84 35,54" fill="#FFFFFF" stroke="#9FA3B0" strokeWidth="1.5" />

      {/* Code Symbol </> */}
      <g transform="translate(100, 54)">
        {/* Left angle bracket < */}
        <path
          d="M -9 -5 L -16 0 L -9 5"
          fill="none"
          stroke="#C83E1B"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Forward Slash / */}
        <line
          x1="-3"
          y1="8"
          x2="3"
          y2="-8"
          stroke="#C83E1B"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        {/* Right angle bracket > */}
        <path
          d="M 9 -5 L 16 0 L 9 5"
          fill="none"
          stroke="#C83E1B"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

// STAGE 04: Deploy & Handover — Layered planes with Minimal Rocket and Completion Glow
function Stage04Illustration(): React.ReactElement {
  return (
    <svg
      viewBox="0 0 200 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[165px] h-[125px] lg:w-[175px] lg:h-[135px] mx-auto block select-none drop-shadow-[0_8px_16px_rgba(200,62,27,0.08)]"
      aria-hidden="true"
    >
      {/* Warmer orange base glow signifying completion */}
      <ellipse cx="100" cy="134" rx="70" ry="16" fill="#C83E1B" fillOpacity="0.18" />

      {/* Bottom Plate */}
      <polygon points="35,106 100,136 100,142 35,112" fill="#F8DDD5" stroke="#C83E1B" strokeWidth="1.4" />
      <polygon points="100,136 165,106 165,112 100,142" fill="#E8C7BE" stroke="#C83E1B" strokeWidth="1.4" />
      <polygon points="100,76 165,106 100,136 35,106" fill="#FFF0EB" stroke="#C83E1B" strokeWidth="1.6" />

      {/* Middle Plate */}
      <polygon points="35,80 100,110 100,116 35,86" fill="#E8EBF0" stroke="#CBD0DC" strokeWidth="1.3" />
      <polygon points="100,110 165,80 165,86 100,116" fill="#DCE0E8" stroke="#CBD0DC" strokeWidth="1.3" />
      <polygon points="100,50 165,80 100,110 35,80" fill="#FFFFFF" stroke="#CBD0DC" strokeWidth="1.4" />

      {/* Top Plate with Stronger Orange Outline & Warm Tint */}
      <polygon points="35,54 100,84 100,90 35,60" fill="#FFEAE2" stroke="#C83E1B" strokeWidth="1.8" />
      <polygon points="100,84 165,54 165,60 100,90" fill="#F8DDD5" stroke="#C83E1B" strokeWidth="1.8" />
      <polygon points="100,24 165,54 100,84 35,54" fill="#FFF5F2" stroke="#C83E1B" strokeWidth="2.2" />

      {/* Minimalist Rocket on Top Face */}
      <g transform="translate(100, 54)">
        {/* Ambient thrust glow */}
        <ellipse cx="0" cy="8" rx="8" ry="4" fill="#C83E1B" fillOpacity="0.2" />

        {/* Rocket Fuselage */}
        <path
          d="M 0 -17 C 6 -13 9 -5 9 3 L 0 0 L -9 3 C -9 -5 -6 -13 0 -17 Z"
          fill="#C83E1B"
          stroke="#A83215"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* Porthole */}
        <circle cx="0" cy="-6" r="2.4" fill="#FFFFFF" />
        {/* Left Fin */}
        <path d="M -9 1 L -14 7 L -8 5 Z" fill="#A83215" stroke="#C83E1B" strokeWidth="1.2" strokeLinejoin="round" />
        {/* Right Fin */}
        <path d="M 9 1 L 14 7 L 8 5 Z" fill="#A83215" stroke="#C83E1B" strokeWidth="1.2" strokeLinejoin="round" />
        {/* Thrust Flame */}
        <path d="M -3 3 L 0 10 L 3 3 Z" fill="#FF8A65" />
      </g>
    </svg>
  );
}

const STAGES = [
  {
    step: '01',
    title: 'DISCOVER & DIAGNOSE',
    description: 'Understand goals, workflows and technical constraints.',
    illustration: Stage01Illustration,
  },
  {
    step: '02',
    title: 'ARCHITECT & SCOPE',
    description: 'Agree on the solution, priorities and project boundaries.',
    illustration: Stage02Illustration,
  },
  {
    step: '03',
    title: 'BUILD & VERIFY',
    description: 'Develop in increments and validate against agreed requirements.',
    illustration: Stage03Illustration,
  },
  {
    step: '04',
    title: 'DEPLOY & HANDOVER',
    description: 'Prepare release, documentation and knowledge transfer.',
    illustration: Stage04Illustration,
  },
] as const;

export function ProcessSection(): React.ReactElement {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="py-14 lg:py-16 border-b border-[#E2E2E8] bg-[#F9F9FB] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            2. SECTION INTRODUCTION — CALIBRATED SPACING RHYTHM
           ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-8 lg:mb-10 border-b border-[#E2E2E8]">
          {/* Left Title & Eyebrow */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-[#C83E1B]" aria-hidden="true" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#C83E1B]">
                ENGINEERING DELIVERY PROCESS
              </span>
            </div>

            <h2
              id="process-title"
              className="font-sans font-extrabold text-[#0A0A0C] text-[34px] sm:text-[42px] lg:text-[46px] leading-[1.06] tracking-[-0.03em]"
            >
              From Architecture to <span className="text-[#C83E1B]">Production.</span>
            </h2>
            <p className="font-sans text-[13px] sm:text-[14px] leading-relaxed text-[#5A5D6A] mt-2.5 max-w-xl">
              A clear engineering process that moves from understanding the problem to a solution that is built, verified and ready to hand over.
            </p>
          </div>

          {/* Right-side Editorial Statement */}
          <div className="shrink-0 max-w-xs self-start md:self-end">
            <div className="border-l-[3px] border-[#C83E1B] pl-4 py-0.5">
              <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0A0A0C]">
                A FOUR-STAGE APPROACH
              </div>
              <p className="font-sans text-[12px] text-[#5A5D6A] leading-relaxed mt-0.5">
                Clear decisions at each stage.
                <br />
                Visible progress. Deliberate handover.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3 & 4. FOUR-STAGE CONNECTED TIMELINE (SUBSTANTIAL ILLUSTRATIONS & BASELINE)
           ========================================================================= */}
        <div className="relative pt-2 pb-6">
          {/* Subtle warm-orange flowing ribbon behind the baseline (Desktop only) */}
          <div
            className="hidden lg:block absolute left-0 right-0 top-16 h-28 pointer-events-none select-none overflow-hidden opacity-35"
            aria-hidden="true"
          >
            <svg viewBox="0 0 1200 100" preserveAspectRatio="none" className="w-full h-full">
              <defs>
                <linearGradient id="refinedRibbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C83E1B" stopOpacity="0.06" />
                  <stop offset="25%" stopColor="#C83E1B" stopOpacity="0.14" />
                  <stop offset="50%" stopColor="#C83E1B" stopOpacity="0.08" />
                  <stop offset="75%" stopColor="#C83E1B" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#C83E1B" stopOpacity="0.06" />
                </linearGradient>
              </defs>
              <path
                d="M 0 50 Q 150 15 300 50 T 600 50 T 900 50 T 1200 50 L 1200 85 Q 1050 50 900 85 T 600 85 T 300 85 T 0 85 Z"
                fill="url(#refinedRibbonGrad)"
              />
            </svg>
          </div>

          {/* Continuous thin horizontal connecting line with connection nodes (Desktop) */}
          <div
            className="hidden lg:block absolute left-[12.5%] right-[12.5%] top-[70px] h-[1.5px] bg-[#E2E2E8] pointer-events-none z-0"
            aria-hidden="true"
          >
            {/* Connection Node 1-2 (at exactly 33.3% of the line) */}
            <div className="absolute left-[33.3%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[11px] h-[11px] rounded-full bg-[#FFFFFF] border-2 border-[#C83E1B] flex items-center justify-center shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B]" />
            </div>

            {/* Connection Node 2-3 (at exactly 50% of the line) */}
            <div className="absolute left-[50%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[11px] h-[11px] rounded-full bg-[#FFFFFF] border-2 border-[#C83E1B] flex items-center justify-center shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B]" />
            </div>

            {/* Connection Node 3-4 (at exactly 66.7% of the line) */}
            <div className="absolute left-[66.7%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[11px] h-[11px] rounded-full bg-[#FFFFFF] border-2 border-[#C83E1B] flex items-center justify-center shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B]" />
            </div>
          </div>

          {/* Four Distributed Stages (Equal Grid Columns & Shared Horizontal Alignment) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {STAGES.map((s) => {
              const Illustration = s.illustration;
              return (
                <div key={s.step} className="flex flex-col items-center text-center">
                  {/* Substantial Isometric Illustration (Aligned to common horizontal axis) */}
                  <div className="h-[140px] lg:h-[145px] flex items-center justify-center mb-3">
                    <Illustration />
                  </div>

                  {/* Stage Identifier & Title */}
                  <h3 className="font-sans font-extrabold text-[15px] sm:text-[16px] text-[#0A0A0C] tracking-wide mb-2 flex items-center justify-center gap-1.5 flex-wrap">
                    <span className="font-mono text-[#C83E1B] font-bold text-[15px] sm:text-[16px]">
                      {s.step} —
                    </span>
                    <span>{s.title}</span>
                  </h3>

                  {/* Concise Description */}
                  <p className="font-sans text-[13px] sm:text-[13.5px] leading-[1.55] text-[#5A5D6A] max-w-[230px]">
                    {s.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            5. BOTTOM PROCESS PRINCIPLES STRIP (BALANCED PROPORTIONS ~88–100px HEIGHT)
           ========================================================================= */}
        <div className="mt-12 lg:mt-14 bg-[#FFFFFF] border border-[#E2E2E8] rounded-[6px] min-h-[88px] lg:min-h-[96px] py-5 sm:py-6 px-4 sm:px-6 lg:px-8 shadow-xs flex items-center">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 divide-y sm:divide-y-0 lg:divide-x divide-[#E2E2E8]">
            {/* ITEM 01: Clear Scope */}
            <div className="flex items-center gap-3.5 lg:px-4 first:lg:pl-0">
              <div className="w-9 h-9 rounded-[4px] bg-[#FFF5F2] border border-[#C83E1B]/35 flex items-center justify-center text-[#C83E1B] shrink-0">
                <svg className="w-4.5 h-4.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="8" cy="8" r="6" />
                  <circle cx="8" cy="8" r="2" fill="#C83E1B" />
                  <line x1="8" y1="1" x2="8" y2="3" />
                  <line x1="8" y1="13" x2="8" y2="15" />
                  <line x1="1" y1="8" x2="3" y2="8" />
                  <line x1="13" y1="8" x2="15" y2="8" />
                </svg>
              </div>
              <div>
                <h4 className="font-sans font-extrabold text-[13px] sm:text-[13.5px] text-[#0A0A0C] uppercase tracking-wide">
                  CLEAR SCOPE
                </h4>
                <p className="font-sans text-[11.5px] text-[#5A5D6A] mt-0.5 leading-normal">
                  Agreed priorities and boundaries.
                </p>
              </div>
            </div>

            {/* ITEM 02: Visible Progress */}
            <div className="flex items-center gap-3.5 pt-4 sm:pt-0 lg:px-4">
              <div className="w-9 h-9 rounded-[4px] bg-[#FFF5F2] border border-[#C83E1B]/35 flex items-center justify-center text-[#C83E1B] shrink-0">
                <svg className="w-4.5 h-4.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <polygon points="8,2 14,5 8,8 2,5" />
                  <polygon points="8,6 14,9 8,12 2,9" />
                  <polygon points="8,10 14,13 8,16 2,13" />
                </svg>
              </div>
              <div>
                <h4 className="font-sans font-extrabold text-[13px] sm:text-[13.5px] text-[#0A0A0C] uppercase tracking-wide">
                  VISIBLE PROGRESS
                </h4>
                <p className="font-sans text-[11.5px] text-[#5A5D6A] mt-0.5 leading-normal">
                  Incremental updates and reviews.
                </p>
              </div>
            </div>

            {/* ITEM 03: Verified Work */}
            <div className="flex items-center gap-3.5 pt-4 sm:pt-0 lg:px-4">
              <div className="w-9 h-9 rounded-[4px] bg-[#FFF5F2] border border-[#C83E1B]/35 flex items-center justify-center text-[#C83E1B] shrink-0">
                <svg className="w-4.5 h-4.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M8 2 L13 4.5 V9 C13 12 8 14 8 14 C8 14 3 12 3 9 V4.5 Z" />
                  <path d="M6 8 L7.5 9.5 L10.5 6.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h4 className="font-sans font-extrabold text-[13px] sm:text-[13.5px] text-[#0A0A0C] uppercase tracking-wide">
                  VERIFIED WORK
                </h4>
                <p className="font-sans text-[11.5px] text-[#5A5D6A] mt-0.5 leading-normal">
                  Testing against agreed requirements.
                </p>
              </div>
            </div>

            {/* ITEM 04: Documented Handover */}
            <div className="flex items-center gap-3.5 pt-4 sm:pt-0 lg:px-4 last:lg:pr-0">
              <div className="w-9 h-9 rounded-[4px] bg-[#FFF5F2] border border-[#C83E1B]/35 flex items-center justify-center text-[#C83E1B] shrink-0">
                <svg className="w-4.5 h-4.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="2" width="10" height="12" rx="1.5" />
                  <path d="M6 7 L7.5 8.5 L10.5 5.5" strokeLinecap="round" />
                  <line x1="6" y1="11" x2="10" y2="11" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h4 className="font-sans font-extrabold text-[13px] sm:text-[13.5px] text-[#0A0A0C] uppercase tracking-wide">
                  DOCUMENTED HANDOVER
                </h4>
                <p className="font-sans text-[11.5px] text-[#5A5D6A] mt-0.5 leading-normal">
                  Release notes and knowledge transfer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
