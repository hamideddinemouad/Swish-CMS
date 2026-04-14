import { preferences as defaultPreferences } from "@/visualizer/demo/categories/preference";
import {
  resolvePageComponentDesign,
  resolvePageComponentPreferences,
} from "@/lib/page-design-presets";
import type { CategoriesData } from "@/visualizer/demo/categories/data";
import type { CategoriesPreferences } from "@/visualizer/demo/categories/preference";

export type ResourceLinksProps = CategoriesData["resourceLinks"] & {
  preferences?: CategoriesPreferences;
};

export default function ResourceLinks({ title, items, preferences }: ResourceLinksProps) {
  const rawPreferences = preferences ?? defaultPreferences;
  const tokens = resolvePageComponentPreferences(rawPreferences, "resourceLinks");
  const design = resolvePageComponentDesign(rawPreferences, "resourceLinks");

  return (
    <section className="space-y-6 py-6">
      <div className="space-y-1">
        <p className={`text-xs font-semibold uppercase tracking-[0.4em] ${design.color.accentClass}`}>Support</p>
        <h2 className={`${tokens.typography.headingSizes.h2} font-semibold ${tokens.theme.text.primary}`} style={{ fontFamily: design.headingFont.fontFamily }}>{title}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.slug}
            className={`${tokens.cards.compact} flex flex-col gap-2 text-left`}
          >
            <p className={`text-sm font-semibold uppercase tracking-[0.3em] ${design.color.accentClass}`}>{item.label}</p>
            <p className={`text-xs ${tokens.theme.text.secondary}`} style={{ fontFamily: design.bodyFont.fontFamily }}>{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
