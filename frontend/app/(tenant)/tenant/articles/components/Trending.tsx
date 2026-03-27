import type { ArticlesData } from "@/visualizer/demo/articles/data";

export type TrendingProps = ArticlesData["trending"];

export default function Trending({ title, posts }: TrendingProps) {
  return (
    <section className="space-y-6 py-6">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-300">Trending</p>
        <h2 className="text-3xl font-semibold text-white">{title}</h2>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <a
            key={post.slug}
            href={post.slug}
            className="flex flex-col rounded-3xl border border-slate-800 bg-slate-900/60 px-6 py-5 transition hover:border-emerald-400"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">#{post.rank}</p>
            <p className="text-xl font-semibold text-white">{post.title}</p>
            <p className="text-sm text-slate-300">{post.snippet}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
