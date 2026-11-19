'use client';

import React, { useState } from 'react';

type ScenarioType = 'Policy Query' | 'Contract Extraction' | 'Out-of-Scope';

interface ScenarioData {
  readonly prompt: string;
  readonly baseConfidence: number;
  readonly groundedResponse: string;
}

const SCENARIOS: Record<ScenarioType, ScenarioData> = {
  'Policy Query': {
    prompt:
      'What are the data retention limits and export protocols for European customer partitions under GDPR Article 17?',
    baseConfidence: 0.91,
    groundedResponse:
      'Under European tenant partition policy (GDPR Art. 17), data retention is hard-limited to 90 days post-termination with automated cryptographic erasure. Tenant export manifests must be signed via Ed25519 and verified against the audit ledger.',
  },
  'Contract Extraction': {
    prompt:
      'Extract liability cap multiplier, indemnification carve-outs, and governing jurisdiction from MSA Addendum #4.',
    baseConfidence: 0.89,
    groundedResponse:
      'Under Section 11.2 of MSA Addendum #4, aggregate liability is capped at 2.0x twelve-month trailing contract fees. Indemnification carve-outs apply exclusively to willful misconduct and verified IP infringement. Governing law is Delaware.',
  },
  'Out-of-Scope': {
    prompt:
      'Generate marketing copy for a viral social campaign and predict crypto market valuations for Q3.',
    baseConfidence: 0.42,
    groundedResponse:
      'Marketing strategy and speculative asset projections are outside governed enterprise scope. No authorized tenant knowledge base covers market forecasting.',
  },
};

export function ServicesGovernanceWorkbench(): React.ReactElement {
  const [activeScenario, setActiveScenario] = useState<ScenarioType>('Policy Query');
  const [citationConfidence, setCitationConfidence] = useState<number>(0.85);
  const [abstentionGate, setAbstentionGate] = useState<number>(0.7);

  const scenario = SCENARIOS[activeScenario];
  const isVerified =
    activeScenario !== 'Out-of-Scope' &&
    scenario.baseConfidence >= citationConfidence &&
    abstentionGate <= 0.85;

  return (
    <section className="bg-[#0C0D10] border-t-2 border-t-[#C83E1B] text-[#FFFFFF] py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B] block mb-2">
            07 // LIVE GOVERNANCE WORKBENCH
          </span>
          <h2 className="font-sans font-extrabold text-[28px] sm:text-[34px] tracking-[-0.025em] text-[#FFFFFF] mb-3">
            Trust is not a prompt. It is a system.
          </h2>
          <p className="font-sans text-[14px] sm:text-[15px] leading-relaxed text-[#A1A5B2] max-w-2xl">
            Inspect how WTFearB enforces citation thresholds and schema validation before an AI response reaches a user.
          </p>
        </div>

        {/* 2-Column Workbench Console */}
        <div className="bg-[#14161B] border border-[#242731] rounded-[2px] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-xs">
          {/* Left Column: Interactive Scenario & Sliders */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Scenario Tabs */}
              <div
                className="flex items-center gap-6 border-b border-[#242731] pb-3 mb-5"
                role="tablist"
                aria-label="Governance Scenarios"
              >
                {(['Policy Query', 'Contract Extraction', 'Out-of-Scope'] as const).map(
                  (tab) => {
                    const isActive = activeScenario === tab;
                    return (
                      <button
                        key={tab}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveScenario(tab)}
                        className={`font-sans text-[13px] font-semibold pb-2 -mb-3 transition-colors cursor-pointer ${
                          isActive
                            ? 'text-[#FFFFFF] border-b-2 border-b-[#C83E1B]'
                            : 'text-[#717684] hover:text-[#FFFFFF]'
                        }`}
                      >
                        {tab}
                      </button>
                    );
                  }
                )}
              </div>

              {/* Query Preview Box */}
              <div className="bg-[#0C0D10] border border-[#242731] rounded-[2px] p-4 mb-6">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#5A5D6A] block mb-1.5">
                  INGRESS INQUIRY PAYLOAD
                </span>
                <p className="font-mono text-[12px] leading-relaxed text-[#E2E2E8]">
                  &ldquo;{scenario.prompt}&rdquo;
                </p>
              </div>
            </div>

            {/* Sliders Area */}
            <div className="space-y-4 pt-2">
              {/* Slider 1: Citation Confidence */}
              <div>
                <div className="flex justify-between items-center mb-1.5 font-mono text-[11px]">
                  <span className="text-[#A1A5B2] uppercase tracking-wider">
                    Citation Confidence
                  </span>
                  <span className="font-bold text-[#FFFFFF]">
                    {citationConfidence.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.50"
                  max="0.98"
                  step="0.01"
                  value={citationConfidence}
                  onChange={(e) => setCitationConfidence(parseFloat(e.target.value))}
                  className="w-full accent-[#C83E1B] bg-[#242731] h-1.5 rounded-[1px] cursor-pointer"
                  aria-label="Citation Confidence Threshold"
                />
              </div>

              {/* Slider 2: Abstention Gate */}
              <div>
                <div className="flex justify-between items-center mb-1.5 font-mono text-[11px]">
                  <span className="text-[#A1A5B2] uppercase tracking-wider">
                    Abstention Gate
                  </span>
                  <span className="font-bold text-[#FFFFFF]">
                    {abstentionGate.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.50"
                  max="0.98"
                  step="0.01"
                  value={abstentionGate}
                  onChange={(e) => setAbstentionGate(parseFloat(e.target.value))}
                  className="w-full accent-[#C83E1B] bg-[#242731] h-1.5 rounded-[1px] cursor-pointer"
                  aria-label="Abstention Gate Threshold"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Live Verdict & Grounded Output */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Verdict Header */}
              <div className="mb-4">
                {isVerified ? (
                  <div className="flex items-center gap-2 font-mono text-[12px] font-bold text-[#22C55E]">
                    <svg
                      className="w-4 h-4 text-[#22C55E] shrink-0"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="8" cy="8" r="7" />
                      <path d="M5 8l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>VERIFIED &bull; 3 CITATIONS</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 font-mono text-[12px] font-bold text-[#C83E1B]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C83E1B] inline-block shrink-0" />
                    <span>ABSTAINED &bull; CONFIDENCE BELOW THRESHOLD</span>
                  </div>
                )}
              </div>

              {/* Output Box */}
              <div className="bg-[#0C0D10] border border-[#242731] rounded-[2px] p-5">
                <p className="font-sans text-[13.5px] sm:text-[14px] leading-relaxed text-[#E2E2E8]">
                  {isVerified ? (
                    scenario.groundedResponse
                  ) : (
                    <span className="text-[#A1A5B2] font-mono text-[12px] leading-relaxed block">
                      [Deterministic Abstention] Response generation halted. Grounding confidence falls below verified enterprise policy threshold ({citationConfidence.toFixed(2)}). Inquiry routed to human engineering pod.
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Footer Trace */}
            <div className="mt-6 pt-4 border-t border-[#242731] flex items-center justify-between font-mono text-[11px] text-[#5A5D6A]">
              <span>trace_id: wtfearb_audit_01</span>
              <span>schema: valid</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
