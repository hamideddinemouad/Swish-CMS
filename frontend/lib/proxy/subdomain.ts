import type { NextRequest } from 'next/server';

function getRequestHost(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-host') ??
    request.headers.get('host') ??
    request.nextUrl.host
  );
}

export function extractSubdomain(request: NextRequest): string | null {
  const host = getRequestHost(request);
  const hostname = host.split(':')[0];

  if (hostname === 'localhost' || !hostname.includes('.')) {
    return null;
  }

  return hostname.split('.')[0] ?? null;
}



