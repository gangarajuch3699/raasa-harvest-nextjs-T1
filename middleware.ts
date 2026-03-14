// // middleware.ts  (project root)
// // ─────────────────────────────────────────────────────────────────────────────
// // Edge Middleware — runs before every matched request.
// // Protects /profile and /checkout by redirecting unauthenticated users.
// //
// // NOTE: Full Firebase Admin SDK cannot run at the Edge (no Node.js APIs).
// // We do a lightweight cookie presence check here; actual token verification
// // happens inside the protected page's Server Component or Route Handler.
// // ─────────────────────────────────────────────────────────────────────────────

// import { NextRequest, NextResponse } from 'next/server';

// // Routes that require a logged-in session
// const PROTECTED_PATHS = ['/profile', '/checkout', '/orders'];

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   const isProtected = PROTECTED_PATHS.some((path) =>
//     pathname.startsWith(path)
//   );

//   if (!isProtected) {
//     return NextResponse.next();
//   }

//   // Check for session cookie presence (lightweight edge check)
//   const sessionCookie = request.cookies.get('rh_session');

//   if (!sessionCookie?.value) {
//     // Redirect to login, preserving the intended destination
//     const loginUrl = new URL('/login', request.url);
//     loginUrl.searchParams.set('redirectTo', pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   // Cookie exists — allow through. Server Component will do full verification.
//   return NextResponse.next();
// }

// export const config = {
//   // Only run middleware on these paths (skip _next, static files, api, etc.)
//   matcher: [
//     '/profile/:path*',
//     '/checkout/:path*',
//     '/orders/:path*',
//   ],
// };


import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_PATHS = ['/profile', '/checkout', '/orders'];
const AUTH_PATHS = ['/login', '/signup'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('rh_session');

  const isProtected = PROTECTED_PATHS.some((path) => pathname.startsWith(path));
  const isAuthPage = AUTH_PATHS.some((path) => pathname.startsWith(path));

  // 1. Redirect to Login if accessing protected page without session
  if (isProtected && !sessionCookie?.value) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Redirect to Profile if accessing Login while already authenticated
  if (isAuthPage && sessionCookie?.value) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|_static|favicon.ico|sitemap.xml|robots.txt).*)'],
};
