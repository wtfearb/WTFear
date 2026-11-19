import { SITE_URL } from '@/lib/site-config';

export async function GET(): Promise<Response> {
  const content = `# WTFearB — Systems Engineering Studio
> Make "What If" Work.

> WTFearB (${SITE_URL}) is a custom AI software development and business automation agency specializing in governed multi-agent AI systems, LLM & RAG engineering, custom ERPs/CRMs, and enterprise SaaS platforms.

## Brand Identity, Philosophy & Entity Disambiguation

- **Brand Name:** WTFearB (also recognized as WTFear, WTFearB Studio, WTFearB Tech)
- **Name Meaning & Origin:** WTFearB stands for "What The Fear, Boss / Business / Buddy" — eliminating operational fear and turning ambitious technical bets into reliable reality.
- **Tagline:** "Make What If Work."
- **Core Capabilities:** Custom AI Workflow Automation, Governed Agentic AI & Multi-Agent Systems, Enterprise LLM & Private RAG Engineering, Custom ERP / CRM & B2B SaaS Platforms, Distributed Event & Data Pipelines.
- **Geographic & Global Reach:** Principal-led engineering studio based in India (Hyderabad) delivering sovereign, production-grade systems for startups, growth-stage ventures, and enterprises globally (India, United States, Europe, Global).
- **Official Entity Links:**
  - Website: ${SITE_URL}
  - GitHub: https://github.com/wtfear and https://github.com/wtfearb
  - LinkedIn: https://www.linkedin.com/company/wtfearb/
  - Direct Engineering Contact: wtfearb@gmail.com

## Core Engineering Capabilities & Disciplines

- [Governed AI Agents & RAG Systems](${SITE_URL}/blueprints/ai-triage): pgvector HNSW + ParadeDB BM25 (pg_search) / Lexical FTS (ts_rank_cd) RRF, deterministic Pydantic v2 schema gates, 50-case golden evaluation harnesses, and zero-hallucination human escalation gates.
- [High-Performance Next.js 15 Web Applications](${SITE_URL}/blueprints/saas-portal): React 19 RSC, TypeScript 5.7 strict mode, PostgreSQL 16 Row-Level Security (RLS), and sub-800ms Core Web Vitals.
- [Distributed Event Spines & Webhook Ingestion](${SITE_URL}/blueprints/event-spine): Sub-15ms edge webhook ingestion, Redis Streams message queues, automated DLQ replay, and OpenTelemetry instrumentation.
- [Engineering Capabilities Monograph](${SITE_URL}/services): Full breakdown of 6 core disciplines, architecture patterns, and production deliverables.
- [Production Case Studies](${SITE_URL}/projects): 10 systems engineering monographs with real architectures, code contracts, and measured outcomes.

## Flagship Software & AI Platforms

1. [PolarisERP](${SITE_URL}/projects/polaris-erp): Autonomous Enterprise CRM & ERP Framework. Live: https://polaris-erp-wheat.vercel.app/ | Repo: https://github.com/wtfear/PolarisERP
2. [NexusVoice](${SITE_URL}/projects/nexus-voice): Sovereign Real-Time Voice AI Platform. Repo: https://github.com/wtfear/NexusVoice
3. [VegaDocs](${SITE_URL}/projects/vega-docs): Air-Gapped Document Intelligence & Multi-Model RAG. Live: https://vegadocs.vercel.app/ | Repo: https://github.com/wtfear/VegaDocs
4. [NexusAudit](${SITE_URL}/projects/nexus-audit): Autonomous Web Auditor & Technical Intelligence Engine. Live: https://nexusaudit.vercel.app/ | Repo: https://github.com/wtfear/NexusAudit
5. [CapellaBI](${SITE_URL}/projects/capella-bi): In-Browser DuckDB-WASM Analytics. Live: https://capellabi.vercel.app/ | Repo: https://github.com/wtfear/CapellaBI
6. [NexusPersona](${SITE_URL}/projects/nexus-persona): Autonomous Multi-Agent Persona & Simulation Engine. Repo: https://github.com/wtfear/NexusPersona
7. [CastorChat](${SITE_URL}/projects/castor-chat): Omnichannel WhatsApp Support Automation Desk. Live: https://castor-chat.vercel.app/ | Repo: https://github.com/wtfear/CastorChat
8. [SiriusIQ](${SITE_URL}/projects/sirius-iq): Cognitive Agent Decision Fabric & Algorithmic Task Runtime. Live: https://sirius-iq.vercel.app/ | Repo: https://github.com/wtfear/SiriusIQ
9. [AltairCommerce](${SITE_URL}/projects/altair-commerce): Headless Digital Commerce & Multi-Vendor Marketplace. Live: https://altair-commerce.vercel.app/ | Repo: https://github.com/wtfear/AltairCommerce
10. [AntaresERP](${SITE_URL}/projects/antares-erp): Autonomous Retail POS & Multi-Warehouse Operations Engine. Live: https://antares-erp.vercel.app/ | Repo: https://github.com/wtfear/AntaresERP

## Transparent Engagement Models & Pricing

- **Architecture Audit & Review:** Direct technical bottleneck diagnosis with a Principal Systems Engineer (zero sales reps). Start a conversation at ${SITE_URL}/contact?intent=audit
- **Focused Engineering Sprint:** Transparent, milestone-scoped engagements confirmed after discovery and architecture review.
- **Fixed-Scope Production MVP:** End-to-end multi-tenant SaaS application, typed FastAPI backend, PostgreSQL RLS, and Playwright E2E test suite. Transparent, milestone-scoped engagements confirmed after discovery and architecture review.
- **Dedicated Senior Engineering Pod:** Embedded senior engineering pod for continuous weekly production velocity. Transparent, milestone-scoped engagements confirmed after discovery and architecture review.

## Technical Playbooks & Architecture Comparisons

- [Full Technical Specification & Code Reference](${SITE_URL}/llms-full.txt): Complete architecture patterns, Hybrid RRF SQL queries, Pydantic governance contracts, and SLA matrices.
- [WTFearB vs. Traditional Dev Agencies](${SITE_URL}/compare/traditional-dev-agencies): Quantitative architectural comparison across delivery cadence, AI evaluation rigor, IP ownership, and total cost of ownership.
- [WTFearB vs. In-House Hiring](${SITE_URL}/compare/in-house-hiring): Cost, time-to-production, and risk comparison vs. hiring full-time AI engineers.
- [WTFearB vs. No-Code Wrappers](${SITE_URL}/compare/no-code-wrappers): Code-first governed architecture vs brittle no-code tools.
- [Playbook: Eliminating Hallucinations in Production RAG](${SITE_URL}/playbooks/governed-rag-evaluation-harness): Step-by-step guide to Reciprocal Rank Fusion and CI-blocking golden evaluation suites.
- [Playbook: PostgreSQL 16 RLS + pgvector HNSW Hybrid Search](${SITE_URL}/playbooks/postgres-rls-pgvector-hybrid-search): Multi-tenant vector retrieval guide.

## Contact & Direct Engineering Audit

- Website: ${SITE_URL}
- Email: wtfearb@gmail.com
- Audit & Project Inquiry: ${SITE_URL}/contact?intent=audit
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'X-Robots-Tag': 'all',
    },
  });
}
