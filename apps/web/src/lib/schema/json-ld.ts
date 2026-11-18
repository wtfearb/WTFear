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
