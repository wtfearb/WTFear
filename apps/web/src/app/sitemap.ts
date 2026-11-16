import type { MetadataRoute } from 'next';
import { BLUEPRINT_CATALOG } from '@/lib/state/blueprints-machine';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wtfear.agency';
  const lastModified = new Date('2026-11-16T00:00:00.000Z');

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/llms.txt`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/llms-full.txt`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/compare/traditional-dev-agencies`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/compare/in-house-hiring`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/playbooks/governed-rag-evaluation-harness`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/playbooks/postgres-rls-pgvector-hybrid-search`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
  ];

  const blueprintRoutes: MetadataRoute.Sitemap = BLUEPRINT_CATALOG.map((bp) => ({
    url: `${baseUrl}/blueprints/${bp.id}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  return [...staticRoutes, ...blueprintRoutes];
}
