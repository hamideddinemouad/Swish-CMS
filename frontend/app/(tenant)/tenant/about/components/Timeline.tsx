import { preferences as defaultPreferences } from "@/visualizer/demo/about/preference";
import type { AboutData } from "@/visualizer/demo/about/data";
import type { AboutPreferences } from "@/visualizer/demo/about/preference";

export type TimelineProps = AboutData["timeline"] & {
  preferences?: AboutPreferences;
};

export default function Timeline({ title, milestones, preferences }: TimelineProps) {
  const tokens = preferences ?? defaultPreferences;
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">Chronology</p>
        <h2 className="text-3xl font-semibold text-amber-900">{title}</h2>
      </div>

      <div className="space-y-6">
        {milestones.map((milestone) => (
          <article
            key={milestone.year}
            className={`grid gap-4 rounded-3xl border ${tokens.borders.style} bg-white/80 p-6 shadow-sm sm:grid-cols-[160px_1fr]`}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-500">{milestone.year}</p>
            <div>
              <h3 className="text-xl font-semibold text-amber-900">{milestone.title}</h3>
              <p className="mt-2 text-sm text-amber-700">{milestone.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
