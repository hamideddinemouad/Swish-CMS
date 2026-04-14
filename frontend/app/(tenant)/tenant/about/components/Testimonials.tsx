import { preferences as defaultPreferences } from "@/visualizer/demo/about/preference";
import {
  resolvePageComponentDesign,
  resolvePageComponentPreferences,
} from "@/lib/page-design-presets";
import type { AboutData } from "@/visualizer/demo/about/data";
import type { AboutPreferences } from "@/visualizer/demo/about/preference";

export type TestimonialsProps = AboutData["testimonials"] & {
  preferences?: AboutPreferences;
};

export default function Testimonials({ title, quotes, preferences }: TestimonialsProps) {
  const rawPreferences = preferences ?? defaultPreferences;
  const tokens = resolvePageComponentPreferences(rawPreferences, "testimonials");
  const design = resolvePageComponentDesign(rawPreferences, "testimonials");
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className={`text-sm font-semibold uppercase tracking-[0.3em] ${design.color.accentClass}`}>Voices</p>
        <h2 className={`${tokens.typography.headingSizes.h2} font-semibold ${tokens.theme.text.primary}`} style={{ fontFamily: design.headingFont.fontFamily }}>{title}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {quotes.map((quote) => (
          <article
            key={quote.name}
            className={`${tokens.cards.compact} space-y-4`}
          >
            <p className={`text-lg italic ${tokens.theme.text.secondary}`} style={{ fontFamily: design.bodyFont.fontFamily }}>“{quote.text}”</p>
            <div className={`text-sm ${tokens.theme.text.secondary}`} style={{ fontFamily: design.bodyFont.fontFamily }}>
              <p className={`font-semibold ${tokens.theme.text.primary}`} style={{ fontFamily: design.headingFont.fontFamily }}>{quote.name}</p>
              <p className={design.color.accentClass}>
                {quote.role} · {quote.company}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
