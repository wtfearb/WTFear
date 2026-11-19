/**
 * @file Linked @graph Schema.org JSON-LD Generator for www.wtfearb.tech
 * @version 3.1.0
 */

import { SITE_URL } from '@/lib/site-config';

export interface OrganizationJsonLd {
  readonly '@type': 'Organization';
  readonly '@id': string;
  readonly name: string;
  readonly alternateName: readonly string[];
  readonly url: string;
  readonly logo: string;
  readonly slogan?: string;
  readonly description: string;
  readonly sameAs: readonly string[];
  readonly areaServed: readonly string[];
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
        alternateName: [
          'WTFear',
          'WTFearB Studio',
          'WTFearB Tech',
          'What The Fear Boss',
          'What The Fear Business',
        ],
        url: baseUrl,
        logo: `${baseUrl}/WTFB-light-512x512.png`,
        slogan: 'Make What If Work.',
        description:
          'WTFearB is a custom AI software development and business automation agency specializing in governed multi-agent AI systems, LLM & RAG engineering, custom ERPs/CRMs, and enterprise SaaS platforms.',
        sameAs: [
          'https://github.com/wtfear',
          'https://github.com/wtfearb',
          'https://www.linkedin.com/company/wtfearb/',
        ],
        areaServed: ['Global', 'India', 'Hyderabad', 'United States', 'Europe'],
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

export function generateAboutJsonLd(): Record<string, unknown> {
  const baseUrl = SITE_URL;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${baseUrl}/about#webpage`,
        url: `${baseUrl}/about`,
        name: 'About WTFearB — Studio Monograph & Operating Architecture',
        description:
          'WTFearB is a principal-led Product and AI Engineering Studio built for teams solving complex operational and technical problems—without agency bloat or fragile AI wrappers.',
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
              item: baseUrl,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'About',
              item: `${baseUrl}/about`,
            },
          ],
        },
        about: {
          '@id': `${baseUrl}/#organization`,
        },
      },
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: 'WTFearB',
        alternateName: [
          'WTFear',
          'WTFearB Studio',
          'WTFearB Tech',
          'What The Fear Boss',
          'What The Fear Business',
        ],
        url: baseUrl,
        logo: `${baseUrl}/WTFB-light-512x512.png`,
        slogan: 'Make What If Work.',
        description:
          'WTFearB is a custom AI software development and business automation agency specializing in governed multi-agent AI systems, LLM & RAG engineering, custom ERPs/CRMs, and enterprise SaaS platforms.',
        sameAs: [
          'https://github.com/wtfear',
          'https://github.com/wtfearb',
          'https://www.linkedin.com/company/wtfearb/',
        ],
        areaServed: ['Global', 'India', 'Hyderabad', 'United States', 'Europe'],
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'wtfearb@gmail.com',
          contactType: 'technical sales & architecture audit',
        },
      },
    ],
  };
}

export function generateFaqJsonLd(
  items: readonly { readonly question: string; readonly answer: string }[]
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What does WTFearB stand for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'WTFearB stands for "What The Fear, Boss / Business / Buddy." Guided by the tagline "Make What If Work," WTFearB eliminates operational bottlenecks through governed multi-agent AI systems, custom software, and enterprise SaaS engineering.',
        },
      },
      ...items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    ],
  };
}
