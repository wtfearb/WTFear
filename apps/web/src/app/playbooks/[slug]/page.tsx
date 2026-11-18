import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SITE_URL } from '@/lib/site-config';

interface PlaybookData {
  readonly slug: string;
  readonly title: string;
  readonly metaDescription: string;
  readonly summary: string;
  readonly targetLatency: string;
  readonly definitionLead: string;
  readonly sections: readonly {
    readonly heading: string;
    readonly content: string;
    readonly codeSnippet?: string;
  }[];
}

const PLAYBOOKS: Record<string, PlaybookData> = {
  'governed-rag-evaluation-harness': {
    slug: 'governed-rag-evaluation-harness',
    title: 'Playbook: Eliminating Hallucinations in Production RAG with Pydantic v2 & Golden Evals',
    metaDescription: 'Step-by-step engineering playbook for building deterministic RAG governance, Reciprocal Rank Fusion, and CI-blocking 50-case evaluation suites.',
    summary: 'A principal engineer guide to building zero-hallucination agentic retrieval systems in Python 3.12, FastAPI, and PostgreSQL 16.',
    targetLatency: 'Retriever < 45ms, Orchestrator < 1,400ms',
    definitionLead: 'A Governed RAG Evaluation Harness is a CI/CD-blocking testing architecture that enforces 100% citation precision and cosine similarity >= 0.85 across a deterministic suite of golden test cases before production deployment.',
    sections: [
      {
        heading: '1. The Root Cause of Production RAG Failures',
        content:
          'Most production RAG systems fail because they treat LLMs as deterministic compute engines rather than probabilistic pattern matchers. Without strict schema validation at both ingress and egress, models hallucinate parameters, invent citations, or attempt to resolve out-of-domain edge cases autonomously.',
      },
      {
        heading: '2. Enforcing Strict Egress Citations with Pydantic v2',
        content:
          'By leveraging Pydantic v2 model validators, any response marked as RESOLVED_AUTONOMOUSLY is checked against the set of retrieved chunk IDs. If the model cites zero chunks, or cites a chunk ID not present in the retrieval payload, the validator rejects the response and reroutes to human triage.',
        codeSnippet: `@model_validator(mode="after")
def verify_autonomous_citations(self) -> Self:
    if self.status == AgentStatus.RESOLVED_AUTONOMOUSLY:
        if not self.cited_chunk_ids:
            raise ValueError("RESOLVED_AUTONOMOUSLY requires at least 1 verified citation")
        if self.confidence_score < 0.82 or self.grounding_score < 0.78:
            raise ValueError("Confidence or grounding below minimum threshold")
    return self`,
      },
      {
        heading: '3. CI-Blocking Golden Evaluation Harness',
        content:
          'Do not rely on ad-hoc manual testing. Curate 50 historical edge cases spanning high-grounding requests, adversarial prompt injections, and borderline ambiguity cases. Execute this suite in GitHub Actions using Astral uv to fail any PR that degrades citation precision below 100%.',
      },
    ],
  },
  'postgres-rls-pgvector-hybrid-search': {
    slug: 'postgres-rls-pgvector-hybrid-search',
    title: 'Playbook: PostgreSQL 16 RLS + pgvector HNSW Hybrid BM25 Search',
    metaDescription: 'Complete tutorial and SQL reference for pgvector HNSW + ParadeDB BM25 (pg_search) / Lexical FTS (ts_rank_cd) RRF in PostgreSQL 16 with Row-Level Security.',
    summary: 'Architecting single-query multi-tenant hybrid search without external vector database dependencies or synchronization drift.',
    targetLatency: 'p95 query latency < 45ms across 1M chunks',
    definitionLead: 'PostgreSQL 16 Hybrid Search combines pgvector HNSW cosine distance with ParadeDB BM25 (pg_search) / Lexical FTS (ts_rank_cd) RRF inside a single transaction secured by Row-Level Security (RLS).',
    sections: [
      {
        heading: '1. Why Co-Locating Vectors in PostgreSQL Prevents State Drift',
        content:
          'External vector databases introduce synchronization lag, split-brain consistency bugs, and duplicate access control implementations. By keeping vector embeddings in PostgreSQL 16 alongside relational tenant records, Row-Level Security automatically guarantees that an organization can never retrieve chunks outside its security perimeter.',
      },
      {
        heading: '2. Production HNSW & GIN Index Provisioning',
        content:
          'Provision an HNSW index with m = 16 and ef_construction = 64 for sub-45ms cosine distance searches (<=>), paired with a STORED tsvector column and GIN index for lexical search.',
        codeSnippet: `CREATE INDEX idx_knowledge_chunks_hnsw 
    ON knowledge_chunks USING hnsw (embedding vector_cosine_ops)
    WITH (m = 16, ef_construction = 64);

CREATE INDEX idx_knowledge_chunks_tsv 
    ON knowledge_chunks USING gin (search_tsv);`,
      },
      {
        heading: '3. Reciprocal Rank Fusion (RRF) SQL Query',
        content:
          'Execute both vector and text searches in CTEs with a 60-rank constant, combining dense semantic search with exact keyword matching in a single network round-trip.',
      },
    ],
  },
};

export function generateStaticParams(): { slug: string }[] {
  return Object.keys(PLAYBOOKS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const playbook = PLAYBOOKS[slug];
  if (!playbook) return {};

  return {
    title: playbook.title,
    description: playbook.metaDescription,
    alternates: {
      canonical: `${SITE_URL}/playbooks/${slug}`,
    },
    openGraph: {
      title: playbook.title,
      description: playbook.metaDescription,
      url: `${SITE_URL}/playbooks/${slug}`,
      siteName: 'wtfear — Product & AI Engineering Studio',
      type: 'article',
    },
  };
}

export default async function PlaybookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const playbook = PLAYBOOKS[slug];

  if (!playbook) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: playbook.title,
    description: playbook.definitionLead,
    abstract: playbook.metaDescription,
    url: `${SITE_URL}/playbooks/${slug}`,
  };

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-canvas)] text-[var(--color-ink-primary)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main className="flex-1 py-12 md:py-20">
        <div className="mx-auto max-w-[var(--max-w-editorial)] px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 font-mono text-xs text-[var(--color-ink-muted)]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[var(--color-ink-primary)]">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/playbooks" className="hover:text-[var(--color-ink-primary)]">Playbooks</Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--color-ink-primary)] font-bold">{playbook.slug}</span>
          </nav>

          <div className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent-signal)] font-bold mb-2">
            ENGINEERING PLAYBOOK // {playbook.targetLatency}
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--color-ink-primary)] max-w-4xl">
            {playbook.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[var(--color-ink-secondary)] max-w-3xl leading-relaxed">
            {playbook.summary}
          </p>

          <div className="mt-12 space-y-10 max-w-4xl">
            {playbook.sections.map((sec, idx) => (
              <section key={idx} className="border border-[var(--color-border-hairline)] bg-[var(--color-surface-elevated)] p-6 sm:p-8 space-y-4">
                <h2 className="text-xl font-bold text-[var(--color-ink-primary)]">
                  {sec.heading}
                </h2>
                <p className="text-sm text-[var(--color-ink-secondary)] leading-relaxed">
                  {sec.content}
                </p>
                {sec.codeSnippet && (
                  <pre className="p-4 bg-[var(--color-terminal-bg)] text-[var(--color-terminal-fg)] font-mono text-xs overflow-x-auto border border-[var(--color-terminal-border)]">
                    <code>{sec.codeSnippet}</code>
                  </pre>
                )}
              </section>
            ))}
          </div>

          <div className="mt-12 p-8 border-2 border-[var(--color-ink-primary)] bg-[var(--color-surface-elevated)] flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl">
            <div>
              <h3 className="text-xl font-bold text-[var(--color-ink-primary)]">
                Need to implement this architecture in your codebase?
              </h3>
              <p className="font-mono text-xs text-[var(--color-ink-muted)] mt-1">
                We ship this exact system in a deterministic 2-week rapid engineering sprint.
              </p>
            </div>
            <Link
              href="/#pricing"
              className="inline-flex items-center justify-center bg-[var(--color-accent-signal)] text-white px-6 py-3 font-mono text-xs font-semibold hover:bg-[var(--color-accent-signal-hover)] transition-colors"
            >
              CALCULATE SPRINT SCOPE &rarr;
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
