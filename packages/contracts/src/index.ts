/**
 * @file Shared TypeScript DTOs, Schemas, and OpenTelemetry Semantics for wtfear.agency
 * @version 3.0.0
 */

// ---------------------------------------------------------------------------
// 1. OpenTelemetry Trace Semantic Constants
// ---------------------------------------------------------------------------
export const OPENTELEMETRY_SPANS = {
  EDGE_AUDIT_REQUEST: 'POST /api/audit',
  WEBHOOK_FANOUT: 'wtfear.webhook.fanout',
  AGENT_TRIAGE_ORCHESTRATE: 'agent.triage.orchestrate',
  DB_POSTGRES_HYBRID_RRF: 'db.postgres.hybrid_rrf',
  CAL_WEBHOOK_INGEST: 'wtfear.cal.webhook.ingest',
  SOW_GENERATOR: 'wtfear.sow.generate',
} as const;

export type OpenTelemetrySpanName =
  (typeof OPENTELEMETRY_SPANS)[keyof typeof OPENTELEMETRY_SPANS];

// ---------------------------------------------------------------------------
// 2. Audit Lead & Qualification Contracts (/api/audit)
// ---------------------------------------------------------------------------
export type TargetTimeline = 'immediate' | 'month' | 'exploring';

export type LeadTier = 'TIER_1_FAST_TRACK' | 'TIER_2_NURTURE';

export type LeadStage =
  | 'INBOUND_CAPTURED'
  | 'CAL_BOOKED'
  | 'TECHNICAL_SCOPING_READY'
  | 'SOW_GENERATED'
  | 'CLOSED_WON'
  | 'NURTURE';

export interface AuditSubmissionRequest {
  readonly email: string;
  readonly companyDomain: string;
  readonly systemBottleneck: string;
  readonly targetTimeline: TargetTimeline;
  readonly calculatorScope?: string;
  readonly turnstileToken?: string;
}

export interface AuditSubmissionResponse {
  readonly success: boolean;
  readonly leadId: string;
  readonly leadTier: LeadTier;
  readonly leadScore: number;
  readonly bookingUrl: string;
  readonly message: string;
  readonly traceId?: string;
}

export interface AuditLeadRecord {
  readonly leadId: string;
  readonly emailNormalized: string;
  readonly emailSha256: string;
  readonly companyDomain: string;
  readonly systemBottleneck: string;
  readonly targetTimeline: TargetTimeline;
  readonly calculatorScope: string | null;
  readonly leadScore: number;
  readonly leadTier: LeadTier;
  readonly stage: LeadStage;
  readonly enrichmentPayload: Record<string, unknown>;
  readonly createdAt: string;
  readonly updatedAt: string;
}

// ---------------------------------------------------------------------------
// 3. Agent Governance & Resolution Contracts
// ---------------------------------------------------------------------------
export type AgentResolutionStatus =
  | 'RESOLVED_AUTONOMOUSLY'
  | 'ESCALATE_TO_HUMAN'
  | 'BLOCKED_POLICY_GATE';

export interface SimulatedKnowledgeChunk {
  readonly chunkId: string;
  readonly documentUri: string;
  readonly excerpt: string;
  readonly denseScore: number;
  readonly bm25Score: number;
  readonly rrfScore: number;
  readonly citedByModel: boolean;
}

export interface AgentTriageTicketInput {
  readonly requester: string;
  readonly subject: string;
  readonly body: string;
  readonly tenantId?: string;
}

export interface AgentTriageResponse {
  readonly status: AgentResolutionStatus;
  readonly confidenceScore: number;
  readonly groundingScore: number;
  readonly citedChunkIds: readonly string[];
  readonly candidateReply: string;
  readonly latencyMs: number;
  readonly policyViolations: readonly string[];
  readonly humanEscalationReason?: string;
}

// ---------------------------------------------------------------------------
// 4. Engagement Model & Scoping Calculator Contracts
// ---------------------------------------------------------------------------
export type EngagementModelType = 'audit' | 'sprint' | 'mvp' | 'pod';

export type ArchitectureComplexity =
  | 'standard_web'
  | 'governed_ai'
  | 'distributed_sync';

export interface ScopeCalculationInput {
  readonly model: EngagementModelType;
  readonly complexity: ArchitectureComplexity;
  readonly durationUnits: number;
  readonly includeEvalHarness: boolean;
}

export interface PriceRangeUsd {
  readonly min: number;
  readonly max: number;
}

export interface ScopeCalculationResult {
  readonly modelLabel: string;
  readonly cadenceSummary: string;
  readonly priceRangeUsd: PriceRangeUsd;
  readonly deliverables: readonly string[];
  readonly teamComposition: readonly string[];
  readonly exitVerificationGate: string;
}

// ---------------------------------------------------------------------------
// 5. Cal.com Webhook & Pre-Call Intelligence Contracts
// ---------------------------------------------------------------------------
export interface CalWebhookAttendee {
  readonly email: string;
  readonly name: string;
  readonly timeZone?: string;
}

export interface CalWebhookBookingPayload {
  readonly triggerEvent: 'BOOKING_CREATED' | 'BOOKING_RESCHEDULED' | 'BOOKING_CANCELLED';
  readonly uid: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly attendeeEmail: string;
  readonly attendeeName: string;
  readonly bottleneckNotes: string;
  readonly selectedModel?: string;
  readonly estimatedPriceRange?: string;
}

export interface PreCallBriefAndSow {
  readonly leadEmail: string;
  readonly companyDomain: string;
  readonly detectedPublicStack: readonly string[];
  readonly mermaidArchitectureSpec: string;
  readonly onePageSowMarkdown: string;
}

// ---------------------------------------------------------------------------
// 6. Dead-Letter Queue & Outbox Delivery Contracts
// ---------------------------------------------------------------------------
export type WebhookDeliveryEventType =
  | 'SLACK_NOTIFY'
  | 'CRM_UPSERT'
  | 'EMAIL_CONFIRMATION'
  | 'CAL_WEBHOOK_ENRICH'
  | 'SOW_DRAFTED';

export type DeliveryStatus =
  | 'PENDING'
  | 'DELIVERED'
  | 'FAILED_RETRYING'
  | 'DEAD_LETTER';

export interface LeadQualificationEvent {
  readonly eventId: string;
  readonly leadId: string;
  readonly eventType: WebhookDeliveryEventType;
  readonly deliveryStatus: DeliveryStatus;
  readonly attemptCount: number;
  readonly nextRetryAt: string | null;
  readonly lastError: string | null;
  readonly payload: Record<string, unknown>;
  readonly createdAt: string;
  readonly updatedAt: string;
}
