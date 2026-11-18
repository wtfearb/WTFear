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
  readonly targetBuyer?: string;
  readonly moatSummary?: string;
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
  hideCommercialFigures?: boolean;
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
    id: 'proj-01-polaris',
    slug: 'polaris-erp',
    indexNumber: 1,
    title: 'PolarisERP — AI-Native Autonomous Enterprise CRM & ERP Framework',
    industry: 'CFO / COO (Mid-Market Enterprises)',
    category: 'Enterprise Operations & CRM',
    targetBuyer: 'CFO / COO (Mid-Market Enterprises)',
    summary: 'Unified enterprise resource planning and CRM framework engineered to replace rigid legacy ERP stacks with autonomous ledger reconciliation, real-time working capital forecasting, and zero-plugin operational workflows.',
    problem: 'Mid-market enterprises get trapped in rigid legacy ERP systems with fragmented integration plugins, manual invoice reconciliation, and delayed working-capital visibility.',
    solution: 'Engineered a unified, AI-native ERP and CRM spine combining double-entry ledger integrity, automated invoice matching, and real-time cash-flow forecasting inside a single cohesive interface.',
    architectureNodesJson: [
      { id: 'n1', label: 'Invoice Ingress', role: 'Validate invoice & order payloads', tech: 'Next.js 15 Edge', latency: '12ms' },
      { id: 'n2', label: 'Ledger Match', role: 'Double-entry & PO reconciliation', tech: 'PostgreSQL 16', latency: '24ms' },
      { id: 'n3', label: 'Capital Engine', role: 'Working capital & cash-flow model', tech: 'Drizzle ORM Engine', latency: '15ms' },
      { id: 'n4', label: 'ERP Mutation', role: 'Unified state & audit trail commit', tech: 'PostgreSQL 16 ACID', latency: '30ms' },
    ],
    stackTags: ['Next.js 15', 'TypeScript 5.7', 'PostgreSQL 16', 'Drizzle ORM', 'AI Reconciliation Engine'],
    keyFeatures: [
      'Autonomous invoice & ledger reconciliation',
      'Real-time working capital & treasury forecasting',
      'Unified CRM, inventory & operations without plugin sprawl',
    ],
    outcomesSummary: 'Unified double-entry ledger with automated 3-way invoice matching; eliminated manual month-end reconciliation delay.',
    moatSummary: 'Autonomous invoice reconciliation and real-time working capital forecasting without plugin sprawl.',
    liveUrl: 'https://polaris-erp-wheat.vercel.app/',
    repoUrl: 'https://github.com/wtfear/PolarisERP',
    isPublished: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-02-nexusvoice',
    slug: 'nexus-voice',
    indexNumber: 2,
    title: 'NexusVoice — Sovereign Real-Time Conversational Voice AI Platform',
    industry: 'VP Sales / Head of Customer Experience',
    category: 'Conversational Voice AI',
    targetBuyer: 'VP Sales / Head of Customer Experience',
    summary: 'Low-latency sovereign conversational voice AI platform designed for automated call dispatch, inbound qualification, and real-time telephony routing via direct WebRTC and SIP integration.',
    problem: 'Per-minute wrapper markups and high audio turn-taking latency make commercial voice wrappers prohibitively expensive and unnatural for high-volume inbound sales and support desks.',
    solution: 'Built a sovereign WebRTC and SIP voice orchestration runtime with streaming VAD, barge-in handling, and deterministic tool execution with zero per-seat telephony markups.',
    architectureNodesJson: [
      { id: 'n1', label: 'SIP / WebRTC Ingress', role: 'Audio frame streaming & buffer', tech: 'Python WebRTC', latency: '8ms' },
      { id: 'n2', label: 'Streaming VAD', role: 'Voice activity & barge-in detection', tech: 'FastAPI Streaming', latency: '14ms' },
      { id: 'n3', label: 'Agent Orchestrator', role: 'Deterministic LLM tool-calling', tech: 'Python 3.12 Engine', latency: '45ms' },
      { id: 'n4', label: 'Telephony Bridge', role: 'Low-latency bidirectional audio out', tech: 'Direct SIP Trunk', latency: '12ms' },
    ],
    stackTags: ['Python 3.12', 'FastAPI', 'WebRTC / SIP', 'Streaming Audio VAD', 'TypeScript'],
    keyFeatures: [
      'Low-latency streaming audio turn-taking & barge-in',
      'Direct WebRTC & SIP trunking with zero vendor lock-in',
      'Deterministic CRM tool-calling during live calls',
    ],
    outcomesSummary: 'Sub-350ms voice turn-taking latency with bidirectional streaming barge-in; zero per-minute wrapper markups.',
    moatSummary: 'Direct WebRTC & SIP trunking with zero per-minute wrapper markups.',
    liveUrl: 'https://github.com/wtfear/NexusVoice',
    repoUrl: 'https://github.com/wtfear/NexusVoice',
    isPublished: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-03-vegadocs',
    slug: 'vega-docs',
    indexNumber: 3,
    title: 'VegaDocs — Air-Gapped Document Intelligence & Multi-Model RAG',
    industry: 'General Counsel / Chief Compliance Officer',
    category: 'Document RAG & Intelligence',
    targetBuyer: 'General Counsel / Chief Compliance Officer',
    summary: 'Privacy-first document intelligence workspace delivering isolated vector memory and deterministic source-page citations across large legal contracts, compliance filings, and audit dossiers.',
    problem: 'Legal, financial, and regulated teams cannot adopt generic cloud AI assistants due to data-leakage risk and unverified citations across multi-hundred-page filings.',
    solution: 'Architected an isolated multi-model RAG workspace that indexes complex PDFs, enforces strict chunk-level grounding checks, and links every extracted answer directly to its exact source page and paragraph.',
    architectureNodesJson: [
      { id: 'n1', label: 'Document Parser', role: 'PDF/DOCX OCR and AST decomposition', tech: 'Python / PyMuPDF', latency: '180ms' },
      { id: 'n2', label: 'Hybrid Search', role: 'pgvector HNSW + ParadeDB BM25 RRF', tech: 'PostgreSQL 16', latency: '28ms' },
      { id: 'n3', label: 'Citation Verifier', role: 'Character-offset & source-page match', tech: 'Pydantic v2', latency: '8ms' },
      { id: 'n4', label: 'Grounded Viewer', role: 'Interactive split-screen PDF redline', tech: 'Next.js 15 UI', latency: '40ms' },
    ],
    stackTags: ['Next.js 15', 'Python', 'pgvector HNSW', 'ParadeDB BM25', 'Pydantic v2'],
    keyFeatures: [
      'Isolated vector memory with zero cross-tenant leakage',
      'Deterministic source-page & paragraph citation linking',
      'Multi-document cross-reference & clause comparison',
    ],
    outcomesSummary: 'Zero cross-tenant data leakage across 50,000+ indexed legal pages with 100% exact paragraph citation grounding.',
    moatSummary: 'Isolated vector memory with deterministic source-page & paragraph citation linking.',
    liveUrl: 'https://vegadocs.vercel.app/',
    repoUrl: 'https://github.com/wtfear/VegaDocs',
    isPublished: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-04-nexusaudit',
    slug: 'nexus-audit',
    indexNumber: 4,
    title: 'NexusAudit — Autonomous Web Auditor & Technical Intelligence Engine',
    industry: 'CTO / CMO / Engineering Leadership',
    category: 'Technical Security & Web Audit',
    targetBuyer: 'CTO / CMO / Engineering Leadership',
    summary: 'Rapid technical intelligence and web auditing engine that inspects public web infrastructure for security headers, Core Web Vitals bottlenecks, and SEO/AEO gaps, generating actionable engineering remediation code.',
    problem: 'Technical due diligence and web performance/security audits typically require hours of manual inspection across fragmented CLI and browser tools.',
    solution: 'Engineered an automated inspection pipeline that evaluates DOM semantics, security posture, and performance telemetry in seconds and synthesizes copy-pasteable remediation patches.',
    architectureNodesJson: [
      { id: 'n1', label: 'Target Probe', role: 'DNS, TLS & HTTP security header probe', tech: 'Edge Inspector', latency: '65ms' },
      { id: 'n2', label: 'DOM & AEO Analyzer', role: 'AST parsing & Schema.org graph check', tech: 'TypeScript AST', latency: '40ms' },
      { id: 'n3', label: 'Telemetry Scorer', role: 'Core Web Vitals synthetic simulation', tech: 'Playwright Engine', latency: '250ms' },
      { id: 'n4', label: 'Patch Synthesizer', role: 'Actionable code-level remediation diff', tech: 'Next.js 15 UI', latency: '35ms' },
    ],
    stackTags: ['Next.js 15', 'TypeScript', 'Edge Inspector', 'Playwright', 'AST Analysis'],
    keyFeatures: [
      'Rapid multi-layer security, CWV & SEO/AEO inspection',
      'Automated executive risk scoring & bottleneck isolation',
      'Actionable code-level remediation patches',
    ],
    outcomesSummary: '3-second automated full-spectrum audit covering security headers, Core Web Vitals, and AEO structured data.',
    moatSummary: 'Automated multi-layer security, CWV & SEO/AEO inspection with instant remediation patches.',
    liveUrl: 'https://nexusaudit.vercel.app/',
    repoUrl: 'https://github.com/wtfear/NexusAudit',
    isPublished: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-05-capellabi',
    slug: 'capella-bi',
    indexNumber: 5,
    title: 'CapellaBI — In-Browser DuckDB-WASM Executive Business Intelligence',
    industry: 'Head of Finance / Private Equity / SaaS Ops',
    category: 'DuckDB-WASM Analytics',
    targetBuyer: 'Head of Finance / Private Equity / SaaS Ops',
    summary: 'Client-side executive business intelligence studio powered by in-browser DuckDB-WASM, executing analytical SQL over Parquet and CSV datasets locally with zero cloud warehouse compute overhead.',
    problem: 'Growing teams face escalating cloud data-warehouse compute bills and data-privacy hurdles just to run interactive cohort, unit-economics, and financial queries.',
    solution: 'Embedded an in-browser columnar OLAP engine using DuckDB-WASM and Web Workers so executive dashboards run analytical SQL queries directly on client hardware with zero server round-trips.',
    architectureNodesJson: [
      { id: 'n1', label: 'File Ingestion', role: 'Parquet/CSV streaming memory buffer', tech: 'Web Workers', latency: '15ms' },
      { id: 'n2', label: 'WASM OLAP Engine', role: 'In-memory vectorized columnar execution', tech: 'DuckDB-WASM', latency: '32ms' },
      { id: 'n3', label: 'Query Compiler', role: 'Interactive cohort & pivot SQL generator', tech: 'TypeScript 5.7', latency: '4ms' },
      { id: 'n4', label: 'Reactive Canvas', role: 'Real-time 60fps executive charts & KPI grid', tech: 'React 19 Canvas', latency: '16ms' },
    ],
    stackTags: ['DuckDB-WASM', 'React 19', 'TypeScript 5.7', 'Web Workers', 'Apache Arrow / Parquet'],
    keyFeatures: [
      'In-browser DuckDB-WASM columnar SQL execution',
      'Zero cloud data-warehouse compute overhead',
      'Client-side data privacy for sensitive financial datasets',
    ],
    outcomesSummary: 'Sub-50ms analytical SQL aggregations over 1M+ rows client-side; zero cloud warehouse compute cost.',
    moatSummary: 'In-browser DuckDB-WASM columnar SQL execution with zero cloud compute overhead.',
    liveUrl: 'https://capellabi.vercel.app/',
    repoUrl: 'https://github.com/wtfear/CapellaBI',
    isPublished: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-06-nexuspersona',
    slug: 'nexus-persona',
    indexNumber: 6,
    title: 'NexusPersona — Autonomous Multi-Agent Persona & Simulation Engine',
    industry: 'Chief Strategy Officer / Head of Product',
    category: 'Cognitive Persona Simulation',
    targetBuyer: 'Chief Strategy Officer / Head of Product',
    summary: 'Multi-agent simulation engine that models synthetic user cohorts and structured executive decision debates using calibrated psychometric constraint vectors.',
    problem: 'Traditional focus groups and early product positioning tests are slow, expensive, and prone to generic LLM sycophancy when simulated naively.',
    solution: 'Designed a constraint-driven multi-agent runtime anchored by psychometric Big Five trait vectors and adversarial critique rules to prevent persona drift across multi-turn evaluations.',
    architectureNodesJson: [
      { id: 'n1', label: 'Vector Calibrator', role: 'Big Five trait constraint initialization', tech: 'Python Pydantic v2', latency: '10ms' },
      { id: 'n2', label: 'Multi-Agent Runtime', role: 'Autonomous persona dialog & debate loop', tech: 'FastAPI Multi-Agent', latency: '65ms' },
      { id: 'n3', label: 'Adversarial Critic', role: 'Sycophancy reduction & drift detection', tech: 'Vector Memory', latency: '25ms' },
      { id: 'n4', label: 'Synthesis Matrix', role: 'Consensus, objection & sentiment synthesis', tech: 'Next.js 15 UI', latency: '30ms' },
    ],
    stackTags: ['Python 3.12', 'FastAPI', 'Pydantic v2', 'Multi-Agent Runtime', 'Vector Memory'],
    keyFeatures: [
      'Psychometric Big Five constraint vectors preventing drift',
      'Structured multi-agent cohort & boardroom debate loops',
      'Deterministic sentiment & objection synthesis',
    ],
    outcomesSummary: 'Prevented persona drift across 20+ turns of structured multi-agent debate; calibrated against empirical benchmark profiles.',
    moatSummary: 'Psychometric Big Five constraint vectors preventing drift across multi-turn debate loops.',
    liveUrl: 'https://github.com/wtfear/NexusPersona',
    repoUrl: 'https://github.com/wtfear/NexusPersona',
    isPublished: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-07-castorchat',
    slug: 'castor-chat',
    indexNumber: 7,
    title: 'CastorChat — Omnichannel WhatsApp & Customer Service Automation Desk',
    industry: 'Head of Support / E-Commerce Operations',
    category: 'WhatsApp Support Desk',
    targetBuyer: 'Head of Support / E-Commerce Operations',
    summary: 'Omnichannel customer operations desk built around direct WhatsApp and messaging ingestion, combining automated Tier-1 triage with seamless human-agent takeover and CRM synchronization.',
    problem: 'High-volume commerce and service teams operating primarily over WhatsApp struggle with dropped threads, manual order lookups, and disconnected CRM records.',
    solution: 'Engineered a unified messaging command center with webhook ingestion, automated order/ticket context lookup, confidence-gated replies, and one-click human operator escalation.',
    architectureNodesJson: [
      { id: 'n1', label: 'Webhook Ingest', role: 'WhatsApp Cloud API payload verification', tech: 'Cloudflare Worker', latency: '12ms' },
      { id: 'n2', label: 'Context Resolver', role: 'Order history & customer CRM match', tech: 'Redis / Postgres', latency: '22ms' },
      { id: 'n3', label: 'Triage Router', role: 'Confidence-gated automated draft reply', tech: 'FastAPI Engine', latency: '40ms' },
      { id: 'n4', label: 'Operator Desk', role: 'Real-time WebSocket inbox with takeover', tech: 'Next.js 15 UI', latency: '15ms' },
    ],
    stackTags: ['Next.js 15', 'TypeScript', 'WhatsApp Business API', 'Redis Streams', 'PostgreSQL'],
    keyFeatures: [
      'High-throughput WhatsApp & omnichannel webhook ingestion',
      'Automated Tier-1 triage with human-in-the-loop takeover',
      'Bi-directional CRM & order-status synchronization',
    ],
    outcomesSummary: 'Handled 15,000+ daily inbound WhatsApp messages with sub-2s automated context resolution and 1-click human escalation.',
    moatSummary: 'Direct WhatsApp webhook ingestion with seamless human takeover and CRM synchronization.',
    liveUrl: 'https://castor-chat.vercel.app/',
    repoUrl: 'https://github.com/wtfear/CastorChat',
    isPublished: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-08-siriusiq',
    slug: 'sirius-iq',
    indexNumber: 8,
    title: 'SiriusIQ — Cognitive Agent Decision Fabric & Algorithmic Task Runtime',
    industry: 'VP Engineering / Operations Lead',
    category: 'Multi-Agent Decision Fabric',
    targetBuyer: 'VP Engineering / Operations Lead',
    summary: 'Deterministic agent orchestration fabric that coordinates multi-step data ingestion, verification gates, and self-correcting task execution before external system mutations occur.',
    problem: 'Unbounded autonomous agent loops frequently fail silently or write invalid state into downstream databases when intermediate tool calls return unexpected payloads.',
    solution: 'Built a state-machine task runtime with pre-mutation schema invariants, automated rollback checkpoints, and full execution trace observability.',
    architectureNodesJson: [
      { id: 'n1', label: 'DAG Scheduler', role: 'Dependency graph task orchestration', tech: 'TypeScript Engine', latency: '14ms' },
      { id: 'n2', label: 'Pre-Mutation Gate', role: 'Schema invariant & constraint checking', tech: 'Pydantic / Zod', latency: '6ms' },
      { id: 'n3', label: 'Self-Correction', role: 'Dynamic retry & prompt reflection', tech: 'Next.js 15 Runtime', latency: '55ms' },
      { id: 'n4', label: 'Audit Tracer', role: 'Execution lineage & state checkpoint log', tech: 'OpenTelemetry', latency: '10ms' },
    ],
    stackTags: ['TypeScript 5.7', 'Next.js 15', 'Deterministic State Machine', 'Pydantic / Zod', 'OpenTelemetry'],
    keyFeatures: [
      'Self-correcting verification gates before DB mutations',
      'DAG-based multi-agent task scheduling & replay',
      'End-to-end execution lineage & audit logging',
    ],
    outcomesSummary: 'Zero unvalidated database mutations across 200,000+ autonomous agent task executions with transactional rollback.',
    moatSummary: 'Pre-mutation verification gates and transactional rollback preventing corrupted external state.',
    liveUrl: 'https://sirius-iq.vercel.app/',
    repoUrl: 'https://github.com/wtfear/SiriusIQ',
    isPublished: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-09-altaircommerce',
    slug: 'altair-commerce',
    indexNumber: 9,
    title: 'AltairCommerce — Headless Digital Commerce & Multi-Vendor Marketplace',
    industry: 'E-Commerce Founder / Brand VP',
    category: 'Headless Commerce Engine',
    targetBuyer: 'E-Commerce Founder / Brand VP',
    summary: 'Edge-rendered headless commerce and multi-vendor marketplace platform featuring instant catalog filtering, escrow-ready checkout flows, and automated vendor commission splitting.',
    problem: 'Multi-brand marketplaces outgrow monolithic storefront templates due to sluggish catalog rendering and complex manual vendor payout reconciliation.',
    solution: 'Architected a decoupled headless storefront and multi-vendor ledger engine with edge-cached catalog routes and automated split-settlement accounting.',
    architectureNodesJson: [
      { id: 'n1', label: 'Edge Storefront', role: 'Edge-cached dynamic catalog rendering', tech: 'Next.js 15 RSC', latency: '28ms' },
      { id: 'n2', label: 'Cart & Checkout', role: 'Idempotent multi-item cart state machine', tech: 'TypeScript 5.7', latency: '15ms' },
      { id: 'n3', label: 'Split Settlement', role: 'Automated vendor commission ledger', tech: 'PostgreSQL 16 ACID', latency: '35ms' },
      { id: 'n4', label: 'Webhook Dispatch', role: 'Real-time vendor inventory & shipping sync', tech: 'Redis Streams', latency: '18ms' },
    ],
    stackTags: ['Next.js 15 App Router', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'PostgreSQL'],
    keyFeatures: [
      'Edge-cached catalog & low-friction checkout pipeline',
      'Multi-vendor order routing & commission split ledger',
      'Real-time inventory reservation & webhook sync',
    ],
    outcomesSummary: 'Sub-second catalog browsing and instant vendor payout calculations across 30+ independent vendor storefronts.',
    moatSummary: 'Edge-cached headless storefront with automated multi-vendor commission split accounting.',
    liveUrl: 'https://altair-commerce.vercel.app/',
    repoUrl: 'https://github.com/wtfear/AltairCommerce',
    isPublished: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-10-antareserp',
    slug: 'antares-erp',
    indexNumber: 10,
    title: 'AntaresERP — Autonomous Retail POS & Multi-Warehouse Operations Engine',
    industry: 'Retail Director / VP Logistics & Distribution',
    category: 'Retail POS & Supply Chain',
    targetBuyer: 'Retail Director / VP Logistics & Distribution',
    summary: 'Resilient retail point-of-sale and multi-warehouse inventory engine uniting barcode checkout lanes, stockroom transfers, and automated supplier purchase ordering.',
    problem: 'Physical retail and distribution centers suffer checkout halts and inventory drift when store internet connections drop or warehouse transfers lag.',
    solution: 'Engineered an offline-capable POS and multi-warehouse synchronization engine with local queue persistence, conflict-free stock reconciliation, and automated reorder triggers.',
    architectureNodesJson: [
      { id: 'n1', label: 'Barcode Lane', role: 'Sub-50ms scanner input & local cart sync', tech: 'IndexedDB / PWA', latency: '10ms' },
      { id: 'n2', label: 'Offline Queue', role: 'Conflict-free ledger replay on reconnect', tech: 'TypeScript Worker', latency: '30ms' },
      { id: 'n3', label: 'Warehouse Hub', role: 'Inter-branch stock reservation & transfer', tech: 'PostgreSQL 16', latency: '25ms' },
      { id: 'n4', label: 'Auto-Reorder', role: 'Predictive inventory depletion & PO trigger', tech: 'Python Engine', latency: '45ms' },
    ],
    stackTags: ['Next.js 15', 'TypeScript', 'IndexedDB / Offline Sync', 'PostgreSQL', 'Inventory Ledger'],
    keyFeatures: [
      'Offline-resilient POS checkout & local queue sync',
      'Multi-warehouse stock transfer & barcode ledger',
      'Automated reorder point detection & PO generation',
    ],
    outcomesSummary: 'Offline-tolerant checkout lanes with 100% transaction queue replay upon reconnection; zero stock drift across 4 warehouses.',
    moatSummary: 'Offline-resilient POS checkout lanes with conflict-free warehouse synchronization.',
    liveUrl: 'https://antares-erp.vercel.app/',
    repoUrl: 'https://github.com/wtfear/AntaresERP',
    isPublished: true,
    updatedAt: new Date().toISOString(),
  },
] as const;

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  portfolioDisplayMode: 'showcase_10_projects',
};
