/**
 * @file Pure Engagement Scoping & Pricing Calculator
 * @version 3.0.0
 */

import type {
  ArchitectureComplexity,
  EngagementModelType,
  PriceRangeUsd,
  ScopeCalculationInput,
  ScopeCalculationResult,
} from '@wtfear/contracts';

interface ModelBaseConfig {
  readonly label: string;
  readonly cadence: string;
  readonly baseMin: number;
  readonly baseMax: number;
  readonly defaultDeliverables: readonly string[];
  readonly teamComposition: readonly string[];
  readonly defaultExitGate: string;
}

const MODEL_CONFIGS: Record<EngagementModelType, ModelBaseConfig> = {
  audit: {
    label: '15-Minute Architecture Audit',
    cadence: '15-Minute Direct Engineering Session',
    baseMin: 0,
    baseMax: 0,
    defaultDeliverables: [
      'Direct bottleneck diagnosis with Principal Systems Engineer (never sales)',
      'High-level architectural recommendation & risk map',
      'Follow-up tailored 1-page SOW and timeline breakdown',
    ],
    teamComposition: ['1 Principal Systems Engineer'],
    defaultExitGate: 'Immediate actionable technical diagnosis and scope options',
  },
  sprint: {
    label: '2-Week Rapid Sprint',
    cadence: '14 Calendar Days (Day-0 to Day-14)',
    baseMin: 6500,
    baseMax: 8500,
    defaultDeliverables: [
      'Production-merged GitHub repository in client org from commit #1',
      'Fully implemented AI agent workflow or distributed backend subsystem',
      'Staging preview environment behind Cloudflare Access with OpenTelemetry tracing',
      'Day-7 mid-sprint live demo and Day-14 production cutover session',
    ],
    teamComposition: ['1 Principal Architect', '1 Senior Full-Stack / AI Systems Engineer'],
    defaultExitGate: 'Automated CI test suite pass + staging demo sign-off',
  },
  mvp: {
    label: 'Fixed-Scope Production MVP',
    cadence: '2 to 4 Weeks',
    baseMin: 14000,
    baseMax: 24000,
    defaultDeliverables: [
      'Multi-tenant Next.js 15 App Router web application + FastAPI service',
      'PostgreSQL 16 database with Row-Level Security (RLS) policies',
      'Playwright E2E security and interactive test suite',
      'Cloudflare DNS/WAF Terraform configurations and production deployment',
    ],
    teamComposition: ['1 Principal Architect', '2 Senior Engineers (Full-Stack + Systems)'],
    defaultExitGate: 'Playwright E2E suite pass + Lighthouse CI Performance >= 98',
  },
  pod: {
    label: 'Dedicated Senior Engineering Pod',
    cadence: 'Monthly Retainer (Continuous Delivery)',
    baseMin: 18000,
    baseMax: 26000,
    defaultDeliverables: [
      '3 embedded senior engineers delivering weekly production releases',
      'Full architectural ownership: roadmap scoping, implementation, and code reviews',
      'Real-time Slack/Discord channel integration with daily 09:30 UTC pulses',
      'Guaranteed SLA on production incidents and zero-downtime releases',
    ],
    teamComposition: ['1 Principal Architect', '1 Senior Full-Stack Engineer', '1 Senior Systems Engineer'],
    defaultExitGate: 'Weekly merged production PRs and continuous CI release gating',
  },
};

const COMPLEXITY_MULTIPLIERS: Record<ArchitectureComplexity, number> = {
  standard_web: 1.0,
  governed_ai: 1.2,
  distributed_sync: 1.15,
};

const EVAL_HARNESS_COST_USD = 1800;

export function calculateEngagementScope(input: ScopeCalculationInput): ScopeCalculationResult {
  const model = MODEL_CONFIGS[input.model];
  const complexityMultiplier = COMPLEXITY_MULTIPLIERS[input.complexity];
  const units = Math.max(1, input.durationUnits);

  let min = 0;
  let max = 0;

  if (input.model !== 'audit') {
    const rawMin = model.baseMin * complexityMultiplier * units;
    const rawMax = model.baseMax * complexityMultiplier * units;

    min = Math.round(rawMin / 100) * 100;
    max = Math.round(rawMax / 100) * 100;

    if (input.includeEvalHarness) {
      min += EVAL_HARNESS_COST_USD;
      max += EVAL_HARNESS_COST_USD;
    }
  }

  const deliverables = [...model.defaultDeliverables];
  if (input.includeEvalHarness && input.model !== 'audit') {
    deliverables.push('50-case CI-blocking golden evaluation harness (100% citation precision, cosine >= 0.85)');
  }

  let exitGate = model.defaultExitGate;
  if (input.complexity === 'governed_ai') {
    exitGate = 'Zero uncited responses, Pydantic v2 validation gate, and golden eval pass';
  } else if (input.complexity === 'distributed_sync') {
    exitGate = 'Idempotent replay verification, k6 load testing, and zero data loss on DLQ';
  }

  return {
    modelLabel: model.label,
    cadenceSummary: model.cadence,
    priceRangeUsd: { min, max },
    deliverables,
    teamComposition: model.teamComposition,
    exitVerificationGate: exitGate,
  };
}
