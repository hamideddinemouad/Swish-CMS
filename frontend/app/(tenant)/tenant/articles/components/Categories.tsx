import type { ArticlesData } from "@/visualizer/demo/articles/data";
import { preferences as defaultPreferences } from "@/visualizer/demo/articles/preference";
import {
  resolvePageComponentDesign,
  resolvePageComponentPreferences,
} from "@/lib/page-design-presets";
import type { ArticlesPreferences } from "@/visualizer/demo/articles/preference";

export type CategoriesProps = ArticlesData["categories"] & {
  preferences?: ArticlesPreferences;
};

export default function Categories({ title, items, preferences }: CategoriesProps) {
  const rawPreferences = preferences ?? defaultPreferences;
  const tokens = resolvePageComponentPreferences(rawPreferences, "categories");
  const design = resolvePageComponentDesign(rawPreferences, "categories");
  return (
    <section className="space-y-6 py-6">
      <div className="space-y-1">
        <p className={`text-xs font-semibold uppercase tracking-[0.4em] ${design.color.accentClass}`}>Topics</p>
        <h2 className={`${tokens.typography.headingSizes.h2} font-semibold ${tokens.theme.text.primary}`} style={{ fontFamily: design.headingFont.fontFamily }}>{title}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.slug}
            className={`${tokens.cards.compact} px-5 py-6 text-sm font-semibold uppercase tracking-[0.3em] ${tokens.theme.text.primary} transition ${design.color.linkAccentClass}`}
            style={{ fontFamily: design.headingFont.fontFamily }}
          >
            {item.name}
          </div>
        ))}
      </div>
    </section>
  );
}
