import { preferences as defaultPreferences } from "@/visualizer/demo/about/preference";
import {
  resolvePageComponentDesign,
  resolvePageComponentPreferences,
} from "@/lib/page-design-presets";
import type { AboutData } from "@/visualizer/demo/about/data";
import type { AboutPreferences } from "@/visualizer/demo/about/preference";

export type TimelineProps = AboutData["timeline"] & {
  preferences?: AboutPreferences;
};

export default function Timeline({ title, milestones, preferences }: TimelineProps) {
  const rawPreferences = preferences ?? defaultPreferences;
  const tokens = resolvePageComponentPreferences(rawPreferences, "timeline");
  const design = resolvePageComponentDesign(rawPreferences, "timeline");
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className={`text-sm font-semibold uppercase tracking-[0.3em] ${design.color.accentClass}`}>Chronology</p>
        <h2 className={`${tokens.typography.headingSizes.h2} font-semibold ${tokens.theme.text.primary}`} style={{ fontFamily: design.headingFont.fontFamily }}>{title}</h2>
      </div>

      <div className="space-y-6">
        {milestones.map((milestone) => (
          <article
            key={milestone.year}
            className={`grid gap-4 rounded-3xl ${tokens.cards.compact} sm:grid-cols-[160px_1fr]`}
          >
            <p className={`text-sm font-semibold uppercase tracking-[0.3em] ${design.color.accentClass}`}>{milestone.year}</p>
            <div>
              <h3 className={`text-xl font-semibold ${tokens.theme.text.primary}`} style={{ fontFamily: design.headingFont.fontFamily }}>{milestone.title}</h3>
              <p className={`mt-2 ${tokens.typography.smallSize} ${tokens.theme.text.secondary}`} style={{ fontFamily: design.bodyFont.fontFamily }}>{milestone.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
