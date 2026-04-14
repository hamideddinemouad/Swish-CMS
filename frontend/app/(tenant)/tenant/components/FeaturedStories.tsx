import { preferences as defaultPreferences } from "@/visualizer/demo/home/preference";
import { resolveHomeSectionDesign } from "@/lib/home-design-presets";
import type { HomeData } from "@/visualizer/demo/home/data";
import type { HomePreferences } from "@/visualizer/demo/home/preference";

export type FeaturedStoriesProps = HomeData["featuredStories"] & {
  preferences?: HomePreferences;
};

export default function FeaturedStories({ title, posts, preferences }: FeaturedStoriesProps) {
  const design = resolveHomeSectionDesign(preferences ?? defaultPreferences, "featuredStories");

  return (
    <section className="py-8">
      <div className={`${design.color.sectionShellClass} space-y-6`}>
        <div className="space-y-1">
          <p className={`text-xs font-semibold uppercase tracking-[0.4em] ${design.color.sectionEyebrowClass}`}>
            Stories
          </p>
          <h2
            className={`${design.displaySize.sectionTitleClass} font-semibold ${design.color.sectionHeadingClass}`}
            style={{ fontFamily: design.headingFont.fontFamily }}
          >
            {title}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <article key={post.slug} className={design.color.cardBaseClass}>
              <div className="flex flex-col gap-4 lg:flex-row">
                <div className="flex w-full items-center justify-center overflow-hidden rounded-2xl bg-black/5 lg:w-1/2">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-auto max-h-56 w-full object-contain"
                  />
                </div>
                <div className="space-y-3">
                  <p className={`text-xs uppercase tracking-[0.3em] ${design.color.mutedTextClass}`}>{post.category}</p>
                  <p
                    className={`text-xl font-semibold ${design.color.sectionHeadingClass}`}
                    style={{ fontFamily: design.headingFont.fontFamily }}
                  >
                    {post.title}
                  </p>
                  <p className={`${design.bodySize.bodyClass} ${design.color.bodyTextClass}`} style={{ fontFamily: design.bodyFont.fontFamily }}>
                    {post.summary}
                  </p>
                  <p className={`text-xs uppercase tracking-[0.3em] ${design.color.mutedTextClass}`}>{post.readingTime}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
