import { preferences as defaultPreferences } from "@/visualizer/demo/categories/preference";
import type { CategoriesData } from "@/visualizer/demo/categories/data";
import type { CategoriesPreferences } from "@/visualizer/demo/categories/preference";

export type HeroProps = CategoriesData["hero"] & {
  preferences?: CategoriesPreferences;
};

export default function Hero({ title, subtitle, ctaText, ctaLink, image, preferences }: HeroProps) {
  const heroTheme = (preferences ?? defaultPreferences).hero;

  return (
    <section className={`${heroTheme.wrapper} relative overflow-hidden`}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-6">
          <h1 className={`text-4xl md:text-6xl ${heroTheme.title}`}>{title}</h1>
          <p className={`${heroTheme.subtitle}`}>{subtitle}</p>
          <a
            href={ctaLink}
            className={`${defaultPreferences.buttons.primary} text-sm font-semibold`}
          >
            {ctaText}
          </a>
        </div>
        <div className="rounded-[2rem] bg-gradient-to-br from-orange-100 via-white to-pink-100 p-1 shadow-2xl">
          <img
            src={image}
            alt={title}
            className="h-72 w-full rounded-[1.6rem] object-cover shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
          />
        </div>
      </div>
    </section>
  );
}
