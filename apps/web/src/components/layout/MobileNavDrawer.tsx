'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

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
  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs md:hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        className="w-4/5 max-w-sm h-full bg-[var(--color-surface-elevated)] border-l border-[var(--color-border-hairline)] p-6 flex flex-col justify-between"
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--color-border-hairline)] pb-4">
            <span className="font-mono text-sm font-bold text-[var(--color-ink-primary)]">
              wtfear / nav
            </span>
            <button
              type="button"
              onClick={onClose}
              className="font-mono text-xs p-1 hover:text-[var(--color-accent-signal)]"
            >
              [CLOSE ✕]
            </button>
          </div>

          <nav className="flex flex-col space-y-4 font-mono text-sm">
            <Link
              href="#blueprints"
              onClick={onClose}
              className="text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)]"
            >
              01 // Blueprints
            </Link>
            <Link
              href="#sandbox"
              onClick={onClose}
              className="text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)]"
            >
              02 // Live Sandbox
            </Link>
            <Link
              href="#pricing"
              onClick={onClose}
              className="text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)]"
            >
              03 // Pricing &amp; Scope
            </Link>
            <Link
              href="#stack"
              onClick={onClose}
              className="text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)]"
            >
              04 // Tech Stack
            </Link>
            <Link
              href="#faq"
              onClick={onClose}
              className="text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)]"
            >
              05 // FAQ
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-[var(--color-border-hairline)] space-y-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenAuditModal();
            }}
            className="w-full bg-[var(--color-accent-signal)] text-white font-mono text-xs font-semibold py-3 px-4 hover:bg-[var(--color-accent-signal-hover)]"
          >
            BOOK 15-MIN AUDIT ($0) &rarr;
          </button>
          <div className="text-center font-mono text-xs text-[var(--color-ink-muted)]">
            hello@wtfear.agency
          </div>
        </div>
      </div>
    </div>
  );
}
