import React from 'react';
import Link from 'next/link';

export function ProjectsCtaSection(): React.ReactElement {
  return (
    <section className="py-16 md:py-20 bg-[#F4F5F8] border-b border-[#E2E2E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-l-[4px] border-[#C83E1B] pl-6 sm:pl-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT: Eyebrow & Headline */}
          <div className="lg:col-span-7">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B] block mb-3">
              START A CONVERSATION
            </span>
            <h2 className="font-sans text-[34px] sm:text-[42px] lg:text-[46px] font-extrabold tracking-[-0.03em] text-[#0A0A0C] leading-[1.08]">
              Have a complex problem<br />worth solving?
            </h2>
          </div>

          {/* RIGHT: Description & Actions */}
          <div className="lg:col-span-5">
            <p className="font-sans text-[15px] leading-[1.6] text-[#3F414A] mb-6">
              Tell us what you&apos;re building, improving or trying to connect. We&apos;ll discuss the problem and a practical next step.
            </p>

            <div className="flex flex-wrap items-center gap-5">
              <Link
                href="/contact"
                className="bg-[#C83E1B] hover:bg-[#A83214] text-white font-mono text-[12.5px] font-bold px-6 py-3.5 rounded-[3px] inline-flex items-center gap-2 transition-colors shadow-xs"
              >
                <span>Discuss a Project</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>

              <a
                href="mailto:wtfearb@gmail.com"
                className="font-mono text-[13px] font-bold text-[#0A0A0C] hover:text-[#C83E1B] transition-colors underline decoration-[#D5D7E0] hover:decoration-[#C83E1B]"
              >
                wtfearb@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
