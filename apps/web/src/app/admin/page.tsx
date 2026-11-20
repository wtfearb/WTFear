export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE_NAME, verifyAdminToken } from '@/lib/auth/admin-auth';
import {
  getTelemetryMetrics,
  getAuditLeads,
  getPortfolioProjects,
  getPricingConfigs,
  getSiteSettings,
  ensureDatabaseSeeded,
  checkDatabaseConnection,
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
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const isAuthenticated = await verifyAdminToken(sessionToken);

  if (!isAuthenticated) {
    redirect('/admin/login');
  }

  let metrics;
  let leads: Awaited<ReturnType<typeof getAuditLeads>> = [];
  let projects: Awaited<ReturnType<typeof getPortfolioProjects>> = [];
  let pricing: Awaited<ReturnType<typeof getPricingConfigs>> = [];
  let siteSettings: Awaited<ReturnType<typeof getSiteSettings>>;
  let isLiveDatabase = false;

  try {
    await ensureDatabaseSeeded();
    isLiveDatabase = await checkDatabaseConnection();

    [metrics, leads, projects, pricing, siteSettings] = await Promise.all([
      getTelemetryMetrics(),
      getAuditLeads(100),
      getPortfolioProjects(false),
      getPricingConfigs(false),
      getSiteSettings(),
    ]);
  } catch (err) {
    console.error('[Admin Page Data Fetch Error]', err);
    metrics = await getTelemetryMetrics();
    siteSettings = await getSiteSettings();
  }

  return (
    <AdminDashboardClient
      initialMetrics={metrics}
      initialLeads={leads}
      initialProjects={projects}
      initialPricing={pricing}
      initialSettings={siteSettings}
      isLiveDatabase={isLiveDatabase}
    />
  );
}
