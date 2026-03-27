import { preferences as defaultPreferences } from "@/visualizer/demo/about/preference";
import type { AboutData } from "@/visualizer/demo/about/data";
import type { AboutPreferences } from "@/visualizer/demo/about/preference";

export type StatsProps = AboutData["stats"] & {
  preferences?: AboutPreferences;
};

export default function Stats({ title, items, preferences }: StatsProps) {
  const tokens = preferences ?? defaultPreferences;
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">Proof</p>
        <h2 className="text-3xl font-semibold text-amber-900">{title}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.label}
            className={`${tokens.cards.compact} text-center transition hover:-translate-y-1 hover:shadow-2xl`}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-amber-500">{item.label}</p>
            <p className="mt-4 text-4xl font-bold leading-tight text-amber-900">{item.value}</p>
            <p className="mt-2 text-sm text-amber-600">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
