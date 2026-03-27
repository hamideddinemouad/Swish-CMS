import { preferences as defaultPreferences } from "@/visualizer/demo/about/preference";
import type { AboutData } from "@/visualizer/demo/about/data";
import type { AboutPreferences } from "@/visualizer/demo/about/preference";

export type TestimonialsProps = AboutData["testimonials"] & {
  preferences?: AboutPreferences;
};

export default function Testimonials({ title, quotes, preferences }: TestimonialsProps) {
  const tokens = preferences ?? defaultPreferences;
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">Voices</p>
        <h2 className="text-3xl font-semibold text-amber-900">{title}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {quotes.map((quote) => (
          <article
            key={quote.name}
            className={`${tokens.cards.compact} space-y-4 border border-amber-100 bg-white/80 p-6`}
          >
            <p className="text-lg italic text-amber-800">“{quote.text}”</p>
            <div className="text-sm">
              <p className="font-semibold text-amber-900">{quote.name}</p>
              <p className="text-amber-600">
                {quote.role} · {quote.company}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
