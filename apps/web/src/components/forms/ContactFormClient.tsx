'use client';

import React, { useState } from 'react';
import { trackClientEvent } from '../TelemetryTracker';

export interface ContactFormClientProps {
  readonly initialEngagement?: string;
  readonly initialComplexity?: string;
  readonly initialValidation?: string;
  readonly initialIntent?: string;
  readonly initialTrack?: string;
}

const ENGAGEMENT_TRACKS = [
  'Governed AI Systems',
  'Custom B2B SaaS',
  'Workflow Automation',
  'Architecture Audit',
] as const;

type EngagementTrack = (typeof ENGAGEMENT_TRACKS)[number];

export function ContactFormClient({
  initialEngagement = '',
  initialComplexity = '',
  initialValidation = '',
  initialIntent = '',
  initialTrack = '',
}: ContactFormClientProps): React.ReactElement {
  const hasScopePrefill = Boolean(initialEngagement || initialComplexity || initialValidation);

  const resolveInitialTrack = (): EngagementTrack => {
    if (initialTrack && (ENGAGEMENT_TRACKS as readonly string[]).includes(initialTrack)) {
      return initialTrack as EngagementTrack;
    }
    if (initialIntent.toLowerCase() === 'audit') {
      return 'Architecture Audit';
    }
    if (initialComplexity.toLowerCase().includes('distributed')) {
      return 'Custom B2B SaaS';
    }
    return 'Governed AI Systems';
  };

  const [selectedTrack, setSelectedTrack] = useState<EngagementTrack>(resolveInitialTrack);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [scopeDescription, setScopeDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const sessionId =
        typeof window !== 'undefined'
          ? localStorage.getItem('wtfear_session_id') || `sess_${Date.now()}`
          : `sess_${Date.now()}`;

      const resolvedBottleneck = scopeDescription.trim();
      if (resolvedBottleneck.length < 15) {
        throw new Error('Please describe your technical scope in at least 15 characters.');
      }

      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sessionId,
        },
        body: JSON.stringify({
          workEmail: email.trim(),
          email: email.trim(),
          companyDomain: organization.trim() || (email.includes('@') ? email.split('@')[1] : ''),
          bottleneckDescription: `[Track: ${selectedTrack}${name ? ` | Client: ${name}` : ''}] ${resolvedBottleneck}`,
          systemBottleneck: resolvedBottleneck,
          targetTimeline: selectedTrack === 'Architecture Audit' ? 'immediate' : 'within_month',
          calculatorSnapshotJson: hasScopePrefill
            ? {
                engagement: initialEngagement,
                complexity: initialComplexity,
                validation: initialValidation,
                track: selectedTrack,
              }
            : {
                track: selectedTrack,
              },
          source: 'contact',
          metadata: {
            name: name.trim(),
            organization: organization.trim(),
            engagementTrack: selectedTrack,
            initialEngagement: initialEngagement || undefined,
            initialComplexity: initialComplexity || undefined,
            initialValidation: initialValidation || undefined,
            initialIntent: initialIntent || undefined,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || data.error || 'Failed to submit technical brief.');
      }

      const ref =
        (data.referenceId as string) ||
        (data.leadId ? `WTFB-2026-${(data.leadId as string).slice(0, 4).toUpperCase()}` : `WTFB-${Date.now()}`);
      setSubmissionId(ref);
      setIsSuccess(true);

      trackClientEvent('cta_click', 'Technical Brief Transmitted', {
        track: selectedTrack,
        hasScopePrefill,
      });
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setSubmissionId('');
    setScopeDescription('');
  };

  if (isSuccess) {
    const mailtoSubject = encodeURIComponent(`WTFearB Technical Brief [REF: ${submissionId}]`);
    const mailtoBody = encodeURIComponent(
      `Hello WTFearB Engineering Team,\n\nI recently submitted Technical Brief [REF: ${submissionId}] for ${selectedTrack}.\n\nAdditional notes:\n`
    );

    return (
      <div className="py-8 sm:py-10 text-left">
        <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B] mb-2">
          <span className="w-2 h-2 rounded-full bg-[#C83E1B]" />
          INTAKE TRANSMISSION RECORDED
        </div>
        <h3 className="font-sans text-[22px] sm:text-[26px] font-extrabold tracking-[-0.02em] text-[#0A0A0C] mb-3">
          Technical Brief Transmitted
        </h3>
        <p className="font-sans text-[14px] sm:text-[15px] leading-relaxed text-[#3F414A] mb-6">
          Your system scope has been routed directly to our principal product and AI engineers. We review problem statements, data boundaries, and feasibility without sales intermediaries.
        </p>

        <div className="p-4 rounded-[4px] border border-[#E2E2E8] bg-[#F9F9FB] space-y-2.5 font-mono text-xs mb-6">
          <div className="flex justify-between items-center pb-2 border-b border-[#E2E2E8]">
            <span className="text-[#717684]">REFERENCE ID:</span>
            <span className="font-bold text-[#0A0A0C]">{submissionId}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-[#E2E2E8]">
            <span className="text-[#717684]">ENGAGEMENT TRACK:</span>
            <span className="font-bold text-[#C83E1B]">{selectedTrack}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#717684]">REGISTERED INBOX:</span>
            <span className="font-bold text-[#0A0A0C]">{email}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href={`mailto:wtfearb@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`}
            className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-[#0A0A0C] hover:bg-[#181A20] text-[#FFFFFF] rounded-[2px] font-mono text-[12px] font-bold uppercase tracking-[0.08em] transition-colors"
          >
            Open Direct Email Thread &rarr;
          </a>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-3 border border-[#E2E2E8] hover:border-[#0A0A0C] text-[#0A0A0C] rounded-[2px] font-mono text-[12px] font-semibold transition-colors cursor-pointer"
          >
            Submit Another Brief
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="intake-form">
      {/* Eyebrow */}
      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B] block mb-1.5">
        01 // PROJECT &amp; ARCHITECTURE INTAKE
      </span>

      {/* Heading */}
      <h2 className="font-sans text-[24px] sm:text-[26px] font-extrabold tracking-[-0.02em] text-[#0A0A0C] mb-6">
        Send a Technical Brief
      </h2>

      {/* Configured Engagement Snapshot (if coming from Section 07) */}
      {hasScopePrefill && (
        <div className="mb-6 p-4 rounded-[4px] border border-[#F3D5C9] bg-[#FDF4F0]">
          <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#C83E1B] mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B]" />
            CONFIGURED ENGAGEMENT SNAPSHOT
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs">
            <div>
              <span className="text-[#8E95A5] text-[10px] uppercase block">ENGAGEMENT MODEL</span>
              <span className="font-bold text-[#0A0A0C]">{initialEngagement || 'Custom'}</span>
            </div>
            <div>
              <span className="text-[#8E95A5] text-[10px] uppercase block">SYSTEM PROFILE</span>
              <span className="font-bold text-[#0A0A0C]">{initialComplexity || 'Custom'}</span>
            </div>
            <div>
              <span className="text-[#8E95A5] text-[10px] uppercase block">VALIDATION SCOPE</span>
              <span className="font-bold text-[#0A0A0C]">{initialValidation || 'Not included'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Engagement Track Selector */}
      <div className="mb-6">
        <label className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#3F414A] block mb-2.5">
          ENGAGEMENT TRACK
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {ENGAGEMENT_TRACKS.map((track) => {
            const isSelected = selectedTrack === track;
            return (
              <button
                key={track}
                type="button"
                onClick={() => setSelectedTrack(track)}
                className={
                  isSelected
                    ? 'bg-[#0A0A0C] text-[#FFFFFF] border border-[#0A0A0C] rounded-[2px] px-3 py-2.5 font-sans text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center'
                    : 'bg-[#FFFFFF] text-[#0A0A0C] border border-[#E2E2E8] hover:border-[#0A0A0C] rounded-[2px] px-3 py-2.5 font-sans text-[12px] font-medium flex items-center justify-center transition-colors cursor-pointer text-center'
                }
              >
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B] inline-block shrink-0" />
                )}
                <span>{track}</span>
              </button>
            );
          })}
        </div>
      </div>

      {errorMessage && (
        <div className="mb-6 p-3 border border-red-300 bg-red-50 text-red-800 text-xs font-mono">
          {errorMessage}
        </div>
      )}

      {/* Main Intake Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Row 1: Name & Work Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="contact-name"
              className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#3F414A] block mb-2"
            >
              YOUR NAME
            </label>
            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Morgan"
              className="w-full bg-[#FFFFFF] border border-[#E2E2E8] focus:border-[#0A0A0C] focus:outline-none rounded-[2px] px-3.5 py-2.5 font-sans text-[14px] text-[#0A0A0C] placeholder:text-[#8E92A0] transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#3F414A] block mb-2"
            >
              EMAIL <span className="text-[#C83E1B]">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full bg-[#FFFFFF] border border-[#E2E2E8] focus:border-[#0A0A0C] focus:outline-none rounded-[2px] px-3.5 py-2.5 font-sans text-[14px] text-[#0A0A0C] placeholder:text-[#8E92A0] transition-colors"
            />
          </div>
        </div>

        {/* Row 2: Organization / URL */}
        <div>
          <label
            htmlFor="contact-org"
            className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#3F414A] block mb-2"
          >
            ORGANIZATION / SYSTEM URL (OPTIONAL)
          </label>
          <input
            id="contact-org"
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            placeholder="company.com"
            className="w-full bg-[#FFFFFF] border border-[#E2E2E8] focus:border-[#0A0A0C] focus:outline-none rounded-[2px] px-3.5 py-2.5 font-sans text-[14px] text-[#0A0A0C] placeholder:text-[#8E92A0] transition-colors"
          />
        </div>

        {/* Row 3: System Scope & Bottleneck */}
        <div>
          <label
            htmlFor="contact-scope"
            className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#3F414A] block mb-2"
          >
            SYSTEM SCOPE &amp; TECHNICAL BOTTLENECK <span className="text-[#C83E1B]">*</span>
          </label>
          <textarea
            id="contact-scope"
            required
            rows={5}
            value={scopeDescription}
            onChange={(e) => setScopeDescription(e.target.value)}
            placeholder="Describe the system you are building, current infrastructure constraints, or desired outcomes..."
            className="w-full bg-[#FFFFFF] border border-[#E2E2E8] focus:border-[#0A0A0C] focus:outline-none rounded-[2px] px-3.5 py-2.5 font-sans text-[14px] text-[#0A0A0C] placeholder:text-[#8E92A0] transition-colors resize-y"
          />
        </div>

        {/* Submit CTA Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-[#0A0A0C] hover:bg-[#181A20] text-[#FFFFFF] rounded-[2px] font-mono text-[12px] font-bold uppercase tracking-[0.12em] flex items-center justify-center gap-2 transition-colors cursor-pointer group disabled:opacity-50"
        >
          <span>{isSubmitting ? 'TRANSMITTING BRIEF...' : 'TRANSMIT TECHNICAL BRIEF'}</span>
          <span className="text-[#C83E1B] group-hover:translate-x-1 transition-transform">
            &rarr;
          </span>
        </button>
      </form>
    </div>
  );
}
