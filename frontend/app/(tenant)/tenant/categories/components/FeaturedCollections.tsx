import type { CategoriesData } from "@/visualizer/demo/categories/data";
import { preferences as defaultPreferences } from "@/visualizer/demo/categories/preference";
import {
  resolvePageComponentDesign,
  resolvePageComponentPreferences,
} from "@/lib/page-design-presets";
import type { CategoriesPreferences } from "@/visualizer/demo/categories/preference";

export type FeaturedCollectionsProps = CategoriesData["featuredCollections"] & {
  preferences?: CategoriesPreferences;
};

export default function FeaturedCollections({ title, collections, preferences }: FeaturedCollectionsProps) {
  const rawPreferences = preferences ?? defaultPreferences;
  const tokens = resolvePageComponentPreferences(rawPreferences, "featuredCollections");
  const design = resolvePageComponentDesign(rawPreferences, "featuredCollections");
  return (
    <section className="space-y-6 py-6">
      <div className="space-y-1">
        <p className={`text-xs font-semibold uppercase tracking-[0.4em] ${design.color.mutedClass}`}>Curations</p>
        <h2 className={`${tokens.typography.headingSizes.h2} font-semibold ${tokens.theme.text.primary}`} style={{ fontFamily: design.headingFont.fontFamily }}>{title}</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {collections.map((collection) => (
          <article
            key={collection.slug}
            className={tokens.cards.compact}
          >
            <div className={`text-sm font-semibold uppercase tracking-[0.3em] ${design.color.accentClass}`}>
              {collection.curator}
            </div>
            <h3 className={`mt-3 text-2xl font-semibold ${tokens.theme.text.primary}`} style={{ fontFamily: design.headingFont.fontFamily }}>{collection.title}</h3>
            <p className={`mt-2 ${tokens.typography.smallSize} ${tokens.theme.text.secondary}`} style={{ fontFamily: design.bodyFont.fontFamily }}>{collection.highlight}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
