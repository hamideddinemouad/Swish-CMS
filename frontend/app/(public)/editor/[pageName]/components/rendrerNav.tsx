"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { EditorMode } from "../../lib/types";
import {
  cx,
  editorBadgeStyles,
  editorSurfaceStyles,
} from "../../../shared/public-ui";

type AvailablePage = {
  slug: string;
  title: string;
};

export type NavProps = {
  logo: string;
  pages: AvailablePage[];
  mode: EditorMode;
  currentPage: string;
};

function buildPageHref(slug: string, mode: EditorMode) {
  return `/editor/${encodeURIComponent(slug)}/${mode}`;
}

const MODE_LINKS: Array<{ mode: EditorMode; label: string }> = [
  { mode: "content", label: "Content" },
  { mode: "design", label: "Design" },
  { mode: "structure", label: "Structure" },
];

export default function Nav({ logo, pages, mode, currentPage }: NavProps) {
  const pathname = usePathname();

  return (
    <nav className="mb-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
        <div className={cx(editorSurfaceStyles.header, "px-4 py-4 sm:px-5")}>
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-[var(--color-wix-blue)] text-sm font-bold text-white">
                {logo.slice(0, 1).toUpperCase()}
              </span>
              <div className="min-w-0 space-y-2">
                <span className={editorBadgeStyles.blue}>Editor</span>
                <div>
                  <p className="truncate text-lg font-semibold tracking-[-0.03em] text-[var(--color-ink-900)]">
                    {logo}
                  </p>
                  <p className="text-sm text-[var(--color-ink-500)]">
                    {currentPage} page · {mode} mode
                  </p>
                </div>
              </div>
            </div>

            <span className={editorBadgeStyles.slate}>Live preview synced</span>
          </div>

          <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-500)]">
                Pages
              </p>
              <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
                {pages.map((page) => {
                  const href = buildPageHref(page.slug, mode);
                  const active = pathname === href;

                  return (
                    <Link
                      key={page.slug}
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={cx(
                        "shrink-0 rounded-[14px] border px-4 py-2.5 text-sm font-medium transition-colors duration-200 motion-reduce:transition-none",
                        active
                          ? "border-[rgb(56_153_236_/_0.18)] bg-[rgb(56_153_236_/_0.08)] text-[var(--color-wix-blue)]"
                          : "border-[color:rgb(146_146_146_/_0.14)] bg-white text-[var(--color-ink-700)] hover:border-[rgb(56_153_236_/_0.16)] hover:text-[var(--color-ink-900)]",
                      )}
                    >
                      {page.title}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2 xl:min-w-[20rem]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-500)]">
                Mode
              </p>
              <div className={cx(editorSurfaceStyles.muted, "grid grid-cols-3 gap-1.5 p-1.5")}>
              {MODE_LINKS.map((link) => {
                const href = buildPageHref(currentPage, link.mode);
                const active = mode === link.mode;

                return (
                  <Link
                    key={link.mode}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "flex items-center justify-center rounded-[12px] px-4 py-2.5 text-sm font-medium transition-colors duration-200 motion-reduce:transition-none",
                      active
                        ? "bg-white text-[var(--color-ink-900)] shadow-[0_10px_24px_-18px_rgba(15,23,42,0.28)]"
                        : "text-[var(--color-ink-700)] hover:bg-white/80 hover:text-[var(--color-ink-900)]",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
