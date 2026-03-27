import { preferences as defaultPreferences } from "@/visualizer/demo/articles/preference";
import type { ArticlesData } from "@/visualizer/demo/articles/data";
import type { ArticlesPreferences } from "@/visualizer/demo/articles/preference";

export type FeaturedArticlesProps = ArticlesData["featuredArticles"] & {
  preferences?: ArticlesPreferences;
};

export default function FeaturedArticles({ title, subtitle, articles, preferences }: FeaturedArticlesProps) {
  const tokens = preferences ?? defaultPreferences;

  return (
    <section className="space-y-6 py-6">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-400">Featured</p>
        <h2 className="text-3xl font-semibold text-white">{title}</h2>
        <p className="text-sm text-slate-300">{subtitle}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {articles.map((article) => (
          <article
            key={article.slug}
            className={`${tokens.cards.base} space-y-4 border border-slate-800 bg-slate-900/60 shadow-2xl`}
          >
            <div className="aspect-[4/3] overflow-hidden rounded-2xl">
              <img src={article.image} alt={article.title} className="h-full w-full object-cover" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">{article.tag}</p>
            <a href={article.slug} className="text-xl font-semibold text-white hover:text-emerald-300">
              {article.title}
            </a>
            <p className="text-sm text-slate-300">{article.summary}</p>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{article.readingTime}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
