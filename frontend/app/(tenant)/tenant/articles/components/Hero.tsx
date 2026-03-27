import { preferences as defaultPreferences } from "@/visualizer/demo/articles/preference";
import type { ArticlesData } from "@/visualizer/demo/articles/data";
import type { ArticlesPreferences } from "@/visualizer/demo/articles/preference";

export type HeroProps = ArticlesData["hero"] & {
  preferences?: ArticlesPreferences;
};

export default function Hero({
  eyebrow,
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  image,
  preferences,
}: HeroProps) {
  const heroTheme = (preferences ?? defaultPreferences).hero;

  return (
    <section className={`${heroTheme.wrapper} relative overflow-hidden`}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-6 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-400">{eyebrow}</p>
          <h1 className={`text-4xl md:text-6xl ${heroTheme.title}`}>{title}</h1>
          <p className={`${heroTheme.subtitle}`}>{subtitle}</p>
          <div className={heroTheme.ctaGroup}>
            <a
              href={ctaPrimary}
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg hover:bg-emerald-400"
            >
              Read latest
            </a>
            <a
              href={ctaSecondary}
              className="inline-flex items-center justify-center rounded-full border border-emerald-500 px-6 py-3 text-sm font-semibold text-white hover:border-emerald-400"
            >
              Browse categories
            </a>
          </div>
        </div>
        <div className="relative basis-1/2">
          <img src={image} alt={title} className="rounded-[2rem] object-cover shadow-[0_40px_90px_rgba(2,6,23,0.6)]" />
        </div>
      </div>
    </section>
  );
}
