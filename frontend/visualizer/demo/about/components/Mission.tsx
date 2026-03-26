import { preferences as defaultPreferences } from "../preference";
import type { AboutData } from "../data";
import type { AboutPreferences } from "../preference";

export type MissionProps = AboutData["mission"] & {
  preferences?: AboutPreferences;
};

export default function Mission({ heading, body, bullets, preferences }: MissionProps) {
  const tokens = preferences ?? defaultPreferences;
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">Essence</p>
        <h2 className="text-3xl font-semibold text-amber-900">{heading}</h2>
      </div>
      <p className="max-w-3xl text-lg text-amber-700">{body}</p>
      <div className={`grid gap-4 ${tokens.layout.gap} sm:grid-cols-3`}>
        {bullets.map((item) => (
          <div key={item} className={`${tokens.cards.compact} min-h-[140px]`}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">Why it matters</p>
            <p className="mt-2 text-base leading-relaxed text-amber-800">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
