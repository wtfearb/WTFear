import { Suspense } from 'react';
import type { Metadata } from 'next';
import { isCustomPasswordConfigured } from '@/lib/auth/admin-auth';
import { AdminLoginForm } from './AdminLoginForm';

export const metadata: Metadata = {
  title: 'Engineering Command Center Login | WTFearB',
  description: 'Restricted access engineering console authentication.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage(): React.ReactElement {
  const isCustomSet = isCustomPasswordConfigured();

  return (
    <div className="min-h-screen bg-[#0C0D10] text-[#E2E2E8] flex flex-col justify-center items-center px-4 selection:bg-[#C83E1B] selection:text-white">
      <div className="w-full max-w-md border border-[#272A34] bg-[#14161B] p-8 shadow-2xl">
        <div className="flex items-center justify-between pb-6 border-b border-[#272A34]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#C83E1B]" />
            <span className="font-mono text-sm font-bold tracking-tight text-white">
              WTFearB // Command Center
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border border-[#272A34] bg-[#0C0D10] text-[#717482]">
            Restricted Access
          </span>
        </div>

        <div className="mt-6">
          <h1 className="text-xl font-bold font-mono tracking-tight text-white">
            Authenticate Session
          </h1>
          <p className="mt-2 text-xs font-mono text-[#9B9EAD] leading-relaxed">
            Enter the studio master secret to access live visitor telemetry, audit leads CRM, project CMS, and calculator pricing controllers.
          </p>
        </div>

        {!isCustomSet && (
          <div className="mt-4 p-3 border border-amber-600/40 bg-amber-950/20 text-amber-300 font-mono text-xs leading-relaxed">
            <div className="font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span>⚠</span> Dev / Preview Default Active
            </div>
            <span>
              <code className="text-white bg-black/50 px-1 py-0.5 font-bold">ADMIN_PASSWORD</code> is unset in environment. Use fallback default:{' '}
              <strong className="text-amber-200 underline">wtfear-admin-2026</strong>. Lock this down by setting <code className="text-white">ADMIN_PASSWORD</code> in your Vercel Project Settings.
            </span>
          </div>
        )}

        <div className="mt-6">
          <Suspense fallback={<div className="font-mono text-xs text-[#717482]">Loading login portal...</div>}>
            <AdminLoginForm />
          </Suspense>
        </div>

        <div className="mt-8 pt-4 border-t border-[#272A34] flex items-center justify-between text-[11px] font-mono text-[#5A5D6A]">
          <span>Security: HTTP-Only Signed Token</span>
          <a href="/" className="hover:text-white transition-colors">
            &larr; Return to WTFearB
          </a>
        </div>
      </div>
    </div>
  );
}
