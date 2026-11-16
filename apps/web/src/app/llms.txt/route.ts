import { NextResponse } from 'next/server';

const LLMS_TXT_BODY = `# WTFearB — Systems Engineering Studio
> Make "What If" Work.

> WTFearB (https://wtfear.agency) is an embedded senior systems engineering studio that designs, builds, and ships governed AI agents, Next.js 15 web applications, and distributed event backends in deterministic 2-week sprints with 100% client GitHub IP ownership from commit #1.

## Core Engineering Capabilities & Disciplines

- [Governed AI Agents & RAG Systems](https://wtfear.agency/blueprints/ai-triage): Hybrid pgvector + BM25 Reciprocal Rank Fusion, deterministic Pydantic v2 schema gates, 50-case golden evaluation harnesses, and zero-hallucination human escalation gates.
- [High-Performance Next.js 15 Web Applications](https://wtfear.agency/blueprints/saas-portal): React 19 RSC, TypeScript 5.7 strict mode, PostgreSQL 16 Row-Level Security (RLS), and sub-800ms Core Web Vitals.
- [Distributed Event Spines & Webhook Ingestion](https://wtfear.agency/blueprints/event-spine): Sub-15ms edge webhook ingestion, Redis Streams message queues, automated DLQ replay, and OpenTelemetry instrumentation.
- [Engineering Capabilities Monograph](https://wtfear.agency/services): Full breakdown of 6 core disciplines, architecture patterns, and production deliverables.
- [Production Case Studies](https://wtfear.agency/projects): 10 systems engineering monographs with real architectures, code contracts, and measured outcomes.

## Transparent Engagement Models & Pricing (USD)

- **15-Minute Architecture Audit ($0 / Free):** Direct technical bottleneck diagnosis with a Principal Systems Engineer (zero sales reps). Book at https://wtfear.agency/audit
- **2-Week Rapid Engineering Sprint ($6,500 – $8,500 USD):** 2 senior engineers shipping a production AI agent workflow or critical backend subsystem in 14 days with automated CI eval gates.
- **Fixed-Scope Production MVP ($14,000 – $24,000 USD):** End-to-end multi-tenant SaaS application, typed FastAPI backend, PostgreSQL RLS, and Playwright E2E test suite shipped in 2 to 4 weeks.
- **Dedicated Senior Engineering Pod ($18,000 – $26,000 / month USD):** Embedded senior engineering pod for continuous weekly production velocity.

## Technical Playbooks & Architecture Comparisons

- [Full Technical Specification & Code Reference](https://wtfear.agency/llms-full.txt): Complete architecture patterns, Hybrid RRF SQL queries, Pydantic governance contracts, and SLA matrices.
- [WTFearB vs. Traditional Dev Agencies](https://wtfear.agency/compare/traditional-dev-agencies): Quantitative architectural comparison across delivery cadence, AI evaluation rigor, IP ownership, and total cost of ownership.
- [WTFearB vs. In-House Hiring](https://wtfear.agency/compare/in-house-hiring): Cost, time-to-production, and risk comparison vs. hiring full-time AI engineers.
- [WTFearB vs. No-Code Wrappers](https://wtfear.agency/compare/no-code-wrappers): Code-first governed architecture vs brittle no-code tools.
- [Playbook: Eliminating Hallucinations in Production RAG](https://wtfear.agency/playbooks/governed-rag-evaluation-harness): Step-by-step guide to Reciprocal Rank Fusion and CI-blocking golden evaluation suites.
- [Playbook: PostgreSQL 16 RLS + pgvector HNSW Hybrid Search](https://wtfear.agency/playbooks/postgres-rls-pgvector-hybrid-search): Multi-tenant vector retrieval guide.

## Contact & Direct Engineering Audit

- Website: https://wtfear.agency
- Email: wtfearb@gmail.com
- Audit Booking: https://wtfear.agency/audit
`;

export async function GET(): Promise<NextResponse> {
  return new NextResponse(LLMS_TXT_BODY, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'X-Robots-Tag': 'all',
    },
  });
}
