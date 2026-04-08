"use client";

import { usePathname } from "next/navigation";
import type { HomePreferences } from "@/visualizer/demo/home/preference";

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
  preferences?: HomePreferences;
};

function buildPageHref(slug: string) {
  return `/editor/${encodeURIComponent(slug)}`;
}

export default function Nav({ logo, pages, cta }: NavProps) {
  const pathname = usePathname();

  return (
    <nav className="sticky top-3 z-20 px-3 sm:top-4 sm:px-4 lg:px-6">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 rounded-[28px] border border-white/10 bg-slate-950/78 px-4 py-3 text-white shadow-[0_24px_60px_rgba(15,23,42,0.24)] backdrop-blur-xl sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-wix-blue)] text-sm font-bold text-white shadow-[0_16px_30px_rgba(56,153,236,0.25)]">
            {logo.slice(0, 1).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold uppercase tracking-[0.22em] text-white/95">
              {logo}
            </p>
            <p className="text-xs text-white/55">Editor preview</p>
          </div>
        </div>

        <div className="hidden flex-1 justify-center lg:flex">
          <div className="flex flex-wrap items-center justify-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
            {pages.map((page) => {
              const href = buildPageHref(page.slug);
              const active = pathname === href;

              return (
                <a
                  key={page.slug}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-white text-slate-950 shadow-sm"
                      : "text-white/75 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {page.title}
                </a>
              );
            })}
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70 sm:inline-flex">
            Live page
          </span>
          {cta ? (
            <a
              href={cta.slug}
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-wix-blue)] px-4 py-2 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(56,153,236,0.24)] transition hover:opacity-90"
            >
              {cta.label}
            </a>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
