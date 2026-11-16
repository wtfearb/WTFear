/**
 * @file Pure State Reducer & Catalog for Production Blueprints
 * @version 3.0.0
 */

export type BlueprintId = 'ai-triage' | 'saas-portal' | 'event-spine';

export type BlueprintCategory = 'ALL' | 'AI AGENTS' | 'SAAS & PORTALS' | 'SYSTEMS';

export interface BlueprintChecklistStep {
  readonly stepIndex: string;
  readonly title: string;
  readonly specification: string;
  readonly latencyTarget?: string;
}

export interface BlueprintItem {
  readonly id: BlueprintId;
  readonly title: string;
  readonly badge: string;
  readonly category: BlueprintCategory;
  readonly durationLabel: string;
  readonly summary: string;
  readonly problemStatement: string;
  readonly stack: readonly string[];
  readonly verificationGate: string;
  readonly checklist: readonly BlueprintChecklistStep[];
}

export const BLUEPRINT_CATALOG: readonly BlueprintItem[] = [
  {
    id: 'ai-triage',
    title: 'Governed Support & Ops Triage Agent',
    badge: 'AI AGENTS',
    category: 'AI AGENTS',
    durationLabel: '2-Week Sprint',
    summary: 'Autonomous Tier-1 support & system incident triage with zero uncited responses and deterministic human handoff.',
    problemStatement: 'Unchecked LLM hallucination and lack of verified retrieval citations risk catastrophic SLA violations and incorrect remediation in production support.',
    stack: ['Python 3.12', 'FastAPI', 'Pydantic v2', 'PostgreSQL 16 pgvector', 'BM25 RRF', 'OpenTelemetry'],
    verificationGate: '50-case golden evaluation harness (100% citation precision, cosine >= 0.85)',
    checklist: [
      {
        stepIndex: '01',
        title: 'Ingress Validation & Guardrails',
        specification: 'Strict Pydantic v2 schemas reject adversarial prompt injection and validate customer tenant signatures before LLM invocation.',
        latencyTarget: '< 25ms',
      },
      {
        stepIndex: '02',
        title: 'Hybrid Reciprocal Rank Fusion Retrieval',
        specification: 'PostgreSQL 16 combines dense pgvector HNSW cosine similarity (<=>) with full-text BM25 ts_rank_cd in a single indexed query.',
        latencyTarget: '< 45ms',
      },
      {
        stepIndex: '03',
        title: 'Confidence & Grounding Verification Gate',
        specification: 'Autonomous resolution only triggers when model confidence >= 0.82 and grounding score >= 0.78 with valid chunk citations; otherwise routes to Slack #ops-escalation.',
        latencyTarget: '< 300ms',
      },
    ],
  },
  {
    id: 'saas-portal',
    title: 'Zero-Friction Multi-Tenant SaaS Portal',
    badge: 'SAAS & PORTALS',
    category: 'SAAS & PORTALS',
    durationLabel: '2 to 4 Weeks MVP',
    summary: 'High-performance Next.js 15 App Router web application with PostgreSQL Row-Level Security and sub-second Core Web Vitals.',
    problemStatement: 'Modern B2B portals often suffer from bloated client bundles, clunky multi-tenant authorization leaks, and poor LCP performance.',
    stack: ['Next.js 15 (React 19 RSC)', 'TypeScript 5.7', 'Tailwind CSS v4', 'PostgreSQL 16 RLS', 'Playwright'],
    verificationGate: 'Playwright E2E security isolation suite + Lighthouse CI performance >= 98',
    checklist: [
      {
        stepIndex: '01',
        title: 'Cryptographic Edge Nonce & Auth Boundary',
        specification: 'Per-request CSP nonce middleware enforces strict XSS prevention while session JWT verifies tenant claims at the edge.',
        latencyTarget: '< 15ms',
      },
      {
        stepIndex: '02',
        title: 'Server-Rendered Multi-Tenant Data Layer',
        specification: 'PostgreSQL 16 RLS policies isolate organization records with zero ORM overhead; React Server Components stream UI chunks with sub-second LCP.',
        latencyTarget: '< 180ms',
      },
      {
        stepIndex: '03',
        title: 'Zero-JS Semantic Tables & Accessible Drawers',
        specification: 'All pricing, contracts, and telemetry tables render SSR semantic HTML with keyboard-trapped modal dialogs conforming to WCAG 2.2 AAA.',
        latencyTarget: '< 50ms',
      },
    ],
  },
  {
    id: 'event-spine',
    title: 'Event-Driven Sync & Observability Spine',
    badge: 'SYSTEMS',
    category: 'SYSTEMS',
    durationLabel: '2-Week Sprint',
    summary: 'Resilient event-driven ingestion with Cloudflare Workers, Redis Streams, exponential backoff, and dead-letter queue recovery.',
    problemStatement: 'Third-party webhooks and distributed syncing frequently fail due to rate limits and network partitions without reliable replay mechanics.',
    stack: ['Cloudflare Workers', 'Redis Streams', 'FastAPI', 'asyncpg', 'OpenTelemetry', 'BetterStack'],
    verificationGate: 'k6 load test (5,000 req/sec, zero packet loss) + automated DLQ replay worker validation',
    checklist: [
      {
        stepIndex: '01',
        title: 'Idempotent Ingress & Sliding Lock',
        specification: 'Cloudflare Worker validates raw HMAC SHA-256 signatures and checks 24h idempotency key cache to prevent replay storms.',
        latencyTarget: '< 12ms',
      },
      {
        stepIndex: '02',
        title: 'Transactional Outbox & Exponential Backoff',
        specification: 'Database events commit atomically with domain payloads; worker queues execute fan-out with jittered exponential retry (attempts 1 to 5).',
        latencyTarget: '< 35ms',
      },
      {
        stepIndex: '03',
        title: 'DLQ Circuit Breaker & One-Command Replay',
        specification: 'Unresolved delivery failures trigger P1 PagerDuty telemetry and can be replayed deterministically via replay_dlq.py CLI.',
        latencyTarget: '< 200ms',
      },
    ],
  },
];

export interface BlueprintsMachineState {
  readonly selectedCategory: BlueprintCategory;
  readonly inspectedBlueprintId: BlueprintId | null;
}

export type BlueprintsMachineAction =
  | { type: 'SELECT_CATEGORY'; category: BlueprintCategory }
  | { type: 'OPEN_DRAWER'; id: BlueprintId }
  | { type: 'CLOSE_DRAWER' };

export const INITIAL_BLUEPRINTS_STATE: BlueprintsMachineState = {
  selectedCategory: 'ALL',
  inspectedBlueprintId: null,
};

export function blueprintsReducer(
  state: BlueprintsMachineState,
  action: BlueprintsMachineAction
): BlueprintsMachineState {
  switch (action.type) {
    case 'SELECT_CATEGORY': {
      if (state.selectedCategory === action.category) {
        return state;
      }
      // Invariant: If a blueprint is currently inspected, but it does NOT belong to the newly selected category (and category is not ALL),
      // we must close the drawer automatically!
      if (state.inspectedBlueprintId) {
        const inspected = BLUEPRINT_CATALOG.find((b) => b.id === state.inspectedBlueprintId);
        if (action.category !== 'ALL' && inspected?.category !== action.category) {
          return {
            selectedCategory: action.category,
            inspectedBlueprintId: null,
          };
        }
      }
      return {
        ...state,
        selectedCategory: action.category,
      };
    }
    case 'OPEN_DRAWER':
      return {
        ...state,
        inspectedBlueprintId: action.id,
      };
    case 'CLOSE_DRAWER':
      return {
        ...state,
        inspectedBlueprintId: null,
      };
    default:
      return state;
  }
}
