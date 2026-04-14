import type { ContactData } from "@/visualizer/demo/contact/data";
import { preferences as defaultPreferences } from "@/visualizer/demo/contact/preference";
import {
  resolvePageComponentDesign,
  resolvePageComponentPreferences,
} from "@/lib/page-design-presets";
import type { ContactPreferences } from "@/visualizer/demo/contact/preference";

export type ContactInfoProps = ContactData["contactInfo"] & {
  preferences?: ContactPreferences;
};

export default function ContactInfo({ title, methods, preferences }: ContactInfoProps) {
  const rawPreferences = preferences ?? defaultPreferences;
  const tokens = resolvePageComponentPreferences(rawPreferences, "contactInfo");
  const design = resolvePageComponentDesign(rawPreferences, "contactInfo");
  return (
    <section className="space-y-6 py-8">
      <div className="space-y-2">
        <p className={`text-xs font-semibold uppercase tracking-[0.4em] ${design.color.accentClass}`}>Direct lines</p>
        <h2 className={`${tokens.typography.headingSizes.h2} font-semibold ${tokens.theme.text.primary}`} style={{ fontFamily: design.headingFont.fontFamily }}>{title}</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {methods.map((method) => (
          <div
            key={method.label}
            className={tokens.cards.compact}
          >
            <p className={`text-sm font-semibold uppercase tracking-[0.3em] ${design.color.accentClass}`}>
              {method.label}
            </p>
            <p className={`mt-2 text-lg font-semibold ${tokens.theme.text.primary}`} style={{ fontFamily: design.headingFont.fontFamily }}>{method.detail}</p>
            <p className={`mt-1 ${tokens.typography.smallSize} ${tokens.theme.text.secondary}`} style={{ fontFamily: design.bodyFont.fontFamily }}>{method.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
