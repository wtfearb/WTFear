import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuditLeads, updateAuditLead, deleteAuditLead } from '@/lib/db';

export async function GET(): Promise<NextResponse> {
  try {
    const leads = await getAuditLeads(100);
    return NextResponse.json({ leads });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to fetch audit leads' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { id, status, adminNotes } = body;

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Lead id is required' }, { status: 400 });
    }

    const updated = await updateAuditLead(id, {
      status: status || undefined,
      adminNotes: adminNotes !== undefined ? adminNotes : undefined,
    });

    if (!updated) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead: updated });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to update lead' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Lead id is required' }, { status: 400 });
    }

    const deleted = await deleteAuditLead(id);
    return NextResponse.json({ success: deleted });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to delete lead' },
      { status: 500 }
    );
  }
}
