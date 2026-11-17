'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { trackClientEvent } from '../TelemetryTracker';

interface EngagementOption {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

interface ComplexityOption {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

const ENGAGEMENT_OPTIONS: readonly EngagementOption[] = [
  {
    id: 'architecture-review',
    title: 'Architecture Review',
    description: 'A focused review to diagnose risks and define a clear technical direction.',
  },
  {
    id: 'focused-sprint',
    title: 'Focused Engineering Sprint',
    description: 'Time-boxed engineering work to solve an agreed problem end-to-end.',
  },
  {
    id: 'fixed-scope-mvp',
    title: 'Fixed-Scope MVP',
    description: 'A clearly scoped product build designed for real-world validation.',
  },
  {
    id: 'ongoing-support',
    title: 'Ongoing Engineering Support',
    description: 'Continuity for iteration, enhancements and operational needs.',
  },
];

const COMPLEXITY_OPTIONS: readonly ComplexityOption[] = [
  {
    id: 'web-api',
    title: 'Web & API',
    description: 'Web applications, backend services and API integrations.',
  },
  {
    id: 'ai-retrieval',
    title: 'AI & Retrieval',
    description: 'AI agents, knowledge retrieval and document workflows.',
  },
  {
    id: 'distributed-systems',
    title: 'Distributed Systems',
    description: 'Event-driven architecture, system integrations and distributed processing.',
  },
];

interface EngagementSectionProps {
  readonly hideCommercialFigures?: boolean;
}

export function EngagementSection({
  hideCommercialFigures = false,
}: EngagementSectionProps): React.ReactElement {
  const [selectedEngagementId, setSelectedEngagementId] = useState<string>('focused-sprint');
  const [selectedComplexityId, setSelectedComplexityId] = useState<string>('ai-retrieval');
  const [includeValidation, setIncludeValidation] = useState<boolean>(true);

  const selectedEngagement = useMemo(
    () =>
      ENGAGEMENT_OPTIONS.find((opt) => opt.id === selectedEngagementId) ||
      ENGAGEMENT_OPTIONS[1],
    [selectedEngagementId]
  );

  const selectedComplexity = useMemo(
    () =>
      COMPLEXITY_OPTIONS.find((opt) => opt.id === selectedComplexityId) ||
      COMPLEXITY_OPTIONS[1],
    [selectedComplexityId]
  );

  const handleSelectEngagement = (id: string) => {
    setSelectedEngagementId(id);
    const item = ENGAGEMENT_OPTIONS.find((opt) => opt.id === id);
    if (item) {
      trackClientEvent('calculator_change', `Engagement: ${item.title}`, {
        engagement: item.title,
        complexity: selectedComplexity.title,
        validation: includeValidation ? 'Included' : 'Not included',
      });
    }
  };

  const handleSelectComplexity = (id: string) => {
    setSelectedComplexityId(id);
    const item = COMPLEXITY_OPTIONS.find((opt) => opt.id === id);
    if (item) {
      trackClientEvent('calculator_change', `Complexity: ${item.title}`, {
        engagement: selectedEngagement.title,
        complexity: item.title,
        validation: includeValidation ? 'Included' : 'Not included',
      });
    }
  };

  const handleToggleValidation = (checked: boolean) => {
    setIncludeValidation(checked);
    trackClientEvent('calculator_change', `Validation: ${checked ? 'Included' : 'Not included'}`, {
      engagement: selectedEngagement.title,
      complexity: selectedComplexity.title,
      validation: checked ? 'Included' : 'Not included',
    });
  };

  const contactUrl = useMemo(() => {
    const params = new URLSearchParams({
      engagement: selectedEngagement.title,
      complexity: selectedComplexity.title,
      validation: includeValidation ? 'Included' : 'Not included',
    });
    return `/contact?${params.toString()}`;
  }, [selectedEngagement.title, selectedComplexity.title, includeValidation]);

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="py-16 md:py-24 border-b border-[#E2E2E8] bg-[#F7F7F9]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 1. Section Introduction Header */}
        <div className="mb-10 pb-6 border-b border-[#E2E2E8]">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-4 h-[1.5px] bg-[#C83E1B] shrink-0" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em]">
              <span className="text-[#C83E1B]">DETERMINISTIC PRICING</span>{' '}
              <span className="text-[#5A5D6A]">& SCOPE</span>
            </span>
          </div>

          <h2
            id="pricing-heading"
            className="font-sans font-extrabold text-[#0A0A0C] text-[36px] sm:text-[44px] lg:text-[50px] leading-[1.06] tracking-[-0.03em] mb-4"
          >
            Engineering That Moves With <br className="hidden sm:inline" />
            Your <span className="text-[#C83E1B]">Ambition.</span>
          </h2>
          <p className="font-sans text-[15px] sm:text-[16px] leading-[1.6] text-[#3F414A] max-w-2xl">
            Shape an engagement around the problem, system complexity and level of validation.
          </p>
        </div>

        {/* 2. Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (lg:col-span-7) */}
          <div className="lg:col-span-7">
            {/* GROUP 01: CHOOSE AN ENGAGEMENT */}
            <div>
              <div className="font-mono text-[12px] font-bold uppercase tracking-[0.06em] mb-3.5">
                <span className="text-[#C83E1B]">01 //</span>{' '}
                <span className="text-[#0A0A0C]">CHOOSE AN ENGAGEMENT</span>
              </div>

              <div role="radiogroup" aria-label="Choose an engagement" className="space-y-2">
                {ENGAGEMENT_OPTIONS.map((option) => {
                  const isSelected = selectedEngagementId === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => handleSelectEngagement(option.id)}
                      className={`w-full text-left flex flex-col sm:flex-row sm:items-center px-4 py-3.5 rounded-[6px] transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C83E1B] ${
                        isSelected
                          ? 'bg-[#FDF5F2] border border-[#E07A5F] shadow-[0_1px_3px_rgba(200,62,27,0.06)]'
                          : 'bg-transparent border border-transparent border-b-[#EAECEF] hover:bg-[#FFFFFF] hover:border-[#E2E2E8]'
                      }`}
                    >
                      {/* Left Portion: Radio Circle + Title */}
                      <div className="sm:w-[235px] shrink-0 flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-[1.5px] border-[#C83E1B] bg-[#FFFFFF]'
                              : 'border-[1.5px] border-[#9FA3B0] bg-[#FFFFFF]'
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-[#C83E1B]" />}
                        </div>
                        <span className="font-sans text-[13.5px] font-bold text-[#0A0A0C]">
                          {option.title}
                        </span>
                      </div>

                      {/* Middle Hairline Divider */}
                      <div className="hidden sm:block w-px h-4 bg-[#D5D7E0] mx-4 shrink-0" />

                      {/* Right Portion: Description */}
                      <div className="font-sans text-[13px] text-[#3F414A] leading-[1.45] mt-1 sm:mt-0 pl-7 sm:pl-0">
                        {option.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* GROUP 02: SYSTEM COMPLEXITY */}
            <div className="mt-8 pt-6 border-t border-[#E2E2E8]">
              <div className="font-mono text-[12px] font-bold uppercase tracking-[0.06em] mb-3.5">
                <span className="text-[#C83E1B]">02 //</span>{' '}
                <span className="text-[#0A0A0C]">SYSTEM COMPLEXITY</span>
              </div>

              <div
                role="radiogroup"
                aria-label="System complexity"
                className="grid grid-cols-1 sm:grid-cols-3 gap-3"
              >
                {COMPLEXITY_OPTIONS.map((option) => {
                  const isSelected = selectedComplexityId === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => handleSelectComplexity(option.id)}
                      className={`w-full text-left px-4 py-3 rounded-[6px] border transition-all duration-200 cursor-pointer flex flex-col justify-start focus-visible:outline-2 focus-visible:outline-[#C83E1B] ${
                        isSelected
                          ? 'bg-[#FDF5F2] border-[#E07A5F] shadow-[0_1px_3px_rgba(200,62,27,0.06)]'
                          : 'bg-[#FFFFFF] border-[#E2E2E8] hover:border-[#C83E1B]/50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-[1.5px] border-[#C83E1B] bg-[#FFFFFF]'
                              : 'border-[1.5px] border-[#9FA3B0] bg-[#FFFFFF]'
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-[#C83E1B]" />}
                        </div>
                        <span className="font-sans text-[13.5px] font-bold text-[#0A0A0C]">
                          {option.title}
                        </span>
                      </div>
                      <p className="font-sans text-[11.5px] leading-[1.4] text-[#5A5D6A] mt-1.5 pl-6.5">
                        {option.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* GROUP 03: VALIDATION SCOPE */}
            <div className="mt-8 pt-6 border-t border-[#E2E2E8]">
              <div className="font-mono text-[12px] font-bold uppercase tracking-[0.06em] mb-3.5">
                <span className="text-[#C83E1B]">03 //</span>{' '}
                <span className="text-[#0A0A0C]">VALIDATION SCOPE</span>
              </div>

              <label className="w-full flex flex-col sm:flex-row sm:items-center px-4 py-3.5 rounded-[6px] bg-[#FFFFFF] border border-[#E2E2E8] hover:border-[#C83E1B]/50 transition-all duration-200 cursor-pointer select-none">
                <div className="sm:w-[255px] shrink-0 flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={includeValidation}
                    onChange={(e) => handleToggleValidation(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-4.5 h-4.5 rounded-[3px] flex items-center justify-center shrink-0 transition-colors ${
                      includeValidation
                        ? 'bg-[#C83E1B] border border-[#C83E1B] text-white'
                        : 'bg-white border-[1.5px] border-[#9FA3B0]'
                    }`}
                  >
                    {includeValidation && (
                      <svg
                        className="w-3 h-3 text-white"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="2.5 6 4.8 8.5 9.5 3.5" />
                      </svg>
                    )}
                  </div>
                  <span className="font-sans text-[13.5px] font-bold text-[#0A0A0C]">
                    Include evaluation and QA planning
                  </span>
                </div>

                {/* Middle Hairline Divider */}
                <div className="hidden sm:block w-px h-6 bg-[#D5D7E0] mx-4 shrink-0" />

                {/* Right Portion: Supporting Description */}
                <div className="font-sans text-[12.5px] leading-[1.45] text-[#5A5D6A] mt-1.5 sm:mt-0 pl-7.5 sm:pl-0">
                  Add a structured validation approach, including test scenarios, quality checks and
                  acceptance criteria.
                </div>
              </label>
            </div>
          </div>

          {/* Right Column — YOUR ENGAGEMENT SNAPSHOT (lg:col-span-5) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-[#FFFFFF] border border-[#E2E2E8] rounded-[8px] p-6 sm:p-7 shadow-[0_6px_24px_rgba(10,10,12,0.04)]">
              {/* Snapshot Header */}
              <div className="flex items-center gap-3.5 pb-5 border-b border-[#ECEEF3]">
                <div className="w-9 h-9 rounded-[6px] bg-[#FDF3EF] border border-[#F5D0C2] flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-[#C83E1B]"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="10,3 17,7 10,11 3,7" fill="#FCECE6" />
                    <polyline points="3,10.5 10,14.5 17,10.5" />
                    <polyline points="3,14 10,18 17,14" />
                  </svg>
                </div>
                <h3 className="font-mono text-[13px] font-extrabold uppercase tracking-[0.06em] text-[#0A0A0C]">
                  YOUR ENGAGEMENT SNAPSHOT
                </h3>
              </div>

              {/* Three Aligned Summary Rows */}
              <div className="divide-y divide-[#ECEEF3] border-b border-[#ECEEF3]">
                {/* ROW 01: ENGAGEMENT MODEL */}
                <div className="py-4 flex items-center justify-between gap-4">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-[#5A5D6A]">
                    ENGAGEMENT MODEL
                  </span>
                  <span className="font-sans text-[14.5px] font-extrabold text-[#0A0A0C] text-right">
                    {selectedEngagement.title}
                  </span>
                </div>

                {/* ROW 02: SYSTEM PROFILE */}
                <div className="py-4 flex items-center justify-between gap-4">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-[#5A5D6A]">
                    SYSTEM PROFILE
                  </span>
                  <span className="font-sans text-[14.5px] font-extrabold text-[#0A0A0C] text-right">
                    {selectedComplexity.title}
                  </span>
                </div>

                {/* ROW 03: VALIDATION SCOPE */}
                <div className="py-4 flex items-center justify-between gap-4">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-[#5A5D6A]">
                    VALIDATION SCOPE
                  </span>
                  {includeValidation ? (
                    <span className="inline-flex items-center gap-1.5 font-sans text-[14.5px] font-extrabold text-[#0A0A0C]">
                      <span>Included</span>
                      <svg
                        className="w-4 h-4 text-[#C83E1B]"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="8" cy="8" r="6.2" />
                        <path d="M5.5 8.2L7.2 9.9L10.6 6.3" />
                      </svg>
                    </span>
                  ) : (
                    <span className="font-sans text-[14.5px] font-semibold text-[#5A5D6A]">
                      Not included
                    </span>
                  )}
                </div>
              </div>

              {/* Investment Information Panel */}
              <div className="my-6 px-4 py-3.5 rounded-[6px] bg-[#FDF4F0] border border-[#F3D5C9] flex items-center gap-3.5">
                <div className="w-5 h-5 text-[#C83E1B] shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="w-px h-7 bg-[#E8BBAE] shrink-0" />
                <p className="font-sans text-[13px] font-bold leading-[1.45] text-[#0A0A0C]">
                  Investment confirmed after discovery and agreed scope.
                </p>
              </div>

              {/* Primary CTA Button */}
              <Link
                href={contactUrl}
                onClick={() => {
                  trackClientEvent('cta_click', 'Discuss This Scope', {
                    engagement: selectedEngagement.title,
                    complexity: selectedComplexity.title,
                    validation: includeValidation ? 'Included' : 'Not included',
                  });
                }}
                className="w-full bg-[#0A0A0C] hover:bg-[#1E2028] text-[#FFFFFF] font-mono text-[13px] font-bold py-3.5 px-6 rounded-[5px] inline-flex items-center justify-center gap-2 transition-colors group/btn"
              >
                <span>Discuss This Scope</span>
                <span
                  className="transition-transform duration-200 group-hover/btn:translate-x-1"
                  aria-hidden="true"
                >
                  &rarr;
                </span>
              </Link>

              {/* Sub-CTA text */}
              <div className="mt-3 text-center font-sans text-[11.5px] text-[#5A5D6A]">
                No commitment until scope is agreed.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
