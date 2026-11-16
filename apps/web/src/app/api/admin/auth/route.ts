import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  ADMIN_COOKIE_NAME,
  createAdminToken,
  getAdminPassword,
  isCustomPasswordConfigured,
  verifyAdminToken,
} from '@/lib/auth/admin-auth';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const isAuthenticated = await verifyAdminToken(token);

  return NextResponse.json({
    authenticated: isAuthenticated,
    isCustomPasswordConfigured: isCustomPasswordConfigured(),
  });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json().catch(() => ({}));
    const { password, action } = body;

    if (action === 'logout') {
      const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
      response.cookies.delete(ADMIN_COOKIE_NAME);
      return response;
    }

    const expectedPassword = getAdminPassword();

    if (!password || typeof password !== 'string' || password.trim() !== expectedPassword.trim()) {
      return NextResponse.json(
        { error: 'Invalid password. Access denied.' },
        { status: 401 }
      );
    }

    const token = await createAdminToken(expectedPassword);
    const response = NextResponse.json({
      success: true,
      message: 'Admin authentication verified',
    });

    const isProduction = process.env.NODE_ENV === 'production';

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Authentication failed' },
      { status: 500 }
    );
  }
}

export async function DELETE(): Promise<NextResponse> {
  const response = NextResponse.json({ success: true, message: 'Logged out' });
  response.cookies.delete(ADMIN_COOKIE_NAME);
  return response;
}
