/**
 * @file Linked @graph Schema.org JSON-LD Generator for wtfear.agency
 * @version 3.0.0
 */

import { SITE_URL } from '@/lib/site-config';

export interface OrganizationJsonLd {
  readonly '@type': 'Organization';
  readonly '@id': string;
  readonly name: string;
  readonly url: string;
  readonly logo: string;
  readonly description: string;
  readonly foundingDate: string;
  readonly contactPoint: {
    readonly '@type': 'ContactPoint';
    readonly email: string;
    readonly contactType: string;
  };
}

export function generateRootJsonLd(): Record<string, unknown> {
  const baseUrl = SITE_URL;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: 'WTFearB',
        alternateName: 'WTFearB Product & AI Engineering Studio',
        url: baseUrl,
        logo: `${baseUrl}/icon.png`,
        description:
          'WTFearB is a senior product and AI engineering studio that makes "What If" work, shipping governed AI agents, Next.js 15 web applications, and distributed event backends with 100% client GitHub IP ownership.',
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'wtfearb@gmail.com',
          contactType: 'technical sales & architecture audit',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: 'wtfear — Product & AI Engineering Studio',
        publisher: {
          '@id': `${baseUrl}/#organization`,
        },
      },
      {
        '@type': 'Service',
        '@id': `${baseUrl}/#service-ai-agents`,
        name: 'Governed AI Agent Engineering',
        serviceType: 'AI Engineering & Production RAG Systems',
        provider: {
          '@id': `${baseUrl}/#organization`,
        },
        description:
          'Design and implementation of hallucination-proof AI agents with pgvector HNSW + ParadeDB BM25 (pg_search) / Lexical FTS (ts_rank_cd) RRF, Pydantic v2 validation gates, and 50-case CI evaluation harnesses.',
      },
      {
        '@type': 'Service',
        '@id': `${baseUrl}/#service-mvp`,
        name: 'Fixed-Scope Production MVP',
        serviceType: 'Full-Stack Software Engineering',
        provider: {
          '@id': `${baseUrl}/#organization`,
        },
        description:
          'End-to-end multi-tenant SaaS application engineering with Next.js 15 App Router, TypeScript 5.7, PostgreSQL 16 RLS, and sub-second Core Web Vitals.',
      },
    ],
  };
}

export function generateBlueprintJsonLd(params: {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly stack: readonly string[];
}): Record<string, unknown> {
  const baseUrl = SITE_URL;
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${baseUrl}/blueprints/${params.id}#article`,
    headline: params.title,
    description: params.summary,
    url: `${baseUrl}/blueprints/${params.id}`,
    author: {
      '@id': `${baseUrl}/#organization`,
    },
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
    keywords: params.stack.join(', '),
  };
}

export function generateServicesJsonLd(): Record<string, unknown> {
  const baseUrl = SITE_URL;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${baseUrl}/services#webpage`,
        url: `${baseUrl}/services`,
        name: 'Disciplines We Own & Deliver | WTFearB',
        description:
          'Software, AI and systems engineering shaped around real business problems. Disciplines: Governed AI, Custom Software, SaaS Portals, Distributed Systems, Workflow Automation, and Technical Strategy.',
        isPartOf: {
          '@id': `${baseUrl}/#website`,
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${baseUrl}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Services',
              item: `${baseUrl}/services`,
            },
          ],
        },
      },
      {
        '@type': 'ItemList',
        '@id': `${baseUrl}/services#disciplines`,
        name: 'Engineering Disciplines We Own & Deliver',
        itemListElement: [
          {
            '@type': 'Service',
            position: 1,
            name: 'Governed AI Engineering & RAG Systems',
            url: `${baseUrl}/services#ai-engineering`,
            description:
              'AI agents, retrieval and knowledge workflows designed around useful business tasks, evidence and appropriate human oversight.',
          },
          {
            '@type': 'Service',
            position: 2,
            name: 'Custom Software & Systems Engineering',
            url: `${baseUrl}/services#custom-software`,
            description:
              'Purpose-built applications and internal systems shaped around the way teams actually work.',
          },
          {
            '@type': 'Service',
            position: 3,
            name: 'SaaS & Enterprise B2B Portals',
            url: `${baseUrl}/services#saas-b2b`,
            description:
              'Customer-facing products and portals with thoughtful access boundaries and maintainable foundations.',
          },
          {
            '@type': 'Service',
            position: 4,
            name: 'Backend & Distributed Event Pipelines',
            url: `${baseUrl}/services#backend-distributed`,
            description:
              'Backend services, event flows and integrations that keep connected applications working together.',
          },
          {
            '@type': 'Service',
            position: 5,
            name: 'Workflow Automation & System Integrations',
            url: `${baseUrl}/services#workflow-automation`,
            description:
              'Connect repetitive processes and reduce manual handoffs across the tools a business already uses.',
          },
          {
            '@type': 'Service',
            position: 6,
            name: 'Architecture & Technical Consulting',
            url: `${baseUrl}/services#architecture-consulting`,
            description:
              'Make informed technical decisions before committing to a build.',
          },
        ],
      },
    ],
  };
}
