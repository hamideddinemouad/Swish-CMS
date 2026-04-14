import { resolveHomeSectionDesign } from "@/lib/home-design-presets";
import { preferences as defaultPreferences } from "@/visualizer/demo/home/preference";
import type { HomeData } from "@/visualizer/demo/home/data";
import type { HomePreferences } from "@/visualizer/demo/home/preference";

export type NewsletterProps = HomeData["newsletter"] & {
  preferences?: HomePreferences;
};

export default function Newsletter({ heading, body, ctaText, ctaLink, preferences }: NewsletterProps) {
  const design = resolveHomeSectionDesign(preferences ?? defaultPreferences, "newsletter");

  return (
    <section className={`space-y-4 ${design.color.newsletterShellClass}`}>
      <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${design.color.sectionEyebrowClass}`}>Newsletter</p>
      <h2
        className={`${design.displaySize.sectionTitleClass} font-semibold ${design.color.sectionHeadingClass}`}
        style={{ fontFamily: design.headingFont.fontFamily }}
      >
        {heading}
      </h2>
      <p className={`${design.bodySize.bodyClass} ${design.color.newsletterBodyClass}`} style={{ fontFamily: design.bodyFont.fontFamily }}>
        {body}
      </p>
      <a
        href={ctaLink}
        className={design.color.newsletterButtonClass}
      >
        {ctaText}
      </a>
    </section>
  );
}
