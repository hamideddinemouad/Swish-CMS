import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAccessToken } from '@/lib/proxy/auth';
import {
  clearAuthCookies,
  getAccessTokenCookie,
  getRefreshTokenCookie,
} from '@/lib/proxy/cookies';
import { buildTenantPath, extractPageName } from '@/lib/proxy/page';
import { extractSubdomain } from '@/lib/proxy/subdomain';
import { isProtectedPath } from '@/lib/proxy/path';

export async function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const pathname = request.nextUrl.pathname;
  const subdomain = extractSubdomain(request);

  if (pathname.startsWith('/api/')) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  if (subdomain) {
    if (pathname === '/') {
      requestHeaders.set('x-subdomain', subdomain);
      requestHeaders.set('x-page', "/");
      return NextResponse.rewrite(new URL('/tenant', request.url), {
        request: {
          headers: requestHeaders,
        },
      });
    }
    const pageName = extractPageName(pathname);
    requestHeaders.set('x-subdomain', subdomain);
    requestHeaders.set('x-page', pageName as string);
    

    // console.log("subdomain proxy", subdomain);

    return NextResponse.rewrite(new URL(buildTenantPath(pathname), request.url), {
      request: {
        headers: requestHeaders,
      },
    });
  }

  if (!isProtectedPath(pathname)) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  const accessToken = getAccessTokenCookie(request);
  const refreshToken = getRefreshTokenCookie(request);

  if (accessToken && (await verifyAccessToken(accessToken))) {
    return NextResponse.next();
  }

  if (refreshToken) {
    const refreshUrl = new URL('/api/auth/refresh', request.url);
    const nextPath = `${request.nextUrl.pathname}${request.nextUrl.search}`;

    refreshUrl.searchParams.set('next', nextPath);

    return NextResponse.redirect(refreshUrl);
  }
  const loginResponse = NextResponse.redirect(new URL('/login', request.url));

  return clearAuthCookies(loginResponse);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
