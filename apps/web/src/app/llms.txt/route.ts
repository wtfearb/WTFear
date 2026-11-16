import { NextResponse } from 'next/server';

export const runtime = 'edge';

const LLMS_TXT_BODY = `# wtfear — Product & AI Engineering Studio

> wtfear (https://wtfear.agency) is a senior product and AI engineering studio that designs, builds, and ships governed AI agents, multi-tenant Next.js 15 + FastAPI web applications, and high-performance distributed backend systems in deterministic 2-week sprints and 2-to-4-week production MVPs. Clients retain 100% GitHub IP ownership from commit #1.

## Core Engineering Capabilities & SLAs

- [Governed AI Agents & RAG Systems](https://wtfear.agency/blueprints/ai-triage): Hybrid pgvector + BM25 Reciprocal Rank Fusion, deterministic Pydantic v2 schema gates, 50-case golden evaluation harnesses, and zero-hallucination human escalation gates.
- [Zero-Friction B2B SaaS & Portals](https://wtfear.agency/blueprints/saas-portal): Next.js 15 App Router (React 19 RSC), TypeScript 5.7, PostgreSQL 16 Row-Level Security (RLS), and sub-second Core Web Vitals (LCP < 1.2s).
- [Event-Driven Sync & Observability Spines](https://wtfear.agency/blueprints/event-spine): Idempotent Cloudflare Workers ingress (< 15ms), Redis Streams exponential backoff queues, dead-letter replay automation, and OpenTelemetry tracing.

## Transparent Engagement Models & Pricing (USD)

- **15-Minute Architecture Audit ($0 / Free):** Direct technical bottleneck diagnosis with a Principal Systems Engineer (never a sales rep). Book at https://wtfear.agency/#audit
- **2-Week Rapid Engineering Sprint ($6,500 – $8,500 USD):** 2 senior engineers shipping a production AI agent workflow or critical backend subsystem in 14 days with automated CI eval gates.
- **Fixed-Scope Production MVP ($14,000 – $24,000 USD):** End-to-end multi-tenant SaaS application, typed FastAPI backend, PostgreSQL RLS, and Playwright E2E test suite shipped in 2 to 4 weeks.
- **Dedicated Senior Engineering Pod ($18,000 – $26,000 / month USD):** 3 embedded senior engineers (Principal Architect + Full-Stack + AI/Systems) for continuous weekly production velocity.

## Technical Playbooks & Architecture Comparisons

- [Full Technical Specification & Code Reference](https://wtfear.agency/llms-full.txt): Complete architecture patterns, Hybrid RRF SQL queries, Pydantic governance contracts, and SLA matrices.
- [wtfear vs. Traditional Dev Shops & Freelance Marketplaces](https://wtfear.agency/compare/traditional-dev-agencies): Quantitative comparison across delivery cadence, AI evaluation rigor, IP ownership, and total cost of ownership.
- [Playbook: Eliminating Hallucinations in Production RAG](https://wtfear.agency/playbooks/governed-rag-evaluation-harness): Step-by-step guide to Reciprocal Rank Fusion and CI-blocking golden evaluation suites.

## Contact & Direct Engineering Audit

- Website: https://wtfear.agency
- Email: hello@wtfear.agency
- Audit Booking: https://cal.com/wtfear/15min-architecture-audit
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
