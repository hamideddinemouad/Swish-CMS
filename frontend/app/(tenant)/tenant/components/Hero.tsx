import { preferences as defaultPreferences } from "@/visualizer/demo/home/preference";
import { resolveHomeSectionDesign } from "@/lib/home-design-presets";
import type { HomeData } from "@/visualizer/demo/home/data";
import type { HomePreferences } from "@/visualizer/demo/home/preference";
import TenantImage from "./TenantImage";

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
  const heroPreferences = preferences ?? defaultPreferences;
  const design = resolveHomeSectionDesign(heroPreferences, "hero");

  return (
    <section
      className={`${design.legacyHero.wrapper} ${design.color.heroWrapperClass} relative overflow-hidden`}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="space-y-6 text-left">
          <h1
            className={`${design.displaySize.heroTitleClass} ${design.legacyHero.title} ${design.color.heroTitleClass}`}
            style={{ fontFamily: design.headingFont.fontFamily }}
          >
            {title}
          </h1>
          <p
            className={`${design.bodySize.bodyClass} ${design.legacyHero.subtitle} ${design.color.heroSubtitleClass}`}
            style={{ fontFamily: design.bodyFont.fontFamily }}
          >
            {subtitle}
          </p>
          <div className={design.legacyHero.ctaGroup}>
            <span className={design.color.primaryButtonClass}>
              {ctaPrimary}
            </span>
            <span className={design.color.secondaryButtonClass}>
              {ctaSecondary}
            </span>
          </div>
        </div>
        <div className={`${design.color.imageFrameClass} overflow-hidden`}>
          <TenantImage
            src={image}
            alt={title}
            className={`h-72 w-full rounded-[1.6rem] ${design.color.imageShadowClass}`}
          />
        </div>
      </div>
    </section>
  );
}
