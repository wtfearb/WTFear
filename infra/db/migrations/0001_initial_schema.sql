-- infra/db/migrations/0001_initial_schema.sql
-- Production DDL for wtfear.agency PostgreSQL 16 + pgvector HNSW + Row-Level Security
BEGIN;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "vector";

-- 1. Idempotency Keys Table (24h sliding lock for /api/audit and agent triage requests)
CREATE TABLE IF NOT EXISTS idempotency_keys (
    idempotency_key VARCHAR(128) PRIMARY KEY,
    scope VARCHAR(64) NOT NULL,
    request_hash CHAR(64) NOT NULL,
    response_status SMALLINT NOT NULL,
    response_body JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '24 hours')
);

CREATE INDEX IF NOT EXISTS idx_idempotency_expires_at ON idempotency_keys (expires_at);

-- 2. Inbound Architecture Audit Leads Table
CREATE TABLE IF NOT EXISTS audit_leads (
    lead_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email_normalized VARCHAR(320) NOT NULL,
    email_sha256 CHAR(64) NOT NULL UNIQUE,
    company_domain VARCHAR(255) NOT NULL,
    system_bottleneck TEXT NOT NULL CHECK (char_length(system_bottleneck) >= 15),
    target_timeline VARCHAR(32) NOT NULL CHECK (target_timeline IN ('immediate', 'month', 'exploring')),
    calculator_scope TEXT,
    lead_score SMALLINT NOT NULL CHECK (lead_score BETWEEN 0 AND 100),
    lead_tier VARCHAR(32) NOT NULL CHECK (lead_tier IN ('TIER_1_FAST_TRACK', 'TIER_2_NURTURE')),
    stage VARCHAR(48) NOT NULL DEFAULT 'INBOUND_CAPTURED'
        CHECK (stage IN ('INBOUND_CAPTURED', 'CAL_BOOKED', 'TECHNICAL_SCOPING_READY', 'SOW_GENERATED', 'CLOSED_WON', 'NURTURE')),
    enrichment_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_leads_tier_created ON audit_leads (lead_tier, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_leads_domain ON audit_leads (company_domain);

-- 3. Lead Qualification & Webhook Delivery Events (Outbox / DLQ Tracking)
CREATE TABLE IF NOT EXISTS lead_qualification_events (
    event_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES audit_leads(lead_id) ON DELETE CASCADE,
    event_type VARCHAR(64) NOT NULL
        CHECK (event_type IN ('SLACK_NOTIFY', 'CRM_UPSERT', 'EMAIL_CONFIRMATION', 'CAL_WEBHOOK_ENRICH', 'SOW_DRAFTED')),
    delivery_status VARCHAR(32) NOT NULL DEFAULT 'PENDING'
        CHECK (delivery_status IN ('PENDING', 'DELIVERED', 'FAILED_RETRYING', 'DEAD_LETTER')),
    attempt_count SMALLINT NOT NULL DEFAULT 0,
    next_retry_at TIMESTAMPTZ,
    last_error TEXT,
    payload JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lead_events_dlq
    ON lead_qualification_events (delivery_status, next_retry_at)
    WHERE delivery_status IN ('PENDING', 'FAILED_RETRYING', 'DEAD_LETTER');

-- 4. Multi-Tenant Knowledge Chunks Table (pgvector HNSW + BM25 tsvector + RLS)
CREATE TABLE IF NOT EXISTS knowledge_chunks (
    chunk_id VARCHAR(64) PRIMARY KEY CHECK (chunk_id ~ '^chk_[a-zA-Z0-9_-]+$'),
    tenant_id UUID NOT NULL,
    document_uri VARCHAR(512) NOT NULL,
    content TEXT NOT NULL CHECK (char_length(content) BETWEEN 10 AND 4000),
    embedding vector(1536) NOT NULL,
    search_tsv tsvector GENERATED ALWAYS AS (to_tsvector('english', content)) STORED,
    acl_groups TEXT[] NOT NULL DEFAULT ARRAY['default']::TEXT[],
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- HNSW Index for fast cosine similarity (<=>)
CREATE INDEX IF NOT EXISTS idx_knowledge_chunks_hnsw
    ON knowledge_chunks USING hnsw (embedding vector_cosine_ops)
    WITH (m = 16, ef_construction = 64);

-- GIN Index for fast lexical BM25 / ts_rank_cd matching
CREATE INDEX IF NOT EXISTS idx_knowledge_chunks_tsv
    ON knowledge_chunks USING gin (search_tsv);

CREATE INDEX IF NOT EXISTS idx_knowledge_chunks_tenant
    ON knowledge_chunks (tenant_id);

-- Enforce strict PostgreSQL Row-Level Security (RLS) on knowledge_chunks
ALTER TABLE knowledge_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_chunks FORCE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_policy ON knowledge_chunks
    USING (
        tenant_id = current_setting('app.current_tenant_id', true)::UUID
        AND acl_groups && current_setting('app.current_user_acls', true)::TEXT[]
    );

COMMIT;
