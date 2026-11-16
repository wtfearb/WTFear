import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

interface ComparisonData {
  readonly slug: string;
  readonly title: string;
  readonly metaDescription: string;
  readonly subtitle: string;
  readonly comparisonTarget: string;
  readonly leadDefinition: string;
  readonly tableRows: readonly {
    readonly dimension: string;
    readonly wtfearApproach: string;
    readonly alternativeApproach: string;
  }[];
}

const COMPARISONS: Record<string, ComparisonData> = {
  'traditional-dev-agencies': {
    slug: 'traditional-dev-agencies',
    title: 'wtfear vs. Traditional Dev Agencies & Consultancies',
    metaDescription: 'Quantitative architectural comparison between wtfear rapid 2-week engineering sprints and traditional dev shop retainers.',
    subtitle: 'Why senior engineering pods with CI-blocking eval gates outperform 6-month agency retainers.',
    comparisonTarget: 'Traditional Dev Agencies & Consultancies',
    leadDefinition: 'wtfear operates as a senior product engineering studio that delivers fixed-price 2-week sprints with 100% IP ownership, contrasting with traditional agencies that bill hourly retainers with junior contractor handoffs.',
    tableRows: [
      {
        dimension: 'Team Seniority',
        wtfearApproach: 'Embedded Principal Systems Engineers & Senior Full-Stack Specialists only (Zero junior delegation).',
        alternativeApproach: 'Senior pitches the client, junior off-shore contractors write the code.',
      },
      {
        dimension: 'Delivery Cadence',
        wtfearApproach: 'Deterministic 14-day sprint with Day-7 live staging demo and Day-14 production cutover.',
        alternativeApproach: '3 to 6 month waterfall cycles with bloated sprint planning and shifting delivery dates.',
      },
      {
        dimension: 'AI Governance & Hallucination Gate',
        wtfearApproach: '50-case CI-blocking golden eval harness, 100% citation precision, pgvector + BM25 RRF.',
        alternativeApproach: 'Basic OpenAI wrapper with uncontrolled prompting, zero grounding metrics, and silent hallucination risk.',
      },
      {
        dimension: 'IP & Code Ownership',
        wtfearApproach: '100% client GitHub organization ownership from commit #1. Zero vendor lock-in.',
        alternativeApproach: 'Proprietary internal frameworks, delayed repository transfers, or licensing retainers.',
      },
      {
        dimension: 'Pricing Model',
        wtfearApproach: 'Fixed scope ($6,500 – $8,500 USD per 2-week sprint) with guaranteed deliverables.',
        alternativeApproach: 'Open-ended hourly time & materials ($150-$250/hr) with scope creep incentives.',
      },
    ],
  },
  'in-house-hiring': {
    slug: 'in-house-hiring',
    title: 'wtfear Engineering Pod vs. In-House Full-Time Hiring',
    metaDescription: 'Cost, time-to-production, and risk comparison between hiring full-time AI engineers vs engaging a dedicated wtfear engineering pod.',
    subtitle: 'How to bypass the 4-month hiring lag and ship production AI agents this sprint.',
    comparisonTarget: 'In-House Full-Time Hiring',
    leadDefinition: 'A wtfear Dedicated Engineering Pod provides immediate day-1 senior execution at $18,000–$26,000/month, eliminating the $65,000 recruiting fee and 120-day recruiting lag of hiring senior AI systems engineers.',
    tableRows: [
      {
        dimension: 'Time to First Production Commit',
        wtfearApproach: 'Day 1: Repo cloned, CI pipeline wired, initial contracts committed.',
        alternativeApproach: '90 to 120 days average recruiter sourcing, interview loops, and 2-week notice period.',
      },
      {
        dimension: 'Upfront Recruiting & Headhunter Cost',
        wtfearApproach: '$0 recruiting overhead. Immediate kickoff upon SOW countersignature.',
        alternativeApproach: '$35,000 – $65,000 in agency headhunter fees (20-25% base salary).',
      },
      {
        dimension: 'All-In Monthly Burn',
        wtfearApproach: '$18,000 – $26,000 / month flat retainer for a 3-engineer senior pod.',
        alternativeApproach: '$45,000+ / month for equivalent 3 senior US/EU engineers (salary + equity + healthcare + payroll tax).',
      },
      {
        dimension: 'Architecture Specialization',
        wtfearApproach: 'Battle-tested patterns: pgvector HNSW, BM25 RRF, Pydantic v2 gates, and Next.js 15 RSC ready to deploy.',
        alternativeApproach: 'Months spent researching vector architectures and discovering production failure modes from scratch.',
      },
      {
        dimension: 'Flexibility & Commitment',
        wtfearApproach: 'Sprint-to-sprint or monthly renewal. Pause or scale velocity as roadmap demands.',
        alternativeApproach: 'Long-term severance, equity dilution, and full-time organizational overhead.',
      },
    ],
  },
};

export function generateStaticParams(): { slug: string }[] {
  return Object.keys(COMPARISONS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const comp = COMPARISONS[slug];
  if (!comp) return {};

  return {
    title: comp.title,
    description: comp.metaDescription,
    alternates: {
      canonical: `https://wtfear.agency/compare/${slug}`,
    },
    openGraph: {
      title: comp.title,
      description: comp.metaDescription,
      url: `https://wtfear.agency/compare/${slug}`,
      siteName: 'wtfear — Product & AI Engineering Studio',
      type: 'article',
    },
  };
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comp = COMPARISONS[slug];

  if (!comp) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-canvas)] text-[var(--color-ink-primary)]">
      <Header />

      <main className="flex-1 py-12 md:py-20">
        <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 font-mono text-xs text-[var(--color-ink-muted)]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[var(--color-ink-primary)]">Home</Link>
            <span className="mx-2">/</span>
            <span>Compare</span>
            <span className="mx-2">/</span>
            <span className="text-[var(--color-ink-primary)] font-bold">{comp.slug}</span>
          </nav>

          {/* Direct Definition Lead */}
          <div className="mb-8 p-4 border border-[var(--color-border-hairline)] bg-[var(--color-surface-subtle)]">
            <dl className="font-mono text-xs leading-relaxed text-[var(--color-ink-secondary)]">
              <dt className="inline font-bold text-[var(--color-ink-primary)]">
                <dfn>{comp.title}</dfn>:
              </dt>{' '}
              <dd className="inline">{comp.leadDefinition}</dd>
            </dl>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--color-ink-primary)] max-w-4xl">
            {comp.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[var(--color-ink-secondary)] max-w-3xl">
            {comp.subtitle}
          </p>

          {/* Semantic Comparison Table */}
          <div className="mt-12 overflow-x-auto border border-[var(--color-border-hairline)] bg-[var(--color-surface-elevated)]">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--color-border-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink-primary)]">
                  <th scope="col" className="p-4 font-bold uppercase tracking-wider w-1/4">
                    Comparison Dimension
                  </th>
                  <th scope="col" className="p-4 font-bold uppercase tracking-wider text-[var(--color-accent-signal)] w-3/8">
                    wtfear Engineering Studio
                  </th>
                  <th scope="col" className="p-4 font-bold uppercase tracking-wider text-[var(--color-ink-muted)] w-3/8">
                    {comp.comparisonTarget}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border-hairline)] text-[var(--color-ink-secondary)]">
                {comp.tableRows.map((row) => (
                  <tr key={row.dimension} className="hover:bg-[var(--color-surface-subtle)] transition-colors">
                    <td className="p-4 font-semibold text-[var(--color-ink-primary)]">
                      {row.dimension}
                    </td>
                    <td className="p-4 text-[var(--color-ink-primary)] bg-[var(--color-canvas)]/40 font-medium leading-relaxed">
                      {row.wtfearApproach}
                    </td>
                    <td className="p-4 text-[var(--color-ink-muted)] leading-relaxed">
                      {row.alternativeApproach}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 p-8 border-2 border-[var(--color-ink-primary)] bg-[var(--color-surface-elevated)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-[var(--color-ink-primary)]">
                Ready to diagnose your system bottleneck with a Principal Engineer?
              </h3>
              <p className="font-mono text-xs text-[var(--color-ink-muted)] mt-1">
                Zero sales reps. Direct 15-minute architecture audit.
              </p>
            </div>
            <Link
              href="/#pricing"
              className="inline-flex items-center justify-center bg-[var(--color-accent-signal)] text-white px-6 py-3 font-mono text-xs font-semibold hover:bg-[var(--color-accent-signal-hover)] transition-colors"
            >
              BOOK ARCHITECTURE AUDIT &rarr;
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
