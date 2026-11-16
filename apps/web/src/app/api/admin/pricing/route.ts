import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  getPricingConfigs,
  updatePricingConfig,
  getSiteSettings,
  updateSiteSettings,
} from '@/lib/db';

export async function GET(): Promise<NextResponse> {
  try {
    const [pricing, settings] = await Promise.all([
      getPricingConfigs(false),
      getSiteSettings(),
    ]);
    return NextResponse.json({ pricing, settings });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to fetch pricing configs' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { modelSlug, patch, settingsPatch } = body;

    let updatedSettings = null;
    if (settingsPatch) {
      updatedSettings = await updateSiteSettings(settingsPatch);
    }

    let updatedPricing = null;
    if (modelSlug && patch) {
      updatedPricing = await updatePricingConfig(modelSlug, patch);
    }

    return NextResponse.json({
      success: true,
      pricing: updatedPricing,
      settings: updatedSettings,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to update pricing' },
      { status: 500 }
    );
  }
}
