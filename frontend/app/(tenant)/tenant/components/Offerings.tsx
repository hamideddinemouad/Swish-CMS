import { resolveHomeSectionDesign } from "@/lib/home-design-presets";
import { preferences as defaultPreferences } from "@/visualizer/demo/home/preference";
import type { HomeData } from "@/visualizer/demo/home/data";
import type { HomePreferences } from "@/visualizer/demo/home/preference";

export type OfferingsProps = HomeData["offerings"] & {
  preferences?: HomePreferences;
};

export default function Offerings({ title, description, tiles, preferences }: OfferingsProps) {
  const design = resolveHomeSectionDesign(preferences ?? defaultPreferences, "offerings");

  return (
    <section className="py-8">
      <div className={`${design.color.sectionShellClass} space-y-6`}>
        <div className="space-y-1">
          <p className={`text-xs font-semibold uppercase tracking-[0.4em] ${design.color.sectionEyebrowClass}`}>Offerings</p>
          <h2
            className={`${design.displaySize.sectionTitleClass} font-semibold ${design.color.sectionHeadingClass}`}
            style={{ fontFamily: design.headingFont.fontFamily }}
          >
            {title}
          </h2>
          <p className={`${design.bodySize.bodyClass} ${design.color.bodyTextClass}`} style={{ fontFamily: design.bodyFont.fontFamily }}>
            {description}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {tiles.map((tile) => (
            <article key={tile.slug} className={design.color.cardCompactClass}>
              <h3 className={`text-xl font-semibold ${design.color.sectionHeadingClass}`} style={{ fontFamily: design.headingFont.fontFamily }}>
                {tile.title}
              </h3>
              <p className={`${design.bodySize.bodyClass} ${design.color.bodyTextClass}`} style={{ fontFamily: design.bodyFont.fontFamily }}>
                {tile.detail}
              </p>
              <span className={`text-xs font-semibold uppercase tracking-[0.3em] ${design.color.linkAccentClass}`}>
                {tile.action}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
