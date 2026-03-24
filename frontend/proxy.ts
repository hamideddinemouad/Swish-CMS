import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify, type JWTPayload } from 'jose';
import { env } from '@/lib/env';

const ACCESS_TOKEN_COOKIE_NAME = 'accessToken';
const REFRESH_TOKEN_COOKIE_NAME = 'refreshToken';
const ACCESS_TOKEN_SECRET = new TextEncoder().encode(env.AUTH_ACCESS_SECRET_KEY);

type AccessTokenPayload = JWTPayload & {
  type?: string;
};

async function verifyAccessToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify<AccessTokenPayload>(
      token,
      ACCESS_TOKEN_SECRET,
      {
        algorithms: ['HS256'],
      },
    );

    return payload.type === 'access';
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE_NAME)?.value;

  if (accessToken && (await verifyAccessToken(accessToken))) {
    return NextResponse.next();
  }

  if (refreshToken) {
    const refreshUrl = new URL('/api/auth/refresh', request.url);
    const nextPath = `${request.nextUrl.pathname}${request.nextUrl.search}`;

    refreshUrl.searchParams.set('next', nextPath);

    return NextResponse.redirect(refreshUrl);
  }
  console.log("request url = " + request.url)
  const loginResponse = NextResponse.redirect(new URL('/login', request.url));

  loginResponse.cookies.delete({ name: ACCESS_TOKEN_COOKIE_NAME, path: '/' });
  loginResponse.cookies.delete({ name: REFRESH_TOKEN_COOKIE_NAME, path: '/' });

  return loginResponse;
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
