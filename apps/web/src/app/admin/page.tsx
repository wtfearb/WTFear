import type { Metadata } from 'next';
import {
  getTelemetryMetrics,
  getAuditLeads,
  getPortfolioProjects,
  getPricingConfigs,
  getSiteSettings,
} from '@/lib/db';
import { AdminDashboardClient } from './AdminDashboardClient';

export const metadata: Metadata = {
  title: 'Engineering Command Center | WTFearB',
  description: 'Internal operations, live telemetry, lead CRM, CMS, and pricing controller.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage(): Promise<React.ReactElement> {
  const [metrics, leads, projects, pricing, siteSettings] = await Promise.all([
    getTelemetryMetrics(),
    getAuditLeads(100),
    getPortfolioProjects(false),
    getPricingConfigs(false),
    getSiteSettings(),
  ]);

  return (
    <AdminDashboardClient
      initialMetrics={metrics}
      initialLeads={leads}
      initialProjects={projects}
      initialPricing={pricing}
      initialSettings={siteSettings}
    />
  );
}
