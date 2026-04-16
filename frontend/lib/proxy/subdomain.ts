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
  'swish',
  'root',
  'support',
  'help',
  'docs',
  'status',
  'login',
  'auth',
  'signup',
  'register',
  'dashboard',
  'portal',
  'account',
  'accounts',
  'billing',
  'payments',
  'checkout',
  'secure',
  'webmail',
  'ftp',
  'smtp',
  'imap',
  'pop',
  'mx',
  'dns',
  'ns1',
  'ns2',
  'dev',
  'test',
  'staging',
  'stage',
  'prod',
  'production',
  'beta',
  'preview',
  'demo',
  'internal',
  'console',
  'manage',
  'management',
  'system',
  'core',
  'proxy',
  'gateway',
  'edge',
  'origin',
  'cache',
  'monitor',
  'metrics',
  'logs',
  'telemetry',
  'analytics',
  'images',
  'media',
  'files',
  'uploads',
  'storage',
  'db',
  'database',
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
