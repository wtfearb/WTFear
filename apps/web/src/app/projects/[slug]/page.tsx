import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getPortfolioProjects, getPortfolioProjectBySlug } from '@/lib/db';
import { SITE_URL } from '@/lib/site-config';

const LEGACY_SLUG_MAP: Record<string, string> = {
  'sentinel-rag-triage': 'vega-docs',
  'nexus-b2b-tenant-portal': 'polaris-erp',
  'chronos-event-ingestion-spine': 'sirius-iq',
  'veritas-contract-intelligence': 'vega-docs',
};

const SHORT_TITLES: Record<string, string> = {
  'polaris-erp': 'PolarisERP — Autonomous CRM & ERP',
  'nexus-voice': 'NexusVoice — Sovereign Voice AI',
  'vega-docs': 'VegaDocs — Private Document RAG',
  'nexus-audit': 'NexusAudit — Autonomous Web Auditor',
  'capella-bi': 'CapellaBI — DuckDB-WASM Analytics',
  'nexus-persona': 'NexusPersona — Multi-Agent Simulation',
  'castor-chat': 'CastorChat — WhatsApp Support Desk',
  'sirius-iq': 'SiriusIQ — Agent Decision Fabric',
  'altair-commerce': 'AltairCommerce — Headless Commerce',
  'antares-erp': 'AntaresERP — Retail POS & Warehouse',
};

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const projects = await getPortfolioProjects(false);
  const baseSlugs = projects.map((p) => ({ slug: p.slug }));
  const legacySlugs = Object.keys(LEGACY_SLUG_MAP).map((slug) => ({ slug }));
  return [...baseSlugs, ...legacySlugs];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const targetSlug = LEGACY_SLUG_MAP[slug] || slug;
  const project = await getPortfolioProjectBySlug(targetSlug);
  if (!project) return {};

  const canonicalUrl = `${SITE_URL}/projects/${project.slug}`;
  const shortTitle = SHORT_TITLES[project.slug] || `${project.title} — Systems Monograph`;
  const cleanSummary = project.summary.length > 150 ? `${project.summary.slice(0, 147)}...` : project.summary;

  return {
    title: shortTitle,
    description: cleanSummary,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: shortTitle,
      description: cleanSummary,
      url: canonicalUrl,
      siteName: 'WTFearB',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: shortTitle,
      description: cleanSummary,
    },
  };
}

interface ArchitectureNode {
  readonly id: string;
  readonly label: string;
  readonly role?: string;
  readonly latency?: string;
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Handle graceful redirect for legacy slugs
  if (LEGACY_SLUG_MAP[slug]) {
    redirect(`/projects/${LEGACY_SLUG_MAP[slug]}`);
  }

  const project = await getPortfolioProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const stack = Array.isArray(project.stackTags) ? (project.stackTags as string[]) : [];
  const features = Array.isArray(project.keyFeatures) ? (project.keyFeatures as string[]) : [];
  const nodes = Array.isArray(project.architectureNodesJson)
    ? (project.architectureNodesJson as ArchitectureNode[])
    : [];

  return (
    <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-ink-primary)] selection:bg-[var(--color-accent-signal)] selection:text-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Monograph Top Navigation */}
        <section className="py-8 md:py-12 border-b border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)]">
          <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-ink-muted)] mb-4">
              <Link href="/" className="hover:text-[var(--color-ink-primary)] underline decoration-[var(--color-border-hairline)]">
                Home
              </Link>
              <span>/</span>
              <Link href="/projects" className="hover:text-[var(--color-ink-primary)] underline decoration-[var(--color-border-hairline)]">
                Projects
              </Link>
              <span>/</span>
              <span className="text-[var(--color-accent-signal)] font-semibold truncate max-w-xs sm:max-w-md">
                {project.slug}
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[var(--color-accent-signal)] px-2 py-0.5 border border-[var(--color-border-hairline)] bg-[var(--color-canvas)]">
                    PLATFORM [{String(project.indexNumber).padStart(2, '0')}]
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-muted)]">
                    {project.industry} &bull; {project.category}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-ink-primary)] mt-3">
                  {project.title}
                </h1>
                <p className="mt-4 text-base sm:text-lg text-[var(--color-ink-secondary)] leading-relaxed">
                  {project.summary}
                </p>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center gap-3.5 mt-6 pt-2">
                  {project.liveUrl && project.liveUrl.startsWith('http') && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#C83E1B] hover:bg-[#A83214] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-[3px] transition-colors shadow-xs"
                    >
                      <span>Launch Live Deployment</span>
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  )}

                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#101114] text-[#101114] hover:bg-[#101114] hover:text-white font-mono text-xs font-bold uppercase tracking-wider rounded-[3px] transition-colors"
                    >
                      <span>View GitHub Repository</span>
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="shrink-0 p-4 border border-[var(--color-border-hairline)] bg-[var(--color-canvas)] font-mono text-xs space-y-1">
                <div className="text-[var(--color-ink-muted)]">SYSTEM: <strong className="text-[var(--color-ink-primary)]">FLAGSHIP PLATFORM</strong></div>
                <div className="text-[var(--color-ink-muted)]">ARCHITECTURE: <strong className="text-[var(--color-ink-primary)]">HIGH-CONCURRENCY</strong></div>
                <div className="text-[var(--color-ink-muted)]">AUDIT: <strong className="text-[var(--color-ink-primary)]">HARDENED SPEC</strong></div>
              </div>
            </div>
          </div>
        </section>

        {/* Outcomes Banner */}
        <section className="border-b border-[var(--color-border-hairline)] bg-emerald-50/30 py-4">
          <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 text-xs sm:text-sm font-mono text-emerald-900">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
              <span>
                <strong className="text-emerald-950 font-bold uppercase tracking-wider">Production Outcome:</strong>{' '}
                {project.outcomesSummary}
              </span>
            </div>
          </div>
        </section>

        {/* Deep Dive Content */}
        <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
          {/* Problem vs Solution Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-red-200/80 bg-red-50/20 p-6 sm:p-8">
              <span className="font-mono text-xs uppercase tracking-widest text-red-700 font-semibold block mb-2">
                01 &bull; The Production Problem
              </span>
              <h2 className="text-xl font-bold text-[var(--color-ink-primary)] mb-4">
                Architectural Breakdown &amp; Vulnerability
              </h2>
              <p className="text-sm text-[var(--color-ink-secondary)] leading-relaxed whitespace-pre-line">
                {project.problem}
              </p>
            </div>

            <div className="border border-emerald-200/80 bg-emerald-50/20 p-6 sm:p-8">
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-800 font-semibold block mb-2">
                02 &bull; The WTFearB Solution
              </span>
              <h2 className="text-xl font-bold text-[var(--color-ink-primary)] mb-4">
                Deterministic Implementation &amp; Guardrails
              </h2>
              <p className="text-sm text-[var(--color-ink-secondary)] leading-relaxed whitespace-pre-line">
                {project.solution}
              </p>
            </div>
          </section>

          {/* Architecture Topology Nodes */}
          {nodes.length > 0 && (
            <section className="border border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)] p-6 sm:p-8">
              <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border-hairline)]">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-signal)] font-semibold">
                    System Architecture
                  </span>
                  <h2 className="text-xl font-bold text-[var(--color-ink-primary)] mt-1">
                    Distributed Node Topology &amp; Latency Budget
                  </h2>
                </div>
                <span className="font-mono text-xs text-[var(--color-ink-muted)]">
                  {nodes.length} Connected Subsystems
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {nodes.map((node, index) => (
                  <div
                    key={node.id || index}
                    className="border border-[var(--color-border-hairline)] bg-[var(--color-canvas)] p-4 font-mono text-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[10px] text-[var(--color-ink-muted)] mb-1">
                        NODE_{String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="font-bold text-[var(--color-ink-primary)] text-sm mb-1">
                        {node.label}
                      </div>
                      {node.role && (
                        <div className="text-[11px] text-[var(--color-ink-secondary)]">
                          {node.role}
                        </div>
                      )}
                    </div>
                    {node.latency && (
                      <div className="mt-3 pt-2 border-t border-[var(--color-border-hairline)] text-[10px] text-[var(--color-accent-signal)] font-semibold">
                        Budget: {node.latency}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Key Features & Technology Stack */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 border border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)] p-6 sm:p-8">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-muted)] font-semibold block mb-2">
                Engineering Specification
              </span>
              <h2 className="text-xl font-bold text-[var(--color-ink-primary)] mb-4">
                Key Features &amp; Verification Gates
              </h2>
              <ul className="space-y-3">
                {features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[var(--color-ink-secondary)]">
                    <span className="font-mono text-xs font-bold text-[var(--color-accent-signal)] shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-muted)] font-semibold block mb-2">
                  Technical Stack
                </span>
                <h2 className="text-lg font-bold text-[var(--color-ink-primary)] mb-4">
                  Verified Dependencies
                </h2>
                <div className="flex flex-wrap gap-2">
                  {stack.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs px-2.5 py-1 border border-[var(--color-border-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink-secondary)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--color-border-hairline)]">
                <Link
                  href="/contact?intent=audit"
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-[var(--color-accent-signal)] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:brightness-110 transition-all text-center"
                >
                  <span>Build This System</span>
                  <span className="ml-2">&rarr;</span>
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* Global Bottom CTA */}
        <section className="py-16 border-t border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)]">
          <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-ink-primary)]">
              Have an Architecture Challenge Like This?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--color-ink-secondary)] max-w-xl mx-auto">
              Book an Architecture Audit with our embedded senior pod. We evaluate your data topology and guarantee execution with clear milestones.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact?intent=audit"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-[var(--color-accent-signal)] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:brightness-110 transition-all"
              >
                <span>Discuss Architecture &amp; Scope</span>
                <span className="ml-2">&rarr;</span>
              </Link>
              <Link
                href="/projects"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-[var(--color-border-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink-primary)] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[var(--color-canvas-pure)] transition-all"
              >
                Back to All Projects
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
