import { preferences as defaultPreferences } from "@/visualizer/demo/articles/preference";
import type { ArticlesData } from "@/visualizer/demo/articles/data";
import type { ArticlesPreferences } from "@/visualizer/demo/articles/preference";

export type FooterProps = ArticlesData["footer"] & {
  preferences?: ArticlesPreferences;
};

export default function Footer({ text, links, preferences }: FooterProps) {
  const footerTheme = (preferences ?? defaultPreferences).footer;

  return (
    <footer className={`${footerTheme.wrapper} mt-16`}>
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between">
        <p className={footerTheme.text}>{text}</p>
        <div className="flex flex-wrap justify-center gap-4">
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
