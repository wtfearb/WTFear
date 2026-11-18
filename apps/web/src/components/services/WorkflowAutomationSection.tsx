import React from 'react';

export function WorkflowAutomationSection(): React.ReactElement {
  return (
    <section
      id="workflow-automation"
      aria-labelledby="heading-workflow-automation"
      className="py-16 md:py-20 border-b border-[#E2E2E8] bg-[#FFFFFF] scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* =========================================================================
              LEFT COLUMN (lg:col-span-5): EDITORIAL CONTENT
             ========================================================================= */}
          <div className="lg:col-span-5">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-mono text-[32px] sm:text-[36px] font-bold leading-none text-[#C83E1B]">
                05.
              </span>
              <h2
                id="heading-workflow-automation"
                className="font-sans text-[26px] sm:text-[30px] font-extrabold tracking-[-0.025em] text-[#0A0A0C] leading-[1.15]"
              >
                Workflow Automation &amp; System Integrations
              </h2>
            </div>

            <p className="font-sans text-[15px] leading-[1.6] text-[#3F414A] mb-8">
              Connect repetitive processes and reduce manual handoffs across the tools a business already uses.
            </p>

            {/* 4-Item Checkmark Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#F0F0F3] text-[13.5px] text-[#3F414A]">
              <div className="flex items-start gap-2">
                <span className="text-[#C83E1B] font-bold shrink-0">✓</span>
                <span>CRM and business-tool integrations.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#C83E1B] font-bold shrink-0">✓</span>
                <span>Notifications.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#C83E1B] font-bold shrink-0">✓</span>
                <span>Document workflows.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#C83E1B] font-bold shrink-0">✓</span>
                <span>Reporting and automation.</span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN (lg:col-span-7): CONNECTED WORKFLOW SVG DIAGRAM
             ========================================================================= */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFFFF] border border-[#E2E2E8] rounded-[8px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(10,10,12,0.03)]">
              <div className="w-full overflow-hidden">
                <svg
                  viewBox="0 0 520 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-auto max-w-[520px] mx-auto block"
                >
                  <defs>
                    <marker
                      id="workflow-arrow"
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
                      id="workflow-arrow-green"
                      viewBox="0 0 10 10"
                      refX="6"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#16A34A" />
                    </marker>
                  </defs>

                  {/* Left Column: 3 Tool Nodes */}
                  {/* 1. CRM */}
                  <g transform="translate(30, 16)">
                    <rect width="110" height="40" rx="5" fill="#FFFFFF" stroke="#D5D7E0" strokeWidth="1.5" />
                    <circle cx="20" cy="20" r="6" stroke="#3F414A" strokeWidth="1.5" fill="none" />
                    <path d="M12 28c0-3 3-5 8-5s8 2 8 5" stroke="#3F414A" strokeWidth="1.5" fill="none" />
                    <text x="66" y="24" textAnchor="middle" fill="#0A0A0C" fontFamily="sans-serif" fontSize="12" fontWeight="700">
                      CRM
                    </text>
                  </g>

                  {/* 2. Docs */}
                  <g transform="translate(30, 80)">
                    <rect width="110" height="40" rx="5" fill="#FFFFFF" stroke="#D5D7E0" strokeWidth="1.5" />
                    <path d="M16 12h8l5 5v11H16z" stroke="#3F414A" strokeWidth="1.5" fill="none" />
                    <path d="M24 12v5h5" stroke="#3F414A" strokeWidth="1.5" fill="none" />
                    <text x="66" y="24" textAnchor="middle" fill="#0A0A0C" fontFamily="sans-serif" fontSize="12" fontWeight="700">
                      Docs
                    </text>
                  </g>

                  {/* 3. Calendar */}
                  <g transform="translate(30, 144)">
                    <rect width="110" height="40" rx="5" fill="#FFFFFF" stroke="#D5D7E0" strokeWidth="1.5" />
                    <rect x="14" y="14" width="14" height="13" rx="2" stroke="#3F414A" strokeWidth="1.5" fill="none" />
                    <path d="M17 11v4M25 11v4M14 18h14" stroke="#3F414A" strokeWidth="1.5" />
                    <text x="66" y="24" textAnchor="middle" fill="#0A0A0C" fontFamily="sans-serif" fontSize="12" fontWeight="700">
                      Calendar
                    </text>
                  </g>

                  {/* Connectors from 3 Tools to Center Automated Workflow */}
                  <path d="M 140 36 C 180 36, 180 95, 215 98" stroke="#D5D7E0" strokeWidth="1.5" fill="none" markerEnd="url(#workflow-arrow)" />
                  <path d="M 140 100 L 215 100" stroke="#C83E1B" strokeWidth="1.5" fill="none" markerEnd="url(#workflow-arrow)" />
                  <path d="M 140 164 C 180 164, 180 105, 215 102" stroke="#D5D7E0" strokeWidth="1.5" fill="none" markerEnd="url(#workflow-arrow)" />

                  {/* Center Node: Automated Workflow (Highlighted in Signal Orange) */}
                  <g transform="translate(220, 76)">
                    <rect width="150" height="48" rx="6" fill="#FDF4F0" stroke="#C83E1B" strokeWidth="1.5" />
                    <text x="75" y="29" textAnchor="middle" fill="#0A0A0C" fontFamily="sans-serif" fontSize="12" fontWeight="800">
                      Automated Workflow
                    </text>
                  </g>

                  {/* Connector to Results */}
                  <line x1="370" y1="100" x2="415" y2="100" stroke="#16A34A" strokeWidth="1.5" markerEnd="url(#workflow-arrow-green)" />

                  {/* Right Success Node: Results */}
                  <g transform="translate(425, 78)">
                    <circle cx="22" cy="22" r="20" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1.5" />
                    <path d="M16 22l4 4 8-8" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <text x="22" y="55" textAnchor="middle" fill="#0A0A0C" fontFamily="sans-serif" fontSize="11" fontWeight="700">
                      Results
                    </text>
                  </g>
                </svg>
              </div>

              {/* Bottom Metadata Line */}
              <div className="mt-4 pt-3 border-t border-[#ECEEF3] text-center font-mono text-[10.5px] tracking-[0.08em] text-[#5A5D6A]">
                WORKFLOWS · AUTOMATION · INTEGRATIONS
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
