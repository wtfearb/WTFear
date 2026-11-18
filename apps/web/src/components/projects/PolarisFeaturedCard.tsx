import React from 'react';
import Link from 'next/link';

export function PolarisFeaturedCard(): React.ReactElement {
  return (
    <section className="py-16 border-b border-[#E2E2E8] bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-10 border-b border-[#E2E2E8] font-mono text-[11px] uppercase tracking-[0.08em]">
          <span className="text-[#C83E1B] font-bold">01 / FEATURED PROJECT</span>
          <span className="text-[#5A5D6A]">ENTERPRISE OPERATIONS &amp; CRM · LIVE PLATFORM</span>
        </div>

        {/* Desktop Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* =========================================================================
              LEFT COLUMN (lg:col-span-5): EDITORIAL SPECIFICATION
             ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="font-sans text-[28px] sm:text-[34px] font-extrabold tracking-[-0.025em] text-[#0A0A0C] leading-[1.12] mb-4">
                PolarisERP — Autonomous Enterprise CRM &amp; ERP
              </h2>

              <p className="font-sans text-[14.5px] leading-[1.65] text-[#3F414A] mb-7">
                An AI-native enterprise resource planning and CRM framework engineered to replace rigid legacy ERP stacks with autonomous invoice reconciliation, real-time working capital forecasting, and unified operations.
              </p>

              {/* Engineering Focus List */}
              <div className="divide-y divide-[#E2E2E8] border-t border-b border-[#E2E2E8] mb-7">
                <div className="py-2.5 flex items-center gap-2.5 text-[13.5px] text-[#0A0A0C] font-medium">
                  <span className="w-1.5 h-1.5 rounded-[1px] bg-[#C83E1B] shrink-0" />
                  <span>Autonomous invoice &amp; ledger reconciliation</span>
                </div>
                <div className="py-2.5 flex items-center gap-2.5 text-[13.5px] text-[#0A0A0C] font-medium">
                  <span className="w-1.5 h-1.5 rounded-[1px] bg-[#C83E1B] shrink-0" />
                  <span>Real-time working capital &amp; treasury forecasting</span>
                </div>
                <div className="py-2.5 flex items-center gap-2.5 text-[13.5px] text-[#0A0A0C] font-medium">
                  <span className="w-1.5 h-1.5 rounded-[1px] bg-[#C83E1B] shrink-0" />
                  <span>Unified CRM &amp; operations without plugin sprawl</span>
                </div>
              </div>

              {/* System Components Tags */}
              <div className="mb-7">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#717684] block mb-2">
                  SYSTEM COMPONENTS
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Next.js 15', 'PostgreSQL 16', 'Drizzle ORM', 'Autonomous Ledger'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-[#F4F5F8] border border-[#E2E2E8] rounded-[3px] font-mono text-[11px] text-[#3F414A]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Links Row */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="https://polaris-erp-wheat.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#C83E1B] hover:bg-[#A83214] text-white font-mono text-[12px] font-bold px-4 py-2.5 rounded-[3px] inline-flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <span>Launch Live App</span>
                <span aria-hidden="true">&rarr;</span>
              </a>

              <a
                href="https://github.com/wtfear/PolarisERP"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0A0A0C] hover:bg-[#1E2028] text-white font-mono text-[12px] font-bold px-4 py-2.5 rounded-[3px] inline-flex items-center gap-1.5 transition-colors"
              >
                <span>GitHub Repo</span>
                <span aria-hidden="true">&rarr;</span>
              </a>

              <Link
                href="/projects/polaris-erp"
                className="font-mono text-[12px] font-bold text-[#C83E1B] hover:text-[#0A0A0C] inline-flex items-center gap-1 transition-colors px-2 py-2"
              >
                <span>Explore Project Profile</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN (lg:col-span-7): DARK SYSTEM ARCHITECTURE WORKSPACE
             ========================================================================= */}
          <div className="lg:col-span-7">
            <div className="bg-[#14161B] border border-[#242731] rounded-[6px] p-6 sm:p-8 text-[#FFFFFF] shadow-[0_16px_40px_rgba(10,10,12,0.14)]">
              {/* Top Bar */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#242731] font-mono text-[11px] uppercase tracking-[0.08em]">
                <span className="text-[#FFFFFF] font-bold">SYSTEM ARCHITECTURE</span>
                <span className="text-[#898E99]">REFERENCE MODEL / 01.0</span>
              </div>

              {/* INPUTS Row */}
              <div className="mb-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#898E99] block mb-2.5">
                  INPUTS
                </span>
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                  <div className="bg-[#1B1E26] border border-[#2C303D] py-2 px-2 sm:px-3 text-center font-mono text-[10px] sm:text-[10.5px] text-[#E2E4EC] rounded-[3px]">
                    1. INVOICE STREAM
                  </div>
                  <div className="bg-[#1B1E26] border border-[#2C303D] py-2 px-2 sm:px-3 text-center font-mono text-[10px] sm:text-[10.5px] text-[#E2E4EC] rounded-[3px]">
                    2. CRM PIPELINE
                  </div>
                  <div className="bg-[#1B1E26] border border-[#2C303D] py-2 px-2 sm:px-3 text-center font-mono text-[10px] sm:text-[10.5px] text-[#E2E4EC] rounded-[3px]">
                    3. TREASURY LEDGER
                  </div>
                </div>
              </div>

              {/* Four-Stage Architecture Flow */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 sm:gap-3 my-4">
                {/* Stage 01 */}
                <div className="bg-[#1B1E26] border border-[#2C303D] rounded-[4px] p-3 text-left">
                  <span className="font-mono text-[10px] text-[#898E99] block">01.</span>
                  <div className="font-mono text-[11px] font-bold text-[#FFFFFF] mt-1">INGRESS &amp; PARSE</div>
                  <div className="text-[10.5px] text-[#898E99] mt-1 leading-snug">
                    Validate invoice &amp; order payloads
                  </div>
                </div>

                {/* Stage 02 */}
                <div className="bg-[#1B1E26] border border-[#2C303D] rounded-[4px] p-3 text-left">
                  <span className="font-mono text-[10px] text-[#898E99] block">02.</span>
                  <div className="font-mono text-[11px] font-bold text-[#FFFFFF] mt-1">LEDGER MATCH</div>
                  <div className="text-[10.5px] text-[#898E99] mt-1 leading-snug">
                    Double-entry &amp; PO reconciliation
                  </div>
                </div>

                {/* Stage 03 (Highlighted in Signal Orange) */}
                <div className="bg-[#221513] border border-[#C83E1B] rounded-[4px] p-3 text-left shadow-[0_0_20px_rgba(200,62,27,0.18)]">
                  <span className="font-mono text-[10px] font-bold text-[#C83E1B] block">03.</span>
                  <div className="font-mono text-[11px] font-bold text-[#FFFFFF] mt-1">CAPITAL ENGINE</div>
                  <div className="text-[10.5px] text-[#F39A86] mt-1 leading-snug">
                    Working capital &amp; cash-flow model
                  </div>
                </div>

                {/* Stage 04 */}
                <div className="bg-[#1B1E26] border border-[#2C303D] rounded-[4px] p-3 text-left">
                  <span className="font-mono text-[10px] text-[#898E99] block">04.</span>
                  <div className="font-mono text-[11px] font-bold text-[#FFFFFF] mt-1">ERP MUTATION</div>
                  <div className="text-[10.5px] text-[#898E99] mt-1 leading-snug">
                    Unified state &amp; audit trail commit
                  </div>
                </div>
              </div>

              {/* Evidence & Ledger Trace */}
              <div className="pt-4 mt-5 border-t border-[#242731]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
                  <span className="font-mono uppercase tracking-[0.08em] text-[#898E99]">
                    LEDGER TRACE:
                  </span>
                  <span className="font-mono text-[#D0D4E0]">
                    Invoice line-items · Double-entry journal · Working capital state
                  </span>
                </div>
              </div>

              {/* Governance Indicators */}
              <div className="mt-4 pt-4 border-t border-[#242731] flex flex-wrap items-center gap-6 font-mono text-[10.5px] uppercase tracking-[0.08em] text-[#D0D4E0]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B]" />
                  <span>RECONCILE</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B]" />
                  <span>FORECAST</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B]" />
                  <span>AUDITABLE</span>
                </div>
              </div>

              {/* Bottom Annotation */}
              <div className="mt-5 text-[11px] font-sans italic text-[#898E99]">
                Live deployed reference platform — inspectable at polaris-erp-wheat.vercel.app and github.com/wtfear/PolarisERP.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
