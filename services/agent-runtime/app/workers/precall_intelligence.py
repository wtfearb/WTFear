"""Cal.com Webhook Ingest, Public Stack Intelligence & Automated 1-Page SOW Generator.

Version: 3.0.0
Track 5.1 wtfear Operating System
"""

from __future__ import annotations

import hashlib
import hmac
from datetime import date, timedelta

from pydantic import BaseModel, EmailStr, Field


class CalWebhookBookingPayload(BaseModel):
    triggerEvent: str = Field(..., pattern=r"^BOOKING_CREATED$")
    uid: str
    startTime: str
    attendeeEmail: EmailStr
    attendeeName: str
    bottleneckNotes: str
    selectedModel: str = "2-Week Rapid Sprint"
    estimatedPriceRange: str = "$6,500 – $8,500 USD"


class PreCallBriefAndSow(BaseModel):
    lead_email: EmailStr
    company_domain: str
    detected_public_stack: list[str]
    mermaid_architecture_spec: str
    one_page_sow_markdown: str


def verify_cal_webhook_signature(raw_body: bytes, signature_header: str, secret: str) -> bool:
    """Verifies HMAC SHA-256 signature from Cal.com X-Cal-Signature-256 header."""
    expected = hmac.new(secret.encode("utf-8"), raw_body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature_header)


def generate_precall_brief_and_sow(
    payload: CalWebhookBookingPayload,
    detected_stack: list[str] | None = None,
) -> PreCallBriefAndSow:
    """Generates tailored Mermaid architecture spec and 1-page SOW in Markdown within 45s."""
    stack = detected_stack or ["Next.js 15", "FastAPI", "PostgreSQL 16", "OpenTelemetry"]
    domain = payload.attendeeEmail.split("@")[1].lower()

    # Target kickoff: next Monday
    today = date.today()
    days_until_monday = (7 - today.weekday()) % 7 or 7
    kickoff_date = today + timedelta(days=days_until_monday)
    handover_date = kickoff_date + timedelta(days=14)

    mermaid_spec = f"""graph LR
    A[Client Ingress: {domain}] -->|HMAC / Auth Gate| B(wtfear FastAPI Orchestrator)
    B -->|Hybrid RRF: pgvector + BM25| C[(PostgreSQL 16 RLS)]
    B -->|Pydantic v2 Schema Gate| D{{Confidence >= 0.82?}}
    D -->|Pass| E[Autonomous Execution + Audit Log]
    D -->|Fail| F[Slack / Linear Human Escalation]"""

    sow_md = f"""# DRAFT 1-PAGE STATEMENT OF WORK (SOW) — {domain.upper()}
**Prepared For:** {payload.attendeeName} (`{payload.attendeeEmail}`)
**Engagement Model:** {payload.selectedModel} ({payload.estimatedPriceRange})
**Target Kickoff:** {kickoff_date.isoformat()} | **Target Handover:** {handover_date.isoformat()}
**IP Ownership:** 100% Client-Owned in `{domain}` GitHub Org from Commit #1

## 1. Diagnosed Technical Bottleneck
> {payload.bottleneckNotes}

## 2. Detected Environment & Integration Surface
- **Public Stack Signals:** {", ".join(stack)}
- **Target Architecture:** Governed FastAPI + PostgreSQL 16 (`pgvector` + RLS) with OpenTelemetry tracing.

## 3. Day-7 & Day-14 Acceptance Criteria (Exit Gates)
- **Day 7 (Mid-Sprint Live Demo):** Core data model, hybrid retrieval/API spine, and 25 initial golden evaluation cases running in staging.
- **Day 14 (Production Handover):** 50-case CI-blocking golden evaluation suite (100% citation precision, cosine >= 0.85), Playwright E2E tests, Terraform/Cloudflare config, and live production cutover.
"""

    return PreCallBriefAndSow(
        lead_email=payload.attendeeEmail,
        company_domain=domain,
        detected_public_stack=stack,
        mermaid_architecture_spec=mermaid_spec,
        one_page_sow_markdown=sow_md,
    )
