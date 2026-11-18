import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AgentSandbox } from '@/components/sections/AgentSandbox';
import { ServicesHero } from '@/components/services/ServicesHero';
import { GovernedAiSection } from '@/components/services/GovernedAiSection';
import { CustomSoftwareSection } from '@/components/services/CustomSoftwareSection';
import { SaasPortalsSection } from '@/components/services/SaasPortalsSection';
import { BackendDistributedSection } from '@/components/services/BackendDistributedSection';
import { WorkflowAutomationSection } from '@/components/services/WorkflowAutomationSection';
import { ArchitectureConsultingSection } from '@/components/services/ArchitectureConsultingSection';
import { TechStackSection } from '@/components/services/TechStackSection';
import { ServicesCtaSection } from '@/components/services/ServicesCtaSection';
import { generateServicesJsonLd } from '@/lib/schema/json-ld';

export const metadata: Metadata = {
  title: 'Engineering Capabilities & Services | WTFearB Systems Studio',
  description:
    'Software, AI and systems engineering shaped around real business problems. Disciplines: Governed AI, Custom Software, SaaS Portals, Distributed Systems, Workflow Automation, and Technical Strategy.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Engineering Capabilities & Services — WTFearB',
    description:
      'Software, AI and systems engineering shaped around real business problems with production-grade architecture and clean execution.',
    url: '/services',
    siteName: 'WTFearB Systems Studio',
    type: 'website',
  },
};

export default function ServicesPage(): React.ReactElement {
  const jsonLd = generateServicesJsonLd();

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0A0A0C] flex flex-col scroll-smooth">
      {/* Schema.org Linked Graph JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* REGION 01 — GLOBAL NAVIGATION */}
      <Header />

      <main className="flex-1">
        {/* REGION 02 — SERVICES INTRODUCTION & COMPACT ANCHOR NAVIGATION */}
        <ServicesHero />

        {/* REGION 03 — 01. GOVERNED AI ENGINEERING & RAG SYSTEMS */}
        <GovernedAiSection />

        {/* REGION 04 — 02. CUSTOM SOFTWARE & SYSTEMS ENGINEERING */}
        <CustomSoftwareSection />

        {/* REGION 05 — 03. SAAS & ENTERPRISE B2B PORTALS */}
        <SaasPortalsSection />

        {/* REGION 06 — 04. BACKEND & DISTRIBUTED EVENT PIPELINES */}
        <BackendDistributedSection />

        {/* REGION 07 — 05. WORKFLOW AUTOMATION & SYSTEM INTEGRATIONS */}
        <WorkflowAutomationSection />

        {/* REGION 08 — 06. ARCHITECTURE & TECHNICAL CONSULTING */}
        <ArchitectureConsultingSection />

        {/* REGION 09 — INTERACTIVE AI GOVERNANCE LAB & SIMULATION */}
        <AgentSandbox />

        {/* REGION 10 — TECHNOLOGY ARCHITECTURE STACK */}
        <TechStackSection />

        {/* REGION 11 — SERVICES FINAL CTA */}
        <ServicesCtaSection />
      </main>

      {/* REGION 11 — GLOBAL FOOTER */}
      <Footer />
    </div>
  );
}
