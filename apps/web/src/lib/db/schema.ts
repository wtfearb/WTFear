/**
 * @file Drizzle ORM Schema Definitions for www.wtfearb.tech
 * @description PostgreSQL tables for visitor sessions, activity events, audit leads, portfolio projects, and pricing configs.
 */

import {
  pgTable,
  text,
  varchar,
  integer,
  timestamp,
  boolean,
  jsonb,
} from 'drizzle-orm/pg-core';
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';

// 1. Visitor Sessions Table
export const visitorSessions = pgTable('visitor_sessions', {
  id: text('id').primaryKey(),
  sessionToken: varchar('session_token', { length: 64 }).notNull().unique(),
  ipHash: varchar('ip_hash', { length: 64 }),
  country: varchar('country', { length: 64 }),
  city: varchar('city', { length: 64 }),
  deviceType: varchar('device_type', { length: 32 }),
  userAgent: text('user_agent'),
  referrer: text('referrer'),
  utmSource: varchar('utm_source', { length: 64 }),
  entryPath: text('entry_path').notNull(),
  lastPath: text('last_path').notNull(),
  pageViewsCount: integer('page_views_count').notNull().default(1),
  startedAt: timestamp('started_at', { withTimezone: true }).notNull().defaultNow(),
  lastSeenAt: timestamp('last_seen_at', { withTimezone: true }).notNull().defaultNow(),
});

// 2. Activity Events Table
export const activityEvents = pgTable('activity_events', {
  id: text('id').primaryKey(),
  sessionId: text('session_id').notNull().references(() => visitorSessions.id, { onDelete: 'cascade' }),
  eventType: varchar('event_type', { length: 64 }).notNull(),
  path: text('path').notNull(),
  targetLabel: text('target_label'),
  payloadJson: jsonb('payload_json'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

// 3. Audit Leads Table
export const auditLeads = pgTable('audit_leads', {
  id: text('id').primaryKey(),
  sessionId: text('session_id'),
  workEmail: varchar('work_email', { length: 255 }).notNull(),
  companyDomain: varchar('company_domain', { length: 255 }),
  targetTimeline: varchar('target_timeline', { length: 64 }).notNull(),
  bottleneckDescription: text('bottleneck_description').notNull(),
  calculatorSnapshotJson: jsonb('calculator_snapshot_json'),
  leadScore: integer('lead_score').notNull().default(0),
  qualificationTier: varchar('qualification_tier', { length: 64 }).notNull(),
  status: varchar('status', { length: 32 }).notNull().default('new'),
  adminNotes: text('admin_notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

// 4. Portfolio Projects Table
export const portfolioProjects = pgTable('portfolio_projects', {
  id: text('id').primaryKey(),
  slug: varchar('slug', { length: 128 }).notNull().unique(),
  indexNumber: integer('index_number').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  industry: varchar('industry', { length: 128 }).notNull(),
  category: varchar('category', { length: 128 }).notNull(),
  summary: text('summary').notNull(),
  problem: text('problem').notNull(),
  solution: text('solution').notNull(),
  architectureNodesJson: jsonb('architecture_nodes_json').notNull(),
  stackTags: jsonb('stack_tags').notNull(),
  keyFeatures: jsonb('key_features').notNull(),
  outcomesSummary: text('outcomes_summary').notNull(),
  liveUrl: text('live_url'),
  repoUrl: text('repo_url'),
  isPublished: boolean('is_published').notNull().default(true),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// 5. Pricing Configs Table
export const pricingConfigs = pgTable('pricing_configs', {
  id: text('id').primaryKey(),
  modelSlug: varchar('model_slug', { length: 64 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  subtitle: text('subtitle').notNull(),
  baseMinUsd: integer('base_min_usd').notNull(),
  baseMaxUsd: integer('base_max_usd').notNull(),
  defaultDurationLabel: varchar('default_duration_label', { length: 64 }).notNull(),
  teamAllocation: text('team_allocation').notNull(),
  deliverables: jsonb('deliverables').notNull(),
  isPublished: boolean('is_published').notNull().default(true),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// TypeScript Inferred Types
export type VisitorSession = InferSelectModel<typeof visitorSessions>;
export type NewVisitorSession = InferInsertModel<typeof visitorSessions>;

export type ActivityEvent = InferSelectModel<typeof activityEvents>;
export type NewActivityEvent = InferInsertModel<typeof activityEvents>;

export type AuditLead = InferSelectModel<typeof auditLeads>;
export type NewAuditLead = InferInsertModel<typeof auditLeads>;

export type PortfolioProject = InferSelectModel<typeof portfolioProjects>;
export type NewPortfolioProject = InferInsertModel<typeof portfolioProjects>;

export type PricingConfig = InferSelectModel<typeof pricingConfigs>;
export type NewPricingConfig = InferInsertModel<typeof pricingConfigs>;
