import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProjectsHero } from '@/components/projects/ProjectsHero';
import { PolarisFeaturedCard } from '@/components/projects/PolarisFeaturedCard';
import { SpecialistPlatformsGrid } from '@/components/projects/SpecialistPlatformsGrid';
import { ProjectsIndexTable } from '@/components/projects/ProjectsIndexTable';
import { ProjectsCtaSection } from '@/components/projects/ProjectsCtaSection';
import { SITE_URL } from '@/lib/site-config';
import { SEED_PORTFOLIO_PROJECTS } from '@/lib/seed-data';

export const metadata: Metadata = {
  title: 'Flagship AI, ERP & SaaS Engineering Work',
  description:
    'Explore WTFearB’s 10 flagship platforms including PolarisERP, NexusVoice, VegaDocs, NexusAudit, and CapellaBI with live deployments and repos.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Flagship AI, ERP & SaaS Engineering Work',
    description:
      'Explore WTFearB’s 10 flagship platforms including PolarisERP, NexusVoice, VegaDocs, NexusAudit, and CapellaBI with live deployments and repos.',
    url: '/projects',
    siteName: 'WTFearB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flagship AI, ERP & SaaS Engineering Work',
    description:
      'Explore WTFearB’s 10 flagship platforms including PolarisERP, NexusVoice, VegaDocs, NexusAudit, and CapellaBI with live deployments and repos.',
  },
};

export default function ProjectsIndexPage(): React.ReactElement {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/projects#webpage`,
        url: `${SITE_URL}/projects`,
        name: 'Flagship AI, ERP, Voice & SaaS Engineering Case Studies | WTFearB',
        description:
          'Explore WTFearB’s 10 flagship platforms including PolarisERP, NexusVoice, VegaDocs, NexusAudit, and CapellaBI—engineered with live deployments and sovereign architectures.',
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${SITE_URL}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Projects',
              item: `${SITE_URL}/projects`,
            },
          ],
        },
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE_URL}/projects#flagships`,
        name: 'WTFearB 10 Real Flagship Platforms',
        numberOfItems: SEED_PORTFOLIO_PROJECTS.length,
        itemListElement: SEED_PORTFOLIO_PROJECTS.map((proj, idx) => ({
          '@type': 'SoftwareApplication',
          position: idx + 1,
          name: proj.title,
          url: `${SITE_URL}/projects/${proj.slug}`,
          applicationCategory: proj.category,
          operatingSystem: 'Cloud / Web / Distributed',
          description: proj.summary,
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0A0A0C] selection:bg-[#C83E1B] selection:text-white flex flex-col scroll-smooth">
      {/* Schema.org Linked Graph JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <Header />

      <main className="flex-1">
        {/* REGION 01 — EDITORIAL HERO & METADATA STRIP */}
        <ProjectsHero />

        {/* REGION 02 — 01 / FEATURED PROJECT (PolarisERP) */}
        <PolarisFeaturedCard />

        {/* REGION 03 — 02 / SOVEREIGN AI & SPECIALIST PLATFORMS (Ranks 02–07) */}
        <SpecialistPlatformsGrid />

        {/* REGION 04 — 03 / PROJECT INDEX: REVENUE ENGINES & WORKFLOW FABRICS (Ranks 08–10) */}
        <ProjectsIndexTable />

        {/* REGION 05 — EDITORIAL FINAL CTA */}
        <ProjectsCtaSection />
      </main>

      {/* Shared Dark Obsidian Footer */}
      <Footer />
    </div>
  );
}
