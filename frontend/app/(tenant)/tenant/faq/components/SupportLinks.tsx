import type { FAQData } from "@/visualizer/demo/FAQ/data";
import { preferences as defaultPreferences } from "@/visualizer/demo/FAQ/preference";
import {
  resolvePageComponentDesign,
  resolvePageComponentPreferences,
} from "@/lib/page-design-presets";
import type { FAQPreferences } from "@/visualizer/demo/FAQ/preference";

export type SupportLinksProps = FAQData["supportLinks"] & {
  preferences?: FAQPreferences;
};

export default function SupportLinks({ title, items, preferences }: SupportLinksProps) {
  const rawPreferences = preferences ?? defaultPreferences;
  const tokens = resolvePageComponentPreferences(rawPreferences, "supportLinks");
  const design = resolvePageComponentDesign(rawPreferences, "supportLinks");
  return (
    <section className="space-y-6 py-8">
      <div className="space-y-1">
        <p className={`text-xs font-semibold uppercase tracking-[0.4em] ${design.color.mutedClass}`}>Support</p>
        <h2 className={`${tokens.typography.headingSizes.h2} font-semibold ${tokens.theme.text.primary}`} style={{ fontFamily: design.headingFont.fontFamily }}>{title}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.slug}
            className={`${tokens.cards.compact} text-sm font-semibold transition ${design.color.linkAccentClass}`}
          >
            <p className={`text-xs uppercase tracking-[0.3em] ${design.color.mutedClass}`}>{item.label}</p>
            <p className={`text-sm ${tokens.theme.text.secondary}`} style={{ fontFamily: design.bodyFont.fontFamily }}>{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
