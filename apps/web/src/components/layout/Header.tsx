'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuditModal } from '../modals/AuditModalProvider';
import { MobileNavDrawer } from './MobileNavDrawer';
import { trackClientEvent } from '../TelemetryTracker';

export function Header(): React.ReactElement {
  const { openModal } = useAuditModal();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleAuditClick = () => {
    trackClientEvent('cta_click', 'Header: Book an Architecture Audit');
    openModal();
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border-hairline)] bg-[var(--color-canvas)]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[var(--max-w-editorial)] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-mono text-base font-bold tracking-tight text-[var(--color-ink-primary)] hover:text-[var(--color-accent-signal)] transition-colors"
            >
              <span className="inline-block h-2.5 w-2.5 bg-[var(--color-accent-signal)]" aria-hidden="true" />
              <span>WTFearB</span>
              <span className="hidden sm:inline-block text-[var(--color-ink-muted)] font-normal text-xs pl-1 border-l border-[var(--color-border-hairline)]">
                Make &ldquo;What If&rdquo; Work.
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-6 font-mono text-xs text-[var(--color-ink-secondary)]" aria-label="Main Navigation">
              <Link href="/" className="hover:text-[var(--color-ink-primary)] transition-colors">
                Home
              </Link>
              <Link href="/services" className="hover:text-[var(--color-ink-primary)] transition-colors">
                Services
              </Link>
              <Link href="/blueprints" className="hover:text-[var(--color-ink-primary)] transition-colors">
                Engineering Blueprints
              </Link>
              <Link href="/projects" className="hover:text-[var(--color-ink-primary)] transition-colors">
                Projects
              </Link>
              <Link href="/about" className="hover:text-[var(--color-ink-primary)] transition-colors">
                About
              </Link>
              <Link href="/contact" className="hover:text-[var(--color-ink-primary)] transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleAuditClick}
              className="hidden sm:inline-flex items-center justify-center border border-[var(--color-ink-primary)] bg-[var(--color-ink-primary)] px-4 py-2 font-mono text-xs font-semibold text-white hover:bg-[var(--color-accent-signal)] hover:border-[var(--color-accent-signal)] transition-colors"
            >
              Book an Architecture Audit &rarr;
            </button>

            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="inline-flex lg:hidden p-2 text-[var(--color-ink-primary)] border border-[var(--color-border-hairline)]"
              aria-label="Open mobile navigation"
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
