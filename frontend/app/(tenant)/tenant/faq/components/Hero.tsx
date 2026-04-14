import { preferences as defaultPreferences } from "@/visualizer/demo/FAQ/preference";
import {
  resolvePageComponentDesign,
  resolvePageComponentPreferences,
} from "@/lib/page-design-presets";
import type { FAQData } from "@/visualizer/demo/FAQ/data";
import type { FAQPreferences } from "@/visualizer/demo/FAQ/preference";

export type HeroProps = FAQData["hero"] & {
  preferences?: FAQPreferences;
};

export default function Hero({ eyebrow, title, subtitle, image, preferences }: HeroProps) {
  const rawPreferences = preferences ?? defaultPreferences;
  const tokens = resolvePageComponentPreferences(rawPreferences, "hero");
  const heroTokens = tokens.hero;
  const design = resolvePageComponentDesign(rawPreferences, "hero");

  return (
    <section className={`${heroTokens.wrapper} relative overflow-hidden`}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className={`space-y-6 text-left ${tokens.theme.text.primary}`}>
          <p className={`text-xs font-semibold uppercase tracking-[0.4em] ${design.color.accentClass}`}>{eyebrow}</p>
          <h1 className={heroTokens.title} style={{ fontFamily: design.headingFont.fontFamily }}>{title}</h1>
          <p className={heroTokens.subtitle} style={{ fontFamily: design.bodyFont.fontFamily }}>{subtitle}</p>
        </div>
        <div className={`${design.color.imageFrameClass} flex items-center justify-center`}>
          <img
            src={image}
            alt={title}
            className={`h-auto max-h-80 w-full rounded-[1.5rem] object-contain ${design.color.imageShadowClass}`}
          />
        </div>
      </div>
    </section>
  );
}
