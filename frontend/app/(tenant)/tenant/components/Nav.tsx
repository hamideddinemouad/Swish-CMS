"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { preferences as defaultPreferences } from "@/visualizer/demo/home/preference";
import type { HomeData } from "@/visualizer/demo/home/data";
import type { HomePreferences } from "@/visualizer/demo/home/preference";

type AvailablePage = {
  slug: string;
  title: string;
};

export type NavProps = Pick<HomeData["nav"], "logo" | "cta"> & {
  pages: AvailablePage[];
  preferences?: HomePreferences;
};

function buildPageHref(slug: string) {
  const normalized = slug.replace(/^\/+|\/+$/g, "");

  if (normalized === "" || normalized === "home") {
    return "/";
  }

  return `/${normalized}`;
}

function resolveHref(href: string) {
  if (
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    /^(https?:)?\/\//.test(href)
  ) {
    return href;
  }

  return buildPageHref(href);
}

function isExternalHref(href: string) {
  return /^(https?:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

function shouldOpenInNewTab(href: string) {
  return /^(https?:)?\/\//.test(href);
}

function isPathActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/" || pathname === "/tenant";
  }

  return pathname === href || pathname === `/tenant${href}`;
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export default function Nav({ logo, pages, cta, preferences }: NavProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tokens = preferences ?? defaultPreferences;

  const normalizedPages = useMemo(
    () =>
      pages.map((page) => ({
        ...page,
        href: buildPageHref(page.slug),
      })),
    [pages],
  );

  const activePageLabel =
    normalizedPages.find((page) => isPathActive(pathname, page.href))?.title ?? "Navigation";

  const ctaHref = resolveHref(cta.slug);
  const ctaIsExternal = isExternalHref(ctaHref);
  const ctaOpenInNewTab = shouldOpenInNewTab(ctaHref);

  return (
    <nav className={`sticky top-0 z-30 ${tokens.navigation.wrapper}`}>
      <div className={`${tokens.navigation.inner} gap-4`}>
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" className="min-w-0" onClick={() => setIsMenuOpen(false)}>
            <span className={`block truncate text-sm font-semibold uppercase tracking-[0.22em] ${tokens.theme.colorScheme.accent}`}>
              {logo}
            </span>
            <span className="mt-1 block truncate text-xs font-medium text-slate-400 md:hidden">
              {activePageLabel}
            </span>
          </Link>
        </div>

        <div className="hidden flex-1 items-center justify-center gap-3 md:flex lg:gap-4">
          {normalizedPages.map((page) => {
            const active = isPathActive(pathname, page.href);

            return (
              <Link
                key={page.slug}
                href={page.href}
                aria-current={active ? "page" : undefined}
                className={active ? tokens.navigation.linkActive : tokens.navigation.link}
              >
                {page.title}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:block">
          {ctaIsExternal ? (
            <a
              href={ctaHref}
              className={tokens.buttons.primary}
              target={ctaOpenInNewTab ? "_blank" : undefined}
              rel={ctaOpenInNewTab ? "noreferrer" : undefined}
            >
              {cta.label}
            </a>
          ) : (
            <Link href={ctaHref} className={tokens.buttons.primary}>
              {cta.label}
            </Link>
          )}
        </div>

        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="tenant-mobile-nav"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsMenuOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/6 text-white transition hover:bg-white/10 md:hidden"
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {isMenuOpen ? (
        <div id="tenant-mobile-nav" className="border-t border-white/10 md:hidden">
          <div className={`${tokens.layout.container} pb-4`}>
            <div className="rounded-[28px] border border-white/12 bg-white/6 p-3 shadow-[0_24px_60px_-34px_rgba(2,6,23,0.7)] backdrop-blur">
              <div className="mb-3 flex items-center justify-between gap-3 px-2">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Pages
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">{activePageLabel}</p>
                </div>
                <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">
                  {normalizedPages.length} pages
                </span>
              </div>

              <div className="space-y-1.5">
                {normalizedPages.map((page) => {
                  const active = isPathActive(pathname, page.href);

                  return (
                    <Link
                      key={page.slug}
                      href={page.href}
                      onClick={() => setIsMenuOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between rounded-[22px] px-4 py-3 text-sm font-medium transition ${
                        active
                          ? "bg-white text-slate-950 shadow-[0_16px_32px_-20px_rgba(255,255,255,0.42)]"
                          : "bg-white/6 text-slate-100 hover:bg-white/10"
                      }`}
                    >
                      <span>{page.title}</span>
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          active ? "bg-emerald-500" : "bg-slate-500"
                        }`}
                      />
                    </Link>
                  );
                })}
              </div>

              <div className="mt-3 border-t border-white/10 pt-3">
                {ctaIsExternal ? (
                  <a
                    href={ctaHref}
                    className={`${tokens.buttons.primary} w-full`}
                    onClick={() => setIsMenuOpen(false)}
                    target={ctaOpenInNewTab ? "_blank" : undefined}
                    rel={ctaOpenInNewTab ? "noreferrer" : undefined}
                  >
                    {cta.label}
                  </a>
                ) : (
                  <Link
                    href={ctaHref}
                    className={`${tokens.buttons.primary} w-full`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {cta.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
