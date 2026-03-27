import type { HomeData } from "@/visualizer/demo/home/data";

export type OfferingsProps = HomeData["offerings"];

export default function Offerings({ title, description, tiles }: OfferingsProps) {
  return (
    <section className="space-y-6 py-8">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-300">Offerings</p>
        <h2 className="text-3xl font-semibold text-white">{title}</h2>
        <p className="text-sm text-slate-300">{description}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {tiles.map((tile) => (
          <article key={tile.slug} className="space-y-3 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
            <h3 className="text-xl font-semibold text-white">{tile.title}</h3>
            <p className="text-sm text-slate-300">{tile.detail}</p>
            <a href={tile.slug} className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
              {tile.action}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
