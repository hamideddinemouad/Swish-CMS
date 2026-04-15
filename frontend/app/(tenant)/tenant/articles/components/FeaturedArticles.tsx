import { preferences as defaultPreferences } from "@/visualizer/demo/articles/preference";
import {
  resolvePageComponentDesign,
  resolvePageComponentPreferences,
} from "@/lib/page-design-presets";
import type { ArticlesData } from "@/visualizer/demo/articles/data";
import type { ArticlesPreferences } from "@/visualizer/demo/articles/preference";
import TenantImage from "../../components/TenantImage";

export type FeaturedArticlesProps = ArticlesData["featuredArticles"] & {
  preferences?: ArticlesPreferences;
};

export default function FeaturedArticles({ title, subtitle, articles, preferences }: FeaturedArticlesProps) {
  const rawPreferences = preferences ?? defaultPreferences;
  const tokens = resolvePageComponentPreferences(rawPreferences, "featuredArticles");
  const design = resolvePageComponentDesign(rawPreferences, "featuredArticles");

  return (
    <section className="space-y-6 py-6">
      <div className="space-y-1">
        <p className={`text-xs font-semibold uppercase tracking-[0.4em] ${design.color.accentClass}`}>Featured</p>
        <h2 className={`${tokens.typography.headingSizes.h2} font-semibold ${tokens.theme.text.primary}`} style={{ fontFamily: design.headingFont.fontFamily }}>{title}</h2>
        <p className={`${tokens.typography.smallSize} ${tokens.theme.text.secondary}`} style={{ fontFamily: design.bodyFont.fontFamily }}>{subtitle}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {articles.map((article) => (
          <article
            key={article.slug}
            className={`${tokens.cards.base} space-y-4`}
          >
            <div className="aspect-[4/3] overflow-hidden rounded-2xl">
              <TenantImage src={article.image} alt={article.title} className="h-full w-full" />
            </div>
            <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${design.color.accentClass}`}>{article.tag}</p>
            <p className={`text-xl font-semibold ${tokens.theme.text.primary}`} style={{ fontFamily: design.headingFont.fontFamily }}>
              {article.title}
            </p>
            <p className={`${tokens.typography.smallSize} ${tokens.theme.text.secondary}`} style={{ fontFamily: design.bodyFont.fontFamily }}>{article.summary}</p>
            <p className={`text-xs uppercase tracking-[0.3em] ${design.color.mutedClass}`}>{article.readingTime}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
