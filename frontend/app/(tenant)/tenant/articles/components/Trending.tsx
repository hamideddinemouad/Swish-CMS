import type { ArticlesData } from "@/visualizer/demo/articles/data";
import { preferences as defaultPreferences } from "@/visualizer/demo/articles/preference";
import {
  resolvePageComponentDesign,
  resolvePageComponentPreferences,
} from "@/lib/page-design-presets";
import type { ArticlesPreferences } from "@/visualizer/demo/articles/preference";

export type TrendingProps = ArticlesData["trending"] & {
  preferences?: ArticlesPreferences;
};

export default function Trending({ title, posts, preferences }: TrendingProps) {
  const rawPreferences = preferences ?? defaultPreferences;
  const tokens = resolvePageComponentPreferences(rawPreferences, "trending");
  const design = resolvePageComponentDesign(rawPreferences, "trending");
  return (
    <section className="space-y-6 py-6">
      <div className="space-y-1">
        <p className={`text-xs font-semibold uppercase tracking-[0.4em] ${design.color.accentClass}`}>Trending</p>
        <h2 className={`${tokens.typography.headingSizes.h2} font-semibold ${tokens.theme.text.primary}`} style={{ fontFamily: design.headingFont.fontFamily }}>{title}</h2>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.slug}
            className={`flex flex-col ${tokens.cards.compact} px-6 py-5 transition ${design.color.linkAccentClass}`}
          >
            <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${design.color.mutedClass}`}>#{post.rank}</p>
            <p className={`text-xl font-semibold ${tokens.theme.text.primary}`} style={{ fontFamily: design.headingFont.fontFamily }}>{post.title}</p>
            <p className={`${tokens.typography.smallSize} ${tokens.theme.text.secondary}`} style={{ fontFamily: design.bodyFont.fontFamily }}>{post.snippet}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
