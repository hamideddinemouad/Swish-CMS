const PROTECTED_PATH_PREFIXES = ['/dashboard', '/setup', '/editor'];

export function isProtectedPath(pathname: string) {
  return PROTECTED_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}
