'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function AdminLoginForm(): React.ReactElement {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/admin';

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication rejected');
      }

      // Full window reload so Edge middleware and Server Component immediately read the new cookie
      window.location.href = from || '/admin';
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && (
        <div className="p-3 border border-red-500/50 bg-red-950/30 text-red-300 font-mono text-xs">
          {errorMessage}
        </div>
      )}

      <div>
        <label
          htmlFor="admin-password"
          className="block font-mono text-xs uppercase tracking-wider text-[#C4C7D4] mb-2 font-semibold"
        >
          Master Admin Secret *
        </label>
        <div className="relative">
          <input
            id="admin-password"
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••••••"
            className="w-full px-3.5 py-2.5 border border-[#272A34] bg-[#0C0D10] text-white font-mono text-sm focus:outline-none focus:border-[#C83E1B]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#717482] hover:text-white"
          >
            {showPassword ? '[HIDE]' : '[SHOW]'}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center px-4 py-3 bg-[#C83E1B] text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#E04D26] transition-colors disabled:opacity-50 cursor-pointer"
      >
        {isSubmitting ? 'Verifying Signature...' : 'Enter Engineering Command Center →'}
      </button>
    </form>
  );
}
