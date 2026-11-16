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
    this.events.push(item);
    return item;
  }

  getEvents(limit = 100): schema.ActivityEvent[] {
    return [...this.events].reverse().slice(0, limit);
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
      status: lead.status || 'new',
      adminNotes: lead.adminNotes || null,
      createdAt: lead.createdAt ? new Date(lead.createdAt) : new Date(),
    };
    this.leads.push(item);
    return item;
  }

  getLeads(limit = 50): schema.AuditLead[] {
    return [...this.leads].reverse().slice(0, limit);
  }

  // Portfolio operations
  getProjects(publishedOnly = true): schema.PortfolioProject[] {
    const list = publishedOnly ? this.projects.filter((p) => p.isPublished) : this.projects;
    return [...list].sort((a, b) => a.indexNumber - b.indexNumber);
  }

  getProjectBySlug(slug: string): schema.PortfolioProject | undefined {
    return this.projects.find((p) => p.slug === slug);
  }

  // Pricing operations
  getPricing(): schema.PricingConfig[] {
    return this.pricing.filter((p) => p.isPublished);
  }

  // Settings
  getSettings(): SiteSettings {
    return { ...this.settings };
  }

  updateSettings(patch: Partial<SiteSettings>): SiteSettings {
    this.settings = { ...this.settings, ...patch };
    return { ...this.settings };
  }
}

// Global in-memory singleton for build-safe operations
const memoryStore = new InMemoryDatabase();

// ============================================================================
// HIGH-LEVEL REPOSITORY API (Auto-switches between Neon Postgres and In-Memory)
// ============================================================================

export async function getPortfolioProjects(publishedOnly = true): Promise<schema.PortfolioProject[]> {
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

export async function getPricingConfigs(): Promise<schema.PricingConfig[]> {
  if (db) {
    try {
      const rows = await db
        .select()
        .from(schema.pricingConfigs)
        .where(eq(schema.pricingConfigs.isPublished, true));
      if (rows && rows.length > 0) return rows;
    } catch (err) {
      console.warn('[DB] Failed to query Neon pricingConfigs, falling back to in-memory store:', err);
    }
  }
  return memoryStore.getPricing();
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

export async function getAuditLeads(limit = 50): Promise<schema.AuditLead[]> {
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

export async function getSiteSettings(): Promise<SiteSettings> {
  return memoryStore.getSettings();
}

export async function setPortfolioDisplayMode(
  mode: 'showcase_10_projects' | 'coming_soon_empty_state'
): Promise<SiteSettings> {
  return memoryStore.updateSettings({ portfolioDisplayMode: mode });
}
