import type { MetadataRoute } from 'next';
import { BLUEPRINT_CATALOG } from '@/lib/state/blueprints-machine';
import { SEED_PORTFOLIO_PROJECTS } from '@/lib/seed-data';
import { SITE_URL } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const lastModified = new Date('2026-11-16T00:00:00.000Z');

  const coreRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/blueprints`, lastModified, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/projects`, lastModified, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/audit`, lastModified, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/compare`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/playbooks`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/llms.txt`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/llms-full.txt`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
  ];

  const comparisonRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/compare/traditional-dev-agencies`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/compare/in-house-hiring`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/compare/no-code-wrappers`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
  ];

  const playbookRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/playbooks/governed-rag-evaluation-harness`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/playbooks/postgres-rls-pgvector-hybrid-search`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
  ];

  const blueprintRoutes: MetadataRoute.Sitemap = BLUEPRINT_CATALOG.map((bp) => ({
    url: `${baseUrl}/blueprints/${bp.id}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const projectRoutes: MetadataRoute.Sitemap = SEED_PORTFOLIO_PROJECTS.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  return [
    ...coreRoutes,
    ...comparisonRoutes,
    ...playbookRoutes,
    ...blueprintRoutes,
    ...projectRoutes,
  ];
}
