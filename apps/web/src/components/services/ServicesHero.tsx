import React from 'react';

const ANCHOR_LINKS = [
  { label: 'AI & RAG', href: '#ai-engineering' },
  { label: 'Custom Software', href: '#custom-software' },
  { label: 'SaaS & Portals', href: '#saas-b2b' },
  { label: 'Distributed Systems', href: '#backend-distributed' },
  { label: 'Workflow Automation', href: '#workflow-automation' },
  { label: 'Technical Strategy', href: '#architecture-consulting' },
] as const;

export function ServicesHero(): React.ReactElement {
  return (
    <section className="bg-[#F9F9FB] pt-14 pb-10 border-b border-[#E2E2E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#C83E1B]">
            ENGINEERING SERVICES
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-sans font-extrabold text-[#0A0A0C] text-[38px] sm:text-[46px] lg:text-[52px] leading-[1.06] tracking-[-0.03em] mb-4">
          Disciplines We Own &amp; Deliver.
        </h1>

        {/* Supporting Description */}
        <p className="font-sans text-[16px] sm:text-[17px] leading-[1.6] text-[#3F414A] max-w-2xl mb-8">
          Software, AI and systems engineering shaped around real business problems.
        </p>

        {/* Compact Text-Based Anchor Navigation Bar */}
        <nav
          aria-label="Services index"
          className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-5 border-t border-[#E2E2E8] font-mono text-[12px] text-[#5A5D6A]"
        >
          {ANCHOR_LINKS.map((link, idx) => (
            <React.Fragment key={link.href}>
              {idx > 0 && <span className="text-[#C4C7D0]" aria-hidden="true">|</span>}
              <a
                href={link.href}
                className="hover:text-[#C83E1B] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C83E1B] rounded-[2px]"
              >
                {link.label}
              </a>
            </React.Fragment>
          ))}
        </nav>
      </div>
    </section>
  );
}
