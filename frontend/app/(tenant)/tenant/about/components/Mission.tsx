import { preferences as defaultPreferences } from "@/visualizer/demo/about/preference";
import {
  resolvePageComponentDesign,
  resolvePageComponentPreferences,
} from "@/lib/page-design-presets";
import type { AboutData } from "@/visualizer/demo/about/data";
import type { AboutPreferences } from "@/visualizer/demo/about/preference";

export type MissionProps = AboutData["mission"] & {
  preferences?: AboutPreferences;
};

export default function Mission({ heading, body, bullets, preferences }: MissionProps) {
  const rawPreferences = preferences ?? defaultPreferences;
  const tokens = resolvePageComponentPreferences(rawPreferences, "mission");
  const design = resolvePageComponentDesign(rawPreferences, "mission");
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className={`text-sm font-semibold uppercase tracking-[0.3em] ${design.color.accentClass}`}>Essence</p>
        <h2
          className={`${tokens.typography.headingSizes.h2} font-semibold ${tokens.theme.text.primary}`}
          style={{ fontFamily: design.headingFont.fontFamily }}
        >
          {heading}
        </h2>
      </div>
      <p
        className={`max-w-3xl ${tokens.typography.bodySize} ${tokens.theme.text.secondary}`}
        style={{ fontFamily: design.bodyFont.fontFamily }}
      >
        {body}
      </p>
      <div className={`grid gap-4 ${tokens.layout.gap} sm:grid-cols-3`}>
        {bullets.map((item) => (
          <div key={item} className={`${tokens.cards.compact} min-h-[140px]`}>
            <p className={`text-sm font-semibold uppercase tracking-[0.2em] ${design.color.accentClass}`}>Why it matters</p>
            <p
              className={`mt-2 ${tokens.typography.bodySize} leading-relaxed ${tokens.theme.text.secondary}`}
              style={{ fontFamily: design.bodyFont.fontFamily }}
            >
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
