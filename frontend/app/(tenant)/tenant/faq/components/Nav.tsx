import { preferences as defaultPreferences } from "../preference";
import type { FAQData } from "../data";
import type { FAQPreferences } from "../preference";

export type NavProps = FAQData["nav"] & {
  preferences?: FAQPreferences;
};

export default function Nav({ logo, links, preferences }: NavProps) {
  const tokens = preferences ?? defaultPreferences;

  return (
    <nav className={`sticky top-0 z-20 border-b backdrop-blur ${tokens.navigation.wrapper}`}>
      <div className={`${tokens.navigation.inner} gap-4`}>
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">{logo}</span>
        <div className="flex flex-1 flex-wrap items-center gap-3 text-sm font-medium">
          {links.map((link) => (
            <a key={link.slug} href={link.slug} className={tokens.navigation.link}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
