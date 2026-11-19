'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { trackClientEvent } from '../TelemetryTracker';

interface MobileNavDrawerProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onOpenAuditModal: () => void;
}

export function MobileNavDrawer({
  isOpen,
  onClose,
  onOpenAuditModal,
}: MobileNavDrawerProps): React.ReactElement | null {
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
      closeBtnRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };

      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
        triggerRef.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs lg:hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        className="w-4/5 max-w-sm h-full bg-[var(--color-surface-pure)] border-l border-[var(--color-border-hairline)] p-6 flex flex-col justify-between shadow-2xl"
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--color-border-hairline)] pb-4">
            <Link href="/" onClick={onClose} className="flex items-center">
              <img
                src="/brand/wtfearb-wordmark-light.svg"
                alt="WTFearB"
                className="h-6 w-auto block"
              />
            </Link>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              className="font-mono text-xs px-2 py-1 border border-[var(--color-border-hairline)] text-[var(--color-ink-secondary)] hover:text-[var(--color-accent-signal)] hover:border-[var(--color-accent-signal)] transition-colors"
              aria-label="Close navigation drawer"
            >
              [ESC / &times;]
            </button>
          </div>

          <nav className="flex flex-col space-y-3 font-mono text-sm">
            {[
              { href: '/', label: '01 // Home' },
              { href: '/services', label: '02 // Services' },
              { href: '/blueprints', label: '03 // Engineering Blueprints' },
              { href: '/projects', label: '04 // Projects' },
              { href: '/about', label: '05 // About' },
              { href: '/contact', label: '06 // Contact' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="py-1 text-[var(--color-ink-secondary)] hover:text-[var(--color-accent-signal)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-[var(--color-border-hairline)] space-y-4">
          <button
            type="button"
            onClick={() => {
              onClose();
              trackClientEvent('cta_click', 'Mobile Nav: Book an Architecture Audit');
              onOpenAuditModal();
            }}
            className="w-full bg-[var(--color-ink-primary)] text-white font-mono text-xs font-semibold py-3 px-4 hover:bg-[var(--color-accent-signal)] transition-colors"
          >
            Book an Architecture Audit &rarr;
          </button>
          <div className="text-center font-mono text-xs text-[var(--color-ink-muted)]">
            wtfearb@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
}
