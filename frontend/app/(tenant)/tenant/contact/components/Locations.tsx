import type { ContactData } from "@/visualizer/demo/contact/data";
import { preferences as defaultPreferences } from "@/visualizer/demo/contact/preference";
import {
  resolvePageComponentDesign,
  resolvePageComponentPreferences,
} from "@/lib/page-design-presets";
import type { ContactPreferences } from "@/visualizer/demo/contact/preference";

export type LocationsProps = ContactData["locations"] & {
  preferences?: ContactPreferences;
};

export default function Locations({ title, offices, preferences }: LocationsProps) {
  const rawPreferences = preferences ?? defaultPreferences;
  const tokens = resolvePageComponentPreferences(rawPreferences, "locations");
  const design = resolvePageComponentDesign(rawPreferences, "locations");
  return (
    <section className="space-y-6 py-8">
      <div className="space-y-2">
        <p className={`text-xs font-semibold uppercase tracking-[0.4em] ${design.color.accentClass}`}>Studios</p>
        <h2 className={`${tokens.typography.headingSizes.h2} font-semibold ${tokens.theme.text.primary}`} style={{ fontFamily: design.headingFont.fontFamily }}>{title}</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {offices.map((office) => (
          <article
            key={office.city}
            className={tokens.cards.compact}
          >
            <p className={`text-sm font-semibold uppercase tracking-[0.3em] ${design.color.mutedClass}`}>{office.city}</p>
            <p className={`mt-2 ${tokens.typography.smallSize} ${tokens.theme.text.primary}`} style={{ fontFamily: design.bodyFont.fontFamily }}>{office.address}</p>
            <p className={`text-xs ${design.color.mutedClass}`} style={{ fontFamily: design.bodyFont.fontFamily }}>{office.hours}</p>
            <span className={`mt-3 inline-flex text-sm font-semibold ${design.color.linkAccentClass}`}>
              View on map
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
