import type { ArticlesData } from "../data";

export type EditorialSeriesProps = ArticlesData["editorialSeries"];

export default function EditorialSeries({ title, description, focuses }: EditorialSeriesProps) {
  return (
    <section className="space-y-6 py-6">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-300">Series</p>
        <h2 className="text-3xl font-semibold text-white">{title}</h2>
        <p className="text-sm text-slate-300">{description}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {focuses.map((focus) => (
          <article key={focus.name} className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6 shadow-xl">
            <p className="text-sm font-semibold text-emerald-400">{focus.name}</p>
            <p className="mt-3 text-sm text-slate-300">{focus.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
