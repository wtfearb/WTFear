import React from 'react';
import Link from 'next/link';

interface CapabilityItem {
  readonly id: string;
  readonly index: string;
  readonly title: string;
  readonly problemSolved: string;
  readonly typicalApplications: readonly string[];
  readonly stack: readonly string[];
  readonly blueprintLink?: string;
  readonly serviceLink: string;
}

const ALL_CAPABILITIES: readonly CapabilityItem[] = [
  {
    id: 'ai-engineering',
    index: '01',
    title: 'AI Engineering & RAG Systems',
    problemSolved:
      'Uncontrolled LLMs hallucinating responses, taking unverified actions, or leaking proprietary context in customer-facing and mission-critical workflows.',
    typicalApplications: [
      'Autonomous customer support triage & routing',
      'Contract clause extraction & risk evaluation',
      'Internal knowledge base retrieval & code search',
      'Multi-modal automated invoice & document processing',
    ],
    stack: ['Python 3.12', 'FastAPI', 'pgvector HNSW', 'BM25 RRF', 'Pydantic v2', 'LangChain'],
    blueprintLink: '/blueprints/ai-triage',
    serviceLink: '/services#ai-engineering',
  },
  {
    id: 'custom-software',
    index: '02',
    title: 'Custom Software Development',
    problemSolved:
      'Off-the-shelf software failing to match specific operational workflows, or bloated agency builds saddled with severe technical debt and slow maintenance cycles.',
    typicalApplications: [
      'Tailored internal operations consoles & ERP bridges',
      'Proprietary algorithmic pricing & trading backends',
      'Field telemetry & logistics coordination tools',
      'Custom customer onboarding & verification portals',
    ],
    stack: ['TypeScript 5.7', 'Next.js 15', 'Python', 'PostgreSQL 16', 'Docker', 'Tailwind CSS v4'],
    serviceLink: '/services#custom-software',
  },
  {
    id: 'saas-b2b',
    index: '03',
    title: 'SaaS & B2B Applications',
    problemSolved:
      'Slow client-side rendering (LCP > 3.5s), weak tenant data boundary separation, and complex subscription/entitlement enforcement hurdles.',
    typicalApplications: [
      'Multi-tenant enterprise SaaS portals with subdomain routing',
      'Granular RBAC workspace entitlement management',
      'Usage-metered Stripe billing & credit checkout',
      'Customer analytics & team audit logging dashboards',
    ],
    stack: ['Next.js 15 (React 19)', 'PostgreSQL 16 RLS', 'Drizzle ORM', 'Stripe API', 'Playwright'],
    blueprintLink: '/blueprints/saas-portal',
    serviceLink: '/services#saas-b2b',
  },
  {
    id: 'backend-distributed',
    index: '04',
    title: 'Backend & Distributed Systems',
    problemSolved:
      'Dropped API webhooks during third-party downtime, concurrent write race conditions, and uncontrolled database connection exhaustion under spike traffic.',
    typicalApplications: [
      'Sub-15ms edge webhook ingestion & fanout spines',
      'Redis Streams distributed queue & worker processing',
      'Double-entry multi-currency accounting ledgers',
      'Automated dead-letter queue (DLQ) replay daemons',
    ],
    stack: ['Cloudflare Workers', 'Redis Streams', 'FastAPI', 'PostgreSQL 16', 'OpenTelemetry'],
    blueprintLink: '/blueprints/event-spine',
    serviceLink: '/services#backend-distributed',
  },
  {
    id: 'workflow-automation',
    index: '05',
    title: 'Workflow Automation & Integrations',
    problemSolved:
      'Brittle Zapier/Make scripts failing silently, conflicting bidirectional sync states between CRM and ERP, and hours of repetitive manual data entry.',
    typicalApplications: [
      'Bidirectional SAP/NetSuite to Salesforce sync pipelines',
      'Cal.com webhook intake with automated SOW generation',
      'Event-triggered Slack & email alerting workflows',
      'Multi-gateway payment reconciliation & dispute resolution',
    ],
    stack: ['Python AsyncIO', 'HMAC Signatures', 'Redis', 'PostgreSQL', 'Webhooks', 'Docker'],
    serviceLink: '/services#workflow-automation',
  },
  {
    id: 'architecture-consulting',
    index: '06',
    title: 'Architecture & Technical Consulting',
    problemSolved:
      'Startups burning months on wrong vector databases or unscalable microservices, and enterprises stuck with bloated, fragile legacy codebases.',
    typicalApplications: [
      '15-Minute Architecture Audits and bottleneck diagnosis',
      'Fixed-scope sprint planning with guaranteed deliverables',
      'Strangler Fig migration roadmaps for legacy monoliths',
      'Production readiness, security audits & eval harness setup',
    ],
    stack: ['Architecture Monograph', 'CI Eval Harnesses', 'Threat Modeling', 'Code Auditing'],
    serviceLink: '/services#architecture-consulting',
  },
] as const;

export function CapabilitiesGrid(): React.ReactElement {
  return (
    <section
      id="services"
      aria-labelledby="capabilities-title"
      className="py-16 md:py-24 border-b border-[var(--color-border-hairline)] bg-[var(--color-canvas)]"
    >
      <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[var(--color-border-hairline)]">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-signal)] font-semibold">
              Engineering Capabilities
            </span>
            <h2
              id="capabilities-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-ink-primary)] mt-2"
            >
              Architectural Domains We Own &amp; Deliver.
            </h2>
          </div>
          <p className="font-mono text-xs text-[var(--color-ink-muted)] max-w-md leading-relaxed">
            Every engagement delivers production-grade code committed straight to your GitHub organization. Zero lock-in, fully typed, verified with automated tests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-10">
          {ALL_CAPABILITIES.map((cap) => (
            <article
              key={cap.id}
              className="border border-[var(--color-border-hairline)] bg-[var(--color-surface-pure)] p-6 sm:p-8 flex flex-col justify-between hover:border-[var(--color-border-strong)] transition-colors shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs pb-3 border-b border-[var(--color-border-hairline)] mb-4">
                  <span className="text-[var(--color-accent-signal)] font-bold">DOMAIN // {cap.index}</span>
                  <span className="text-[var(--color-ink-muted)]">PRODUCTION READY</span>
                </div>

                <h3 className="text-xl font-bold text-[var(--color-ink-primary)] mb-3">
                  {cap.title}
                </h3>

                <div className="mb-4">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-muted)] font-bold mb-1">
                    Problem Solved
                  </div>
                  <p className="text-xs text-[var(--color-ink-secondary)] leading-relaxed">
                    {cap.problemSolved}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-muted)] font-bold mb-2">
                    Typical Applications
                  </div>
                  <ul className="space-y-1.5 font-mono text-xs text-[var(--color-ink-secondary)]">
                    {cap.typicalApplications.map((app, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[var(--color-accent-signal)] font-bold">&rsaquo;</span>
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <div className="pt-4 border-t border-[var(--color-border-hairline)] mb-4">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-muted)] font-bold mb-2">
                    Production Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cap.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] px-2 py-0.5 border border-[var(--color-border-hairline)] bg-[var(--color-surface-subtle)] text-[var(--color-ink-secondary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border-hairline)] font-mono text-xs font-semibold">
                  {cap.blueprintLink ? (
                    <Link
                      href={cap.blueprintLink}
                      className="text-[var(--color-accent-signal)] hover:underline inline-flex items-center gap-1"
                    >
                      View Blueprint &rarr;
                    </Link>
                  ) : (
                    <Link
                      href={cap.serviceLink}
                      className="text-[var(--color-ink-primary)] hover:underline inline-flex items-center gap-1"
                    >
                      Service Specs &rarr;
                    </Link>
                  )}
                  <Link
                    href={cap.serviceLink}
                    className="text-[var(--color-ink-muted)] hover:text-[var(--color-ink-primary)] transition-colors"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
