import React from 'react';

interface TechLayer {
  readonly category: string;
  readonly description: string;
  readonly tags: readonly string[];
}

const TECH_LAYERS: readonly TechLayer[] = [
  {
    category: 'Frontend',
    description: 'Modern, responsive interfaces for complex products.',
    tags: ['Next.js 15', 'React 19', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    description: 'Reliable APIs, structured validation and service logic.',
    tags: ['Python 3.12', 'FastAPI', 'Pydantic v2'],
  },
  {
    category: 'Database & Retrieval',
    description: 'Transactional data and intelligent retrieval.',
    tags: ['PostgreSQL 16', 'pgvector', 'ParadeDB BM25', 'Drizzle ORM'],
  },
  {
    category: 'Infrastructure',
    description: 'Edge execution, messaging and application infrastructure.',
    tags: ['Cloudflare Workers', 'Redis Streams', 'Neon'],
  },
  {
    category: 'Quality & Observability',
    description: 'Testing, tracing and code quality.',
    tags: ['OpenTelemetry', 'Playwright', 'Biome'],
  },
];

export function TechStackSection(): React.ReactElement {
  return (
    <section
      id="stack"
      aria-labelledby="heading-tech-stack"
      className="py-16 md:py-20 bg-[#F9F9FB] border-b border-[#E2E2E8]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* =========================================================================
              LEFT COLUMN (lg:col-span-4): EDITORIAL HEADLINE & CONTEXT
             ========================================================================= */}
          <div className="lg:col-span-4">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B] block mb-3">
              BUILT WITH TECHNOLOGIES THAT SCALE.
            </span>
            <h2
              id="heading-tech-stack"
              className="font-sans text-[32px] sm:text-[38px] font-extrabold tracking-[-0.03em] text-[#0A0A0C] leading-[1.08] mb-4"
            >
              Built With Technologies That Scale.
            </h2>
            <p className="font-sans text-[14.5px] leading-[1.6] text-[#3F414A]">
              Modern tools, thoughtful architecture and maintainable engineering foundations.
            </p>
          </div>

          {/* =========================================================================
              RIGHT COLUMN (lg:col-span-8): 5-ROW STRUCTURED TECHNOLOGY TABLE
             ========================================================================= */}
          <div className="lg:col-span-8">
            <div className="bg-[#FFFFFF] border border-[#E2E2E8] rounded-[6px] divide-y divide-[#E2E2E8] shadow-[0_4px_20px_rgba(10,10,12,0.02)] overflow-hidden">
              {TECH_LAYERS.map((layer) => (
                <div
                  key={layer.category}
                  className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-[#FDFDFE] transition-colors"
                >
                  {/* Category Title */}
                  <div className="md:w-44 shrink-0">
                    <span className="font-sans font-bold text-[#0A0A0C] text-[14px]">
                      {layer.category}
                    </span>
                  </div>

                  {/* Role Description */}
                  <div className="flex-1">
                    <p className="font-sans text-[13.5px] text-[#5A5D6A]">
                      {layer.description}
                    </p>
                  </div>

                  {/* Compact Technology Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 shrink-0 pt-1 md:pt-0">
                    {layer.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-[#F4F5F8] border border-[#E2E2E8] text-[#3F414A] font-mono text-[11px] rounded-[3px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
