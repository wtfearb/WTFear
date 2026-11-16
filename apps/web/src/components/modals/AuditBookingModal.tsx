'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { AuditSubmissionResponse, TargetTimeline } from '@wtfear/contracts';
import { trackClientEvent, getClientSessionToken } from '../TelemetryTracker';

interface AuditBookingModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export function AuditBookingModal({ isOpen, onClose }: AuditBookingModalProps): React.ReactElement | null {
  const [email, setEmail] = useState('');
  const [companyDomain, setCompanyDomain] = useState('');
  const [systemBottleneck, setSystemBottleneck] = useState('');
  const [targetTimeline, setTargetTimeline] = useState<TargetTimeline>('immediate');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<AuditSubmissionResponse | null>(null);

  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Focus trap & escape key handler
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
      closeBtnRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const sessionId = getClientSessionToken();
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sessionId,
        },
        body: JSON.stringify({
          workEmail: email,
          email,
          companyDomain: companyDomain || (email.includes('@') ? email.split('@')[1] : ''),
          bottleneckDescription: systemBottleneck,
          systemBottleneck,
          targetTimeline,
          sessionId,
        }),
      });

      const data = (await res.json()) as AuditSubmissionResponse;

      if (!res.ok) {
        throw new Error(data.message || 'Audit intake failed. Please try again.');
      }

      setSubmissionResult(data);
      trackClientEvent('cta_click', 'Audit Form Submitted', {
        leadTier: data.leadTier,
        leadScore: data.leadScore,
      });
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="audit-modal-title"
        className="w-full max-w-xl border border-[var(--color-border-hairline)] bg-[var(--color-surface-elevated)] p-6 sm:p-8 shadow-2xl transition-all"
      >
        <div className="flex items-center justify-between border-b border-[var(--color-border-hairline)] pb-4 mb-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-signal)] font-semibold">
              Zero-Sales Technical Audit
            </span>
            <h2 id="audit-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-ink-primary)] mt-1">
              Book 15-Min Architecture Audit
            </h2>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 font-mono text-sm hover:text-[var(--color-accent-signal)] focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus)]"
          >
            [ESC / ✕]
          </button>
        </div>

        {submissionResult ? (
          <div className="space-y-4">
            <div className="p-4 bg-[var(--color-status-pass-bg)] border border-[var(--color-status-pass-border)] text-[var(--color-status-pass-fg)] font-mono text-xs">
              <div className="font-bold text-sm mb-1">AUDIT INTAKE CONFIRMED [200 OK]</div>
              <p>Lead ID: {submissionResult.leadId}</p>
              <p>Routing Tier: {submissionResult.leadTier} (Score: {submissionResult.leadScore}/100)</p>
            </div>
            <p className="text-sm text-[var(--color-ink-secondary)]">
              {submissionResult.message}
            </p>
            <div className="pt-2">
              <a
                href={submissionResult.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center bg-[var(--color-accent-signal)] text-white font-mono text-xs font-semibold py-3 px-4 hover:bg-[var(--color-accent-signal-hover)] transition-colors"
              >
                SELECT AUDIT TIMESLOT ON CAL.COM &rarr;
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="audit-email" className="block font-mono text-xs uppercase text-[var(--color-ink-muted)] mb-1">
                Work Email <span className="text-[var(--color-accent-signal)]">*</span>
              </label>
              <input
                id="audit-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="architect@company.com"
                className="w-full border border-[var(--color-border-hairline)] p-2.5 font-mono text-xs bg-[var(--color-canvas)] text-[var(--color-ink-primary)] focus:outline-none focus:border-[var(--color-border-focus)]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="audit-domain" className="block font-mono text-xs uppercase text-[var(--color-ink-muted)] mb-1">
                  Company Domain
                </label>
                <input
                  id="audit-domain"
                  type="text"
                  value={companyDomain}
                  onChange={(e) => setCompanyDomain(e.target.value)}
                  placeholder="company.com"
                  className="w-full border border-[var(--color-border-hairline)] p-2.5 font-mono text-xs bg-[var(--color-canvas)] text-[var(--color-ink-primary)] focus:outline-none focus:border-[var(--color-border-focus)]"
                />
              </div>

              <div>
                <label htmlFor="audit-timeline" className="block font-mono text-xs uppercase text-[var(--color-ink-muted)] mb-1">
                  Target Timeline
                </label>
                <select
                  id="audit-timeline"
                  value={targetTimeline}
                  onChange={(e) => setTargetTimeline(e.target.value as TargetTimeline)}
                  className="w-full border border-[var(--color-border-hairline)] p-2.5 font-mono text-xs bg-[var(--color-canvas)] text-[var(--color-ink-primary)] focus:outline-none focus:border-[var(--color-border-focus)]"
                >
                  <option value="immediate">Immediate (&lt; 2 Weeks)</option>
                  <option value="month">Within 30 Days</option>
                  <option value="exploring">Exploring Architecture</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="audit-bottleneck" className="block font-mono text-xs uppercase text-[var(--color-ink-muted)] mb-1">
                Primary System Bottleneck <span className="text-[var(--color-accent-signal)]">* (Min 15 chars)</span>
              </label>
              <textarea
                id="audit-bottleneck"
                required
                minLength={15}
                rows={3}
                value={systemBottleneck}
                onChange={(e) => setSystemBottleneck(e.target.value)}
                placeholder="E.g., RAG support agent hallucinates custom SLA addenda; need deterministic Pydantic citation gates..."
                className="w-full border border-[var(--color-border-hairline)] p-2.5 font-mono text-xs bg-[var(--color-canvas)] text-[var(--color-ink-primary)] focus:outline-none focus:border-[var(--color-border-focus)]"
              />
            </div>

            {errorMsg && (
              <div className="p-3 bg-[var(--color-status-fail-bg)] border border-[var(--color-status-fail-border)] text-[var(--color-status-fail-fg)] font-mono text-xs">
                {errorMsg}
              </div>
            )}

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 font-mono text-xs text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] border border-transparent"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 font-mono text-xs font-semibold bg-[var(--color-ink-primary)] text-white hover:bg-[var(--color-accent-signal)] transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'ANALYZING & SCORING...' : 'DISPATCH AUDIT REQUEST →'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
