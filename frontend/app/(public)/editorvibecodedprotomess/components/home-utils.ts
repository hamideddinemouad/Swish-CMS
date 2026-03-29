export type DraftKind = "content" | "preference";

const previewSections = new Set([
  "nav",
  "hero",
  "featuredStories",
  "offerings",
  "testimonials",
  "newsletter",
  "footer",
]);

export function setAtPath<T>(value: T, path: string, next: unknown): T {
  return updateNode(value, path.split(".").filter(Boolean), next) as T;
}

function updateNode(node: unknown, parts: string[], next: unknown): unknown {
  if (parts.length === 0) return next;

  const [head, ...rest] = parts;

  if (Array.isArray(node)) {
    const index = Number(head);
    const clone = [...node];
    clone[index] = updateNode(clone[index], rest, next);
    return clone;
  }

  const clone = node && typeof node === "object" ? { ...(node as Record<string, unknown>) } : {};
  clone[head] = updateNode((clone as Record<string, unknown>)[head], rest, next);
  return clone;
}

export function sectionForPath(kind: DraftKind, path: string) {
  const root = path.split(".")[0];
  if (kind === "content" && previewSections.has(root)) return root;
  if (kind === "preference") {
    if (root === "navigation") return "nav";
    if (root === "hero" || root === "footer") return root;
  }
  return "preview";
}

export function titleize(value: string) {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
