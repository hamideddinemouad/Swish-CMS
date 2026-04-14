"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { EditorMode } from "../../lib/types";

type AvailablePage = {
  slug: string;
  title: string;
};

type NavAction = {
  label: string;
  slug: string;
};

export type NavProps = {
  logo: string;
  pages: AvailablePage[];
  cta?: NavAction;
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

export default function Nav({ logo, pages, cta, mode, currentPage }: NavProps) {
  const pathname = usePathname();

  return (
    <nav className="sticky top-3 z-20 px-3 sm:top-4 sm:px-4 lg:px-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
        <div className="rounded-[30px] border border-slate-200/80 bg-white/92 px-4 py-4 shadow-[0_18px_50px_rgba(54,54,54,0.08)] backdrop-blur sm:px-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-wix-blue)] text-sm font-bold text-white shadow-[0_16px_30px_rgba(56,153,236,0.22)]">
                {logo.slice(0, 1).toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-ink-900)]">
                  {logo}
                </p>
                <p className="text-xs text-[var(--color-ink-500)]">Editor pages</p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start xl:self-auto">
              <span className="hidden rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-[var(--color-ink-500)] sm:inline-flex">
                Live page
              </span>
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
                  className={`shrink-0 rounded-2xl px-4 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-slate-950 text-white shadow-[0_16px_30px_rgba(15,23,42,0.18)]"
                      : "border border-slate-200 bg-white text-[var(--color-ink-700)] hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {page.title}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex justify-start">
          <div className="w-full rounded-[26px] border border-[color:rgb(56_153_236_/_0.16)] bg-[linear-gradient(180deg,#ffffff_0%,#f6faff_100%)] p-2 shadow-[0_16px_40px_rgb(56_153_236_/_0.08)] sm:w-auto">
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
                    className={`rounded-2xl px-4 py-2.5 text-sm font-medium transition ${
                      active
                        ? "bg-[var(--color-wix-blue)] text-white shadow-[0_14px_28px_rgba(56,153,236,0.22)]"
                        : "bg-transparent text-[var(--color-ink-700)] hover:bg-[color:rgb(56_153_236_/_0.08)]"
                    }`}
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
