'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const SESSION_STORAGE_KEY = 'wtfear_session_token';
const ENTRY_PATH_KEY = 'wtfear_entry_path';

export type ActivityEventType =
  | 'page_view'
  | 'blueprint_inspect'
  | 'sandbox_change'
  | 'calculator_change'
  | 'project_click'
  | 'cta_click';

export function getClientSessionToken(): string {
  if (typeof window === 'undefined') return '';
  let token = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (!token) {
    token = `sid_${crypto.randomUUID().replace(/-/g, '')}`;
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, token);
  }
  return token;
}

export function getClientEntryPath(): string {
  if (typeof window === 'undefined') return '/';
  let entry = window.sessionStorage.getItem(ENTRY_PATH_KEY);
  if (!entry) {
    entry = window.location.pathname;
    window.sessionStorage.setItem(ENTRY_PATH_KEY, entry);
  }
  return entry;
}

function detectDeviceType(): string {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width < 640) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

/**
 * Global client-side interaction dispatcher.
 * Safely dispatches telemetry in background without blocking UI or throwing.
 */
export async function trackClientEvent(
  eventType: ActivityEventType,
  targetLabel?: string,
  payload?: Record<string, unknown>
): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    const sessionToken = getClientSessionToken();
    const entryPath = getClientEntryPath();
    const currentPath = window.location.pathname;
    const referrer = document.referrer || undefined;
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source') || undefined;

    const body = {
      sessionToken,
      entryPath,
      currentPath,
      referrer,
      utmSource,
      deviceType: detectDeviceType(),
      event: {
        eventType,
        targetLabel,
        payloadJson: payload,
      },
    };

    if ('sendBeacon' in navigator && eventType !== 'page_view') {
      const blob = new Blob([JSON.stringify(body)], { type: 'application/json' });
      navigator.sendBeacon('/api/telemetry', blob);
    } else {
      await fetch('/api/telemetry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        keepalive: true,
      });
    }
  } catch (err) {
    // Fail silently in telemetry to protect user experience
    console.debug('[Telemetry] Event recording dropped:', err);
  }
}

export function TelemetryTracker(): null {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Prevent duplicate page_view tracking on re-renders for same path
    if (lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;

    // Dispatch page_view event on initial mount and route changes
    trackClientEvent('page_view', `Route: ${pathname}`, {
      title: document.title,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
    });
  }, [pathname]);

  return null;
}
