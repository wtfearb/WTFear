'use client';

import React from 'react';
import Link from 'next/link';

const EXPLORE_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Engineering Blueprints', href: '/blueprints' },
  { label: 'Projects & Case Studies', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export function Footer(): React.ReactElement {
  const handleScrollToTop = () => {
    if (typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  return (
    <footer className="w-full bg-[#0C0D10] border-t-[1.5px] border-[#C83E1B] text-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        {/* MAIN 3-COLUMN REGION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0">
          {/* LEFT COLUMN — BRAND IDENTITY (approx 48%) */}
          <div className="lg:col-span-6 lg:pr-12">
            {/* Brand Lockup Row */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="w-4 h-4 bg-[#C83E1B] inline-block shrink-0" aria-hidden="true" />
              <span className="font-sans font-extrabold text-[20px] tracking-[-0.025em] text-[#FFFFFF]">
                WTFearB
              </span>
              <span className="h-4 w-px bg-[#343740] mx-1" aria-hidden="true" />
              <span className="font-sans text-[14px] text-[#B7BBC4]">
                Make “What If” Work.
              </span>
            </div>

            {/* Company Description */}
            <p className="font-sans text-[14.5px] leading-[1.6] text-[#B7BBC4] max-w-md mb-7">
              Software development and practical AI automation for businesses with problems worth
              solving.
            </p>

            {/* Direct Enquiries Row */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#898E99]">
                DIRECT ENQUIRIES
              </span>
              <span className="h-3.5 w-px bg-[#343740]" aria-hidden="true" />
              <a
                href="mailto:wtfearb@gmail.com"
                className="font-mono text-[13.5px] text-[#FFFFFF] hover:text-[#C83E1B] underline underline-offset-4 decoration-[#C83E1B] transition-colors focus-visible:outline-2 focus-visible:outline-[#C83E1B]"
              >
                wtfearb@gmail.com
              </a>
            </div>
          </div>

          {/* MIDDLE COLUMN — EXPLORE (approx 27%) */}
          <div className="lg:col-span-3 lg:px-10 lg:border-l lg:border-[#343740] pt-8 lg:pt-0 border-t border-[#343740] lg:border-t-0">
            <div className="font-mono text-[11.5px] font-bold uppercase tracking-[0.1em] text-[#FFFFFF] mb-5">
              EXPLORE
            </div>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {EXPLORE_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 font-sans text-[14px] text-[#E2E4EC] hover:text-[#C83E1B] transition-colors"
                    >
                      <span>{link.label}</span>
                      <span
                        className="text-[#C83E1B] transition-transform duration-200 motion-safe:group-hover:translate-x-1"
                        aria-hidden="true"
                      >
                        &rarr;
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* RIGHT COLUMN — CONNECT (approx 25%) */}
          <div className="lg:col-span-3 lg:pl-10 lg:border-l lg:border-[#343740] pt-8 lg:pt-0 border-t border-[#343740] lg:border-t-0">
            <div className="font-mono text-[11.5px] font-bold uppercase tracking-[0.1em] text-[#FFFFFF] mb-5">
              CONNECT
            </div>
            <div className="space-y-3.5 mb-6">
              {/* Email Row */}
              <div className="flex items-center gap-3">
                <svg
                  className="w-4 h-4 text-[#C83E1B] shrink-0"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="3" width="12" height="10" rx="1.5" />
                  <path d="M2 5l6 4 6-4" />
                </svg>
                <a
                  href="mailto:wtfearb@gmail.com"
                  className="font-sans text-[14px] text-[#FFFFFF] hover:text-[#C83E1B] underline underline-offset-4 decoration-[#343740] hover:decoration-[#C83E1B] transition-colors break-all"
                >
                  wtfearb@gmail.com
                </a>
              </div>

              {/* LinkedIn Row */}
              <div className="flex items-center gap-3">
                <svg
                  className="w-4 h-4 text-[#C83E1B] shrink-0"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M2 2a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V2zm3.3 3.1a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4zM4.1 6.8h2.4v6.4H4.1V6.8zm4 0h2.3v1c.3-.6 1.1-1.2 2.2-1.2 2.4 0 2.8 1.6 2.8 3.6v3H13V10.5c0-.9 0-2-1.3-2-1.3 0-1.5 1-1.5 2v2.7H8.1V6.8z" />
                </svg>
                <a
                  href="https://www.linkedin.com/company/wtfearb/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[14px] text-[#FFFFFF] hover:text-[#C83E1B] underline underline-offset-4 decoration-[#343740] hover:decoration-[#C83E1B] transition-colors"
                >
                  WTFearB on LinkedIn
                </a>
              </div>
            </div>

            {/* Prominent Orange Text CTA */}
            <div>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 font-sans text-[15px] font-semibold text-[#C83E1B] pb-1 border-b border-[#C83E1B] hover:text-[#E0532E] hover:border-[#E0532E] transition-colors focus-visible:outline-2 focus-visible:outline-[#C83E1B]"
              >
                <span>Start a conversation</span>
                <span
                  className="transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                  aria-hidden="true"
                >
                  &#8599;
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM FOOTER BAR */}
        <div className="mt-12 pt-6 border-t border-[#343740] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="font-mono text-[12px] text-[#898E99]">
            &copy; {new Date().getFullYear()} WTFearB. Make “What If” Work.
          </div>

          <div className="flex items-center gap-4 font-mono text-[12px] text-[#B7BBC4]">
            <a
              href="https://www.linkedin.com/company/wtfearb/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 hover:text-[#C83E1B] transition-colors"
            >
              <span>LinkedIn</span>
              <span
                className="text-[#C83E1B] transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                aria-hidden="true"
              >
                &#8599;
              </span>
            </a>

            <span className="h-3 w-px bg-[#343740]" aria-hidden="true" />

            <button
              type="button"
              onClick={handleScrollToTop}
              className="group inline-flex items-center gap-1.5 hover:text-[#C83E1B] transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <span
                className="text-[#C83E1B] transition-transform duration-200 motion-safe:group-hover:-translate-y-0.5"
                aria-hidden="true"
              >
                &uarr;
              </span>
            </button>
          </div>
        </div>

        {/* Machine-Readable & Feeds (Hidden visually for humans, preserved in DOM for AI search crawlers) */}
        <div className="sr-only" aria-hidden="false">
          <nav aria-label="Machine Feeds">
            <Link href="/llms.txt">/llms.txt (AI Crawler Context)</Link>
            <Link href="/llms-full.txt">/llms-full.txt (Technical Corpus)</Link>
            <Link href="/compare/traditional-dev-agencies">WTFearB vs Traditional Consultancies</Link>
            <Link href="/playbooks/governed-rag-evaluation-harness">
              Playbook: Eliminating Hallucinations in RAG
            </Link>
            <Link href="/sitemap.xml">/sitemap.xml</Link>
            <Link href="/robots.txt">/robots.txt</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
