import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { neon } from '@neondatabase/serverless';

// Try loading .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
const rootEnvPath = path.resolve(process.cwd(), '../../.env.local');

if (fs.existsSync(envPath)) {
  process.loadEnvFile(envPath);
} else if (fs.existsSync(rootEnvPath)) {
  process.loadEnvFile(rootEnvPath);
}

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error('DATABASE_URL not found in .env.local');
  process.exit(1);
}

console.log('Using DATABASE_URL:', dbUrl.replace(/:[^:@]+@/, ':***@'));

async function seed() {
  const sql = neon(dbUrl);
  
  // Dynamically import seed data
  const seedModule = await import('../src/lib/seed-data.ts');
  const projects = seedModule.SEED_PORTFOLIO_PROJECTS;
  const pricing = seedModule.SEED_PRICING_CONFIGS;

  console.log(`Inserting ${projects.length} portfolio projects...`);
  for (const p of projects) {
    await sql`
      INSERT INTO portfolio_projects (
        id, slug, index_number, title, industry, category, summary, problem, solution,
        architecture_nodes_json, stack_tags, key_features, outcomes_summary,
        live_url, repo_url, is_published, updated_at
      ) VALUES (
        ${p.id}, ${p.slug}, ${p.indexNumber}, ${p.title}, ${p.industry}, ${p.category},
        ${p.summary}, ${p.problem}, ${p.solution},
        ${JSON.stringify(p.architectureNodesJson)}, ${JSON.stringify(p.stackTags)},
        ${JSON.stringify(p.keyFeatures)}, ${p.outcomesSummary},
        ${p.liveUrl}, ${p.repoUrl}, ${p.isPublished}, ${new Date(p.updatedAt)}
      )
      ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        industry = EXCLUDED.industry,
        category = EXCLUDED.category,
        summary = EXCLUDED.summary,
        problem = EXCLUDED.problem,
        solution = EXCLUDED.solution,
        architecture_nodes_json = EXCLUDED.architecture_nodes_json,
        stack_tags = EXCLUDED.stack_tags,
        key_features = EXCLUDED.key_features,
        outcomes_summary = EXCLUDED.outcomes_summary,
        live_url = EXCLUDED.live_url,
        repo_url = EXCLUDED.repo_url,
        is_published = EXCLUDED.is_published,
        updated_at = EXCLUDED.updated_at
    `;
    console.log(` - Upserted project: [${p.indexNumber}] ${p.slug}`);
  }

  console.log(`Inserting ${pricing.length} pricing configs...`);
  for (const pr of pricing) {
    await sql`
      INSERT INTO pricing_configs (
        id, model_slug, title, subtitle, base_min_usd, base_max_usd,
        default_duration_label, team_allocation, deliverables, is_published, updated_at
      ) VALUES (
        ${pr.id}, ${pr.modelSlug}, ${pr.title}, ${pr.subtitle}, ${pr.baseMinUsd}, ${pr.baseMaxUsd},
        ${pr.defaultDurationLabel}, ${pr.teamAllocation},
        ${JSON.stringify(pr.deliverables)}, ${pr.isPublished}, ${new Date(pr.updatedAt)}
      )
      ON CONFLICT (model_slug) DO UPDATE SET
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        base_min_usd = EXCLUDED.base_min_usd,
        base_max_usd = EXCLUDED.base_max_usd,
        default_duration_label = EXCLUDED.default_duration_label,
        team_allocation = EXCLUDED.team_allocation,
        deliverables = EXCLUDED.deliverables,
        is_published = EXCLUDED.is_published,
        updated_at = EXCLUDED.updated_at
    `;
    console.log(` - Upserted pricing: ${pr.modelSlug}`);
  }

  // Count verify
  const projCount = await sql`SELECT count(*) FROM portfolio_projects`;
  const pricingCount = await sql`SELECT count(*) FROM pricing_configs`;

  console.log('Seed completed successfully!');
  console.log('Neon DB portfolio_projects count:', projCount[0].count);
  console.log('Neon DB pricing_configs count:', pricingCount[0].count);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
