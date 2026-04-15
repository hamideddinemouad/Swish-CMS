"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { EditorMode } from "../../lib/types";
import {
  cx,
  publicBadgeStyles,
  publicSurfaceStyles,
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
    <nav>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
        <div className={cx(publicSurfaceStyles.hero, "px-4 py-4 sm:px-5")}>
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-wix-blue)] text-sm font-bold text-white shadow-[0_16px_30px_rgba(56,153,236,0.22)]">
                {logo.slice(0, 1).toUpperCase()}
              </span>
              <div className="min-w-0 space-y-2">
                <span className={publicBadgeStyles.blue}>Editor pages</span>
                <div>
                  <p className="truncate text-lg font-semibold tracking-[-0.03em] text-[var(--color-ink-900)]">
                    {logo}
                  </p>
                  <p className="text-sm text-[var(--color-ink-500)]">
                    Editing {currentPage} in {mode} mode
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start xl:self-auto">
              <span className={publicBadgeStyles.slate}>Live page preview</span>
            </div>
          </div>

          <div className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
            {pages.map((page) => {
              const href = buildPageHref(page.slug, mode);
              const active = pathname === href;

              return (
                <Link
                  key={page.slug}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cx(
                    "shrink-0 rounded-full border px-4 py-2.5 text-sm font-medium transition motion-reduce:transition-none",
                    active
                      ? "border-[rgb(56_153_236_/_0.18)] bg-[linear-gradient(135deg,#3899ec_0%,#2f7be6_100%)] text-white shadow-[0_16px_30px_-18px_rgba(56,153,236,0.85)]"
                      : "border-white/80 bg-white/86 text-[var(--color-ink-700)] hover:border-slate-200 hover:bg-white",
                  )}
                >
                  {page.title}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex justify-start">
          <div className={cx(publicSurfaceStyles.soft, "w-full p-2 sm:w-auto")}>
            <div className="mb-2 px-3 pt-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-wix-blue)]">
                Editor Mode
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap">
              {MODE_LINKS.map((link) => {
                const href = buildPageHref(currentPage, link.mode);
                const active = mode === link.mode;

                return (
                  <Link
                    key={link.mode}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "rounded-2xl px-4 py-2.5 text-sm font-medium transition motion-reduce:transition-none",
                      active
                        ? "bg-[var(--color-wix-blue)] text-white shadow-[0_14px_28px_rgba(56,153,236,0.22)]"
                        : "bg-white/70 text-[var(--color-ink-700)] hover:bg-[color:rgb(56_153_236_/_0.08)]",
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
    </nav>
  );
}
