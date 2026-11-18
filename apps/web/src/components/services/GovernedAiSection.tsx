import React from 'react';

export function GovernedAiSection(): React.ReactElement {
  return (
    <section
      id="ai-engineering"
      aria-labelledby="heading-ai-engineering"
      className="py-16 md:py-20 border-b border-[#E2E2E8] bg-[#FFFFFF] scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* =========================================================================
              LEFT COLUMN: EDITORIAL CONTENT & METHODOLOGY
             ========================================================================= */}
          <div className="lg:col-span-6">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-mono text-[32px] sm:text-[36px] font-bold leading-none text-[#C83E1B]">
                01.
              </span>
              <h2
                id="heading-ai-engineering"
                className="font-sans text-[26px] sm:text-[30px] font-extrabold tracking-[-0.025em] text-[#0A0A0C] leading-[1.15]"
              >
                Governed AI Engineering &amp; RAG Systems
              </h2>
            </div>

            <p className="font-sans text-[15px] leading-[1.6] text-[#3F414A] mb-8">
              AI agents, retrieval and knowledge workflows designed around useful business tasks, evidence and appropriate human oversight.
            </p>

            {/* Two Concise Lists */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-[#F0F0F3]">
              <div>
                <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-[#0A0A0C] mb-3">
                  WHERE IT HELPS
                </h3>
                <ul className="space-y-2 text-[13.5px] text-[#3F414A]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#C83E1B] font-bold shrink-0">✓</span>
                    <span>Support triage.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C83E1B] font-bold shrink-0">✓</span>
                    <span>Internal knowledge assistants.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C83E1B] font-bold shrink-0">✓</span>
                    <span>Document processing.</span>
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
                    <span>Retrieval design.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C83E1B] font-bold shrink-0">✓</span>
                    <span>Evaluation and validation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#C83E1B] font-bold shrink-0">✓</span>
                    <span>Human review.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: DARK AI WORKFLOW DIAGRAM PANEL
             ========================================================================= */}
          <div className="lg:col-span-6">
            <div className="bg-[#0C0D10] border border-[#1E212A] rounded-[8px] p-5 sm:p-6 text-[#FFFFFF] shadow-[0_12px_32px_rgba(10,10,12,0.12)]">
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-[#222530]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B]" />
                  <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#FFFFFF] uppercase">
                    AI WORKFLOW
                  </span>
                </div>
                <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-[#C83E1B] uppercase">
                  SYSTEM FLOW
                </span>
              </div>

              {/* 4 Connected Stages */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 items-stretch relative">
                {/* Stage 1: Request Ingress */}
                <div className="bg-[#14161B] border border-[#262833] rounded-[6px] p-3 flex flex-col items-center text-center justify-between min-h-[120px]">
                  <div className="w-8 h-8 rounded-full bg-[#1A1D24] flex items-center justify-center text-[#9CA3AF] mb-2">
                    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 stroke-current" strokeWidth="1.6">
                      <path d="M4 4C4 2.89543 4.89543 2 6 2H11L16 7V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V4Z" />
                      <path d="M11 2V7H16" />
                      <path d="M7 11H13M7 14H11" />
                    </svg>
                  </div>
                  <div>
                    <span className="block font-mono text-[11px] font-bold tracking-wider text-[#FFFFFF]">REQUEST</span>
                    <span className="block font-mono text-[9px] text-[#6B7280] tracking-wide mt-0.5">INGRESS</span>
                  </div>
                </div>

                {/* Stage 2: Retrieve / Hybrid Rank */}
                <div className="bg-[#14161B] border border-[#262833] rounded-[6px] p-3 flex flex-col items-center text-center justify-between min-h-[120px]">
                  <div className="w-8 h-8 rounded-full bg-[#1A1D24] flex items-center justify-center text-[#9CA3AF] mb-2">
                    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 stroke-current" strokeWidth="1.6">
                      <circle cx="9" cy="9" r="6" />
                      <line x1="13.5" y1="13.5" x2="18" y2="18" />
                    </svg>
                  </div>
                  <div>
                    <span className="block font-mono text-[11px] font-bold tracking-wider text-[#FFFFFF]">RETRIEVE</span>
                    <span className="block font-mono text-[9px] text-[#6B7280] tracking-wide mt-0.5">HYBRID RANK</span>
                  </div>
                </div>

                {/* Stage 3: Validate / Schema / Score (Highlighted) */}
                <div className="bg-[#221513] border border-[#C83E1B] rounded-[6px] p-3 flex flex-col items-center text-center justify-between min-h-[120px] shadow-[0_0_15px_rgba(200,62,27,0.18)]">
                  <div className="w-8 h-8 rounded-full bg-[#351915] flex items-center justify-center text-[#C83E1B] mb-2">
                    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 stroke-current" strokeWidth="1.6">
                      <path d="M10 2L3 5V10C3 14.5 6 17.5 10 19C14 17.5 17 14.5 17 10V5L10 2Z" />
                      <path d="M7 10L9 12L13 8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <span className="block font-mono text-[11px] font-bold tracking-wider text-[#FFFFFF]">VALIDATE</span>
                    <span className="block font-mono text-[9px] text-[#C83E1B] font-semibold tracking-wide mt-0.5">SCHEMA / SCORE</span>
                  </div>
                </div>

                {/* Stage 4: Route / Human / Auto */}
                <div className="bg-[#14161B] border border-[#262833] rounded-[6px] p-3 flex flex-col items-center text-center justify-between min-h-[120px]">
                  <div className="w-8 h-8 rounded-full bg-[#1A1D24] flex items-center justify-center text-[#9CA3AF] mb-2">
                    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 stroke-current" strokeWidth="1.6">
                      <circle cx="5" cy="10" r="2.5" />
                      <circle cx="15" cy="5" r="2.5" />
                      <circle cx="15" cy="15" r="2.5" />
                      <path d="M7.5 10H10C11.5 10 12.5 7.5 13.5 6" />
                      <path d="M10 10C11.5 10 12.5 12.5 13.5 14" />
                    </svg>
                  </div>
                  <div>
                    <span className="block font-mono text-[11px] font-bold tracking-wider text-[#FFFFFF]">ROUTE</span>
                    <span className="block font-mono text-[9px] text-[#6B7280] tracking-wide mt-0.5">HUMAN / AUTO</span>
                  </div>
                </div>
              </div>

              {/* Bottom Footer Line inside Dark Panel */}
              <div className="pt-4 mt-5 border-t border-[#222530] text-center font-mono text-[10.5px] tracking-[0.08em] text-[#898E99]">
                AI AGENTS · RAG · EVALUATION · KNOWLEDGE WORKFLOWS
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
