import React from 'react';

export function ArchitectureConsultingSection(): React.ReactElement {
  return (
    <section
      id="architecture-consulting"
      aria-labelledby="heading-architecture-consulting"
      className="py-16 md:py-20 border-b border-[#E2E2E8] bg-[#FAFAFC] scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* =========================================================================
              LEFT COLUMN (order-2 lg:order-1): TECHNICAL DECISION TREE SVG
             ========================================================================= */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="bg-[#FFFFFF] border border-[#E2E2E8] rounded-[8px] p-5 sm:p-6 shadow-[0_6px_24px_rgba(10,10,12,0.04)]">
              <div className="w-full overflow-hidden">
                <svg
                  viewBox="0 0 480 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-auto max-w-[480px] mx-auto block"
                >
                  <defs>
                    <marker
                      id="tree-arrow"
                      viewBox="0 0 10 10"
                      refX="6"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#C83E1B" />
                    </marker>
                    <marker
                      id="tree-arrow-muted"
                      viewBox="0 0 10 10"
                      refX="6"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#D5D7E0" />
                    </marker>
                  </defs>

                  {/* Left Root Node: Options */}
                  <g transform="translate(20, 81)">
                    <rect width="90" height="38" rx="5" fill="#FFFFFF" stroke="#D5D7E0" strokeWidth="1.5" />
                    <text x="45" y="24" textAnchor="middle" fill="#0A0A0C" fontFamily="sans-serif" fontSize="11" fontWeight="700">
                      Options
                    </text>
                  </g>

                  {/* Connectors from Options to 3 Stacked Options */}
                  <path d="M 110 100 C 135 100, 135 42, 155 42" stroke="#D5D7E0" strokeWidth="1.5" fill="none" markerEnd="url(#tree-arrow-muted)" />
                  <path d="M 110 100 L 155 100" stroke="#C83E1B" strokeWidth="1.5" fill="none" markerEnd="url(#tree-arrow)" />
                  <path d="M 110 100 C 135 100, 135 158, 155 158" stroke="#D5D7E0" strokeWidth="1.5" fill="none" markerEnd="url(#tree-arrow-muted)" />

                  {/* 3 Stacked Option Nodes */}
                  {/* Option A */}
                  <g transform="translate(160, 24)">
                    <rect width="100" height="36" rx="4" fill="#FFFFFF" stroke="#D5D7E0" strokeWidth="1.5" />
                    <text x="50" y="22" textAnchor="middle" fill="#5A5D6A" fontFamily="sans-serif" fontSize="11" fontWeight="600">
                      Option A
                    </text>
                  </g>

                  {/* Option B (Selected) */}
                  <g transform="translate(160, 82)">
                    <rect width="100" height="36" rx="4" fill="#FFFFFF" stroke="#C83E1B" strokeWidth="1.5" />
                    <text x="50" y="22" textAnchor="middle" fill="#0A0A0C" fontFamily="sans-serif" fontSize="11" fontWeight="700">
                      Option B
                    </text>
                  </g>

                  {/* Option C */}
                  <g transform="translate(160, 140)">
                    <rect width="100" height="36" rx="4" fill="#FFFFFF" stroke="#D5D7E0" strokeWidth="1.5" />
                    <text x="50" y="22" textAnchor="middle" fill="#5A5D6A" fontFamily="sans-serif" fontSize="11" fontWeight="600">
                      Option C
                    </text>
                  </g>

                  {/* Connector from Option B to Recommended Approach */}
                  <line x1="260" y1="100" x2="315" y2="100" stroke="#C83E1B" strokeWidth="1.5" markerEnd="url(#tree-arrow)" />

                  {/* Right Node: Recommended Approach (Highlighted in Signal Orange) */}
                  <g transform="translate(320, 72)">
                    <rect width="140" height="56" rx="6" fill="#FDF4F0" stroke="#C83E1B" strokeWidth="1.5" />
                    <circle cx="24" cy="28" r="8" fill="#C83E1B" />
                    <path d="M21 28l2 2 4-4" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <text x="78" y="25" textAnchor="middle" fill="#0A0A0C" fontFamily="sans-serif" fontSize="10.5" fontWeight="800">
                      Recommended
                    </text>
                    <text x="78" y="40" textAnchor="middle" fill="#C83E1B" fontFamily="sans-serif" fontSize="10.5" fontWeight="700">
                      Approach
                    </text>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN (order-1 lg:order-2): EDITORIAL CONTENT
             ========================================================================= */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-mono text-[32px] sm:text-[36px] font-bold leading-none text-[#C83E1B]">
                06.
              </span>
              <h2
                id="heading-architecture-consulting"
                className="font-sans text-[26px] sm:text-[30px] font-extrabold tracking-[-0.025em] text-[#0A0A0C] leading-[1.15]"
              >
                Architecture &amp; Technical Consulting
              </h2>
            </div>

            <p className="font-sans text-[15px] leading-[1.6] text-[#3F414A] mb-8">
              Make informed technical decisions before committing to a build.
            </p>

            {/* 4-Item Checkmark Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#EAEBED] text-[13.5px] text-[#3F414A]">
              <div className="flex items-start gap-2">
                <span className="text-[#C83E1B] font-bold shrink-0">✓</span>
                <span>Technical discovery.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#C83E1B] font-bold shrink-0">✓</span>
                <span>Feasibility and trade-off analysis.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#C83E1B] font-bold shrink-0">✓</span>
                <span>Architecture review.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#C83E1B] font-bold shrink-0">✓</span>
                <span>Project scoping.</span>
              </div>
            </div>

            {/* Compact Technical Labels */}
            <div className="flex flex-wrap items-center gap-2 pt-6 mt-6 border-t border-[#EAEBED] font-mono text-[10.5px] tracking-wider text-[#5A5D6A]">
              <span className="px-2 py-0.5 bg-[#FFFFFF] border border-[#E2E2E8] rounded-[3px]">DISCOVERY</span>
              <span className="px-2 py-0.5 bg-[#FFFFFF] border border-[#E2E2E8] rounded-[3px]">ARCHITECTURE</span>
              <span className="px-2 py-0.5 bg-[#FFFFFF] border border-[#E2E2E8] rounded-[3px]">FEASIBILITY</span>
              <span className="px-2 py-0.5 bg-[#FFFFFF] border border-[#E2E2E8] rounded-[3px]">SCOPING</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
