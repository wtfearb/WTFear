import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  getPortfolioProjects,
  upsertPortfolioProject,
  deletePortfolioProject,
  getSiteSettings,
  updateSiteSettings,
} from '@/lib/db';

export async function GET(): Promise<NextResponse> {
  try {
    const [projects, settings] = await Promise.all([
      getPortfolioProjects(false),
      getSiteSettings(),
    ]);
    return NextResponse.json({ projects, settings });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { project, settings } = body;

    let updatedSettings = null;
    if (settings) {
      updatedSettings = await updateSiteSettings(settings);
    }

    let savedProject = null;
    if (project) {
      if (!project.title || !project.slug) {
        return NextResponse.json({ error: 'Project title and slug are required' }, { status: 400 });
      }
      savedProject = await upsertPortfolioProject(project);
    }

    return NextResponse.json({
      success: true,
      project: savedProject,
      settings: updatedSettings,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to save project' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Project id is required' }, { status: 400 });
    }

    const deleted = await deletePortfolioProject(id);
    return NextResponse.json({ success: deleted });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to delete project' },
      { status: 500 }
    );
  }
}
