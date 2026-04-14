import { preferences as defaultPreferences } from "@/visualizer/demo/home/preference";
import { resolveHomeSectionDesign } from "@/lib/home-design-presets";
import type { HomeData } from "@/visualizer/demo/home/data";
import type { HomePreferences } from "@/visualizer/demo/home/preference";

export type FooterProps = HomeData["footer"] & {
  preferences?: HomePreferences;
};

export default function Footer({ text, links, preferences }: FooterProps) {
  const footerTheme = (preferences ?? defaultPreferences).footer;
  const design = resolveHomeSectionDesign(preferences ?? defaultPreferences, "footer");

  return (
    <footer className={`${footerTheme.wrapper} ${design.color.footerWrapperClass} mt-16`}>
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 text-sm sm:px-6 sm:flex-row sm:justify-between lg:px-8">
        <p className={design.color.footerTextClass} style={{ fontFamily: design.bodyFont.fontFamily }}>
          {text}
        </p>
        <div className="flex flex-wrap gap-4">
          {links.map((link) => (
            <a key={link.slug} href={link.slug} className={design.color.footerLinkClass}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
