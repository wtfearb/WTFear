import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AgentSandbox } from '@/components/sections/AgentSandbox';
import { TechStackMatrix } from '@/components/sections/TechStackMatrix';

export const metadata: Metadata = {
  title: 'Engineering Capabilities & Services | WTFearB Systems Studio',
  description:
    'Comprehensive breakdown of WTFearB systems engineering capabilities: Governed AI agents, Next.js 15 web applications, distributed backend spines, and deterministic 2-week sprints.',
  alternates: {
    canonical: 'https://wtfear.agency/services',
  },
  openGraph: {
    title: 'Engineering Capabilities & Services — WTFearB',
    description:
      'We architect, build, and ship governed AI agents, high-performance web platforms, and distributed event backends with 100% client GitHub IP ownership.',
    url: 'https://wtfear.agency/services',
    siteName: 'WTFearB Systems Studio',
    type: 'website',
  },
};

interface ServiceDetail {
  readonly id: string;
  readonly index: string;
  readonly title: string;
  readonly subtitle: string;
  readonly problemStatement: string;
  readonly technicalSolution: string;
  readonly architecturePattern: string;
  readonly deliverables: readonly string[];
  readonly typicalApplications: readonly string[];
  readonly stack: readonly string[];
  readonly blueprintHref?: string;
  readonly blueprintLabel?: string;
}

const SERVICES_CATALOG: readonly ServiceDetail[] = [
  {
    id: 'ai-engineering',
    index: '01',
    title: 'Governed AI Engineering & RAG Systems',
    subtitle: 'Zero-hallucination agentic workflows with deterministic Pydantic v2 validation gates',
    problemStatement:
      'Uncontrolled LLMs hallucinating critical data, executing unauthorized actions, or leaking multi-tenant context in production workflows, creating unacceptable SLA and legal liabilities.',
    technicalSolution:
      'We build governed agent runtimes backed by single-query hybrid search (PostgreSQL 16 pgvector HNSW + BM25 ts_rank_cd), strict Pydantic v2 schema validators, automated confidence thresholds, and CI-blocking 50-case golden evaluation suites.',
    architecturePattern:
      'Ingress Webhook -> HMAC Signature Validation -> Pydantic Schema Gate -> pgvector HNSW + BM25 RRF -> Guardrail Scorer (Confidence >= 0.82) -> Egress Citation Validator -> Human Escalation Fallback',
    deliverables: [
      'Production FastAPI / Python 3.12 agent runtime service',
      'PostgreSQL 16 pgvector HNSW + BM25 RRF hybrid retrieval schema',
      'Strict Pydantic v2 ingress & egress schema validation gates',
      '50-case CI-blocking golden evaluation harness (100% citation precision)',
      'Automated fallback router with Slack / webhook alerting',
      'Full OpenTelemetry tracing & Prometheus metrics instrumentation',
    ],
    typicalApplications: [
      'Autonomous Tier-1 customer support triage & routing',
      'Contract clause extraction & regulatory compliance risk scoring',
      'Multi-modal automated invoice, receipt & bill processing',
      'Enterprise codebase semantic search & technical Q&A assistant',
    ],
    stack: ['Python 3.12', 'FastAPI', 'Pydantic v2', 'PostgreSQL 16', 'pgvector', 'BM25 RRF', 'OpenTelemetry'],
    blueprintHref: '/blueprints/ai-triage',
    blueprintLabel: 'Inspect AI Triage Blueprint',
  },
  {
    id: 'custom-software',
    index: '02',
    title: 'Custom Software & Systems Engineering',
    subtitle: 'High-leverage business applications built for deterministic reliability and scale',
    problemStatement:
      'Off-the-shelf software failing to match bespoke operational workflows, or bloated agency builds saddled with severe technical debt, fragile spaghetti code, and slow maintenance cycles.',
    technicalSolution:
      'We build typed, modular systems from first principles using modern TypeScript and Python. Every application features zero runtime surprises, strict contract schemas, automated end-to-end integration tests, and clean separation between domain logic and presentation.',
    architecturePattern:
      'Strict Domain Models -> Shared Contract Packages -> Edge-Rendered UI (Next.js 15 RSC) -> Idempotent API Routers -> ACID Postgres Transaction Engine -> Automated Playwright Test Suite',
    deliverables: [
      'End-to-end custom application with responsive Swiss-Editorial UI',
      'Modular monorepo architecture configured with Turborepo & Biome',
      'Strict schema validation using Zod v3 & TypeScript 5.7 strict mode',
      'Comprehensive Playwright E2E and Vitest unit testing suites',
      'Dockerized container builds with multi-stage production caching',
      '100% client GitHub repository ownership from commit #1',
    ],
    typicalApplications: [
      'Tailored internal operations consoles & ERP bridges',
      'Proprietary algorithmic pricing & order matching backends',
      'Field telemetry & real-time logistics coordination platforms',
      'Custom customer onboarding, identity verification & KYC flows',
    ],
    stack: ['TypeScript 5.7', 'Next.js 15', 'Node.js', 'Python 3.12', 'PostgreSQL 16', 'Docker', 'Tailwind CSS v4'],
  },
  {
    id: 'saas-b2b',
    index: '03',
    title: 'SaaS & Enterprise B2B Portals',
    subtitle: 'Multi-tenant web applications with cryptographic row-level security and sub-second LCP',
    problemStatement:
      'Sluggish client-side SPAs (LCP > 3.5s), porous tenant data boundaries risking data cross-contamination, and brittle subscription entitlement systems that break under billing edge cases.',
    technicalSolution:
      'We engineer Next.js 15 React Server Component architectures with PostgreSQL 16 Row-Level Security (RLS) enforcement at the database connection layer, Stripe webhook-synchronized subscription state machines, and sub-800ms Largest Contentful Paint.',
    architecturePattern:
      'Tenant Host Header -> Middleware Route Rewrite -> Next.js RSC Streaming -> RLS Tenant Context (SET LOCAL app.current_tenant_id) -> Drizzle ORM -> Stripe Webhook State Machine',
    deliverables: [
      'Next.js 15 App Router architecture with streaming React Server Components',
      'PostgreSQL 16 Row-Level Security tenant isolation policies',
      'Drizzle ORM schema with migration history and typed seed scripts',
      'Stripe usage-metered billing & subscription webhook listener with idempotency',
      'Role-based access control (RBAC) workspace permission matrices',
      'Audit log telemetry recording all administrative actions',
    ],
    typicalApplications: [
      'Multi-tenant enterprise SaaS applications with custom subdomain routing',
      'Granular workspace entitlement management & team permissions',
      'Usage-metered Stripe billing, seat management & credit checkouts',
      'Customer analytics, team collaboration & compliance audit log dashboards',
    ],
    stack: ['Next.js 15 (React 19)', 'PostgreSQL 16 RLS', 'Drizzle ORM', 'Stripe API', 'Tailwind CSS v4', 'Playwright'],
    blueprintHref: '/blueprints/saas-portal',
    blueprintLabel: 'Inspect SaaS Portal Blueprint',
  },
  {
    id: 'backend-distributed',
    index: '04',
    title: 'Backend & Distributed Event Pipelines',
    subtitle: 'High-throughput webhook ingestion and resilient asynchronous task execution',
    problemStatement:
      'Lost webhook payloads during upstream API downtime, database connection pool exhaustion under sudden traffic spikes, and unmonitored silent job failures causing financial or operational discrepancies.',
    technicalSolution:
      'We engineer distributed event backends utilizing lightweight edge ingest proxies, Redis Streams message brokers, idempotent consumer worker pools with automated dead-letter queue (DLQ) replay, and Prometheus/OpenTelemetry observability.',
    architecturePattern:
      'Upstream Webhook -> Cloudflare Worker Ingest Proxy (<15ms) -> Redis Stream Log -> Idempotent Consumer Pool -> Dead-Letter Queue (DLQ) -> Automated Replay Daemon -> Audit Trail',
    deliverables: [
      'Sub-15ms edge webhook ingestion gateway with HMAC verification',
      'Redis Streams partitioned message log with consumer group auto-scaling',
      'Idempotent background worker daemons with deduplication caching',
      'Automated DLQ retry, dead-letter capture, and replay CLI scripts',
      'Database connection pooling via PgBouncer / Neon Serverless pooler',
      'Prometheus telemetry endpoints and structured JSON audit logging',
    ],
    typicalApplications: [
      'High-throughput edge webhook ingestion and fanout pipelines',
      'Distributed asynchronous queue processing and scheduled task daemons',
      'Double-entry multi-currency accounting ledgers and settlement engines',
      'Third-party API webhook ingestion with guaranteed at-least-once delivery',
    ],
    stack: ['Cloudflare Workers', 'Redis Streams', 'FastAPI', 'Python AsyncIO', 'PostgreSQL 16', 'OpenTelemetry'],
    blueprintHref: '/blueprints/event-spine',
    blueprintLabel: 'Inspect Event Spine Blueprint',
  },
  {
    id: 'workflow-automation',
    index: '05',
    title: 'Workflow Automation & System Integrations',
    subtitle: 'Reliable, code-governed integrations replacing brittle no-code automations',
    problemStatement:
      'Brittle Zapier or Make pipelines silently failing without alerting, conflicting bidirectional sync states between CRM and ERP, and hours of costly manual data reconciliation.',
    technicalSolution:
      'We replace fragile no-code scripts with robust, code-governed asynchronous integration pipelines featuring cryptographic signature checks, transactional state syncs, bidirectional reconciliation checks, and automated error recovery.',
    architecturePattern:
      'Trigger Event -> HMAC Verification -> Bidirectional State Matcher -> Atomic Multi-System Transaction -> Reconciliation Log -> Slack Ops Alerting on Exception',
    deliverables: [
      'Resilient bidirectional sync pipelines between ERP, CRM, and accounting engines',
      'Cal.com / Typeform automated lead qualification & SOW generation flows',
      'Cryptographic HMAC signature validation on all incoming webhooks',
      'Automated Slack / Discord ops alerting with one-click retry triggers',
      'Daily automated reconciliation audit jobs flagging data variances',
      'Comprehensive system architecture monograph and recovery runbooks',
    ],
    typicalApplications: [
      'Bidirectional SAP / NetSuite to Salesforce sync pipelines',
      'Cal.com intake with automated SOW generation & Stripe deposit triggers',
      'Event-triggered Slack & email notification matrices',
      'Multi-gateway payment reconciliation and automated dispute capture',
    ],
    stack: ['Python 3.12 AsyncIO', 'HMAC Signatures', 'Redis', 'PostgreSQL 16', 'Docker', 'OpenTelemetry'],
  },
  {
    id: 'architecture-consulting',
    index: '06',
    title: 'Architecture & Technical Consulting',
    subtitle: 'Principal-level technical roadmapping, bottleneck diagnosis, and governance',
    problemStatement:
      'Early-stage teams burning critical runway building on unscalable architectures, choosing ill-suited vector databases, or trapped with monolithic legacy codebases that nobody dares touch.',
    technicalSolution:
      'We provide rapid 15-Minute Architecture Audits, fixed-scope sprint roadmap monographs, production readiness reviews, and Strangler Fig legacy migration strategies led exclusively by principal systems engineers.',
    architecturePattern:
      'System Audit & Threat Modeling -> Bottleneck Profiling -> Written Architectural Monograph -> Fixed-Scope Sprint Planning -> Verification & Handover Runbook',
    deliverables: [
      'Written Architecture Monograph detailing bottlenecks and target state',
      'Deterministic 2-week sprint execution scope with guaranteed deliverables',
      'Security threat model and multi-tenant vulnerability analysis',
      'Vector database and retrieval pipeline benchmark report',
      'Strangler Fig migration roadmap for zero-downtime legacy upgrades',
      'Production deployment readiness checklist & CI evaluation gates',
    ],
    typicalApplications: [
      '15-Minute Architecture Audits and production bottleneck diagnosis',
      'Pre-seed / Series-A technical due diligence and architecture validation',
      'Strangler Fig migration roadmaps for legacy monolith modernizations',
      'Production readiness, security audits & automated CI eval harness setup',
    ],
    stack: ['Architecture Monograph', 'CI Eval Harnesses', 'Threat Modeling', 'Code Auditing', 'Benchmarking'],
  },
];

export default function ServicesPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-ink-primary)] selection:bg-[var(--color-accent-signal)] selection:text-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Editorial Breadcrumb & Header */}
        <section className="py-12 md:py-16 border-b border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)]">
          <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-ink-muted)] mb-4">
              <Link href="/" className="hover:text-[var(--color-ink-primary)] underline decoration-[var(--color-border-hairline)]">
                Home
              </Link>
              <span>/</span>
              <span className="text-[var(--color-accent-signal)] font-semibold">Services</span>
            </div>

            <div className="max-w-3xl">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-signal)] font-semibold">
                Architecture &amp; Engineering Disciplines
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-ink-primary)] mt-3">
                Disciplines We Own &amp; Deliver.
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[var(--color-ink-secondary)] leading-relaxed">
                WTFearB operates as an embedded senior systems studio. We deliver governed AI agents, high-concurrency Next.js 15 platforms, and distributed event backends in deterministic 2-week sprints with 100% client GitHub IP ownership.
              </p>
            </div>
          </div>
        </section>

        {/* Monograph Index Strip */}
        <section className="py-4 border-b border-[var(--color-border-hairline)] bg-[var(--color-canvas)] overflow-x-auto">
          <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-6 text-xs font-mono whitespace-nowrap">
              <span className="text-[var(--color-ink-muted)] uppercase tracking-wider">Index:</span>
              {SERVICES_CATALOG.map((service) => (
                <a
                  key={service.id}
                  href={`#${service.id}`}
                  className="text-[var(--color-ink-secondary)] hover:text-[var(--color-accent-signal)] transition-colors"
                >
                  [{service.index}] {service.title.split('&')[0].trim()}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Deep-Dive Service Monographs */}
        <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-16 md:space-y-24">
          {SERVICES_CATALOG.map((service) => (
            <article
              key={service.id}
              id={service.id}
              className="scroll-mt-24 border border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)] p-6 sm:p-8 lg:p-10 shadow-xs"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--color-border-hairline)]">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 border border-[var(--color-border-hairline)] bg-[var(--color-canvas)] text-[var(--color-accent-signal)]">
                      DISCIPLINE {service.index}
                    </span>
                    <span className="font-mono text-xs text-[var(--color-ink-muted)]">
                      DETERMINISTIC 2-WEEK SPRINT READY
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-ink-primary)] mt-2">
                    {service.title}
                  </h2>
                  <p className="font-mono text-xs sm:text-sm text-[var(--color-ink-muted)] mt-1">
                    {service.subtitle}
                  </p>
                </div>

                {service.blueprintHref && (
                  <Link
                    href={service.blueprintHref}
                    className="inline-flex items-center justify-center gap-2 self-start sm:self-auto px-4 py-2 border border-[var(--color-ink-primary)] text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-ink-primary)] hover:bg-[var(--color-ink-primary)] hover:text-white transition-colors"
                  >
                    <span>{service.blueprintLabel ?? 'Inspect Blueprint'}</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                )}
              </div>

              {/* Problem vs Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-b border-[var(--color-border-hairline)]">
                <div className="p-4 sm:p-5 border border-red-200/60 bg-red-50/20">
                  <div className="flex items-center gap-2 font-mono text-xs text-red-700 font-semibold uppercase tracking-wider mb-2">
                    <span className="w-2 h-2 rounded-full bg-red-600 inline-block" />
                    Problem We Eliminate
                  </div>
                  <p className="text-sm text-[var(--color-ink-secondary)] leading-relaxed">
                    {service.problemStatement}
                  </p>
                </div>

                <div className="p-4 sm:p-5 border border-emerald-200/60 bg-emerald-50/20">
                  <div className="flex items-center gap-2 font-mono text-xs text-emerald-800 font-semibold uppercase tracking-wider mb-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
                    Our Technical Architecture
                  </div>
                  <p className="text-sm text-[var(--color-ink-secondary)] leading-relaxed">
                    {service.technicalSolution}
                  </p>
                </div>
              </div>

              {/* Execution Flow Schema */}
              <div className="py-6 border-b border-[var(--color-border-hairline)]">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-muted)]">
                  Architectural Execution Flow
                </span>
                <div className="mt-3 p-4 bg-[var(--color-terminal-bg)] text-[#E2E2E8] border border-[var(--color-terminal-surface)] font-mono text-xs leading-relaxed overflow-x-auto">
                  <div className="text-[var(--color-accent-signal)] mb-1">// Deterministic Data Topology:</div>
                  <p className="whitespace-pre-wrap">{service.architecturePattern}</p>
                </div>
              </div>

              {/* Deliverables & Typical Applications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 border-b border-[var(--color-border-hairline)]">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-primary)] font-semibold mb-4">
                    Guaranteed Deliverables (Day 14)
                  </h3>
                  <ul className="space-y-2.5">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--color-ink-secondary)]">
                        <span className="text-emerald-600 font-bold shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-primary)] font-semibold mb-4">
                    Typical Production Applications
                  </h3>
                  <ul className="space-y-2.5">
                    {service.typicalApplications.map((app, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--color-ink-secondary)]">
                        <span className="font-mono text-xs text-[var(--color-accent-signal)] font-semibold shrink-0">
                          [{String(idx + 1).padStart(2, '0')}]
                        </span>
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Stack & Direct CTA */}
              <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-[var(--color-ink-muted)] mr-1">Stack:</span>
                  {service.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-2 py-0.5 border border-[var(--color-border-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink-secondary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  href="/audit"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-accent-signal)] text-white text-xs font-mono font-semibold uppercase tracking-wider hover:brightness-110 transition-all shrink-0"
                >
                  <span>Book Architecture Audit</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Interactive AI Governance Lab */}
        <AgentSandbox />

        {/* Zero-Bloat Architectural Rigor / Production Tech Stack Matrix */}
        <TechStackMatrix />

        {/* Global Bottom CTA */}
        <section className="py-16 md:py-20 border-t border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)]">
          <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8 text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-signal)] font-semibold">
              Zero Marketing Fluff &bull; Direct Senior Pod
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-ink-primary)] mt-3">
              Need a Production Architecture Built This Month?
            </h2>
            <p className="mt-4 text-base text-[var(--color-ink-secondary)] max-w-2xl mx-auto">
              Schedule a focused 15-minute technical audit with our principal systems engineers. We will analyze your bottleneck, review your architecture, and provide a fixed-scope sprint roadmap.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/audit"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-[var(--color-accent-signal)] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:brightness-110 transition-all shadow-sm"
              >
                <span>Book 15-Min Architecture Audit</span>
                <span className="ml-2" aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="/blueprints"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-[var(--color-border-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink-primary)] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[var(--color-canvas-pure)] transition-all"
              >
                Explore Production Blueprints
              </Link>
            </div>
            <div className="mt-6 font-mono text-xs text-[var(--color-ink-muted)]">
              Direct Contact: <a href="mailto:wtfearb@gmail.com" className="text-[var(--color-accent-signal)] underline">wtfearb@gmail.com</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
