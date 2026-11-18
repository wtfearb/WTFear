import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'About WTFearB | Systems Engineering Philosophy & Principles',
  description:
    'WTFearB is an embedded senior systems studio. Learn our engineering principles: governed AI, mathematical verification, 100% client GitHub IP ownership, and zero marketing fluff.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About WTFearB — Systems Engineering Philosophy',
    description:
      'We turn speculative "What If" into deterministic production software in weekly sprints with 100% client GitHub IP ownership.',
    url: '/about',
    siteName: 'WTFearB Systems Studio',
    type: 'website',
  },
};

const PRINCIPLES = [
  {
    number: '01',
    title: 'Governed AI Over Uncontrolled Prompting',
    subtitle: 'Zero hallucinations through mathematical verification',
    body: 'We do not build flimsy wrapper applications or rely on hopeful prompt engineering. Every AI agent we deploy operates within strict Pydantic v2 schemas, verified pgvector HNSW + ParadeDB BM25 (pg_search) / Lexical FTS (ts_rank_cd) RRF, and automated CI-blocking 50-case golden evaluation suites enforcing 100% citation precision.',
  },
  {
    number: '02',
    title: '100% Client GitHub IP Ownership from Commit #1',
    subtitle: 'No vendor lock-in, no delayed repository handoffs',
    body: 'All source code, Docker configs, CI/CD pipelines, database migrations, and architecture documentation are committed directly to your private GitHub organization from Day 1. You own every line of code, every schema, and every asset unconditionally.',
  },
  {
    number: '03',
    title: 'Zero Junior Delegation & Pure Systems Seniority',
    subtitle: 'Senior partners write and verify every pull request',
    body: 'Traditional agencies use senior directors to pitch the contract, then delegate execution to unvetted junior contractors. At WTFearB, you work directly with embedded Principal Systems Engineers and Senior Full-Stack Specialists who design the architecture, write the tests, and ship the code.',
  },
  {
    number: '04',
    title: 'Deterministic 2-Week Sprints Over Multi-Month Retainers',
    subtitle: 'Fixed scope, fixed price, guaranteed production cutover',
    body: 'We eliminate open-ended time-and-materials billing that incentivizes scope creep. Every project is scoped down to a deterministic 14-day sprint with a Day-7 staging demo and Day-14 production deployment backed by automated Playwright and pytest gates.',
  },
  {
    number: '05',
    title: 'Radical Technical Transparency',
    subtitle: 'Honest architecture without invented credentials',
    body: 'We refuse to invent fictional executive bios, inflated vanity headcount figures, or puffed-up client logos. We judge our work strictly by production uptime, query latency (p95 < 45ms), automated test coverage, and clean, readable code you can proudly maintain for years.',
  },
];

export default function AboutPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-ink-primary)] selection:bg-[var(--color-accent-signal)] selection:text-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Editorial Header */}
        <section className="py-12 md:py-16 border-b border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)]">
          <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-ink-muted)] mb-4">
              <Link href="/" className="hover:text-[var(--color-ink-primary)] underline decoration-[var(--color-border-hairline)]">
                Home
              </Link>
              <span>/</span>
              <span className="text-[var(--color-accent-signal)] font-semibold">About</span>
            </div>

            <div className="max-w-3xl">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-signal)] font-semibold">
                Studio Monograph &bull; Engineering Philosophy
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-ink-primary)] mt-3">
                Make &ldquo;What If&rdquo; Work.
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[var(--color-ink-secondary)] leading-relaxed">
                WTFearB was founded on a singular conviction: early-stage founders and modern enterprise teams should not have to gamble on bloated agencies, months of hiring delays, or brittle AI prototypes that collapse under production load.
              </p>
            </div>
          </div>
        </section>

        {/* Operating Model Strip */}
        <section className="border-b border-[var(--color-border-hairline)] bg-[var(--color-canvas)] py-6">
          <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-xs">
              <div>
                <span className="text-[var(--color-ink-muted)] block">STRUCTURE</span>
                <span className="font-bold text-[var(--color-ink-primary)] text-sm">Embedded Senior Pod</span>
              </div>
              <div>
                <span className="text-[var(--color-ink-muted)] block">CADENCE</span>
                <span className="font-bold text-[var(--color-ink-primary)] text-sm">Deterministic 2-Wk Sprints</span>
              </div>
              <div>
                <span className="text-[var(--color-ink-muted)] block">IP RIGHTS</span>
                <span className="font-bold text-[var(--color-ink-primary)] text-sm">100% Client GitHub</span>
              </div>
              <div>
                <span className="text-[var(--color-ink-muted)] block">VERIFICATION</span>
                <span className="font-bold text-[var(--color-ink-primary)] text-sm">CI-Blocking Eval Gates</span>
              </div>
            </div>
          </div>
        </section>

        {/* Core Principles Section */}
        <section className="py-12 md:py-20">
          <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
            <div className="pb-8 border-b border-[var(--color-border-hairline)]">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-signal)] font-semibold">
                Code of Conduct &bull; Engineering Standards
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-ink-primary)] mt-2">
                Five Principles Governing Every Commit.
              </h2>
            </div>

            <div className="mt-8 space-y-8">
              {PRINCIPLES.map((principle) => (
                <div
                  key={principle.number}
                  className="border border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)] p-6 sm:p-8"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 pb-4 border-b border-[var(--color-border-hairline)]">
                    <span className="font-mono text-xs font-bold text-[var(--color-accent-signal)]">
                      PRINCIPLE [{principle.number}]
                    </span>
                    <h3 className="text-xl font-bold text-[var(--color-ink-primary)]">
                      {principle.title}
                    </h3>
                  </div>

                  <p className="font-mono text-xs text-[var(--color-ink-muted)] mt-2">
                    {principle.subtitle}
                  </p>

                  <p className="mt-4 text-sm sm:text-base text-[var(--color-ink-secondary)] leading-relaxed">
                    {principle.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Bottom CTA */}
        <section className="py-16 border-t border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)]">
          <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-ink-primary)]">
              Work Directly With Our Systems Engineering Pod.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--color-ink-secondary)] max-w-xl mx-auto">
              No sales reps or account managers. Talk directly to the engineers who will architect and ship your system.
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
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-[var(--color-border-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink-primary)] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[var(--color-canvas-pure)] transition-all"
              >
                Send Technical Brief
              </Link>
            </div>
            <div className="mt-6 font-mono text-xs text-[var(--color-ink-muted)]">
              Direct Inquiries: <a href="mailto:wtfearb@gmail.com" className="text-[var(--color-accent-signal)] underline">wtfearb@gmail.com</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
