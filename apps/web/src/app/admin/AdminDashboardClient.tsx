'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type {
  PortfolioProject,
  PricingConfig,
  AuditLead,
} from '@/lib/db/schema';
import type { TelemetryMetrics } from '@/lib/db';
import type { SiteSettings } from '@/lib/seed-data';

interface AdminDashboardClientProps {
  initialMetrics: TelemetryMetrics;
  initialLeads: AuditLead[];
  initialProjects: PortfolioProject[];
  initialPricing: PricingConfig[];
  initialSettings: SiteSettings;
  isLiveDatabase?: boolean;
}

type TabType = 'telemetry' | 'leads' | 'projects' | 'pricing';

export function AdminDashboardClient({
  initialMetrics,
  initialLeads,
  initialProjects,
  initialPricing,
  initialSettings,
  isLiveDatabase = false,
}: AdminDashboardClientProps): React.ReactElement {
  const router = useRouter();

  // Active Tab
  const [activeTab, setActiveTab] = useState<TabType>('telemetry');

  // State
  const [metrics, setMetrics] = useState<TelemetryMetrics>(initialMetrics);
  const [leads, setLeads] = useState<AuditLead[]>(initialLeads);
  const [projects, setProjects] = useState<PortfolioProject[]>(initialProjects);
  const [pricing, setPricing] = useState<PricingConfig[]>(initialPricing);
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);

  // Status feedback toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Inspect Modal (Payload or Calculator Snapshot)
  const [inspectModalData, setInspectModalData] = useState<{
    title: string;
    json: unknown;
  } | null>(null);

  // Project Editor Modal State
  const [projectEditorOpen, setProjectEditorOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<PortfolioProject> | null>(null);
  const [projectSaving, setProjectSaving] = useState(false);

  // Pricing Form State
  const [pricingFormData, setPricingFormData] = useState<PricingConfig[]>(initialPricing);
  const [pricingSaving, setPricingSaving] = useState(false);

  // Leads Filter State
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('ALL');
  const [leadSearch, setLeadSearch] = useState<string>('');

  // --------------------------------------------------------------------------
  // ACTIONS
  // --------------------------------------------------------------------------

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' }),
      });
      router.push('/admin/login');
      router.refresh();
    } catch {
      router.push('/admin/login');
    }
  };

  const refreshAllData = async () => {
    try {
      const [telRes, leadRes, projRes, prcRes] = await Promise.all([
        fetch('/api/admin/telemetry').then((r) => r.json()),
        fetch('/api/admin/leads').then((r) => r.json()),
        fetch('/api/admin/projects').then((r) => r.json()),
        fetch('/api/admin/pricing').then((r) => r.json()),
      ]);

      if (telRes.metrics) setMetrics(telRes.metrics);
      if (leadRes.leads) setLeads(leadRes.leads);
      if (projRes.projects) setProjects(projRes.projects);
      if (projRes.settings) setSettings(projRes.settings);
      if (prcRes.pricing) {
        setPricing(prcRes.pricing);
        setPricingFormData(prcRes.pricing);
      }
      showToast('Telemetry and records synchronized with production');
    } catch {
      showToast('Failed to refresh data');
    }
  };

  // Toggle Empty State
  const handleTogglePortfolioMode = async () => {
    const newMode =
      settings.portfolioDisplayMode === 'coming_soon_empty_state'
        ? 'showcase_10_projects'
        : 'coming_soon_empty_state';

    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          settings: { portfolioDisplayMode: newMode },
        }),
      });
      const data = await res.json();
      if (data.settings) {
        setSettings(data.settings);
        showToast(`Portfolio display mode updated: ${newMode}`);
      }
    } catch {
      showToast('Failed to update portfolio display mode');
    }
  };

  // Toggle Hide Commercial Figures
  const handleToggleCommercialFigures = async () => {
    const newHide = !settings.hideCommercialFigures;
    try {
      const res = await fetch('/api/admin/pricing', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          settingsPatch: { hideCommercialFigures: newHide },
        }),
      });
      const data = await res.json();
      if (data.settings) {
        setSettings(data.settings);
        showToast(
          newHide
            ? 'Dollar figures hidden: Calculator now displays "Custom Scope — Book Audit for Quote"'
            : 'Commercial figures visible: Dollar ranges active in Calculator'
        );
      }
    } catch {
      showToast('Failed to update pricing visibility');
    }
  };

  // Lead status change
  const handleLeadStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
        );
        showToast(`Lead status updated to ${newStatus}`);
      }
    } catch {
      showToast('Failed to update lead status');
    }
  };

  // Delete lead
  const handleDeleteLead = async (leadId: string) => {
    if (!window.confirm('Delete this audit lead permanently?')) return;
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId }),
      });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== leadId));
        showToast('Audit lead deleted');
      }
    } catch {
      showToast('Failed to delete lead');
    }
  };

  // Save Project
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject?.slug) {
      alert('Title and Slug are required');
      return;
    }

    setProjectSaving(true);
    try {
      const payload = {
        ...editingProject,
        indexNumber: editingProject.indexNumber ?? projects.length + 1,
        industry: editingProject.industry || 'Systems Engineering',
        category: editingProject.category || 'Governed AI & Autonomous Agents',
        summary: editingProject.summary || '',
        problem: editingProject.problem || '',
        solution: editingProject.solution || '',
        outcomesSummary: editingProject.outcomesSummary || '',
        stackTags: Array.isArray(editingProject.stackTags)
          ? editingProject.stackTags
          : typeof editingProject.stackTags === 'string'
          ? (editingProject.stackTags as string).split(',').map((s) => s.trim())
          : [],
        keyFeatures: Array.isArray(editingProject.keyFeatures)
          ? editingProject.keyFeatures
          : typeof editingProject.keyFeatures === 'string'
          ? (editingProject.keyFeatures as string).split('\n').filter(Boolean)
          : [],
        architectureNodesJson: editingProject.architectureNodesJson || [
          { id: 'node_1', label: 'Ingress Gateway', role: 'Validation', latency: '< 15ms' },
          { id: 'node_2', label: 'Processing Core', role: 'Execution', latency: '< 45ms' },
        ],
        isPublished: editingProject.isPublished ?? true,
      };

      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project: payload }),
      });

      const data = await res.json();
      if (data.project) {
        setProjects((prev) => {
          const idx = prev.findIndex((p) => p.id === data.project.id || p.slug === data.project.slug);
          if (idx >= 0) {
            const copy = [...prev];
            copy[idx] = data.project;
            return copy;
          }
          return [...prev, data.project];
        });
        showToast(`Project "${data.project.title}" saved successfully`);
        setProjectEditorOpen(false);
      }
    } catch {
      showToast('Failed to save project');
    } finally {
      setProjectSaving(false);
    }
  };

  // Delete Project
  const handleDeleteProject = async (id: string, title: string) => {
    if (!window.confirm(`Delete project "${title}" permanently?`)) return;
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        showToast(`Project "${title}" deleted`);
      }
    } catch {
      showToast('Failed to delete project');
    }
  };

  // Save Pricing Tier Config
  const handleSavePricingConfig = async (modelSlug: string) => {
    const config = pricingFormData.find((c) => c.modelSlug === modelSlug);
    if (!config) return;

    setPricingSaving(true);
    try {
      const res = await fetch('/api/admin/pricing', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modelSlug,
          patch: config,
        }),
      });
      const data = await res.json();
      if (data.pricing) {
        setPricing((prev) =>
          prev.map((p) => (p.modelSlug === modelSlug ? data.pricing : p))
        );
        showToast(`Pricing tier "${config.title}" updated successfully`);
      }
    } catch {
      showToast('Failed to update pricing tier');
    } finally {
      setPricingSaving(false);
    }
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus =
      leadStatusFilter === 'ALL' ||
      lead.status.toUpperCase() === leadStatusFilter.toUpperCase();
    const matchesSearch =
      leadSearch === '' ||
      lead.workEmail.toLowerCase().includes(leadSearch.toLowerCase()) ||
      (lead.companyDomain && lead.companyDomain.toLowerCase().includes(leadSearch.toLowerCase())) ||
      lead.bottleneckDescription.toLowerCase().includes(leadSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0C0D10] text-[#E2E2E8] font-mono selection:bg-[#C83E1B] selection:text-white flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 border border-[#C83E1B] bg-[#14161B] text-white text-xs shadow-2xl flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#C83E1B] animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* JSON Inspector Modal */}
      {inspectModalData && (
        <div
          role="presentation"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setInspectModalData(null);
          }}
        >
          <div className="w-full max-w-2xl border border-[#272A34] bg-[#14161B] p-6 shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-[#272A34]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#C83E1B]" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  {inspectModalData.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectModalData(null)}
                className="text-xs text-[#717482] hover:text-white px-2 py-1 border border-[#272A34]"
              >
                [ESC / ×]
              </button>
            </div>
            <pre className="mt-4 p-4 border border-[#272A34] bg-[#0C0D10] text-[#00E599] text-xs leading-relaxed overflow-x-auto overflow-y-auto flex-1 font-mono">
              {JSON.stringify(inspectModalData.json, null, 2)}
            </pre>
            <div className="mt-4 pt-3 border-t border-[#272A34] flex justify-end">
              <button
                type="button"
                onClick={() => setInspectModalData(null)}
                className="px-4 py-1.5 bg-[#272A34] text-white text-xs hover:bg-[#3F414A]"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Editor Modal / Drawer */}
      {projectEditorOpen && editingProject && (
        <div
          role="presentation"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xs p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setProjectEditorOpen(false);
          }}
        >
          <div className="w-full max-w-3xl border border-[#272A34] bg-[#14161B] p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-[#272A34]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#C83E1B]" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  {editingProject.id ? `Edit Project: ${editingProject.slug}` : 'Create New Portfolio Project'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setProjectEditorOpen(false)}
                className="text-xs text-[#717482] hover:text-white px-2 py-1 border border-[#272A34]"
              >
                [ESC / ×]
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="mt-6 space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9B9EAD] mb-1 font-semibold">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-3 py-2 border border-[#272A34] bg-[#0C0D10] text-white focus:outline-none focus:border-[#C83E1B]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9B9EAD] mb-1 font-semibold">
                    Slug (URL identifier) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.slug || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    className="w-full px-3 py-2 border border-[#272A34] bg-[#0C0D10] text-white focus:outline-none focus:border-[#C83E1B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9B9EAD] mb-1 font-semibold">
                    Index Number
                  </label>
                  <input
                    type="number"
                    value={editingProject.indexNumber || 1}
                    onChange={(e) => setEditingProject({ ...editingProject, indexNumber: parseInt(e.target.value, 10) })}
                    className="w-full px-3 py-2 border border-[#272A34] bg-[#0C0D10] text-white focus:outline-none focus:border-[#C83E1B]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9B9EAD] mb-1 font-semibold">
                    Industry
                  </label>
                  <input
                    type="text"
                    value={editingProject.industry || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, industry: e.target.value })}
                    className="w-full px-3 py-2 border border-[#272A34] bg-[#0C0D10] text-white focus:outline-none focus:border-[#C83E1B]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9B9EAD] mb-1 font-semibold">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingProject.category || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full px-3 py-2 border border-[#272A34] bg-[#0C0D10] text-white focus:outline-none focus:border-[#C83E1B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#9B9EAD] mb-1 font-semibold">
                  Executive Summary
                </label>
                <textarea
                  rows={2}
                  value={editingProject.summary || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                  className="w-full px-3 py-2 border border-[#272A34] bg-[#0C0D10] text-white focus:outline-none focus:border-[#C83E1B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9B9EAD] mb-1 font-semibold">
                    Problem Statement
                  </label>
                  <textarea
                    rows={3}
                    value={editingProject.problem || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, problem: e.target.value })}
                    className="w-full px-3 py-2 border border-[#272A34] bg-[#0C0D10] text-white focus:outline-none focus:border-[#C83E1B]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9B9EAD] mb-1 font-semibold">
                    Technical Solution
                  </label>
                  <textarea
                    rows={3}
                    value={editingProject.solution || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                    className="w-full px-3 py-2 border border-[#272A34] bg-[#0C0D10] text-white focus:outline-none focus:border-[#C83E1B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#9B9EAD] mb-1 font-semibold">
                  Outcomes Summary
                </label>
                <input
                  type="text"
                  value={editingProject.outcomesSummary || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, outcomesSummary: e.target.value })}
                  className="w-full px-3 py-2 border border-[#272A34] bg-[#0C0D10] text-white focus:outline-none focus:border-[#C83E1B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9B9EAD] mb-1 font-semibold">
                    Live Demo URL (optional)
                  </label>
                  <input
                    type="url"
                    value={editingProject.liveUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-[#272A34] bg-[#0C0D10] text-white focus:outline-none focus:border-[#C83E1B]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9B9EAD] mb-1 font-semibold">
                    Client GitHub Repo URL (optional)
                  </label>
                  <input
                    type="text"
                    value={editingProject.repoUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, repoUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-[#272A34] bg-[#0C0D10] text-white focus:outline-none focus:border-[#C83E1B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9B9EAD] mb-1 font-semibold">
                    Stack Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={
                      Array.isArray(editingProject.stackTags)
                        ? (editingProject.stackTags as string[]).join(', ')
                        : (editingProject.stackTags as string) || ''
                    }
                    onChange={(e) => setEditingProject({ ...editingProject, stackTags: e.target.value as unknown as string[] })}
                    className="w-full px-3 py-2 border border-[#272A34] bg-[#0C0D10] text-white focus:outline-none focus:border-[#C83E1B]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9B9EAD] mb-1 font-semibold">
                    Key Features (newline-separated)
                  </label>
                  <textarea
                    rows={2}
                    value={
                      Array.isArray(editingProject.keyFeatures)
                        ? (editingProject.keyFeatures as string[]).join('\n')
                        : (editingProject.keyFeatures as string) || ''
                    }
                    onChange={(e) => setEditingProject({ ...editingProject, keyFeatures: e.target.value as unknown as string[] })}
                    className="w-full px-3 py-2 border border-[#272A34] bg-[#0C0D10] text-white focus:outline-none focus:border-[#C83E1B]"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="project-is-published"
                  checked={editingProject.isPublished ?? true}
                  onChange={(e) => setEditingProject({ ...editingProject, isPublished: e.target.checked })}
                  className="accent-[#C83E1B] w-4 h-4 cursor-pointer"
                />
                <label htmlFor="project-is-published" className="text-xs text-white font-semibold cursor-pointer">
                  Publish project publicly in portfolio catalog
                </label>
              </div>

              <div className="pt-4 border-t border-[#272A34] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setProjectEditorOpen(false)}
                  className="px-4 py-2 border border-[#272A34] text-[#9B9EAD] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={projectSaving}
                  className="px-5 py-2 bg-[#C83E1B] text-white font-bold hover:bg-[#E04D26] disabled:opacity-50"
                >
                  {projectSaving ? 'Saving...' : 'Save Project Record →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TOP COMMAND CENTER HEADER */}
      <header className="border-b border-[#272A34] bg-[#14161B] px-4 sm:px-6 lg:px-8 py-4">
        <div className="mx-auto max-w-[var(--max-w-editorial)] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-[#C83E1B] shadow-[0_0_10px_#C83E1B]" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold tracking-wider text-white">
                  WTFearB // ENGINEERING COMMAND CENTER
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 border ${
                    isLiveDatabase
                      ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-400'
                      : 'border-amber-500/50 bg-amber-950/40 text-amber-400'
                  }`}
                >
                  {isLiveDatabase ? 'DATABASE: NEON POSTGRES LIVE' : 'DATABASE: FALLBACK MEMORY'}
                </span>
              </div>
              <p className="text-[11px] text-[#717482] mt-0.5">
                Session Active &bull; Neon Serverless Postgres &bull; Telemetry Engine v4.0
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto text-xs">
            <button
              type="button"
              onClick={refreshAllData}
              className="px-3 py-1.5 border border-[#272A34] bg-[#0C0D10] text-[#C4C7D4] hover:text-white hover:border-[#3F414A] transition-colors"
            >
              ↻ Refresh Sync
            </button>
            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 border border-[#272A34] bg-[#0C0D10] text-[#C4C7D4] hover:text-white hover:border-[#3F414A] transition-colors"
            >
              ↗ View Live Site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-1.5 border border-red-500/30 bg-red-950/20 text-red-300 hover:bg-red-950/40 transition-colors"
            >
              [ESC / Logout]
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mx-auto max-w-[var(--max-w-editorial)] mt-6 flex overflow-x-auto gap-2 border-b border-[#272A34] pb-px">
          {[
            { id: 'telemetry' as TabType, label: '01 // Live Telemetry & Visitor Activity' },
            { id: 'leads' as TabType, label: `02 // Audit Leads CRM (${leads.length})` },
            { id: 'projects' as TabType, label: `03 // Portfolio Projects CMS (${projects.length})` },
            { id: 'pricing' as TabType, label: '04 // Pricing & Calculator Controller' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#C83E1B] text-white bg-[#0C0D10]'
                  : 'border-transparent text-[#717482] hover:text-[#C4C7D4]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* MAIN TAB CONTENT */}
      <main className="flex-1 mx-auto max-w-[var(--max-w-editorial)] w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* ================================================================== */}
        {/* TAB 01: LIVE TELEMETRY & VISITOR ACTIVITY                          */}
        {/* ================================================================== */}
        {activeTab === 'telemetry' && (
          <div className="space-y-8">
            {/* KPI Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="border border-[#272A34] bg-[#14161B] p-4">
                <span className="text-[10px] uppercase tracking-widest text-[#717482] block font-semibold">
                  VISITOR SESSIONS
                </span>
                <span className="text-2xl font-bold text-white mt-1 block">
                  {metrics.totalSessions}
                </span>
                <span className="text-[10px] text-emerald-400 mt-1 block">Real-time IP deduplicated</span>
              </div>
              <div className="border border-[#272A34] bg-[#14161B] p-4">
                <span className="text-[10px] uppercase tracking-widest text-[#717482] block font-semibold">
                  PAGE VIEWS
                </span>
                <span className="text-2xl font-bold text-white mt-1 block">
                  {metrics.totalPageViews}
                </span>
                <span className="text-[10px] text-[#9B9EAD] mt-1 block">Aggregated telemetry</span>
              </div>
              <div className="border border-[#272A34] bg-[#14161B] p-4">
                <span className="text-[10px] uppercase tracking-widest text-[#717482] block font-semibold">
                  SANDBOX RUNS
                </span>
                <span className="text-2xl font-bold text-[#C83E1B] mt-1 block">
                  {metrics.totalSandboxRuns}
                </span>
                <span className="text-[10px] text-[#9B9EAD] mt-1 block">Dual-slider simulator</span>
              </div>
              <div className="border border-[#272A34] bg-[#14161B] p-4">
                <span className="text-[10px] uppercase tracking-widest text-[#717482] block font-semibold">
                  CALCULATOR INTERACTIONS
                </span>
                <span className="text-2xl font-bold text-white mt-1 block">
                  {metrics.totalCalculatorInteractions}
                </span>
                <span className="text-[10px] text-[#9B9EAD] mt-1 block">Scope &amp; price recalcs</span>
              </div>
              <div className="border border-[#272A34] bg-[#14161B] p-4">
                <span className="text-[10px] uppercase tracking-widest text-[#717482] block font-semibold">
                  AUDIT SUBMISSIONS
                </span>
                <span className="text-2xl font-bold text-emerald-400 mt-1 block">
                  {metrics.totalAuditSubmissions}
                </span>
                <span className="text-[10px] text-emerald-400 mt-1 block">Qualified architecture leads</span>
              </div>
            </div>

            {/* Aggregated Analytics 3-Column */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Top Viewed Routes */}
              <div className="border border-[#272A34] bg-[#14161B] p-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#272A34] mb-3">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Top Viewed Routes
                  </span>
                  <span className="text-[10px] text-[#717482]">Path traffic</span>
                </div>
                <div className="space-y-2">
                  {metrics.topViewedPages.length === 0 ? (
                    <div className="text-xs text-[#717482]">No pageview records yet.</div>
                  ) : (
                    metrics.topViewedPages.map((item) => (
                      <div key={item.path} className="flex items-center justify-between text-xs py-1 border-b border-[#272A34]/50">
                        <span className="text-[#C4C7D4] truncate max-w-[180px]">{item.path}</span>
                        <span className="text-white font-bold">{item.count} views</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Top Inspected Blueprints & Projects */}
              <div className="border border-[#272A34] bg-[#14161B] p-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#272A34] mb-3">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Top Inspected Items
                  </span>
                  <span className="text-[10px] text-[#717482]">Interactions</span>
                </div>
                <div className="space-y-2">
                  {metrics.topInspectedItems.length === 0 ? (
                    <div className="text-xs text-[#717482]">No inspection events yet.</div>
                  ) : (
                    metrics.topInspectedItems.map((item) => (
                      <div key={item.label} className="flex items-center justify-between text-xs py-1 border-b border-[#272A34]/50">
                        <span className="text-[#C4C7D4] truncate max-w-[180px]">{item.label}</span>
                        <span className="text-[#C83E1B] font-bold">{item.count} clicks</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Top Calculator Configurations */}
              <div className="border border-[#272A34] bg-[#14161B] p-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#272A34] mb-3">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Top Calculator Configs
                  </span>
                  <span className="text-[10px] text-[#717482]">Selected tiers</span>
                </div>
                <div className="space-y-2">
                  {metrics.topCalculatorConfigs.length === 0 ? (
                    <div className="text-xs text-[#717482]">No calculator events yet.</div>
                  ) : (
                    metrics.topCalculatorConfigs.map((item) => (
                      <div key={item.label} className="flex items-center justify-between text-xs py-1 border-b border-[#272A34]/50">
                        <span className="text-[#C4C7D4] truncate max-w-[180px]">{item.label}</span>
                        <span className="text-emerald-400 font-bold">{item.count} calcs</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Live Activity Stream Table */}
            <div className="border border-[#272A34] bg-[#14161B] p-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#272A34]">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Live Visitor Activity Stream
                  </h3>
                  <p className="text-[11px] text-[#717482] mt-0.5">
                    Real-time chronological events recorded via /api/telemetry
                  </p>
                </div>
                <span className="text-xs text-[#9B9EAD]">
                  Showing latest {metrics.recentEvents.length} events
                </span>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#272A34] bg-[#0C0D10] text-[#717482]">
                      <th className="p-3 font-semibold uppercase">Timestamp</th>
                      <th className="p-3 font-semibold uppercase">Visitor Location &amp; Device</th>
                      <th className="p-3 font-semibold uppercase">Event Type</th>
                      <th className="p-3 font-semibold uppercase">Route Path</th>
                      <th className="p-3 font-semibold uppercase">Target / Action</th>
                      <th className="p-3 font-semibold uppercase text-right">Payload</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#272A34]/60">
                    {metrics.recentEvents.map((evt) => (
                      <tr key={evt.id} className="hover:bg-[#1B1D24] transition-colors">
                        <td className="p-3 text-[#9B9EAD] whitespace-nowrap">
                          {new Date(evt.createdAt).toLocaleTimeString()}
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <div className="text-white font-medium">
                            {evt.country || 'Global'}{evt.city ? `, ${evt.city}` : ''}
                          </div>
                          <div className="text-[10px] text-[#717482]">
                            {evt.deviceType || 'desktop'}
                          </div>
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold border ${
                              evt.eventType === 'audit_submit'
                                ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300'
                                : evt.eventType === 'calculator_change'
                                ? 'border-amber-500/50 bg-amber-950/40 text-amber-300'
                                : evt.eventType === 'sandbox_change'
                                ? 'border-orange-500/50 bg-orange-950/40 text-orange-300'
                                : 'border-[#272A34] bg-[#0C0D10] text-[#9B9EAD]'
                            }`}
                          >
                            {evt.eventType}
                          </span>
                        </td>
                        <td className="p-3 text-[#C4C7D4] whitespace-nowrap">{evt.path}</td>
                        <td className="p-3 text-white max-w-xs truncate">{evt.targetLabel || '—'}</td>
                        <td className="p-3 text-right whitespace-nowrap">
                          {evt.payloadJson ? (
                            <button
                              type="button"
                              onClick={() =>
                                setInspectModalData({
                                  title: `Activity Event Payload: ${evt.eventType}`,
                                  json: evt.payloadJson,
                                })
                              }
                              className="px-2 py-1 border border-[#272A34] bg-[#0C0D10] text-[#00E599] hover:border-[#00E599] text-[10px]"
                            >
                              Inspect JSON
                            </button>
                          ) : (
                            <span className="text-[10px] text-[#5A5D6A]">Empty</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 02: ARCHITECTURE AUDIT LEADS CRM                               */}
        {/* ================================================================== */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            {/* Filter & Search Bar */}
            <div className="border border-[#272A34] bg-[#14161B] p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto">
                <span className="text-xs text-[#717482] uppercase mr-1">Status:</span>
                {['ALL', 'NEW', 'REVIEWED', 'CONTACTED', 'ARCHIVED'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setLeadStatusFilter(st)}
                    className={`px-3 py-1 text-xs font-semibold border ${
                      leadStatusFilter === st
                        ? 'border-[#C83E1B] bg-[#C83E1B] text-white'
                        : 'border-[#272A34] bg-[#0C0D10] text-[#717482] hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="sm:w-72">
                <input
                  type="text"
                  placeholder="Search by email, company or bottleneck..."
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  className="w-full px-3 py-1.5 border border-[#272A34] bg-[#0C0D10] text-white text-xs focus:outline-none focus:border-[#C83E1B]"
                />
              </div>
            </div>

            {/* Leads Table */}
            <div className="border border-[#272A34] bg-[#14161B] p-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#272A34]">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Qualified Architecture Audit Leads ({filteredLeads.length})
                </h3>
                <span className="text-xs text-[#9B9EAD]">
                  Auto-scored via lead qualification algorithm
                </span>
              </div>

              <div className="mt-4 overflow-x-auto">
                {filteredLeads.length === 0 ? (
                  <div className="py-12 text-center text-xs text-[#717482]">
                    No leads match the current filters.
                  </div>
                ) : (
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#272A34] bg-[#0C0D10] text-[#717482]">
                        <th className="p-3 font-semibold uppercase">Lead Contact</th>
                        <th className="p-3 font-semibold uppercase">Timeline</th>
                        <th className="p-3 font-semibold uppercase">Score &amp; Tier</th>
                        <th className="p-3 font-semibold uppercase">Status Selector</th>
                        <th className="p-3 font-semibold uppercase">System Bottleneck</th>
                        <th className="p-3 font-semibold uppercase text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#272A34]/60">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-[#1B1D24] transition-colors">
                          <td className="p-3 whitespace-nowrap">
                            <div className="font-bold text-white">{lead.workEmail}</div>
                            <div className="text-[11px] text-[#717482]">{lead.companyDomain || '—'}</div>
                            <div className="text-[10px] text-[#5A5D6A]">
                              {new Date(lead.createdAt).toLocaleDateString()} at{' '}
                              {new Date(lead.createdAt).toLocaleTimeString()}
                            </div>
                          </td>
                          <td className="p-3 whitespace-nowrap text-[#C4C7D4]">
                            {lead.targetTimeline}
                          </td>
                          <td className="p-3 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`text-xs font-bold font-mono px-2 py-0.5 border ${
                                  lead.leadScore >= 85
                                    ? 'border-emerald-500 bg-emerald-950/40 text-emerald-400'
                                    : lead.leadScore >= 70
                                    ? 'border-amber-500 bg-amber-950/40 text-amber-400'
                                    : 'border-[#272A34] bg-[#0C0D10] text-[#9B9EAD]'
                                }`}
                              >
                                {lead.leadScore} PTS
                              </span>
                            </div>
                            <div className="text-[10px] text-[#717482] mt-0.5">
                              {lead.qualificationTier}
                            </div>
                          </td>
                          <td className="p-3 whitespace-nowrap">
                            <select
                              value={lead.status}
                              onChange={(e) => handleLeadStatusChange(lead.id, e.target.value)}
                              className="px-2.5 py-1 border border-[#272A34] bg-[#0C0D10] text-xs text-white focus:outline-none focus:border-[#C83E1B]"
                            >
                              <option value="NEW">NEW</option>
                              <option value="REVIEWED">REVIEWED</option>
                              <option value="CONTACTED">CONTACTED</option>
                              <option value="ARCHIVED">ARCHIVED</option>
                            </select>
                          </td>
                          <td className="p-3 max-w-sm">
                            <p className="line-clamp-2 text-[#C4C7D4] leading-relaxed">
                              {lead.bottleneckDescription}
                            </p>
                          </td>
                          <td className="p-3 text-right whitespace-nowrap space-x-2">
                            {Boolean(lead.calculatorSnapshotJson) && (
                              <button
                                type="button"
                                onClick={() =>
                                  setInspectModalData({
                                    title: `Calculator Scope Snapshot: ${lead.workEmail}`,
                                    json: lead.calculatorSnapshotJson,
                                  })
                                }
                                className="px-2 py-1 border border-[#272A34] bg-[#0C0D10] text-[#00E599] hover:border-[#00E599] text-[10px]"
                              >
                                Scope Snapshot
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleDeleteLead(lead.id)}
                              className="px-2 py-1 border border-red-500/30 text-red-400 hover:bg-red-950/30 text-[10px]"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 03: PORTFOLIO PROJECTS CMS (10 Projects + Empty-State Toggle)   */}
        {/* ================================================================== */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {/* Global Portfolio Empty-State Toggle Banner */}
            <div className="border border-[#272A34] bg-[#14161B] p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C83E1B] font-bold block mb-1">
                  Public Display Mode
                </span>
                <h3 className="text-base font-bold text-white">
                  Portfolio Showcase Status:{' '}
                  <span
                    className={
                      settings.portfolioDisplayMode === 'coming_soon_empty_state'
                        ? 'text-amber-400'
                        : 'text-emerald-400'
                    }
                  >
                    {settings.portfolioDisplayMode === 'coming_soon_empty_state'
                      ? 'COMING SOON / NDA PREPARATION (EMPTY STATE)'
                      : 'SHOWCASE 10 PRODUCTION MONOGRAPHS (LIVE)'}
                  </span>
                </h3>
                <p className="text-xs text-[#9B9EAD] mt-1 max-w-xl">
                  Toggle whether public visitors on /projects see all 10 detailed production monographs or the client-confidentiality &ldquo;Case Studies Under Direct Preparation&rdquo; notice.
                </p>
              </div>

              <button
                type="button"
                onClick={handleTogglePortfolioMode}
                className={`px-5 py-2.5 font-bold text-xs uppercase tracking-wider cursor-pointer border transition-colors ${
                  settings.portfolioDisplayMode === 'coming_soon_empty_state'
                    ? 'border-emerald-500 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-950/50'
                    : 'border-amber-500 bg-amber-950/30 text-amber-300 hover:bg-amber-950/50'
                }`}
              >
                {settings.portfolioDisplayMode === 'coming_soon_empty_state'
                  ? 'Switch To: Showcase 10 Projects →'
                  : 'Switch To: NDA Preparation Notice →'}
              </button>
            </div>

            {/* Projects Management Header */}
            <div className="border border-[#272A34] bg-[#14161B] p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#272A34]">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Production Systems Monographs ({projects.length})
                  </h3>
                  <p className="text-[11px] text-[#717482] mt-0.5">
                    Manage project architecture nodes, problems, solutions, and verification metrics
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingProject({
                      id: `proj_${Date.now()}`,
                      indexNumber: projects.length + 1,
                      isPublished: true,
                    });
                    setProjectEditorOpen(true);
                  }}
                  className="px-4 py-2 bg-[#C83E1B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#E04D26] cursor-pointer"
                >
                  + Create New Project
                </button>
              </div>

              {/* Projects Table */}
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#272A34] bg-[#0C0D10] text-[#717482]">
                      <th className="p-3 font-semibold uppercase">#</th>
                      <th className="p-3 font-semibold uppercase">Project Title &amp; Slug</th>
                      <th className="p-3 font-semibold uppercase">Industry &amp; Category</th>
                      <th className="p-3 font-semibold uppercase">Outcome Summary</th>
                      <th className="p-3 font-semibold uppercase">Status</th>
                      <th className="p-3 font-semibold uppercase text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#272A34]/60">
                    {projects.map((proj) => (
                      <tr key={proj.id} className="hover:bg-[#1B1D24] transition-colors">
                        <td className="p-3 font-mono text-[#C83E1B] font-bold">
                          [{String(proj.indexNumber).padStart(2, '0')}]
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-white">{proj.title}</div>
                          <Link
                            href={`/projects/${proj.slug}`}
                            target="_blank"
                            className="text-[11px] text-[#717482] hover:text-[#C83E1B] underline"
                          >
                            /projects/{proj.slug} ↗
                          </Link>
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <div className="text-[#C4C7D4]">{proj.industry}</div>
                          <div className="text-[10px] text-[#717482]">{proj.category}</div>
                        </td>
                        <td className="p-3 max-w-xs">
                          <p className="line-clamp-2 text-emerald-400 font-mono text-[11px]">
                            {proj.outcomesSummary}
                          </p>
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold border ${
                              proj.isPublished
                                ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-400'
                                : 'border-[#272A34] bg-[#0C0D10] text-[#717482]'
                            }`}
                          >
                            {proj.isPublished ? 'PUBLISHED' : 'DRAFT'}
                          </span>
                        </td>
                        <td className="p-3 text-right whitespace-nowrap space-x-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProject(proj);
                              setProjectEditorOpen(true);
                            }}
                            className="px-2.5 py-1 border border-[#272A34] bg-[#0C0D10] text-white hover:border-white text-xs"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProject(proj.id, proj.title)}
                            className="px-2.5 py-1 border border-red-500/30 text-red-400 hover:bg-red-950/30 text-xs"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 04: PRICING & CALCULATOR CONTROLLER                            */}
        {/* ================================================================== */}
        {activeTab === 'pricing' && (
          <div className="space-y-6">
            {/* Commercial Figure Toggle Card */}
            <div className="border border-[#272A34] bg-[#14161B] p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C83E1B] font-bold block mb-1">
                  Commercial Transparency Toggle
                </span>
                <h3 className="text-base font-bold text-white">
                  Calculator Price Display Mode:{' '}
                  <span className={settings.hideCommercialFigures ? 'text-amber-400' : 'text-emerald-400'}>
                    {settings.hideCommercialFigures
                      ? 'CUSTOM SCOPE — BOOK AUDIT FOR QUOTE (FIGURES HIDDEN)'
                      : 'NUMERICAL DOLLAR FIGURES ACTIVE ($6,500 – $8,500 USD)'}
                  </span>
                </h3>
                <p className="text-xs text-[#9B9EAD] mt-1 max-w-xl">
                  When enabled, all dollar amounts in the Engagement Calculator and pricing tables are dynamically masked with &ldquo;Custom Scope — Book Audit for Quote&rdquo; for enterprise-gated sales flows.
                </p>
              </div>

              <button
                type="button"
                onClick={handleToggleCommercialFigures}
                className={`px-5 py-2.5 font-bold text-xs uppercase tracking-wider cursor-pointer border transition-colors ${
                  settings.hideCommercialFigures
                    ? 'border-emerald-500 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-950/50'
                    : 'border-amber-500 bg-amber-950/30 text-amber-300 hover:bg-amber-950/50'
                }`}
              >
                {settings.hideCommercialFigures
                  ? 'Switch To: Show Dollar Figures →'
                  : 'Switch To: Mask Dollar Figures →'}
              </button>
            </div>

            {/* Pricing Tiers Form */}
            <div className="space-y-6">
              {pricingFormData.map((tier) => (
                <div key={tier.modelSlug} className="border border-[#272A34] bg-[#14161B] p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#272A34]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#C83E1B] font-bold">MODEL [{tier.modelSlug.toUpperCase()}]</span>
                        <span className="text-sm font-bold text-white">{tier.title}</span>
                      </div>
                      <p className="text-xs text-[#717482] mt-0.5">{tier.subtitle}</p>
                    </div>

                    <button
                      type="button"
                      disabled={pricingSaving}
                      onClick={() => handleSavePricingConfig(tier.modelSlug)}
                      className="px-4 py-2 bg-[#C83E1B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#E04D26] disabled:opacity-50 cursor-pointer self-start sm:self-auto"
                    >
                      Save Tier Changes
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#9B9EAD] mb-1 font-semibold">
                        Base Min USD ($)
                      </label>
                      <input
                        type="number"
                        value={tier.baseMinUsd}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10) || 0;
                          setPricingFormData((prev) =>
                            prev.map((p) =>
                              p.modelSlug === tier.modelSlug ? { ...p, baseMinUsd: val } : p
                            )
                          );
                        }}
                        className="w-full px-3 py-2 border border-[#272A34] bg-[#0C0D10] text-white focus:outline-none focus:border-[#C83E1B]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#9B9EAD] mb-1 font-semibold">
                        Base Max USD ($)
                      </label>
                      <input
                        type="number"
                        value={tier.baseMaxUsd}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10) || 0;
                          setPricingFormData((prev) =>
                            prev.map((p) =>
                              p.modelSlug === tier.modelSlug ? { ...p, baseMaxUsd: val } : p
                            )
                          );
                        }}
                        className="w-full px-3 py-2 border border-[#272A34] bg-[#0C0D10] text-white focus:outline-none focus:border-[#C83E1B]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#9B9EAD] mb-1 font-semibold">
                        Default Duration Label
                      </label>
                      <input
                        type="text"
                        value={tier.defaultDurationLabel}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPricingFormData((prev) =>
                            prev.map((p) =>
                              p.modelSlug === tier.modelSlug ? { ...p, defaultDurationLabel: val } : p
                            )
                          );
                        }}
                        className="w-full px-3 py-2 border border-[#272A34] bg-[#0C0D10] text-white focus:outline-none focus:border-[#C83E1B]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#9B9EAD] mb-1 font-semibold">
                        Team Allocation
                      </label>
                      <input
                        type="text"
                        value={tier.teamAllocation}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPricingFormData((prev) =>
                            prev.map((p) =>
                              p.modelSlug === tier.modelSlug ? { ...p, teamAllocation: val } : p
                            )
                          );
                        }}
                        className="w-full px-3 py-2 border border-[#272A34] bg-[#0C0D10] text-white focus:outline-none focus:border-[#C83E1B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#9B9EAD] mb-1 font-semibold">
                      Guaranteed Deliverables (newline-separated)
                    </label>
                    <textarea
                      rows={4}
                      value={
                        Array.isArray(tier.deliverables)
                          ? (tier.deliverables as string[]).join('\n')
                          : (tier.deliverables as unknown as string) || ''
                      }
                      onChange={(e) => {
                        const items = e.target.value.split('\n');
                        setPricingFormData((prev) =>
                          prev.map((p) =>
                            p.modelSlug === tier.modelSlug ? { ...p, deliverables: items } : p
                          )
                        );
                      }}
                      className="w-full px-3 py-2 border border-[#272A34] bg-[#0C0D10] text-white text-xs leading-relaxed focus:outline-none focus:border-[#C83E1B]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
