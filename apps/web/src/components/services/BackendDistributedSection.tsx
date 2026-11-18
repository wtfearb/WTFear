import React from 'react';

export function BackendDistributedSection(): React.ReactElement {
  return (
    <section
      id="backend-distributed"
      aria-labelledby="heading-backend-distributed"
      className="py-16 md:py-20 border-b border-[#E2E2E8] bg-[#FAFAFC] scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* =========================================================================
              LEFT COLUMN (order-2 lg:order-1): HORIZONTAL EVENT PIPELINE SVG
             ========================================================================= */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="bg-[#FFFFFF] border border-[#E2E2E8] rounded-[8px] p-5 sm:p-6 shadow-[0_6px_24px_rgba(10,10,12,0.04)]">
              <div className="w-full overflow-hidden">
                <svg
                  viewBox="0 0 460 110"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-auto max-w-[460px] mx-auto block"
                >
                  <defs>
                    <marker
                      id="pipeline-arrow"
                      viewBox="0 0 10 10"
                      refX="6"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#C83E1B" />
                    </marker>
                  </defs>

                  {/* 1. Producers Node */}
                  <g transform="translate(10, 15)">
                    <rect width="80" height="80" rx="6" fill="#FFFFFF" stroke="#D5D7E0" strokeWidth="1.5" />
                    {/* Server stack icon */}
                    <path d="M26 28h28v6H26zM26 38h28v6H26zM26 48h28v6H26z" stroke="#3F414A" strokeWidth="1.5" fill="none" />
                    <circle cx="31" cy="31" r="1.5" fill="#3F414A" />
                    <circle cx="31" cy="41" r="1.5" fill="#3F414A" />
                    <circle cx="31" cy="51" r="1.5" fill="#3F414A" />
                    <text x="40" y="70" textAnchor="middle" fill="#0A0A0C" fontFamily="sans-serif" fontSize="10.5" fontWeight="700">
                      Producers
                    </text>
                  </g>

                  {/* Arrow 1 */}
                  <line x1="95" y1="55" x2="125" y2="55" stroke="#C83E1B" strokeWidth="1.5" markerEnd="url(#pipeline-arrow)" />

                  {/* 2. Queue Node (Highlighted in Signal Orange) */}
                  <g transform="translate(130, 15)">
                    <rect width="80" height="80" rx="6" fill="#FDF4F0" stroke="#C83E1B" strokeWidth="1.5" />
                    {/* Queue/Cylinder stack icon */}
                    <ellipse cx="40" cy="30" rx="14" ry="5" stroke="#C83E1B" strokeWidth="1.5" fill="none" />
                    <path d="M26 30v10c0 2.76 6.27 5 14 5s14-2.24 14-5V30" stroke="#C83E1B" strokeWidth="1.5" fill="none" />
                    <path d="M26 40v10c0 2.76 6.27 5 14 5s14-2.24 14-5V40" stroke="#C83E1B" strokeWidth="1.5" fill="none" />
                    <text x="40" y="70" textAnchor="middle" fill="#C83E1B" fontFamily="sans-serif" fontSize="11" fontWeight="800">
                      Queue
                    </text>
                  </g>

                  {/* Arrow 2 */}
                  <line x1="215" y1="55" x2="245" y2="55" stroke="#C83E1B" strokeWidth="1.5" markerEnd="url(#pipeline-arrow)" />

                  {/* 3. Workers Node */}
                  <g transform="translate(250, 15)">
                    <rect width="80" height="80" rx="6" fill="#FFFFFF" stroke="#D5D7E0" strokeWidth="1.5" />
                    {/* Gear/cog icon */}
                    <circle cx="40" cy="38" r="8" stroke="#3F414A" strokeWidth="1.5" fill="none" />
                    <path d="M40 26v4M40 46v4M28 38h4M48 38h4" stroke="#3F414A" strokeWidth="1.5" strokeLinecap="round" />
                    <text x="40" y="70" textAnchor="middle" fill="#0A0A0C" fontFamily="sans-serif" fontSize="10.5" fontWeight="700">
                      Workers
                    </text>
                  </g>

                  {/* Arrow 3 */}
                  <line x1="335" y1="55" x2="365" y2="55" stroke="#C83E1B" strokeWidth="1.5" markerEnd="url(#pipeline-arrow)" />

                  {/* 4. Services Node */}
                  <g transform="translate(370, 15)">
                    <rect width="80" height="80" rx="6" fill="#FFFFFF" stroke="#D5D7E0" strokeWidth="1.5" />
                    {/* Isometric Cube icon */}
                    <path d="M40 26L54 34v16L40 58 26 50V34z" stroke="#3F414A" strokeWidth="1.5" fill="none" />
                    <path d="M40 26v32M26 34l14 8 14-8" stroke="#3F414A" strokeWidth="1.5" />
                    <text x="40" y="70" textAnchor="middle" fill="#0A0A0C" fontFamily="sans-serif" fontSize="10.5" fontWeight="700">
                      Services
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
                04.
              </span>
              <h2
                id="heading-backend-distributed"
                className="font-sans text-[26px] sm:text-[30px] font-extrabold tracking-[-0.025em] text-[#0A0A0C] leading-[1.15]"
              >
                Backend &amp; Distributed Event Pipelines
              </h2>
            </div>

            <p className="font-sans text-[15px] leading-[1.6] text-[#3F414A] mb-8">
              Backend services, event flows and integrations that keep connected applications working together.
            </p>

            {/* 4-Item Checkmark Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#EAEBED] text-[13.5px] text-[#3F414A]">
              <div className="flex items-start gap-2">
                <span className="text-[#C83E1B] font-bold shrink-0">✓</span>
                <span>Backend APIs.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#C83E1B] font-bold shrink-0">✓</span>
                <span>Retry and replay patterns.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#C83E1B] font-bold shrink-0">✓</span>
                <span>Event ingestion processing.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#C83E1B] font-bold shrink-0">✓</span>
                <span>Observability.</span>
              </div>
            </div>

            {/* Compact Technical Labels */}
            <div className="flex flex-wrap items-center gap-2 pt-6 mt-6 border-t border-[#EAEBED] font-mono text-[10.5px] tracking-wider text-[#5A5D6A]">
              <span className="px-2 py-0.5 bg-[#FFFFFF] border border-[#E2E2E8] rounded-[3px]">BACKEND</span>
              <span className="px-2 py-0.5 bg-[#FFFFFF] border border-[#E2E2E8] rounded-[3px]">EVENTS</span>
              <span className="px-2 py-0.5 bg-[#FFFFFF] border border-[#E2E2E8] rounded-[3px]">QUEUES</span>
              <span className="px-2 py-0.5 bg-[#FFFFFF] border border-[#E2E2E8] rounded-[3px]">INTEGRATIONS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
