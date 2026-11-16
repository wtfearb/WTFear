import type { MetadataRoute } from 'next';

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
          'anthropic-ai',
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
    sitemap: 'https://wtfear.agency/sitemap.xml',
    host: 'https://wtfear.agency',
  };
}
