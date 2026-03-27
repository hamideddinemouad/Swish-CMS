import type { CategoriesData } from "@/visualizer/demo/categories/data";

export type FeaturedCollectionsProps = CategoriesData["featuredCollections"];

export default function FeaturedCollections({ title, collections }: FeaturedCollectionsProps) {
  return (
    <section className="space-y-6 py-6">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Curations</p>
        <h2 className="text-3xl font-semibold text-slate-900">{title}</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {collections.map((collection) => (
          <article
            key={collection.slug}
            className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg"
          >
            <div className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
              {collection.curator}
            </div>
            <h3 className="mt-3 text-2xl font-semibold text-slate-900">{collection.title}</h3>
            <p className="mt-2 text-sm text-slate-500">{collection.highlight}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
