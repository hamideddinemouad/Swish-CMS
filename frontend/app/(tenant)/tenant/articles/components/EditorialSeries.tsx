import type { ArticlesData } from "@/visualizer/demo/articles/data";
import { preferences as defaultPreferences } from "@/visualizer/demo/articles/preference";
import {
  resolvePageComponentDesign,
  resolvePageComponentPreferences,
} from "@/lib/page-design-presets";
import type { ArticlesPreferences } from "@/visualizer/demo/articles/preference";

export type EditorialSeriesProps = ArticlesData["editorialSeries"] & {
  preferences?: ArticlesPreferences;
};

export default function EditorialSeries({ title, description, focuses, preferences }: EditorialSeriesProps) {
  const rawPreferences = preferences ?? defaultPreferences;
  const tokens = resolvePageComponentPreferences(rawPreferences, "editorialSeries");
  const design = resolvePageComponentDesign(rawPreferences, "editorialSeries");
  return (
    <section className="space-y-6 py-6">
      <div className="space-y-1">
        <p className={`text-xs font-semibold uppercase tracking-[0.4em] ${design.color.accentClass}`}>Series</p>
        <h2 className={`${tokens.typography.headingSizes.h2} font-semibold ${tokens.theme.text.primary}`} style={{ fontFamily: design.headingFont.fontFamily }}>{title}</h2>
        <p className={`${tokens.typography.smallSize} ${tokens.theme.text.secondary}`} style={{ fontFamily: design.bodyFont.fontFamily }}>{description}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {focuses.map((focus) => (
          <article key={focus.name} className={tokens.cards.compact}>
            <p className={`text-sm font-semibold ${design.color.accentClass}`} style={{ fontFamily: design.headingFont.fontFamily }}>{focus.name}</p>
            <p className={`mt-3 ${tokens.typography.smallSize} ${tokens.theme.text.secondary}`} style={{ fontFamily: design.bodyFont.fontFamily }}>{focus.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
