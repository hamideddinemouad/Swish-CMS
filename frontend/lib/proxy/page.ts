import { env } from '@/lib/env';

export function extractPageName(pathname: string): string | null {
  const segments = pathname.split('/').filter(segment => segment.length > 0);

  if (segments.length === 0) {
    return null;
  }

  return segments[0];
}

export function buildTenantPath(pathname: string): string {
  if (pathname === '/') {
    return '/tenant';
  }

  return `/tenant${pathname}`;
}

export async function pageExists(subdomain: string, pageName: string): Promise<boolean> {
  try {
    const response = await fetch(
      `${env.API}/pages/${encodeURIComponent(subdomain)}/${encodeURIComponent(pageName)}`,
      {
        method: 'HEAD',
      },
    );

    return response.status !== 404;
  } catch {
    return true;
  }
}
