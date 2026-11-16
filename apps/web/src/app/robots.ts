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
        ],
        allow: ['/', '/llms.txt', '/llms-full.txt', '/blueprints/', '/compare/', '/playbooks/'],
        disallow: ['/api/', '/internal/'],
      },
    ],
    sitemap: 'https://wtfear.agency/sitemap.xml',
    host: 'https://wtfear.agency',
  };
}
