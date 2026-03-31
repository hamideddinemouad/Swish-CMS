"use client";

import type { CSSProperties } from "react";
import { preferences as defaultPreferences } from "@/visualizer/demo/home/preference";
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

export default function Nav({ logo, pages, cta, preferences }: NavProps) {
  const tokens = preferences ?? defaultPreferences;
  const style = {
    backgroundColor: "rgba(15, 23, 42, 0.9)",
  } satisfies CSSProperties;

  return (
    <nav className={`sticky top-0 z-20 border-b ${tokens.navigation.wrapper}`} style={style}>
      <div className={tokens.navigation.inner}>
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">{logo}</span>
        <div className="flex flex-1 items-center justify-center gap-4 text-sm font-medium">
          {pages.map((page) => (
            <a key={page.slug} href={buildPageHref(page.slug)} className={tokens.navigation.link}>
              {page.title}
            </a>
          ))}
        </div>
        {cta ? (
          <a href={cta.slug} className={tokens.buttons.primary}>
            {cta.label}
          </a>
        ) : null}
      </div>
    </nav>
  );
}
