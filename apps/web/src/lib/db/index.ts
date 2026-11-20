/**
 * @file Database Client & Graceful In-Memory Fallback Engine
 * @description Connects to Neon Serverless Postgres via Drizzle ORM when DATABASE_URL is set,
 * or transparently serves pre-populated seed data in-memory when DATABASE_URL is unset (build/preview safe).
 */

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq, desc } from 'drizzle-orm';
import * as schema from './schema';
import {
  SEED_PORTFOLIO_PROJECTS,
  SEED_PRICING_CONFIGS,
  DEFAULT_SITE_SETTINGS,
  type SiteSettings,
} from '../seed-data';

// Determine if live database credentials exist
const databaseUrl = process.env.DATABASE_URL?.trim();
export const isDatabaseConfigured = Boolean(databaseUrl && databaseUrl.length > 0);

// Initialize Drizzle client if DATABASE_URL is present
const neonSql = isDatabaseConfigured ? neon(databaseUrl!) : null;
export const db = neonSql ? drizzle(neonSql, { schema }) : null;

export interface EnrichedActivityEvent extends schema.ActivityEvent {
  country?: string;
  city?: string;
  deviceType?: string;
}

export interface TelemetryMetrics {
  totalSessions: number;
  totalPageViews: number;
  totalSandboxRuns: number;
  totalCalculatorInteractions: number;
  totalAuditSubmissions: number;
  recentEvents: EnrichedActivityEvent[];
  topViewedPages: { path: string; count: number }[];
  topInspectedItems: { label: string; count: number }[];
  topCalculatorConfigs: { label: string; count: number }[];
}

// ============================================================================
// IN-MEMORY FALLBACK STORE (Active during local builds, preview branches, and offline dev)
// ============================================================================
class InMemoryDatabase {
  private sessions = new Map<string, schema.VisitorSession>();
  private events: schema.ActivityEvent[] = [];
  private leads: schema.AuditLead[] = [];
  private projects: schema.PortfolioProject[] = [];
  private pricing: schema.PricingConfig[] = [];
  private settings: SiteSettings = { ...DEFAULT_SITE_SETTINGS };

  constructor() {
    this.seed();
  }

  private seed() {
    // Populate portfolio projects from seed data
    this.projects = SEED_PORTFOLIO_PROJECTS.map((p) => ({
      id: p.id,
      slug: p.slug,
      indexNumber: p.indexNumber,
      title: p.title,
      industry: p.industry,
      category: p.category,
      summary: p.summary,
      problem: p.problem,
      solution: p.solution,
      architectureNodesJson: p.architectureNodesJson as unknown,
      stackTags: p.stackTags as unknown,
      keyFeatures: p.keyFeatures as unknown,
      outcomesSummary: p.outcomesSummary,
      liveUrl: p.liveUrl,
      repoUrl: p.repoUrl,
      isPublished: p.isPublished,
      updatedAt: new Date(p.updatedAt),
    }));

    // Populate pricing configs from seed data
    this.pricing = SEED_PRICING_CONFIGS.map((pr) => ({
      id: pr.id,
      modelSlug: pr.modelSlug,
      title: pr.title,
      subtitle: pr.subtitle,
      baseMinUsd: pr.baseMinUsd,
      baseMaxUsd: pr.baseMaxUsd,
      defaultDurationLabel: pr.defaultDurationLabel,
      teamAllocation: pr.teamAllocation,
      deliverables: pr.deliverables as unknown,
      isPublished: pr.isPublished,
      updatedAt: new Date(pr.updatedAt),
    }));

    // Seed realistic sample sessions & telemetry events for instant preview visualization
    const sampleSessions: schema.VisitorSession[] = [
      {
        id: 'sess_us_sf_01',
        sessionToken: 'tok_sf_enterprise_982',
        ipHash: 'e3b0c44298fc1c149afbf4c8996fb924',
        country: 'United States',
        city: 'San Francisco, CA',
        deviceType: 'desktop',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        referrer: 'https://news.ycombinator.com',
        utmSource: 'hackernews',
        entryPath: '/',
        lastPath: '/blueprints/ai-triage',
        pageViewsCount: 4,
        startedAt: new Date(Date.now() - 42 * 60 * 1000),
        lastSeenAt: new Date(Date.now() - 3 * 60 * 1000),
      },
      {
        id: 'sess_uk_lon_02',
        sessionToken: 'tok_lon_fintech_419',
        ipHash: '5e884898da28047151d0e56f8dc62927',
        country: 'United Kingdom',
        city: 'London',
        deviceType: 'desktop',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        referrer: 'https://github.com/wtfearb',
        utmSource: 'github',
        entryPath: '/projects',
        lastPath: '/audit',
        pageViewsCount: 6,
        startedAt: new Date(Date.now() - 110 * 60 * 1000),
        lastSeenAt: new Date(Date.now() - 8 * 60 * 1000),
      },
      {
        id: 'sess_de_ber_03',
        sessionToken: 'tok_ber_infra_112',
        ipHash: '4b227777d4dd1fc61c6f884f48641d02',
        country: 'Germany',
        city: 'Berlin',
        deviceType: 'mobile',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X)',
        referrer: 'https://twitter.com',
        utmSource: 'twitter',
        entryPath: '/',
        lastPath: '/#pricing',
        pageViewsCount: 3,
        startedAt: new Date(Date.now() - 180 * 60 * 1000),
        lastSeenAt: new Date(Date.now() - 25 * 60 * 1000),
      },
    ];

    for (const s of sampleSessions) {
      this.sessions.set(s.sessionToken, s);
    }

    this.events = [
      {
        id: 'evt_01',
        sessionId: 'sess_us_sf_01',
        eventType: 'page_view',
        path: '/',
        targetLabel: 'Homepage Monograph',
        payloadJson: { referrer: 'https://news.ycombinator.com' },
        createdAt: new Date(Date.now() - 42 * 60 * 1000),
      },
      {
        id: 'evt_02',
        sessionId: 'sess_us_sf_01',
        eventType: 'sandbox_change',
        path: '/#sandbox',
        targetLabel: 'Confidence: 0.88, Grounding: 0.82',
        payloadJson: { confidenceThreshold: 0.88, groundingScore: 0.82, status: 'RESOLVED_AUTONOMOUSLY' },
        createdAt: new Date(Date.now() - 35 * 60 * 1000),
      },
      {
        id: 'evt_03',
        sessionId: 'sess_us_sf_01',
        eventType: 'blueprint_inspect',
        path: '/blueprints/ai-triage',
        targetLabel: 'Governed Support & Ops Triage Agent',
        payloadJson: { blueprintId: 'ai-triage', category: 'AI AGENTS' },
        createdAt: new Date(Date.now() - 15 * 60 * 1000),
      },
      {
        id: 'evt_04',
        sessionId: 'sess_uk_lon_02',
        eventType: 'calculator_change',
        path: '/#pricing',
        targetLabel: 'Model: sprint, Complexity: governed_ai',
        payloadJson: { model: 'sprint', complexity: 'governed_ai', evalHarness: true, estimatedUsd: 8300 },
        createdAt: new Date(Date.now() - 22 * 60 * 1000),
      },
      {
        id: 'evt_05',
        sessionId: 'sess_uk_lon_02',
        eventType: 'project_click',
        path: '/projects/sentinel-rag-triage',
        targetLabel: 'Sentinel RAG Triage Engine',
        payloadJson: { slug: 'sentinel-rag-triage', industry: 'Enterprise SaaS' },
        createdAt: new Date(Date.now() - 12 * 60 * 1000),
      },
      {
        id: 'evt_06',
        sessionId: 'sess_uk_lon_02',
        eventType: 'audit_submit',
        path: '/audit',
        targetLabel: '15-Min Architecture Audit',
        payloadJson: { workEmail: 'alex.vane@apexfintech.co.uk', timeline: '2-week-sprint' },
        createdAt: new Date(Date.now() - 8 * 60 * 1000),
      },
    ];

    // Seed sample audit leads
    this.leads = [
      {
        id: 'lead_seed_01',
        sessionId: 'sess_uk_lon_02',
        workEmail: 'alex.vane@apexfintech.co.uk',
        companyDomain: 'apexfintech.co.uk',
        targetTimeline: '2-week-sprint',
        bottleneckDescription: 'Multi-tenant RAG pipeline hallucinates fee structures when processing cross-border FX contracts; need deterministic Pydantic citation gates and pgvector HNSW hybrid search.',
        calculatorSnapshotJson: {
          model: 'sprint',
          complexity: 'governed_ai',
          includeEvalHarness: true,
          priceRangeUsd: { min: 6500, max: 8500 },
        },
        leadScore: 92,
        qualificationTier: 'HIGH_INTENT',
        status: 'NEW',
        adminNotes: 'High-intent lead. SOW candidate for upcoming Monday sprint slot.',
        createdAt: new Date(Date.now() - 8 * 60 * 1000),
      },
      {
        id: 'lead_seed_02',
        sessionId: 'sess_us_sf_01',
        workEmail: 'cto@nexuslogistics.io',
        companyDomain: 'nexuslogistics.io',
        targetTimeline: '4-week-mvp',
        bottleneckDescription: 'Need a sub-15ms edge webhook ingestion spine with Redis Streams and automated DLQ replay to replace legacy Zapier pipeline.',
        calculatorSnapshotJson: {
          model: 'mvp',
          complexity: 'distributed',
          includeEvalHarness: true,
          priceRangeUsd: { min: 14000, max: 24000 },
        },
        leadScore: 85,
        qualificationTier: 'TIER_1',
        status: 'REVIEWED',
        adminNotes: 'Reviewed architecture monograph. Emailed calendar invite.',
        createdAt: new Date(Date.now() - 36 * 60 * 1000),
      },
    ];
  }

  // Session operations
  upsertSession(data: schema.NewVisitorSession): schema.VisitorSession {
    const existing = this.sessions.get(data.sessionToken);
    const now = new Date();

    if (existing) {
      const updated: schema.VisitorSession = {
        ...existing,
        lastPath: data.lastPath,
        pageViewsCount: existing.pageViewsCount + 1,
        lastSeenAt: now,
        country: data.country || existing.country,
        city: data.city || existing.city,
        deviceType: data.deviceType || existing.deviceType,
        userAgent: data.userAgent || existing.userAgent,
      };
      this.sessions.set(data.sessionToken, updated);
      return updated;
    }

    const created: schema.VisitorSession = {
      id: data.id || crypto.randomUUID(),
      sessionToken: data.sessionToken,
      ipHash: data.ipHash || null,
      country: data.country || null,
      city: data.city || null,
      deviceType: data.deviceType || null,
      userAgent: data.userAgent || null,
      referrer: data.referrer || null,
      utmSource: data.utmSource || null,
      entryPath: data.entryPath,
      lastPath: data.lastPath,
      pageViewsCount: data.pageViewsCount ?? 1,
      startedAt: data.startedAt ? new Date(data.startedAt) : now,
      lastSeenAt: data.lastSeenAt ? new Date(data.lastSeenAt) : now,
    };
    this.sessions.set(data.sessionToken, created);
    return created;
  }

  getSession(token: string): schema.VisitorSession | undefined {
    return this.sessions.get(token);
  }

  getSessions(limit = 100): schema.VisitorSession[] {
    return Array.from(this.sessions.values())
      .sort((a, b) => b.lastSeenAt.getTime() - a.lastSeenAt.getTime())
      .slice(0, limit);
  }

  // Event operations
  recordEvent(event: schema.NewActivityEvent): schema.ActivityEvent {
    const item: schema.ActivityEvent = {
      id: event.id || crypto.randomUUID(),
      sessionId: event.sessionId,
      eventType: event.eventType,
      path: event.path,
      targetLabel: event.targetLabel || null,
      payloadJson: event.payloadJson ?? null,
      createdAt: event.createdAt ? new Date(event.createdAt) : new Date(),
    };
    this.events.unshift(item);
    return item;
  }

  getEvents(limit = 100): EnrichedActivityEvent[] {
    return this.events.slice(0, limit).map((evt) => {
      const session =
        this.sessions.get(evt.sessionId) ||
        Array.from(this.sessions.values()).find((s) => s.id === evt.sessionId);
      return {
        ...evt,
        country: session?.country || undefined,
        city: session?.city || undefined,
        deviceType: session?.deviceType || undefined,
      };
    });
  }

  // Lead operations
  createLead(lead: schema.NewAuditLead): schema.AuditLead {
    const item: schema.AuditLead = {
      id: lead.id || crypto.randomUUID(),
      sessionId: lead.sessionId || null,
      workEmail: lead.workEmail,
      companyDomain: lead.companyDomain || null,
      targetTimeline: lead.targetTimeline,
      bottleneckDescription: lead.bottleneckDescription,
      calculatorSnapshotJson: lead.calculatorSnapshotJson ?? null,
      leadScore: lead.leadScore ?? 0,
      qualificationTier: lead.qualificationTier,
      status: lead.status || 'NEW',
      adminNotes: lead.adminNotes || null,
      createdAt: lead.createdAt ? new Date(lead.createdAt) : new Date(),
    };
    this.leads.unshift(item);
    return item;
  }

  getLeads(limit = 100): schema.AuditLead[] {
    return [...this.leads].slice(0, limit);
  }

  updateLead(id: string, patch: { status?: string; adminNotes?: string }): schema.AuditLead | null {
    const lead = this.leads.find((l) => l.id === id);
    if (!lead) return null;
    if (patch.status !== undefined) lead.status = patch.status;
    if (patch.adminNotes !== undefined) lead.adminNotes = patch.adminNotes;
    return lead;
  }

  deleteLead(id: string): boolean {
    const idx = this.leads.findIndex((l) => l.id === id);
    if (idx >= 0) {
      this.leads.splice(idx, 1);
      return true;
    }
    return false;
  }

  // Portfolio operations
  getProjects(publishedOnly = true): schema.PortfolioProject[] {
    const list = publishedOnly ? this.projects.filter((p) => p.isPublished) : this.projects;
    return [...list].sort((a, b) => a.indexNumber - b.indexNumber);
  }

  getProjectBySlug(slug: string): schema.PortfolioProject | undefined {
    return this.projects.find((p) => p.slug === slug);
  }

  upsertProject(p: schema.NewPortfolioProject): schema.PortfolioProject {
    const existingIdx = this.projects.findIndex(
      (proj) => (p.id && proj.id === p.id) || proj.slug === p.slug
    );
    const item: schema.PortfolioProject = {
      id: p.id || crypto.randomUUID(),
      slug: p.slug,
      indexNumber: p.indexNumber ?? this.projects.length + 1,
      title: p.title,
      industry: p.industry,
      category: p.category,
      summary: p.summary,
      problem: p.problem,
      solution: p.solution,
      architectureNodesJson: p.architectureNodesJson,
      stackTags: p.stackTags,
      keyFeatures: p.keyFeatures,
      outcomesSummary: p.outcomesSummary,
      liveUrl: p.liveUrl ?? null,
      repoUrl: p.repoUrl ?? null,
      isPublished: p.isPublished ?? true,
      updatedAt: new Date(),
    };
    if (existingIdx >= 0) {
      this.projects[existingIdx] = item;
    } else {
      this.projects.push(item);
    }
    return item;
  }

  deleteProject(id: string): boolean {
    const idx = this.projects.findIndex((p) => p.id === id);
    if (idx >= 0) {
      this.projects.splice(idx, 1);
      return true;
    }
    return false;
  }

  // Pricing operations
  getPricing(publishedOnly = true): schema.PricingConfig[] {
    return publishedOnly ? this.pricing.filter((p) => p.isPublished) : this.pricing;
  }

  updatePricing(modelSlug: string, patch: Partial<schema.PricingConfig>): schema.PricingConfig | null {
    const item = this.pricing.find((pr) => pr.modelSlug === modelSlug);
    if (!item) return null;
    Object.assign(item, patch, { updatedAt: new Date() });
    return item;
  }

  // Settings
  getSettings(): SiteSettings {
    return { ...this.settings };
  }

  updateSettings(patch: Partial<SiteSettings>): SiteSettings {
    this.settings = { ...this.settings, ...patch };
    return { ...this.settings };
  }

  getMetrics(): TelemetryMetrics {
    const totalSessions = Math.max(this.sessions.size, 1);
    let totalPageViews = 0;
    for (const s of this.sessions.values()) {
      totalPageViews += s.pageViewsCount;
    }

    let totalSandboxRuns = 0;
    let totalCalculatorInteractions = 0;
    let totalAuditSubmissions = this.leads.length;

    const pageCountMap = new Map<string, number>();
    const labelCountMap = new Map<string, number>();
    const calcCountMap = new Map<string, number>();

    for (const evt of this.events) {
      if (evt.eventType === 'sandbox_change') totalSandboxRuns++;
      if (evt.eventType === 'calculator_change') {
        totalCalculatorInteractions++;
        if (evt.targetLabel) {
          calcCountMap.set(evt.targetLabel, (calcCountMap.get(evt.targetLabel) || 0) + 1);
        }
      }
      if (evt.eventType === 'audit_submit') totalAuditSubmissions++;

      if (evt.path) {
        pageCountMap.set(evt.path, (pageCountMap.get(evt.path) || 0) + 1);
      }
      if (evt.targetLabel) {
        labelCountMap.set(evt.targetLabel, (labelCountMap.get(evt.targetLabel) || 0) + 1);
      }
    }

    const topViewedPages = Array.from(pageCountMap.entries())
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const topInspectedItems = Array.from(labelCountMap.entries())
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const topCalculatorConfigs = Array.from(calcCountMap.entries())
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      totalSessions,
      totalPageViews: Math.max(totalPageViews, totalSessions),
      totalSandboxRuns,
      totalCalculatorInteractions,
      totalAuditSubmissions,
      recentEvents: this.getEvents(50),
      topViewedPages,
      topInspectedItems,
      topCalculatorConfigs,
    };
  }
}

// Global in-memory singleton for build-safe operations
const memoryStore = new InMemoryDatabase();

// ============================================================================
// IDEMPOTENT NEON POSTGRES AUTO-SEED ENGINE
// ============================================================================
let isSeededPromise: Promise<void> | null = null;

export async function ensureDatabaseSeeded(): Promise<void> {
  if (isSeededPromise) return isSeededPromise;

  isSeededPromise = (async () => {
    if (!db) return;

    try {
      // 1. Check & seed portfolio projects
      const existingProjects = await db
        .select({ id: schema.portfolioProjects.id })
        .from(schema.portfolioProjects)
        .limit(1);

      if (existingProjects.length === 0) {
        console.log('[DB] Seeding 10 Flagship Portfolio Projects to Neon DB...');
        for (const p of SEED_PORTFOLIO_PROJECTS) {
          await db
            .insert(schema.portfolioProjects)
            .values({
              id: p.id,
              slug: p.slug,
              indexNumber: p.indexNumber,
              title: p.title,
              industry: p.industry,
              category: p.category,
              summary: p.summary,
              problem: p.problem,
              solution: p.solution,
              architectureNodesJson: p.architectureNodesJson as unknown,
              stackTags: p.stackTags as unknown,
              keyFeatures: p.keyFeatures as unknown,
              outcomesSummary: p.outcomesSummary,
              liveUrl: p.liveUrl,
              repoUrl: p.repoUrl,
              isPublished: p.isPublished,
              updatedAt: new Date(p.updatedAt),
            })
            .onConflictDoNothing();
        }
      }

      // 2. Check & seed pricing configs
      const existingPricing = await db
        .select({ id: schema.pricingConfigs.id })
        .from(schema.pricingConfigs)
        .limit(1);

      if (existingPricing.length === 0) {
        console.log('[DB] Seeding Pricing Configs to Neon DB...');
        for (const pr of SEED_PRICING_CONFIGS) {
          await db
            .insert(schema.pricingConfigs)
            .values({
              id: pr.id,
              modelSlug: pr.modelSlug,
              title: pr.title,
              subtitle: pr.subtitle,
              baseMinUsd: pr.baseMinUsd,
              baseMaxUsd: pr.baseMaxUsd,
              defaultDurationLabel: pr.defaultDurationLabel,
              teamAllocation: pr.teamAllocation,
              deliverables: pr.deliverables as unknown,
              isPublished: pr.isPublished,
              updatedAt: new Date(pr.updatedAt),
            })
            .onConflictDoNothing();
        }
      }
    } catch (err) {
      console.warn('[DB] ensureDatabaseSeeded encountered error (using memory store fallback):', err);
    }
  })();

  return isSeededPromise;
}

export async function checkDatabaseConnection(): Promise<boolean> {
  if (!db) return false;
  try {
    await db.select({ id: schema.portfolioProjects.id }).from(schema.portfolioProjects).limit(1);
    return true;
  } catch {
    return false;
  }
}

// ============================================================================
// HIGH-LEVEL REPOSITORY API (Auto-switches between Neon Postgres and In-Memory)
// ============================================================================

export async function getPortfolioProjects(publishedOnly = true): Promise<schema.PortfolioProject[]> {
  await ensureDatabaseSeeded();
  if (db) {
    try {
      const query = publishedOnly
        ? db.select().from(schema.portfolioProjects).where(eq(schema.portfolioProjects.isPublished, true))
        : db.select().from(schema.portfolioProjects);
      const rows = await query;
      if (rows && rows.length > 0) {
        return rows.sort((a, b) => a.indexNumber - b.indexNumber);
      }
    } catch (err) {
      console.warn('[DB] Failed to query Neon portfolioProjects, falling back to in-memory store:', err);
    }
  }
  return memoryStore.getProjects(publishedOnly);
}

export async function getPortfolioProjectBySlug(slug: string): Promise<schema.PortfolioProject | null> {
  await ensureDatabaseSeeded();
  if (db) {
    try {
      const rows = await db
        .select()
        .from(schema.portfolioProjects)
        .where(eq(schema.portfolioProjects.slug, slug))
        .limit(1);
      if (rows.length > 0) return rows[0];
    } catch (err) {
      console.warn(`[DB] Failed to query project slug "${slug}", falling back to in-memory:`, err);
    }
  }
  return memoryStore.getProjectBySlug(slug) || null;
}

export async function upsertPortfolioProject(
  project: schema.NewPortfolioProject
): Promise<schema.PortfolioProject> {
  if (db) {
    try {
      const existing = await db
        .select()
        .from(schema.portfolioProjects)
        .where(eq(schema.portfolioProjects.slug, project.slug))
        .limit(1);

      if (existing.length > 0) {
        const [updated] = await db
          .update(schema.portfolioProjects)
          .set({
            ...project,
            updatedAt: new Date(),
          })
          .where(eq(schema.portfolioProjects.slug, project.slug))
          .returning();
        memoryStore.upsertProject(project);
        return updated;
      }

      const [created] = await db
        .insert(schema.portfolioProjects)
        .values({
          ...project,
          id: project.id || crypto.randomUUID(),
          updatedAt: new Date(),
        })
        .returning();
      memoryStore.upsertProject(project);
      return created;
    } catch (err) {
      console.warn('[DB] Failed to upsert project to Neon, using memory store fallback:', err);
    }
  }
  return memoryStore.upsertProject(project);
}

export async function deletePortfolioProject(id: string): Promise<boolean> {
  if (db) {
    try {
      await db.delete(schema.portfolioProjects).where(eq(schema.portfolioProjects.id, id));
    } catch (err) {
      console.warn('[DB] Failed to delete project from Neon:', err);
    }
  }
  return memoryStore.deleteProject(id);
}

export async function getPricingConfigs(publishedOnly = true): Promise<schema.PricingConfig[]> {
  await ensureDatabaseSeeded();
  if (db) {
    try {
      const query = publishedOnly
        ? db.select().from(schema.pricingConfigs).where(eq(schema.pricingConfigs.isPublished, true))
        : db.select().from(schema.pricingConfigs);
      const rows = await query;
      if (rows && rows.length > 0) return rows;
    } catch (err) {
      console.warn('[DB] Failed to query Neon pricingConfigs, falling back to in-memory store:', err);
    }
  }
  return memoryStore.getPricing(publishedOnly);
}

export async function updatePricingConfig(
  modelSlug: string,
  patch: Partial<schema.PricingConfig>
): Promise<schema.PricingConfig | null> {
  if (db) {
    try {
      const [updated] = await db
        .update(schema.pricingConfigs)
        .set({
          ...patch,
          updatedAt: new Date(),
        })
        .where(eq(schema.pricingConfigs.modelSlug, modelSlug))
        .returning();
      memoryStore.updatePricing(modelSlug, patch);
      return updated || null;
    } catch (err) {
      console.warn('[DB] Failed to update pricing config in Neon, using memory store fallback:', err);
    }
  }
  return memoryStore.updatePricing(modelSlug, patch);
}

export async function upsertVisitorSession(
  session: schema.NewVisitorSession
): Promise<schema.VisitorSession> {
  if (db) {
    try {
      const existing = await db
        .select()
        .from(schema.visitorSessions)
        .where(eq(schema.visitorSessions.sessionToken, session.sessionToken))
        .limit(1);

      if (existing.length > 0) {
        const [updated] = await db
          .update(schema.visitorSessions)
          .set({
            lastPath: session.lastPath,
            pageViewsCount: existing[0].pageViewsCount + 1,
            lastSeenAt: new Date(),
            country: session.country || existing[0].country,
            city: session.city || existing[0].city,
            deviceType: session.deviceType || existing[0].deviceType,
            userAgent: session.userAgent || existing[0].userAgent,
          })
          .where(eq(schema.visitorSessions.sessionToken, session.sessionToken))
          .returning();
        return updated;
      }

      const [created] = await db
        .insert(schema.visitorSessions)
        .values({
          ...session,
          id: session.id || crypto.randomUUID(),
          pageViewsCount: 1,
          startedAt: new Date(),
          lastSeenAt: new Date(),
        })
        .returning();
      return created;
    } catch (err) {
      console.warn('[DB] Failed to upsert session to Neon, using memory store fallback:', err);
    }
  }
  return memoryStore.upsertSession(session);
}

export async function getVisitorSessions(limit = 100): Promise<schema.VisitorSession[]> {
  if (db) {
    try {
      return await db
        .select()
        .from(schema.visitorSessions)
        .orderBy(desc(schema.visitorSessions.lastSeenAt))
        .limit(limit);
    } catch (err) {
      console.warn('[DB] Failed to fetch visitor sessions from Neon:', err);
    }
  }
  return memoryStore.getSessions(limit);
}

export async function recordActivityEvent(
  event: schema.NewActivityEvent
): Promise<schema.ActivityEvent> {
  if (db) {
    try {
      const [created] = await db
        .insert(schema.activityEvents)
        .values({
          ...event,
          id: event.id || crypto.randomUUID(),
          createdAt: new Date(),
        })
        .returning();
      return created;
    } catch (err) {
      console.warn('[DB] Failed to insert activity event to Neon, using memory store fallback:', err);
    }
  }
  return memoryStore.recordEvent(event);
}

export async function getActivityEvents(limit = 100): Promise<EnrichedActivityEvent[]> {
  return memoryStore.getEvents(limit);
}

export async function getTelemetryMetrics(): Promise<TelemetryMetrics> {
  return memoryStore.getMetrics();
}

export async function createAuditLead(lead: schema.NewAuditLead): Promise<schema.AuditLead> {
  if (db) {
    try {
      const [created] = await db
        .insert(schema.auditLeads)
        .values({
          ...lead,
          id: lead.id || crypto.randomUUID(),
          createdAt: new Date(),
        })
        .returning();
      return created;
    } catch (err) {
      console.warn('[DB] Failed to persist audit lead to Neon, using memory store fallback:', err);
    }
  }
  return memoryStore.createLead(lead);
}

export async function getAuditLeads(limit = 100): Promise<schema.AuditLead[]> {
  if (db) {
    try {
      return await db
        .select()
        .from(schema.auditLeads)
        .orderBy(desc(schema.auditLeads.createdAt))
        .limit(limit);
    } catch (err) {
      console.warn('[DB] Failed to fetch audit leads from Neon:', err);
    }
  }
  return memoryStore.getLeads(limit);
}

export async function updateAuditLead(
  id: string,
  patch: { status?: string; adminNotes?: string }
): Promise<schema.AuditLead | null> {
  if (db) {
    try {
      const [updated] = await db
        .update(schema.auditLeads)
        .set(patch)
        .where(eq(schema.auditLeads.id, id))
        .returning();
      memoryStore.updateLead(id, patch);
      return updated || null;
    } catch (err) {
      console.warn('[DB] Failed to update audit lead in Neon, using memory store fallback:', err);
    }
  }
  return memoryStore.updateLead(id, patch);
}

export async function deleteAuditLead(id: string): Promise<boolean> {
  if (db) {
    try {
      await db.delete(schema.auditLeads).where(eq(schema.auditLeads.id, id));
    } catch (err) {
      console.warn('[DB] Failed to delete audit lead in Neon:', err);
    }
  }
  return memoryStore.deleteLead(id);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return memoryStore.getSettings();
}

export async function updateSiteSettings(patch: Partial<SiteSettings>): Promise<SiteSettings> {
  return memoryStore.updateSettings(patch);
}

export async function setPortfolioDisplayMode(
  mode: 'showcase_10_projects' | 'coming_soon_empty_state'
): Promise<SiteSettings> {
  return memoryStore.updateSettings({ portfolioDisplayMode: mode });
}
