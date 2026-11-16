import React from 'react';

interface FaqItem {
  readonly question: string;
  readonly answerDirectMetric: string;
  readonly answerDetails: string;
}

const FAQS: readonly FaqItem[] = [
  {
    question: 'How much does a 2-Week Rapid Engineering Sprint cost?',
    answerDirectMetric:
      'A 2-Week Rapid Engineering Sprint at wtfear costs between $6,500 and $8,500 USD for fixed-scope execution, scaling to $9,600 to $12,000 USD when including governed AI complexity and a 50-case CI golden evaluation harness.',
    answerDetails:
      'There are zero hidden retainer fees, management markups, or hourly billing surprises. You receive two dedicated senior engineers who ship directly to your GitHub repository with a Day-7 live staging demo and a Day-14 production handover.',
  },
  {
    question: 'Who owns the intellectual property and code written during sprints?',
    answerDirectMetric:
      'Clients retain 100% of all intellectual property, copyright, and code ownership starting from commit #1 in their dedicated GitHub organization.',
    answerDetails:
      'wtfear never retains proprietary code libraries or enforces vendor lock-in. All Terraform scripts, database migration DDLs, FastAPI endpoints, Next.js components, and golden evaluation datasets belong entirely to the client.',
  },
  {
    question: 'How does wtfear guarantee zero hallucinations in production AI agents?',
    answerDirectMetric:
      'Every autonomous AI agent response requires 100% citation precision against verified knowledge chunks from a PostgreSQL 16 RLS partition, backed by a CI-blocking 50-case golden evaluation suite enforcing cosine similarity >= 0.85.',
    answerDetails:
      'When confidence falls below 0.82 or dense grounding drops below 0.78, the deterministic Pydantic v2 state machine prevents autonomous execution and routes the ticket directly to human engineers on Slack with full context.',
  },
  {
    question: 'What performance and latency benchmarks do your Next.js applications meet?',
    answerDirectMetric:
      'Every Next.js 15 App Router deployment enforces a Largest Contentful Paint (LCP) under 1.2 seconds, Cumulative Layout Shift (CLS) of 0.000, Total Blocking Time (TBT) under 50ms, and a First Load JS bundle under 85 KB.',
    answerDetails:
      'Performance budgets are enforced as blocking CI gates using Lighthouse CI and Playwright before any pull request merges to main, ensuring top Core Web Vitals and SEO rankings.',
  },
  {
    question: 'How does the free 15-Minute Architecture Audit work?',
    answerDirectMetric:
      'The 15-Minute Architecture Audit is a $0 technical session conducted directly with a Principal Systems Engineer, with zero involvement from sales representatives.',
    answerDetails:
      'We examine your specific system bottleneck—whether it is LLM hallucination, database query latency, or monolithic architecture drift—and deliver a tailored architectural diagnosis and 1-page SOW within 45 seconds of booking.',
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
          <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-ink-primary)] mt-2">
            Direct Technical Answers for Engineering Leaders.
          </h2>
        </div>

        <div className="divide-y divide-[var(--color-border-hairline)] border-y border-[var(--color-border-hairline)]">
          {FAQS.map((faq, idx) => (
            <article key={idx} className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6">
              <h3 className="md:col-span-5 text-lg font-bold text-[var(--color-ink-primary)] leading-snug">
                {faq.question}
              </h3>
              <div className="md:col-span-7 space-y-3">
                <p className="text-sm font-semibold text-[var(--color-ink-primary)] leading-relaxed">
                  {faq.answerDirectMetric}
                </p>
                <p className="text-xs text-[var(--color-ink-secondary)] leading-relaxed">
                  {faq.answerDetails}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
