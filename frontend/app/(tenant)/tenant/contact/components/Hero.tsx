import { preferences as defaultPreferences } from "@/visualizer/demo/contact/preference";
import type { ContactData } from "@/visualizer/demo/contact/data";
import type { ContactPreferences } from "@/visualizer/demo/contact/preference";

export type HeroProps = ContactData["hero"] & {
  preferences?: ContactPreferences;
};

export default function Hero({ title, subtitle, ctaText, ctaLink, image, preferences }: HeroProps) {
  const tokens = (preferences ?? defaultPreferences).hero;

  return (
    <section className={`${tokens.wrapper} relative overflow-hidden`}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 rounded-[2rem] bg-white/80 p-8 shadow-2xl lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-6">
          <h1 className={`${tokens.title}`}>{title}</h1>
          <p className={`${tokens.subtitle}`}>{subtitle}</p>
          <a href={ctaLink} className={defaultPreferences.buttons.primary}>
            {ctaText}
          </a>
        </div>
        <div className="rounded-[1.5rem] bg-gradient-to-br from-emerald-100 to-white p-1 shadow-lg">
          <img
            src={image}
            alt={title}
            className="h-64 w-full rounded-[1.2rem] object-cover shadow-[0_20px_60px_rgba(16,185,129,0.4)]"
          />
        </div>
      </div>
    </section>
  );
}
