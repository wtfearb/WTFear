import { NextResponse } from 'next/server';
import { BLUEPRINT_CATALOG } from '@/lib/state/blueprints-machine';
import { calculateEngagementScope } from '@/lib/state/engagement-calculator';

export async function GET(): Promise<NextResponse> {
  const sprintSample = calculateEngagementScope({
    model: 'sprint',
    complexity: 'governed_ai',
    durationUnits: 1,
    includeEvalHarness: true,
  });

  const blueprintMarkdown = BLUEPRINT_CATALOG.map(
    (bp) => `### ${bp.title} (\`/${bp.id}\`)
- **Category:** ${bp.badge} | **Timeline:** ${bp.durationLabel}
- **Problem Solved:** ${bp.problemStatement}
- **Production Stack:** ${bp.stack.join(', ')}
- **CI Verification Gate:** ${bp.verificationGate}
- **Execution Steps:**
${bp.checklist.map((s) => `  ${s.stepIndex}. **${s.title}:** ${s.specification}`).join('\n')}`
  ).join('\n\n');

  const fullText = `# WTFearB (https://wtfear.agency) — Complete Technical Reference & Architecture Corpus (llms-full.txt)

> Machine-readable full technical specification for AI Answer Engines, CTOs, and Principal Engineers evaluating WTFearB (https://wtfear.agency). Make "What If" Work. Direct contact: wtfearb@gmail.com

## 1. Production Blueprint Catalog

${blueprintMarkdown}

## 2. Deterministic Scoping & Pricing Benchmark (Governed AI Sprint Sample)

- **Model:** ${sprintSample.modelLabel}
- **Cadence:** ${sprintSample.cadenceSummary}
- **Estimated Investment:** $${sprintSample.priceRangeUsd.min.toLocaleString()} – $${sprintSample.priceRangeUsd.max.toLocaleString()} USD
- **Guaranteed Deliverables:**
${sprintSample.deliverables.map((d) => `  - ${d}`).join('\n')}

## 3. Production Governance Invariants

1. **Zero Uncited Autonomous Actions:** Any AI response with \`status = RESOLVED_AUTONOMOUSLY\` must cite verified \`chunk_id\` records from the tenant's PostgreSQL RLS partition with \`confidence_score >= 0.82\` and \`grounding_score >= 0.78\`.
2. **100% Client IP Ownership:** All repositories, Terraform/Cloudflare configs, and golden evaluation suites are committed directly to the client's GitHub organization from Day 1.
3. **Sub-Second Performance Budget:** Frontend routes enforce \`LCP < 1.2s\`, \`CLS = 0.000\`, and \`< 85 KB\` First Load JS.
`;

  return new NextResponse(fullText, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
