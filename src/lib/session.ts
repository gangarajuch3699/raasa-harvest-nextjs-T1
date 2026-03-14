// lib/session.ts
// ─────────────────────────────────────────────────────────────────────────────
// Lightweight session helpers using HTTP-only cookies.
// Replaces the old localStorage approach for production security.
// ─────────────────────────────────────────────────────────────────────────────

import 'server-only';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase-admin';

const SESSION_COOKIE_NAME = 'rh_session';
// 5 days in milliseconds
const SESSION_DURATION_MS = 5 * 24 * 60 * 60 * 1000;

// ── Create a session cookie from a Firebase ID token ─────────────────────
export async function createSessionCookie(idToken: string): Promise<void> {
  const sessionCookie = await adminAuth.createSessionCookie(idToken, {
    expiresIn: SESSION_DURATION_MS,
  });

  cookies().set(SESSION_COOKIE_NAME, sessionCookie, {
    httpOnly: true,               // Not accessible via JS — blocks XSS theft
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION_MS / 1000,
    path: '/',
  });
}

// ── Verify the session cookie and return the decoded token ───────────────
export async function verifySession() {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) return null;

  try {
    const decodedToken = await adminAuth.verifySessionCookie(
      sessionCookie,
      true // check for revocation
    );
    return decodedToken;
  } catch {
    return null;
  }
}

// ── Destroy the session cookie (logout) ──────────────────────────────────
export async function destroySession(): Promise<void> {
  cookies().delete(SESSION_COOKIE_NAME);
}

// ── Get the current user's UID (or null) ─────────────────────────────────
export async function getCurrentUserId(): Promise<string | null> {
  const session = await verifySession();
  return session?.uid ?? null;
}
