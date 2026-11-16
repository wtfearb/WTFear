/**
 * @file Deterministic Seed Data & Default Content for wtfear.agency (V4.0)
 * @description In-memory fallback and database seed for portfolio projects, pricing configs, and site settings.
 */

export interface ArchitectureNode {
  readonly id: string;
  readonly label: string;
  readonly role: string;
  readonly tech: string;
  readonly latency: string;
}

export interface SeedPortfolioProject {
  readonly id: string;
  readonly slug: string;
  readonly indexNumber: number;
  readonly title: string;
  readonly industry: string;
  readonly category: string;
  readonly summary: string;
  readonly problem: string;
  readonly solution: string;
  readonly architectureNodesJson: readonly ArchitectureNode[];
  readonly stackTags: readonly string[];
  readonly keyFeatures: readonly string[];
  readonly outcomesSummary: string;
  readonly liveUrl: string;
  readonly repoUrl: string;
  readonly isPublished: boolean;
  readonly updatedAt: string;
}

export interface SeedPricingConfig {
  readonly id: string;
  readonly modelSlug: 'sprint' | 'mvp' | 'pod';
  readonly title: string;
  readonly subtitle: string;
  readonly baseMinUsd: number;
  readonly baseMaxUsd: number;
  readonly defaultDurationLabel: string;
  readonly teamAllocation: string;
  readonly deliverables: readonly string[];
  readonly isPublished: boolean;
  readonly updatedAt: string;
}

export interface ComplexityMultiplier {
  readonly id: 'standard' | 'distributed' | 'governed_ai';
  readonly label: string;
  readonly multiplier: number;
  readonly description: string;
}

export interface SiteSettings {
  portfolioDisplayMode: 'showcase_10_projects' | 'coming_soon_empty_state';
}

export const COMPLEXITY_MULTIPLIERS: readonly ComplexityMultiplier[] = [
  {
    id: 'standard',
    label: 'Standard Web & API Architecture',
    multiplier: 1.0,
    description: 'Next.js 15 App Router, typed REST API, relational DB schema, and foundational security.',
  },
  {
    id: 'distributed',
    label: 'Distributed Systems & Queues (+15%)',
    multiplier: 1.15,
    description: 'Redis Streams, asynchronous event spines, dead-letter recovery, and idempotency keys.',
  },
  {
    id: 'governed_ai',
    label: 'Governed AI & Production RAG (+25%)',
    multiplier: 1.25,
    description: 'Hybrid pgvector HNSW + BM25 RRF, 50-case CI golden eval gate, and Pydantic v2 runtime invariants.',
  },
] as const;

export const SEED_PRICING_CONFIGS: readonly SeedPricingConfig[] = [
  {
    id: 'pricing-cfg-sprint',
    modelSlug: 'sprint',
    title: 'Rapid Engineering Sprint',
    subtitle: 'Ship a production-grade AI agent workflow or core backend subsystem in a deterministic 14-day window.',
    baseMinUsd: 6500,
    baseMaxUsd: 8500,
    defaultDurationLabel: '2 Weeks (14 Days)',
    teamAllocation: '2 Senior Engineers (Principal Systems Architect + Senior Full-Stack Specialist)',
    deliverables: [
      '✓ Production AI Agent or RAG Subsystem deployed directly to your infrastructure',
      '✓ 50-case CI-blocking golden evaluation harness with automated regression tests',
      '✓ Single-round hybrid pgvector HNSW + BM25 Reciprocal Rank Fusion retrieval',
      '✓ Strict Pydantic v2 runtime validation gates and zero-hallucination escalation logic',
      '✓ 100% Client GitHub IP Ownership transferred on day one from commit #1',
      '✓ 14 days of post-sprint production monitoring and telemetry handoff',
    ],
    isPublished: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'pricing-cfg-mvp',
    modelSlug: 'mvp',
    title: 'Fixed-Scope Production MVP',
    subtitle: 'End-to-end multi-tenant SaaS application, typed FastAPI backend, and Playwright E2E suite in 2-4 weeks.',
    baseMinUsd: 14000,
    baseMaxUsd: 24000,
    defaultDurationLabel: '2 to 4 Weeks',
    teamAllocation: '2-3 Senior Engineers (Principal Architect + Full-Stack Lead + AI Systems Specialist)',
    deliverables: [
      '✓ Complete Next.js 15 App Router web application with React 19 RSC and Tailwind CSS',
      '✓ Multi-tenant PostgreSQL 16 schema with Row-Level Security (RLS) tenant isolation',
      '✓ FastAPI 0.115+ backend with OpenTelemetry distributed tracing and structured logs',
      '✓ Automated Playwright end-to-end and regression test coverage across all core flows',
      '✓ Zero-friction authentication, stripe billing integration, and admin control portal',
      '✓ Hardened production deployment on Vercel + Neon/Supabase with Cloudflare WAF',
      '✓ 30 days of post-launch stabilization, performance optimization, and warranty support',
    ],
    isPublished: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'pricing-cfg-pod',
    modelSlug: 'pod',
    title: 'Dedicated Engineering Pod',
    subtitle: '3 embedded senior engineers delivering continuous weekly production velocity directly to your repo.',
    baseMinUsd: 18000,
    baseMaxUsd: 26000,
    defaultDurationLabel: 'Monthly Retainer (Sprint-to-Sprint Renewal)',
    teamAllocation: '3 Dedicated Senior Engineers (Principal Architect + Senior Backend + Senior Frontend)',
    deliverables: [
      '✓ Continuous weekly feature drops directly into your GitHub organization',
      '✓ Architectural review, technical debt reduction, and sub-second latency optimization',
      '✓ Complex distributed event pipelines, background workers, and queuing architectures',
      '✓ Zero junior contractor delegation — embedded Principal systems engineers only',
      '✓ Daily async standups, weekly live demos, and dedicated shared Slack/Discord channels',
      '✓ Priority 4-hour SLA on critical production incidents and triage',
      '✓ Flexible sprint-to-sprint commitment with transparent 14-day cancellation policy',
    ],
    isPublished: true,
    updatedAt: new Date().toISOString(),
  },
] as const;

export const SEED_PORTFOLIO_PROJECTS: readonly SeedPortfolioProject[] = [
  {
    id: 'proj-01-sentinel',
    slug: 'sentinel-rag-triage',
    indexNumber: 1,
    title: 'Sentinel Autonomous RAG Support Triage',
    industry: 'DevOps & Cloud Infrastructure',
    category: 'Governed AI & Autonomous Agents',
    summary: 'Sub-1.4s autonomous ticket triage engine using hybrid pgvector + BM25 RRF and CI-blocking 50-case evaluation harness.',
    problem: 'Enterprise cloud teams faced 48-minute median first-response times for technical incident tickets. Standard LLM wrappers suffered from 18% hallucination rates and lacked deterministic validation for autonomous actions.',
    solution: 'Engineered a governed multi-agent triage system with FastAPI, PostgreSQL 16 pgvector HNSW, and strict Pydantic v2 schemas. Ingests webhooks via idempotent worker, evaluates confidence thresholds, and halts execution when citation similarity drops below 0.85.',
    architectureNodesJson: [
      { id: 'n1', label: 'Ingress Webhook', role: 'Idempotency & HMAC Verification', tech: 'Cloudflare Worker', latency: '12ms' },
      { id: 'n2', label: 'Hybrid RRF Retriever', role: 'pgvector HNSW + BM25 ts_rank_cd', tech: 'PostgreSQL 16', latency: '38ms' },
      { id: 'n3', label: 'Pydantic Gatekeeper', role: 'Schema validation & hallucination block', tech: 'FastAPI / Pydantic v2', latency: '4ms' },
      { id: 'n4', label: 'Action Dispatcher', role: 'Deterministic ticket routing & slack alert', tech: 'Redis Streams / Worker', latency: '18ms' },
    ],
    stackTags: ['Python 3.12', 'FastAPI', 'PostgreSQL 16', 'pgvector', 'Pydantic v2', 'Redis', 'OpenTelemetry'],
    keyFeatures: [
      'Single-round hybrid reciprocal rank fusion retrieval',
      'Deterministic Pydantic v2 contract enforcement',
      '50-case CI-blocking golden evaluation harness',
      'Human-in-the-loop fallback with automated escalation',
    ],
    outcomesSummary: 'Reduced triage latency from 48 minutes to 1.35s; 99.4% citation accuracy on 12,000+ production tickets with 0 unverified actions.',
    liveUrl: 'https://demo.wtfear.agency/projects/sentinel-rag-triage',
    repoUrl: 'https://github.com/wtfearb/demo-sentinel-rag',
    isPublished: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-02-nexus',
    slug: 'nexus-b2b-tenant-portal',
    indexNumber: 2,
    title: 'Nexus Multi-Tenant B2B Workspaces & Entitlements',
    industry: 'Enterprise B2B SaaS',
    category: 'High-Performance Web Applications',
    summary: 'Sub-second Core Web Vitals B2B portal with PostgreSQL 16 Row-Level Security, React 19 RSC, and granular role-based access.',
    problem: 'Legacy single-tenant portals incurred high cloud hosting overhead, slow render times (LCP > 3.8s), and data bleed risks between enterprise clients.',
    solution: 'Designed and deployed a unified Next.js 15 App Router platform with React Server Components, Drizzle ORM, and database-level RLS policies keyed by tenant_id. Cached session tokens at edge with Cloudflare Workers.',
    architectureNodesJson: [
      { id: 'n1', label: 'Edge Proxy', role: 'Tenant subdomain routing & JWT decode', tech: 'Cloudflare Edge', latency: '8ms' },
      { id: 'n2', label: 'Server Components', role: 'Streaming RSC zero-client-JS payload', tech: 'Next.js 15 App Router', latency: '45ms' },
      { id: 'n3', label: 'Postgres RLS', role: 'Hardware-enforced tenant isolation', tech: 'PostgreSQL 16 RLS', latency: '14ms' },
      { id: 'n4', label: 'Stripe Metering', role: 'Seat & API usage synchronization', tech: 'Stripe API / Webhooks', latency: '65ms' },
    ],
    stackTags: ['Next.js 15', 'React 19', 'TypeScript 5.7', 'PostgreSQL 16', 'Drizzle ORM', 'Tailwind CSS v4'],
    keyFeatures: [
      'Sub-1.2s Largest Contentful Paint (LCP) performance',
      'Strict database-enforced multi-tenant Row-Level Security',
      'Granular RBAC entitlement engine with audit logs',
      'Instant organization workspace switching',
    ],
    outcomesSummary: 'Achieved 820ms LCP on 4G connections; 100% tenant data separation verified across 45 enterprise accounts without leak incidents.',
    liveUrl: 'https://demo.wtfear.agency/projects/nexus-b2b-tenant-portal',
    repoUrl: 'https://github.com/wtfearb/demo-nexus-portal',
    isPublished: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-03-chronos',
    slug: 'chronos-event-ingestion-spine',
    indexNumber: 3,
    title: 'Chronos Sub-15ms Event Ingestion & Replay Spine',
    industry: 'FinTech & Telemetry',
    category: 'Distributed Systems & Queues',
    summary: 'High-throughput event streaming spine processing 25,000 events/sec with Redis Streams, exponential backoff, and dead-letter replay.',
    problem: 'A payments orchestration engine suffered from dropped webhooks during third-party gateway downtime and lacked deterministic replay mechanisms for failed transactions.',
    solution: 'Built an idempotent ingestion service using Cloudflare Workers and Redis Streams consumer groups. Configured exponential backoff retry queues and an automated DLQ recovery daemon with HMAC signature validation.',
    architectureNodesJson: [
      { id: 'n1', label: 'Global Edge Ingress', role: 'HMAC verification & fast 202 accept', tech: 'Cloudflare Workers', latency: '9ms' },
      { id: 'n2', label: 'Redis Streams Bus', role: 'Persistent partition queue with consumer groups', tech: 'Redis Cluster', latency: '4ms' },
      { id: 'n3', label: 'Python Consumer Pod', role: 'Transactional settlement & state machine', tech: 'FastAPI / AsyncIO', latency: '22ms' },
      { id: 'n4', label: 'Dead-Letter Replay', role: 'Automated remediation & poison message quarantine', tech: 'PostgreSQL + Cron', latency: '150ms' },
    ],
    stackTags: ['Python 3.12', 'Redis Streams', 'Cloudflare Workers', 'PostgreSQL 16', 'Docker', 'OpenTelemetry'],
    keyFeatures: [
      'Sub-15ms edge webhook acknowledgment with idempotency keys',
      'Consumer group parallel processing with at-least-once delivery',
      'Dead-letter queue with one-click administrative replay CLI',
      'Distributed OpenTelemetry trace propagation across boundaries',
    ],
    outcomesSummary: 'Zero dropped events across 18M monthly webhooks; recovered 100% of failed third-party gateway timeouts without data loss.',
    liveUrl: 'https://demo.wtfear.agency/projects/chronos-event-ingestion-spine',
    repoUrl: 'https://github.com/wtfearb/demo-chronos-spine',
    isPublished: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-04-veritas',
    slug: 'veritas-contract-intelligence',
    indexNumber: 4,
    title: 'Veritas Autonomous Legal Contract & Clause Analyzer',
    industry: 'LegalTech & Enterprise Risk',
    category: 'Governed AI & Autonomous Agents',
    summary: 'Automated 120-page MSA and NDA risk extraction pipeline with deterministic clause scoring and redline suggestion diffs.',
    problem: 'Corporate legal counsel took an average of 4 business days to review standard vendor MSAs, identifying indemnity gaps and non-standard termination terms manually.',
    solution: 'Developed a deterministic clause extraction pipeline using LangChain, semantic section chunking, and PostgreSQL pgvector embeddings. Highlights deviation against corporate playbooks with exact character-offset citations.',
    architectureNodesJson: [
      { id: 'n1', label: 'Document Parser', role: 'PDF/DOCX OCR and AST block decomposition', tech: 'Python 3.12 / PyMuPDF', latency: '320ms' },
      { id: 'n2', label: 'Semantic Index', role: 'Clause vector embedding and lookup', tech: 'pgvector HNSW', latency: '28ms' },
      { id: 'n3', label: 'Rule Evaluator', role: 'Corporate playbook clause deviation check', tech: 'Pydantic v2 Guardrails', latency: '12ms' },
      { id: 'n4', label: 'Diff Generator', role: 'Visual redline and markup export', tech: 'Next.js 15 UI', latency: '55ms' },
    ],
    stackTags: ['Python 3.12', 'FastAPI', 'Next.js 15', 'pgvector', 'PostgreSQL 16', 'Tailwind CSS v4'],
    keyFeatures: [
      'Exact character-level source text grounding for every finding',
      'Playbook deviation confidence score and risk categorization',
      'Exportable Markdown and Word redline documents',
      '100% on-premise / isolated VPC deployment compatibility',
    ],
    outcomesSummary: 'Reduced MSA turnaround from 4 days to 3.5 minutes; flagged 100% of high-risk indemnity clauses across 450 historical audits.',
    liveUrl: 'https://demo.wtfear.agency/projects/veritas-contract-intelligence',
    repoUrl: 'https://github.com/wtfearb/demo-veritas-legal',
    isPublished: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-05-pulse',
    slug: 'pulse-fintech-ledger-sync',
    indexNumber: 5,
    title: 'Pulse Double-Entry Multi-Currency Ledger Engine',
    industry: 'FinTech & Neobanking',
    category: 'High-Performance Web Applications',
    summary: 'Immutable double-entry balance accounting system supporting 14 fiat currencies with cryptographically sealed audit logs.',
    problem: 'A cross-border remittance startup suffered from balance discrepancies due to race conditions in concurrent multi-currency conversion transactions.',
    solution: 'Implemented an append-only double-entry ledger using PostgreSQL table partition constraints, serializable transaction isolation, and hash-chained audit proofs.',
    architectureNodesJson: [
      { id: 'n1', label: 'API Gateway', role: 'Idempotency validation & rate limiting', tech: 'FastAPI / Cloudflare', latency: '15ms' },
      { id: 'n2', label: 'Ledger Engine', role: 'Serializable multi-entry balance debit/credit', tech: 'PostgreSQL 16 ACID', latency: '18ms' },
      { id: 'n3', label: 'FX Rate Feed', role: 'Sub-minute currency conversion oracle', tech: 'Redis In-Memory Cache', latency: '2ms' },
      { id: 'n4', label: 'Audit Seal', role: 'SHA-256 block hash generation for statements', tech: 'Python Cryptography', latency: '8ms' },
    ],
    stackTags: ['TypeScript 5.7', 'FastAPI', 'PostgreSQL 16', 'Redis', 'Docker', 'OpenTelemetry'],
    keyFeatures: [
      'Mathematically verified double-entry invariant: sum(debits) == sum(credits)',
      'Serializable isolation level preventing double-spend and race conditions',
      'Append-only cryptographic tamper detection chain',
      'Real-time balance reporting dashboard in Next.js 15',
    ],
    outcomesSummary: 'Zero balance discrepancies across $42M in transaction volume; sustained 1,400 concurrent writes/sec with zero locking deadlocks.',
    liveUrl: 'https://demo.wtfear.agency/projects/pulse-fintech-ledger-sync',
    repoUrl: 'https://github.com/wtfearb/demo-pulse-ledger',
    isPublished: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-06-atlas',
    slug: 'atlas-supply-chain-control',
    indexNumber: 6,
    title: 'Atlas Global Fleet & Telematics Telemetry Graph',
    industry: 'Logistics & Supply Chain',
    category: 'Distributed Systems & Queues',
    summary: 'Real-time telemetry tracking and geofence alerting system streaming 100,000 IoT sensor pings per minute.',
    problem: 'Cold-chain freight operators experienced shipment spoilage because temperature alerts were delayed by up to 35 minutes in legacy batch processing jobs.',
    solution: 'Designed an event-driven telemetry pipeline using Kafka-compatible queues, PostGIS spatial indexing, and Server-Sent Events (SSE) live updates to Next.js dispatch desks.',
    architectureNodesJson: [
      { id: 'n1', label: 'MQTT Ingest', role: 'Sensor heartbeat and geoloc streaming', tech: 'Edge MQTT Broker', latency: '22ms' },
      { id: 'n2', label: 'Spatial Filter', role: 'PostGIS geofence breach calculation', tech: 'PostgreSQL / PostGIS', latency: '16ms' },
      { id: 'n3', label: 'Alert Evaluator', role: 'Temperature threshold anomaly detector', tech: 'FastAPI Streaming', latency: '5ms' },
      { id: 'n4', label: 'Fleet Map UI', role: 'Real-time vector map rendering', tech: 'Next.js 15 / Mapbox GL', latency: '60fps' },
    ],
    stackTags: ['Next.js 15', 'Python 3.12', 'PostgreSQL 16', 'PostGIS', 'Redis', 'Tailwind CSS v4'],
    keyFeatures: [
      'Sub-500ms end-to-end alert latency from sensor breach to dispatcher screen',
      'Dynamic PostGIS polygon geofencing across international shipping corridors',
      'Battery-optimized compressed telemetry protocol for IoT hardware',
      'Offline-first mobile PWA for field drivers',
    ],
    outcomesSummary: 'Eliminated delayed temperature alerts, reducing spoiled perishable freight incidents by 94% across 850 active transport vehicles.',
    liveUrl: 'https://demo.wtfear.agency/projects/atlas-supply-chain-control',
    repoUrl: 'https://github.com/wtfearb/demo-atlas-fleet',
    isPublished: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-07-conductor',
    slug: 'conductor-erp-crm-bridge',
    indexNumber: 7,
    title: 'Conductor Bidirectional ERP-to-CRM Sync Orchestrator',
    industry: 'Enterprise Software & Manufacturing',
    category: 'Distributed Systems & Queues',
    summary: 'Conflict-free bidirectional sync engine between SAP/NetSuite and Salesforce with deterministic schema reconciliation.',
    problem: 'A manufacturing client suffered from order duplication and inventory mismatch due to asynchronous two-way synchronization conflicts between legacy SAP and Salesforce.',
    solution: 'Architected a deterministic reconciliation state machine using vector clocks, optimistic concurrency tokens, and an administrative review portal for disputed records.',
    architectureNodesJson: [
      { id: 'n1', label: 'SAP Change Feed', role: 'CDC change capture and payload normalize', tech: 'FastAPI Connector', latency: '85ms' },
      { id: 'n2', label: 'Conflict Resolver', role: 'Vector clock & last-write precedence engine', tech: 'Python 3.12 Engine', latency: '12ms' },
      { id: 'n3', label: 'CRM Push Worker', role: 'Batched Salesforce Bulk API v2 worker', tech: 'Redis Queue Worker', latency: '120ms' },
      { id: 'n4', label: 'Dispute Dashboard', role: 'Human override portal for ambiguous records', tech: 'Next.js 15 App Router', latency: '40ms' },
    ],
    stackTags: ['Python 3.12', 'TypeScript 5.7', 'Next.js 15', 'PostgreSQL 16', 'Redis', 'Docker'],
    keyFeatures: [
      'Zero-duplication guarantee using vector clocks and idempotency keys',
      'Automated bidirectional schema transformation and type casting',
      'Granular audit trail showing field-level change lineage',
      'Configurable dispute resolution rules for enterprise admins',
    ],
    outcomesSummary: 'Eliminated manual ERP data entry overhead; synchronized 350,000 records daily with zero data loss and 99.98% automated resolution.',
    liveUrl: 'https://demo.wtfear.agency/projects/conductor-erp-crm-bridge',
    repoUrl: 'https://github.com/wtfearb/demo-conductor-sync',
    isPublished: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-08-aegis',
    slug: 'aegis-compliance-audit-vault',
    indexNumber: 8,
    title: 'Aegis Immutable SOC2 & HIPAA Audit Trail Vault',
    industry: 'HealthTech & Cybersecurity',
    category: 'High-Performance Web Applications',
    summary: 'Cryptographically verifiable compliance vault recording every user data read/write for SOC2 Type II and HIPAA compliance.',
    problem: 'Healthcare clients required proof that patient health records (PHI) had never been tampered with or inspected by unauthorized personnel without a court-admissible audit log.',
    solution: 'Built an immutable audit log using PostgreSQL WORM (Write Once, Read Many) patterns, Merkle tree epoch root anchoring, and an automated SOC2 evidence export API.',
    architectureNodesJson: [
      { id: 'n1', label: 'Audit Middleware', role: 'Zero-overhead async event capture', tech: 'Next.js 15 / Node Edge', latency: '3ms' },
      { id: 'n2', label: 'Merkle Tree Engine', role: 'Batched cryptographic hash tree construction', tech: 'Python 3.12 Worker', latency: '45ms' },
      { id: 'n3', label: 'Immutable Storage', role: 'WORM partitioned database storage', tech: 'PostgreSQL 16 WORM', latency: '12ms' },
      { id: 'n4', label: 'Auditor Inspector', role: 'One-click cryptographic verification UI', tech: 'Next.js 15 RSC', latency: '30ms' },
    ],
    stackTags: ['Next.js 15', 'React 19', 'Python 3.12', 'PostgreSQL 16', 'Drizzle ORM', 'Cryptography'],
    keyFeatures: [
      'Cryptographic Merkle tree verification proving log immutability',
      'Zero performance impact on primary application query path (< 3ms)',
      'Automated SOC2 and HIPAA audit report generation',
      'Granular field-level redaction for privacy-compliant inspections',
    ],
    outcomesSummary: 'Passed two back-to-back SOC2 Type II and HIPAA audits with zero non-conformity findings across 85 million patient record events.',
    liveUrl: 'https://demo.wtfear.agency/projects/aegis-compliance-audit-vault',
    repoUrl: 'https://github.com/wtfearb/demo-aegis-vault',
    isPublished: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-09-prism',
    slug: 'prism-programmatic-seo-engine',
    indexNumber: 9,
    title: 'Prism High-Performance Programmatic Content Pipeline',
    industry: 'Publishing & High-Growth Consumer Tech',
    category: 'High-Performance Web Applications',
    summary: 'Engine generating 250,000 statically generated, sub-800ms landing pages with dynamic JSON-LD @graph and instant ISR invalidation.',
    problem: 'A marketplace startup was losing organic search traffic because their client-side rendered catalogue could not be indexed effectively by search engines and AI crawlers.',
    solution: 'Designed a programmatic SEO architecture with Next.js 15 Incremental Static Regeneration (ISR), optimized shared layout caches, and rich Schema.org linked JSON-LD.',
    architectureNodesJson: [
      { id: 'n1', label: 'Data Pre-Processor', role: 'Template compilation & schema validation', tech: 'Node.js / TypeScript', latency: '150ms' },
      { id: 'n2', label: 'ISR Static Builder', role: 'Dynamic page generation with cache tags', tech: 'Next.js 15 App Router', latency: '65ms' },
      { id: 'n3', label: 'Edge Cache Layer', role: 'Global CDN distribution & instant purge', tech: 'Cloudflare / Vercel Edge', latency: '18ms' },
      { id: 'n4', label: 'Schema.org Graph', role: 'Complete linked entity graph for AEO/SEO', tech: 'JSON-LD Engine', latency: '2ms' },
    ],
    stackTags: ['Next.js 15', 'React 19', 'TypeScript 5.7', 'Tailwind CSS v4', 'PostgreSQL 16'],
    keyFeatures: [
      'Generates 250,000+ unique, canonical pages with sub-second LCP',
      'Automated JSON-LD Schema.org graph generator for AI search engine parsing',
      'Tag-based on-demand ISR revalidation via edge webhooks',
      'Automated OpenGraph card generation at build time',
    ],
    outcomesSummary: 'Increased indexed search pages from 4,000 to 240,000; drove a 340% increase in qualified organic engineering leads in 90 days.',
    liveUrl: 'https://demo.wtfear.agency/projects/prism-programmatic-seo-engine',
    repoUrl: 'https://github.com/wtfearb/demo-prism-seo',
    isPublished: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-10-forge',
    slug: 'forge-legacy-monolith-strangler',
    indexNumber: 10,
    title: 'Forge Monolith-to-Microservices Strangler Router',
    industry: 'Enterprise Modernization & Retail',
    category: 'Distributed Systems & Queues',
    summary: 'Zero-downtime Strangler Fig proxy carving out mission-critical payment and inventory services from a 12-year-old Ruby on Rails monolith.',
    problem: 'A $120M e-commerce brand suffered repeated checkout crashes during Black Friday due to database connection exhaustion on their legacy monolith.',
    solution: 'Engineered an intelligent traffic-routing reverse proxy using Cloudflare Workers and Go microservices. Intercepted checkout and inventory endpoints with zero downtime, falling back to legacy systems on failure.',
    architectureNodesJson: [
      { id: 'n1', label: 'Strangler Proxy', role: 'Route dispatch & canary percentage split', tech: 'Cloudflare Workers', latency: '6ms' },
      { id: 'n2', label: 'New Checkout Pod', role: 'Stateless checkout and payment service', tech: 'Go / FastAPI', latency: '25ms' },
      { id: 'n3', label: 'Legacy Monolith', role: 'Unmodified legacy core for non-migrated paths', tech: 'Ruby on Rails 5', latency: '280ms' },
      { id: 'n4', label: 'Shadow Verifier', role: 'Asynchronous response comparison auditor', tech: 'Redis / Worker', latency: '15ms' },
    ],
    stackTags: ['Cloudflare Workers', 'Python 3.12', 'Go', 'PostgreSQL 16', 'Redis', 'Docker'],
    keyFeatures: [
      'Dynamic canary traffic splitting from 1% to 100% with instant rollback',
      'Shadow traffic auditing comparing legacy vs modern API responses',
      'Zero downtime throughout the 6-month progressive migration',
      'Distributed tracing linking requests across both modern and legacy services',
    ],
    outcomesSummary: 'Handled 4.2x Black Friday traffic with 100% uptime; cut checkout p95 latency from 1,850ms down to 140ms.',
    liveUrl: 'https://demo.wtfear.agency/projects/forge-legacy-monolith-strangler',
    repoUrl: 'https://github.com/wtfearb/demo-forge-strangler',
    isPublished: true,
    updatedAt: new Date().toISOString(),
  },
] as const;

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  portfolioDisplayMode: 'showcase_10_projects',
};
