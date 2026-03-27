import { preferences as defaultPreferences } from "@/visualizer/demo/FAQ/preference";
import type { FAQData } from "@/visualizer/demo/FAQ/data";
import type { FAQPreferences } from "@/visualizer/demo/FAQ/preference";

export type HeroProps = FAQData["hero"] & {
  preferences?: FAQPreferences;
};

export default function Hero({ eyebrow, title, subtitle, image, preferences }: HeroProps) {
  const heroTokens = (preferences ?? defaultPreferences).hero;

  return (
    <section className={`${heroTokens.wrapper} relative overflow-hidden`}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-6 text-left text-slate-900">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-400">{eyebrow}</p>
          <h1 className={`text-4xl md:text-6xl ${heroTokens.title}`}>{title}</h1>
          <p className={`${heroTokens.subtitle}`}>{subtitle}</p>
        </div>
        <div className="rounded-[2rem] bg-slate-100 p-2 shadow-2xl">
          <img src={image} alt={title} className="h-80 w-full rounded-[1.5rem] object-cover" />
        </div>
      </div>
    </section>
  );
}
