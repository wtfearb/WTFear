"""Unit tests for Cal.com webhook signature verification and pre-call SOW generation."""

from app.workers.precall_intelligence import (
    CalWebhookBookingPayload,
    generate_precall_brief_and_sow,
    verify_cal_webhook_signature,
)


def test_cal_webhook_signature_verification():
    secret = "cal_webhook_secret_9941"
    raw_body = b'{"triggerEvent": "BOOKING_CREATED", "uid": "cal_123"}'

    # Compute expected signature
    import hashlib
    import hmac

    valid_sig = hmac.new(secret.encode("utf-8"), raw_body, hashlib.sha256).hexdigest()
    assert verify_cal_webhook_signature(raw_body, valid_sig, secret) is True
    assert verify_cal_webhook_signature(raw_body, "tampered_signature", secret) is False


def test_sow_generation():
    payload = CalWebhookBookingPayload(
        triggerEvent="BOOKING_CREATED",
        uid="cal_uid_882",
        startTime="2026-11-20T10:00:00Z",
        attendeeEmail="vp-eng@healthscale.io",
        attendeeName="Sarah Connor",
        bottleneckNotes="Our HIPAA patient portal has severe replication lag and RAG hallucinations.",
        selectedModel="2-Week Rapid Sprint",
        estimatedPriceRange="$6,500 – $8,500 USD",
    )

    brief_and_sow = generate_precall_brief_and_sow(payload)
    assert brief_and_sow.company_domain == "healthscale.io"
    assert "graph LR" in brief_and_sow.mermaid_architecture_spec
    assert "healthscale.io" in brief_and_sow.mermaid_architecture_spec
    assert "# DRAFT 1-PAGE STATEMENT OF WORK" in brief_and_sow.one_page_sow_markdown
    assert "Sarah Connor" in brief_and_sow.one_page_sow_markdown
