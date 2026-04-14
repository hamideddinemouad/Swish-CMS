import { preferences as defaultPreferences } from "@/visualizer/demo/about/preference";
import {
  resolvePageComponentDesign,
  resolvePageComponentPreferences,
} from "@/lib/page-design-presets";
import type { AboutData } from "@/visualizer/demo/about/data";
import type { AboutPreferences } from "@/visualizer/demo/about/preference";

export type ValuesProps = AboutData["values"] & {
  preferences?: AboutPreferences;
};

export default function Values({ title, items, preferences }: ValuesProps) {
  const rawPreferences = preferences ?? defaultPreferences;
  const tokens = resolvePageComponentPreferences(rawPreferences, "values");
  const design = resolvePageComponentDesign(rawPreferences, "values");
  return (
    <section className="space-y-10">
      <div className="space-y-2">
        <p className={`text-sm font-semibold uppercase tracking-[0.3em] ${design.color.accentClass}`}>Beliefs</p>
        <h2 className={`${tokens.typography.headingSizes.h2} font-semibold ${tokens.theme.text.primary}`} style={{ fontFamily: design.headingFont.fontFamily }}>{title}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.title}
            className={`${tokens.cards.base} transition hover:-translate-y-1 hover:shadow-2xl`}
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${design.color.panelClass} ${design.color.accentClass}`}>
              <span className="text-sm font-semibold uppercase tracking-[0.18em]">{item.icon}</span>
            </div>
            <h3 className={`mt-5 text-xl font-semibold ${tokens.theme.text.primary}`} style={{ fontFamily: design.headingFont.fontFamily }}>{item.title}</h3>
            <p className={`mt-3 ${tokens.typography.smallSize} ${tokens.theme.text.secondary}`} style={{ fontFamily: design.bodyFont.fontFamily }}>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
