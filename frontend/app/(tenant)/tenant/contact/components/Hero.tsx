import { preferences as defaultPreferences } from "@/visualizer/demo/contact/preference";
import {
  resolvePageComponentDesign,
  resolvePageComponentPreferences,
} from "@/lib/page-design-presets";
import type { ContactData } from "@/visualizer/demo/contact/data";
import type { ContactPreferences } from "@/visualizer/demo/contact/preference";
import TenantImage from "../../components/TenantImage";

export type HeroProps = ContactData["hero"] & {
  preferences?: ContactPreferences;
};

export default function Hero({ title, subtitle, ctaText, ctaLink, image, preferences }: HeroProps) {
  const rawPreferences = preferences ?? defaultPreferences;
  const tokens = resolvePageComponentPreferences(rawPreferences, "hero");
  const heroTokens = tokens.hero;
  const design = resolvePageComponentDesign(rawPreferences, "hero");

  return (
    <section className={`${heroTokens.wrapper} relative overflow-hidden`}>
      <div className="mx-auto flex w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col gap-10 rounded-[2rem] bg-white/80 p-8 shadow-2xl lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-6">
            <h1 className={heroTokens.title} style={{ fontFamily: design.headingFont.fontFamily }}>{title}</h1>
            <p className={heroTokens.subtitle} style={{ fontFamily: design.bodyFont.fontFamily }}>{subtitle}</p>
            <span className={tokens.buttons.primary}>
              {ctaText}
            </span>
          </div>
          <div className={`${design.color.imageFrameClass} overflow-hidden`}>
            <TenantImage
              src={image}
              alt={title}
              className={`h-64 w-full rounded-[1.2rem] ${design.color.imageShadowClass}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
