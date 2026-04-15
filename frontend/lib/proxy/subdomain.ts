import type { NextRequest } from 'next/server';

const RESERVED_SUBDOMAINS = new Set([
  'www',
  'app',
  'api',
  'admin',
  'static',
  'assets',
  'cdn',
  'mail',
]);

export function extractSubdomain(request: NextRequest): string | null {
  const host = request.headers.get('host');

  if (!host) {
    throw new Error('Host header is missing.');
  }

  const hostname = host.split(':')[0].toLowerCase();
  const hostnameParts = hostname.split('.');

  if (hostname.endsWith('.vercel.app')) {
    return null;
  }

  if (hostnameParts.length < 3) {
    return null;
  }

  const subdomain = hostnameParts[0];

  if (!subdomain || RESERVED_SUBDOMAINS.has(subdomain)) {
    return null;
  }

  return subdomain;
}
