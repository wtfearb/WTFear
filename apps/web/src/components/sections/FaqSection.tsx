'use client';

import React, { useState } from 'react';

interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

const FAQS: readonly FaqItem[] = [
  {
    question: 'What is WTFearB and what makes your engineering approach different?',
    answer:
      'WTFearB is an engineering partner for AI, web and data-intensive systems. We combine architecture rigor, deterministic delivery and production-grade engineering to turn complex ideas into reliable, maintainable systems.',
  },
  {
    question: 'Who are your ideal clients and engagement types?',
    answer:
      'We partner with startup founders, CTOs, and growing enterprises building new digital products, modernizing legacy software, or deploying practical AI workflows—ranging from focused architecture reviews and engineering sprints to full-scope MVP builds and ongoing support.',
  },
  {
    question: 'How do you ensure AI agents and RAG systems do not hallucinate or take harmful actions?',
    answer:
      'We design AI workflows around hybrid retrieval (combining vector similarity with lexical search), strict schema validation, confidence and grounding thresholds, and clear human-in-the-loop escalation paths rather than relying on unverified raw prompts.',
  },
  {
    question: 'Can you build an entire SaaS platform from scratch?',
    answer:
      'Yes. We design and engineer complete web applications and multi-tenant B2B platforms—covering data modeling, authentication, role-based access control, API integrations, responsive interfaces, and automated end-to-end testing.',
  },
  {
    question: 'How do you handle legacy codebases or modernization?',
    answer:
      'We start by mapping your existing architecture, data flows, and operational bottlenecks, then introduce modular API boundaries, reliable background pipelines, and phased migrations so improvements ship safely without disrupting active operations.',
  },
  {
    question: 'What is your delivery cadence and how are milestones verified?',
    answer:
      'Every engagement follows a structured sequence—discovery, architecture, implementation, and deployment—with transparent repository access, regular working demonstrations, automated quality checks, and clear acceptance criteria agreed upfront.',
  },
  {
    question: 'Who owns the intellectual property and code?',
    answer:
      'Projects are structured for clean handover with clear source-code access, architectural documentation, and operational runbooks. Specific intellectual-property and ownership terms are defined clearly in each engagement agreement.',
  },
  {
    question: 'How quickly can we get started and what is the first step?',
    answer:
      'The first step is a focused 15-minute architecture review or project discussion where we examine your technical bottleneck, clarify constraints, and outline a practical engineering approach before any commercial commitment.',
  },
];

export function FaqSection(): React.ReactElement {
  // Controlled index: reveals answer on hover/focus, collapses on mouse leave
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-16 md:py-24 border-b border-[#E2E2E8] bg-[#F7F7F9]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 1. SECTION HEADER */}
        <div className="mb-10">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B] mb-3">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2
            id="faq-heading"
            className="font-sans font-extrabold text-[#0A0A0C] text-[36px] sm:text-[44px] lg:text-[50px] leading-[1.06] tracking-[-0.03em] mb-3.5"
          >
            Direct Technical Answers for Engineering Leaders.
          </h2>
          <p className="font-sans text-[15px] sm:text-[16px] leading-[1.6] text-[#3F414A] max-w-3xl">
            Transparent answers on our engineering methodology, governance gates, IP ownership and
            engagement.
          </p>
        </div>

        {/* 2. ACCORDION CONTAINER */}
        <div className="bg-[#FFFFFF] border border-[#E2E2E8] rounded-[8px] divide-y divide-[#ECEEF3] overflow-hidden shadow-[0_2px_12px_rgba(10,10,12,0.03)]">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const numberBadge = `[${String(index + 1).padStart(2, '0')}]`;

            return (
              <div
                key={faq.question}
                onMouseEnter={() => setOpenIndex(index)}
                onMouseLeave={() => setOpenIndex(null)}
                className={`relative group transition-colors duration-250 ease-out ${
                  isOpen ? 'bg-[#FDF6F2]' : 'bg-[#FFFFFF] hover:bg-[#FDF3ED]'
                }`}
              >
                {/* Vertical Accent Bar: 4px solid when open; 3px subtle highlight on collapsed hover */}
                <div
                  aria-hidden="true"
                  className={`absolute left-0 top-0 bottom-0 z-10 transition-all duration-200 ease-out pointer-events-none ${
                    isOpen
                      ? 'w-[4px] bg-[#C83E1B] opacity-100'
                      : 'w-[3px] bg-[#C83E1B] opacity-0 group-hover:opacity-60'
                  }`}
                />

                {/* Top Question Row Button */}
                <button
                  type="button"
                  id={`faq-question-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => toggleItem(index)}
                  onFocus={() => setOpenIndex(index)}
                  onBlur={() => setOpenIndex(null)}
                  className="w-full text-left flex items-center justify-between gap-4 py-5 px-6 sm:px-7 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C83E1B] focus-visible:outline-offset-[-2px]"
                >
                  <div className="flex items-start sm:items-center gap-3 min-w-0 pr-2">
                    <span className="font-mono text-[13.5px] sm:text-[14px] font-bold text-[#C83E1B] w-11 shrink-0 select-none">
                      {numberBadge}
                    </span>
                    <span
                      className={`font-mono text-[14px] sm:text-[15px] font-bold text-[#0A0A0C] tracking-[-0.01em] transition-transform duration-200 ease-out ${
                        !isOpen ? 'group-hover:translate-x-[2px]' : ''
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>

                  {/* Toggle Icon: Minus sign when open; Plus sign with 90deg rotate + scale on collapsed hover */}
                  <div className="w-5 h-5 flex items-center justify-center shrink-0">
                    {isOpen ? (
                      <svg
                        className="w-4 h-4 text-[#C83E1B] transition-transform duration-300 ease-out"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        aria-hidden="true"
                      >
                        <line x1="3" y1="8" x2="13" y2="8" />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 text-[#C83E1B] transition-transform duration-200 ease-out group-hover:rotate-90 group-hover:scale-110"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        aria-hidden="true"
                      >
                        <line x1="8" y1="3" x2="8" y2="13" />
                        <line x1="3" y1="8" x2="13" y2="8" />
                      </svg>
                    )}
                  </div>
                </button>

                {/* Smooth 60fps GPU Accordion Height Transition */}
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 sm:px-7 pb-6 pt-0.5">
                      <div className="pl-11 pr-4 sm:pr-12">
                        <p className="font-sans text-[14px] sm:text-[14.5px] leading-[1.65] text-[#3F414A] max-w-4xl">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Structured FAQPage JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
