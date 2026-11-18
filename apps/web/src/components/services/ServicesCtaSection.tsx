import React from 'react';
import Link from 'next/link';

export function ServicesCtaSection(): React.ReactElement {
  return (
    <section className="py-16 md:py-20 bg-[#FFFFFF] border-b border-[#E2E2E8] text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-sans text-[30px] sm:text-[38px] font-extrabold tracking-[-0.03em] text-[#0A0A0C] mb-4">
          Have a Complex System to Build?
        </h2>

        <p className="font-sans text-[15.5px] leading-[1.6] text-[#3F414A] max-w-xl mx-auto mb-8">
          Tell us what you&apos;re trying to solve. We&apos;ll discuss the problem, constraints and a practical next step.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-7 py-3.5 bg-[#0A0A0C] hover:bg-[#1E2028] text-white font-mono text-[13px] font-bold rounded-[4px] transition-colors shadow-xs"
          >
            Discuss Your Project &rarr;
          </Link>
          <Link
            href="/blueprints"
            className="inline-flex items-center justify-center px-6 py-3.5 bg-[#FFFFFF] hover:bg-[#F3F4F7] text-[#0A0A0C] border border-[#D5D7E0] font-mono text-[13px] font-semibold rounded-[4px] transition-colors"
          >
            Explore Engineering Blueprints &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
