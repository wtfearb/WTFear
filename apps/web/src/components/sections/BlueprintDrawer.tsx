'use client';

import React, { useEffect, useRef } from 'react';
import { BLUEPRINT_CATALOG, type BlueprintId } from '@/lib/state/blueprints-machine';

interface BlueprintDrawerProps {
  readonly blueprintId: BlueprintId | null;
  readonly onClose: () => void;
}

export function BlueprintDrawer({ blueprintId, onClose }: BlueprintDrawerProps): React.ReactElement | null {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const blueprint = BLUEPRINT_CATALOG.find((b) => b.id === blueprintId);

  useEffect(() => {
    if (blueprintId) {
      triggerRef.current = document.activeElement as HTMLElement;
      closeBtnRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
          return;
        }

        // Focus trap
        if (e.key === 'Tab' && drawerRef.current) {
          const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length > 0) {
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey && document.activeElement === first) {
              last.focus();
              e.preventDefault();
            } else if (!e.shiftKey && document.activeElement === last) {
              first.focus();
              e.preventDefault();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
        triggerRef.current?.focus();
      };
    }
  }, [blueprintId, onClose]);

  if (!blueprintId || !blueprint) return null;

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-blueprint-title"
        aria-describedby="drawer-blueprint-problem"
        className="w-full max-w-2xl h-full bg-[var(--color-terminal-bg)] text-[var(--color-terminal-fg)] border-l border-[var(--color-terminal-border)] p-6 sm:p-10 flex flex-col justify-between overflow-y-auto shadow-2xl"
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-[var(--color-terminal-border)] pb-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-signal)] font-semibold">
                  {blueprint.badge} // {blueprint.durationLabel}
                </span>
              </div>
              <h2 id="drawer-blueprint-title" className="text-2xl sm:text-3xl font-bold mt-2 text-white">
                {blueprint.title}
              </h2>
            </div>
            <button
              ref={closeBtnRef}
              data-autofocus
              type="button"
              onClick={onClose}
              aria-label="Close blueprint inspection drawer"
              className="p-2 font-mono text-xs border border-[var(--color-terminal-border)] hover:border-[var(--color-accent-signal)] hover:text-white transition-colors"
            >
              [ESC / ✕]
            </button>
          </div>

          {/* Problem Statement */}
          <div className="p-4 border border-[var(--color-terminal-border)] bg-[var(--color-terminal-surface)]">
            <div className="font-mono text-xs uppercase text-[var(--color-terminal-muted)] mb-1 font-semibold">
              Root Architectural Problem
            </div>
            <p id="drawer-blueprint-problem" className="text-sm text-[var(--color-terminal-fg)] leading-relaxed">
              {blueprint.problemStatement}
            </p>
          </div>

          {/* Checklist Steps */}
          <div className="space-y-4">
            <div className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent-signal)] font-bold">
              Production Execution Invariants &amp; Checklist
            </div>
            <div className="space-y-3 font-mono text-xs">
              {blueprint.checklist.map((step) => (
                <div
                  key={step.stepIndex}
                  className="p-4 border border-[var(--color-terminal-border)] bg-[var(--color-terminal-surface)] space-y-2"
                >
                  <div className="flex items-center justify-between text-white font-bold">
                    <span>STEP {step.stepIndex} // {step.title}</span>
                    {step.latencyTarget && (
                      <span className="text-[var(--color-accent-signal)]">{step.latencyTarget}</span>
                    )}
                  </div>
                  <p className="text-[var(--color-terminal-muted)] leading-relaxed">
                    {step.specification}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Gate & Stack */}
          <div className="p-4 border border-[var(--color-terminal-border)] bg-black/40 space-y-3">
            <div>
              <div className="font-mono text-xs uppercase text-[var(--color-terminal-muted)] mb-1">
                CI Verification Gate
              </div>
              <p className="font-mono text-xs text-white">
                {blueprint.verificationGate}
              </p>
            </div>

            <div>
              <div className="font-mono text-xs uppercase text-[var(--color-terminal-muted)] mb-1">
                Target Production Stack
              </div>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {blueprint.stack.map((item) => (
                  <span
                    key={item}
                    className="border border-[var(--color-terminal-border)] px-2 py-0.5 text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 mt-6 border-t border-[var(--color-terminal-border)] flex items-center justify-between">
          <span className="font-mono text-xs text-[var(--color-terminal-muted)]">
            100% GitHub IP Ownership
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 font-mono text-xs border border-[var(--color-terminal-border)] hover:bg-[var(--color-accent-signal)] hover:text-white transition-colors"
          >
            Close Drawer
          </button>
        </div>
      </div>
    </div>
  );
}
