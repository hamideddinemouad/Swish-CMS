import { preferences as defaultPreferences } from "../preference";
import type { HomeData } from "../data";
import type { HomePreferences } from "../preference";

export type TestimonialsProps = HomeData["testimonials"] & {
  preferences?: HomePreferences;
};

export default function Testimonials({ title, quotes, preferences }: TestimonialsProps) {
  const tokens = preferences ?? defaultPreferences;

  return (
    <section className="space-y-6 py-8">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-300">Testimonials</p>
        <h2 className="text-3xl font-semibold text-white">{title}</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {quotes.map((quote) => (
          <article key={quote.name} className={`${tokens.cards.compact} border border-slate-800 bg-slate-900/70 shadow-xl`}>
            <p className="text-lg italic text-slate-200">“{quote.text}”</p>
            <p className="text-sm font-semibold text-white">{quote.name}</p>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">{quote.role} · {quote.company}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
