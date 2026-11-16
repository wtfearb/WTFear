import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { CapabilitiesGrid } from '@/components/sections/CapabilitiesGrid';
import { BlueprintsSection } from '@/components/sections/BlueprintsSection';
import { AgentSandbox } from '@/components/sections/AgentSandbox';
import { EngagementSection } from '@/components/sections/EngagementSection';
import { TechStackMatrix } from '@/components/sections/TechStackMatrix';
import { FaqSection } from '@/components/sections/FaqSection';

export default function HomePage(): React.ReactElement {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-canvas)] selection:bg-[var(--color-accent-signal)] selection:text-white">
      <Header />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <CapabilitiesGrid />
        <BlueprintsSection />
        <AgentSandbox />
        <EngagementSection />
        <TechStackMatrix />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
