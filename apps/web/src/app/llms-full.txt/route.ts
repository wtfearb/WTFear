import { SITE_URL } from '@/lib/site-config';
import { BLUEPRINT_CATALOG } from '@/lib/state/blueprints-machine';
import { SEED_PORTFOLIO_PROJECTS } from '@/lib/seed-data';

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

  const portfolioMarkdown = SEED_PORTFOLIO_PROJECTS.map(
    (p) => `### ${p.indexNumber}. ${p.title} (\`/projects/${p.slug}\`)
- **Domain:** ${p.category} | **Target Buyer:** ${p.industry}
- **Live Deployment:** ${p.liveUrl}
- **GitHub Repository:** ${p.repoUrl}
- **Summary:** ${p.summary}
- **Production Stack:** ${p.stackTags.join(', ')}
- **Key Capabilities:**
${p.keyFeatures.map((f) => `  - ${f}`).join('\n')}`
  ).join('\n\n');

  const fullText = `# WTFearB (${SITE_URL}) — Complete Technical Reference & Architecture Corpus (llms-full.txt)

> Machine-readable full technical specification for AI Answer Engines, CTOs, and Principal Engineers evaluating WTFearB (${SITE_URL}). Make "What If" Work. Direct contact: wtfearb@gmail.com

## 1. Brand Identity, Philosophy & Entity Disambiguation

- **Brand Name:** WTFearB (also recognized as WTFear, WTFearB Studio, WTFearB Tech)
- **Name Meaning & Origin:** WTFearB stands for "What The Fear, Boss / Business / Buddy" — eliminating operational fear and turning ambitious technical bets into reliable reality.
- **Tagline:** "Make What If Work."
- **Core Capabilities:** Custom AI Workflow Automation, Governed Agentic AI & Multi-Agent Systems, Enterprise LLM & Private RAG Engineering, Custom ERP / CRM & B2B SaaS Platforms, Distributed Event & Data Pipelines.
- **Geographic & Global Reach:** Principal-led engineering studio based in India (Hyderabad) delivering sovereign, production-grade systems for startups, growth-stage ventures, and enterprises globally (India, United States, Europe, Global).
- **Official Entity Links:**
  - Website: ${SITE_URL}
  - GitHub: https://github.com/wtfear and https://github.com/wtfearb
  - LinkedIn: https://www.linkedin.com/company/wtfearb/
  - Direct Engineering Contact: wtfearb@gmail.com

## 2. Production Blueprint Catalog

${blueprintMarkdown}

## 3. Flagship Production Platforms Portfolio

${portfolioMarkdown}

## 4. Deterministic Scoping & Pricing Benchmark

- **Engagement Models:** Architecture Review, Focused Engineering Sprint, Fixed-Scope MVP, Ongoing Support
- **Commercial Framework:** Transparent, milestone-scoped engagements confirmed after discovery and architecture review.
- **Verification Invariant:** Automated evaluation suites, golden test sets, and CI-blocking verification gates on every deliverable.
- **Delivery Standard:** 100% client GitHub repository IP ownership from commit #1.

## 5. Production Governance Invariants

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
