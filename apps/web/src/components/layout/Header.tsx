'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuditModal } from '../modals/AuditModalProvider';
import { MobileNavDrawer } from './MobileNavDrawer';
import { trackClientEvent } from '../TelemetryTracker';

interface NavItem {
  readonly label: string;
  readonly href: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Engineering Blueprints', href: '/blueprints' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Header(): React.ReactElement {
  const pathname = usePathname();
  const { openModal } = useAuditModal();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleAuditClick = () => {
    trackClientEvent('cta_click', 'Header: Book an Architecture Audit');
    openModal();
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E2E2E8] shadow-[0_1px_3px_rgba(10,10,12,0.02)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left Brand Lockup */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 group py-1"
            aria-label="WTFearB Home"
          >
            {/* Precision Brand Mark */}
            <span
              className="w-4 h-4 bg-[#C83E1B] shrink-0 transition-all duration-200 group-hover:scale-105 group-hover:shadow-[0_0_10px_rgba(200,62,27,0.45)]"
              aria-hidden="true"
            />
            
            {/* Wordmark */}
            <span className="font-sans font-black text-[18px] tracking-[-0.03em] text-[#0A0A0C] transition-colors group-hover:text-[#C83E1B]">
              WTFearB
            </span>

            {/* Divider */}
            <span className="hidden sm:inline-block h-4 w-px bg-[#D5D7E0] mx-0.5" aria-hidden="true" />

            {/* Elevated Brand Tagline Pill */}
            <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[11px] font-medium tracking-tight text-[#3F414A] bg-[#F4F4F6] border border-[#E2E2E8] px-2.5 py-1 rounded-[3px] transition-colors group-hover:border-[#C83E1B]/30">
              <span>Make</span>
              <span className="text-[#C83E1B] font-bold">&ldquo;What If&rdquo;</span>
              <span>Work.</span>
            </span>
          </Link>

          {/* Center Navigation with Active Orange Bottom Bar */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-sans text-[13px] transition-colors relative py-1.5 ${
                    isActive
                      ? 'font-semibold text-[#0A0A0C]'
                      : 'font-medium text-[#5A5D6A] hover:text-[#0A0A0C]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C83E1B]"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Primary CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleAuditClick}
              className="group/cta bg-[#0A0A0C] hover:bg-[#C83E1B] text-white border border-[#0A0A0C] hover:border-[#C83E1B] font-mono text-[12px] font-bold tracking-[0.03em] px-4 py-2.5 inline-flex items-center gap-2 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-[0_4px_16px_rgba(200,62,27,0.25)]"
            >
              <span>Book an Architecture Audit</span>
              <span
                className="inline-block transition-transform duration-200 group-hover/cta:translate-x-0.5"
                aria-hidden="true"
              >
                &rarr;
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="inline-flex lg:hidden p-2 text-[#0A0A0C] border border-[#E2E2E8] hover:bg-[#F9F9FB] transition-colors cursor-pointer"
              aria-expanded={mobileNavOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="font-mono text-xs font-bold">[MENU]</span>
            </button>
          </div>
        </div>
      </header>

      <MobileNavDrawer
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        onOpenAuditModal={openModal}
      />
    </>
  );
}
