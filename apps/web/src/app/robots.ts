import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site-config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          '*',
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'Claude-Web',
          'anthropic-ai',
          'Applebot-Extended',
          'Google-Extended',
          'cohere-ai',
        ],
        allow: [
          '/',
          '/services',
          '/blueprints',
          '/projects',
          '/about',
          '/contact',
          '/audit',
          '/compare',
          '/playbooks',
          '/llms.txt',
          '/llms-full.txt',
        ],
        disallow: ['/admin', '/api/admin', '/internal/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
