import { preferences as defaultPreferences } from "../preference";
import type { ContactData } from "../data";
import type { ContactPreferences } from "../preference";

export type FooterProps = ContactData["footer"] & {
  preferences?: ContactPreferences;
};

export default function Footer({ text, links, preferences }: FooterProps) {
  const footerTheme = (preferences ?? defaultPreferences).footer;

  return (
    <footer className={`${footerTheme.wrapper} mt-16`}>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 text-sm">
        <p className={footerTheme.text}>{text}</p>
        <div className="flex flex-wrap gap-4">
          {links.map((link) => (
            <a key={link.slug} href={link.slug} className={footerTheme.link}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
