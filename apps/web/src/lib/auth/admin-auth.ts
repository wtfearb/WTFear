/**
 * @file Admin Authentication & Token Verification
 * @description Edge-compatible cryptographic token generation and verification using Web Crypto API.
 */

export const ADMIN_COOKIE_NAME = 'wtfear_admin_session';
export const DEFAULT_DEV_ADMIN_PASSWORD = 'wtfear-admin-2026';

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || DEFAULT_DEV_ADMIN_PASSWORD;
}

export function isCustomPasswordConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.trim().length > 0);
}

export async function createAdminToken(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const timestamp = Date.now().toString();
  const data = encoder.encode(`${timestamp}:${password}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return `${timestamp}.${hashHex}`;
}

export async function verifyAdminToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [timestampStr, expectedHash] = parts;
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  // Session token validity: 7 days
  const now = Date.now();
  const maxAgeMs = 7 * 24 * 60 * 60 * 1000;
  if (now - timestamp > maxAgeMs || timestamp > now + 60000) return false;

  const password = getAdminPassword();
  const encoder = new TextEncoder();
  const data = encoder.encode(`${timestampStr}:${password}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

  return hashHex === expectedHash;
}
