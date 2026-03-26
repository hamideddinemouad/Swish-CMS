import type { CSSProperties } from "react";
import { preferences as defaultPreferences } from "../preference";
import type { CategoriesData } from "../data";
import type { CategoriesPreferences } from "../preference";

export type NavProps = CategoriesData["nav"] & {
  preferences?: CategoriesPreferences;
};

export default function Nav({ logo, links, preferences }: NavProps) {
  const tokens = preferences ?? defaultPreferences;
  const style = {
    backgroundColor: "rgba(255,255,255,0.9)",
  } satisfies CSSProperties;

  return (
    <nav className={`sticky top-0 z-20 border-b backdrop-blur ${tokens.navigation.wrapper}`} style={style}>
      <div className={tokens.navigation.inner}>
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">{logo}</span>
        <div className="flex flex-1 flex-wrap items-center justify-center gap-3">
          {links.map((linkItem) => (
            <a key={linkItem.slug} href={linkItem.slug} className={tokens.navigation.link}>
              {linkItem.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
