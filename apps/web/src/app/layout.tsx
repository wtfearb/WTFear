import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { generateRootJsonLd } from '@/lib/schema/json-ld';
import { AuditModalProvider } from '@/components/modals/AuditModalProvider';
import { TelemetryTracker } from '@/components/TelemetryTracker';

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
  metadataBase: new URL('https://wtfear.agency'),
  title: {
    default: 'wtfear — Product & AI Engineering Studio | Governed AI & High-Performance Web',
    template: '%s | wtfear Engineering Studio',
  },
  description:
    'Senior Product and AI Engineering Studio that designs, builds, and ships governed AI agents, Next.js 15 web applications, and distributed backends in 2-week sprints with 100% client GitHub IP ownership.',
  applicationName: 'wtfear.agency',
  authors: [{ name: 'wtfear Engineering Pod', url: 'https://wtfear.agency' }],
  keywords: [
    'AI engineering studio',
    'governed AI agents',
    'Next.js 15 App Router agency',
    'FastAPI pgvector engineering',
    'production RAG without hallucinations',
    'Reciprocal Rank Fusion BM25',
    'rapid 2-week engineering sprint',
  ],
  alternates: {
    canonical: 'https://wtfear.agency',
  },
  openGraph: {
    title: 'wtfear — Product & AI Engineering Studio',
    description:
      'Ship governed AI agents and production software in weekly sprints. 100% GitHub IP ownership from commit #1.',
    url: 'https://wtfear.agency',
    siteName: 'wtfear.agency',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://wtfear.agency/api/og',
        width: 1200,
        height: 630,
        alt: 'wtfear Engineering Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'wtfear — Product & AI Engineering Studio',
    description:
      'Ship governed AI agents and production software in weekly sprints. 100% GitHub IP ownership from commit #1.',
    images: ['https://wtfear.agency/api/og'],
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
