import { preferences as defaultPreferences } from "@/visualizer/demo/categories/preference";
import {
  resolvePageComponentDesign,
  resolvePageComponentPreferences,
} from "@/lib/page-design-presets";
import type { CategoriesData } from "@/visualizer/demo/categories/data";
import type { CategoriesPreferences } from "@/visualizer/demo/categories/preference";

export type HeroProps = CategoriesData["hero"] & {
  preferences?: CategoriesPreferences;
};

export default function Hero({ title, subtitle, ctaText, ctaLink, image, preferences }: HeroProps) {
  const rawPreferences = preferences ?? defaultPreferences;
  const tokens = resolvePageComponentPreferences(rawPreferences, "hero");
  const heroTheme = tokens.hero;
  const design = resolvePageComponentDesign(rawPreferences, "hero");

  return (
    <section className={`${heroTheme.wrapper} relative overflow-hidden`}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="space-y-6">
          <h1 className={heroTheme.title} style={{ fontFamily: design.headingFont.fontFamily }}>{title}</h1>
          <p className={heroTheme.subtitle} style={{ fontFamily: design.bodyFont.fontFamily }}>{subtitle}</p>
          <span className={`${tokens.buttons.primary} text-sm font-semibold`}>
            {ctaText}
          </span>
        </div>
        <div className={design.color.imageFrameClass}>
          <img
            src={image}
            alt={title}
            className={`h-72 w-full rounded-[1.6rem] object-cover ${design.color.imageShadowClass}`}
          />
        </div>
      </div>
    </section>
  );
}
