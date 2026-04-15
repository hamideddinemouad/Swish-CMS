import { preferences as defaultPreferences } from "@/visualizer/demo/articles/preference";
import {
  resolvePageComponentDesign,
  resolvePageComponentPreferences,
} from "@/lib/page-design-presets";
import type { ArticlesData } from "@/visualizer/demo/articles/data";
import type { ArticlesPreferences } from "@/visualizer/demo/articles/preference";
import TenantImage from "../../components/TenantImage";

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
  const rawPreferences = preferences ?? defaultPreferences;
  const tokens = resolvePageComponentPreferences(rawPreferences, "hero");
  const heroTheme = tokens.hero;
  const design = resolvePageComponentDesign(rawPreferences, "hero");

  return (
    <section className={`${heroTheme.wrapper} relative overflow-hidden`}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="space-y-6 text-left">
          <p className={`text-xs font-semibold uppercase tracking-[0.4em] ${design.color.accentClass}`}>{eyebrow}</p>
          <h1 className={heroTheme.title} style={{ fontFamily: design.headingFont.fontFamily }}>{title}</h1>
          <p className={heroTheme.subtitle} style={{ fontFamily: design.bodyFont.fontFamily }}>{subtitle}</p>
          <div className={heroTheme.ctaGroup}>
            <span className={tokens.buttons.primary}>
              Read latest
            </span>
            <span className={tokens.buttons.secondary}>
              Browse categories
            </span>
          </div>
        </div>
        <div className="relative basis-1/2">
          <div className={`${design.color.imageFrameClass} aspect-[4/3] overflow-hidden`}>
            <TenantImage
              src={image}
              alt={title}
              className={`h-full w-full rounded-[1.7rem] ${design.color.imageShadowClass}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
