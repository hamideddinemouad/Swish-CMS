import type { CSSProperties } from "react";
import { preferences as defaultPreferences } from "../preference";
import type { ArticlesData } from "../data";
import type { ArticlesPreferences } from "../preference";

export type NavProps = ArticlesData["nav"] & {
  preferences?: ArticlesPreferences;
};

export default function Nav({ logo, links, cta, preferences }: NavProps) {
  const tokens = preferences ?? defaultPreferences;
  const style = {
    backgroundColor: "rgba(15, 23, 42, 0.92)",
  } satisfies CSSProperties;

  return (
    <nav className={`sticky top-0 z-20 border-b ${tokens.navigation.wrapper}`} style={style}>
      <div className={tokens.navigation.inner}>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
            {logo}
          </span>
        </div>
        <div className="flex flex-1 flex-wrap items-center justify-center gap-4 text-sm font-medium">
          {links.map((linkItem) => (
            <a key={linkItem.slug} href={linkItem.slug} className={tokens.navigation.link}>
              {linkItem.label}
            </a>
          ))}
        </div>
        <a href={cta.slug} className={`${tokens.buttons.primary} text-sm font-semibold`}>
          {cta.label}
        </a>
      </div>
    </nav>
  );
}
