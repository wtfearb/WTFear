"""Dead-Letter Queue (DLQ) Replay Worker & CLI.

Replays failed webhook events (Slack, CRM, Resend) from lead_qualification_events.
Track 3.2 wtfear Master Execution Playbook
"""

from __future__ import annotations

import asyncio
import os

import httpx


async def replay_dead_letter_events() -> int:
    database_url = os.environ.get("DATABASE_URL")
    if not database_url:
        print("[DLQ Replay] DATABASE_URL not set. Running in dry-run mode.")
        print("[DLQ Replay] 0 events in DLQ to replay.")
        return 0

    try:
        import asyncpg  # type: ignore[import-not-found]
    except ImportError:
        print("[DLQ Replay] asyncpg not installed.")
        return 1

    conn = await asyncpg.connect(database_url)
    try:
        rows = await conn.fetch(
            """
            SELECT event_id, lead_id, event_type, payload
            FROM lead_qualification_events
            WHERE delivery_status IN ('DEAD_LETTER', 'FAILED_RETRYING')
            ORDER BY created_at ASC
            LIMIT 100
            FOR UPDATE SKIP LOCKED;
            """
        )

        if not rows:
            print("[DLQ Replay] Queue clean: 0 dead-letter events found.")
            return 0

        replayed = 0
        async with httpx.AsyncClient(timeout=10.0) as client:
            for row in rows:
                target_url = os.environ.get(f"WEBHOOK_URL_{row['event_type']}")
                if not target_url:
                    continue
                resp = await client.post(target_url, json=row["payload"])
                if resp.is_success:
                    await conn.execute(
                        """
                        UPDATE lead_qualification_events
                        SET delivery_status = 'DELIVERED', updated_at = NOW(), last_error = NULL
                        WHERE event_id = $1;
                        """,
                        row["event_id"],
                    )
                    replayed += 1
                else:
                    await conn.execute(
                        """
                        UPDATE lead_qualification_events
                        SET attempt_count = attempt_count + 1,
                            last_error = $2,
                            updated_at = NOW()
                        WHERE event_id = $1;
                        """,
                        row["event_id"],
                        f"HTTP {resp.status_code}: {resp.text[:200]}",
                    )
        print(f"[DLQ Replay] Successfully delivered {replayed}/{len(rows)} events.")
        return 0 if replayed == len(rows) else 1
    finally:
        await conn.close()


if __name__ == "__main__":
    raise SystemExit(asyncio.run(replay_dead_letter_events()))
