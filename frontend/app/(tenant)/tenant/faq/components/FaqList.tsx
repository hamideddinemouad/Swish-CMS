import type { FAQData } from "@/visualizer/demo/FAQ/data";
import { preferences as defaultPreferences } from "@/visualizer/demo/FAQ/preference";
import {
  resolvePageComponentDesign,
  resolvePageComponentPreferences,
} from "@/lib/page-design-presets";
import type { FAQPreferences } from "@/visualizer/demo/FAQ/preference";

export type FaqListProps = FAQData["faq"] & {
  preferences?: FAQPreferences;
};

export default function FaqList({ title, description, categories, preferences }: FaqListProps) {
  const rawPreferences = preferences ?? defaultPreferences;
  const tokens = resolvePageComponentPreferences(rawPreferences, "faq");
  const design = resolvePageComponentDesign(rawPreferences, "faq");
  return (
    <section className="space-y-6 py-8">
      <div className="space-y-2">
        <p className={`text-xs font-semibold uppercase tracking-[0.4em] ${design.color.accentClass}`}>FAQ</p>
        <h2 className={`${tokens.typography.headingSizes.h2} font-semibold ${tokens.theme.text.primary}`} style={{ fontFamily: design.headingFont.fontFamily }}>{title}</h2>
        <p className={`${tokens.typography.smallSize} ${tokens.theme.text.secondary}`} style={{ fontFamily: design.bodyFont.fontFamily }}>{description}</p>
      </div>
      <div className="space-y-6">
        {categories.map((category) => (
          <article key={category.name} className={`space-y-4 ${tokens.cards.compact}`}>
            <p className={`text-xs font-semibold uppercase tracking-[0.4em] ${design.color.accentClass}`}>{category.name}</p>
            <div className="space-y-4">
              {category.entries.map((entry) => (
                <div key={entry.question} className="space-y-1">
                  <p className={`text-sm font-semibold ${tokens.theme.text.primary}`} style={{ fontFamily: design.headingFont.fontFamily }}>{entry.question}</p>
                  <p className={`text-sm ${tokens.theme.text.secondary}`} style={{ fontFamily: design.bodyFont.fontFamily }}>{entry.answer}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
