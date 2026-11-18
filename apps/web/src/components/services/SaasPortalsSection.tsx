import React from 'react';

export function SaasPortalsSection(): React.ReactElement {
  return (
    <section
      id="saas-b2b"
      aria-labelledby="heading-saas-b2b"
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
                03.
              </span>
              <h2
                id="heading-saas-b2b"
                className="font-sans text-[26px] sm:text-[30px] font-extrabold tracking-[-0.025em] text-[#0A0A0C] leading-[1.15]"
              >
                SaaS &amp; Enterprise B2B Portals
              </h2>
            </div>

            <p className="font-sans text-[15px] leading-[1.6] text-[#3F414A] mb-8">
              Customer-facing products and portals with thoughtful access boundaries and maintainable foundations.
            </p>

            {/* Checkmark List */}
            <ul className="space-y-3 pt-2 border-t border-[#F0F0F3] text-[14px] text-[#3F414A]">
              <li className="flex items-start gap-2.5">
                <span className="text-[#C83E1B] font-bold shrink-0">✓</span>
                <span>SaaS MVPs.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#C83E1B] font-bold shrink-0">✓</span>
                <span>Customer workspaces.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#C83E1B] font-bold shrink-0">✓</span>
                <span>Role-based access.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#C83E1B] font-bold shrink-0">✓</span>
                <span>Tenant-aware data.</span>
              </li>
            </ul>
          </div>

          {/* =========================================================================
              RIGHT COLUMN (lg:col-span-7): MULTI-TENANT ARCHITECTURE SVG DIAGRAM
             ========================================================================= */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFFFF] border border-[#E2E2E8] rounded-[8px] p-5 sm:p-6 shadow-[0_4px_20px_rgba(10,10,12,0.03)]">
              <div className="w-full overflow-hidden">
                <svg
                  viewBox="0 0 520 250"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-auto max-w-[520px] mx-auto block"
                >
                  <defs>
                    <marker
                      id="arrow-orange"
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
                      id="arrow-muted"
                      viewBox="0 0 10 10"
                      refX="6"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#8E95A5" />
                    </marker>
                  </defs>

                  {/* Top Row: Tenant Workspaces */}
                  {/* Tenant A */}
                  <rect x="60" y="16" width="160" height="46" rx="5" fill="#FFFFFF" stroke="#D5D7E0" strokeWidth="1.5" />
                  <text x="140" y="36" textAnchor="middle" fill="#0A0A0C" fontFamily="sans-serif" fontSize="12" fontWeight="700">
                    Tenant A
                  </text>
                  <text x="140" y="52" textAnchor="middle" fill="#717684" fontFamily="monospace" fontSize="10">
                    (Workspace)
                  </text>

                  {/* Tenant B */}
                  <rect x="300" y="16" width="160" height="46" rx="5" fill="#FFFFFF" stroke="#D5D7E0" strokeWidth="1.5" />
                  <text x="380" y="36" textAnchor="middle" fill="#0A0A0C" fontFamily="sans-serif" fontSize="12" fontWeight="700">
                    Tenant B
                  </text>
                  <text x="380" y="52" textAnchor="middle" fill="#717684" fontFamily="monospace" fontSize="10">
                    (Workspace)
                  </text>

                  {/* Connectors Down to Application Layer */}
                  <path d="M 140 62 L 140 92" stroke="#8E95A5" strokeWidth="1.5" markerEnd="url(#arrow-muted)" />
                  <path d="M 380 62 L 380 92" stroke="#8E95A5" strokeWidth="1.5" markerEnd="url(#arrow-muted)" />

                  {/* Middle Row: Application Layer (Highlighted in Signal Orange) */}
                  <rect x="60" y="98" width="400" height="46" rx="6" fill="#FDF4F0" stroke="#C83E1B" strokeWidth="1.5" />
                  <text x="260" y="126" textAnchor="middle" fill="#0A0A0C" fontFamily="sans-serif" fontSize="13" fontWeight="800" letterSpacing="0.02em">
                    Application Layer
                  </text>

                  {/* Connectors Down to Data Storage */}
                  <path d="M 140 144 L 140 170" stroke="#C83E1B" strokeWidth="1.5" markerEnd="url(#arrow-orange)" />
                  <path d="M 380 144 L 380 170" stroke="#C83E1B" strokeWidth="1.5" markerEnd="url(#arrow-orange)" />

                  {/* Isolation Boundary (Vertical Dashed Line) */}
                  <line x1="260" y1="156" x2="260" y2="232" stroke="#C83E1B" strokeWidth="1.5" strokeDasharray="4 4" />

                  {/* Bottom Row: Tenant Data Containers */}
                  {/* Tenant A Data */}
                  <rect x="60" y="176" width="160" height="46" rx="5" fill="#FFFFFF" stroke="#D5D7E0" strokeWidth="1.5" />
                  <text x="140" y="204" textAnchor="middle" fill="#0A0A0C" fontFamily="sans-serif" fontSize="12" fontWeight="700">
                    Tenant A Data
                  </text>

                  {/* Tenant B Data */}
                  <rect x="300" y="176" width="160" height="46" rx="5" fill="#FFFFFF" stroke="#D5D7E0" strokeWidth="1.5" />
                  <text x="380" y="204" textAnchor="middle" fill="#0A0A0C" fontFamily="sans-serif" fontSize="12" fontWeight="700">
                    Tenant B Data
                  </text>
                </svg>
              </div>

              {/* Bottom Metadata Line */}
              <div className="mt-4 pt-3 border-t border-[#ECEEF3] text-center font-mono text-[10.5px] tracking-[0.08em] text-[#5A5D6A]">
                SAAS · B2B PORTALS · MVPS · ACCESS CONTROL
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
