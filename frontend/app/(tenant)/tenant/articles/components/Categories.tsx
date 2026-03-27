import type { ArticlesData } from "@/visualizer/demo/articles/data";

export type CategoriesProps = ArticlesData["categories"];

export default function Categories({ title, items }: CategoriesProps) {
  return (
    <section className="space-y-6 py-6">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-300">Topics</p>
        <h2 className="text-3xl font-semibold text-white">{title}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {items.map((item) => (
          <a
            key={item.slug}
            href={item.slug}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 px-5 py-6 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:border-emerald-400"
          >
            {item.name}
          </a>
        ))}
      </div>
    </section>
  );
}
