import { preferences as defaultPreferences } from "@/visualizer/demo/home/preference";
import { resolveHomeSectionDesign } from "@/lib/home-design-presets";
import type { HomeData } from "@/visualizer/demo/home/data";
import type { HomePreferences } from "@/visualizer/demo/home/preference";

export type TestimonialsProps = HomeData["testimonials"] & {
  preferences?: HomePreferences;
};

export default function Testimonials({ title, quotes, preferences }: TestimonialsProps) {
  const design = resolveHomeSectionDesign(preferences ?? defaultPreferences, "testimonials");

  return (
    <section className="py-8">
      <div className={`${design.color.sectionShellClass} space-y-6`}>
        <div className="space-y-1">
          <p className={`text-xs font-semibold uppercase tracking-[0.4em] ${design.color.sectionEyebrowClass}`}>Testimonials</p>
          <h2
            className={`${design.displaySize.sectionTitleClass} font-semibold ${design.color.sectionHeadingClass}`}
            style={{ fontFamily: design.headingFont.fontFamily }}
          >
            {title}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {quotes.map((quote) => (
            <article key={quote.name} className={design.color.cardCompactClass}>
              <p className={`text-lg italic ${design.color.bodyTextClass}`} style={{ fontFamily: design.bodyFont.fontFamily }}>
                “{quote.text}”
              </p>
              <p className={`text-sm font-semibold ${design.color.sectionHeadingClass}`} style={{ fontFamily: design.headingFont.fontFamily }}>
                {quote.name}
              </p>
              <p className={`text-xs uppercase tracking-[0.3em] ${design.color.sectionEyebrowClass}`}>
                {quote.role} · {quote.company}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
