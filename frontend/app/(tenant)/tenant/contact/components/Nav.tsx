import { preferences as defaultPreferences } from "../preference";
import type { ContactData } from "../data";
import type { ContactPreferences } from "../preference";

export type NavProps = ContactData["nav"] & {
  preferences?: ContactPreferences;
};

export default function Nav({ logo, links, cta, preferences }: NavProps) {
  const tokens = preferences ?? defaultPreferences;

  return (
    <nav className={`sticky top-0 z-20 border-b ${tokens.navigation.wrapper}`}>
      <div className={tokens.navigation.inner}>
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
          {logo}
        </span>
        <div className="flex flex-1 items-center justify-center gap-4 text-sm font-medium">
          {links.map((link) => (
            <a key={link.slug} href={link.slug} className={tokens.navigation.link}>
              {link.label}
            </a>
          ))}
        </div>
        <a href={cta.slug} className={`${tokens.buttons.secondary} text-sm font-semibold`}>
          {cta.label}
        </a>
      </div>
    </nav>
  );
}
