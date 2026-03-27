import { preferences as defaultPreferences } from "@/visualizer/demo/about/preference";
import type { AboutData } from "@/visualizer/demo/about/data";
import type { AboutPreferences } from "@/visualizer/demo/about/preference";

export type HeroProps = AboutData["hero"] & {
  preferences?: AboutPreferences;
};

export default function Hero({
  eyebrow,
  title,
  subtitle,
  ctaText,
  ctaLink,
  image,
  preferences,
}: HeroProps) {
  const heroTheme = (preferences ?? defaultPreferences).hero;

  return (
    <section className={`${heroTheme.wrapper} relative overflow-hidden`}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-500">
            {eyebrow}
          </p>
          <h1 className={`text-4xl md:text-6xl ${heroTheme.title}`}>{title}</h1>
          <p className={`${heroTheme.subtitle}`}>{subtitle}</p>
          <div className={heroTheme.ctaGroup}>
            <a
              href={ctaLink}
              className="inline-flex items-center justify-center rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-amber-500"
            >
              {ctaText}
            </a>
          </div>
        </div>

        <div className="relative basis-1/2">
          <div className="rounded-[2rem] bg-gradient-to-br from-amber-200/60 to-rose-200/60 p-1 shadow-2xl">
            <img
              src={image}
              alt={title}
              className="h-full w-full rounded-[1.7rem] object-cover shadow-[0_15px_50px_rgba(0,0,0,0.25)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
