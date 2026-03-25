import type { NextRequest, NextResponse } from 'next/server';

export const ACCESS_TOKEN_COOKIE_NAME = 'accessToken';
export const REFRESH_TOKEN_COOKIE_NAME = 'refreshToken';

export function getAccessTokenCookie(request: NextRequest): string | undefined {
  return request.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
}

export function getRefreshTokenCookie(request: NextRequest): string | undefined {
  return request.cookies.get(REFRESH_TOKEN_COOKIE_NAME)?.value;
}

export function clearAuthCookies(response: NextResponse): NextResponse {
  response.cookies.delete({ name: ACCESS_TOKEN_COOKIE_NAME, path: '/' });
  response.cookies.delete({ name: REFRESH_TOKEN_COOKIE_NAME, path: '/' });

  return response;
}
