"""Structured JSON logging and OpenTelemetry tracing utilities for wtfear agent runtime.

Version: 3.0.0
"""

from __future__ import annotations

import json
import logging
import sys
from datetime import UTC, datetime
from typing import Any


class JsonFormatter(logging.Formatter):
    """Formats log records as structured single-line JSON adhering to wtfear observability standards."""

    def format(self, record: logging.LogRecord) -> str:
        log_payload: dict[str, Any] = {
            "timestamp": datetime.now(UTC).isoformat(),
            "level": record.levelname,
            "service": "wtfear-agent-runtime",
            "environment": getattr(record, "environment", "production"),
            "trace_id": getattr(record, "trace_id", "0" * 32),
            "span_id": getattr(record, "span_id", "0" * 16),
            "message": record.getMessage(),
        }

        # Merge any custom extra attributes passed into logger
        if hasattr(record, "extra_fields"):
            log_payload.update(record.extra_fields)

        return json.dumps(log_payload)


def setup_logger(name: str = "wtfear-agent-runtime") -> logging.Logger:
    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO)

    # Avoid duplicate handlers if re-initialized
    if not logger.handlers:
        handler = logging.StreamHandler(sys.stdout)
        handler.setFormatter(JsonFormatter())
        logger.addHandler(handler)

    logger.propagate = False
    return logger


logger = setup_logger()


def log_agent_event(
    event: str,
    status: str,
    confidence_score: float,
    grounding_score: float,
    cited_chunk_ids: list[str],
    latency_ms: int,
    tenant_id: str = "default",
    trace_id: str = "0" * 32,
    span_id: str = "0" * 16,
) -> None:
    """Emits canonical agent audit event log to stdout for BetterStack/Datadog ingestion."""
    record = logging.LogRecord(
        name="wtfear-agent-runtime",
        level=logging.INFO,
        pathname="",
        lineno=0,
        msg=f"Agent event: {event}",
        args=(),
        exc_info=None,
    )
    record.extra_fields = {  # type: ignore[attr-defined]
        "event": event,
        "tenant_id": tenant_id,
        "trace_id": trace_id,
        "span_id": span_id,
        "status": status,
        "confidence_score": confidence_score,
        "grounding_score": grounding_score,
        "cited_chunk_ids": cited_chunk_ids,
        "latency_ms": latency_ms,
    }
    logger.handle(record)
