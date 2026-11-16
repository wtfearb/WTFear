"""Pydantic v2 contracts and validation gates for wtfear agent runtime.

Version: 3.0.0
"""

from __future__ import annotations

import re
from enum import StrEnum
from typing import Self

from pydantic import BaseModel, Field, field_validator, model_validator

# Known adversarial prompt injection patterns for ingress guardrail
FORBIDDEN_INJECTION_PATTERNS = [
    r"(ignore|disregard|forget|skip)\s+(all\s+)?(previous|prior)\s+(instructions|prompts?|rules)",
    r"output\s+all\s+(environment\s+variables|env\s+vars|credentials|secrets)",
    r"(reveal|print|show|dump)\s+(your\s+)?(system\s+prompt|credentials|secrets|database)",
    r"system\s+prompt\s+override",
    r"(bypass|disable)\s+(all\s+)?(policy\s+gate|pydantic|validators|guardrails?)",
    r"stage\s+a\s+\$?[0-9,]+\s+refund",
    r"developer\s+(override|mode)",
]


class AgentStatus(StrEnum):
    RESOLVED_AUTONOMOUSLY = "RESOLVED_AUTONOMOUSLY"
    ESCALATE_TO_HUMAN = "ESCALATE_TO_HUMAN"
    BLOCKED_POLICY_GATE = "BLOCKED_POLICY_GATE"


class TicketInput(BaseModel):
    requester: str = Field(..., min_length=3, max_length=320)
    subject: str = Field(..., min_length=5, max_length=256)
    ticket_body: str = Field(..., min_length=10, max_length=10000)
    tenant_id: str | None = None

    @field_validator("ticket_body")
    @classmethod
    def reject_prompt_injections(cls, v: str) -> str:
        for pattern in FORBIDDEN_INJECTION_PATTERNS:
            if re.search(pattern, v, re.IGNORECASE):
                matched = re.search(pattern, v, re.IGNORECASE)
                token = matched.group(0) if matched else "injection pattern"
                raise ValueError(
                    f"Pydantic @field_validator('ticket_body') rejected payload: matched forbidden token '{token}'"
                )
        return v


class RetrievedChunk(BaseModel):
    chunk_id: str = Field(..., pattern=r"^chk_[a-zA-Z0-9_-]+$")
    document_uri: str
    content: str
    dense_score: float = Field(ge=0.0, le=1.0)
    bm25_score: float = Field(ge=0.0)
    rrf_score: float = Field(ge=0.0)


class TriageOutput(BaseModel):
    status: AgentStatus
    confidence_score: float = Field(ge=0.0, le=1.0)
    grounding_score: float = Field(ge=0.0, le=1.0)
    cited_chunk_ids: list[str] = Field(default_factory=list)
    candidate_reply: str = ""
    latency_ms: int = 0
    policy_violations: list[str] = Field(default_factory=list)
    human_escalation_reason: str | None = None

    @model_validator(mode="after")
    def verify_autonomous_citations(self) -> Self:
        """Enforces that an autonomous action cannot take place without citations and high confidence."""
        if self.status == AgentStatus.RESOLVED_AUTONOMOUSLY:
            if not self.cited_chunk_ids:
                raise ValueError(
                    "Invariant violation: RESOLVED_AUTONOMOUSLY requires at least 1 verified citation."
                )
            if self.confidence_score < 0.82:
                raise ValueError(
                    f"Invariant violation: RESOLVED_AUTONOMOUSLY requires confidence_score >= 0.82 (got {self.confidence_score:.2f})."
                )
            if self.grounding_score < 0.78:
                raise ValueError(
                    f"Invariant violation: RESOLVED_AUTONOMOUSLY requires grounding_score >= 0.78 (got {self.grounding_score:.2f})."
                )
            if not self.candidate_reply.strip():
                raise ValueError(
                    "Invariant violation: RESOLVED_AUTONOMOUSLY requires a non-empty candidate reply."
                )
        return self
