'use client';

import React, { useState } from 'react';

export function CopyEmailButton({
  email = 'wtfearb@gmail.com',
}: {
  readonly email?: string;
}): React.ReactElement {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy email', err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="font-mono text-[10px] font-bold px-2.5 py-1 border border-[#E2E2E8] hover:border-[#0A0A0C] rounded-[2px] text-[#3F414A] hover:text-[#0A0A0C] transition-colors cursor-pointer shrink-0"
      aria-label="Copy direct email address"
    >
      {copied ? 'COPIED' : 'COPY'}
    </button>
  );
}
