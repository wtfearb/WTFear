import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BLUEPRINT_CATALOG, type BlueprintId } from '@/lib/state/blueprints-machine';
import { generateBlueprintJsonLd } from '@/lib/schema/json-ld';

export function generateStaticParams(): { slug: BlueprintId }[] {
  return BLUEPRINT_CATALOG.map((bp) => ({ slug: bp.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blueprint = BLUEPRINT_CATALOG.find((b) => b.id === slug);
  if (!blueprint) return {};

  const canonicalUrl = `https://wtfear.agency/blueprints/${blueprint.id}`;
  const ogImageUrl = `https://wtfear.agency/api/og?title=${encodeURIComponent(
    blueprint.title
  )}&badge=${encodeURIComponent(blueprint.badge)}&duration=${encodeURIComponent(
    blueprint.durationLabel
  )}`;

  return {
    title: `${blueprint.title} (${blueprint.durationLabel})`,
    description: `${blueprint.summary} Built with ${blueprint.stack.join(
      ', '
    )}. Verified via ${blueprint.verificationGate}.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${blueprint.title} — Production Architecture Blueprint`,
      description: blueprint.problemStatement,
      url: canonicalUrl,
      siteName: 'wtfear — Product & AI Engineering Studio',
      type: 'article',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: blueprint.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: blueprint.title,
      description: blueprint.summary,
      images: [ogImageUrl],
    },
  };
}

export default async function BlueprintPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blueprint = BLUEPRINT_CATALOG.find((b) => b.id === slug);

  if (!blueprint) {
    notFound();
  }

  const jsonLd = generateBlueprintJsonLd({
    id: blueprint.id,
    title: blueprint.title,
    summary: blueprint.summary,
    stack: blueprint.stack,
  });

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-canvas)] text-[var(--color-ink-primary)]">
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <Header />

      <main className="flex-1 py-12 md:py-20">
        <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 font-mono text-xs text-[var(--color-ink-muted)]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[var(--color-ink-primary)]">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/#blueprints" className="hover:text-[var(--color-ink-primary)]">Blueprints</Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--color-ink-primary)] font-bold">{blueprint.id}</span>
          </nav>

          {/* Direct Definition Lead (Hidden visually, preserved in DOM for AI answer engines) */}
          <div className="sr-only">
            <dl className="font-mono text-xs leading-relaxed text-[var(--color-ink-secondary)]">
              <dt className="inline font-bold text-[var(--color-ink-primary)]">
                <dfn>{blueprint.title}</dfn>:
              </dt>{' '}
              <dd className="inline">
                A production-verified {blueprint.durationLabel.toLowerCase()} architecture blueprint by WTFearB shipping {blueprint.summary.toLowerCase()}
              </dd>
            </dl>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-[var(--color-accent-signal)] font-bold uppercase tracking-wider mb-2">
            <span>{blueprint.badge}</span>
            <span>&bull;</span>
            <span>{blueprint.durationLabel}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--color-ink-primary)] max-w-4xl">
            {blueprint.title}
          </h1>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-10">
              {/* Problem Analysis */}
              <section className="border border-[var(--color-border-hairline)] bg-[var(--color-surface-elevated)] p-6 sm:p-8">
                <h2 className="text-xl font-bold text-[var(--color-ink-primary)] mb-3">
                  The Root Architectural Problem
                </h2>
                <p className="text-sm text-[var(--color-ink-secondary)] leading-relaxed">
                  {blueprint.problemStatement}
                </p>
              </section>

              {/* Execution Steps */}
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-[var(--color-ink-primary)]">
                  Execution Checklist &amp; Invariants
                </h2>
                <div className="space-y-4">
                  {blueprint.checklist.map((step) => (
                    <div
                      key={step.stepIndex}
                      className="border border-[var(--color-border-hairline)] bg-[var(--color-surface-elevated)] p-6"
                    >
                      <div className="flex items-center justify-between font-mono text-xs mb-2">
                        <span className="font-bold text-[var(--color-accent-signal)]">
                          STEP {step.stepIndex} // {step.title}
                        </span>
                        {step.latencyTarget && (
                          <span className="text-[var(--color-ink-muted)]">{step.latencyTarget}</span>
                        )}
                      </div>
                      <p className="text-sm text-[var(--color-ink-secondary)] leading-relaxed">
                        {step.specification}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* CI Verification Gate */}
              <section className="border border-[var(--color-border-hairline)] bg-[var(--color-surface-elevated)] p-6 sm:p-8">
                <h2 className="text-xl font-bold text-[var(--color-ink-primary)] mb-2">
                  CI Verification &amp; Handover Gate
                </h2>
                <p className="font-mono text-xs text-[var(--color-ink-secondary)] bg-[var(--color-canvas)] p-3 border border-[var(--color-border-hairline)]">
                  {blueprint.verificationGate}
                </p>
              </section>
            </div>

            {/* Sidebar Meta */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="border-2 border-[var(--color-ink-primary)] bg-[var(--color-surface-elevated)] p-6 space-y-4">
                <div className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent-signal)] font-bold">
                  Engagement Delivery
                </div>
                <div className="font-mono text-2xl font-bold text-[var(--color-ink-primary)]">
                  {blueprint.durationLabel}
                </div>
                <p className="text-xs text-[var(--color-ink-muted)]">
                  Shipped directly to your GitHub organization with 100% IP transfer on day 1.
                </p>
                <div className="pt-2">
                  <Link
                    href="/#pricing"
                    className="block text-center bg-[var(--color-ink-primary)] text-white py-3 px-4 font-mono text-xs font-semibold hover:bg-[var(--color-accent-signal)] transition-colors"
                  >
                    CALCULATE SPRINT SCOPE &rarr;
                  </Link>
                </div>
              </div>

              <div className="border border-[var(--color-border-hairline)] bg-[var(--color-surface-elevated)] p-6 space-y-3">
                <div className="font-mono text-xs uppercase text-[var(--color-ink-muted)] font-semibold">
                  Production Stack
                </div>
                <div className="flex flex-wrap gap-2 font-mono text-xs">
                  {blueprint.stack.map((item) => (
                    <span
                      key={item}
                      className="border border-[var(--color-border-hairline)] bg-[var(--color-canvas)] px-2.5 py-1 text-[var(--color-ink-secondary)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
