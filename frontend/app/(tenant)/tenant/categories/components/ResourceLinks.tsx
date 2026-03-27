import { preferences as defaultPreferences } from "@/visualizer/demo/categories/preference";
import type { CategoriesData } from "@/visualizer/demo/categories/data";
import type { CategoriesPreferences } from "@/visualizer/demo/categories/preference";

export type ResourceLinksProps = CategoriesData["resourceLinks"] & {
  preferences?: CategoriesPreferences;
};

export default function ResourceLinks({ title, items, preferences }: ResourceLinksProps) {
  const tokens = preferences ?? defaultPreferences;

  return (
    <section className="space-y-6 py-6">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-orange-500">Support</p>
        <h2 className="text-3xl font-semibold text-slate-900">{title}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <a
            key={item.slug}
            href={item.slug}
            className={`${tokens.cards.compact} flex flex-col gap-2 border border-orange-100 bg-white text-left`}
          >
            <p className="text-sm font-semibold text-orange-600 uppercase tracking-[0.3em]">{item.label}</p>
            <p className="text-xs text-slate-500">{item.detail}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
