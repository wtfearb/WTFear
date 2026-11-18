import React from 'react';

export function ProjectsHero(): React.ReactElement {
  return (
    <section className="bg-[#F9F9FB] pt-14 pb-8 border-b border-[#E2E2E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pb-10 border-b border-[#E2E2E8]">
          {/* LEFT: Headline & Editorial Context */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#C83E1B]">
                PROJECTS / ENGINEERING MONOGRAPHS
              </span>
            </div>

            <h1 className="font-sans font-extrabold text-[#0A0A0C] text-[40px] sm:text-[50px] lg:text-[56px] leading-[1.05] tracking-[-0.035em] mb-5">
              Selected Engineering<br />Work, Made Observable.
            </h1>

            <p className="font-sans text-[16px] sm:text-[17px] leading-[1.6] text-[#3F414A] max-w-xl">
              Explore the sovereign platforms, live deployments, and architectural decisions behind WTFearB&apos;s 10 flagship software and AI systems.
            </p>
          </div>

          {/* RIGHT: Custom Architectural Geometry SVG */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[420px] bg-[#FFFFFF] border border-[#E2E2E8] rounded-[6px] p-4 shadow-[0_4px_20px_rgba(10,10,12,0.03)] relative overflow-hidden">
              <svg
                viewBox="0 0 420 260"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto block"
              >
                <defs>
                  {/* 20px Grid Pattern */}
                  <pattern id="arch-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#ECEEF3" strokeWidth="1" />
                  </pattern>
                </defs>

                {/* Grid Background */}
                <rect width="420" height="260" fill="url(#arch-grid)" />

                {/* Stepped Diagonal Elevation Contour Lines */}
                <path d="M 40 240 L 220 60" stroke="#D5D7E0" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M 80 250 L 260 70" stroke="#D5D7E0" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M 120 260 L 300 80" stroke="#E2E4EC" strokeWidth="1" />
                <path d="M 160 260 L 340 80" stroke="#ECEEF3" strokeWidth="1" />

                {/* Outer Framing Crosshairs */}
                <circle cx="60" cy="50" r="3" fill="#D5D7E0" />
                <line x1="50" y1="50" x2="70" y2="50" stroke="#D5D7E0" strokeWidth="1" />
                <line x1="60" y1="40" x2="60" y2="60" stroke="#D5D7E0" strokeWidth="1" />

                <circle cx="360" cy="210" r="3" fill="#D5D7E0" />
                <line x1="350" y1="210" x2="370" y2="210" stroke="#D5D7E0" strokeWidth="1" />
                <line x1="360" y1="200" x2="360" y2="220" stroke="#D5D7E0" strokeWidth="1" />

                {/* Diagonal Precision Vector Line */}
                <line x1="110" y1="210" x2="264" y2="48" stroke="#C83E1B" strokeWidth="1.5" />
                <circle cx="110" cy="210" r="3.5" fill="#C83E1B" />

                {/* Central Black Architectural Square */}
                <rect x="166" y="76" width="88" height="88" rx="2" fill="#0A0A0C" />

                {/* Inner Centered Signal Orange Square */}
                <rect x="188" y="98" width="44" height="44" rx="1.5" fill="#C83E1B" />

                {/* Upper-right White Square Node */}
                <rect x="258" y="42" width="12" height="12" fill="#FFFFFF" stroke="#0A0A0C" strokeWidth="1.5" />

                {/* Technical Coordinates / Markings */}
                <text x="28" y="32" fill="#898E99" fontFamily="monospace" fontSize="9" letterSpacing="0.08em">
                  REF // ARCHITECTURAL TOPOLOGY
                </text>
                <text x="392" y="242" textAnchor="end" fill="#898E99" fontFamily="monospace" fontSize="9" letterSpacing="0.08em">
                  FIG. 01 / SOVEREIGN SYSTEMS
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Hero Bottom Metadata Strip */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.08em] text-[#5A5D6A]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C83E1B]" />
            <span>10 FLAGSHIP PLATFORMS · 8 LIVE DEPLOYMENTS · 10 GITHUB REPOS</span>
          </div>
          <div>
            <span>ENTERPRISE ERP / VOICE AI / RAG / BI / COMMERCE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
