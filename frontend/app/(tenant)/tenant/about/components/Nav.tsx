import type { CSSProperties } from "react";
import { preferences as defaultPreferences } from "@/visualizer/demo/about/preference";
import type { AboutData } from "@/visualizer/demo/about/data";
import type { AboutPreferences } from "@/visualizer/demo/about/preference";

export type NavProps = AboutData["nav"] & {
  actionLabel?: string;
  actionHref?: string;
  preferences?: AboutPreferences;
};

export default function Nav({
  logo,
  links,
  actionLabel = "Get in touch",
  actionHref = "/contact",
  preferences,
}: NavProps) {
  const tokens = preferences ?? defaultPreferences;
  const { wrapper, inner, link } = tokens.navigation;
  const style = {
    backgroundColor: "rgba(255,255,255,0.85)",
  } satisfies CSSProperties;

  return (
    <nav className={`sticky top-0 z-20 border-b backdrop-blur ${wrapper}`} style={style}>
      <div className={`${inner} flex-wrap items-center gap-4`}>
        <div className="flex flex-1 items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500 text-sm font-bold text-white">
            {logo[0]}
          </span>
          <div>
            <p className="text-sm font-semibold tracking-[0.14em] uppercase text-amber-700">{logo}</p>
            <p className="text-xs text-amber-500/80">About the studio</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
          {links.map((linkItem) => (
            <a key={linkItem.slug} href={linkItem.slug} className={`rounded-full px-3 py-2 ${link}`}>
              {linkItem.label}
            </a>
          ))}
        </div>

        <a
          href={actionHref}
          className="inline-flex items-center justify-center rounded-full border border-amber-500 px-5 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-50"
        >
          {actionLabel}
        </a>
      </div>
    </nav>
  );
}
