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
      <header className="sticky top-0 z-40 w-full bg-[#FFFFFF]/95 backdrop-blur-sm border-b border-[#E2E2E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left Brand Lockup */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <span
              className="w-3.5 h-3.5 bg-[#C83E1B] inline-block shrink-0 transition-transform group-hover:scale-105"
              aria-hidden="true"
            />
            <span className="font-sans font-extrabold text-[16px] tracking-[-0.02em] text-[#0A0A0C]">
              WTFearB
            </span>
            <span className="hidden sm:inline-block h-4 w-px bg-[#E2E2E8] mx-1.5" aria-hidden="true" />
            <span className="hidden sm:inline-block font-sans text-[12px] text-[#5A5D6A]">
              Make &ldquo;What If&rdquo; Work.
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
                      : 'font-medium text-[#3F414A] hover:text-[#0A0A0C]'
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
              className="inline-flex lg:hidden p-2 text-[#0A0A0C] border border-[#E2E2E8] hover:bg-[#F9F9FB] transition-colors"
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
