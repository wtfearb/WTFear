import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SITE_URL } from '@/lib/site-config';

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
    title: 'WTFearB vs. Traditional Dev Agencies & Consultancies',
    metaDescription: 'Quantitative architectural comparison between WTFearB rapid 2-week engineering sprints and traditional dev shop retainers.',
    subtitle: 'Why senior engineering pods with CI-blocking eval gates outperform 6-month agency retainers.',
    comparisonTarget: 'Traditional Dev Agencies & Consultancies',
    leadDefinition: 'WTFearB operates as a senior systems engineering studio that delivers fixed-price 2-week sprints with 100% IP ownership, contrasting with traditional agencies that bill hourly retainers with junior contractor handoffs.',
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
        wtfearApproach: 'Transparent, milestone-scoped engagements confirmed after discovery and architecture review.',
        alternativeApproach: 'Open-ended hourly time & materials ($150-$250/hr) with scope creep incentives.',
      },
    ],
  },
  'in-house-hiring': {
    slug: 'in-house-hiring',
    title: 'WTFearB Engineering Pod vs. In-House Full-Time Hiring',
    metaDescription: 'Cost, time-to-production, and risk comparison between hiring full-time AI engineers vs engaging a dedicated WTFearB engineering pod.',
    subtitle: 'How to bypass the 4-month hiring lag and ship production AI agents this sprint.',
    comparisonTarget: 'In-House Full-Time Hiring',
    leadDefinition: 'A WTFearB Dedicated Engineering Pod provides immediate day-1 senior execution with transparent, milestone-scoped engagements confirmed after discovery and architecture review, eliminating recruiting overhead and multi-month hiring delays.',
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
        wtfearApproach: 'Transparent, milestone-scoped engagements confirmed after discovery and architecture review.',
        alternativeApproach: '$45,000+ / month for equivalent 2 senior US/EU engineers (salary + equity + healthcare + payroll tax).',
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
  'no-code-wrappers': {
    slug: 'no-code-wrappers',
    title: 'WTFearB Custom Systems vs. No-Code AI Wrappers',
    metaDescription: 'Architectural comparison between WTFearB governed code-first systems and brittle no-code AI tools (Zapier, Bubble, Make).',
    subtitle: 'Why mission-critical production workflows require code-governed schemas, vector indexing, and CI test harnesses.',
    comparisonTarget: 'No-Code AI Wrappers & DIY Tools',
    leadDefinition: 'WTFearB engineers custom production systems with deterministic Pydantic schemas and private database indexing, unlike no-code wrappers that suffer from silent failures, rate limits, and unverified outputs.',
    tableRows: [
      {
        dimension: 'Data Governance & Multi-Tenancy',
        wtfearApproach: 'PostgreSQL 16 Row-Level Security (RLS) and cryptographic tenant isolation in your private cloud.',
        alternativeApproach: 'Shared multi-tenant databases on proprietary third-party platforms with zero audit trail.',
      },
      {
        dimension: 'Hallucination Prevention',
        wtfearApproach: 'Pydantic v2 validation gates, 50-case CI golden eval suite, and 100% citation precision requirements.',
        alternativeApproach: 'Unchecked model output piped directly into customer apps; zero automated grounding verification.',
      },
      {
        dimension: 'Latency & Reliability',
        wtfearApproach: 'Sub-45ms single-query pgvector + BM25 search, sub-15ms edge webhook intake, and automated DLQ replay.',
        alternativeApproach: 'Chained HTTP webhooks with 3,000–8,000ms latency and silent failure drops during outages.',
      },
      {
        dimension: 'Source Code & Extensibility',
        wtfearApproach: '100% standard TypeScript & Python code in your GitHub repository. Zero platform lock-in.',
        alternativeApproach: 'Proprietary visual workflows that cannot be version-controlled, branched, or audited in Git.',
      },
      {
        dimension: 'Cost at Scale',
        wtfearApproach: 'Predictable serverless compute costs ($20–$100/mo) without per-execution markup penalties.',
        alternativeApproach: 'Punitive per-task billing that scales exponentially as volume increases.',
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
    title: `${comp.title} | WTFearB`,
    description: comp.metaDescription,
    alternates: {
      canonical: `${SITE_URL}/compare/${slug}`,
    },
    openGraph: {
      title: comp.title,
      description: comp.metaDescription,
      url: `${SITE_URL}/compare/${slug}`,
      siteName: 'WTFearB Systems Studio',
      type: 'article',
    },
  };
}

export default async function CompareDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comp = COMPARISONS[slug];

  if (!comp) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: comp.title,
    description: comp.leadDefinition,
    abstract: comp.metaDescription,
    url: `${SITE_URL}/compare/${slug}`,
  };

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-canvas)] text-[var(--color-ink-primary)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main className="flex-1 py-12 md:py-20">
        <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 font-mono text-xs text-[var(--color-ink-muted)]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[var(--color-ink-primary)]">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/compare" className="hover:text-[var(--color-ink-primary)]">Compare</Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--color-ink-primary)] font-bold">{comp.slug}</span>
          </nav>

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
                    WTFearB Systems Studio
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
              href="/contact?intent=audit"
              className="inline-flex items-center justify-center bg-[var(--color-accent-signal)] text-white px-6 py-3 font-mono text-xs font-semibold hover:brightness-110 transition-colors"
            >
              <span>DISCUSS ARCHITECTURE &amp; SCOPE &rarr;</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
