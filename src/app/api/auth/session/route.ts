// src/app/api/auth/session/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createSession, deleteSession } from '@/lib/session';

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();
    if (!idToken) return NextResponse.json({ error: 'idToken required' }, { status: 400 });
    await createSession(idToken);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[session] POST error:', err);
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}

export async function DELETE() {
  await deleteSession();
  return NextResponse.json({ ok: true });
}
