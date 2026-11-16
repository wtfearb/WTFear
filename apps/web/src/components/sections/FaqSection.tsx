import React from 'react';

interface FaqItem {
  readonly question: string;
  readonly answerDirectMetric: string;
  readonly answerDetails: string;
}

const FAQS: readonly FaqItem[] = [
  {
    question: 'What is WTFearB and what makes your engineering approach different?',
    answerDirectMetric:
      'WTFearB is an elite systems and AI engineering studio that turns speculative "What If" ideas into verified production reality. We work in fixed-cadence 2-week sprints with 100% client GitHub IP ownership from day one.',
    answerDetails:
      'Unlike traditional consultancies that bill open-ended hourly retainers and delegate coding to offshore contractors, you work directly with two embedded Principal Systems Engineers. Every deliverable is backed by automated CI gates, strict Pydantic v2 schemas, and sub-second Core Web Vitals.',
  },
  {
    question: 'Who are your ideal clients and engagement types?',
    answerDirectMetric:
      'High-growth tech startups, scaleups, and enterprise innovation teams needing rapid, mission-critical execution without hiring 6 months of full-time headcount.',
    answerDetails:
      'Common engagements include replacing brittle LLM prototypes with governed RAG pipelines, building end-to-end multi-tenant B2B SaaS platforms, rescuing legacy monolithic bottlenecks with high-throughput event spines, and architecting complex bidirectional integrations.',
  },
  {
    question: 'How do you ensure AI agents and RAG systems do not hallucinate or take harmful actions?',
    answerDirectMetric:
      'Every autonomous AI agent response requires 100% citation precision against verified knowledge chunks from a PostgreSQL 16 RLS partition, backed by a CI-blocking 50-case golden evaluation suite enforcing cosine similarity >= 0.85.',
    answerDetails:
      'When confidence falls below 0.82 or dense grounding drops below 0.78, the deterministic Pydantic v2 state machine prevents autonomous action and safely routes the request to human engineers on Slack with full context and raw traces.',
  },
  {
    question: 'Can you build an entire SaaS platform from scratch?',
    answerDirectMetric:
      'Yes. Our Fixed-Scope Production MVP delivers a complete, production-ready multi-tenant SaaS application in 2 to 4 weeks ($14,000 – $24,000 USD).',
    answerDetails:
      'This includes Next.js 15 App Router with React 19 RSC, multi-tenant PostgreSQL 16 with Row-Level Security isolation, typed FastAPI 0.115+ backend, Stripe seat & usage billing, authentication, and full Playwright end-to-end test coverage.',
  },
  {
    question: 'How do you handle legacy codebases or modernization?',
    answerDirectMetric:
      'We use the battle-tested Strangler Fig pattern to carve out mission-critical bottlenecks without risky "big-bang" rewrites.',
    answerDetails:
      'We deploy intelligent reverse proxies using Cloudflare Workers or Go microservices to intercept high-traffic endpoints, route canary traffic percentages, and verify shadow responses against the legacy database before fully cutting over.',
  },
  {
    question: 'What is your delivery cadence and how are milestones verified?',
    answerDirectMetric:
      'Deterministic 14-day rapid sprints with a live working staging demo on Day 7 and final production cutover on Day 14.',
    answerDetails:
      'All code is committed daily directly into your GitHub organization. Milestones are verified by automated CI gates: 100% test pass rates, Lighthouse performance scores >= 98, and zero security vulnerabilities.',
  },
  {
    question: 'Who owns the intellectual property and code?',
    answerDirectMetric:
      'Clients retain 100% of all intellectual property, copyright, and code ownership starting from commit #1 in their dedicated GitHub organization.',
    answerDetails:
      'WTFearB never retains proprietary code libraries or enforces vendor lock-in. All database migration DDLs, FastAPI endpoints, Next.js components, and golden evaluation datasets belong entirely to the client.',
  },
  {
    question: 'How quickly can we get started and what is the first step?',
    answerDirectMetric:
      'You can book a 15-Minute Architecture Audit ($0) today; active sprint pods can typically mobilize and begin committing code within 5 business days.',
    answerDetails:
      'The initial audit is conducted directly with a Principal Systems Engineer (no sales reps). We diagnose your bottleneck, outline the exact architecture topology, and provide a fixed-scope SOW with guaranteed pricing and timeline.',
  },
];

export function FaqSection(): React.ReactElement {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-16 md:py-24 border-b border-[var(--color-border-hairline)] bg-[var(--color-surface-subtle)]">
      <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
        <div className="pb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-signal)] font-semibold">
            Frequently Asked Questions
          </span>
          <h2 id="faq-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-ink-primary)] mt-2">
            Direct Technical Answers for Engineering Leaders.
          </h2>
          <p className="mt-3 text-sm text-[var(--color-ink-secondary)] max-w-2xl leading-relaxed">
            Transparent answers on our engineering methodology, governance gates, IP ownership, and sprint delivery guarantees.
          </p>
        </div>

        <div className="divide-y divide-[var(--color-border-hairline)] border-y border-[var(--color-border-hairline)] bg-[var(--color-surface-pure)] shadow-xs">
          {FAQS.map((faq, index) => (
            <details
              key={index}
              className="group p-6 sm:p-8 [&_summary::-webkit-details-marker]:hidden transition-colors hover:bg-[var(--color-canvas)]"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-mono text-sm sm:text-base font-bold text-[var(--color-ink-primary)] list-none">
                <span className="flex items-center gap-3">
                  <span className="text-[var(--color-accent-signal)] font-bold">
                    [0{index + 1}]
                  </span>
                  <span>{faq.question}</span>
                </span>
                <span className="text-[var(--color-accent-signal)] font-bold text-lg group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <div className="mt-4 pt-4 border-t border-[var(--color-border-hairline)] space-y-2 text-sm text-[var(--color-ink-secondary)] leading-relaxed">
                <p className="font-semibold text-[var(--color-ink-primary)]">
                  {faq.answerDirectMetric}
                </p>
                <p>{faq.answerDetails}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
