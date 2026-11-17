import React from 'react';

interface DisciplineCard {
  readonly number: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly areasOfFocus: readonly string[];
}

const DISCIPLINES: readonly DisciplineCard[] = [
  {
    number: '01',
    title: 'AI Systems',
    subtitle: 'AI AGENTS & KNOWLEDGE WORKFLOWS',
    description:
      'Explore AI agents, knowledge retrieval and document processing workflows with clear evaluation, guardrails and human oversight.',
    areasOfFocus: [
      'AI agents and assistants',
      'Retrieval and knowledge systems',
      'Workflow automation',
    ],
  },
  {
    number: '02',
    title: 'Product Engineering',
    subtitle: 'WEB APPLICATIONS & DIGITAL PRODUCTS',
    description:
      'Design and develop websites, web applications and SaaS products around user needs, business context and maintainable foundations.',
    areasOfFocus: [
      'Website development',
      'Web applications and portals',
      'SaaS and MVP development',
    ],
  },
  {
    number: '03',
    title: 'Systems Engineering',
    subtitle: 'BACKEND, APIs & INTEGRATIONS',
    description:
      'Connect applications and operational tools through backend services, APIs, data flows and practical system integrations.',
    areasOfFocus: [
      'Backend services',
      'API development and integrations',
      'Data and business workflows',
    ],
  },
  {
    number: '04',
    title: 'Technical Strategy',
    subtitle: 'DISCOVERY, ARCHITECTURE & SCOPING',
    description:
      'Clarify requirements, map constraints and assess technical options before committing to a build.',
    areasOfFocus: [
      'Problem discovery',
      'Architecture planning',
      'Technical scoping',
    ],
  },
];

export function PositioningSection(): React.ReactElement {
  return (
    <section
      id="positioning"
      aria-labelledby="positioning-title"
      className="py-14 md:py-20 bg-[#FFFFFF] border-b border-[#E2E2E8]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. EDITORIAL SPLIT HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end pb-8 mb-10 border-b border-[#E2E2E8]">
          {/* LEFT COLUMN (lg:col-span-7) */}
          <div className="lg:col-span-7">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFFFFF] border border-[#E2E2E8] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B] shrink-0" aria-hidden="true" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B]">
                CORE ARCHITECTURAL PHILOSOPHY
              </span>
            </div>

            {/* Main Heading (<h2>) */}
            <h2
              id="positioning-title"
              className="font-sans font-extrabold text-[#0A0A0C] text-[36px] sm:text-[44px] lg:text-[50px] leading-[1.06] tracking-[-0.03em]"
            >
              Complex Problems. Carefully
              <br />
              Engineered Solutions.
            </h2>
          </div>

          {/* RIGHT COLUMN (lg:col-span-5) */}
          <div className="lg:col-span-5">
            <div className="border-l-[3px] border-[#C83E1B] pl-5 py-1 max-w-md lg:ml-auto">
              <p className="font-mono text-[13px] sm:text-[13.5px] leading-[1.65] text-[#3F414A]">
                Four connected engineering disciplines for turning business needs into practical,
                maintainable technology.
              </p>
            </div>
          </div>
        </div>

        {/* 2. FOUR ENGINEERING DISCIPLINE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {/* CARD 01: AI SYSTEMS */}
          <article className="group bg-[#FFFFFF] border border-[#E2E2E8] hover:border-[#C83E1B]/60 p-6 flex flex-col justify-between transition-all duration-300 ease-out hover:shadow-[0_8px_24px_rgba(10,10,12,0.05)] rounded-xs">
            <div>
              {/* ZONE A: TOP METADATA BAR */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#E2E2E8]">
                <span className="font-mono text-[13px] font-bold text-[#C83E1B]">
                  {DISCIPLINES[0].number}
                </span>
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#5A5D6A]">
                  // DISCIPLINE
                </span>
              </div>

              {/* ZONE B: TECHNICAL ILLUSTRATION & EDITORIAL BODY */}
              {/* Distinct SVG: Agentic Knowledge Graph & Hexagonal Guardrail Core */}
              <div className="relative w-full h-[148px] mb-5 bg-[#FAFBFD] border border-[#F0F1F5] flex items-center justify-center overflow-hidden">
                <svg
                  viewBox="0 0 220 136"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full block select-none"
                  aria-label="AI Systems: Knowledge Retrieval, Reasoning Core & Guardrails"
                >
                  <defs>
                    <pattern id="grid-ai" width="16" height="16" patternUnits="userSpaceOnUse">
                      <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#EFEFF4" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="220" height="136" fill="url(#grid-ai)" />

                  {/* 4 Viewfinder Corner Brackets */}
                  <path
                    d="M 14 22 L 14 14 L 22 14"
                    className="stroke-[#9FA3B0] group-hover:stroke-[#C83E1B] transition-colors duration-300"
                    strokeWidth="1.25"
                    fill="none"
                  />
                  <path
                    d="M 198 14 L 206 14 L 206 22"
                    className="stroke-[#9FA3B0] group-hover:stroke-[#C83E1B] transition-colors duration-300"
                    strokeWidth="1.25"
                    fill="none"
                  />
                  <path
                    d="M 14 114 L 14 122 L 22 122"
                    className="stroke-[#9FA3B0] group-hover:stroke-[#C83E1B] transition-colors duration-300"
                    strokeWidth="1.25"
                    fill="none"
                  />
                  <path
                    d="M 198 122 L 206 122 L 206 114"
                    className="stroke-[#9FA3B0] group-hover:stroke-[#C83E1B] transition-colors duration-300"
                    strokeWidth="1.25"
                    fill="none"
                  />

                  {/* Left Column: 3 Knowledge Nodes */}
                  <rect
                    x="36"
                    y="30"
                    width="18"
                    height="13"
                    rx="1.5"
                    fill="#FFFFFF"
                    stroke="#3F414A"
                    strokeWidth="1.2"
                  />
                  <line x1="40" y1="34" x2="50" y2="34" stroke="#9FA3B0" strokeWidth="1" />
                  <line x1="40" y1="38" x2="47" y2="38" stroke="#9FA3B0" strokeWidth="1" />

                  <rect
                    x="36"
                    y="62"
                    width="18"
                    height="13"
                    rx="1.5"
                    fill="#FFFFFF"
                    stroke="#3F414A"
                    strokeWidth="1.2"
                  />
                  <line x1="40" y1="66" x2="50" y2="66" stroke="#9FA3B0" strokeWidth="1" />
                  <line x1="40" y1="70" x2="47" y2="70" stroke="#9FA3B0" strokeWidth="1" />

                  <rect
                    x="36"
                    y="94"
                    width="18"
                    height="13"
                    rx="1.5"
                    fill="#FFFFFF"
                    stroke="#3F414A"
                    strokeWidth="1.2"
                  />
                  <line x1="40" y1="98" x2="50" y2="98" stroke="#9FA3B0" strokeWidth="1" />
                  <line x1="40" y1="102" x2="47" y2="102" stroke="#9FA3B0" strokeWidth="1" />

                  {/* Dashed Retrieval Vectors Converging */}
                  <path
                    d="M 54 36 L 88 58"
                    stroke="#5A5D6A"
                    strokeWidth="1.2"
                    strokeDasharray="3 2"
                  />
                  <path
                    d="M 54 68 L 88 68"
                    stroke="#5A5D6A"
                    strokeWidth="1.2"
                    strokeDasharray="3 2"
                  />
                  <path
                    d="M 54 100 L 88 78"
                    stroke="#5A5D6A"
                    strokeWidth="1.2"
                    strokeDasharray="3 2"
                  />

                  {/* Verification Orbit Ring */}
                  <circle
                    cx="110"
                    cy="68"
                    r="32"
                    stroke="#C83E1B"
                    strokeOpacity="0.25"
                    strokeDasharray="3 2"
                    strokeWidth="1"
                    fill="none"
                  />

                  {/* Center Signal Orange Hexagonal Reasoning Core */}
                  <polygon
                    points="110,42 132,55 132,81 110,94 88,81 88,55"
                    fill="#C83E1B"
                    fillOpacity="0.16"
                    stroke="#C83E1B"
                    strokeWidth="1.5"
                    className="group-hover:scale-105 transition-transform duration-300 origin-[110px_68px]"
                  />
                  {/* Inner Solid Nucleus Diamond */}
                  <polygon points="110,58 119,68 110,78 101,68" fill="#C83E1B" />

                  {/* Right Output Pipeline */}
                  <line x1="132" y1="68" x2="152" y2="68" stroke="#3F414A" strokeWidth="1.4" />

                  {/* Vertical Guardrail Checkpoint Gate */}
                  <line
                    x1="152"
                    y1="54"
                    x2="152"
                    y2="82"
                    stroke="#0A0A0C"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  <line x1="152" y1="68" x2="164" y2="68" stroke="#3F414A" strokeWidth="1.4" />

                  {/* Verified Output Terminal Card */}
                  <rect
                    x="164"
                    y="54"
                    width="22"
                    height="28"
                    rx="2"
                    fill="#FFFFFF"
                    stroke="#0A0A0C"
                    strokeWidth="1.3"
                  />
                  {/* Verified Checkmark */}
                  <path
                    d="M 169 68 L 173 72 L 181 64"
                    stroke="#C83E1B"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>

              {/* Main Discipline Title */}
              <h3 className="font-sans text-[21px] font-extrabold tracking-[-0.02em] text-[#0A0A0C] mb-1.5">
                {DISCIPLINES[0].title}
              </h3>
              {/* Orange Subheading */}
              <div className="font-mono text-[11.5px] font-bold uppercase tracking-[0.04em] text-[#C83E1B] mb-3.5 leading-snug">
                {DISCIPLINES[0].subtitle}
              </div>
              {/* Short Description */}
              <p className="font-sans text-[13.5px] leading-[1.6] text-[#3F414A] mb-6">
                {DISCIPLINES[0].description}
              </p>
            </div>

            {/* ZONE C: BOTTOM AREAS OF FOCUS LIST */}
            <div className="pt-4 mt-auto border-t border-[#E2E2E8]">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-[3px] h-3.5 bg-[#C83E1B] shrink-0" aria-hidden="true" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#0A0A0C]">
                  AREAS OF FOCUS
                </span>
              </div>
              <ul className="space-y-2">
                {DISCIPLINES[0].areasOfFocus.map((focusItem) => (
                  <li
                    key={focusItem}
                    className="flex items-start gap-2 font-mono text-[12px] leading-[1.45] text-[#3F414A]"
                  >
                    <span
                      className="text-[#C83E1B] font-bold leading-none mt-0.5 select-none"
                      aria-hidden="true"
                    >
                      &rsaquo;
                    </span>
                    <span>{focusItem}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* CARD 02: PRODUCT ENGINEERING */}
          <article className="group bg-[#FFFFFF] border border-[#E2E2E8] hover:border-[#C83E1B]/60 p-6 flex flex-col justify-between transition-all duration-300 ease-out hover:shadow-[0_8px_24px_rgba(10,10,12,0.05)] rounded-xs">
            <div>
              {/* ZONE A: TOP METADATA BAR */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#E2E2E8]">
                <span className="font-mono text-[13px] font-bold text-[#C83E1B]">
                  {DISCIPLINES[1].number}
                </span>
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#5A5D6A]">
                  // DISCIPLINE
                </span>
              </div>

              {/* ZONE B: TECHNICAL ILLUSTRATION & EDITORIAL BODY */}
              {/* Distinct SVG: Modular Viewport & Elevated UI Component Blueprint */}
              <div className="relative w-full h-[148px] mb-5 bg-[#FAFBFD] border border-[#F0F1F5] flex items-center justify-center overflow-hidden">
                <svg
                  viewBox="0 0 220 136"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full block select-none"
                  aria-label="Product Engineering: Application Viewport & UI Blueprint"
                >
                  <defs>
                    <pattern id="grid-prod" width="16" height="16" patternUnits="userSpaceOnUse">
                      <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#EFEFF4" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="220" height="136" fill="url(#grid-prod)" />

                  {/* 4 Viewfinder Corner Brackets */}
                  <path
                    d="M 14 22 L 14 14 L 22 14"
                    className="stroke-[#9FA3B0] group-hover:stroke-[#C83E1B] transition-colors duration-300"
                    strokeWidth="1.25"
                    fill="none"
                  />
                  <path
                    d="M 198 14 L 206 14 L 206 22"
                    className="stroke-[#9FA3B0] group-hover:stroke-[#C83E1B] transition-colors duration-300"
                    strokeWidth="1.25"
                    fill="none"
                  />
                  <path
                    d="M 14 114 L 14 122 L 22 122"
                    className="stroke-[#9FA3B0] group-hover:stroke-[#C83E1B] transition-colors duration-300"
                    strokeWidth="1.25"
                    fill="none"
                  />
                  <path
                    d="M 198 122 L 206 122 L 206 114"
                    className="stroke-[#9FA3B0] group-hover:stroke-[#C83E1B] transition-colors duration-300"
                    strokeWidth="1.25"
                    fill="none"
                  />

                  {/* Main Architectural Application Window Frame */}
                  <rect
                    x="42"
                    y="28"
                    width="112"
                    height="78"
                    rx="2"
                    fill="#FFFFFF"
                    stroke="#3F414A"
                    strokeWidth="1.3"
                  />
                  {/* Browser Chrome Header */}
                  <line x1="42" y1="40" x2="154" y2="40" stroke="#D5D7E0" strokeWidth="1" />
                  <circle cx="49" cy="34" r="1.5" fill="#9FA3B0" />
                  <circle cx="54" cy="34" r="1.5" fill="#9FA3B0" />
                  <circle cx="59" cy="34" r="1.5" fill="#9FA3B0" />

                  {/* Sidebar Navigation */}
                  <line x1="68" y1="40" x2="68" y2="106" stroke="#E2E2E8" strokeWidth="1" />
                  <rect x="48" y="47" width="14" height="3" rx="1" fill="#E2E2E8" />
                  <rect x="48" y="54" width="14" height="3" rx="1" fill="#E2E2E8" />
                  <rect x="48" y="61" width="14" height="3" rx="1" fill="#E2E2E8" />

                  {/* Inner Modular Viewport Grid Blocks */}
                  <rect
                    x="75"
                    y="47"
                    width="34"
                    height="22"
                    rx="1"
                    fill="#FAFBFD"
                    stroke="#D5D7E0"
                    strokeWidth="0.8"
                  />
                  <rect
                    x="75"
                    y="75"
                    width="70"
                    height="22"
                    rx="1"
                    fill="#FAFBFD"
                    stroke="#D5D7E0"
                    strokeWidth="0.8"
                  />

                  {/* Dashed Projection Lines connecting elevated card */}
                  <line
                    x1="116"
                    y1="48"
                    x2="108"
                    y2="42"
                    stroke="#C83E1B"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                    strokeOpacity="0.6"
                  />
                  <line
                    x1="116"
                    y1="94"
                    x2="108"
                    y2="88"
                    stroke="#C83E1B"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                    strokeOpacity="0.6"
                  />

                  {/* Elevated Signal Orange Interactive UI Component Card */}
                  <rect
                    x="116"
                    y="48"
                    width="62"
                    height="46"
                    rx="2"
                    fill="#FFF5F2"
                    stroke="#C83E1B"
                    strokeWidth="1.5"
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                  />
                  {/* Monospace Code Symbol < / > */}
                  <path
                    d="M 137 68 L 131 74 L 137 80"
                    stroke="#C83E1B"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <line
                    x1="146"
                    y1="65"
                    x2="142"
                    y2="83"
                    stroke="#C83E1B"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 151 68 L 157 74 L 151 80"
                    stroke="#C83E1B"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>

              {/* Main Discipline Title */}
              <h3 className="font-sans text-[21px] font-extrabold tracking-[-0.02em] text-[#0A0A0C] mb-1.5">
                {DISCIPLINES[1].title}
              </h3>
              {/* Orange Subheading */}
              <div className="font-mono text-[11.5px] font-bold uppercase tracking-[0.04em] text-[#C83E1B] mb-3.5 leading-snug">
                {DISCIPLINES[1].subtitle}
              </div>
              {/* Short Description */}
              <p className="font-sans text-[13.5px] leading-[1.6] text-[#3F414A] mb-6">
                {DISCIPLINES[1].description}
              </p>
            </div>

            {/* ZONE C: BOTTOM AREAS OF FOCUS LIST */}
            <div className="pt-4 mt-auto border-t border-[#E2E2E8]">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-[3px] h-3.5 bg-[#C83E1B] shrink-0" aria-hidden="true" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#0A0A0C]">
                  AREAS OF FOCUS
                </span>
              </div>
              <ul className="space-y-2">
                {DISCIPLINES[1].areasOfFocus.map((focusItem) => (
                  <li
                    key={focusItem}
                    className="flex items-start gap-2 font-mono text-[12px] leading-[1.45] text-[#3F414A]"
                  >
                    <span
                      className="text-[#C83E1B] font-bold leading-none mt-0.5 select-none"
                      aria-hidden="true"
                    >
                      &rsaquo;
                    </span>
                    <span>{focusItem}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* CARD 03: SYSTEMS ENGINEERING */}
          <article className="group bg-[#FFFFFF] border border-[#E2E2E8] hover:border-[#C83E1B]/60 p-6 flex flex-col justify-between transition-all duration-300 ease-out hover:shadow-[0_8px_24px_rgba(10,10,12,0.05)] rounded-xs">
            <div>
              {/* ZONE A: TOP METADATA BAR */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#E2E2E8]">
                <span className="font-mono text-[13px] font-bold text-[#C83E1B]">
                  {DISCIPLINES[2].number}
                </span>
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#5A5D6A]">
                  // DISCIPLINE
                </span>
              </div>

              {/* ZONE B: TECHNICAL ILLUSTRATION & EDITORIAL BODY */}
              {/* Distinct SVG: Isometric 3-Cube Distributed Topology */}
              <div className="relative w-full h-[148px] mb-5 bg-[#FAFBFD] border border-[#F0F1F5] flex items-center justify-center overflow-hidden">
                <svg
                  viewBox="0 0 220 136"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full block select-none"
                  aria-label="Systems Engineering: Distributed Service Topology"
                >
                  <defs>
                    <pattern id="grid-sys" width="16" height="16" patternUnits="userSpaceOnUse">
                      <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#EFEFF4" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="220" height="136" fill="url(#grid-sys)" />

                  {/* 4 Viewfinder Corner Brackets */}
                  <path
                    d="M 14 22 L 14 14 L 22 14"
                    className="stroke-[#9FA3B0] group-hover:stroke-[#C83E1B] transition-colors duration-300"
                    strokeWidth="1.25"
                    fill="none"
                  />
                  <path
                    d="M 198 14 L 206 14 L 206 22"
                    className="stroke-[#9FA3B0] group-hover:stroke-[#C83E1B] transition-colors duration-300"
                    strokeWidth="1.25"
                    fill="none"
                  />
                  <path
                    d="M 14 114 L 14 122 L 22 122"
                    className="stroke-[#9FA3B0] group-hover:stroke-[#C83E1B] transition-colors duration-300"
                    strokeWidth="1.25"
                    fill="none"
                  />
                  <path
                    d="M 198 122 L 206 122 L 206 114"
                    className="stroke-[#9FA3B0] group-hover:stroke-[#C83E1B] transition-colors duration-300"
                    strokeWidth="1.25"
                    fill="none"
                  />

                  {/* TOP ORCHESTRATOR ISOMETRIC CUBE (Signal Orange) */}
                  <polygon
                    points="110,22 132,33 110,44 88,33"
                    fill="#C83E1B"
                    fillOpacity="0.22"
                    stroke="#C83E1B"
                    strokeWidth="1.4"
                  />
                  <polygon
                    points="88,33 110,44 110,68 88,57"
                    fill="#FFFFFF"
                    stroke="#C83E1B"
                    strokeWidth="1.4"
                  />
                  <polygon
                    points="110,44 132,33 132,57 110,68"
                    fill="#C83E1B"
                    fillOpacity="0.10"
                    stroke="#C83E1B"
                    strokeWidth="1.4"
                  />

                  {/* BOTTOM-LEFT SERVICE ISOMETRIC CUBE */}
                  <polygon
                    points="74,68 96,79 74,90 52,79"
                    fill="#F9FAFC"
                    stroke="#3F414A"
                    strokeWidth="1.3"
                  />
                  <polygon
                    points="52,79 74,90 74,114 52,103"
                    fill="#FFFFFF"
                    stroke="#3F414A"
                    strokeWidth="1.3"
                  />
                  <polygon
                    points="74,90 96,79 96,103 74,114"
                    fill="#EEF0F4"
                    stroke="#3F414A"
                    strokeWidth="1.3"
                  />

                  {/* BOTTOM-RIGHT SERVICE ISOMETRIC CUBE */}
                  <polygon
                    points="146,68 168,79 146,90 124,79"
                    fill="#F9FAFC"
                    stroke="#3F414A"
                    strokeWidth="1.3"
                  />
                  <polygon
                    points="124,79 146,90 146,114 124,103"
                    fill="#FFFFFF"
                    stroke="#3F414A"
                    strokeWidth="1.3"
                  />
                  <polygon
                    points="146,90 168,79 168,103 146,114"
                    fill="#EEF0F4"
                    stroke="#3F414A"
                    strokeWidth="1.3"
                  />

                  {/* DASHED DATA-FLOW CONNECTORS */}
                  {/* Top -> Bottom-Left */}
                  <path
                    d="M 96 61 L 82 74"
                    stroke="#C83E1B"
                    strokeWidth="1.4"
                    strokeDasharray="3 2"
                  />
                  {/* Top -> Bottom-Right */}
                  <path
                    d="M 124 61 L 138 74"
                    stroke="#C83E1B"
                    strokeWidth="1.4"
                    strokeDasharray="3 2"
                  />
                  {/* Horizontal Sync Link */}
                  <path
                    d="M 96 96 L 124 96"
                    stroke="#5A5D6A"
                    strokeWidth="1.2"
                    strokeDasharray="3 2"
                  />
                </svg>
              </div>

              {/* Main Discipline Title */}
              <h3 className="font-sans text-[21px] font-extrabold tracking-[-0.02em] text-[#0A0A0C] mb-1.5">
                {DISCIPLINES[2].title}
              </h3>
              {/* Orange Subheading */}
              <div className="font-mono text-[11.5px] font-bold uppercase tracking-[0.04em] text-[#C83E1B] mb-3.5 leading-snug">
                {DISCIPLINES[2].subtitle}
              </div>
              {/* Short Description */}
              <p className="font-sans text-[13.5px] leading-[1.6] text-[#3F414A] mb-6">
                {DISCIPLINES[2].description}
              </p>
            </div>

            {/* ZONE C: BOTTOM AREAS OF FOCUS LIST */}
            <div className="pt-4 mt-auto border-t border-[#E2E2E8]">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-[3px] h-3.5 bg-[#C83E1B] shrink-0" aria-hidden="true" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#0A0A0C]">
                  AREAS OF FOCUS
                </span>
              </div>
              <ul className="space-y-2">
                {DISCIPLINES[2].areasOfFocus.map((focusItem) => (
                  <li
                    key={focusItem}
                    className="flex items-start gap-2 font-mono text-[12px] leading-[1.45] text-[#3F414A]"
                  >
                    <span
                      className="text-[#C83E1B] font-bold leading-none mt-0.5 select-none"
                      aria-hidden="true"
                    >
                      &rsaquo;
                    </span>
                    <span>{focusItem}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* CARD 04: TECHNICAL STRATEGY */}
          <article className="group bg-[#FFFFFF] border border-[#E2E2E8] hover:border-[#C83E1B]/60 p-6 flex flex-col justify-between transition-all duration-300 ease-out hover:shadow-[0_8px_24px_rgba(10,10,12,0.05)] rounded-xs">
            <div>
              {/* ZONE A: TOP METADATA BAR */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#E2E2E8]">
                <span className="font-mono text-[13px] font-bold text-[#C83E1B]">
                  {DISCIPLINES[3].number}
                </span>
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#5A5D6A]">
                  // DISCIPLINE
                </span>
              </div>

              {/* ZONE B: TECHNICAL ILLUSTRATION & EDITORIAL BODY */}
              {/* Distinct SVG: Architectural Blueprint Decision Matrix & Scoping Schematic */}
              <div className="relative w-full h-[148px] mb-5 bg-[#FAFBFD] border border-[#F0F1F5] flex items-center justify-center overflow-hidden">
                <svg
                  viewBox="0 0 220 136"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full block select-none"
                  aria-label="Technical Strategy: Architecture Decision Matrix"
                >
                  <defs>
                    <pattern id="grid-strat" width="16" height="16" patternUnits="userSpaceOnUse">
                      <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#EFEFF4" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="220" height="136" fill="url(#grid-strat)" />

                  {/* 4 Viewfinder Corner Brackets */}
                  <path
                    d="M 14 22 L 14 14 L 22 14"
                    className="stroke-[#9FA3B0] group-hover:stroke-[#C83E1B] transition-colors duration-300"
                    strokeWidth="1.25"
                    fill="none"
                  />
                  <path
                    d="M 198 14 L 206 14 L 206 22"
                    className="stroke-[#9FA3B0] group-hover:stroke-[#C83E1B] transition-colors duration-300"
                    strokeWidth="1.25"
                    fill="none"
                  />
                  <path
                    d="M 14 114 L 14 122 L 22 122"
                    className="stroke-[#9FA3B0] group-hover:stroke-[#C83E1B] transition-colors duration-300"
                    strokeWidth="1.25"
                    fill="none"
                  />
                  <path
                    d="M 198 122 L 206 122 L 206 114"
                    className="stroke-[#9FA3B0] group-hover:stroke-[#C83E1B] transition-colors duration-300"
                    strokeWidth="1.25"
                    fill="none"
                  />

                  {/* Blueprint Schematic Canvas Rectangle */}
                  <rect
                    x="42"
                    y="28"
                    width="136"
                    height="80"
                    rx="2"
                    fill="#FFFFFF"
                    stroke="#3F414A"
                    strokeWidth="1.3"
                  />
                  {/* Top Dimension Ticks */}
                  <line
                    x1="42"
                    y1="22"
                    x2="178"
                    y2="22"
                    stroke="#9FA3B0"
                    strokeDasharray="2 2"
                    strokeWidth="1"
                  />

                  {/* Architectural Compass/Caliper Arc */}
                  <path
                    d="M 94 38 A 38 38 0 0 1 94 98"
                    fill="none"
                    stroke="#C83E1B"
                    strokeOpacity="0.45"
                    strokeWidth="1.1"
                    strokeDasharray="2 2"
                  />

                  {/* Discovery Root Node at (64, 68) */}
                  <circle cx="64" cy="68" r="7" fill="#FFFFFF" stroke="#0A0A0C" strokeWidth="1.5" />
                  <circle cx="64" cy="68" r="2.5" fill="#C83E1B" />

                  {/* Top Candidate Path (Muted/Evaluated) */}
                  <path
                    d="M 71 68 L 88 46 L 148 46"
                    stroke="#9FA3B0"
                    strokeWidth="1.2"
                    strokeDasharray="3 2"
                    fill="none"
                  />
                  <circle
                    cx="152"
                    cy="46"
                    r="3.5"
                    fill="#FFFFFF"
                    stroke="#9FA3B0"
                    strokeWidth="1.2"
                  />

                  {/* Middle Selected Optimal Architecture Path (Signal Orange) */}
                  <path
                    d="M 71 68 L 108 68 L 132 58 L 152 58"
                    stroke="#C83E1B"
                    strokeWidth="1.8"
                    fill="none"
                  />
                  <circle cx="108" cy="68" r="3" fill="#C83E1B" />
                  <circle cx="132" cy="58" r="3" fill="#C83E1B" />

                  {/* Highlighted Target Crosshair Badge at (156, 58) */}
                  <circle
                    cx="156"
                    cy="58"
                    r="6"
                    fill="#C83E1B"
                    fillOpacity="0.2"
                    stroke="#C83E1B"
                    strokeWidth="1.5"
                  />
                  <circle cx="156" cy="58" r="2.5" fill="#C83E1B" />

                  {/* Bottom Candidate Path (Muted/Evaluated) */}
                  <path
                    d="M 71 68 L 88 90 L 148 90"
                    stroke="#9FA3B0"
                    strokeWidth="1.2"
                    strokeDasharray="3 2"
                    fill="none"
                  />
                  <circle
                    cx="152"
                    cy="90"
                    r="3.5"
                    fill="#FFFFFF"
                    stroke="#9FA3B0"
                    strokeWidth="1.2"
                  />
                </svg>
              </div>

              {/* Main Discipline Title */}
              <h3 className="font-sans text-[21px] font-extrabold tracking-[-0.02em] text-[#0A0A0C] mb-1.5">
                {DISCIPLINES[3].title}
              </h3>
              {/* Orange Subheading */}
              <div className="font-mono text-[11.5px] font-bold uppercase tracking-[0.04em] text-[#C83E1B] mb-3.5 leading-snug">
                {DISCIPLINES[3].subtitle}
              </div>
              {/* Short Description */}
              <p className="font-sans text-[13.5px] leading-[1.6] text-[#3F414A] mb-6">
                {DISCIPLINES[3].description}
              </p>
            </div>

            {/* ZONE C: BOTTOM AREAS OF FOCUS LIST */}
            <div className="pt-4 mt-auto border-t border-[#E2E2E8]">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-[3px] h-3.5 bg-[#C83E1B] shrink-0" aria-hidden="true" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#0A0A0C]">
                  AREAS OF FOCUS
                </span>
              </div>
              <ul className="space-y-2">
                {DISCIPLINES[3].areasOfFocus.map((focusItem) => (
                  <li
                    key={focusItem}
                    className="flex items-start gap-2 font-mono text-[12px] leading-[1.45] text-[#3F414A]"
                  >
                    <span
                      className="text-[#C83E1B] font-bold leading-none mt-0.5 select-none"
                      aria-hidden="true"
                    >
                      &rsaquo;
                    </span>
                    <span>{focusItem}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
