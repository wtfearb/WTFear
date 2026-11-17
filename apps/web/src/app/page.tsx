import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { PositioningSection } from '@/components/sections/PositioningSection';
import { CapabilitiesGrid } from '@/components/sections/CapabilitiesGrid';
import { BlueprintsSection } from '@/components/sections/BlueprintsSection';
import { TechStackMatrix } from '@/components/sections/TechStackMatrix';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { EngagementSection } from '@/components/sections/EngagementSection';
import { ProjectsPreviewSection } from '@/components/sections/ProjectsPreviewSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';

import { getSiteSettings } from '@/lib/db';

export default async function HomePage(): Promise<React.ReactElement> {
  const siteSettings = await getSiteSettings();
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-canvas)] text-[var(--color-ink-primary)] selection:bg-[var(--color-accent-signal)] selection:text-white">
      {/* Primary Sticky Header */}
      <Header />

      {/* Main 12-Section Swiss-Editorial Monograph */}
      <main id="main-content" className="flex-1">
        {/* Section 01: Hero */}
        <HeroSection />

        {/* Section 02: Positioning */}
        <PositioningSection />

        {/* Section 03: Engineering Capabilities */}
        <CapabilitiesGrid />

        {/* Section 04: Engineering Blueprints */}
        <BlueprintsSection />

        {/* Section 05: Technology Stack */}
        <TechStackMatrix />

        {/* Section 06: How We Work — From Architecture to Production */}
        <ProcessSection />

        {/* Section 08: Engagement Models & Scope Calculator */}
        <EngagementSection hideCommercialFigures={siteSettings.hideCommercialFigures} />

        {/* Section 09: Projects Preview */}
        <ProjectsPreviewSection />

        {/* Section 10: Frequently Asked Questions */}
        <FaqSection />

        {/* Section 11: Final Call to Action */}
        <FinalCtaSection />
      </main>

      {/* Section 12: Footer */}
      <Footer />
    </div>
  );
}
