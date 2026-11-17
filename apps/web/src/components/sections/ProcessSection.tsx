import React from 'react';

/**
 * Custom Isometric Stage Illustrations
 */

// Stage 01: Discover & Diagnose — Isometric layered planes with Magnifying Glass
function Stage01Illustration(): React.ReactElement {
  return (
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-36 h-28 mx-auto block select-none" aria-hidden="true">
      {/* Soft orange ambient base glow */}
      <ellipse cx="80" cy="98" rx="46" ry="12" fill="#C83E1B" fillOpacity="0.08" />

      {/* Layer 3 (Bottom) */}
      <polygon points="80,68 132,86 80,104 28,86" fill="#FFF5F2" stroke="#C83E1B" strokeWidth="1.2" strokeOpacity="0.7" />

      {/* Layer 2 (Middle) */}
      <polygon points="80,50 132,68 80,86 28,68" fill="#FFFFFF" stroke="#D1D3DC" strokeWidth="1.2" />

      {/* Layer 1 (Top) */}
      <polygon points="80,32 132,50 80,68 28,50" fill="#FFFFFF" stroke="#9EA2B0" strokeWidth="1.3" />

      {/* Magnifying Glass on Top Plane */}
      <g transform="translate(80, 50)">
        {/* Glass Ring */}
        <circle cx="-1" cy="-2" r="9" fill="none" stroke="#C83E1B" strokeWidth="1.8" />
        <circle cx="-1" cy="-2" r="6" fill="#C83E1B" fillOpacity="0.12" />
        {/* Handle */}
        <line x1="5.5" y1="4.5" x2="11.5" y2="10.5" stroke="#C83E1B" strokeWidth="2.2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// Stage 02: Architect & Scope — Isometric layered planes with 3D Architectural Cube
function Stage02Illustration(): React.ReactElement {
  return (
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-36 h-28 mx-auto block select-none" aria-hidden="true">
      {/* Base glow */}
      <ellipse cx="80" cy="98" rx="46" ry="12" fill="#C83E1B" fillOpacity="0.08" />

      {/* Bottom Layer */}
      <polygon points="80,68 132,86 80,104 28,86" fill="#FFF5F2" stroke="#C83E1B" strokeWidth="1.2" strokeOpacity="0.7" />

      {/* Middle Layer */}
      <polygon points="80,50 132,68 80,86 28,68" fill="#FFFFFF" stroke="#D1D3DC" strokeWidth="1.2" />

      {/* Top Layer */}
      <polygon points="80,32 132,50 80,68 28,50" fill="#FFFFFF" stroke="#9EA2B0" strokeWidth="1.3" />

      {/* 3D Geometric Architectural Cube */}
      <g transform="translate(80, 50)">
        {/* Cube Top Face */}
        <polygon points="0,-16 11,-10 0,-4 -11,-10" fill="#FFEFEA" stroke="#C83E1B" strokeWidth="1.4" />
        {/* Cube Left Face */}
        <polygon points="-11,-10 0,-4 0,8 -11,2" fill="#FFFFFF" stroke="#C83E1B" strokeWidth="1.4" />
        {/* Cube Right Face */}
        <polygon points="0,-4 11,-10 11,2 0,8" fill="#F8F8FA" stroke="#C83E1B" strokeWidth="1.4" />
        {/* Internal wireframe axis */}
        <line x1="0" y1="-4" x2="0" y2="8" stroke="#C83E1B" strokeWidth="1" strokeOpacity="0.6" />
      </g>
    </svg>
  );
}

// Stage 03: Build & Verify — Isometric layered planes with Code Symbol </>
function Stage03Illustration(): React.ReactElement {
  return (
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-36 h-28 mx-auto block select-none" aria-hidden="true">
      {/* Base glow */}
      <ellipse cx="80" cy="98" rx="46" ry="12" fill="#C83E1B" fillOpacity="0.08" />

      {/* Bottom Layer */}
      <polygon points="80,68 132,86 80,104 28,86" fill="#FFF5F2" stroke="#C83E1B" strokeWidth="1.2" strokeOpacity="0.7" />

      {/* Middle Layer */}
      <polygon points="80,50 132,68 80,86 28,68" fill="#FFFFFF" stroke="#D1D3DC" strokeWidth="1.2" />

      {/* Top Layer */}
      <polygon points="80,32 132,50 80,68 28,50" fill="#FFFFFF" stroke="#9EA2B0" strokeWidth="1.3" />

      {/* Code Symbol </> on Top Plane */}
      <g transform="translate(80, 50)">
        {/* Left angle bracket < */}
        <path d="M -7 -4 L -12 -1 L -7 2" fill="none" stroke="#C83E1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Slash / */}
        <line x1="-2" y1="4" x2="2" y2="-6" stroke="#C83E1B" strokeWidth="2" strokeLinecap="round" />
        {/* Right angle bracket > */}
        <path d="M 7 -4 L 12 -1 L 7 2" fill="none" stroke="#C83E1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

// Stage 04: Deploy & Handover — Isometric layered planes with Minimal Rocket
function Stage04Illustration(): React.ReactElement {
  return (
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-36 h-28 mx-auto block select-none" aria-hidden="true">
      {/* Warmer orange base glow signifying completion */}
      <ellipse cx="80" cy="98" rx="48" ry="14" fill="#C83E1B" fillOpacity="0.14" />

      {/* Bottom Layer */}
      <polygon points="80,68 132,86 80,104 28,86" fill="#FFF0EB" stroke="#C83E1B" strokeWidth="1.4" />

      {/* Middle Layer */}
      <polygon points="80,50 132,68 80,86 28,68" fill="#FFFFFF" stroke="#D1D3DC" strokeWidth="1.2" />

      {/* Top Layer with stronger orange outline for completion */}
      <polygon points="80,32 132,50 80,68 28,50" fill="#FFF5F2" stroke="#C83E1B" strokeWidth="1.8" />

      {/* Minimalist Rocket on Top Plane */}
      <g transform="translate(80, 50)">
        {/* Rocket Body */}
        <path
          d="M 0 -13 C 4 -10 6 -4 6 2 L 0 0 L -6 2 C -6 -4 -4 -10 0 -13 Z"
          fill="#C83E1B"
          fillOpacity="0.18"
          stroke="#C83E1B"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        {/* Porthole */}
        <circle cx="0" cy="-5" r="1.8" fill="#C83E1B" />
        {/* Left Fin */}
        <path d="M -6 1 L -10 5 L -6 4 Z" fill="#C83E1B" stroke="#C83E1B" strokeWidth="1" strokeLinejoin="round" />
        {/* Right Fin */}
        <path d="M 6 1 L 10 5 L 6 4 Z" fill="#C83E1B" stroke="#C83E1B" strokeWidth="1" strokeLinejoin="round" />
        {/* Thrust Flame */}
        <path d="M -2 2 L 0 7 L 2 2 Z" fill="#C83E1B" />
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
      className="py-14 md:py-20 border-b border-[#E2E2E8] bg-[#F9F9FB] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            2. SECTION INTRODUCTION
           ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-10 border-b border-[#E2E2E8]">
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
            <p className="font-sans text-[13px] sm:text-[14px] leading-relaxed text-[#5A5D6A] mt-2 max-w-xl">
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
            3 & 4. FOUR-STAGE CONNECTED TIMELINE (NO CARDS, FLOWING CONTINUOUS AXIS)
           ========================================================================= */}
        <div className="relative pt-4 pb-8">
          {/* Subtle warm-orange flowing ribbon behind the illustrations (Desktop only) */}
          <div className="hidden lg:block absolute left-0 right-0 top-14 h-32 pointer-events-none select-none overflow-hidden" aria-hidden="true">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full opacity-60">
              <defs>
                <linearGradient id="timelineRibbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C83E1B" stopOpacity="0.04" />
                  <stop offset="25%" stopColor="#C83E1B" stopOpacity="0.10" />
                  <stop offset="50%" stopColor="#C83E1B" stopOpacity="0.07" />
                  <stop offset="75%" stopColor="#C83E1B" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#C83E1B" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path
                d="M 0 60 Q 150 20 300 60 T 600 60 T 900 60 T 1200 60 L 1200 100 Q 1050 60 900 100 T 600 100 T 300 100 T 0 100 Z"
                fill="url(#timelineRibbonGrad)"
              />
            </svg>
          </div>

          {/* Continuous thin horizontal connecting line with connection nodes (Desktop) */}
          <div className="hidden lg:block absolute left-[12%] right-[12%] top-28 h-px bg-[#E2E2E8] pointer-events-none z-0" aria-hidden="true">
            {/* Connection Node 1-2 (at ~33% of the line) */}
            <div className="absolute left-[33%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#FFFFFF] border border-[#C83E1B] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B]" />
            </div>

            {/* Connection Node 2-3 (at ~50% of the line) */}
            <div className="absolute left-[50%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#FFFFFF] border border-[#C83E1B] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B]" />
            </div>

            {/* Connection Node 3-4 (at ~67% of the line) */}
            <div className="absolute left-[67%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#FFFFFF] border border-[#C83E1B] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B]" />
            </div>
          </div>

          {/* Four Distributed Stages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {STAGES.map((s) => {
              const Illustration = s.illustration;
              return (
                <div key={s.step} className="flex flex-col items-center text-center">
                  {/* Isometric Illustration Frame (Aligned to common horizontal axis) */}
                  <div className="h-32 flex items-center justify-center mb-2">
                    <Illustration />
                  </div>

                  {/* Stage Identifier & Title */}
                  <div className="font-mono text-[13px] font-bold tracking-wide mb-1.5">
                    <span className="text-[#C83E1B]">{s.step} // </span>
                    <span className="font-sans text-[#0A0A0C] font-extrabold uppercase text-[13px]">
                      {s.title}
                    </span>
                  </div>

                  {/* Concise Description */}
                  <p className="font-sans text-[12px] leading-[1.6] text-[#5A5D6A] max-w-[220px]">
                    {s.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            5. BOTTOM PROCESS PRINCIPLES STRIP
           ========================================================================= */}
        <div className="mt-12 bg-[#FFFFFF] border border-[#E2E2E8] rounded-[6px] py-6 px-4 sm:px-6 lg:px-8 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 divide-y sm:divide-y-0 lg:divide-x divide-[#E2E2E8]">
            {/* ITEM 01: Clear Scope */}
            <div className="flex items-center gap-3.5 lg:px-4 first:lg:pl-0">
              <div className="w-8 h-8 rounded-[3px] bg-[#FFF5F2] border border-[#C83E1B]/30 flex items-center justify-center text-[#C83E1B] shrink-0">
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="8" cy="8" r="6" />
                  <circle cx="8" cy="8" r="2" fill="#C83E1B" />
                  <line x1="8" y1="1" x2="8" y2="3" />
                  <line x1="8" y1="13" x2="8" y2="15" />
                  <line x1="1" y1="8" x2="3" y2="8" />
                  <line x1="13" y1="8" x2="15" y2="8" />
                </svg>
              </div>
              <div>
                <h4 className="font-sans font-bold text-[13px] text-[#0A0A0C] uppercase tracking-wide">
                  CLEAR SCOPE
                </h4>
                <p className="font-sans text-[11.5px] text-[#5A5D6A] mt-0.5">
                  Agreed priorities and boundaries.
                </p>
              </div>
            </div>

            {/* ITEM 02: Visible Progress */}
            <div className="flex items-center gap-3.5 pt-4 sm:pt-0 lg:px-4">
              <div className="w-8 h-8 rounded-[3px] bg-[#FFF5F2] border border-[#C83E1B]/30 flex items-center justify-center text-[#C83E1B] shrink-0">
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polygon points="8,2 14,5 8,8 2,5" />
                  <polygon points="8,6 14,9 8,12 2,9" />
                  <polygon points="8,10 14,13 8,16 2,13" />
                </svg>
              </div>
              <div>
                <h4 className="font-sans font-bold text-[13px] text-[#0A0A0C] uppercase tracking-wide">
                  VISIBLE PROGRESS
                </h4>
                <p className="font-sans text-[11.5px] text-[#5A5D6A] mt-0.5">
                  Incremental updates and reviews.
                </p>
              </div>
            </div>

            {/* ITEM 03: Verified Work */}
            <div className="flex items-center gap-3.5 pt-4 sm:pt-0 lg:px-4">
              <div className="w-8 h-8 rounded-[3px] bg-[#FFF5F2] border border-[#C83E1B]/30 flex items-center justify-center text-[#C83E1B] shrink-0">
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 2 L13 4.5 V9 C13 12 8 14 8 14 C8 14 3 12 3 9 V4.5 Z" />
                  <path d="M6 8 L7.5 9.5 L10.5 6.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h4 className="font-sans font-bold text-[13px] text-[#0A0A0C] uppercase tracking-wide">
                  VERIFIED WORK
                </h4>
                <p className="font-sans text-[11.5px] text-[#5A5D6A] mt-0.5">
                  Testing against agreed requirements.
                </p>
              </div>
            </div>

            {/* ITEM 04: Documented Handover */}
            <div className="flex items-center gap-3.5 pt-4 sm:pt-0 lg:px-4 last:lg:pr-0">
              <div className="w-8 h-8 rounded-[3px] bg-[#FFF5F2] border border-[#C83E1B]/30 flex items-center justify-center text-[#C83E1B] shrink-0">
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="2" width="10" height="12" rx="1.5" />
                  <path d="M6 7 L7.5 8.5 L10.5 5.5" strokeLinecap="round" />
                  <line x1="6" y1="11" x2="10" y2="11" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h4 className="font-sans font-bold text-[13px] text-[#0A0A0C] uppercase tracking-wide">
                  DOCUMENTED HANDOVER
                </h4>
                <p className="font-sans text-[11.5px] text-[#5A5D6A] mt-0.5">
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
