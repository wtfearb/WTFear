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
      <header className="sticky top-0 z-40 w-full bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E2E2E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
          {/* Left Brand Lockup - Prominent Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 group py-1"
            aria-label="WTFearB Home"
          >
            {/* Precision Brand Mark */}
            <span
              className="w-4 h-4 sm:w-4.5 sm:h-4.5 bg-[#C83E1B] shrink-0 transition-transform duration-200 group-hover:scale-105"
              aria-hidden="true"
            />
            
            {/* Wordmark Logo */}
            <span className="font-sans font-black text-[21px] sm:text-[23px] tracking-[-0.03em] text-[#0A0A0C] transition-colors group-hover:text-[#C83E1B]">
              WTFearB
            </span>
          </Link>

          {/* Center Navigation with Active Orange Bottom Bar */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-sans text-[13.5px] transition-colors relative py-1.5 ${
                    isActive
                      ? 'font-semibold text-[#0A0A0C]'
                      : 'font-medium text-[#4B4E59] hover:text-[#0A0A0C]'
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
              className="bg-[#0A0A0C] hover:bg-[#1E2028] text-white font-mono text-[12px] font-semibold px-4 py-2.5 inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>Book an Architecture Audit</span>
              <span aria-hidden="true">&rarr;</span>
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
