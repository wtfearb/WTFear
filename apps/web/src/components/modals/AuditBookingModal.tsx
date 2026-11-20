'use client';

import React, { useState, useEffect, useRef } from 'react';
import { trackClientEvent, getClientSessionToken } from '../TelemetryTracker';

interface AuditBookingModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

const AUDIT_FOCUS_AREAS = [
  'Governed AI & RAG',
  'Core Systems & SaaS',
  'Backend & Latency',
  'Full-Stack Audit',
] as const;

type AuditFocusArea = (typeof AUDIT_FOCUS_AREAS)[number];

const SYSTEM_STAGES = [
  'Production Scaling & Bottleneck Resolution',
  '0-to-1 Architecture & Technical Scoping',
  'Governed AI / RAG Pipeline Evaluation',
  'Legacy System Modernization Audit',
] as const;

type SystemStage = (typeof SYSTEM_STAGES)[number];

interface AuditSubmissionData {
  readonly ok: boolean;
  readonly referenceId: string;
  readonly leadId?: string;
  readonly leadTier?: string;
  readonly bookingUrl?: string;
  readonly emailDispatched?: boolean;
  readonly message?: string;
}

export function AuditBookingModal({
  isOpen,
  onClose,
}: AuditBookingModalProps): React.ReactElement | null {
  const [focusArea, setFocusArea] = useState<AuditFocusArea>('Governed AI & RAG');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [systemStage, setSystemStage] = useState<SystemStage>(
    'Production Scaling & Bottleneck Resolution'
  );
  const [systemBottleneck, setSystemBottleneck] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<AuditSubmissionData | null>(null);

  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Focus trap, body overflow lock & escape key handler
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

  // Reset form when modal reopens
  useEffect(() => {
    if (isOpen) {
      setErrorMsg(null);
      setSubmissionResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const trimmedBottleneck = systemBottleneck.trim();
    if (trimmedBottleneck.length < 15) {
      setErrorMsg('Please describe your system bottleneck in at least 15 characters.');
      return;
    }

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
          source: 'modal',
          focusArea,
          workEmail: email.trim(),
          email: email.trim(),
          companyDomain: organization.trim() || (email.includes('@') ? email.split('@')[1] : ''),
          systemStage,
          bottleneckDescription: trimmedBottleneck,
          systemBottleneck: trimmedBottleneck,
          targetTimeline: 'immediate',
          sessionId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Audit intake failed. Please try again.');
      }

      const ref =
        data.referenceId ||
        (data.leadId ? `WTFB-2026-${String(data.leadId).slice(0, 4).toUpperCase()}` : `WTFB-${Date.now()}`);

      const result: AuditSubmissionData = {
        ok: true,
        referenceId: ref,
        leadId: data.leadId,
        leadTier: data.leadTier,
        bookingUrl: data.bookingUrl,
        emailDispatched: Boolean(data.emailDispatched),
        message: data.message,
      };

      setSubmissionResult(result);
      trackClientEvent('cta_click', 'Audit Form Submitted', {
        focusArea,
        systemStage,
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
      className="fixed inset-0 z-50 bg-[#0C0D10]/75 flex items-center justify-center p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="audit-modal-title"
        className="w-full max-w-[640px] bg-[#FFFFFF] border border-[#E2E2E8] border-t-2 border-t-[#C83E1B] rounded-[2px] overflow-hidden my-auto"
      >
        {/* =========================================================================
            1. MODAL HEADER
           ========================================================================= */}
        <div className="bg-[#FFFFFF] px-6 sm:px-8 py-6 border-b border-[#E2E2E8] flex items-start justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#C83E1B]">
              &bull; PRINCIPAL ARCHITECTURE REVIEW
            </div>
            <h2
              id="audit-modal-title"
              className="font-sans font-bold text-2xl tracking-[-0.03em] text-[#0A0A0C] mt-1"
            >
              Book an Architecture Audit
            </h2>
            <p className="font-sans text-[13px] text-[#3F414A] mt-1">
              Direct technical evaluation with principal systems and AI engineers.
            </p>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="border border-[#E2E2E8] hover:border-[#0A0A0C] rounded-[2px] px-3 py-1.5 font-mono text-[11px] text-[#0A0A0C] whitespace-nowrap shrink-0 transition-colors cursor-pointer"
          >
            [ESC / &times;]
          </button>
        </div>

        {/* =========================================================================
            2. COMPACT OBSIDIAN AUDIT SCOPE STRIP
           ========================================================================= */}
        <div className="bg-[#0C0D10] grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#242731]">
          <div className="px-5 py-3.5 font-mono text-[11px] flex items-center gap-2">
            <span className="text-[#C83E1B] font-bold">01 //</span>
            <span className="text-[#FFFFFF]">Topology &amp; Stack Review</span>
          </div>
          <div className="px-5 py-3.5 font-mono text-[11px] flex items-center gap-2">
            <span className="text-[#C83E1B] font-bold">02 //</span>
            <span className="text-[#FFFFFF]">Bottleneck &amp; Risk Audit</span>
          </div>
          <div className="px-5 py-3.5 font-mono text-[11px] flex items-center gap-2">
            <span className="text-[#C83E1B] font-bold">03 //</span>
            <span className="text-[#FFFFFF]">Written Action Brief</span>
          </div>
        </div>

        {/* =========================================================================
            3. MODAL BODY (CONFIRMATION OR FORM)
           ========================================================================= */}
        {submissionResult ? (
          <div className="bg-[#FFFFFF] px-6 sm:px-8 py-8 space-y-6">
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B]">
              <span className="w-2 h-2 rounded-full bg-[#C83E1B]" />
              INTAKE TRANSMISSION RECORDED [200 OK]
            </div>

            <div>
              <h3 className="font-sans font-bold text-xl text-[#0A0A0C] tracking-tight">
                Audit Request Dispatched
              </h3>
              <p className="font-sans text-[13.5px] text-[#3F414A] mt-1 leading-relaxed">
                Your system scope has been routed directly to our principal engineers. A written
                evaluation and scoping plan will be delivered without sales intermediaries.
              </p>
            </div>

            <div className="p-4 rounded-[2px] border border-[#E2E2E8] bg-[#F9F9FB] space-y-2.5 font-mono text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-[#E2E2E8]">
                <span className="text-[#717684]">REFERENCE ID:</span>
                <span className="font-bold text-[#0A0A0C]">{submissionResult.referenceId}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-[#E2E2E8]">
                <span className="text-[#717684]">AUDIT FOCUS:</span>
                <span className="font-bold text-[#C83E1B]">{focusArea}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-[#E2E2E8]">
                <span className="text-[#717684]">SYSTEM STAGE:</span>
                <span className="font-bold text-[#0A0A0C]">{systemStage}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#717684]">REGISTERED INBOX:</span>
                <span className="font-bold text-[#0A0A0C]">{email}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              {submissionResult.bookingUrl && (
                <a
                  href={submissionResult.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-[#0A0A0C] hover:bg-[#181A20] text-[#FFFFFF] rounded-[2px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] transition-colors"
                >
                  Select Audit Timeslot &rarr;
                </a>
              )}
              <a
                href={`mailto:wtfearb@gmail.com?subject=${encodeURIComponent(
                  `WTFearB Audit Inquiry [REF: ${submissionResult.referenceId}]`
                )}`}
                className="flex-1 inline-flex items-center justify-center px-4 py-3 border border-[#E2E2E8] hover:border-[#0A0A0C] text-[#0A0A0C] rounded-[2px] font-mono text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors"
              >
                Open Direct Email Thread &rarr;
              </a>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-3 text-xs font-medium text-[#3F414A] hover:text-[#0A0A0C] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="bg-[#FFFFFF] px-6 sm:px-8 py-6 space-y-5">
              {/* Section A — Audit Focus Selector */}
              <div>
                <label className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#3F414A] block">
                  AUDIT FOCUS AREA
                </label>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {AUDIT_FOCUS_AREAS.map((area) => {
                    const isSelected = focusArea === area;
                    return (
                      <button
                        key={area}
                        type="button"
                        onClick={() => setFocusArea(area)}
                        className={
                          isSelected
                            ? 'bg-[#0A0A0C] text-[#FFFFFF] border border-[#0A0A0C] rounded-[2px] px-3 py-2.5 text-[12px] font-medium flex items-center gap-2 cursor-pointer text-left transition-colors'
                            : 'bg-[#FFFFFF] text-[#0A0A0C] border border-[#E2E2E8] hover:border-[#0A0A0C] rounded-[2px] px-3 py-2.5 text-[12px] font-medium flex items-center gap-2 cursor-pointer text-left transition-colors'
                        }
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            isSelected ? 'bg-[#C83E1B]' : 'bg-[#E2E2E8]'
                          }`}
                        />
                        <span>{area}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section B — Two-Column Input Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="modal-audit-email"
                    className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#3F414A] block"
                  >
                    EMAIL <span className="text-[#C83E1B]">*</span>
                  </label>
                  <input
                    id="modal-audit-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="mt-1.5 w-full h-10 px-3 bg-white border border-[#E2E2E8] focus:border-[#0A0A0C] focus:outline-none rounded-[2px] text-xs text-[#0A0A0C]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="modal-audit-domain"
                    className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#3F414A] block"
                  >
                    ORGANIZATION / SYSTEM URL
                  </label>
                  <input
                    id="modal-audit-domain"
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="company.com"
                    className="mt-1.5 w-full h-10 px-3 bg-white border border-[#E2E2E8] focus:border-[#0A0A0C] focus:outline-none rounded-[2px] text-xs text-[#0A0A0C]"
                  />
                </div>
              </div>

              {/* Section C — System Stage Select */}
              <div>
                <label
                  htmlFor="modal-audit-stage"
                  className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#3F414A] block"
                >
                  SYSTEM STAGE
                </label>
                <select
                  id="modal-audit-stage"
                  value={systemStage}
                  onChange={(e) => setSystemStage(e.target.value as SystemStage)}
                  className="mt-1.5 w-full h-10 px-3 bg-white border border-[#E2E2E8] focus:border-[#0A0A0C] focus:outline-none rounded-[2px] text-xs font-medium text-[#0A0A0C]"
                >
                  {SYSTEM_STAGES.map((stage) => (
                    <option key={stage} value={stage}>
                      {stage}
                    </option>
                  ))}
                </select>
              </div>

              {/* Section D — Primary System Bottleneck Textarea */}
              <div>
                <label
                  htmlFor="modal-audit-bottleneck"
                  className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#3F414A] block"
                >
                  PRIMARY SYSTEM BOTTLENECK <span className="text-[#C83E1B]">*</span>
                </label>
                <textarea
                  id="modal-audit-bottleneck"
                  required
                  rows={3}
                  value={systemBottleneck}
                  onChange={(e) => setSystemBottleneck(e.target.value)}
                  placeholder="Describe your current architecture, latency or retrieval bottlenecks, or the system you need audited..."
                  className="mt-1.5 w-full px-3 py-2 bg-white border border-[#E2E2E8] focus:border-[#0A0A0C] focus:outline-none rounded-[2px] text-xs text-[#0A0A0C] resize-none"
                />
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 font-mono text-xs rounded-[2px]">
                  {errorMsg}
                </div>
              )}
            </div>

            {/* =========================================================================
                4. MODAL FOOTER ACTION BAR
               ========================================================================= */}
            <div className="bg-[#F9F9FB] px-6 sm:px-8 py-4 border-t border-[#E2E2E8] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#5A5D6A]">
                DIRECT DISPATCH TO PRINCIPAL ENGINEERS
              </span>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs font-medium text-[#3F414A] hover:text-[#0A0A0C] px-2 py-2 cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 px-5 bg-[#0A0A0C] hover:bg-[#181A20] text-[#FFFFFF] rounded-[2px] font-mono text-[11px] font-bold uppercase tracking-[0.1em] inline-flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-60 whitespace-nowrap shrink-0"
                >
                  <span className="whitespace-nowrap">{isSubmitting ? 'DISPATCHING...' : 'DISPATCH AUDIT REQUEST'}</span>
                  <span className="text-[#FF6B47] text-sm leading-none">&rarr;</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
