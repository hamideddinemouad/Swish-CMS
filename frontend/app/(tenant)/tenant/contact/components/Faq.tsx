import type { ContactData } from "@/visualizer/demo/contact/data";
import { preferences as defaultPreferences } from "@/visualizer/demo/contact/preference";
import {
  resolvePageComponentDesign,
  resolvePageComponentPreferences,
} from "@/lib/page-design-presets";
import type { ContactPreferences } from "@/visualizer/demo/contact/preference";

export type FaqProps = ContactData["faq"] & {
  preferences?: ContactPreferences;
};

export default function Faq({ title, entries, preferences }: FaqProps) {
  const rawPreferences = preferences ?? defaultPreferences;
  const tokens = resolvePageComponentPreferences(rawPreferences, "faq");
  const design = resolvePageComponentDesign(rawPreferences, "faq");
  return (
    <section className="space-y-6 py-8">
      <div className="space-y-1">
        <p className={`text-xs font-semibold uppercase tracking-[0.4em] ${design.color.accentClass}`}>FAQ</p>
        <h2 className={`${tokens.typography.headingSizes.h2} font-semibold ${tokens.theme.text.primary}`} style={{ fontFamily: design.headingFont.fontFamily }}>{title}</h2>
      </div>
      <div className="space-y-4">
        {entries.map((entry) => (
          <article
            key={entry.question}
            className={tokens.cards.compact}
          >
            <p className={`text-sm font-semibold uppercase tracking-[0.3em] ${design.color.mutedClass}`}>
              {entry.question}
            </p>
            <p className={`mt-2 ${tokens.typography.smallSize} ${tokens.theme.text.secondary}`} style={{ fontFamily: design.bodyFont.fontFamily }}>{entry.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
