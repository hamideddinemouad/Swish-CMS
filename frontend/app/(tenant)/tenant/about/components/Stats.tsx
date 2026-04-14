import { preferences as defaultPreferences } from "@/visualizer/demo/about/preference";
import {
  resolvePageComponentDesign,
  resolvePageComponentPreferences,
} from "@/lib/page-design-presets";
import type { AboutData } from "@/visualizer/demo/about/data";
import type { AboutPreferences } from "@/visualizer/demo/about/preference";

export type StatsProps = AboutData["stats"] & {
  preferences?: AboutPreferences;
};

export default function Stats({ title, items, preferences }: StatsProps) {
  const rawPreferences = preferences ?? defaultPreferences;
  const tokens = resolvePageComponentPreferences(rawPreferences, "stats");
  const design = resolvePageComponentDesign(rawPreferences, "stats");
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className={`text-sm font-semibold uppercase tracking-[0.3em] ${design.color.accentClass}`}>Proof</p>
        <h2 className={`${tokens.typography.headingSizes.h2} font-semibold ${tokens.theme.text.primary}`} style={{ fontFamily: design.headingFont.fontFamily }}>{title}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.label}
            className={`${tokens.cards.compact} text-center transition hover:-translate-y-1 hover:shadow-2xl`}
          >
            <p className={`text-sm font-semibold uppercase tracking-[0.4em] ${design.color.accentClass}`}>{item.label}</p>
            <p className={`mt-4 ${tokens.typography.headingSizes.h2} font-bold leading-tight ${tokens.theme.text.primary}`} style={{ fontFamily: design.headingFont.fontFamily }}>{item.value}</p>
            <p className={`mt-2 ${tokens.typography.smallSize} ${tokens.theme.text.secondary}`} style={{ fontFamily: design.bodyFont.fontFamily }}>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
