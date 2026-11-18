import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { generateRootJsonLd } from '@/lib/schema/json-ld';
import { AuditModalProvider } from '@/components/modals/AuditModalProvider';
import { TelemetryTracker } from '@/components/TelemetryTracker';
import { SITE_URL } from '@/lib/site-config';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'WTFearB — Product & AI Engineering Studio | Make "What If" Work.',
    template: '%s | WTFearB Engineering Studio',
  },
  description:
    'WTFearB is an elite systems engineering studio that builds and deploys governed AI agents, Next.js 15 web applications, and distributed event pipelines in deterministic 2-week sprints with 100% client GitHub IP ownership.',
  applicationName: 'WTFearB',
  authors: [{ name: 'WTFearB Engineering Pod', url: SITE_URL }],
  keywords: [
    'WTFearB',
    'Make What If Work',
    'AI engineering studio',
    'governed AI agents',
    'Next.js 15 App Router agency',
    'FastAPI pgvector engineering',
    'production RAG without hallucinations',
    'Reciprocal Rank Fusion BM25',
    'rapid 2-week engineering sprint',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'WTFearB — Product & AI Engineering Studio | Make "What If" Work.',
    description:
      'Ship governed AI agents and production software in weekly sprints. 100% GitHub IP ownership from commit #1.',
    url: SITE_URL,
    siteName: 'WTFearB',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'WTFearB Engineering Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WTFearB — Product & AI Engineering Studio | Make "What If" Work.',
    description:
      'Ship governed AI agents and production software in weekly sprints. 100% GitHub IP ownership from commit #1.',
    images: ['/api/og'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = generateRootJsonLd();

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </head>
      <body className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-ink-primary)] antialiased selection:bg-[var(--color-accent-signal)] selection:text-white">
        <AuditModalProvider>
          <TelemetryTracker />
          {children}
        </AuditModalProvider>
      </body>
    </html>
  );
}
