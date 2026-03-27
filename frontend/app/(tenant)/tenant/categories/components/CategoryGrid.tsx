import { preferences as defaultPreferences } from "@/visualizer/demo/categories/preference";
import type { CategoriesData } from "@/visualizer/demo/categories/data";
import type { CategoriesPreferences } from "@/visualizer/demo/categories/preference";

export type CategoryGridProps = CategoriesData["categoryGrid"] & {
  preferences?: CategoriesPreferences;
};

export default function CategoryGrid({ title, description, categories, preferences }: CategoryGridProps) {
  const tokens = preferences ?? defaultPreferences;

  return (
    <section className="space-y-6 py-6">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-orange-500">Tracks</p>
        <h2 className="text-3xl font-semibold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {categories.map((category) => (
          <a
            key={category.slug}
            href={category.slug}
            className={`${tokens.cards.base} relative overflow-hidden rounded-3xl bg-gradient-to-br ${category.accent}`}
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-white">{category.name}</h3>
              <p className="text-sm text-white/80">{category.excerpt}</p>
            </div>
            <div className="absolute -right-10 -bottom-10 h-48 w-48 bg-white/30 blur-3xl" />
            <img
              src={category.image}
              alt={category.name}
              className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-80"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
