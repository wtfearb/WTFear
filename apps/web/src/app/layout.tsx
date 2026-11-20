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
    default: 'WTFearB — Custom AI Software & Automation Agency',
    template: '%s | WTFearB',
  },
  description:
    'WTFearB engineers governed multi-agent AI systems, custom RAG pipelines, enterprise ERPs, and B2B SaaS platforms. Make What If Work with senior rigor.',
  applicationName: 'WTFearB',
  authors: [{ name: 'WTFearB Engineering Pod', url: SITE_URL }],
  keywords: [
    'WTFearB',
    'WTFearB agency',
    'WTFearB tech',
    'Make What If Work',
    'custom AI workflow automation agency',
    'agentic AI development agency',
    'multi-agent system development',
    'LLM engineering agency',
    'custom RAG system for enterprise',
    'custom ERP development agency',
    'AI-powered CRM development',
    'full-stack SaaS development studio',
    'AI automation agency India',
    'custom software development agency Hyderabad',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'WTFearB — Custom AI Software & Automation Agency',
    description:
      'WTFearB engineers governed multi-agent AI systems, custom RAG pipelines, enterprise ERPs, and B2B SaaS platforms. Make What If Work with senior rigor.',
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
    title: 'WTFearB — Custom AI Software & Automation Agency',
    description:
      'WTFearB engineers governed multi-agent AI systems, custom RAG pipelines, enterprise ERPs, and B2B SaaS platforms. Make What If Work with senior rigor.',
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/WTFB-light-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/WTFB-light-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/WTFB-light-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
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
