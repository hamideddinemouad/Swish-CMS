import { preferences as defaultPreferences } from "@/visualizer/demo/categories/preference";
import {
  resolvePageComponentDesign,
  resolvePageComponentPreferences,
} from "@/lib/page-design-presets";
import type { CategoriesData } from "@/visualizer/demo/categories/data";
import type { CategoriesPreferences } from "@/visualizer/demo/categories/preference";

export type CategoryGridProps = CategoriesData["categoryGrid"] & {
  preferences?: CategoriesPreferences;
};

export default function CategoryGrid({ title, description, categories, preferences }: CategoryGridProps) {
  const rawPreferences = preferences ?? defaultPreferences;
  const tokens = resolvePageComponentPreferences(rawPreferences, "categoryGrid");
  const design = resolvePageComponentDesign(rawPreferences, "categoryGrid");

  return (
    <section className="space-y-6 py-6">
      <div className="space-y-1">
        <p className={`text-xs font-semibold uppercase tracking-[0.4em] ${design.color.accentClass}`}>Tracks</p>
        <h2 className={`${tokens.typography.headingSizes.h2} font-semibold ${tokens.theme.text.primary}`} style={{ fontFamily: design.headingFont.fontFamily }}>{title}</h2>
        <p className={`${tokens.typography.smallSize} ${tokens.theme.text.secondary}`} style={{ fontFamily: design.bodyFont.fontFamily }}>{description}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {categories.map((category) => (
          <div
            key={category.slug}
            className={`${tokens.cards.base} relative overflow-hidden rounded-3xl bg-gradient-to-br ${category.accent}`}
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-white" style={{ fontFamily: design.headingFont.fontFamily }}>{category.name}</h3>
              <p className={`${tokens.typography.smallSize} text-white/80`} style={{ fontFamily: design.bodyFont.fontFamily }}>{category.excerpt}</p>
            </div>
            <div className="absolute -right-10 -bottom-10 h-48 w-48 bg-white/30 blur-3xl" />
            <img
              src={category.image}
              alt={category.name}
              className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-80"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
