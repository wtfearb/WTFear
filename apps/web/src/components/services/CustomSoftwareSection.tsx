import React from 'react';

export function CustomSoftwareSection(): React.ReactElement {
  return (
    <section
      id="custom-software"
      aria-labelledby="heading-custom-software"
      className="py-16 md:py-20 border-b border-[#E2E2E8] bg-[#FAFAFC] scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* =========================================================================
              LEFT COLUMN (order-2 lg:order-1): APPLICATION INTERFACE WIREFRAME CARD
             ========================================================================= */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="bg-[#FFFFFF] border border-[#E2E2E8] rounded-[8px] p-4 sm:p-5 shadow-[0_6px_24px_rgba(10,10,12,0.04)]">
              {/* Window Chrome Header Bar */}
              <div className="flex items-center gap-3 pb-3 mb-4 border-b border-[#ECEEF3]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C83E1B]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D5D7E0]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D5D7E0]" />
                </div>
                <div className="flex-1 max-w-[200px] h-3.5 bg-[#F0F1F5] rounded-[3px]" />
              </div>

              {/* Application Body Mockup */}
              <div className="grid grid-cols-12 gap-4 min-h-[220px]">
                {/* Left Sidebar Skeleton */}
                <div className="col-span-3 border-r border-[#ECEEF3] pr-3 space-y-2.5 pt-1">
                  <div className="h-2 w-3/4 bg-[#D5D7E0] rounded-sm" />
                  <div className="h-2 w-full bg-[#E8EAEF] rounded-sm" />
                  <div className="h-2 w-5/6 bg-[#E8EAEF] rounded-sm" />
                  <div className="h-2 w-2/3 bg-[#E8EAEF] rounded-sm" />
                </div>

                {/* Main Workspace Skeleton */}
                <div className="col-span-9 space-y-3.5">
                  {/* Top Bar / Filter area */}
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-1/3 bg-[#D5D7E0] rounded-sm" />
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-12 bg-[#E8EAEF] rounded-sm" />
                      <div className="h-2.5 w-12 bg-[#E8EAEF] rounded-sm" />
                    </div>
                  </div>

                  {/* Elevated Data Panel Card */}
                  <div className="p-3 bg-[#F9F9FB] border border-[#E2E2E8] rounded-[6px] space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-[#ECEEF3]">
                      <div className="h-2.5 w-24 bg-[#B0B4C0] rounded-sm" />
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                        <span className="font-mono text-[9px] text-[#5A5D6A]">ACTIVE</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <div className="h-2 w-full bg-[#E8EAEF] rounded-sm" />
                      <div className="h-2 w-11/12 bg-[#E8EAEF] rounded-sm" />
                      <div className="h-2 w-4/5 bg-[#E8EAEF] rounded-sm" />
                    </div>
                  </div>

                  {/* Primary Action Bar (Highlighted in Signal Orange) */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="h-2 w-20 bg-[#D5D7E0] rounded-sm" />
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#C83E1B] rounded-[4px] text-white shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      <span className="font-mono text-[10px] font-bold tracking-wider uppercase">ACTION</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN (order-1 lg:order-2): EDITORIAL CONTENT
             ========================================================================= */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-mono text-[32px] sm:text-[36px] font-bold leading-none text-[#C83E1B]">
                02.
              </span>
              <h2
                id="heading-custom-software"
                className="font-sans text-[26px] sm:text-[30px] font-extrabold tracking-[-0.025em] text-[#0A0A0C] leading-[1.15]"
              >
                Custom Software &amp; Systems Engineering
              </h2>
            </div>

            <p className="font-sans text-[15px] leading-[1.6] text-[#3F414A] mb-8">
              Purpose-built applications and internal systems shaped around the way teams actually work.
            </p>

            {/* Two Groups */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-[#EAEBED]">
              <div>
                <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-[#0A0A0C] mb-3">
                  WHERE IT HELPS
                </h3>
                <ul className="space-y-2 text-[13.5px] text-[#3F414A]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#C83E1B] font-bold shrink-0">✓</span>
                    <span>Business workflow tools.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C83E1B] font-bold shrink-0">✓</span>
                    <span>Internal portals.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C83E1B] font-bold shrink-0">✓</span>
                    <span>API integrations.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-[#0A0A0C] mb-3">
                  HOW WE APPROACH IT
                </h3>
                <ul className="space-y-2 text-[13.5px] text-[#3F414A]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#C83E1B] font-bold shrink-0">✓</span>
                    <span>Requirements, system design, implementation, testing and handover.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Compact Technical Labels */}
            <div className="flex flex-wrap items-center gap-2 pt-6 mt-6 border-t border-[#EAEBED] font-mono text-[10.5px] tracking-wider text-[#5A5D6A]">
              <span className="px-2 py-0.5 bg-[#FFFFFF] border border-[#E2E2E8] rounded-[3px]">WEB APPS</span>
              <span className="px-2 py-0.5 bg-[#FFFFFF] border border-[#E2E2E8] rounded-[3px]">INTERNAL TOOLS</span>
              <span className="px-2 py-0.5 bg-[#FFFFFF] border border-[#E2E2E8] rounded-[3px]">API INTEGRATIONS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
