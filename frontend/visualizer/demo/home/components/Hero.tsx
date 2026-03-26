import { preferences as defaultPreferences } from "../preference";
import type { HomeData } from "../data";
import type { HomePreferences } from "../preference";

export type HeroProps = HomeData["hero"] & {
  preferences?: HomePreferences;
};

export default function Hero({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  image,
  preferences,
}: HeroProps) {
  const tokens = (preferences ?? defaultPreferences).hero;

  return (
    <section className={`${tokens.wrapper} relative overflow-hidden`}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-6 text-left">
          <h1 className={`text-4xl md:text-6xl ${tokens.title}`}>{title}</h1>
          <p className={`${tokens.subtitle}`}>{subtitle}</p>
          <div className={tokens.ctaGroup}>
            <a href={ctaPrimary} className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg hover:bg-amber-400">
              View work
            </a>
            <a href={ctaSecondary} className="inline-flex items-center justify-center rounded-full border border-amber-500 px-6 py-3 text-sm font-semibold text-white hover:border-amber-400">
              Schedule a call
            </a>
          </div>
        </div>
        <div className="rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-800 p-1 shadow-2xl">
          <img
            src={image}
            alt={title}
            className="h-72 w-full rounded-[1.6rem] object-cover shadow-[0_30px_80px_rgba(2,6,23,0.7)]"
          />
        </div>
      </div>
    </section>
  );
}
