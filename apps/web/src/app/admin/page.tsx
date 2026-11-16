import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getAuditLeads, getPortfolioProjects, getSiteSettings } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Engineering Admin Console | WTFearB',
  description: 'Internal telemetry and telemetry audit leads administration console for WTFearB.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage(): Promise<React.ReactElement> {
  const [leads, projects, siteSettings] = await Promise.all([
    getAuditLeads(25),
    getPortfolioProjects(false),
    getSiteSettings(),
  ]);

  return (
    <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-ink-primary)] selection:bg-[var(--color-accent-signal)] selection:text-white flex flex-col">
      <Header />

      <main className="flex-1 py-12 md:py-16">
        <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-ink-muted)] mb-4">
            <Link href="/" className="hover:text-[var(--color-ink-primary)] underline">
              Home
            </Link>
            <span>/</span>
            <span className="text-[var(--color-accent-signal)] font-semibold">Admin Console</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--color-border-hairline)]">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-signal)] font-semibold">
                Internal Telemetry &amp; Lead Console
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-ink-primary)] mt-1">
                Studio Operations Overview
              </h1>
            </div>
            <div className="font-mono text-xs px-3 py-1.5 border border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)]">
              Status: <span className="text-emerald-700 font-bold">ONLINE (PROD)</span>
            </div>
          </div>

          {/* Metrics Strip */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="border border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)] p-5">
              <span className="font-mono text-xs text-[var(--color-ink-muted)] block">AUDIT LEADS</span>
              <span className="text-2xl font-bold font-mono text-[var(--color-ink-primary)] mt-1 block">
                {leads.length}
              </span>
            </div>
            <div className="border border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)] p-5">
              <span className="font-mono text-xs text-[var(--color-ink-muted)] block">PORTFOLIO PROJECTS</span>
              <span className="text-2xl font-bold font-mono text-[var(--color-ink-primary)] mt-1 block">
                {projects.length}
              </span>
            </div>
            <div className="border border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)] p-5">
              <span className="font-mono text-xs text-[var(--color-ink-muted)] block">PORTFOLIO EMPTY STATE</span>
              <span className="text-sm font-bold font-mono text-[var(--color-accent-signal)] mt-2 block">
                {siteSettings.portfolioDisplayMode === 'coming_soon_empty_state' ? 'ACTIVE (HIDDEN)' : 'DISABLED (PUBLIC)'}
              </span>
            </div>
            <div className="border border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)] p-5">
              <span className="font-mono text-xs text-[var(--color-ink-muted)] block">DB ENGINE</span>
              <span className="text-sm font-bold font-mono text-[var(--color-ink-primary)] mt-2 block">
                Neon / In-Memory
              </span>
            </div>
          </div>

          {/* Audit Leads Table */}
          <div className="mt-12">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border-hairline)]">
              <h2 className="text-lg font-bold text-[var(--color-ink-primary)] font-mono">
                Recent Audit Requests ({leads.length})
              </h2>
              <span className="font-mono text-xs text-[var(--color-ink-muted)]">
                Sorted by most recent
              </span>
            </div>

            <div className="mt-4 border border-[var(--color-border-hairline)] bg-[var(--color-canvas-pure)] overflow-x-auto">
              {leads.length === 0 ? (
                <div className="p-8 text-center font-mono text-xs text-[var(--color-ink-muted)]">
                  No audit leads recorded in this session.
                </div>
              ) : (
                <table className="w-full text-left font-mono text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--color-border-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink-primary)]">
                      <th className="p-3 font-semibold">Email</th>
                      <th className="p-3 font-semibold">Company</th>
                      <th className="p-3 font-semibold">Timeline</th>
                      <th className="p-3 font-semibold">Score</th>
                      <th className="p-3 font-semibold">Status</th>
                      <th className="p-3 font-semibold">Bottleneck / Scope</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border-hairline)]">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-[var(--color-canvas)] transition-colors">
                        <td className="p-3 font-semibold text-[var(--color-ink-primary)]">{lead.workEmail}</td>
                        <td className="p-3 text-[var(--color-ink-secondary)]">{lead.companyDomain || '—'}</td>
                        <td className="p-3 text-[var(--color-ink-muted)]">{lead.targetTimeline}</td>
                        <td className="p-3 font-bold text-[var(--color-accent-signal)]">{lead.leadScore}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 border border-emerald-300 bg-emerald-50 text-emerald-800 text-[10px] font-semibold">
                            {lead.status}
                          </span>
                        </td>
                        <td className="p-3 text-[var(--color-ink-secondary)] max-w-xs truncate">
                          {lead.bottleneckDescription}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
