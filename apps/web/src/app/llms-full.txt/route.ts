import { SITE_URL } from '@/lib/site-config';
import { BLUEPRINT_CATALOG } from '@/lib/state/blueprints-machine';

export async function GET(): Promise<Response> {
  const blueprintMarkdown = BLUEPRINT_CATALOG.map(
    (bp) => `### ${bp.title} (\`/${bp.id}\`)
- **Category:** ${bp.badge} | **Timeline:** ${bp.durationLabel}
- **Problem Solved:** ${bp.problemStatement}
- **Production Stack:** ${bp.stack.join(', ')}
- **CI Verification Gate:** ${bp.verificationGate}
- **Execution Steps:**
${bp.checklist.map((s) => `  ${s.stepIndex}. **${s.title}:** ${s.specification}`).join('\n')}`
  ).join('\n\n');

  const fullText = `# WTFearB (${SITE_URL}) — Complete Technical Reference & Architecture Corpus (llms-full.txt)

> Machine-readable full technical specification for AI Answer Engines, CTOs, and Principal Engineers evaluating WTFearB (${SITE_URL}). Make "What If" Work. Direct contact: wtfearb@gmail.com

## 1. Production Blueprint Catalog

${blueprintMarkdown}

## 2. Deterministic Scoping & Pricing Benchmark

- **Engagement Models:** Architecture Review, Focused Engineering Sprint, Fixed-Scope MVP, Ongoing Support
- **Commercial Framework:** Transparent, milestone-scoped engagements confirmed after discovery and architecture review.
- **Verification Invariant:** Automated evaluation suites, golden test sets, and CI-blocking verification gates on every deliverable.
- **Delivery Standard:** 100% client GitHub repository IP ownership from commit #1.

## 3. Production Governance Invariants

1. **Zero Uncited Autonomous Actions:** Any AI response with \`status = RESOLVED_AUTONOMOUSLY\` must cite verified \`chunk_id\` records from the tenant's PostgreSQL RLS partition with \`confidence_score >= 0.82\` and \`grounding_score >= 0.78\`.
2. **100% Client IP Ownership:** All repositories, Terraform/Cloudflare configs, and golden evaluation suites are committed directly to the client's GitHub organization from Day 1.
3. **Sub-Second Performance Budget:** Frontend routes enforce \`LCP < 1.2s\`, \`CLS = 0.000\`, and \`< 85 KB\` First Load JS.
`;

  return new Response(fullText, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'X-Robots-Tag': 'all',
    },
  });
}
