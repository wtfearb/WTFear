import React from 'react';
import type { BlueprintId } from '@/lib/state/blueprints-machine';

interface BlueprintSchematicViewfinderProps {
  readonly id: BlueprintId;
}

export function BlueprintSchematicViewfinder({
  id,
}: BlueprintSchematicViewfinderProps): React.ReactElement {
  if (id === 'ai-triage') {
    return (
      <div className="relative p-5 sm:p-7 bg-[#FAFBFD] border border-[#E2E2E8] bg-[linear-gradient(to_right,#E2E2E8_1px,transparent_1px),linear-gradient(to_bottom,#E2E2E8_1px,transparent_1px)] bg-[size:20px_20px] rounded-[2px]">
        {/* Four Corner Viewfinder Brackets */}
        <span
          className="absolute -top-[1px] -left-[1px] w-[14px] h-[14px] border-t-[1.5px] border-l-[1.5px] border-[#3F414A]"
          aria-hidden="true"
        />
        <span
          className="absolute -top-[1px] -right-[1px] w-[14px] h-[14px] border-t-[1.5px] border-r-[1.5px] border-[#3F414A]"
          aria-hidden="true"
        />
        <span
          className="absolute -bottom-[1px] -left-[1px] w-[14px] h-[14px] border-b-[1.5px] border-l-[1.5px] border-[#3F414A]"
          aria-hidden="true"
        />
        <span
          className="absolute -bottom-[1px] -right-[1px] w-[14px] h-[14px] border-b-[1.5px] border-r-[1.5px] border-[#3F414A]"
          aria-hidden="true"
        />

        <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0A0A0C] mb-5 flex items-center justify-between">
          <span>// TOPOLOGY: GOVERNED AI RETRIEVAL</span>
          <span className="text-[#C83E1B]">LATENCY: &lt; 370MS</span>
        </div>

        {/* 4 Connected Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 items-stretch">
          {/* Node 1 */}
          <div className="bg-[#FFFFFF] border border-[#E2E2E8] rounded-[2px] p-3 shadow-2xs flex flex-col justify-between">
            <span className="font-mono text-[9.5px] font-bold text-[#5A5D6A]">STEP 01</span>
            <div className="mt-2">
              <span className="font-mono text-[11px] font-bold text-[#0A0A0C] block leading-tight">
                INGRESS
              </span>
              <span className="font-sans text-[11px] text-[#5A5D6A] block mt-1 leading-snug">
                Pydantic Injection &amp; Signature Gate
              </span>
            </div>
            <span className="font-mono text-[9px] text-[#5A5D6A] mt-2 block">&lt; 25ms</span>
          </div>

          {/* Node 2 */}
          <div className="bg-[#FFFFFF] border border-[#E2E2E8] rounded-[2px] p-3 shadow-2xs flex flex-col justify-between">
            <span className="font-mono text-[9.5px] font-bold text-[#5A5D6A]">STEP 02</span>
            <div className="mt-2">
              <span className="font-mono text-[11px] font-bold text-[#0A0A0C] block leading-tight">
                HYBRID RETRIEVAL
              </span>
              <span className="font-sans text-[11px] text-[#5A5D6A] block mt-1 leading-snug">
                pgvector HNSW + BM25 RRF
              </span>
            </div>
            <span className="font-mono text-[9px] text-[#5A5D6A] mt-2 block">&lt; 45ms</span>
          </div>

          {/* Node 3 (Highlighted Gate) */}
          <div className="bg-[#FFFFFF] border-2 border-[#C83E1B] rounded-[2px] p-3 shadow-2xs flex flex-col justify-between relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9.5px] font-bold text-[#C83E1B]">STEP 03 // GATE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B]" />
            </div>
            <div className="mt-2">
              <span className="font-mono text-[11px] font-bold text-[#C83E1B] block leading-tight">
                SCHEMA &amp; CITATION
              </span>
              <span className="font-sans text-[11px] text-[#3F414A] block mt-1 leading-snug font-medium">
                Grounding &ge; 0.82 + 100% Chunk Cites
              </span>
            </div>
            <span className="font-mono text-[9px] text-[#C83E1B] font-bold mt-2 block">
              VALIDATE
            </span>
          </div>

          {/* Node 4 */}
          <div className="bg-[#FFFFFF] border border-[#E2E2E8] rounded-[2px] p-3 shadow-2xs flex flex-col justify-between">
            <span className="font-mono text-[9.5px] font-bold text-[#5A5D6A]">STEP 04</span>
            <div className="mt-2">
              <span className="font-mono text-[11px] font-bold text-[#0A0A0C] block leading-tight">
                AUTO / ROUTE
              </span>
              <span className="font-sans text-[11px] text-[#5A5D6A] block mt-1 leading-snug">
                Safe Resolve or Slack Escalation
              </span>
            </div>
            <span className="font-mono text-[9px] text-[#5A5D6A] mt-2 block">&lt; 300ms</span>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'saas-portal') {
    return (
      <div className="relative p-5 sm:p-7 bg-[#0C0D10] border border-[#242731] bg-[linear-gradient(to_right,#242731_1px,transparent_1px),linear-gradient(to_bottom,#242731_1px,transparent_1px)] bg-[size:20px_20px] rounded-[2px] text-white">
        {/* Four Corner Viewfinder Brackets */}
        <span
          className="absolute -top-[1px] -left-[1px] w-[14px] h-[14px] border-t-[1.5px] border-l-[1.5px] border-[#8C90A0]"
          aria-hidden="true"
        />
        <span
          className="absolute -top-[1px] -right-[1px] w-[14px] h-[14px] border-t-[1.5px] border-r-[1.5px] border-[#8C90A0]"
          aria-hidden="true"
        />
        <span
          className="absolute -bottom-[1px] -left-[1px] w-[14px] h-[14px] border-b-[1.5px] border-l-[1.5px] border-[#8C90A0]"
          aria-hidden="true"
        />
        <span
          className="absolute -bottom-[1px] -right-[1px] w-[14px] h-[14px] border-b-[1.5px] border-r-[1.5px] border-[#8C90A0]"
          aria-hidden="true"
        />

        <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#E2E2E8] mb-5 flex items-center justify-between">
          <span>// TOPOLOGY: MULTI-TENANT ISOLATION</span>
          <span className="text-[#C83E1B]">SECURITY: RLS ENFORCED</span>
        </div>

        {/* 3 Connected Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-stretch">
          {/* Node 1 */}
          <div className="bg-[#14161B] border border-[#242731] rounded-[2px] p-4 flex flex-col justify-between">
            <span className="font-mono text-[9.5px] font-bold text-[#8C90A0]">LAYER 01</span>
            <div className="mt-2">
              <span className="font-mono text-[11.5px] font-bold text-[#FFFFFF] block leading-tight">
                TENANT AUTH / SSO
              </span>
              <span className="font-sans text-[11px] text-[#A6A9B6] block mt-1.5 leading-snug">
                Edge Nonce &amp; Session Claims Verification
              </span>
            </div>
            <span className="font-mono text-[9px] text-[#8C90A0] mt-3 block">&lt; 15ms</span>
          </div>

          {/* Node 2 (Highlighted Gate) */}
          <div className="bg-[#14161B] border-2 border-[#C83E1B] rounded-[2px] p-4 flex flex-col justify-between relative">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9.5px] font-bold text-[#C83E1B]">LAYER 02 // POLICY</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B]" />
            </div>
            <div className="mt-2">
              <span className="font-mono text-[11.5px] font-bold text-[#C83E1B] block leading-tight">
                RBAC POLICY LAYER
              </span>
              <span className="font-sans text-[11px] text-[#E2E2E8] block mt-1.5 leading-snug font-medium">
                PostgreSQL 16 Row-Level Security
              </span>
            </div>
            <span className="font-mono text-[9px] text-[#C83E1B] font-bold mt-3 block">
              STRICT BOUNDARY
            </span>
          </div>

          {/* Node 3 */}
          <div className="bg-[#14161B] border border-[#242731] rounded-[2px] p-4 flex flex-col justify-between">
            <span className="font-mono text-[9.5px] font-bold text-[#8C90A0]">LAYER 03</span>
            <div className="mt-2">
              <span className="font-mono text-[11.5px] font-bold text-[#FFFFFF] block leading-tight">
                ISOLATED PARTITIONS
              </span>
              <span className="font-sans text-[11px] text-[#A6A9B6] block mt-1.5 leading-snug">
                Zero-Leakage SSR + React 19 RSC Stream
              </span>
            </div>
            <span className="font-mono text-[9px] text-[#8C90A0] mt-3 block">&lt; 180ms LCP</span>
          </div>
        </div>
      </div>
    );
  }

  // event-spine
  return (
    <div className="relative p-5 sm:p-7 bg-[#FAFBFD] border border-[#E2E2E8] bg-[linear-gradient(to_right,#E2E2E8_1px,transparent_1px),linear-gradient(to_bottom,#E2E2E8_1px,transparent_1px)] bg-[size:20px_20px] rounded-[2px]">
      {/* Four Corner Viewfinder Brackets */}
      <span
        className="absolute -top-[1px] -left-[1px] w-[14px] h-[14px] border-t-[1.5px] border-l-[1.5px] border-[#3F414A]"
        aria-hidden="true"
      />
      <span
        className="absolute -top-[1px] -right-[1px] w-[14px] h-[14px] border-t-[1.5px] border-r-[1.5px] border-[#3F414A]"
        aria-hidden="true"
      />
      <span
        className="absolute -bottom-[1px] -left-[1px] w-[14px] h-[14px] border-b-[1.5px] border-l-[1.5px] border-[#3F414A]"
        aria-hidden="true"
      />
      <span
        className="absolute -bottom-[1px] -right-[1px] w-[14px] h-[14px] border-b-[1.5px] border-r-[1.5px] border-[#3F414A]"
        aria-hidden="true"
      />

      <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0A0A0C] mb-5 flex items-center justify-between">
        <span>// TOPOLOGY: RESILIENT EVENT SPINE</span>
        <span className="text-[#C83E1B]">THROUGHPUT: 5,000 REQ/S</span>
      </div>

      {/* 4 Connected Nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 items-stretch">
        {/* Node 1 */}
        <div className="bg-[#FFFFFF] border border-[#E2E2E8] rounded-[2px] p-3 shadow-2xs flex flex-col justify-between">
          <span className="font-mono text-[9.5px] font-bold text-[#5A5D6A]">STAGE 01</span>
          <div className="mt-2">
            <span className="font-mono text-[11px] font-bold text-[#0A0A0C] block leading-tight">
              PRODUCERS
            </span>
            <span className="font-sans text-[11px] text-[#5A5D6A] block mt-1 leading-snug">
              Signed Webhooks &amp; Edge Ingestion
            </span>
          </div>
          <span className="font-mono text-[9px] text-[#5A5D6A] mt-2 block">&lt; 12ms</span>
        </div>

        {/* Node 2 (Highlighted Gate) */}
        <div className="bg-[#FFFFFF] border-2 border-[#C83E1B] rounded-[2px] p-3 shadow-2xs flex flex-col justify-between relative">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9.5px] font-bold text-[#C83E1B]">STAGE 02 // QUEUE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B]" />
          </div>
          <div className="mt-2">
            <span className="font-mono text-[11px] font-bold text-[#C83E1B] block leading-tight">
              IDEMPOTENT QUEUE
            </span>
            <span className="font-sans text-[11px] text-[#3F414A] block mt-1 leading-snug font-medium">
              Redis Streams + 24h Lock Key
            </span>
          </div>
          <span className="font-mono text-[9px] text-[#C83E1B] font-bold mt-2 block">
            DEDUPLICATE
          </span>
        </div>

        {/* Node 3 */}
        <div className="bg-[#FFFFFF] border border-[#E2E2E8] rounded-[2px] p-3 shadow-2xs flex flex-col justify-between">
          <span className="font-mono text-[9.5px] font-bold text-[#5A5D6A]">STAGE 03</span>
          <div className="mt-2">
            <span className="font-mono text-[11px] font-bold text-[#0A0A0C] block leading-tight">
              WORKERS &amp; DLQ
            </span>
            <span className="font-sans text-[11px] text-[#5A5D6A] block mt-1 leading-snug">
              Atomic Outbox &amp; Jittered Retry
            </span>
          </div>
          <span className="font-mono text-[9px] text-[#5A5D6A] mt-2 block">&lt; 35ms</span>
        </div>

        {/* Node 4 */}
        <div className="bg-[#FFFFFF] border border-[#E2E2E8] rounded-[2px] p-3 shadow-2xs flex flex-col justify-between">
          <span className="font-mono text-[9.5px] font-bold text-[#5A5D6A]">STAGE 04</span>
          <div className="mt-2">
            <span className="font-mono text-[11px] font-bold text-[#0A0A0C] block leading-tight">
              OTEL TRACES
            </span>
            <span className="font-sans text-[11px] text-[#5A5D6A] block mt-1 leading-snug">
              Distributed Context &amp; P1 Alerts
            </span>
          </div>
          <span className="font-mono text-[9px] text-[#5A5D6A] mt-2 block">&lt; 200ms</span>
        </div>
      </div>
    </div>
  );
}
