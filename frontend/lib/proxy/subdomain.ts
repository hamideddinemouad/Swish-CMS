import type { NextRequest } from 'next/server';


export function extractSubdomain(request: NextRequest): string | null {
  const host = request.headers.get('host');
  if (!host) {
    throw new Error("error occured there is no host ???")
  }

  const hostname = host.split(':')[0];

  if (!hostname.includes('.')) {
    return null;
  }

  const subdomain = hostname.split('.')[0]

  return subdomain;
}


