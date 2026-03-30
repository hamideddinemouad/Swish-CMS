"use client"
import { HomeData } from "@/visualizer/demo/home/data";
import { HomePreferences } from "@/visualizer/demo/home/preference";
import { CSSProperties } from "react";
import { preferences as defaultPreferences } from "@/visualizer/demo/home/preference";
type AvailablePage = {
  slug: string;
  title: string;
};

export type NavProps = Pick<HomeData["nav"], "logo" | "cta"> & {
  pages: AvailablePage[];
  preferences?: HomePreferences;
};

function buildPageHref(slug: string) {
  return slug === "home" ? "/" : `/${slug}`;
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
        <a href={cta.slug} className={tokens.buttons.primary}>
          {cta.label}
        </a>
      </div>
    </nav>
  );
}