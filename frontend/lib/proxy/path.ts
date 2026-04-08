const PROTECTED_PATH_PREFIXES = ['/dashboard', '/setup', '/editor', '/greet'];

export function isProtectedPath(pathname: string) {
  return PROTECTED_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}
