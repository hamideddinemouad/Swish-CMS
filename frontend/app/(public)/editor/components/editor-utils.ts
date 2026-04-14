export function titleize(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function formatFieldLabel(path: string, key: string) {
  const segments = path.split(".").filter(Boolean).map((segment) =>
    /^\d+$/.test(segment) ? `Item ${Number(segment) + 1}` : titleize(segment),
  );

  return [...segments, titleize(key)].join(" / ");
}

import type { RefObject } from "react";

export function setDeepValue<T>(value: T, path: string, next: unknown): T {
  const parts = path.split(".").filter(Boolean);

  if (parts.length === 0) {
    return next as T;
  }

  return updateNode(value, parts, next) as T;
}

function updateNode(node: unknown, parts: string[], next: unknown): unknown {
  if (parts.length === 0) {
    return next;
  }

  const [head, ...rest] = parts;

  if (Array.isArray(node)) {
    const index = Number(head);
    const clone = [...node];
    clone[index] = updateNode(clone[index], rest, next);
    return clone;
  }

  const clone =
    node && typeof node === "object" ? { ...(node as Record<string, unknown>) } : {};

  clone[head] = updateNode((clone as Record<string, unknown>)[head], rest, next);
  return clone;
}

export function scrollPreviewToSection(
  previewRef: RefObject<HTMLDivElement | null>,
  section: string,
) {
  previewRef.current
    ?.querySelector<HTMLElement>(`[data-editor-section="${section}"]`)
    ?.scrollIntoView({ behavior: "smooth", block: "center" });
}
