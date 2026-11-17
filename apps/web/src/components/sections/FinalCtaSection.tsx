'use client';

import React from 'react';
import Link from 'next/link';
import { trackClientEvent } from '../TelemetryTracker';

export function FinalCtaSection(): React.ReactElement {
  const handleContactClick = () => {
    trackClientEvent('cta_click', 'Final CTA: Start a Conversation');
  };

  return (
    <section
      id="start-conversation"
      aria-labelledby="final-cta-heading"
      className="py-16 md:py-24 bg-[#F9F9FB] border-t border-[#E2E2E8]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Two-Column Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* LEFT COLUMN — PRIMARY CTA (lg:col-span-7) */}
          <div className="lg:col-span-7">
            {/* Eyebrow Label */}
            <div className="flex items-center gap-3 mb-5">
              <span className="w-5 h-[1.5px] bg-[#C83E1B] shrink-0" aria-hidden="true" />
              <span className="font-mono text-[11.5px] font-bold uppercase tracking-[0.08em] text-[#C83E1B]">
                START A CONVERSATION
              </span>
            </div>

            {/* Headline */}
            <h2
              id="final-cta-heading"
              className="font-sans font-extrabold text-[#0A0A0C] text-[40px] sm:text-[50px] lg:text-[56px] leading-[1.05] tracking-[-0.035em] mb-6"
            >
              Have a complex <br className="hidden sm:inline" />
              problem <span className="text-[#C83E1B]">worth solving?</span>
            </h2>

            {/* Supporting Paragraph */}
            <p className="font-sans text-[16px] sm:text-[17px] leading-[1.6] text-[#3F414A] max-w-xl mb-9">
              Tell us what you’re building, improving or trying to connect. Share the challenge and
              we’ll discuss a practical next step.
            </p>

            {/* Contact Actions Row */}
            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="/contact"
                onClick={handleContactClick}
                className="bg-[#0A0A0C] hover:bg-[#1E2028] text-[#FFFFFF] font-mono text-[13px] font-bold px-7 py-4 rounded-[3px] inline-flex items-center justify-center gap-2.5 transition-colors group/btn focus-visible:outline-2 focus-visible:outline-[#C83E1B]"
              >
                <span>Start a Conversation</span>
                <span
                  className="text-[#C83E1B] group-hover/btn:translate-x-1 transition-transform duration-200"
                  aria-hidden="true"
                >
                  &rarr;
                </span>
              </Link>

              <span
                className="hidden sm:inline-block w-px h-8 bg-[#D5D7E0] shrink-0"
                aria-hidden="true"
              />

              <a
                href="mailto:wtfearb@gmail.com"
                className="font-mono text-[13.5px] font-medium text-[#3F414A] hover:text-[#C83E1B] underline underline-offset-4 decoration-[#9FA3B0] hover:decoration-[#C83E1B] transition-colors focus-visible:outline-2 focus-visible:outline-[#C83E1B]"
              >
                wtfearb@gmail.com
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN — DARK ARCHITECTURAL APPROACH PANEL (lg:col-span-5) */}
          <div className="lg:col-span-5">
            <div className="group relative bg-[#0C0D10] border border-[#1E212A] rounded-[8px] p-7 sm:p-9 text-[#FFFFFF] overflow-hidden shadow-[0_16px_40px_rgba(10,10,12,0.14)]">
              {/* Subtle Background Architectural Contour Lines & Signal Orange Intersection Marker */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 460 340"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <radialGradient id="ctaGlow" cx="85%" cy="75%" r="55%">
                    <stop offset="0%" stopColor="#C83E1B" stopOpacity="0.14" />
                    <stop offset="100%" stopColor="#0C0D10" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect width="460" height="340" fill="url(#ctaGlow)" />
                <path
                  d="M 310 340 C 335 280, 360 230, 410 225 C 440 222, 450 200, 460 170"
                  stroke="#222530"
                  strokeWidth="1"
                />
                <path
                  d="M 365 340 C 385 290, 405 250, 460 245"
                  stroke="#2E201E"
                  strokeWidth="1"
                />
                <line x1="360" y1="118" x2="460" y2="118" stroke="#2C2220" strokeWidth="1" />
                <path
                  d="M 336 340 C 358 275, 376 210, 402 204 C 414 201, 418 192, 418 176 L 418 0"
                  stroke="#C83E1B"
                  strokeOpacity="0.75"
                  strokeWidth="1.4"
                  className="motion-safe:group-hover:translate-x-[-1px] transition-transform duration-500"
                />
                <rect x="413.5" y="113.5" width="9" height="9" fill="#C83E1B" />
              </svg>

              {/* Panel Top Eyebrow */}
              <div className="relative z-10 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#D0D4E0] mb-4">
                THE FIRST STEP
              </div>

              {/* Main Visual Statement */}
              <div className="relative z-10 flex items-center gap-5 mb-7">
                <span className="font-mono text-[52px] sm:text-[60px] font-extrabold leading-none tracking-[-0.04em] text-[#C83E1B]">
                  01
                </span>
                <span className="w-px h-12 bg-[#2C303D] shrink-0" aria-hidden="true" />
                <div className="font-sans text-[22px] sm:text-[25px] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#FFFFFF]">
                  Start with <br />
                  the problem.
                </div>
              </div>

              {/* Three Vertically Arranged Steps */}
              <div className="relative z-10 divide-y divide-[#222530] border-t border-[#222530] border-b border-[#222530]">
                <div className="py-3.5 flex items-center gap-4">
                  <span className="font-mono text-[12px] font-bold text-[#C83E1B] shrink-0">
                    [01]
                  </span>
                  <span className="font-mono text-[12.5px] sm:text-[13px] text-[#E2E4EC]">
                    Understand the context
                  </span>
                </div>
                <div className="py-3.5 flex items-center gap-4">
                  <span className="font-mono text-[12px] font-bold text-[#C83E1B] shrink-0">
                    [02]
                  </span>
                  <span className="font-mono text-[12.5px] sm:text-[13px] text-[#E2E4EC]">
                    Identify the constraint
                  </span>
                </div>
                <div className="py-3.5 flex items-center gap-4">
                  <span className="font-mono text-[12px] font-bold text-[#C83E1B] shrink-0">
                    [03]
                  </span>
                  <span className="font-mono text-[12.5px] sm:text-[13px] text-[#E2E4EC]">
                    Explore the right approach
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. BOTTOM PRINCIPLES STRIP */}
        <div className="mt-14 pt-7 border-t border-[#E2E2E8]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 items-center md:divide-x md:divide-[#D5D7E0]">
            <div className="flex items-center md:justify-start gap-2.5 md:pr-6">
              <span className="font-mono text-[13px] font-bold text-[#C83E1B]" aria-hidden="true">
                //
              </span>
              <span className="font-sans text-[14px] font-extrabold text-[#0A0A0C]">
                Problem-first thinking
              </span>
            </div>

            <div className="flex items-center md:justify-center gap-2.5 md:px-6">
              <span className="font-mono text-[13px] font-bold text-[#C83E1B]" aria-hidden="true">
                //
              </span>
              <span className="font-sans text-[14px] font-extrabold text-[#0A0A0C]">
                Clear scope before commitment
              </span>
            </div>

            <div className="flex items-center md:justify-end gap-2.5 md:pl-6">
              <span className="font-mono text-[13px] font-bold text-[#C83E1B]" aria-hidden="true">
                //
              </span>
              <span className="font-sans text-[14px] font-extrabold text-[#0A0A0C]">
                Thoughtful engineering
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
