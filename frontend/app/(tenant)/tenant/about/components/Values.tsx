import { preferences as defaultPreferences } from "../preference";
import type { AboutData } from "../data";
import type { AboutPreferences } from "../preference";

export type ValuesProps = AboutData["values"] & {
  preferences?: AboutPreferences;
};

export default function Values({ title, items, preferences }: ValuesProps) {
  const tokens = preferences ?? defaultPreferences;
  return (
    <section className="space-y-10">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">Beliefs</p>
        <h2 className="text-3xl font-semibold text-amber-900">{title}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.title}
            className={`${tokens.cards.base} border-rose-100 transition hover:-translate-y-1 hover:shadow-2xl`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-amber-600">
              <span className="text-sm font-semibold uppercase tracking-[0.18em]">{item.icon}</span>
            </div>
            <h3 className="mt-5 text-xl font-semibold text-amber-900">{item.title}</h3>
            <p className="mt-3 text-sm text-amber-700">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
