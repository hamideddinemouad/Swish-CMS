import { preferences as defaultPreferences } from "../preference";
import type { HomeData } from "../data";
import type { HomePreferences } from "../preference";

export type FeaturedStoriesProps = HomeData["featuredStories"] & {
  preferences?: HomePreferences;
};

export default function FeaturedStories({ title, posts, preferences }: FeaturedStoriesProps) {
  const tokens = preferences ?? defaultPreferences;

  return (
    <section className="space-y-6 py-8">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-300">Stories</p>
        <h2 className="text-3xl font-semibold text-white">{title}</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.slug} className={`${tokens.cards.base} border border-slate-800 bg-slate-900/70 shadow-2xl`}>
            <div className="flex flex-col gap-4 lg:flex-row">
              <img src={post.image} alt={post.title} className="h-40 w-full rounded-2xl object-cover lg:w-1/2" />
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{post.category}</p>
                <a href={post.slug} className="text-xl font-semibold text-white hover:text-amber-300">
                  {post.title}
                </a>
                <p className="text-sm text-slate-300">{post.summary}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{post.readingTime}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
